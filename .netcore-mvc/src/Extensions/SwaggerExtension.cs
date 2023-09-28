using System.Reflection;
using Microsoft.OpenApi.Models;

namespace Recorder.Extensions;

public static class SwaggerExtensions
{
    public static void AddAppSwagger(this IServiceCollection services)
    {
        services.AddSwaggerGen(options =>
        {
            options.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "snoozemo's server system",
                Version = "v1",
                Description = "snoozemo's server system"
            });

            var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
            var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
            options.IncludeXmlComments(xmlPath, true);
            options.OrderActionsBy(o => o.RelativePath);
        });
    }

    public static void UseGlobalSwagger(this IApplicationBuilder app)
    {
        app.UseSwagger();
        app.UseSwaggerUI(options =>
        {
            options.SwaggerEndpoint("/swagger/v1/swagger.json", "snoozemo's server system v1");
            options.RoutePrefix = string.Empty;
        });
    }
}