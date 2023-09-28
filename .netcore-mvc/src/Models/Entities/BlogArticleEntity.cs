using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace Recorder.Models.Entities;

/// <summary>
/// BlogArticleEntity: 博客文章实体类
/// </summary>
[Description("博客文章")]
[Table("blog_article")]
public class BlogArticleEntity : BaseEntity
{
    /// <summary>
    /// ArticleTitle: 博客文章标题
    /// </summary>
    [Description("博客文章标题")]
    [Column("article_title")]
    public string ArticleTitle { get; set; } = null!;

    /// <summary>
    /// ArticleContent: 博客文章内容
    /// </summary>
    [Description("博客文章内容")]
    [Column("article_content")]
    public string ArticleContent { get; set; } = null!;

    /// <summary>
    /// ArticleImagesUrl: 博客文章图片地址
    /// </summary>
    [Description("博客文章图片地址")]
    [Column("article_images_url")]
    public string? ArticleImagesUrl { get; set; }

    /// <summary>
    /// ArticleAuthorId: 博客文章作者Id
    /// </summary>
    [Description("博客文章作者Id")]
    [Column("article_author_id")]
    public string ArticleAuthorId { get; set; } = null!;
}