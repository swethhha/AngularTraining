using System;
using System.Collections.Generic;

namespace BugTrack.Core.Exceptions
{
    public class ValidationException : Exception
    {
        // Property should be inside the class, not inside the constructor
        public IDictionary<string, string[]> Errors { get; }

        // Constructor with a message
        public ValidationException(string message) : base(message)
        {
        }

        // Constructor with validation errors
        public ValidationException(IDictionary<string, string[]> errors)
            : base("Validation failed")
        {
            Errors = errors;
        }
    }
}
