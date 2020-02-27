using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace StudentApp.Models
{
    public class StudentAppDbContext : DbContext
    {
        public DbSet<Students> Students { get; set; }
        public DbSet<Department> Departments { get; set; }
    }
}