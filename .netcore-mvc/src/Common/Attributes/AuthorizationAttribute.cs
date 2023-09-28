using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Recorder.Common.Enums;
using Recorder.Common.Exceptions;

namespace Recorder.Common.Attributes;

/// <summary>
///  授权过滤器
/// </summary>
public class AuthorizationAttribute : Attribute, IAuthorizationFilter
{
    private readonly int[] _role = ((int[])Enum.GetValues(typeof(RoleEnum))).ToArray();

    public AuthorizationAttribute()
    {
    }

    public AuthorizationAttribute(int[] role)
    {
        _role = role;
    }


    public void OnAuthorization(AuthorizationFilterContext context)
    {
        // 使用 logger
        var logger = context.HttpContext.RequestServices.GetService<ILogger>();
        logger?.LogError($"controller & action <{context.HttpContext.Response.StatusCode} - {DateTimeOffset.UtcNow}>");
        if (!CheckTime(context))
        {
            context.Result = new JsonResult(new { code = 401, msg = "请求失效" });
        }

        if (!CheckRole(context))
        {
            context.Result = new JsonResult(new { code = 401, msg = "权限不足" });
        }

        if (!CheckToken(context))
        {
            context.Result = new JsonResult(new { code = 401, msg = "Token失效" });
        }
    }

    /// <summary>
    ///  检查时间
    /// </summary>
    /// <param name="context"></param>
    /// <returns></returns>
    private static bool CheckTime(ActionContext context)
    {
        var date = context.HttpContext.Request.Headers["Date"];
        return date.Count != 0 && DateTime.TryParse(date, out var time) &&
               DateTime.Now - time < TimeSpan.FromMinutes(5);
    }

    /// <summary>
    ///  TODO: 检查签名
    /// </summary>
    /// <param name="context"></param>
    /// <returns></returns>
    private static bool CheckSign(ActionContext context)
    {
        return true;
    }

    /// <summary>
    ///  检查角色
    /// </summary>
    /// <param name="context">FilterContext</param>
    /// <returns></returns>
    private static bool CheckRole(FilterContext context)
    {
        return true;
    }

    /// <summary>
    ///  检查Token
    /// </summary>
    /// <param name="context"></param>
    /// <returns></returns>
    private static bool CheckToken(FilterContext context)
    {
        return true;
    }
}