namespace StudentApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updatedcontext : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Students", "BirthDate");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Students", "BirthDate", c => c.DateTime(nullable: false));
        }
    }
}
