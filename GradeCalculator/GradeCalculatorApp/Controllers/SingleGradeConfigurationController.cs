using GradeCalculator.DataLayer.DataProviders;
using GradeCalculator.DataLayer.Models.Configurations;
using GradeCalculatorApp.Controllers.Requests.GradeConfiguration.Single;
using GradeCalculatorApp.Hubs;
using GradeCalculatorApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace GradeCalculatorApp.Controllers;

[ApiController]
[Route("[controller]")]
public class SingleGradeConfigurationController : ControllerBase
{
    private readonly IGradeDataProvider _gradeDataProvider;
    private readonly IGradeHubMessenger _gradeHubMessenger;
    private readonly IGradeConfigurationTracker _gradeConfigurationTracker;

    public SingleGradeConfigurationController(IGradeDataProvider gradeDataProvider, IGradeHubMessenger gradeHubMessenger,
        IGradeConfigurationTracker gradeConfigurationTracker)
    {
        _gradeDataProvider = gradeDataProvider;
        _gradeHubMessenger = gradeHubMessenger;
        _gradeConfigurationTracker = gradeConfigurationTracker;
    }

    [HttpPost]
    [Route("")]
    public IActionResult CreateSingleGradeConfiguration(CreateSingleGradeConfigurationDto create)
    {
        var studentCollection = _gradeDataProvider.Get(create.StudentCollectionId);
        if (studentCollection == null)
            return NotFound();

        var gradePeriod = studentCollection.GradePeriods.FirstOrDefault(g => g.Id == create.GradePeriodId);
        if (gradePeriod == null)
            return NotFound();

        var single = new SingleGradeConfiguration(Guid.NewGuid().ToString(), create.Name, create.TotalScore, create.Weight);
        if(string.IsNullOrEmpty(create.MultiParentId))
        {
            gradePeriod.SingleGradeConfigurations.Add(single);
        }
        else
        {
            var multi = _gradeConfigurationTracker.FindMulti(create.MultiParentId, gradePeriod);
            if (multi == null)
                return NotFound();

            multi.Result.SingleGradeConfigurations.Add(single);
        }

        _gradeDataProvider.CreateOrUpdate(studentCollection);
        _gradeHubMessenger.SendUpdatedStudentCollection(studentCollection);

        return Ok();
    }

    [HttpPost]
    [Route("update")]
    public IActionResult UpdateSingleGradeConfiguration(UpdateSingleGradeConfigurationDto update)
    {
        var studentCollection = _gradeDataProvider.Get(update.StudentCollectionId);
        if (studentCollection == null)
            return NotFound();

        var single = _gradeConfigurationTracker.FindSingle(update.SingleId);
        if(single == null)
            return NotFound();

        single.Result.Name = update.Name;
        single.Result.TotalScore = update.TotalScore;
        single.Result.Weight = update.Weight;

        _gradeDataProvider.CreateOrUpdate(studentCollection);
        _gradeHubMessenger.SendUpdatedStudentCollection(studentCollection);

        return Ok();
    }

    [HttpPost]
    [Route("delete")]
    public IActionResult DeleteSingleGradeConfiguration(DeleteSingleGradeConfigurationDto delete)
    {
        var studentCollection = _gradeDataProvider.Get(delete.StudentCollectionId);
        if (studentCollection == null)
            return NotFound();

        var single = _gradeConfigurationTracker.FindSingle(delete.SingleId, studentCollection.GradePeriods.ToArray());
        if(single == null)
            return NotFound();

        if(single.Parent == null)
            single.GradePeriod.SingleGradeConfigurations.Remove(single.Result);
        else
            single.Parent.SingleGradeConfigurations.Remove(single.Result);

        _gradeDataProvider.CreateOrUpdate(studentCollection);
        _gradeHubMessenger.SendUpdatedStudentCollection(studentCollection);

        return Ok();
    }
}
