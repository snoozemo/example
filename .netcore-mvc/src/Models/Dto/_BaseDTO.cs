using System.ComponentModel.DataAnnotations;

namespace Recorder.Models.Dto;

/// <summary>
///  ReqBodyBaseDTO: 请求数据基类
/// </summary>
/// <typeparam name="T"></typeparam>
public class ReqBodyBaseDTO<T>
{
    /// <summary>
    ///  data: 数据
    /// </summary>
    public T data { get; set; } = default!;

    /// <summary>
    ///  sign: 签名
    /// </summary>
    public string sign { get; set; } = null!;

    /// <summary>
    ///  timestamp: 时间戳
    /// </summary>
    public long timestamp { get; set; }
}

/// <summary>
/// PaginationBaseDTO: 分页基类
/// </summary>
public class PaginationBaseDTO

{
    /// <summary>
    ///  pageSize: 每页数量
    /// </summary>
    [Required(ErrorMessage = "pageSize不能为空")]
    [Range(1, Double.MaxValue, ErrorMessage = "pageSize必须大于0")]
    public int pageSize { get; set; }

    /// <summary>
    ///  current: 当前页
    /// </summary>
    [Required(ErrorMessage = "current不能为空")]
    [Range(1, Double.MaxValue, ErrorMessage = "current必须大于0")]
    public int current { get; set; }
}