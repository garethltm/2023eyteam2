using Microsoft.AspNetCore.Mvc;
using System.IO;
using Models;
using Microsoft.AspNetCore.StaticFiles;

using System.Net;
using System.Linq;
using A2Template.Dtos;
using Data;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.Text.RegularExpressions;
using Dtos;
using System.Diagnostics.CodeAnalysis;
using System.Text;

[Route("webapi")]
[ApiController]
public class A2Controller : Controller
{
    private readonly IA2Repo _repository;
    public A2Controller(IA2Repo repository)
    {
        _repository = repository;
    }
    [HttpPost("Register")]
    public ActionResult<string> Register(User user)
    {
        if (_repository.UserNameExists(user.UserName))
        {
            return Ok($"UserName {user.UserName} is not available.");
        }


        User c = new User
        {
            UserName = user.UserName,
            Password = user.Password,
            Address = user.Address
        };

        User registeredUser = _repository.InsertUser(c);


        return Ok(registeredUser);
    }
    [Authorize(AuthenticationSchemes = "A2Authentication")]
    [Authorize(Policy = "useronly")]
    [HttpGet("PurchaseItem/{id}")]
    public ActionResult<PurchaseOutput> PurchaseItem(int id)
    {
        ClaimsIdentity ci = HttpContext.User.Identities.FirstOrDefault();
        Claim c = ci.FindFirst("normalUser");
        if (c == null)
        {
            return StatusCode(403);
        }
        var product = _repository.GetProduct(id);

        if (product.Count() == 0)
        {
            return BadRequest($"Product {id} not found");
        }
        PurchaseOutput output = new PurchaseOutput
        {
            userName = c.Value,
            productId = id
        };
        return Ok(output);

    }
    [Authorize(AuthenticationSchemes = "A2Authentication")]
    [Authorize(Policy = "adminonly")]
    [HttpPost("AddEvent")]
    public ActionResult<string> AddEvent(EventInput eventInput)
    {
        ClaimsIdentity ci = HttpContext.User.Identities.FirstOrDefault();
        Claim adname = ci.FindFirst("admin");
        if (adname == null)
        {
            return StatusCode(403, "only organizers can add events");
        }
        if (_repository.Getorganizer(adname.Value).Count() == 0) {
            return StatusCode(403, "only organizers can add events");
        }
        Regex date = new Regex(@"^\d{8}T\d{6}Z$");
        if (eventInput.Start == null && eventInput.End == null)
        {
            return BadRequest("The Start and the End can not be null");
        }
        if (!date.IsMatch(eventInput.Start) && !date.IsMatch(eventInput.End))
        {
            return BadRequest("The format of Start and End should be yyyyMMddTHHmmssZ.");
        }
        if (!date.IsMatch(eventInput.Start)) {
            return BadRequest("The format of Start should be yyyyMMddTHHmmssZ.");
        }
        if (!date.IsMatch(eventInput.End))
        {
            return BadRequest("The format of End should be yyyyMMddTHHmmssZ.");
        }
        _repository.AddEvent(eventInput);
        return Ok("Success");
    }
    [Authorize(AuthenticationSchemes = "A2Authentication")]
    [Authorize(Policy = "Allonly")]
    [HttpGet("EventCount")]
    public ActionResult<int> EventCount()
    {
        var ci = User.Claims.FirstOrDefault(c => c.Type == "normalUser" || c.Type == "admin")?.Value;
        if (ci == null)
        {
            return StatusCode(403);
        }
        int count = _repository.CountEvents();
        return Ok(count);
    }

    [Authorize(AuthenticationSchemes = "A2Authentication")]
    [Authorize(Policy = "Allonly")]
    [HttpGet("Event/{id}")]
    public ActionResult Event(int id)
    {
        var ci = User.Claims.FirstOrDefault(c => c.Type == "normalUser" || c.Type == "admin")?.Value;
        if (ci == null)
        {
            return Forbid();
        }
        Event eventdetail = _repository.getevent(id);
        if (eventdetail == null)
        {
            return BadRequest($"Event {id} DoesNotReturnAttribute not exist.");

        }
        
        
        Response.Headers.Add("Content-Type", "text/calendar");
        
        
        return Ok(eventdetail);


    }
    

}