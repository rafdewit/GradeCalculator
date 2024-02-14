using GradeCalculator.DataLayer.DataProviders;
using GradeCalculator.DataLayer;
using GradeCalculatorApp.Extensions;
using GradeCalculatorApp.Hubs;
using GradeCalculatorApp.Services;
using Microsoft.OpenApi.Models;
using System.Text.Json.Serialization;

namespace GradeCalculatorApp
{
    public class GradeWindowsService
    {
        private WebApplication? _app = null;

        public bool Start(string url, string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            ConfigureServices(builder.Services);
            ConfigureApplicationSpecificServices(builder.Services);
            _app = builder.Build();

            Configure(_app, url);
            return true;
        }

        public bool Stop()
        {
            if(_app != null)
                _app.StopAsync().Wait();

            return true;
        }

        public static void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers().AddJsonOptions(o => o.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Avant", Version = "v1" });
            });

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder => builder
                .WithOrigins("http://localhost:4200", "https://localhost:4200")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());
            });

            services.AddSignalR()
                .AddJsonProtocol(options =>
                {
                    options.PayloadSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                });
        }

        public static void ConfigureApplicationSpecificServices(IServiceCollection services)
        {
            services.AddSingleton(new GradeDbConfig("GradeDatabase.db"));
            services.AddSingleton<IGradeDataProvider, GradeDataProvider>();
            services.AddSingleton<IGradeConfigurationTracker, GradeConfigurationTracker>();
            services.AddTransient<IGradeLiteDb, GradeLiteDb>();
            services.AddTransient<IGradeHubMessenger, GradeHubMessenger>();
        }

        public static void Configure(WebApplication app, string url)
        {
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors("CorsPolicy");
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthorization();
            app.UseStaticFiles();
            app.UseAuthorization();

            app.MapControllers();
            app.MapHub<GradeHub>("/hubs/grades");
            app.UseAppFileServer();

            app.Run(url);
        }
    }
}
