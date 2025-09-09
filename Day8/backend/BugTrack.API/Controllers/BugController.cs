using BugTrack.Core.DTOs;
using BugTrack.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BugTracker.API.Controllers
{
    [ApiExplorerSettings(GroupName = "bugs")]
    [ApiController]
    [Route("api/[controller]")]
    public class BugController : ControllerBase
    {
        private readonly IBugService _service;

        public BugController(IBugService service)
        {
            _service = service;
        }

        // ----------------- ASYNC -----------------

        [HttpGet("async")]
        [Authorize(Roles = "Admin,Tester,Developer")]
        public async Task<ActionResult<IEnumerable<BugResponseDTO>>> GetAllAsync()
        {
            var bugs = await _service.GetAllBugsAsync();
            return Ok(bugs);
        }

        [HttpGet("async/{id}", Name = "GetBugByIdAsync")]
        [Authorize(Roles = "Admin,Tester")]
        public async Task<ActionResult<BugResponseDTO>> GetByIdAsync(int id)
        {
            var bug = await _service.GetBugByIdAsync(id);
            if (bug == null)
                return NotFound();

            return Ok(bug);
        }

        [HttpPost("async")]
        [Authorize(Roles = "Admin,Developer")]
        public async Task<ActionResult> CreateAsync([FromBody] BugResquestDTO dto)
        {
            var id = await _service.CreateBugAsync(dto);
            var createdBug = await _service.GetBugByIdAsync(id);
            return CreatedAtRoute("GetBugByIdAsync", new { id }, createdBug);
        }

        [HttpPut("async/{id}")]
        [Authorize(Roles = "Admin,Developer")]
        public async Task<ActionResult> UpdateAsync(int id, [FromBody] BugResquestDTO dto)
        {
            var existing = await _service.GetBugByIdAsync(id);
            if (existing == null)
                return NotFound();

            // ✅ If Developer, block status changes
            var role = User.FindFirst(ClaimTypes.Role)?.Value;
            if (role == "Developer")
            {
                dto.Status = existing.Status; // enforce no status change
            }

            await _service.UpdateBugAsync(id, dto);
            return Ok("Bug updated successfully.");
        }

        [HttpPatch("async/{id}/status")]
        [Authorize(Roles = "Admin,Tester")]
        public async Task<ActionResult> PatchStatusAsync(int id, [FromBody] BugStatusUpdateDTO dto)
        {
            var existing = await _service.GetBugByIdAsync(id);
            if (existing == null)
                return NotFound();

            await _service.PatchBugStatusAsync(id, dto);
            return Ok("Bug status updated successfully.");
        }

        [HttpDelete("async/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> DeleteAsync(int id)
        {
            var existing = await _service.GetBugByIdAsync(id);
            if (existing == null)
                return NotFound();

            await _service.DeleteBugAsync(id);
            return Ok("Bug deleted successfully.");
        }

        [HttpGet("me")]
        [Authorize]
        public ActionResult GetMyClaims()
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var role = User.FindFirst(ClaimTypes.Role)?.Value;
            return Ok(new { username, role });
        }
    }
}
