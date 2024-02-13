namespace GradeCalculator.DataLayer.Models.Configurations;

public class GradePeriod
{
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
    public GradePeriod()
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
    {
        
    }

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
