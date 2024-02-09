namespace GradeCalculator.DataLayer.Models.Configurations
{
    public class SingleGradeConfiguration
    {
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public SingleGradeConfiguration()
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        {

        }

        public SingleGradeConfiguration(string id, string name, int totalScore, double weight)
        {
            Id = id;
            Name = name;
            TotalScore = totalScore;
            Weight = weight;
        }

        public string Id { get; set; }
        public string Name { get; set; }
        public int TotalScore { get; set; }
        public double Weight { get; set; }
    }
}
