<%@ WebHandler Language="C#" Class="downloadDoc" %>

using System;
using System.Web;
using System.IO;
public class downloadDoc : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        // FileInfo fInfo = new FileInfo(fileName);
        string pathConfig = "";
        using (StreamReader sr = new StreamReader(context.Server.MapPath("config.txt")))
        {
            pathConfig = sr.ReadLine();

        }
        string pathstring = context.Request.Form[0];
        var fileName = context.Request.Form[0];
        var filePath = pathConfig+"/"+fileName;
        
        FileInfo fInfo = new FileInfo(filePath);
          string mime =  MimeMapping.GetMimeMapping(fInfo.Name);
        context.Response.ContentType =  mime;
        context.Response.AddHeader(
            @"Content-Disposition",
            @"attachment; filename=" + Path.GetFileName(filePath));
        context.Response.AddHeader(
            @"Content-Length", fInfo.Length.ToString());
        string msg = "{";
            msg += string.Format("mime:'{0}',\n", mime);
            msg += string.Format("filePath:'{0}'\n", filePath);
            msg += "}";
        context.Response.WriteFile(filePath);
        context.Response.Write(mime);
        context.Response.End();
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}