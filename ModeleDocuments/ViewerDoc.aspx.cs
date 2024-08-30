using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class ViewerDoc : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string pathConfig = "";
        using (StreamReader sr = new StreamReader(System.Web.HttpContext.Current.Server.MapPath("config.txt")))
        {
            pathConfig = sr.ReadLine();

        }
        string statment, pathFile;
        //idDossier = Request["idDossier"];
        //name = Request["name"];
        //id = Request["id"];
        //extPath = Request["extPath"];
        statment = Request["statment"];
        pathFile = Request["pathFile"];
        if (statment == "pdf")
        {
            string filePath = pathConfig + "/" + pathFile;
            Response.ContentType = "application/pdf";
            Response.AppendHeader("Content-Disposition", "inline; filename=file.pdf");
            Response.WriteFile(filePath);
            Response.End();
        }
        if(statment == "word")
        {
            string filePath = pathConfig + "/" + pathFile;
            Response.ContentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
            Response.AppendHeader("Content-Disposition", "inline; filename=file.docx");
            Response.WriteFile(filePath);
            Response.End();
        }
        
    }
}