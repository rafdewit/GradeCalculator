namespace GradeCalculatorApp.Controllers.Requests
{
    public class UpdateStudentCollectionDto(string className, string id)
    {
        public string ClassName { get; } = className;
        public string Id { get; set; } = id;
    }
}
