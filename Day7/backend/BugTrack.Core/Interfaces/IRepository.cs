using System.Collections.Generic;
using System.Threading.Tasks;

namespace BugTrack.Core.Interfaces
{
    public interface IRepository<T> where T : class
    {
        // Async CRUD
        Task AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(int id);
        Task<T?> GetByIdAsync(int id);
        Task<IEnumerable<T>> GetAllAsync();
    }
}
