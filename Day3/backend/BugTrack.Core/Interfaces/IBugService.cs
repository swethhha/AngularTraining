using BugTrack.Core.DTOs;
using System.Collections.Generic;

namespace BugTrack.Core.Interfaces
{
    public interface IBugService
    {
        int CreateBug(BugResquestDTO request);
        void UpdateBug(int id, BugResquestDTO request);
        void DeleteBug(int id);
        BugResponseDTO? GetBugById(int id);
        IEnumerable<BugResponseDTO> GetAllBugs();
        Task<int> CreateBugAsync(BugResquestDTO request);
        Task UpdateBugAsync(int id, BugResquestDTO request);
        Task DeleteBugAsync(int id);
        Task<BugResponseDTO?> GetBugByIdAsync(int id);
        Task<IEnumerable<BugResponseDTO>> GetAllBugsAsync();


    }
}
