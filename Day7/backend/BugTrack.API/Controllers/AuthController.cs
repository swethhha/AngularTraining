using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BugTrack.Core.DTOs;
using BugTrack.Core.Entities;
using Microsoft.AspNetCore.Identity;
using BugTracker.Infrastructure.Data;

namespace BugTrack.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly BugTrackerContext _context;  // In-memory user store (replace with DB later)
        private readonly PasswordHasher<User> _passwordHasher = new();

        public AuthController(IConfiguration config,BugTrackerContext context)
        {
            _config = config;
            _context = context;
        }


        // ✅ Register
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterRequestDTO registerRequest)
        {
            // check if username exists
            if (_context.Users.Any(u => u.Username == registerRequest.username))
            {
                return BadRequest(new { message = "Username already exists" });
            }

            // create user with role fallback
            var user = new User 
            {
                Username = registerRequest.username,
                Role =  registerRequest.role
            };

            // hash password
            user.Password = _passwordHasher.HashPassword(user, registerRequest.password);

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok(new { message = "User registered successfully", role = user.Role });
        }

        // ✅ Login
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequestDTO loginRequest)
        {
            // find user
            var user = _context.Users.FirstOrDefault(u => u.Username == loginRequest.username);
            if (user == null)
            {
                return Unauthorized(new { message = "Invalid username or password" });
            }

            // verify password
            var result = _passwordHasher.VerifyHashedPassword(user, user.Password, loginRequest.password);
            if (result == PasswordVerificationResult.Failed)
            {
                return Unauthorized(new { message = "Invalid username or password" });
            }

            // generate JWT
            var token = GenerateJwtToken(user);

            return Ok(new
            {
                Token = token,
                Expiration = DateTime.UtcNow.AddMinutes(Convert.ToDouble(_config["Jwt:ExpireMinutes"]))
            });
        }

        // ✅ JWT Generator
        private string GenerateJwtToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Username),
                new Claim(ClaimTypes.Role, user.Role ?? "User"),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(_config["Jwt:ExpireMinutes"])),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
