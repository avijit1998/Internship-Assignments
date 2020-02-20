namespace StudentApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RequiredAdded : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Students", "firstName", c => c.String(nullable: false));
            AlterColumn("dbo.Students", "lastName", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Students", "lastName", c => c.String());
            AlterColumn("dbo.Students", "firstName", c => c.String());
        }
    }
}
