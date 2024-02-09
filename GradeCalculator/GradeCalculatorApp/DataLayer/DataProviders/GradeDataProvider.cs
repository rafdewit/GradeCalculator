using GradeCalculator.DataLayer.Models;
using GradeCalculator.Tests;

namespace GradeCalculator.DataLayer.DataProviders
{
    public interface IGradeDataProvider
    {
        void CreateOrUpdate(StudentCollection studentCollection);
        StudentCollection? Get(string id);
        List<StudentCollection> GetAll();
        StudentCollection? GetByName(string name);
    }

    public class GradeDataProvider(IGradeLiteDb gradeLiteDb) : IGradeDataProvider
    {
        private readonly IGradeLiteDb _gradeLiteDb = gradeLiteDb;

        private List<StudentCollection>? _studentCollections = null;
        public List<StudentCollection> GetAll()
        {
            if (_studentCollections == null)
                _studentCollections = new List<StudentCollection>() {
                    DataGenerator.CreateClass("Class1"), 
                    DataGenerator.CreateClass("Class2") 
                };
            // _gradeLiteDb.GetAll().ToList();

            return _studentCollections;
        }

        public StudentCollection? Get(string id)
        {
            return GetAll().FirstOrDefault(c => c.Id == id);
        }

        public StudentCollection? GetByName(string name)
        {
            return GetAll().FirstOrDefault(c => c.Name == name);
        }

        public void CreateOrUpdate(StudentCollection studentCollection)
        {
            var studentCollections = GetAll();
            var index = studentCollections.FindIndex(c => c.Id == studentCollection.Id);
            if (index >= 0)
            {
                studentCollections.RemoveAt(index);
                studentCollections.Insert(index, studentCollection);
            }
            else
                studentCollections.Add(studentCollection);

            _gradeLiteDb.CreateOrUpdate(studentCollection);
        }
    }
}
