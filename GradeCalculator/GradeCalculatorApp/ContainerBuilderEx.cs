using GradeCalculator.DataLayer.DataProviders;
using GradeCalculatorApp.Hubs;
using GradeCalculatorApp.Services;
using Microsoft.OpenApi.Models;
using System.Text.Json.Serialization;
using GradeCalculatorApp.DataLayer.Databases.Lite;
using GradeCalculatorApp.DataLayer.Databases.Mongo;

namespace GradeCalculatorApp
{
    public static class ContainerBuilderEx
    {
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
            //services.AddSingleton(new GradeLiteDbConfig("GradeDatabase.db"));
            //services.AddTransient<IGradeDb, GradeLiteDb>();

            services.AddSingleton<IGradeDataProvider, GradeDataProvider>();
            services.AddSingleton<IGradeConfigurationTracker, GradeConfigurationTracker>();
            services.AddTransient<IGradeDb, MongoGradeDb>();
            services.AddTransient<IGradeHubMessenger, GradeHubMessenger>();
        }
    }
}
