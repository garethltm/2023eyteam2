using Microsoft.EntityFrameworkCore;
using A2Template;
using Models;

namespace Data
{
    public class A2DbContext : DbContext
    {
        public A2DbContext(DbContextOptions<A2DbContext> options) : base(options) { }
        public DbSet<Product> Products { get; set; }
        public DbSet<Event> Event { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<Organizer> Organizor { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source = A2Database.sqlite");
        }
    }
}