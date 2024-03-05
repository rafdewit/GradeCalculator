using GradeCalculatorApp.Hubs;

namespace GradeCalculatorApp;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        ContainerBuilderEx.ConfigureServices(builder.Services);
        ContainerBuilderEx.ConfigureApplicationSpecificServices(builder.Services);
        var app = builder.Build();

        Configure(app);

        app.Run();
    }

    public static void Configure(WebApplication app)
    {
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseCors("CorsPolicy");
        app.UseHttpsRedirection();
        app.UseAuthorization();

        app.MapControllers();
        app.MapHub<GradeHub>("/hubs/grades");

        app.UseDefaultFiles();
        app.UseStaticFiles();
        app.UseFileServer();

        app.MapFallbackToFile("/classes/{*urlRemainder}", "index.html");
        app.MapFallbackToFile("/classes", "index.html");
        app.MapFallbackToFile("/", "index.html");
    }
}
