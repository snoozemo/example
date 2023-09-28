using Recorder.Services;
using Recorder.Services.IServices;

namespace Recorder.Extensions;

public static class ServiceExtensions
{
    public static void AddGlobalServices(this IServiceCollection services)
    {
        /* serivces dependency injection */
        services.AddTransient<IArticleService, ArticleService>();
        services.AddTransient<ICommitService, CommitService>();
        services.AddTransient<IMenuService, MenuService>();
        services.AddTransient<IMessageService, MessageService>();
        services.AddTransient<IUserService, UserService>();
        services.AddTransient<IMailerService, MailerService>();
        services.AddTransient<IDictionaryService, DictionaryService>();
        /* serivces of task dependency injection */
        services.AddSingleton<ITaskService, TaskService>();
        services.AddSingleton<IRSAService, RSAService>();
    }
}