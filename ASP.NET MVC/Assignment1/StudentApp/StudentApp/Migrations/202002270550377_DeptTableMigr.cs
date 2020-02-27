namespace StudentApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class DeptTableMigr : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Departments",
                c => new
                    {
                        DepartmentId = c.Int(nullable: false, identity: true),
                        DepartmentName = c.String(),
                        Location = c.String(),
                    })
                .PrimaryKey(t => t.DepartmentId);
            
            AddColumn("dbo.Students", "BirthDate", c => c.DateTime(nullable: false));
            AddColumn("dbo.Students", "DepartmentId", c => c.Int());
            CreateIndex("dbo.Students", "DepartmentId");
            AddForeignKey("dbo.Students", "DepartmentId", "dbo.Departments", "DepartmentId");
            DropColumn("dbo.Students", "age");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Students", "age", c => c.Int(nullable: false));
            DropForeignKey("dbo.Students", "DepartmentId", "dbo.Departments");
            DropIndex("dbo.Students", new[] { "DepartmentId" });
            DropColumn("dbo.Students", "DepartmentId");
            DropColumn("dbo.Students", "BirthDate");
            DropTable("dbo.Departments");
        }
    }
}
