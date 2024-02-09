using GradeCalculator.DataLayer.Models.Configurations;
using GradeCalculator.DataLayer.Models.Students;
using LiteDB;

namespace GradeCalculator.DataLayer.Models
{
    public class StudentCollection
    {
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public StudentCollection()
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        {
            
        }

        public StudentCollection(string id, string name, IEnumerable<GradePeriod> gradePeriods, IEnumerable<Student> students)
        {
            Id = id;
            Name = name;
            GradePeriods = gradePeriods;
            Students = students;
        }

        [BsonId]
        public string Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<GradePeriod> GradePeriods { get; set; }
        public IEnumerable<Student> Students { get; set; }
    }
}
