using BugTrack.Core.DTOs;
using BugTrack.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BugTracker.API.Controllers
{
    [ApiExplorerSettings(GroupName = "projects")]
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _projectService;

        public ProjectController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        // POST: api/project
        [HttpPost]
        [Authorize(Roles = "Admin,Developer")]
        public async Task<IActionResult> CreateProject([FromBody] ProjectRequestDTO request)
        {
            if (request == null)
                return BadRequest("Project data is required.");

            await _projectService.CreateProjectAsync(request);
            return Ok("Project created successfully.");
        }

        // GET: api/project
        [HttpGet]
        [Authorize(Roles = "Admin,User,Developer")]
        public async Task<IActionResult> GetAllProjects()
        {
            var projects = await _projectService.GetAllProjectsAsync();
            return Ok(projects);
        }

        // GET: api/project/{id}
        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,User,Developer")]
        public async Task<IActionResult> GetProjectById(int id)
        {
            var project = await _projectService.GetProjectByIdAsync(id);
            if (project == null)
                return NotFound($"Project with ID {id} not found.");

            return Ok(project);
        }

        // PUT: api/project/{id}
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Developer")]
        public async Task<IActionResult> UpdateProject(int id, [FromBody] ProjectRequestDTO request)
        {
            if (request == null)
                return BadRequest("Project data is required.");

            var existing = await _projectService.GetProjectByIdAsync(id);
            if (existing == null)
                return NotFound($"Project with ID {id} not found.");

            await _projectService.UpdateProjectAsync(id, request);
            return Ok("Project updated successfully.");
        }

        // DELETE: api/project/{id}
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            var existing = await _projectService.GetProjectByIdAsync(id);
            if (existing == null)
                return NotFound($"Project with ID {id} not found.");

            await _projectService.DeleteProjectAsync(id);
            return Ok("Project deleted successfully.");
        }
    }
}
