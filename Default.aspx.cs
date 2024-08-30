using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Security;
using System.IO;
using System.Drawing.Imaging;
using System.Web.Hosting;
using System.Text.RegularExpressions;
using System.Web.Script.Serialization;
using System.Data.SqlClient;

public partial class _Default : System.Web.UI.Page
{
   

    protected void Page_Load(object sender, EventArgs e)
    {
        var Redirecta = new SessionLogin().connectSession();
        if (Redirecta)
        {
            HttpContext.Current.Response.Redirect("ModeleDossier.aspx");
        }
        else
        {
            DataAccessLayer dal = new DataAccessLayer();
            dal.Connect();
            DataTable dt = dal.SelectData("select * from s_Users");
            if (dt.Rows.Count > 0)
            {
                pillssignUptab.Disabled = true;
            }
            dal.Disconnect();
        }
    }
    [WebMethod]
    public static Boolean loginUser(string userName, string passwordUser)
    {
        
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        DataTable dt = dal.SelectData("select * from s_Users where userName='" + userName + "' and passwordUser='" + passwordUser + "'");
        dal.Disconnect();
        string CookiesName = new SessionLogin().CookiesName;
        if (dt.Rows.Count > 0)
        {
            if (dt.Rows[0]["userName"].ToString().ToLower() == userName.ToLower() && dt.Rows[0]["passwordUser"].ToString() == passwordUser)
            {
                
                string idUser = dt.Rows[0]["idUser"].ToString();
                HttpContext.Current.Response.Cookies[CookiesName]["logged"] = "yes";
                HttpContext.Current.Response.Cookies[CookiesName]["nomUser"] = dt.Rows[0]["nomUser"].ToString();
                HttpContext.Current.Response.Cookies[CookiesName]["typeAdmin"] = dt.Rows[0]["typeAdmin"].ToString();
                HttpContext.Current.Response.Cookies[CookiesName]["userName"] = dt.Rows[0]["userName"].ToString();
                HttpContext.Current.Response.Cookies[CookiesName]["id"] = dt.Rows[0]["idUser"].ToString();
                HttpContext.Current.Response.Cookies[CookiesName]["idgrp"] = dt.Rows[0]["idGroup"].ToString();
                byte[] time = BitConverter.GetBytes(DateTime.UtcNow.ToBinary());
                byte[] key = Guid.NewGuid().ToByteArray();
                string token = Convert.ToBase64String(time.Concat(key).ToArray());
                dal.Connect();
                dal.ExecuteCommand("update s_Users set tokenLogin='" + token + "',lastLoginDate=getdate() where idUser='" + idUser + "'");
                dal.Disconnect();
                HttpContext.Current.Response.Cookies[CookiesName]["token"] = token;
                HttpContext.Current.Response.Cookies[CookiesName].Expires = DateTime.Now.AddDays(15);
                return true;

            }
            else
            {
                HttpContext.Current.Response.Cookies[CookiesName]["Logged"] = "no";
                HttpContext.Current.Response.Cookies[CookiesName].Expires = DateTime.Now.AddDays(-1);
                return false;
            }
        }
        else
        {
            HttpContext.Current.Response.Cookies[CookiesName]["Logged"] = "no";
            HttpContext.Current.Response.Cookies[CookiesName].Expires = DateTime.Now.AddDays(-1);
            return false;
        }
    }
    [WebMethod]
    public static object insertUser(string nomUser, string userName, string passwordUser)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();

        string StoredCheck = "s_UserCheck";
        SqlParameter[] parametersCheck ={
                    new SqlParameter("@userName",userName),
                    new SqlParameter("@emailUser",userName),
                                       };
        int check = dal.ExecuteCommandProcedureGetIdentity(StoredCheck, parametersCheck);
        if (check != 0)
        {
            dal.Disconnect();
            return false;
        }
        else
        {
            dal.ExecuteCommand("insert into s_GroupUsers(descGroup) values('" + nomUser + "')");
            int idGroup = dal.ExecuteScalaint("select idGroup from s_GroupUsers where idGroup = @@IDENTITY");
            string storedDefaultDatabase = "s_insertDefaultDatabase";
            SqlParameter[] parameterDefaultDatabase ={
                    new SqlParameter("@idGroup",idGroup), };

            dal.ExecuteCommandProcedure(storedDefaultDatabase, parameterDefaultDatabase);
            string Stored = "s_UserInsert";
            string idUser= Guid.NewGuid().ToString("N");
            SqlParameter[] parameters ={
                    new SqlParameter("@idUser",idUser),
                    new SqlParameter("@nomUser",nomUser),
                    new SqlParameter("@emailUser",userName),
                    new SqlParameter("@userName",userName),
                    new SqlParameter("@passwordUser",passwordUser),
                    new SqlParameter("@typeAdmin",true),
                    new SqlParameter("@idGroup",idGroup),
                                       };
            dal.ExecuteCommandProcedure(Stored, parameters);
            dal.Disconnect();
            return true;
        }
        
    }
    [WebMethod]
    public static object User()
    {
        
        try 
        {
            SessionLogin login = new SessionLogin();
            string idUser = login.getIdUser();
            List<Dictionary<string, object>> list;
            DataAccessLayer dal = new DataAccessLayer();
            dal.Connect();
            string Stored = "select * from s_UserSettings(@idUser)";
            SqlParameter[] parameters ={
                    new SqlParameter("@idUser",login.getIdUser()),
                                       };
            list = dal.JsonDataFunction(Stored, parameters);
            dal.Disconnect();
            return list;
        }
        catch(Exception e)
        {
            return false;
        }
       
    }
    [WebMethod]
    public static object insertNewUser(string nomUser, string userName, string passwordUser, Boolean typeAdmin)
    {
        SessionLogin login = new SessionLogin();
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string StoredCheck = "s_UserCheck";
        SqlParameter[] parametersCheck ={
                    new SqlParameter("@emailUser",userName),
                    new SqlParameter("@userName",userName),
                                       };
        int check = dal.ExecuteCommandProcedureGetIdentity(StoredCheck, parametersCheck);
        if (check != 0)
        {
            dal.Disconnect();
            return false;
        }
        else
        {

            int idGroup = login.getIdgrp();
            string Stored = "s_UsersInsert";
            string idUser= Guid.NewGuid().ToString("N");
            SqlParameter[] parameters ={
                    new SqlParameter("@idUser",idUser),
                    new SqlParameter("@emailUser",userName),
                    new SqlParameter("@userName",userName),
                    new SqlParameter("@passwordUser",passwordUser),
                    new SqlParameter("@typeAdmin",typeAdmin),
                    new SqlParameter("@idGroup",idGroup),
                                       };
            dal.ExecuteCommandProcedure(Stored, parameters);
            dal.Disconnect();
            return true;
        }
     }

    [WebMethod]
    public static List<Dictionary<string, object>> UserLieeDossier(int idDossier)
    {
        SessionLogin login = new SessionLogin();
        string idUser = login.getIdUser();
        int idGrpUser = login.getIdgrp();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select idUser,nomUser,(select COUNT(*) from s_UserDossier where idDossier=" + idDossier +
            " and s_UserDossier.idUser=s_Users.idUser) as 'count' from s_Users where idGroup="
            + idGrpUser + " and idUser <> '"
            + idUser + "'");
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static void InsertLieeDossier(int idDossier, string idUser, Boolean type)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        if (type)
        {
            dal.ExecuteCommand(" insert into s_UserDossier(idDossier,idUser) values(" + idDossier + ",'" + idUser + "')");
        }
        else
        {
            dal.ExecuteCommand("delete from s_UserDossier where idDossier=" + idDossier + " and idUser='" + idUser + "'");
        }

        dal.Disconnect();
    }
    [WebMethod]
    public static RolesUsers roles()
    {
        RolesUsers role = new RolesUsers();
        return role;
    }
    [WebMethod]
    public static Boolean deconnexion()
    {
        SessionLogin login = new SessionLogin();
        login.removeCooKies();
        return true;
    }
 }