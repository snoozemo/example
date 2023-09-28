using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Diagnostics;

namespace Recorder.Extensions;

public static class ExceptionHandlerExtensions
{
    public static void UseGlobalExceptionHandler(this IApplicationBuilder app)
    {
        app.UseExceptionHandler(builder =>
        {
            builder.Run(async context =>
            {
                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                context.Response.ContentType = "application/json";

                var exception = context.Features.Get<IExceptionHandlerFeature>();
                if (exception == null) return;
                var logger = context.RequestServices.GetService<ILogger>();
                Console.WriteLine("--------------------");
                Console.WriteLine("--------------------");
                Console.WriteLine("--------------------");
                Console.WriteLine(logger);
                logger?.LogError(exception.Error, $"global <{context.Response.StatusCode} - {DateTimeOffset.UtcNow}>");
                var errorResponse = new
                {
                    msg = "服务器内部错误!",
                    code = HttpStatusCode.InternalServerError,
                };
                await context.Response.WriteAsync(JsonSerializer.Serialize(errorResponse));
            });
        });
    }
}