const TOKEN=`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyM2hyMWEzMDA2QG10aWVhdC5vcmciLCJleHAiOjE3ODI1NDc5MTIsImlhdCI6MTc4MjU0NzAxMiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjBmMjQyNjhlLThkZDMtNGQ5NS05Y2FhLTAxYWY0N2M0YjAzYiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImJhZGR1bHVyaSBuaXRoaW4ga3VtYXIiLCJzdWIiOiIyZmM3NDY3ZC1iY2JlLTRiMjEtYWQyNS01ZjFjNWE1N2RhYmYifSwiZW1haWwiOiIyM2hyMWEzMDA2QG10aWVhdC5vcmciLCJuYW1lIjoiYmFkZHVsdXJpIG5pdGhpbiBrdW1hciIsInJvbGxObyI6IjIzaHIxYTMwMDYiLCJhY2Nlc3NDb2RlIjoiYVRreWJzIiwiY2xpZW50SUQiOiIyZmM3NDY3ZC1iY2JlLTRiMjEtYWQyNS01ZjFjNWE1N2RhYmYiLCJjbGllbnRTZWNyZXQiOiJiUkJBcWtSUWpGdldHVGtFIn0.6eXPPxx-_4RAOKt90Ro96AnqhvlaA-A-eUkgB92qgcM`;

if(!sessionStorage.getItem("access_token")){

    sessionStorage.setItem(

        "access_token",

        TOKEN

    );

}

export function getToken(){

    return sessionStorage.getItem(

        "access_token"

    );

}