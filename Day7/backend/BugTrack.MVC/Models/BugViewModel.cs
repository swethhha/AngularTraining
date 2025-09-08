using BugTrack.Core.Entities;

namespace BugTrack.MVC.Models
{
    public class BugViewModel
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public string Status { get; set; } = "Open";
        public DateTime CreatedOn { get; set; }

        public int ProjectId { get; set; }
        //public string ProjectName { get; set; } = string.Empty;
        public Project? Project { get; set; }
    }
}
