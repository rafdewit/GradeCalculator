namespace GradeCalculatorApp.Controllers.Requests
{
    public class CreateStudentCollectionDto(string className)
    {
        public string ClassName { get; set; } = className;
    }
}
