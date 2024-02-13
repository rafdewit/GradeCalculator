namespace GradeCalculator.DataLayer.Models.Configurations;

public class MultiGradeConfiguration
{
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
    public MultiGradeConfiguration()
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
    {

    }

    public MultiGradeConfiguration(string id, string name, double weight,
        List<SingleGradeConfiguration> singleGradeConfigurations,
        List<MultiGradeConfiguration> multiGradeConfigurations)
    {
        Id = id;
        Name = name;
        Weight = weight;
        SingleGradeConfigurations = singleGradeConfigurations;
        MultiGradeConfigurations = multiGradeConfigurations;
    }

    public string Id { get; set; }
    public string Name { get; set; }
    public double Weight { get; set; }
    public List<SingleGradeConfiguration> SingleGradeConfigurations { get; set; }
    public List<MultiGradeConfiguration> MultiGradeConfigurations { get; set; }
}
