using System;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Event
    {
        [Key]
        public int Id { get; set; }
        public String Start { get; set; }
        public String End { get; set; }
        public String Summary { get; set; }
        public String Description { get; set; }
        public String Location { get; set; }
    }
}