using BugTrack.Core.Entities;

public class Bug
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    public required string Status { get; set; }
    public required string Priority { get; set; }
    public DateTime CreatedOn { get; set; } = DateTime.UtcNow;

    public int ProjectId { get; set; }
    public Project? Project { get; set; }

    public int? AssignedTo { get; set; }
    public User? User { get; set; } = null!;
}
