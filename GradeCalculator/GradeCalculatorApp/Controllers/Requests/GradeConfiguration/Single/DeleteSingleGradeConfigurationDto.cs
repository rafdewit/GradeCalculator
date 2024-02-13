namespace GradeCalculatorApp.Controllers.Requests.GradeConfiguration.Single;

public class DeleteSingleGradeConfigurationDto(string studentCollectionId, string singleId)
{
    public string StudentCollectionId { get; set; } = studentCollectionId;
    public string SingleId { get; set; } = singleId;
}
