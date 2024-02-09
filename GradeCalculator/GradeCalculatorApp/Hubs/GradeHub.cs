using Microsoft.AspNetCore.SignalR;

namespace GradeCalculatorApp.Hubs
{
    public interface IGradeHub
    {

    }

    public class GradeHub : Hub<IGradeHub>
    {
        public async override Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            await base.OnDisconnectedAsync(exception);
        }
    }
}
