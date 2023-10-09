using Models;
using Data;
using Dtos;

namespace Data
{


    public interface IA2Repo
    {
        void SaveChanges();
        User InsertUser(User user);
        bool UserNameExists(string userName);
        bool ValidLogin(string userName, string password);

        IEnumerable<Product> GetProduct(int id);
        IEnumerable<Organizer> Getorganizer(string name);
        void AddEvent(EventInput eventInput);
        IEnumerable<User> GetUser(string name);
        int CountEvents();
        Event getevent(int id);

    }
}