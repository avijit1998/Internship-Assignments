using StudentApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StudentApp.ViewModels
{
    public class StudentFormViewModel
    {
        public Students Students { get; set; }
        public IEnumerable<Department> Departments { get; set; }
    }

    public class StudentVM
    {
        public int StudentId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public DateTime BirthDate { get; set; }
        public int? DepartmentId { get; set; }
    }
}