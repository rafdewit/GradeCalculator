using GradeCalculator.DataLayer.DataProviders;
using GradeCalculator.DataLayer.Models.Students;
using GradeCalculatorApp.Controllers.Requests.GradesUpdate;
using GradeCalculatorApp.Hubs;
using GradeCalculatorApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace GradeCalculatorApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SingleGradeController : ControllerBase
    {
        private readonly IGradeDataProvider _gradeDataProvider;
        private readonly IGradeHubMessenger _gradeHubMessenger;
        private readonly IGradeConfigurationTracker _gradeConfigurationTracker;

        public SingleGradeController(IGradeDataProvider gradeDataProvider, IGradeHubMessenger gradeHubMessenger,
            IGradeConfigurationTracker gradeConfigurationTracker)
        {
            _gradeDataProvider = gradeDataProvider;
            _gradeHubMessenger = gradeHubMessenger;
            _gradeConfigurationTracker = gradeConfigurationTracker;
        }

        [HttpPost]
        [Route("")]
        public IActionResult UpdateSingleGradeConfiguration(SingleGradesUpdateDto updates)
        {
            var studentCollection = _gradeDataProvider.Get(updates.StudentCollectionId);
            if (studentCollection == null)
                return NotFound();

            foreach(var update in updates.SingleGradeUpdates)
            {
                var student = studentCollection.Students.FirstOrDefault(s => s.Id == update.StudentId);
                if (student == null)
                    continue;

                if (student.StudentSingleGrades == null)
                    student.StudentSingleGrades = new List<StudentSingleGrade>();

                var grade = student.StudentSingleGrades.FirstOrDefault(g => g.SingleGradeConfigurationId == updates.SingleGradeConfigurationId);
                if(grade != null)
                {
                    grade.Score = update.Score;
                }
                else
                {
                    student.StudentSingleGrades.Add(new StudentSingleGrade(Guid.NewGuid().ToString(), updates.SingleGradeConfigurationId, update.Score));
                }
            }

            _gradeDataProvider.CreateOrUpdate(studentCollection);
            _gradeHubMessenger.SendUpdatedStudentCollection(studentCollection);

            return Ok();
        }
    }
}
