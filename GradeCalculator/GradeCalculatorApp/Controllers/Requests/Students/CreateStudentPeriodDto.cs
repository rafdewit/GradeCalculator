namespace GradeCalculatorApp.Controllers.Requests.Periods;

public class CreateStudentPeriodDto(string studentCollectionId, string name)
{
    public string StudentCollectionId { get; set; } = studentCollectionId;
    public string Name { get; set; } = name;
}
