namespace GradeCalculatorApp.Controllers.Requests.Periods;

public class DeleteMultiGradeConfigurationDto(string studentCollectionId, string multiId)
{
    public string StudentCollectionId { get; set; } = studentCollectionId;
    public string MultiId { get; set; } = multiId;
}
