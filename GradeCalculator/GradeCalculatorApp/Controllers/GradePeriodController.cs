using GradeCalculator.DataLayer.DataProviders;
using GradeCalculator.DataLayer.Models.Configurations;
using GradeCalculatorApp.Controllers.Requests.Periods;
using GradeCalculatorApp.Hubs;
using Microsoft.AspNetCore.Mvc;

namespace GradeCalculatorApp.Controllers;

[ApiController]
[Route("[controller]")]
public class GradePeriodController : ControllerBase
{
    private readonly IGradeDataProvider _gradeDataProvider;
    private readonly IGradeHubMessenger _gradeHubMessenger;

    public GradePeriodController(IGradeDataProvider gradeDataProvider, IGradeHubMessenger gradeHubMessenger)
    {
        _gradeDataProvider = gradeDataProvider;
        _gradeHubMessenger = gradeHubMessenger;
    }

    [HttpPost]
    [Route("")]
    public IActionResult CreateGradePeriod(CreateGradePeriodDto create)
    {
        var studentCollection = _gradeDataProvider.Get(create.StudentCollectionId);
        if (studentCollection == null)
            return NotFound();

        var period = new GradePeriod(Guid.NewGuid().ToString(), create.Name, new List<MultiGradeConfiguration>(), new List<SingleGradeConfiguration>());
        studentCollection.GradePeriods = studentCollection.GradePeriods.Concat(new List<GradePeriod>() { period }).ToList();

        _gradeDataProvider.CreateOrUpdate(studentCollection);
        _gradeHubMessenger.SendUpdatedStudentCollection(studentCollection);

        return Ok();
    }

    [HttpPost]
    [Route("update")]
    public IActionResult UpdateGradePeriod(UpdateGradePeriodDto update)
    {
        var studentCollection = _gradeDataProvider.Get(update.StudentCollectionId);
        if (studentCollection == null)
            return NotFound();

        var periods = studentCollection.GradePeriods.ToList();
        var period = periods.FirstOrDefault(p => p.Id == update.PeriodId);
        if (period == null)
            return NotFound();

        period.Name = update.Name;
        studentCollection.GradePeriods = periods;

        _gradeDataProvider.CreateOrUpdate(studentCollection);
        _gradeHubMessenger.SendUpdatedStudentCollection(studentCollection);

        return Ok();
    }

    [HttpPost]
    [Route("copy")]
    public IActionResult CopyGradePeriod(CopyGradePeriodDto update)
    {
        var gradePeriod = _gradeDataProvider.GetGradePeriod(update.StudentCollectionId, update.GradePeriodId);
        if (gradePeriod == null)
            return NotFound();

        gradePeriod.Name = update.Name;
        gradePeriod.Id = Guid.NewGuid().ToString();

        var studentCollection = _gradeDataProvider.Get(update.StudentCollectionId);
        if (studentCollection == null)
            return NotFound();

        var periods = studentCollection.GradePeriods.ToList();
        periods.Add(gradePeriod);
        studentCollection.GradePeriods = periods;

        _gradeDataProvider.CreateOrUpdate(studentCollection);
        _gradeHubMessenger.SendUpdatedStudentCollection(studentCollection);

        return Ok();
    }

    [HttpPost]
    [Route("delete")]
    public IActionResult DeleteGradePeriod(DeleteGradePeriodDto update)
    {
        var studentCollection = _gradeDataProvider.Get(update.StudentCollectionId);
        if (studentCollection == null)
            return NotFound();

        var periods = studentCollection.GradePeriods.ToList();
        var period = periods.FindIndex(p => p.Id == update.PeriodId);
        if (period < 0)
            return NotFound();

        periods.RemoveAt(period);
        studentCollection.GradePeriods = periods;

        _gradeDataProvider.CreateOrUpdate(studentCollection);
        _gradeHubMessenger.SendUpdatedStudentCollection(studentCollection);

        return Ok();
    }
}
