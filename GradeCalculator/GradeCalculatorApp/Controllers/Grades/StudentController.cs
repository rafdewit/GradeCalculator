using GradeCalculator.DataLayer.DataProviders;
using GradeCalculator.DataLayer.Models.Students;
using GradeCalculatorApp.Controllers.Requests.Periods;
using GradeCalculatorApp.Hubs;
using Microsoft.AspNetCore.Mvc;

namespace GradeCalculatorApp.Controllers.Grades;

[ApiController]
[Route("[controller]")]
public class StudentController : ControllerBase
{
    private readonly IGradeDataProvider _gradeDataProvider;
    private readonly IGradeHubMessenger _gradeHubMessenger;

    public StudentController(IGradeDataProvider gradeDataProvider, IGradeHubMessenger gradeHubMessenger)
    {
        _gradeDataProvider = gradeDataProvider;
        _gradeHubMessenger = gradeHubMessenger;
    }

    [HttpPost]
    [Route("")]
    public IActionResult CreateStudentPeriod(CreateStudentPeriodDto create)
    {
        var studentCollection = _gradeDataProvider.Get(create.StudentCollectionId);
        if (studentCollection == null)
            return NotFound();

        var student = new Student(Guid.NewGuid().ToString(), create.Name, new List<StudentSingleGrade>());
        studentCollection.Students = studentCollection.Students.Concat(new List<Student>() { student }).ToList();

        _gradeDataProvider.CreateOrUpdate(studentCollection);
        _gradeHubMessenger.SendUpdatedStudentCollection(studentCollection);

        return Ok();
    }

    [HttpPost]
    [Route("update")]
    public IActionResult UpdateStudentPeriod(UpdateStudentPeriodDto update)
    {
        var studentCollection = _gradeDataProvider.Get(update.StudentCollectionId);
        if (studentCollection == null)
            return NotFound();

        var students = studentCollection.Students.ToList();
        var student = students.FirstOrDefault(p => p.Id == update.StudentId);
        if (student == null)
            return NotFound();

        student.Name = update.Name;
        studentCollection.Students = students;

        _gradeDataProvider.CreateOrUpdate(studentCollection);
        _gradeHubMessenger.SendUpdatedStudentCollection(studentCollection);

        return Ok();
    }

    [HttpPost]
    [Route("delete")]
    public IActionResult DeleteStudentPeriod(DeleteStudentPeriodDto update)
    {
        var studentCollection = _gradeDataProvider.Get(update.StudentCollectionId);
        if (studentCollection == null)
            return NotFound();

        var students = studentCollection.Students.ToList();
        var student = students.FindIndex(p => p.Id == update.StudentId);
        if (student < 0)
            return NotFound();

        students.RemoveAt(student);
        studentCollection.Students = students;

        _gradeDataProvider.CreateOrUpdate(studentCollection);
        _gradeHubMessenger.SendUpdatedStudentCollection(studentCollection);

        return Ok();
    }
}
