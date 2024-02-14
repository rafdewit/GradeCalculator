using GradeCalculator.DataLayer.Models.Configurations;

namespace GradeCalculatorApp.Controllers.Requests.Periods;

public class CreateMultiGradeConfigurationDto(string studentCollectionId,
    string gradePeriodId,
    string? multiParentId,
    string name, double weight)
{
    public string StudentCollectionId { get; set; } = studentCollectionId;
    public string GradePeriodId { get; set; } = gradePeriodId;
    public string? MultiParentId { get; set; } = multiParentId;

    public string Name { get; set; } = name;
    public double Weight { get; set; } = weight;
}