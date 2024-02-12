using GradeCalculator.DataLayer.Models;
using GradeCalculator.DataLayer.Models.Configurations;
using GradeCalculator.Tests;
using System.Security.Cryptography;

namespace GradeCalculator.DataLayer.DataProviders;

public interface IGradeDataProvider
{
    void CreateOrUpdate(StudentCollection studentCollection);
    void Delete(string id);
    StudentCollection? Get(string id);
    List<StudentCollection> GetAll();
    StudentCollection? GetByName(string name);
    GradePeriod? GetGradePeriod(string studentCollectionId, string gradeId);
}

public class GradeDataProvider(IGradeLiteDb gradeLiteDb) : IGradeDataProvider
{
    private readonly IGradeLiteDb _gradeLiteDb = gradeLiteDb;

    private List<StudentCollection>? _studentCollections = null;
    public List<StudentCollection> GetAll()
    {
        if (_studentCollections == null)
            _studentCollections = _gradeLiteDb.GetAll().ToList().Concat(new List<StudentCollection>() {
                DataGenerator.CreateClass("Class1"), 
                DataGenerator.CreateClass("Class2") 
            }).ToList();

        return _studentCollections;
    }

    public StudentCollection? Get(string id)
    {
        return GetAll().FirstOrDefault(c => c.Id == id);
    }

    public GradePeriod? GetGradePeriod(string studentCollectionId, string gradeId)
    {
        return GetAll().FirstOrDefault(c => c.Id == studentCollectionId)?.GradePeriods.FirstOrDefault(p => p.Id == gradeId);
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

    public void Delete(string id)
    {
        var studentCollections = GetAll();
        var index = studentCollections.FindIndex(c => c.Id == id);
        if (index >= 0)
            studentCollections.RemoveAt(index);

        _gradeLiteDb.Delete(id);
    }
}
