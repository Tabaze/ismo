<%@ WebHandler Language="C#" Class="AjaxSendEmail" %>

using System;
using System.IO;
using System.Data;
using System.Web;
using System.Net.Mime;
using System.Net.Mail;
using System.Net;
using System.Data.SqlClient;


public class AjaxSendEmail : IHttpHandler
{

    static SessionLogin login = new SessionLogin();
    public void ProcessRequest(HttpContext context)
    {
        string base64Image = "<br><img src=\"https://lh3.googleusercontent.com/drive-viewer/AK7aPaDN7xLqfRhcR6mhJfpVsISDDCJcD77YMTo7z5Xrhe0NKWjAZDbI7FC1o5emq_dFKaD399UWFjcXGPcs1d6LdY9gwy64aA=s1600\" style=\"width: 50%;\" >";
        Attachment attachment = null;
        string fileName = "";
        string subject = "";
        string body = "";
        string email = "";
        int uid = 0;
        string typeClient = "";
        int idArticle = 0;

        try
        {
            if (context.Request.Files.Count != 0)
            {
                string pathstring = context.Request.Form[0];
                string fileNameString = context.Request.Form[1];
                string path = context.Server.MapPath(pathstring);
                var file = context.Request.Files[0];
                if (!Directory.Exists(path))
                    Directory.CreateDirectory(path);

                fileName = file.FileName;
                //string newFilename = Guid.NewGuid().ToString();
                FileInfo fInfo = new FileInfo(fileName);
                fileNameString = string.Format("{0}{1}", fileNameString, fInfo.Extension);
                string strFileName = fileNameString;
                fileName = Path.Combine(path, fileNameString);
                file.SaveAs(fileName);
                attachment = new Attachment(fileName);
                subject = context.Request.Form[2];
                body = context.Request.Form[3];
                email = context.Request.Form[4];
                uid = int.Parse(context.Request.Form[5]);
                typeClient = context.Request.Form[6];
                idArticle = int.Parse(context.Request.Form[7]);
            }
            else if (context.Request.Form.Count > 0)
            {
                string pathstring = context.Request.Form[1];
                string fileNameString = context.Request.Form[2];
                subject = context.Request.Form[3];
                body = context.Request.Form[4];
                email = context.Request.Form[5];
                uid = int.Parse(context.Request.Form[6]);
                typeClient = context.Request.Form[7];
                idArticle = int.Parse(context.Request.Form[8]);
            }
            string msg = "{";
            msg += string.Format("error:'{0}',\n", string.Empty);
            //msg += string.Format("msg:'{0}'\n", strFileName);
            msg += "}";
            DataAccessLayer dt = new DataAccessLayer();
            dt.Connect();
            DataTable table = dt.SelectData("select * from email_param");
            dt.Disconnect();
            int port = Convert.ToInt32(table.Rows[0][1].ToString());
            bool enableSsl = Convert.ToBoolean(table.Rows[0][2].ToString());
            string host = table.Rows[0][3].ToString();
            string username = table.Rows[0][4].ToString();
            string password = table.Rows[0][5].ToString();
            dt.Connect();
            SqlParameter[] parameters ={
                    new SqlParameter("@idUser",login.getIdUser()),
                    new SqlParameter("@idGroup",login.getIdgrp()),
                    new SqlParameter("@statement","insert"),
                    new SqlParameter("@message",body.Replace("&lt;", "<").Replace("&gt;", ">")),
                    new SqlParameter("@attachements",fileName),
                    new SqlParameter("@subject",subject),
                    new SqlParameter("@to",email),
                    new SqlParameter("@uid",uid),
                    new SqlParameter("@typeClient",typeClient),
                    new SqlParameter("@idArticle",idArticle),
                    new SqlParameter("@fromName",username.Split('@')[0]),
                                       };
            var list = dt.JsonDataProcedure("e_EmailsInsertUpdate", parameters);
            dt.Disconnect();
            //if (list == null) throw new Exception("Error insert email");
            MailMessage message = new MailMessage();
            SmtpClient smtp = new SmtpClient();
            message.From = new MailAddress(username, username.Split('@')[0]);
            message.To.Add(new MailAddress(email));
            message.Subject = subject;
            message.IsBodyHtml = true;
            if (attachment != null)
                message.Attachments.Add(attachment);
            message.Body = body.Replace("&lt;", "<").Replace("&gt;", ">") + base64Image;

            smtp.Port = port;
            smtp.Host = host;
            smtp.EnableSsl = enableSsl;
            smtp.UseDefaultCredentials = false;
            smtp.Credentials = new NetworkCredential(username, password);
            smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
            smtp.Timeout = 100000;
            smtp.Send(message);
        }
        catch (SmtpException ex)
        {
            if (attachment != null)
                attachment.Dispose();
            context.Response.Write(ex.Message);
        }
        catch (Exception e)
        {
            context.Response.Write(e.Message);
        }
        finally
        {
            attachment.Dispose();
            context.Response.Write("Success");
        }
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}