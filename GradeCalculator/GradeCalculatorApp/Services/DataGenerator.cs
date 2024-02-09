using GradeCalculator.DataLayer.Models.Configurations;
using GradeCalculator.DataLayer.Models.Students;
using GradeCalculator.DataLayer.Models;

namespace GradeCalculator.Tests
{
    public static class DataGenerator
    {
        private static readonly Random _random = new();

        public static StudentCollection CreateClass(string name)
        {
            var periods = new List<GradePeriod>()
            {
                GetGradePeriod("semester1"),
                GetGradePeriod("semester2")
            };

            var students = new List<Student>();

            return new StudentCollection(Guid.NewGuid().ToString(), name, periods, students);
        }

        private static GradePeriod GetGradePeriod(string name)
        {
            return new GradePeriod(
                Guid.NewGuid().ToString(), 
                name, 
                GetMultiGradeConfigurations().ToList(),
                GetSingleGradeConfigurations().ToList());
        }

        private static IEnumerable<MultiGradeConfiguration> GetMultiGradeConfigurations()
        {
            yield return new MultiGradeConfiguration()
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Tests",
                SingleGradeConfigurations = GetMultiSingleGradeConfigurations(_random.Next(3, 7)),
                Weight = 25
            };
        }

        private static IEnumerable<SingleGradeConfiguration> GetMultiSingleGradeConfigurations(int singleConfigurationCount)
        {
            for (int i = 0; i < singleConfigurationCount; i++)
            {
                yield return new SingleGradeConfiguration(Guid.NewGuid().ToString(), $"Test-{i}", _random.Next(10, 30), 10);
            }
        }

        private static IEnumerable<SingleGradeConfiguration> GetSingleGradeConfigurations()
        {
            yield return new SingleGradeConfiguration(Guid.NewGuid().ToString(), $"Exam", 50, 45);
            yield return new SingleGradeConfiguration(Guid.NewGuid().ToString(), $"Oral", 30, 15);
            yield return new SingleGradeConfiguration(Guid.NewGuid().ToString(), $"DailyWork", 5, 15);
            yield return new SingleGradeConfiguration(Guid.NewGuid().ToString(), $"ClassParticipation", 5, 15);
        }
    }
}
