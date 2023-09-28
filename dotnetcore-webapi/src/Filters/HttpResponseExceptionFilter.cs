using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Recorder.Common.Exceptions;

namespace Recorder.Filters;

/// <summary>
///  HttpResponse错误过滤器
/// </summary>
public class HttpResponseExceptionFilter : Attribute, IExceptionFilter
{
    public void OnException(ExceptionContext context)
    {
        if (context.ExceptionHandled) return;
        var logger = context.HttpContext.RequestServices.GetService<ILogger>();
        logger?.LogError(context.Exception,
            $"controller & action <{context.HttpContext.Response.StatusCode} - {DateTimeOffset.UtcNow}>");

        if (context.Exception is HttpResponseException exception)
        {
            context.HttpContext.Response.StatusCode = (int)exception.StatusCode;
            context.Result = new JsonResult(new { code = exception.StatusCode, msg = exception.Message });
        }
        else
        {
            context.HttpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            context.Result = new JsonResult(new { code = HttpStatusCode.InternalServerError, msg = "接口内部错误!" });
        }

        context.ExceptionHandled = true;
    }
}