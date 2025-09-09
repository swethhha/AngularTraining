using BugTrack.Core.Entities;
using BugTrack.Core.Interfaces;
using BugTracker.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BugTracker.Infrastructure.Repositories
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly BugTrackerContext _context;

        public ProjectRepository(BugTrackerContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Project entity)
        {
            _context.Projects.Add(entity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Project entity)
        {
            _context.Projects.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project != null)
            {
                _context.Projects.Remove(project);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<Project?> GetByIdAsync(int id)
        {
            return await _context.Projects
                                 .AsNoTracking()
                                 .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IEnumerable<Project>> GetAllAsync()
        {
            return await _context.Projects
                                 .AsNoTracking()
                                 .ToListAsync();
        }
    }
}
