namespace GradeCalculator.DataLayer.Models.Students;

public class Student
{
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
    public Student()
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
    {

    }

    public Student(string id, string name, List<StudentSingleGrade> studentSingleGrades)
    {
        Id = id;
        Name = name;
        StudentSingleGrades = studentSingleGrades;
    }

    public string Id { get; set; }
    public string Name { get; set; }
    public List<StudentSingleGrade> StudentSingleGrades { get; }
}
