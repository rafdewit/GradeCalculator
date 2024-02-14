namespace GradeCalculatorApp.Controllers.Requests.GradeConfiguration.Single;

public class CreateSingleGradeConfigurationDto(string studentCollectionId,
    string gradePeriodId,
    string? multiParentId,
    string name, double totalScore, double weight)
{
    public string StudentCollectionId { get; set; } = studentCollectionId;
    public string GradePeriodId { get; set; } = gradePeriodId;
    public string? MultiParentId { get; set; } = multiParentId;
    public string Name { get; set; } = name;
    public double TotalScore { get; set; } = totalScore;
    public double Weight { get; set; } = weight;
}
