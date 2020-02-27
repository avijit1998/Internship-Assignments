using StudentApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StudentApp.ViewModels
{
    public class StudentFormViewModel
    {
        public StudentDepartment StudentDetails { get; set; }
        public IEnumerable<Department> Departments { get; set; }
    }
}