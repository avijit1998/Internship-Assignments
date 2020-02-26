using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace StudentApp.Models
{
    public class Students
    {
        [Key]
        public int SerialId { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public int Age { get; set; }
        
        public string Email { get; set; }
        [Required]
        public string Gender { get; set; }
    }
    public class StudentDBContext : DbContext
    {
        public DbSet<Students> Students { get; set; }
    }
}