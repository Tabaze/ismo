using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class ModeleDocuments_ModeleDocuments : System.Web.UI.Page
{
    static SessionLogin login = new SessionLogin();
    static string pathConfig = "";
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!login.connectSession())
        {
            login.deconnexionSession();
        }

        using (StreamReader sr = new StreamReader(System.Web.HttpContext.Current.Server.MapPath("config.txt")))
        {
            pathConfig = sr.ReadLine();

        }       
    }
    [WebMethod]
    public static List<string> getFolders(string idDossier, string name, string id, string extPath)
    {
        using (StreamReader sr = new StreamReader(System.Web.HttpContext.Current.Server.MapPath("config.txt")))
        {
            pathConfig = sr.ReadLine();

        }
        string path = pathConfig + "/" + idDossier + "/" + name + "/" + id + extPath;
        if (!System.IO.Directory.Exists(path))
        {
            System.IO.Directory.CreateDirectory(path);

        }
        List<string> list = new List<string>();
        foreach (var dir in new DirectoryInfo(path).GetDirectories())
        {
            list.Add(dir.Name);
        }
        return list;
    }
    [WebMethod]
    public static Boolean createFolder(string pathCreate)
    {
        using (StreamReader sr = new StreamReader(System.Web.HttpContext.Current.Server.MapPath("config.txt")))
        {
            pathConfig = sr.ReadLine();

        }
        string path = pathConfig + "/" + pathCreate;
        if (!System.IO.Directory.Exists(path))
        {
            System.IO.Directory.CreateDirectory(path);

        }
        return true;
    }
    [WebMethod]
    public static Boolean updateFolder(string pathOld,string pathCreate)
    {
        using (StreamReader sr = new StreamReader(System.Web.HttpContext.Current.Server.MapPath("config.txt")))
        {
            pathConfig = sr.ReadLine();

        }
        string path = pathConfig + "/" + pathCreate;
        string oldPath = pathConfig + "/" + pathOld;
        Directory.Move(@oldPath, @path+ "_temp");
        Directory.Move(@path + "_temp", @path);
        //if (!System.IO.Directory.Exists(path))
        //{
        //    System.IO.Directory.CreateDirectory(path);

        //}
        return true;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> getFiles(string idDossier, string name, string id, string extPath)
    {
        using (StreamReader sr = new StreamReader(System.Web.HttpContext.Current.Server.MapPath("config.txt")))
        {
            pathConfig = sr.ReadLine();

        }
        string path = pathConfig + "/" + idDossier + "/" + name + "/" + id + extPath;
        if (!System.IO.Directory.Exists(path))
        {
            System.IO.Directory.CreateDirectory(path);

        }
        List<Dictionary<string, object>> l = new List<Dictionary<string, object>>();
        foreach (var dir in new DirectoryInfo(path).GetFiles())
        {
            Dictionary<string, object> d = new Dictionary<string, object>();
            d.Add("Name", dir.Name);
            d.Add("Length", dir.Length);
            d.Add("DirectoryName", dir.DirectoryName);
            l.Add(d);
        }

        return l;
    }
    [WebMethod]
    public static Boolean deleteFile(string pathFile)
    {
        //string path = System.Web.HttpContext.Current.Server.MapPath(pathFile);
        FileInfo file = new FileInfo(pathFile);
        if (file.Exists)
        {
            file.Delete();
        }
        return true;
    }
    [WebMethod]
    public static Boolean deleteFolder(string idDossier, string name, string id, string extPath)
    {
        using (StreamReader sr = new StreamReader(System.Web.HttpContext.Current.Server.MapPath("config.txt")))
        {
            pathConfig = sr.ReadLine();

        }
        string path = pathConfig + "/" + idDossier + "/" + name + "/" + id + extPath;
        var dir = new DirectoryInfo(@path);
        dir.Delete(true);
        return true;
    }
    [WebMethod]
    public static byte[] Download(string path)
    {
        string filePath = path;

        if (File.Exists(filePath))
        {
            FileInfo file = new FileInfo(filePath);
            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.ClearContent();
            HttpContext.Current.Response.ClearHeaders();
            HttpContext.Current.Response.Buffer = true;
            HttpContext.Current.Response.ContentType = MimeMapping.GetMimeMapping(file.Name);
            HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment; filename=\"" + file.Name + "\"");

            using (FileStream fileStream = new FileStream(filePath, FileMode.Open))
            {
                byte[] buffer = new byte[4096];
                int bytesRead = 0;
                MemoryStream memoryStream = new MemoryStream();

                while ((bytesRead = fileStream.Read(buffer, 0, buffer.Length)) > 0)
                {
                    memoryStream.Write(buffer, 0, bytesRead);
                }

                return memoryStream.ToArray();
            }
        }
        else
        {
            // File not found
            return null;
        }
    }
    protected void DownloadFile_Click(object sender, EventArgs e)
    {
        string filePath = @"D:\files\file.pdf";

        if (File.Exists(filePath))
        {
            WebClient req = new WebClient();
            HttpResponse response = HttpContext.Current.Response;
            Response.Clear();
            Response.ClearContent();
            Response.ClearHeaders();
            Response.Buffer = true;
            Response.ContentType = "application/pdf";
            Response.AddHeader("Content-Disposition", "attachment; filename=\"file.pdf\"");

            using (FileStream fileStream = new FileStream(filePath, FileMode.Open))
            {
                byte[] buffer = new byte[4096];
                int bytesRead = 0;

                while ((bytesRead = fileStream.Read(buffer, 0, buffer.Length)) > 0)
                {
                    Response.OutputStream.Write(buffer, 0, bytesRead);
                }

                Response.Flush();
                Response.End();
            }
        }
        else
        {
            // File not found
            Response.Write("File not found.");
            Response.End();
        }
    }

}