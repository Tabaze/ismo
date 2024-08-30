<%@ WebHandler Language="C#" Class="AjaxFileUploader" %>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Text.RegularExpressions;
using System.Text;

public class AjaxFileUploader : IHttpHandler {

    public void ProcessRequest (HttpContext context) {
        if (context.Request.Files.Count > 0)
        {
            var file = context.Request.Files[0];
            string pathstring = context.Request.Form[0];
            string fileNameString = context.Request.Form[1];
                string path = context.Server.MapPath(pathstring);
            if (!Directory.Exists(path))
                Directory.CreateDirectory(path);

            string fileName;


            if (HttpContext.Current.Request.Browser.Browser.ToUpper() == "IE")
            {
                string[] files = file.FileName.Split(new char[] { '\\' });
                fileName = files[files.Length - 1];
            }
            else
            {
                fileName = file.FileName;
            }
            //string newFilename = Guid.NewGuid().ToString();
            FileInfo fInfo = new FileInfo(fileName);
            fileNameString = string.Format("{0}{1}", fileNameString, fInfo.Extension);
            string strFileName = fileNameString;
            fileName = Path.Combine(path, fileNameString);
            file.SaveAs(fileName);
            string msg = "{";
            msg += string.Format("error:'{0}',\n", string.Empty);
            msg += string.Format("msg:'{0}'\n", strFileName);
            msg += "}";
            context.Response.Write(strFileName);


        }
    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}