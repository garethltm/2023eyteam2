using System;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Organizer
    {
        [Key]
        public String Name { get; set; }
        public String Password { get; set; }
    }
}
