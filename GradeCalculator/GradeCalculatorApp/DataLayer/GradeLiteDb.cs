using GradeCalculator.DataLayer.Models;
using LiteDB;

namespace GradeCalculator.DataLayer
{
    public interface IGradeLiteDb
    {
        void CreateOrUpdate(StudentCollection studentCollection);
        IEnumerable<StudentCollection> GetAll();
    }

    public class GradeLiteDb : IGradeLiteDb
    {
        private readonly GradeDbConfig _gradeDbConfig;
        private const string _studentCollectionTableName = "StudentCollection";

        public GradeLiteDb(GradeDbConfig gradeDbConfig)
        {
            _gradeDbConfig = gradeDbConfig;
        }

        public void CreateOrUpdate(StudentCollection studentCollection)
        {
            using var db = new LiteDatabase(_gradeDbConfig.DatabaseName);
            var collection = db.GetCollection<StudentCollection>(_studentCollectionTableName);
            collection.Insert(studentCollection);
            db.Commit();
        }

        public IEnumerable<StudentCollection> GetAll()
        {
            using var db = new LiteDatabase(_gradeDbConfig.DatabaseName);
            var collection = db.GetCollection<StudentCollection>(_studentCollectionTableName);
            return collection
                .FindAll()
                .ToList();
        }
    }
}
