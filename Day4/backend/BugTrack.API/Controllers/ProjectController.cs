using BugTrack.Core.DTOs;
using BugTrack.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BugTracker.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _projectService;

        public ProjectController(IProjectService projectService)
        {
            _projectService = projectService;
        }



        [HttpPost("sync")]
        public IActionResult CreateProject([FromBody] ProjectRequestDTO request)
        {
            if (request == null) return BadRequest("Project data is required.");
            _projectService.CreateProject(request);
            return Ok("Project created successfully.");
        }

        [HttpGet("sync")]
        public IActionResult GetAllProjects()
        {
            var projects = _projectService.GetAllProjects();
            return Ok(projects);
        }

        [HttpGet("sync/{id}")]
        public IActionResult GetProjectById(int id)
        {
            var project = _projectService.GetProjectById(id);
            if (project == null) return NotFound($"Project with ID {id} not found.");
            return Ok(project);
        }

        [HttpPut("sync/{id}")]
        public IActionResult UpdateProject(int id, [FromBody] ProjectRequestDTO request)
        {
            if (request == null) return BadRequest("Project data is required.");
            var existing = _projectService.GetProjectById(id);
            if (existing == null) return NotFound($"Project with ID {id} not found.");

            _projectService.UpdateProject(id, request);
            return Ok("Project updated successfully.");
        }

        [HttpDelete("sync/{id}")]
        public IActionResult DeleteProject(int id)
        {
            var existing = _projectService.GetProjectById(id);
            if (existing == null) return NotFound($"Project with ID {id} not found.");

            _projectService.DeleteProject(id);
            return Ok("Project deleted successfully.");
        }



        [HttpPost("async")]
        public async Task<IActionResult> CreateProjectAsync([FromBody] ProjectRequestDTO request)
        {
            if (request == null) return BadRequest("Project data is required.");
            await _projectService.CreateProjectAsync(request);
            return Ok("Project created successfully.");
        }

        [HttpGet("async")]
        public async Task<IActionResult> GetAllProjectsAsync()
        {
            var projects = await _projectService.GetAllProjectsAsync();
            return Ok(projects);
        }

        [HttpGet("async/{id}")]
        public async Task<IActionResult> GetProjectByIdAsync(int id)
        {
            var project = await _projectService.GetProjectByIdAsync(id);
            if (project == null) return NotFound($"Project with ID {id} not found.");
            return Ok(project);
        }

        [HttpPut("async/{id}")]
        public async Task<IActionResult> UpdateProjectAsync(int id, [FromBody] ProjectRequestDTO request)
        {
            if (request == null) return BadRequest("Project data is required.");
            var existing = await _projectService.GetProjectByIdAsync(id);
            if (existing == null) return NotFound($"Project with ID {id} not found.");

            await _projectService.UpdateProjectAsync(id, request);
            return Ok("Project updated successfully.");
        }

        [HttpDelete("async/{id}")]
        public async Task<IActionResult> DeleteProjectAsync(int id)
        {
            var existing = await _projectService.GetProjectByIdAsync(id);
            if (existing == null) return NotFound($"Project with ID {id} not found.");

            await _projectService.DeleteProjectAsync(id);
            return Ok("Project deleted successfully.");
        }
    }
}