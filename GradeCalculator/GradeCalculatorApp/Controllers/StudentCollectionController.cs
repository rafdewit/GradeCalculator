using GradeCalculator.DataLayer.DataProviders;
using GradeCalculator.DataLayer.Models;
using GradeCalculator.DataLayer.Models.Configurations;
using GradeCalculator.DataLayer.Models.Students;
using GradeCalculatorApp.Controllers.Requests.Classes;
using GradeCalculatorApp.Controllers.Requests.Periods;
using GradeCalculatorApp.Hubs;
using Microsoft.AspNetCore.Mvc;

namespace GradeCalculatorApp.Controllers;

[ApiController]
[Route("[controller]")]
public class StudentCollectionController : ControllerBase
{
    private readonly IGradeDataProvider _gradeDataProvider;
    private readonly IGradeHubMessenger _gradeHubMessenger;

    public StudentCollectionController(IGradeDataProvider gradeDataProvider, IGradeHubMessenger gradeHubMessenger)
    {
        _gradeDataProvider = gradeDataProvider;
        _gradeHubMessenger = gradeHubMessenger;
    }

    [HttpGet]
    [Route("")]
    public IActionResult Get(string? id = null)
    {
        if(string.IsNullOrEmpty(id))
        {
            var gradeData = _gradeDataProvider.GetAll();
            return Ok(gradeData);
        }
        else
        {
            var gradeData = _gradeDataProvider.Get(id);
            if(gradeData == null)
            {
                return NotFound($"class with id: {id} was not found");
            }

            return Ok(gradeData);
        }
    }

    [HttpPost]
    [Route("")]
    public IActionResult Create(CreateStudentCollectionDto create)
    {
        var studentCollection = new StudentCollection(
            Guid.NewGuid().ToString(),
            create.ClassName,
            new List<GradePeriod>(),
            new List<Student>());

        _gradeDataProvider.CreateOrUpdate(studentCollection);
        _gradeHubMessenger.SendUpdatedStudentCollection(studentCollection);

        return Ok();
    }

    [HttpPost]
    [Route("update")]
    public IActionResult Update(UpdateStudentCollectionDto update)
    {
        var studentCollection = _gradeDataProvider.Get(update.Id);
        if (studentCollection == null)
            return NotFound();

        studentCollection.Name = update.ClassName;
        _gradeDataProvider.CreateOrUpdate(studentCollection);
        _gradeHubMessenger.SendUpdatedStudentCollection(studentCollection);

        return Ok();
    }

    [HttpPost]
    [Route("copy")]
    public IActionResult Copy(CopyStudentCollectionDto update)
    {
        var studentCollection = _gradeDataProvider.Get(update.Id);
        if (studentCollection == null)
            return NotFound();

        studentCollection.Name = update.ClassName;
        studentCollection.Id = Guid.NewGuid().ToString();

        _gradeDataProvider.CreateOrUpdate(studentCollection);
        _gradeHubMessenger.SendUpdatedStudentCollection(studentCollection);

        return Ok();
    }

    [HttpDelete]
    [Route("")]
    public IActionResult Delete(string id)
    {
        var studentCollection = _gradeDataProvider.Get(id);
        if (studentCollection == null)
            return NotFound();

        _gradeDataProvider.Delete(id);
        _gradeHubMessenger.SendDeletedStudentCollection(id);

        return Ok();
    }
}
