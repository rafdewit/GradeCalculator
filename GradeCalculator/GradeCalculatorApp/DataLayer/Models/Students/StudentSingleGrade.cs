namespace GradeCalculator.DataLayer.Models.Students;

public class StudentSingleGrade
{
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
    public StudentSingleGrade()
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
    {

    }

    public StudentSingleGrade(string id, string singleGradeConfigurationId, double? score)
    {
        Id = id;
        SingleGradeConfigurationId = singleGradeConfigurationId;
        Score = score;
    }

    public string Id { get; set; }
    public string SingleGradeConfigurationId { get; set; }
    public double? Score { get; set; }
}
