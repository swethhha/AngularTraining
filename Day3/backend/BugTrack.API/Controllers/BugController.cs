using BugTrack.Core.DTOs;
using BugTrack.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BugTracker.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class BugController : ControllerBase
    {
        private readonly IBugService _service;

        public BugController(IBugService service)
        {
            _service = service;
        }

        // ----------------- SYNC -----------------
        [HttpGet("sync")]
        public ActionResult<IEnumerable<BugResponseDTO>> GetAll()
        {
            var bugs = _service.GetAllBugs();
            return Ok(bugs);
        }

        [HttpGet("sync/{id}", Name = "GetBugByIdSync")]
        public ActionResult<BugResponseDTO> GetById(int id)
        {
            var bug = _service.GetBugById(id);
            if (bug == null)
                return NotFound();

            return Ok(bug);
        }

        [HttpPost("sync")]
        public ActionResult Create([FromBody] BugResquestDTO dto)
        {
            var id = _service.CreateBug(dto);
            var createdBug = _service.GetBugById(id);
            return CreatedAtRoute("GetBugByIdSync", new { id }, createdBug);
        }

        [HttpPut("sync/{id}")]
        public ActionResult Update(int id, [FromBody] BugResquestDTO dto)
        {
            var existing = _service.GetBugById(id);
            if (existing == null)
                return NotFound();

            _service.UpdateBug(id, dto);
            return Ok("Bug updated successfully.");
        }

        [HttpDelete("sync/{id}")]
        public ActionResult Delete(int id)
        {
            var existing = _service.GetBugById(id);
            if (existing == null)
                return NotFound();

            _service.DeleteBug(id);
            return Ok("Bug deleted successfully.");
        }

        // ----------------- ASYNC -----------------
        [HttpGet("async")]
        public async Task<ActionResult<IEnumerable<BugResponseDTO>>> GetAllAsync()
        {
            var bugs = await _service.GetAllBugsAsync();
            return Ok(bugs);
        }

        [HttpGet("async/{id}", Name = "GetBugByIdAsync")]
        public async Task<ActionResult<BugResponseDTO>> GetByIdAsync(int id)
        {
            var bug = await _service.GetBugByIdAsync(id);
            if (bug == null)
                return NotFound();

            return Ok(bug);
        }

        [HttpPost("async")]
        public async Task<ActionResult> CreateAsync([FromBody] BugResquestDTO dto)
        {
            var id = await _service.CreateBugAsync(dto);
            var createdBug = await _service.GetBugByIdAsync(id);
            return CreatedAtRoute("GetBugByIdAsync", new { id }, createdBug);
        }

        [HttpPut("async/{id}")]
        public async Task<ActionResult> UpdateAsync(int id, [FromBody] BugResquestDTO dto)
        {
            var existing = await _service.GetBugByIdAsync(id);
            if (existing == null)
                return NotFound();

            await _service.UpdateBugAsync(id, dto);
            return Ok("Bug updated successfully.");
        }

        [HttpDelete("async/{id}")]
        public async Task<ActionResult> DeleteAsync(int id)
        {
            var existing = await _service.GetBugByIdAsync(id);
            if (existing == null)
                return NotFound();

            await _service.DeleteBugAsync(id);
            return Ok("Bug deleted successfully.");
        }
    }
}
