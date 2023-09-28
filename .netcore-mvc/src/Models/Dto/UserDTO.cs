using System.ComponentModel.DataAnnotations;

namespace Recorder.Models.Dto;

/// <summary>
///  GetUserDTO: 获取用户信息
/// </summary>
public class GetUserDTO
{
    /// <summary>
    ///  Id: 用户Id
    /// </summary>
    [Required(ErrorMessage = "id不能为空")]
    [Range(1, Double.MaxValue, ErrorMessage = "id必须大于0")]
    public int id { get; set; }
}

/// <summary>
///  GetUserByAdminDTO: 获取用户信息(管理员)
/// </summary>
public class GetUserByAdminDTO : GetUserDTO
{
}

public class GetUsersByAdminDTO : PaginationBaseDTO
{
}

public class CreateUserDto
{
    /// <summary>
    ///  用户名
    /// </summary>
    [Required(ErrorMessage = "username不能为空")]
    public string? username { get; set; }
}

public class UpdateUserDTO
{
}

public class DeleteUserDTO
{
}