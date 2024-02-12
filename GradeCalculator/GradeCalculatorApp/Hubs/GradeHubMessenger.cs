using GradeCalculator.DataLayer.Models;
using Microsoft.AspNetCore.SignalR;

namespace GradeCalculatorApp.Hubs;

public interface IGradeHubMessenger
{
    Task SendDeletedStudentCollection(string id);
    Task SendUpdatedStudentCollection(StudentCollection studentCollection);
}

public class GradeHubMessenger : IGradeHubMessenger
{
    private readonly IHubContext<GradeHub> _hubContext;

    public GradeHubMessenger(IHubContext<GradeHub> hubContext)
    {
        _hubContext = hubContext;
    }

    public async Task SendUpdatedStudentCollection(StudentCollection studentCollection)
    {
        await _hubContext.Clients.All.SendAsync("studentcollectionupdated", studentCollection);
    }

    public async Task SendDeletedStudentCollection(string id)
    {
        await _hubContext.Clients.All.SendAsync("studentcollectiondeleted", id);
    }
}
