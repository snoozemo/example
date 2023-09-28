using Microsoft.EntityFrameworkCore;
using Recorder.Common.Contexts;
using Recorder.Extensions;
using Recorder.Filters;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();

builder.Logging.ClearProviders();
builder.Logging.AddConsole();

/* 获取配置 */
var configuration = builder.Configuration;

/* 新增 AllowAll Cors 规则 */
builder.Services.AddCors(o => o.AddPolicy("AllowAll", op => op.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));
/* 路由地址小写 */
builder.Services.AddRouting(options => options.LowercaseUrls = true);

/* 初始化数据库上下文 */
builder.Services.AddDbContextPool<RecorderDbContext>(options =>
{
    options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
    options.UseNpgsql(configuration.GetConnectionString("DefaultConnection"));
});

/* 添加服务 ./src/Extensions/ServiceExtensions.cs */
builder.Services.AddGlobalServices();

/* 添加全局过滤器 */
builder.Services.AddControllers(options =>
{
    options.Filters.Add<HttpResponseExceptionFilter>();
    options.Filters.Add<HttpResponseResultFilter>();
});

if (builder.Environment.IsDevelopment())
{
    /* 添加 Swagger ./src/Extensions/SwaggerExtension.cs */
    builder.Services.AddAppSwagger();
}

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    /* 使用 Swagger ./src/Extensions/SwaggerExtension.cs */
    app.UseGlobalSwagger();
}

/* 使用异常处理中间件 */
app.UseGlobalExceptionHandler();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors();

app.Run();