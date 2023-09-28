using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Recorder.Common.Enums;

namespace Recorder.Models.Entities;

/// <summary>
/// BaseEntity: 基础实体类
/// </summary>
public class BaseEntity
{
    /// <summary>
    /// Id: 自增主键Id
    /// </summary>
    [Description("primary key")]
    [Column("id")]
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }

    /// <summary>
    /// Status 0: 删除 1: 正常 2: 冻结 3: 封禁
    /// </summary>
    [Description("status 0: delete 1: normal 2: freeze 3: ban ")]
    [Column("status")]
    [DefaultValue(StatusEnum.Normal)]
    public int Status { get; set; }

    /// <summary>
    /// CreateTime: 创建时间
    /// </summary>
    [Description("create time")]
    [Column("create_time")]
    public DateTime CreateTime { get; set; }

    /// <summary>
    /// UpdateTime: 更新时间
    /// </summary>
    [Description("update time")]
    [Column("update_time")]
    public DateTime UpdateTime { get; set; }
}