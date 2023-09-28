using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace Recorder.Models.Entities;

/// <summary>
/// BlogMessageEntity: 博客留言实体类
/// </summary>
[Description("博客留言")]
[Table("blog_message")]
public class BlogMessageEntity : BaseEntity
{
    [Description("博客留言内容")]
    [Column("message_content")]
    public string MessageContent { get; set; } = null!;

    [Description("博客留言的用户Id")]
    [Column("message_user_id")]
    public int MessageUserId { get; set; }

    [Description("博客留言的父级留言Id")]
    [Column("be_message_id")]
    public int? BeMessageId { get; set; }
}