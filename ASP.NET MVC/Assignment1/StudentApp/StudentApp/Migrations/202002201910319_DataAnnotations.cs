namespace StudentApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class DataAnnotations : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Students",
                c => new
                    {
                        serialId = c.Int(nullable: false, identity: true),
                        firstName = c.String(),
                        lastName = c.String(),
                        age = c.Int(nullable: false),
                        email = c.String(),
                    })
                .PrimaryKey(t => t.serialId);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Students");
        }
    }
}
