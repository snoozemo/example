using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace Recorder.Models.Entities;

/// <summary>
/// BlogCommitEntity: 博客文章评论实体类
/// </summary>
[Description("博客文章评论")]
[Table("blog_commit")]
public class BlogCommitEntity : BaseEntity
{
    /// <summary>
    /// CommitContent: 博客文章评论内容
    /// </summary>
    [Description("博客文章评论内容")]
    [Column("commit_content")]
    public string CommitContent { get; set; } = null!;

    /// <summary>
    /// CommitArticleId: 博客文章评论的文章Id
    /// </summary>
    [Description("博客文章评论的文章Id")]
    [Column("commit_article_id")]
    public int CommitArticleId { get; set; }

    /// <summary>
    /// CommitUserId: 博客文章评论的用户Id
    /// </summary>
    [Description("博客文章评论的用户Id")]
    [Column("commit_user_id")]
    public int CommitUserId { get; set; }

    /// <summary>
    /// BeCommitId: 博客文章评论的父级评论Id
    /// </summary>
    [Description("博客文章评论的父级评论Id")]
    [Column("be_commit_id")]
    public int? BeCommitId { get; set; }
}