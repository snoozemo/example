using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using Recorder.Common.Enums;

namespace Recorder.Models.Entities;

/// <summary>
///  FrondEndRouteEntity: 前端路由实体类
/// </summary>
[Description("前端路由")]
[Table("front_end_route")]
public class FrondEndRouteEntity : BaseEntity
{
    /// <summary>
    ///  Origin: 路由的原始地址/名称
    /// </summary>
    [Description("路由的原始地址/名称")]
    [Column("origin")]
    public string Origin { get; set; } = null!;

    /// <summary>
    ///  Title: 路由的标题
    /// </summary>
    [Description("路由的标题")]
    [Column("title")]
    public string Title { get; set; } = null!;

    /// <summary>
    ///  Path: 路由的路径
    /// </summary>
    [Description("路由的路径")]
    [Column("path")]
    public string Path { get; set; } = null!;

    /// <summary>
    ///  Icon: 路由的图标
    /// </summary>
    [Description("路由的图标")]
    [Column("icon")]
    public string? Icon { get; set; } = null!;

    /// <summary>
    ///  ParentId: 父路由的ID
    /// </summary>
    [Description("父路由的ID")]
    [Column("parent_id")]
    public int? ParentId { get; set; }

    /// <summary>
    /// Order: 排序权重
    /// </summary>
    [Description("排序权重")]
    [Column("order")]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Order { get; set; }

    /// <summary>
    /// IsShow: 是否显示在菜单栏
    /// </summary>
    [Description("是否显示在菜单栏")]
    [Column("is_show")]
    [DefaultValue(true)]
    public bool IsShow { get; set; }

    /// <summary>
    /// PermissionLevel: 允许的权限等级 0: all 1: admin 2: user
    /// </summary>
    [Description("允许的权限等级 0: all 1: admin 2: user ")]
    [Column("permission_level")]
    [DefaultValue(RoleEnum.Any)]
    public int PermissionLevel { get; set; }
}