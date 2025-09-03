using BugTrack.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BugTrack.Core.Interfaces
{
    public interface IProjectRepository : IRepository<Project>
    {
        void Add(Project project);
        Project GetById(int id);
        IEnumerable<Project> GetAll();
        void Update(Project project);
        void Delete(int id);
        Task<IEnumerable<Project>> GetAllAsync();
        Task<Project?> GetByIdAsync(int id);
        Task AddAsync(Project entity);
        Task UpdateAsync(Project Project);
        Task DeleteAsync(int id);
    }
}
