using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BugTrack.Core.DTOs
{
    public class ErrorResponseDTO
    {
            public string Message { get; set; }          
            public int StatusCode { get; set; }
            public string Details { get; set; }
        public string CorrelationId { get; set; }

    }
}
