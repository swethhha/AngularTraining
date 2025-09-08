using BugTrack.Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BugTrack.Core.Interfaces
{
    public interface IProjectRepository : IRepository<Project>
    {
        // Only async
        Task<IEnumerable<Project>> GetAllAsync();
        Task<Project?> GetByIdAsync(int id);
        Task AddAsync(Project entity);
        Task UpdateAsync(Project project);
        Task DeleteAsync(int id);
    }
}
