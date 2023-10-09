using System;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class User
    {
        [Key]
        public String UserName { get; set; }
        public String Password { get; set; }
        public String Address { get; set; }
    }

}