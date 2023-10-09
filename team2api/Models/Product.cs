using System;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public String Name { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
    }
}