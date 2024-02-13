namespace GradeCalculatorApp.Controllers.Requests.GradeConfiguration.Single;

public class UpdateMultiGradeConfigurationDto(string studentCollectionId,
    string multiId,
    string name, double weight)
{
    public string StudentCollectionId { get; set; } = studentCollectionId;

    public string MultiId { get; set; } = multiId;
    public string Name { get; set; } = name;
    public double Weight { get; set; } = weight;
}
