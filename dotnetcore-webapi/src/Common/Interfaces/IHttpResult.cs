namespace Recorder.Common.Interfaces;

/// <summary>
/// IHttpResult: 返回的数据格式
/// </summary>
/// <typeparam name="T"> data的数据格式 </typeparam>
public interface IHttpResult<T>
{
    /// <summary>
    /// msg: 返回提示信息
    /// </summary>
    public string msg { get; set; }

    /// <summary>
    /// code: 返回状态码
    /// </summary>
    public int code { get; set; }

    /// <summary>
    /// data?: 返回数据
    /// </summary>
    public T? data { get; set; }
}