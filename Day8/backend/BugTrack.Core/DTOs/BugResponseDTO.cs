using BugTrack.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BugTrack.Core.DTOs
{
    public class BugResponseDTO
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public required string Priority { get; set; }

        public string Status { get; set; }
        public DateTime CreatedOn { get; set; }
        public int ProjectId { get; set; }
            
        public int ?AssignedTo { get; set; }

    }
}
