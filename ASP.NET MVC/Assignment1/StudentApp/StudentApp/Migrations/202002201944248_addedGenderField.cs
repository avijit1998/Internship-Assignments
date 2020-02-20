namespace StudentApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addedGenderField : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Students", "gender", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Students", "gender");
        }
    }
}
