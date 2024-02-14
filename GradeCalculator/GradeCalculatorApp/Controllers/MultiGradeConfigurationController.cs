using GradeCalculator.DataLayer.DataProviders;
using GradeCalculator.DataLayer.Models.Configurations;
using GradeCalculatorApp.Controllers.Requests.GradeConfiguration.Single;
using GradeCalculatorApp.Controllers.Requests.Periods;
using GradeCalculatorApp.Hubs;
using GradeCalculatorApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace GradeCalculatorApp.Controllers;

[ApiController]
[Route("[controller]")]
public class MultiGradeConfigurationController : ControllerBase
{
    private readonly IGradeDataProvider _gradeDataProvider;
    private readonly IGradeHubMessenger _gradeHubMessenger;
    private readonly IGradeConfigurationTracker _gradeConfigurationTracker;

    public MultiGradeConfigurationController(IGradeDataProvider gradeDataProvider, IGradeHubMessenger gradeHubMessenger,
        IGradeConfigurationTracker gradeConfigurationTracker)
    {
        _gradeDataProvider = gradeDataProvider;
        _gradeHubMessenger = gradeHubMessenger;
        _gradeConfigurationTracker = gradeConfigurationTracker;
    }

    [HttpPost]
    [Route("")]
    public IActionResult CreateMultiGradeConfiguration(CreateMultiGradeConfigurationDto create)
    {
        var studentCollection = _gradeDataProvider.Get(create.StudentCollectionId);
        if (studentCollection == null)
            return NotFound();

        var gradePeriod = studentCollection.GradePeriods.FirstOrDefault(g => g.Id == create.GradePeriodId);
        if (gradePeriod == null)
            return NotFound();

        var multi = new MultiGradeConfiguration(Guid.NewGuid().ToString(), create.Name, create.Weight, [], []);
        if(string.IsNullOrEmpty(create.MultiParentId))
        {
            gradePeriod.MultiGradeConfigurations.Add(multi);
        }
        else
        {
            var parentMulti = _gradeConfigurationTracker.FindMulti(create.MultiParentId, gradePeriod);
            if (parentMulti == null)
                return NotFound();

            parentMulti.Result.MultiGradeConfigurations.Add(multi);
        }

        _gradeDataProvider.CreateOrUpdate(studentCollection);
        _gradeHubMessenger.SendUpdatedStudentCollection(studentCollection);

        return Ok();
    }

    [HttpPost]
    [Route("update")]
    public IActionResult UpdateMultiGradeConfiguration(UpdateMultiGradeConfigurationDto update)
    {
        var studentCollection = _gradeDataProvider.Get(update.StudentCollectionId);
        if (studentCollection == null)
            return NotFound();

        var multi = _gradeConfigurationTracker.FindMulti(update.MultiId, studentCollection.GradePeriods.ToArray());
        if(multi == null)
            return NotFound();

        multi.Result.Name = update.Name;
        multi.Result.Weight = update.Weight;

        _gradeDataProvider.CreateOrUpdate(studentCollection);
        _gradeHubMessenger.SendUpdatedStudentCollection(studentCollection);

        return Ok();
    }

    [HttpPost]
    [Route("delete")]
    public IActionResult DeleteMultiGradeConfiguration(DeleteMultiGradeConfigurationDto delete)
    {
        var studentCollection = _gradeDataProvider.Get(delete.StudentCollectionId);
        if (studentCollection == null)
            return NotFound();

        var multi = _gradeConfigurationTracker.FindMulti(delete.MultiId, studentCollection.GradePeriods.ToArray());
        if(multi == null)
            return NotFound();

        if(multi.Parent == null)
            multi.GradePeriod.MultiGradeConfigurations.Remove(multi.Result);
        else
            multi.Parent.MultiGradeConfigurations.Remove(multi.Result);

        _gradeDataProvider.CreateOrUpdate(studentCollection);
        _gradeHubMessenger.SendUpdatedStudentCollection(studentCollection);

        return Ok();
    }
}
