using BugTrack.MVC.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Json;

namespace BugTrack.MVC.Controllers
{
    public class BugController : Controller
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<BugController> _logger;

        public BugController(IHttpClientFactory factory, ILogger<BugController> logger)
        {
            _httpClient = factory.CreateClient("BugTrackAPI");
            _logger = logger;
        }

        // GET: Bug/Index
        public async Task<IActionResult> Index()
        {
            try
            {
                var bugs = await _httpClient.GetFromJsonAsync<IEnumerable<BugViewModel>>("api/bug/sync");
                return View(bugs);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching bugs");
                return View(new List<BugViewModel>());
            }
        }

        // GET: Bug/Details/5
        public async Task<IActionResult> Details(int id)
        {
            try
            {
                var bug = await _httpClient.GetFromJsonAsync<BugViewModel>($"api/bug/sync/{id}");
                if (bug == null)
                    return NotFound();

                return View(bug);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error fetching bug details for Id={id}");
                return NotFound();
            }
        }
    }
}
