using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Recorder.Filters;

/// <summary>
///  全局返回过滤器
/// </summary>
public class HttpResponseResultFilter : ResultFilterAttribute
{
    /// <summary>
    ///  在执行结果之前进行返回结果处理
    /// </summary>
    /// <param name="context">action 上下文</param>
    public override void OnResultExecuting(ResultExecutingContext context)
    {
        var value = (context.Result as ObjectResult)?.Value;
        var code = context.HttpContext.Response.StatusCode;
        const string msg = "请求成功";
        if (!context.ModelState.IsValid)
        {
            CheckValidation(context, out var errors);
            context.Result = new JsonResult(new { code = HttpStatusCode.BadRequest, msg = "请求参数错误", data = errors });
            return;
        }

        var msgParam = value?.GetType().GetProperty("msg")?.GetValue(value);
        var codegParam = value?.GetType().GetProperty("code")?.GetValue(value);

        context.Result = new JsonResult(new { code = codegParam ?? code, msg = msgParam ?? msg, data = value });
    }

    /// <summary>
    ///  模型验证
    /// </summary>
    /// <param name="context">action 上下文</param>
    /// <param name="errors">错误列表</param>
    private static void CheckValidation(ActionContext context, out Dictionary<string, string> errors
    )
    {
        errors = new Dictionary<string, string>();
        foreach (var key in context.ModelState.Keys)
        {
            var state = context.ModelState[key];
            if (state?.ValidationState != ModelValidationState.Invalid) continue;
            var error = state.Errors.FirstOrDefault();
            if (error != null)
            {
                errors.Add(key, error.ErrorMessage);
            }
        }
    }
}