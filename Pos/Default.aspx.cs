using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Pos_Default : System.Web.UI.Page
{
    static SessionPos pos = new SessionPos();
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!pos.connectSession())
        {
            string CookiesName = pos.CookiesName;
            Random rnd = new Random();
            int myRandomNo = rnd.Next(10000000, 99999999);
            HttpContext.Current.Response.Cookies[CookiesName]["tokenPos"] = myRandomNo.ToString();
            HttpContext.Current.Response.Cookies[CookiesName].Expires = DateTime.Now.AddDays(365);
            form1.InnerHtml = myRandomNo.ToString();
        }
    }
    /***************************** Pos ***********************/
    [WebMethod]
    public static List<Dictionary<string, object>> infoPos()
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from p_Pos where idPos=   "+ pos.getIdPos());
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static object login(string passCaissier,int idGroup)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from p_Caissier where passCaissier='" + passCaissier+ "' and idGroup="+ idGroup);
        dal.Disconnect();
        if (list.Count > 0)
        {
            return list;
        }
        else
        {
            return false;
        }
        
    }
    [WebMethod]
    public static object POS_Session(int idCaissier, int idPos)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from p_Session where idPos="+ idPos + " and caissierOpen="+ idCaissier + " and closed=0");
        dal.Disconnect();

        if (list.Count > 0)
        {
            return list;
        }
        else
        {
            return false;
        }

    }
    [WebMethod]
    public static List<Dictionary<string, object>> SessionInserUpdate(List<Dictionary<string, object>> param)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "p_SessionInserUpdate";
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> listModRglm(int idPos)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from p_ModRglm p inner join b_ModRglm b on p.idModRglm=b.idModRglm where idPos=" + idPos + " order by defaults desc");
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> listFavorisArticle(int idGroup)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from a_tableArticle where favorisArticle=1 and idGroup="+ idGroup);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> listFamille(int idPos)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from p_Famille p inner join a_Famille f on p.idFamille=f.idFamille where idPos=" + idPos);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> listArticleByFamille(int idFamille)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from a_tableArticle where idFamille=" + idFamille);
        dal.Disconnect();
        return list;
    }



































    [WebMethod]
    public static void sendEmail(string html,string email,string subject,string from)
    {
        try
        {
            MailMessage message = new MailMessage();
            SmtpClient smtp = new SmtpClient();
            message.From = new MailAddress("LEADER_CRM@ittone.ma", from);
            message.To.Add(new MailAddress(email));
            message.Subject = subject;
            message.IsBodyHtml = true; //to make message body as html  
            message.Body = html;
            smtp.Port = 587;
            smtp.Host = "ittone.ma"; //for gmail host  
            smtp.EnableSsl = false;
            smtp.UseDefaultCredentials = false;
            smtp.Credentials = new NetworkCredential("leader_crm@ittone.ma", "?xm0q4bDVpX{");
            smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
            smtp.Send(message);
        }catch(Exception e) { }
       

    }
    [WebMethod]
    public static string getJsonScreen(string fileName)
    {
        try
        {
            string path = HttpContext.Current.Server.MapPath("js/core/" + fileName);
            string text = File.ReadAllText(path);
            return text;
        }
        catch(Exception e)
        {
            return "";
        }
        
    }
    [WebMethod]
    public static string setJsonScreen(string data,string fileName)
    {
        string path = HttpContext.Current.Server.MapPath("js/core/" + fileName);
        try
        {
            
            if (File.Exists(path))
            {
                File.WriteAllText(path, string.Empty);
                File.WriteAllText(path, data);
            }
            else
            {
                using (StreamWriter sw = File.CreateText(path))
                {
                    sw.WriteLine(data);
                    sw.Close();
                }        
            }

        }catch(Exception e)
        {

        }
        
        
        return path;
    }
}