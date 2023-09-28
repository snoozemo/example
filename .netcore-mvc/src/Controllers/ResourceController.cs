using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Recorder.Services.IServices;

namespace Recorder.Controllers;

/// <summary>
///  资源管理
/// </summary>
[ApiController]
[Route("api/[controller]/[action]")]
[Produces("application/json")]
[EnableCors("AllowAll")]
// 自定义一个安全的header头
public class ResourceController
{
    private readonly IRSAService _rsaService;

    public ResourceController(IRSAService rsaService)
    {
        _rsaService = rsaService;
    }

    /// <summary>
    ///  获取RSA公钥
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    public string PublicKey()
    {
        return _rsaService.GetPublicKey();
    }
}