namespace StudentApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedDOBPropRemovedAgeProp : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Students", "BirthDate", c => c.DateTime(nullable: false));
            DropColumn("dbo.Students", "Age");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Students", "Age", c => c.Int(nullable: false));
            DropColumn("dbo.Students", "BirthDate");
        }
    }
}
