using Microsoft.Extensions.FileProviders;

namespace GradeCalculatorApp.Extensions;

public static class ApplicationBuilderEx
{
    public static void UseAppFileServer(this IApplicationBuilder app)
    {
        var rootPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"wwwroot");
        var fileProvider = new PhysicalFileProvider(rootPath);
        app.UseDefaultFiles(new DefaultFilesOptions()
        {
            DefaultFileNames = new List<string>() { "index.html" },
            FileProvider = fileProvider
        });
        app.UseStaticFiles(new StaticFileOptions
        {
            FileProvider = fileProvider,
            ServeUnknownFileTypes = true
        });

        app.Run(async context =>
        {
            context.Response.ContentType = "text/html";
            await context.Response.SendFileAsync(Path.Combine("./wwwroot/index.html"));
        });
    }
}
