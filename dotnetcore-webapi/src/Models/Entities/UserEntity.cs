using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using Recorder.Common.Enums;

namespace Recorder.Models.Entities;

/// <summary>
///  UserEntity: 用户实体类
/// </summary>
[Description("用户")]
[Table("user")]
public class UserEntity : BaseEntity
{
    /// <summary>
    /// 自增Uid
    /// </summary>
    [Description("uuid")]
    [Column("uid")]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Uid { get; set; }

    /// <summary>
    ///  用户名
    /// </summary>
    [Description("用户名")]
    [Column("username")]
    public string Username { get; set; } = null!;

    /// <summary>
    ///  角色
    /// </summary>
    [Description("角色")]
    [Column("role")]
    [DefaultValue(RoleEnum.Visitor)]
    public int Role { get; set; }

    /// <summary>
    ///  密码
    /// </summary>
    [Description("密码")]
    [Column("password")]
    public string? Password { get; set; }

    /// <summary>
    ///  邮箱地址
    /// </summary>
    [Description("邮箱地址")]
    [Column("mail_address")]
    public string? MailAddress { get; set; }

    /// <summary>
    /// 头像
    /// </summary>
    [Description("头像")]
    [Column("avatar")]
    public string? Avatar { get; set; }

    /// <summary>
    ///  昵称
    /// </summary>
    [Description("昵称")]
    [Column("nickname")]
    public string Nickname { get; set; } = null!;

    /// <summary>
    ///  性别
    /// </summary>
    [Description("性别")]
    [DefaultValue(GenderEnum.Other)]
    [Column("gender")]
    public string Gender { get; set; } = null!;

    /// <summary>
    /// github id
    /// </summary>
    [Description("github id")]
    [Column("gid")]
    public string? Gid { get; set; }

    /// <summary>
    /// qq id
    /// </summary>
    [Description("qq id")]
    [Column("qid")]
    public string? Qid { get; set; }

    /// <summary>
    /// 自我介绍
    /// </summary>
    [Description("自我介绍")]
    [Column("introduction")]
    public string? Introduction { get; set; }
}