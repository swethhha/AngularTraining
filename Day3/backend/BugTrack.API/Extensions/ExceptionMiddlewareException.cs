using BugTrack.API.Middleware;

namespace BugTrack.API.Extensions
{
    public static class ExceptionMiddlewareException
    {
        public static IApplicationBuilder UseExceptionMiddleware(this IApplicationBuilder app)
        {
            return app.UseMiddleware<GlobalExceptionMiddleware>();
        }
    }
}
