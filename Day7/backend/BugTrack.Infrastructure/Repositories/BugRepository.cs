using BugTrack.Core.Entities;
using BugTrack.Core.Interfaces;
using BugTracker.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BugTracker.Infrastructure.Repositories
{
    public class BugRepository : IBugRepository
    {
        private readonly BugTrackerContext _context;

        public BugRepository(BugTrackerContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Bug entity)
        {
            entity.CreatedOn = DateTime.UtcNow;
            _context.Bugs.Add(entity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Bug entity)
        {
            _context.Bugs.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var bug = await _context.Bugs.FindAsync(id);
            if (bug != null)
            {
                _context.Bugs.Remove(bug);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<Bug?> GetByIdAsync(int id)
        {
            return await _context.Bugs.FirstOrDefaultAsync(b => b.Id == id);
        }

        public async Task<IEnumerable<Bug>> GetAllAsync()
        {
            return await _context.Bugs.ToListAsync();
        }
    }
}
