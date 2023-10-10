﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Data;
using Microsoft.Extensions.Options;
using System.Text.Encodings.Web;
using Microsoft.Extensions.Logging;
using System.Net.Http.Headers;
using System.Text;
using System.Security.Claims;

namespace A2Template.Handler
{
    public class A2AuthHandler : AuthenticationHandler<AuthenticationSchemeOptions>
    {
        private readonly IA2Repo _repository;

        public A2AuthHandler(
            IA2Repo repository,
            IOptionsMonitor<AuthenticationSchemeOptions> options,
            ILoggerFactory logger,
            UrlEncoder encoder,
            ISystemClock clock)
            : base(options, logger, encoder, clock)
        {
            _repository = repository;
        }
        protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            if (!Request.Headers.ContainsKey("Authorization"))
            {
                Response.Headers.Add("WWW-Authenticate", "Basic");
                return AuthenticateResult.Fail("Authorization header not found.");
            }
            else
            {
                var authHeader = AuthenticationHeaderValue.Parse(Request.Headers["Authorization"]);
                var credentialBytes = Convert.FromBase64String(authHeader.Parameter);
                var credentials = Encoding.UTF8.GetString(credentialBytes).Split(":");
                var username = credentials[0];
                var password = credentials[1];

                 
                    if(_repository.ValidLogin(username, password) && _repository.Getorganizer(username).Count() != 0)
                    {
                        var claims = new[] { new Claim("admin", username) };

                        ClaimsIdentity identity = new ClaimsIdentity(claims, "Basic");
                        ClaimsPrincipal principal = new ClaimsPrincipal(identity);

                        AuthenticationTicket ticket = new AuthenticationTicket(principal, Scheme.Name);
                        
                        return AuthenticateResult.Success(ticket);
                    }
                
                    else if (_repository.ValidLogin(username, password)&&_repository.GetUser(username).Count() !=0)
                    {
                        var claims = new[] { new Claim("normalUser", username) };

                        ClaimsIdentity identity = new ClaimsIdentity(claims, "Basic");
                        ClaimsPrincipal principal = new ClaimsPrincipal(identity);

                        AuthenticationTicket ticket = new AuthenticationTicket(principal, Scheme.Name);
                        return AuthenticateResult.Success(ticket);
                    }

                else {
                    Response.Headers.Add("WWW-Authenticate", "Basic");
                    return AuthenticateResult.Fail("userName and password do not match");
                }
                     
            }
        }
    }
}
