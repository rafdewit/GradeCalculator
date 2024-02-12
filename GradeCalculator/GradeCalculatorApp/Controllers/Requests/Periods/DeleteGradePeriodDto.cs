namespace GradeCalculatorApp.Controllers.Requests.Periods;

public class DeleteGradePeriodDto(string studentCollectionId, string periodId)
{
    public string StudentCollectionId { get; set; } = studentCollectionId;
    public string PeriodId { get; set; } = periodId;
}
