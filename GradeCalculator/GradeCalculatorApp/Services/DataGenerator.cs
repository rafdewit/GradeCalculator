using GradeCalculator.DataLayer.Models.Configurations;
using GradeCalculator.DataLayer.Models.Students;
using GradeCalculator.DataLayer.Models;
using System.Collections.Generic;
using System;

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

            var students = new List<Student>()
            {
                GetStudent("Gerard", periods),
                GetStudent("Herman", periods),
                GetStudent("Alfons", periods),
                GetStudent("Josef", periods),
                GetStudent("Raf", periods),
                GetStudent("Theresa", periods),
                GetStudent("Lisa", periods),
                GetStudent("Victoria", periods),
                GetStudent("Barbara", periods),
            };

            return new StudentCollection(Guid.NewGuid().ToString(), name, periods, students);
        }

        private static Student GetStudent(string name, IEnumerable<GradePeriod> gradePeriods)
        {
            var grades = new List<StudentSingleGrade>();
            foreach(var grade in gradePeriods)
                grades.AddRange(GeneratePeriodGrades(grade));

            return new Student(Guid.NewGuid().ToString(),
                name,
                grades);
        }

        private static IEnumerable<StudentSingleGrade> GeneratePeriodGrades(GradePeriod period)
        {
            foreach(var single in period.SingleGradeConfigurations)
            {
                yield return GenerateSingleGrade(single);
            }

            foreach(var multi in period.MultiGradeConfigurations)
            {
                foreach (var item in GenerateMultiGrades(multi))
                    yield return item;
            }
        }

        private static StudentSingleGrade GenerateSingleGrade(SingleGradeConfiguration single)
        {
            return new StudentSingleGrade(Guid.NewGuid().ToString(), single.Id, _random.Next(0, single.TotalScore + 1));
        }

        private static IEnumerable<StudentSingleGrade> GenerateMultiGrades(MultiGradeConfiguration multi)
        {
            foreach(var single in multi.SingleGradeConfigurations)
            {
                yield return GenerateSingleGrade(single);
            }

            foreach(var innerMulti in multi.MultiGradeConfigurations)
            {
                foreach (var item in GenerateMultiGrades(innerMulti))
                    yield return item;
            }
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
