namespace GradeCalculatorApp.Controllers.Requests.Classes;

public class UpdateStudentCollectionDto(string className, string id)
{
    public string ClassName { get; } = className;
    public string Id { get; set; } = id;
}
