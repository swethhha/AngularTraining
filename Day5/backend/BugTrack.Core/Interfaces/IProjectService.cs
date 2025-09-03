using BugTrack.Core.DTOs;
using BugTrack.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BugTrack.Core.Interfaces
{
    public interface IProjectService
    {
        void CreateProject(ProjectRequestDTO request);
        ProjectResponseDTO? GetProjectById(int id);
        IEnumerable<ProjectResponseDTO> GetAllProjects();
        void UpdateProject(int id, ProjectRequestDTO request);
        void DeleteProject(int id);

        // Async
        Task CreateProjectAsync(ProjectRequestDTO request);
        Task<ProjectResponseDTO?> GetProjectByIdAsync(int id);
        Task<IEnumerable<ProjectResponseDTO>> GetAllProjectsAsync();
        Task UpdateProjectAsync(int id, ProjectRequestDTO request);
        Task DeleteProjectAsync(int id);

    }
}
