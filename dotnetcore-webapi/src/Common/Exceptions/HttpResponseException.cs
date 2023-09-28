using System.Net;

namespace Recorder.Common.Exceptions;

/// <summary>
///  自定义Controller中的异常处理
/// </summary>
public class HttpResponseException : Exception
{
    public HttpStatusCode StatusCode { get; }

    public HttpResponseException(HttpStatusCode statusCode, string message) : base(message)
    {
        StatusCode = statusCode;
    }

    public HttpResponseException(string message) : base(message)
    {
        StatusCode = HttpStatusCode.InternalServerError;
    }
}