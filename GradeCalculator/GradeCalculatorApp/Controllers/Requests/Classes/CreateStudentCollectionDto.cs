namespace GradeCalculatorApp.Controllers.Requests.Classes;

public class CreateStudentCollectionDto(string className)
{
    public string ClassName { get; set; } = className;
}
