namespace GradeCalculatorApp.DataLayer.Databases.Lite;

public class GradeLiteDbConfig(string databaseName = @"GradeDb.db")
{
    public string DatabaseName { get; set; } = databaseName;
}
