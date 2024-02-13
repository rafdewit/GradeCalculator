namespace GradeCalculatorApp.Controllers.Requests.Periods;

public class UpdateStudentPeriodDto(string studentCollectionId, string name, string studentId)
{
    public string StudentCollectionId { get; set; } = studentCollectionId;
    public string Name { get; set; } = name;
    public string StudentId { get; set; } = studentId;
}
