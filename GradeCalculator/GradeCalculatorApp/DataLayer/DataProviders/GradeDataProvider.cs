using GradeCalculator.DataLayer.Models;
using GradeCalculator.DataLayer.Models.Configurations;
using GradeCalculator.Tests;
using GradeCalculatorApp.DataLayer.Databases.Lite;
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

public class GradeDataProvider(IGradeDb gradeLiteDb) : IGradeDataProvider
{
    private readonly IGradeDb _gradeLiteDb = gradeLiteDb;

    public List<StudentCollection> GetAll()
    {
        return _gradeLiteDb.GetAll().ToList();
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
