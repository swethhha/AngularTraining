using BugTrack.Core.DTOs;
using BugTrack.Core.Entities;
using BugTrack.Core.Exceptions;
using BugTrack.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BugTrack.Application.Services
{
    public class BugService : IBugService
    {
        private readonly IBugRepository _bugRepository;

        public BugService(IBugRepository bugRepository)
        {
            _bugRepository = bugRepository;
        }

        public async Task<int> CreateBugAsync(BugResquestDTO request)
        {
            if (string.IsNullOrWhiteSpace(request.Title))
            {
                throw new ValidationException(new Dictionary<string, string[]>
                {
                    { "Title", new[] { "Title is required." } }
                });
            }

            var bug = new Bug
            {
                Title = request.Title,
                Description = request.Description,
                Status = request.Status,
                Priority = request.Priority,
                CreatedOn = DateTime.UtcNow,
                AssignedTo = request.AssignedTo,
                ProjectId = request.ProjectId
            };

            await _bugRepository.AddAsync(bug);
            return bug.Id;
        }

        public async Task UpdateBugAsync(int id, BugResquestDTO request)
        {
            var bug = await _bugRepository.GetByIdAsync(id);
            if (bug == null)
                throw new NotFoundException($"Bug with ID {id} not found.");

            if (string.IsNullOrWhiteSpace(request.Title))
            {
                throw new ValidationException(new Dictionary<string, string[]>
                {
                    { "Title", new[] { "Title is required." } }
                });
            }

            bug.Title = request.Title;
            bug.Description = request.Description;
            bug.Status = request.Status;   // ⚠ Admin only (restrict via controller)
            bug.ProjectId = request.ProjectId;
            bug.Priority = request.Priority;
            bug.AssignedTo = request.AssignedTo;

            await _bugRepository.UpdateAsync(bug);
        }

        // ✅ PATCH (Tester role)
        public async Task PatchBugStatusAsync(int id, BugStatusUpdateDTO request)
        {
            var bug = await _bugRepository.GetByIdAsync(id);
            if (bug == null)
                throw new NotFoundException($"Bug with ID {id} not found.");

            if (string.IsNullOrWhiteSpace(request.Status))
            {
                throw new ValidationException(new Dictionary<string, string[]>
                {
                    { "Status", new[] { "Status is required." } }
                });
            }

            bug.Status = request.Status;
            await _bugRepository.UpdateAsync(bug);
        }

        public async Task DeleteBugAsync(int id)
        {
            var bug = await _bugRepository.GetByIdAsync(id);
            if (bug == null)
                throw new NotFoundException($"Bug with ID {id} not found.");

            await _bugRepository.DeleteAsync(id);
        }

        public async Task<BugResponseDTO?> GetBugByIdAsync(int id)
        {
            var bug = await _bugRepository.GetByIdAsync(id);
            if (bug == null)
                throw new NotFoundException($"Bug with ID {id} not found.");

            return MapToResponseDTO(bug);
        }

        public async Task<IEnumerable<BugResponseDTO>> GetAllBugsAsync()
        {
            var bugs = await _bugRepository.GetAllAsync();
            return bugs.Select(MapToResponseDTO);
        }

        private BugResponseDTO MapToResponseDTO(Bug bug)
        {
            return new BugResponseDTO
            {
                Id = bug.Id,
                Title = bug.Title,
                Description = bug.Description,
                Status = bug.Status,
                CreatedOn = bug.CreatedOn,
                ProjectId = bug.ProjectId,
                Priority = bug.Priority,
                AssignedTo = bug.AssignedTo,
            };
        }
    }
}
