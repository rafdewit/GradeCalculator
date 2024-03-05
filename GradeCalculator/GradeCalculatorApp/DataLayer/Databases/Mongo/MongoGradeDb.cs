using GradeCalculator.DataLayer.Models;
using GradeCalculatorApp.DataLayer.Databases.Lite;
using MongoDB.Driver;

namespace GradeCalculatorApp.DataLayer.Databases.Mongo
{
    public class MongoGradeDb : IGradeDb
    {
        private readonly string _connectionString;
        public MongoGradeDb()
        {
            _connectionString = "mongodb+srv://rafdewit:qYDzKnFael1RR08h@avanteducation.xmymlej.mongodb.net/?retryWrites=true&w=majority&appName=AvantEducation";
        }

        private IMongoDatabase GetDatabase()
        {
            var client = new MongoClient(_connectionString);
            var database = client.GetDatabase("grade-test-db");
            return database;
        }

        private IMongoCollection<StudentCollection> GetCollection()
        {
            var db = GetDatabase();
            return db.GetCollection<StudentCollection>("student-collections");
        }

        public void CreateOrUpdate(StudentCollection studentCollection)
        {
            var collection = GetCollection();
            collection.ReplaceOne(doc => doc.Id == studentCollection.Id, studentCollection, new ReplaceOptions() { IsUpsert = true });
        }

        public bool Delete(string id)
        {
            var collection = GetCollection();
            collection.DeleteOne(doc => doc.Id == id);
            return true;
        }

        public IEnumerable<StudentCollection> GetAll()
        {
            var collection = GetCollection();
            return collection.Find(_ => true).ToList();
        }
    }
}
