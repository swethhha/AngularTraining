namespace BugTrack.Core.DTOs
{
    public class BugResquestDTO
    {
        public required string Title { get; set; }
        public required string Description { get; set; }
        public string Status { get; set; } = "open";
        public string Priority { get; set; } = "Medium";

        public int ProjectId { get; set; }
        public int? AssignedTo { get; set; }



    }
}
