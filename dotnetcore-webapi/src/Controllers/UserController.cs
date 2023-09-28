using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Recorder.Common.Attributes;
using Recorder.Common.Interfaces;
using Recorder.Models.Dto;
using Recorder.Services.IServices;

namespace Recorder.Controllers;

/// <summary>
///  用户管理
/// </summary>
[ApiController]
[Route("api/[controller]/[action]")]
[Produces("application/json")]
[EnableCors("AllowAll")]
public class UserController : ControllerBase
{
    private readonly IRSAService rsaService;
    private readonly IUserService userService;

    public UserController(IRSAService rsaService, IUserService userService)
    {
        this.rsaService = rsaService;
        this.userService = userService;
    }

    /// <summary>
    ///  获取用户详情
    /// </summary>
    /// <param name="id">用户Id</param>
    /// <returns></returns>
    /// <remarks>
    /// 示例:
    /// 
    ///     GET /api/user/details/1
    ///     {
    ///         "code": 200,
    ///         "msg": "请求成功",
    ///         "data": {}
    ///     }
    /// 
    /// </remarks>
    [HttpGet("{id:long}")]
    // [AuthorizationFilter]
    public ActionResult<IHttpResult<List<int>>> Details(long id)
    {
        rsaService.GetPublicKey();
        return Ok(rsaService.GetPublicKey());
    }

    /// <summary>
    ///  获取用户列表 
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    [Authorization]
    public ActionResult<IHttpResult<List<int>>> List()
    {
        return Ok("get user list");
    }

    /// <summary>
    ///  创建用户
    /// </summary>
    /// <returns></returns>
    [HttpPost]
    [Authorization]
    public IActionResult Create([FromBody] CreateUserDto user)
    {
        return Ok(user);
        // throw new HttpResponseException(HttpStatusCode.BadRequest, "8888");
        // return BadRequest(new JsonResult(new { a = 1, b = 2 }));
        // return Ok("222");
    }

    /// <summary>
    ///  登录获取凭证
    /// </summary>
    /// <returns></returns>
    [HttpPost]
    [Authorization]
    public IActionResult SignIn()
    {
        return Ok("SignIn");
    }

    /// <summary>
    ///  更新用户
    /// </summary>
    /// <returns></returns>
    [HttpPut]
    [Authorization]
    public IActionResult Update()
    {
        return Ok("Update");
    }

    /// <summary>
    ///  封禁用户
    /// </summary>
    /// <returns></returns>
    [HttpPut]
    [Authorization]
    public IActionResult Ban()
    {
        return Ok("Delete");
    }

    /// <summary>
    ///  删除用户
    /// </summary>
    /// <returns></returns>
    [HttpDelete]
    [Authorization]
    public IActionResult Delete()
    {
        // return Ok(new { msg = "test", code = 400 });
        // throw new Exception(JsonSerializer.Serialize(new { msg = "test", code = 400 }));
        return Ok("Delete");
    }
}