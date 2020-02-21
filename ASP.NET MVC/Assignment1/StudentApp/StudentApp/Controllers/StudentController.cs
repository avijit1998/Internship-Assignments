using StudentApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace StudentApp.Controllers
{
    public class StudentController : Controller
    {
        private StudentDBContext db = new StudentDBContext();
      
        // GET: Student
        public ActionResult Index()
        {
            var students = from s in db.Students
                           orderby s.serialId
                           select s;
            return View("StudentIndex",students);
        }

        // GET: Student/Details/id
        public ActionResult Details(int id)
        {
            var student = db.Students.Single(m => m.serialId  == id);
            return View(student);
        }

        // GET: Student/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Student/Create
        [HttpPost]
        public ActionResult Create(Students student)
        {
            try
            {
                db.Students.Add(student);
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Student/Edit/id
        [HttpGet]
        public ActionResult Edit(int id)
        {
            var student = db.Students.Single(m => m.serialId == id);
            return View(student);
        }

        // POST: Student/Edit/id
        [HttpPost, ActionName("Edit")]
        public ActionResult EditPost(int id)
        {
            try
            {
                var student = db.Students.Single(m => m.serialId == id);
                if (TryUpdateModel(student))
                {
                    db.SaveChanges();
                    return RedirectToAction("Index");
                }
                return View(student);
            }
            catch
            {
                return View();
            }
        }

        //GET
        public ActionResult Delete(int id)
        {
            try
            {
                Students student = db.Students.Find(id);
                db.Students.Remove(student);
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
