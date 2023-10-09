using A2Template;
using Models;
using Dtos;
using Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

public class A2Repo : IA2Repo
{
    private readonly A2DbContext _dbContext;
    public A2Repo(A2DbContext dbContext)
    {
        _dbContext = dbContext;
    }
    public void SaveChanges()
    {
        _dbContext.SaveChanges();
    }
    public User InsertUser(User user)
    {
        EntityEntry<User> newUser = _dbContext.User.Add(user);
        _dbContext.SaveChanges();
        return newUser.Entity;
    }
    public bool UserNameExists(string userName)
    {
        return _dbContext.User.Any(u => u.UserName == userName);
    }
    public bool ValidLogin(string userName, string password)
    {
        User c = _dbContext.User.FirstOrDefault(e => e.UserName == userName && e.Password == password);
        if (c == null)
        {
            Organizer o = _dbContext.Organizor.FirstOrDefault(e => e.Name == userName && e.Password == password);
            if (o == null)
            {
                return false;
            }
            else
                return true;
        }

        else
            return true;
    }
    public IEnumerable<Product> GetProduct(int id)
    {
        return _dbContext.Products
        .Where(p => p.Id==id)
        .ToList();
    }
    public IEnumerable<Organizer> Getorganizer(string name)
    {
        return _dbContext.Organizor
        .Where(p => EF.Functions.Like(p.Name, $"%{name}%"))
        .ToList();
    }
    public IEnumerable<User> GetUser(string name)
    {
        return _dbContext.User
        .Where(p => EF.Functions.Like(p.UserName, $"%{name}%"))
        .ToList();
    }

    public void AddEvent(EventInput eventInput)
    {
        var newevent = new Event
        {
            Start = eventInput.Start,
            End = eventInput.End,
            Summary = eventInput.Summary,
            Description = eventInput.Description,
            Location = eventInput.Location,
        };
        _dbContext.Event.Add(newevent);
        _dbContext.SaveChanges();
    }
    public int CountEvents()
    {
        return _dbContext.Event.Count();
    }
    public Event getevent(int id)
    {
        Event e = _dbContext.Event.FirstOrDefault(e=>e.Id==id);
        return e;
    }
}