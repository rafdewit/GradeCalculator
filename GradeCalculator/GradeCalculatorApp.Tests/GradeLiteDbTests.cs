using GradeCalculator.DataLayer;

namespace GradeCalculator.Tests
{
    public class GradeLiteDbTests
    {
        private readonly GradeLiteDb _sut;

        public const string TestDbFileName = "TestDb.db";

        public GradeLiteDbTests()
        {
            if (File.Exists(TestDbFileName))
                File.Delete(TestDbFileName);

            _sut = new GradeLiteDb(new GradeDbConfig(TestDbFileName));
        }

        [Fact]
        public void StoreTest()
        {
            var studentClass = DataGenerator.CreateClass("1BA");
            _sut.CreateOrUpdate(studentClass);

            var result = _sut.GetAll();
            Assert.Single(result);
            var studentClassResult = result.FirstOrDefault();
            Assert.NotNull(studentClassResult);

            Assert.Equal(studentClass.Name, studentClassResult.Name);
            Assert.Equal(studentClass.Id, studentClassResult.Id);
            Assert.Equal(studentClass.GradePeriods.Count(), studentClassResult.GradePeriods.Count());
        }
    }
}