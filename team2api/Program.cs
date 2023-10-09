
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using Data;
using A2Template.Handler;
using Microsoft.Extensions.Options;
using Helper;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);


        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddAuthentication().AddScheme<AuthenticationSchemeOptions, A2AuthHandler>("A2Authentication", null);
        builder.Services.AddDbContext<A2DbContext>(
            options => options.UseSqlite(builder.Configuration["A2DbConnection"])
        );
        builder.Services.AddScoped<IA2Repo, A2Repo>();
        builder.Services.AddAuthorization(options =>
        {
            options.AddPolicy("Adminonly", policy => policy.RequireClaim("admin"));
            options.AddPolicy("useronly", policy => policy.RequireClaim("normalUser"));
            options.AddPolicy("AllOnly", policy => {
                policy.RequireAssertion(context =>
                    context.User.HasClaim(c =>
                    (c.Type == "normalUser" || c.Type == "admin")));
            });
        });
        builder.Services.AddMvc(options=>options.OutputFormatters.Add(new CalendarOutputFormatter()));
        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();
        app.UseAuthentication();
        app.UseAuthorization();


        app.MapControllers();

        app.Run();
    }
}