namespace StudentApp.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<StudentApp.Models.StudentAppDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(StudentApp.Models.StudentAppDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method
            //  to avoid creating duplicate seed data.

            if (!context.Departments.Any())
            {
                context.Departments.Add(new Models.Department
                {
                    DepartmentName = "HR",
                    Location = "BBSR"
                });
                context.Departments.Add(new Models.Department
                {
                    DepartmentName = "Admin",
                    Location = "CTC"
                });
                context.SaveChanges();
            }


            if (!context.Students.Any())
            {
                context.Students.Add(new Models.Students
                {
                    FirstName = "Rajiv",
                    LastName = "Modi",
                    Email = "rajiv@gmail.com",
                    Gender = "Male",
                    BirthDate = new DateTime(1998,04,30),
                    DepartmentId = 1
                });
                context.Students.Add(new Models.Students
                {
                    FirstName = "Avijit",
                    LastName = "Nanda",
                    Email = "test@gmail.com",
                    Gender = "Male",
                    BirthDate = new DateTime(1998, 01, 27),
                    DepartmentId = 2
                });
                context.Students.Add(new Models.Students
                {
                    FirstName = "Devi",
                    LastName = "Sahu",
                    Email = "client@gmail.com",
                    Gender = "Female",
                    BirthDate = new DateTime(2010, 03, 14),
                    DepartmentId = 1
                });
                context.SaveChanges();
            }
        }
    }
}
