using BugTrack.Core.Entities;

namespace BugTrack.Core.Interfaces
{
    // Marker interface - specific to Bug, inherits generic repository
    public interface IBugRepository : IRepository<Bug>
    {
    }
}
