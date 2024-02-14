using Topshelf;

namespace GradeCalculatorApp;

public class Program
{
    public static void Main(string[] args)
    {
        string url = "https://localhost:7179";
        HostFactory.Run(configure =>
        {
            configure.Service<GradeWindowsService>(service =>
            {
                service.ConstructUsing(s => new GradeWindowsService());
                service.WhenStarted((s, c) => s.Start(url, args));
                service.WhenStopped((s, c) => s.Stop());
            });

            //Setup Account that window service use to run.  
            configure.RunAsLocalSystem();
            configure.SetServiceName("GradeCalculator");
            configure.SetDisplayName("GradeCalculator");
            configure.SetDescription("GradeCalculator - calculates grades");
            configure.StartAutomaticallyDelayed();
            configure.OnException(exc =>
            {
                LogToEventLog(exc);
            });
        });
    }

    internal static void LogToEventLog(Exception exc)
    {
        try
        {
            var message = $"{exc.Message}{Environment.NewLine}{exc.StackTrace}";
#pragma warning disable CA1416 // Validate platform compatibility
            System.Diagnostics.EventLog.WriteEntry("TiliaLight", message, System.Diagnostics.EventLogEntryType.Error);
#pragma warning restore CA1416 // Validate platform compatibility
            if (exc.InnerException != null)
                LogToEventLog(exc.InnerException);
        }
        catch (Exception e)
        {
            Console.WriteLine(exc.Message);
            Console.WriteLine(e.Message);
        }
    }
}
