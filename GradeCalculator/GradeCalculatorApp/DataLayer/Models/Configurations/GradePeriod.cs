namespace GradeCalculator.DataLayer.Models.Configurations;

public class GradePeriod
{
    public GradePeriod(string id, string name, List<MultiGradeConfiguration> multiGradeConfigurations,
        List<SingleGradeConfiguration> singleGradeConfigurations)
    {
        Id = id;
        Name = name;
        MultiGradeConfigurations = multiGradeConfigurations;
        SingleGradeConfigurations = singleGradeConfigurations;
    }

    public string Id { get; set; }
    public string Name { get; set; }
    public List<MultiGradeConfiguration> MultiGradeConfigurations { get; set; }
    public List<SingleGradeConfiguration> SingleGradeConfigurations { get; set; }
}
