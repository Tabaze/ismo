using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class ModeleEmails : System.Web.UI.Page
{
    static SessionLogin login = new SessionLogin();
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!login.connectSession())
        {
            login.deconnexionSession();
        }
    }
    [WebMethod]
    public static List<Dictionary<string, object>> listTier()
    {
        int idGroup = login.getIdgrp();
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "t_tableEmails";
        SqlParameter[] parameters ={
                    new SqlParameter("@idGroup",login.getIdgrp()),
                                       };
        list = dal.JsonDataProcedure(Stored, parameters);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> listTierEmail()
    {
        int idGroup = login.getIdgrp();
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "t_tableEmails";
        SqlParameter[] parameters ={
                    new SqlParameter("@idGroup",login.getIdgrp()),
                                       };
        list = dal.JsonDataProcedure(Stored, parameters);
        dal.Disconnect();
        return list;
    }
     [WebMethod]
    public static List<Dictionary<string, object>> listEmailsParTier(List<Dictionary<string, object>> param)
    {
        int idGroup = login.getIdgrp();
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "t_ListEmailsParTiers";
        param[0].Add("idGroup", idGroup);
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static object insertUpdateEmails(List<Dictionary<string, object>> param)
    {
        string idUser = login.getIdUser();
        int idGroup = login.getIdgrp();
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "e_EmailsInsertUpdate";
        param[0].Add("idUser", idUser);
        param[0].Add("idGroup", idGroup);
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> listEmails(DateTime dateD,DateTime dateE,string folder)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "select * from e_EmailsSelect(@dateD,@dateE,@folder,@idGroup)";
        SqlParameter[] parameters ={
                    new SqlParameter("@dateD",dateD),
                    new SqlParameter("@dateE",dateE),
                    new SqlParameter("@folder",folder),
                    new SqlParameter("@idGroup",login.getIdgrp()),
                                       };
        list = dal.JsonDataFunction(Stored, parameters);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> EmailsById(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("update e_Emails set seen=1 where idEmail=" + id + "  select * from e_Emails where idEmail=" + id);
        dal.Disconnect();
        return list;
    }
}