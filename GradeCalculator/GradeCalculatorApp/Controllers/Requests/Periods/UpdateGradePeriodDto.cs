namespace GradeCalculatorApp.Controllers.Requests.Periods;

public class UpdateGradePeriodDto(string studentCollectionId, string name, string gradePeriodId)
{
    public string StudentCollectionId { get; set; } = studentCollectionId;
    public string Name { get; set; } = name;
    public string GradePeriodId { get; set; } = gradePeriodId;
}
