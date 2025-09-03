using BugTrack.Core.Entities;
using BugTrack.Core.Interfaces;

namespace BugTracker.Infrastructure.Repositories
{
    public class BugRepository : IBugRepository
    {
        private static int _nextId = 1;
        private readonly List<Bug> _bugs = new();



        public void Add(Bug entity)
        {
            entity.Id = _nextId++;
            entity.CreatedOn = DateTime.UtcNow;
            _bugs.Add(entity);
        }

        public void Update(Bug entity)
        {
            var existing = _bugs.FirstOrDefault(b => b.Id == entity.Id);
            if (existing != null)
            {
                existing.Title = entity.Title;
                existing.Description = entity.Description;
                existing.Status = entity.Status;
                existing.ProjectId = entity.ProjectId;
            }
        }

        public void Delete(int id)
        {
            var bug = _bugs.FirstOrDefault(b => b.Id == id);
            if (bug != null)
                _bugs.Remove(bug);
        }

        public Bug? GetById(int id) => _bugs.FirstOrDefault(b => b.Id == id);

        public IEnumerable<Bug> GetAll() => _bugs;
        public async Task<IEnumerable<Bug>> GetAllAsync()
        {
            return await Task.FromResult<IEnumerable<Bug>>(_bugs);
        }

        public async Task<Bug?> GetByIdAsync(int id)
        {
            return await Task.FromResult(_bugs.FirstOrDefault(b => b.Id == id));
        }

        public async Task AddAsync(Bug entity)
        {
            entity.Id = _nextId++;
            entity.CreatedOn = DateTime.UtcNow;
            _bugs.Add(entity);
            await Task.CompletedTask;
        }

        public async Task UpdateAsync(Bug bug)
        {
            var existing = _bugs.FirstOrDefault(b => b.Id == bug.Id);
            if (existing != null)
            {
                existing.Title = bug.Title;
                existing.Description = bug.Description;
                existing.Status = bug.Status;
                existing.ProjectId = bug.ProjectId;
            }
            await Task.CompletedTask;
        }

        public async Task DeleteAsync(int id)
        {
            var bug = _bugs.FirstOrDefault(b => b.Id == id);
            if (bug != null)
            {
                _bugs.Remove(bug);
            }
            await Task.CompletedTask;
        }
    }
}