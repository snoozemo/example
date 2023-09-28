using Microsoft.EntityFrameworkCore;
using Recorder.Models.Entities;

namespace Recorder.Common.Contexts;

public class RecorderDbContext : DbContext
{
    public DbSet<UserEntity> User { get; set; } = null!;
    public DbSet<BlogCommitEntity> Commit { get; set; } = null!;
    public DbSet<FrondEndRouteEntity> FrondEndRoute { get; set; } = null!;
    public DbSet<BlogMessageEntity> Message { get; set; } = null!;
    public DbSet<DictionaryEntity> Dictionary { get; set; } = null!;
    public DbSet<BlogArticleEntity> Article { get; set; } = null!;


    public RecorderDbContext(DbContextOptions options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var _entity_list = new List<Type>()
            {
                typeof(UserEntity),
                typeof(BlogCommitEntity),
                typeof(FrondEndRouteEntity),
                typeof(BlogMessageEntity),
                typeof(DictionaryEntity),
                typeof(BlogArticleEntity)
            }
            ;
        _entity_list.ForEach(E =>
        {
            modelBuilder.Entity(E)
                .Property<DateTime>("CreatedTime")
                .HasDefaultValueSql("now()")
                .ValueGeneratedOnAdd();
            modelBuilder.Entity(E)
                .Property<DateTime>("UpdatedTime")
                .HasDefaultValueSql("now()")
                .ValueGeneratedOnAddOrUpdate();
            modelBuilder.Entity(E).Property<long>("Id").HasIdentityOptions(startValue: 10000);
        });
    }
}