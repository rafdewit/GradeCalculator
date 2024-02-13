namespace GradeCalculatorApp.Controllers.Requests.GradesUpdate
{
    public class SingleGradeUpdateDto
    {
        public SingleGradeUpdateDto(string studentId, string studentName, double score)
        {
            StudentId = studentId;
            StudentName = studentName;
            Score = score;
        }

        public string StudentId { get; set; }
        public string StudentName { get; set; }
        public double Score { get; set; }
    }
}
