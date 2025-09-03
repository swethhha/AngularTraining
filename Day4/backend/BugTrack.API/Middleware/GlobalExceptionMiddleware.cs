using BugTrack.Core.DTOs;
using BugTrack.Core.Exceptions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Net;
using System.Text.Json;

namespace BugTrack.API.Middleware
{
    public class GlobalExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<GlobalExceptionMiddleware> _logger;
        private readonly IWebHostEnvironment _env;

        public GlobalExceptionMiddleware(RequestDelegate next, ILogger<GlobalExceptionMiddleware> logger, IWebHostEnvironment env)
        {
            _next = next;
            _logger = logger;
            _env = env;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception ex)
        {
            var correlationId = context.TraceIdentifier;
            context.Response.ContentType = "application/json";

            int statusCode;
            string message;
            string? details = null;

            switch (ex)
            {
                case NotFoundException notFoundException:
                    statusCode = StatusCodes.Status404NotFound;
                    message = notFoundException.Message;
                    details = _env.IsDevelopment() ? notFoundException.ToString() : null;
                    break;

                case ValidationException validationException:
                    statusCode = StatusCodes.Status400BadRequest;
                    message = validationException.Message;
                    details = _env.IsDevelopment() ? JsonSerializer.Serialize(validationException.Errors) : null;
                    break;

                default:
                    statusCode = StatusCodes.Status500InternalServerError;
                    message = "An unexpected error occurred.";
                    details = _env.IsDevelopment() ? ex.StackTrace : null;
                    break;
            }

            // Build error response after switch
            var errorResponse = new ErrorResponseDTO
            {
                StatusCode = statusCode,
                Message = message,
                Details = details,
                CorrelationId = correlationId
            };

            _logger.LogError(ex, "Unhandled Exception: {Message}", message);

            context.Response.StatusCode = statusCode;
            var jsonOptions = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };
            await context.Response.WriteAsync(JsonSerializer.Serialize(errorResponse, jsonOptions));
        }
    }
}
