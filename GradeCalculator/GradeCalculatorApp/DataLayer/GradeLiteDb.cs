using GradeCalculator.DataLayer.Models;
using LiteDB;
using Microsoft.AspNetCore.Components.Web;

namespace GradeCalculator.DataLayer;

public interface IGradeLiteDb
{
    void CreateOrUpdate(StudentCollection studentCollection);
    bool Delete(string id);
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

    public bool Delete(string id)
    {
        using var db = new LiteDatabase(_gradeDbConfig.DatabaseName);
        return Delete(id, db);
    }

    private bool Delete(string id, LiteDatabase db)
    {
        var collection = db.GetCollection<StudentCollection>(_studentCollectionTableName);
        var deleteResult = collection.Delete(id);
        if (deleteResult)
            db.Commit();

        return deleteResult;
    }

    public void CreateOrUpdate(StudentCollection studentCollection)
    {
        using var db = new LiteDatabase(_gradeDbConfig.DatabaseName);
        var collection = db.GetCollection<StudentCollection>(_studentCollectionTableName);
        Delete(studentCollection.Id, db);
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
