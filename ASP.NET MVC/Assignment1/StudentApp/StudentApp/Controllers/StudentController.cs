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
                                DepartmentName = s.Department.DepartmentName,
                                Location = s.Department.Location
                            }).ToList();
            var departments = studentDbContext.Departments.ToList();
            var studentFormViewModels = new List<StudentFormViewModel>();
            for (int i = 0; i < students.Count; i++)
            {
                studentFormViewModels.Add(new StudentFormViewModel
                {
                    StudentDetails = students[i],
                    Departments = departments
                });   
            }

            return View("StudentIndex",studentFormViewModels);
        }

        //// GET: Student/Details/id
        //public ActionResult Details(int id)
        //{
        //    var student = db.Students.Single(m => m.SerialId  == id);
        //    return View(student);
        //}

        // GET: Student/Create
        public ActionResult Create()
        {
            return View();
        }

        //// POST: Student/Create
        //[HttpPost]
        //public ActionResult Create(Students student)
        //{
        //    try
        //    {
        //        db.Students.Add(student);
        //        db.SaveChanges();
        //        return RedirectToAction("Index");
        //    }
        //    catch
        //    {
        //        return View();
        //    }
        //}

        //// GET: Student/Edit/id
        //[HttpGet]
        //public ActionResult Edit(int id)
        //{
        //    var student = db.Students.Single(m => m.SerialId == id);
        //    return View(student);
        //}

        //// POST: Student/Edit/id
        //[HttpPost, ActionName("Edit")]
        //public ActionResult EditPost(int id)
        //{
        //    try
        //    {
        //        var student = db.Students.Single(m => m.SerialId == id);
        //        if (TryUpdateModel(student))
        //        {
        //            db.SaveChanges();
        //            return RedirectToAction("Index");
        //        }
        //        return View(student);
        //    }
        //    catch
        //    {
        //        return View();
        //    }
        //}

        ////GET
        //public ActionResult Delete(int id)
        //{
        //    try
        //    {
        //        Students student = db.Students.Find(id);
        //        db.Students.Remove(student);
        //        db.SaveChanges();
        //        return RedirectToAction("Index");
        //    }
        //    catch
        //    {
        //        return View();
        //    }
        //}
    }
}
