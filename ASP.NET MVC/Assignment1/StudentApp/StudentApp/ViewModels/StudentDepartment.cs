using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StudentApp.ViewModels
{
    public class StudentDepartment
    {
        public int SerialId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Gender { get; set; }

        public DateTime BirthDate { get; set; }

        public string DepartmentName { get; set; }

        public string Location { get; set; }
    }
}