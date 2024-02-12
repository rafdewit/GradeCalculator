namespace GradeCalculatorApp.Controllers.Requests.Periods;

public class DeleteGradePeriodDto(string studentCollectionId, string gradePeriodId)
{
    public string StudentCollectionId { get; set; } = studentCollectionId;
    public string GradePeriodId { get; set; } = gradePeriodId;
}
