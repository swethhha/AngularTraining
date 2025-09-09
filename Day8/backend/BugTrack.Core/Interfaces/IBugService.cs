using BugTrack.Core.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BugTrack.Core.Interfaces
{
    public interface IBugService
    {
        Task<int> CreateBugAsync(BugResquestDTO request);
        Task UpdateBugAsync(int id, BugResquestDTO request);
        Task PatchBugStatusAsync(int id, BugStatusUpdateDTO request); // ✅ NEW
        Task DeleteBugAsync(int id);
        Task<BugResponseDTO?> GetBugByIdAsync(int id);
        Task<IEnumerable<BugResponseDTO>> GetAllBugsAsync();
    }
}
