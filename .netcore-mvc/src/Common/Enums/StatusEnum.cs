namespace Recorder.Common.Enums;

/// <summary>
/// Status: 状态枚举 0: 删除 1: 正常 2: 冻结 3: 封禁
/// </summary>
public enum StatusEnum
{
    /// <summary>
    ///  Delete/删除: 0
    /// </summary>
    Delete = 0,

    /// <summary>
    ///  Normal/正常: 1
    /// </summary>
    Normal = 1,

    /// <summary>
    ///  Freeze/冻结: 2
    /// </summary>
    Freeze = 2,

    /// <summary>
    ///  Ban/封禁: 3
    /// </summary>
    Ban = 3,
}