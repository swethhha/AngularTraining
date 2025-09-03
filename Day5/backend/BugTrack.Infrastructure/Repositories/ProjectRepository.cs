using BugTrack.Core.Entities;
using BugTrack.Core.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BugTracker.Infrastructure.Repositories
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly List<Project> _projects = new();
        private int _nextId = 1;

        // Sync
        public void Add(Project project)
        {
            project.Id = _nextId++;
            _projects.Add(project);
        }

        public Project? GetById(int id) => _projects.FirstOrDefault(p => p.Id == id);

        public IEnumerable<Project> GetAll() => _projects;

        public void Update(Project project)
        {
            var existing = _projects.FirstOrDefault(p => p.Id == project.Id);
            if (existing != null)
            {
                existing.Name = project.Name;
                existing.Description = project.Description;
            }
        }

        public void Delete(int id)
        {
            var project = _projects.FirstOrDefault(p => p.Id == id);
            if (project != null)
            {
                _projects.Remove(project);
            }
        }

        // Async
        public Task<IEnumerable<Project>> GetAllAsync() =>
            Task.FromResult<IEnumerable<Project>>(_projects.ToList());

        public Task<Project?> GetByIdAsync(int id) =>
            Task.FromResult<Project?>(_projects.FirstOrDefault(p => p.Id == id));

        public Task AddAsync(Project project)
        {
            project.Id = _nextId++;
            _projects.Add(project);
            return Task.CompletedTask;
        }

        public Task UpdateAsync(Project project)
        {
            Update(project);
            return Task.CompletedTask;
        }

        public Task DeleteAsync(int id)
        {
            Delete(id);
            return Task.CompletedTask;
        }
    }
}