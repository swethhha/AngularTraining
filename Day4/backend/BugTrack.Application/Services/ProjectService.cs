using BugTrack.Core.DTOs;
using BugTrack.Core.Entities;
using BugTrack.Core.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BugTracker.Core.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IProjectRepository _projectRepository;

        public ProjectService(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

        // Sync
        public void CreateProject(ProjectRequestDTO request)
        {
            var project = new Project
            {
                Name = request.Name,
                Description = request.Description
            };
            _projectRepository.Add(project);
        }

        public ProjectResponseDTO? GetProjectById(int id)
        {
            var project = _projectRepository.GetById(id);
            return project == null ? null : MapToResponse(project);
        }

        public IEnumerable<ProjectResponseDTO> GetAllProjects() =>
            _projectRepository.GetAll().Select(MapToResponse);

        public void UpdateProject(int id, ProjectRequestDTO request)
        {
            var project = _projectRepository.GetById(id);
            if (project == null) throw new KeyNotFoundException("Project not found");

            project.Name = request.Name;
            project.Description = request.Description;
            _projectRepository.Update(project);
        }

        public void DeleteProject(int id)
        {
            var project = _projectRepository.GetById(id);
            if (project == null) throw new KeyNotFoundException("Project not found");

            _projectRepository.Delete(id);
        }

        // Async
        public async Task CreateProjectAsync(ProjectRequestDTO request)
        {
            var project = new Project
            {
                Name = request.Name,
                Description = request.Description
            };
            await _projectRepository.AddAsync(project);
        }

        public async Task<ProjectResponseDTO?> GetProjectByIdAsync(int id)
        {
            var project = await _projectRepository.GetByIdAsync(id);
            return project == null ? null : MapToResponse(project);
        }

        public async Task<IEnumerable<ProjectResponseDTO>> GetAllProjectsAsync()
        {
            var projects = await _projectRepository.GetAllAsync();
            return projects.Select(MapToResponse);
        }

        public async Task UpdateProjectAsync(int id, ProjectRequestDTO request)
        {
            var project = await _projectRepository.GetByIdAsync(id);
            if (project == null) throw new KeyNotFoundException("Project not found");

            project.Name = request.Name;
            project.Description = request.Description;
            await _projectRepository.UpdateAsync(project);
        }

        public async Task DeleteProjectAsync(int id)
        {
            var project = await _projectRepository.GetByIdAsync(id);
            if (project == null) throw new KeyNotFoundException("Project not found");

            await _projectRepository.DeleteAsync(id);
        }

        private static ProjectResponseDTO MapToResponse(Project project) =>
            new ProjectResponseDTO
            {
                Id = project.Id,
                Name = project.Name,
                Description = project.Description
            };
    }
}