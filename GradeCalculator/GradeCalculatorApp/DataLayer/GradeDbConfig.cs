namespace GradeCalculator.DataLayer;

public class GradeDbConfig(string databaseName = @"GradeDb.db")
{
    public string DatabaseName { get; set; } = databaseName;
}
