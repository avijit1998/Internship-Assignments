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
        public int serialId { get; set; }
        [Required]
        public string firstName { get; set; }
        [Required]
        public string lastName { get; set; }
        [Required]
        public int age { get; set; }
        
        public string email { get; set; }
        [Required]
        public string gender { get; set; }
    }
    public class StudentDBContext : DbContext
    {
        public DbSet<Students> Students { get; set; }
    }
}