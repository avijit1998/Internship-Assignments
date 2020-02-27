using StudentApp.Models;
using StudentApp.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace StudentApp.Controllers
{
    public class StudentController : Controller
    {
        private StudentAppDbContext studentDbContext = new StudentAppDbContext();

        // GET: Student
        public ActionResult Index()
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
            return View("StudentIndex", students);
        }

        // GET: Student/Details/id
        public ActionResult Details(int id)
        {
            var student = studentDbContext.Students.Include("Department").SingleOrDefault(c => c.SerialId == id);
            var departments = studentDbContext.Departments.ToList();
            var viewModel = new StudentFormViewModel
            {
                Students = student,
                Departments = departments
            };
            return View(viewModel);
        }

        // GET: Student/Create
        public ActionResult Create()
        {
            var departments = studentDbContext.Departments.ToList();
            var viewModel = new StudentFormViewModel
            {
                Students = new Students(),
                Departments = departments
            };
            return View(viewModel);
        }

        // POST: Student/Create
        [HttpPost]
        public ActionResult Create(StudentFormViewModel s)
        {
            if (!ModelState.IsValid)
            {
                var viewModel = new StudentFormViewModel
                {
                    Students = s.Students,
                    Departments = studentDbContext.Departments.ToList()
                };
                return View(viewModel);
            }
            else
            {
                Students student = new Students();
                student = s.Students;
                if (student.SerialId == 0)
                {
                    studentDbContext.Students.Add(student);
                }
                studentDbContext.SaveChanges();
            }
            return RedirectToAction("Index");
        }

        // GET: Student/Edit/id
        [HttpGet]
        public ActionResult Edit(int id)
        {
            var student = studentDbContext.Students.Include("Department").SingleOrDefault(c => c.SerialId == id);
            var departments = studentDbContext.Departments.ToList();
            var viewModel = new StudentFormViewModel
            {
                Students = student,
                Departments = departments
            };
            return View(viewModel);
        }

        // POST: Student/Edit/id
        public ActionResult Edit(int id, StudentFormViewModel s)
        {
            if (!ModelState.IsValid)
            {
                var viewModel = new StudentFormViewModel
                {
                    Students = s.Students,
                    Departments = studentDbContext.Departments.ToList()
                };
                return View(viewModel);
            }
            else
            {
                var studentInDb = studentDbContext.Students.SingleOrDefault(c => c.SerialId == id);
                studentInDb.BirthDate = s.Students.BirthDate;
                studentInDb.DepartmentId = s.Students.DepartmentId;
                studentInDb.Email = s.Students.Email;
                studentInDb.FirstName = s.Students.FirstName;
                studentInDb.Gender = s.Students.Gender;
                studentInDb.LastName = s.Students.LastName;
                studentDbContext.SaveChanges();
            }
            return RedirectToAction("Index");
        }

        //GET
        public ActionResult Delete(int id)
        {
            var studentInDb = studentDbContext.Students.SingleOrDefault(c => c.SerialId == id);
            studentDbContext.Students.Remove(studentInDb);
            studentDbContext.SaveChanges();
            return RedirectToAction("Index");
        }
    }
}
