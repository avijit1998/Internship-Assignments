using StudentApp.Models;
using StudentApp.ViewModels;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Script.Services;
using System.Web.Services;

namespace StudentApp.Controllers.Api
{
    public class StudentController : ApiController
    {
        private StudentAppDbContext studentDbContext;

        public StudentController()
        {
            studentDbContext = new StudentAppDbContext();
        }

        //GET /api/student
        [WebMethod]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public IEnumerable<StudentDepartment> GetStudents()
        {
            var students = (from s in studentDbContext.Students.Include("Department").ToList()
                            select new StudentDepartment
                            {
                                SerialId = s.SerialId,
                                FirstName = s.FirstName,
                                LastName = s.LastName,
                                Email = s.Email,
                                Gender = s.Gender,
                                BirthDate = s.BirthDate,
                                DepartmentName = s.DepartmentId != null ? s.Department.DepartmentName : "NA",
                                Location = s.DepartmentId != null ? s.Department.Location : "NA"
                            }).ToList();
            return students;
        }

        //GET /api/student/id
        public StudentDepartment GetStudent(int id)
        {
            var s = studentDbContext.Students.Include("Department").FirstOrDefault(c => c.SerialId == id);
            if (s == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            
            var student = new StudentDepartment
            {
                SerialId = s.SerialId,
                FirstName = s.FirstName,
                LastName = s.LastName,
                Email = s.Email,
                Gender = s.Gender,
                BirthDate = s.BirthDate,
                DepartmentName = s.DepartmentId != null ? s.Department.DepartmentName : "NA",
                Location = s.DepartmentId != null ? s.Department.Location : "NA"
            };
            return student;
        }

        // DELETE /api/student/1
        [HttpDelete]
        public void UpdateCustomer(int id)
        {
            var studentInDb = studentDbContext.Students.FirstOrDefault(s => s.SerialId == id);
            if (studentInDb == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            studentDbContext.Students.Remove(studentInDb);
            studentDbContext.SaveChanges();
        }
    }
}
