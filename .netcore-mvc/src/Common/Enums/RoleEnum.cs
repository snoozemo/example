namespace Recorder.Common.Enums;

/// <summary>
/// RoleEnum: 角色枚举 0: 任何人 1: 管理员 2: 用户
/// </summary>
public enum RoleEnum
{
    /// <summary>
    ///  Any/任何人: 0
    /// </summary>
    Any = 0,

    /// <summary>
    ///  Admin/管理员: 1
    /// </summary>
    Admin = 1,

    /// <summary>
    ///  User/用户: 2
    /// </summary>
    User = 2,
    
    /// <summary>
    ///  Visitor/访客: 2
    /// </summary>
    Visitor = 3,
}