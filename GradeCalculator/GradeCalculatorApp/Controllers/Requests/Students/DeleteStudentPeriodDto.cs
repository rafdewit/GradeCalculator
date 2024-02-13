namespace GradeCalculatorApp.Controllers.Requests.Periods;

public class DeleteStudentPeriodDto(string studentCollectionId, string studentId)
{
    public string StudentCollectionId { get; set; } = studentCollectionId;
    public string StudentId { get; set; } = studentId;
}
