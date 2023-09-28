using System.Security.Cryptography;
using System.Text;
using Recorder.Services.IServices;

namespace Recorder.Services;

/// <summary>
///  RSAService : RSA 加密解密服务
/// </summary>
public sealed class RSAService : IRSAService
{
    /// <summary>
    ///  _rsa  密钥对
    /// </summary>
    private readonly RSA _rsa;

    public RSAService()
    {
        _rsa = RSA.Create();
    }

    /// <summary>
    ///  获取公钥
    /// </summary>
    /// <returns></returns>
    public string GetPublicKey()
    {
        return _rsa.ExportRSAPublicKeyPem();
    }

    /// <summary>
    ///  获取私钥
    /// </summary>
    /// <returns></returns>
    public string GetPrivateKey()
    {
        return _rsa.ExportRSAPrivateKeyPem();
    }

    /// <summary>
    /// RSA 加密
    /// </summary>
    /// <param name="data"></param>
    /// <returns></returns>
    public string Encrypt(string data)
    {
        var bytes = Encoding.UTF8.GetBytes(data);
        var encryptedBytes = _rsa.Encrypt(bytes, RSAEncryptionPadding.Pkcs1);
        return Convert.ToBase64String(encryptedBytes);
    }

    /// <summary>
    /// RSA 解密
    /// </summary>
    /// <param name="data"></param>
    /// <returns></returns>
    public string Decrypt(string data)
    {
        var bytes = Convert.FromBase64String(data);
        var decryptedBytes = _rsa.Decrypt(bytes, RSAEncryptionPadding.Pkcs1);
        return Encoding.UTF8.GetString(decryptedBytes);
    }
}