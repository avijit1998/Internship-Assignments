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
            var departments = studentDbContext.Departments.ToList();
            ViewBag.Departments = departments;
            return View("StudentIndex");
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
        public ActionResult Create(StudentVM s)
        {
            Students student = new Students();
            student.FirstName = s.FirstName;
            student.LastName = s.LastName;
            student.BirthDate = s.BirthDate;
            student.Email = s.Email;
            student.Gender = s.Gender;
            student.DepartmentId = s.DepartmentId;
            studentDbContext.Students.Add(student);
            studentDbContext.SaveChanges();
            return Json("Success");
        }

        // GET: Student/Edit/id
        [HttpGet]
        public ActionResult Edit(int id)
        {
            var student = studentDbContext.Students.Include("Department").SingleOrDefault(c => c.SerialId == id);
            var departments = studentDbContext.Departments.ToList();
            var viewModel = new StudentVM
            {
                StudentId = student.SerialId,
                FirstName = student.FirstName,
                LastName = student.LastName,
                Email = student.Email,
                BirthDate = student.BirthDate,
                Gender = student.Gender,
                DepartmentId = student.DepartmentId
            };
            return Json(viewModel,JsonRequestBehavior.AllowGet);
        }

        // POST: Student/Edit/id
        [HttpPost]
        public ActionResult Edit(int studentId, StudentVM s)
        {
            var studentInDb = studentDbContext.Students.SingleOrDefault(c => c.SerialId == studentId);
            studentInDb.FirstName = s.FirstName;    
            studentInDb.LastName = s.LastName;
            studentInDb.Email = s.Email;
            studentInDb.Gender = s.Gender;
            studentInDb.BirthDate = s.BirthDate;
            studentInDb.DepartmentId = s.DepartmentId;
            studentDbContext.SaveChanges();
            return Json("Success");
        }

        
        
    }
}
