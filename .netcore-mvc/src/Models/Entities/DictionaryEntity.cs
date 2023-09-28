using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace Recorder.Models.Entities;

/// <summary>
///  DictionaryEntity: 字典实体类
/// </summary>
[Description("字典")]
[Table("dictionary")]
public class DictionaryEntity : BaseEntity
{
    /// <summary>
    ///  Name: 字典名称
    /// </summary>
    [Description("字典名称")]
    [Column("name")]
    public string Name { get; set; } = null!;

    /// <summary>
    ///  Key: 字典的键
    /// </summary>
    [Description("字典的键")]
    [Column("key")]
    public string Key { get; set; } = null!;

    /// <summary>
    ///  Value: 字典的值
    /// </summary>
    [Description("字典的值")]
    [Column("value")]
    public int Value { get; set; }
}