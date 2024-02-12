namespace GradeCalculatorApp.Controllers.Requests.Periods;

public class CopyGradePeriodDto(string studentCollectionId, string name, string periodId)
{
    public string StudentCollectionId { get; set; } = studentCollectionId;
    public string Name { get; set; } = name;
    public string GradePeriodId { get; set; } = periodId;
}
