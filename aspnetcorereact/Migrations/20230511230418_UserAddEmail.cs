using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace aspnetcorereact.Migrations
{
    /// <inheritdoc />
    public partial class UserAddEmail : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Users",
                type: "text",
                nullable: false,
                defaultValue: "");
            migrationBuilder.Sql(
                "UPDATE \"Users\" SET \"Email\" = CONCAT(\"Name\", '@gmail.com')");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "Users");
        }
    }
}
