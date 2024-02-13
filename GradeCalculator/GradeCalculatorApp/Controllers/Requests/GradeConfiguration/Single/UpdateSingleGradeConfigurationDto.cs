namespace GradeCalculatorApp.Controllers.Requests.GradeConfiguration.Single;

public class UpdateSingleGradeConfigurationDto(string studentCollectionId,
    string singleId,
    string name, double totalScore, double weight)
{
    public string StudentCollectionId { get; set; } = studentCollectionId;

    public string SingleId { get; } = singleId;
    public string Name { get; set; } = name;
    public double TotalScore { get; set; } = totalScore;
    public double Weight { get; set; } = weight;
}
