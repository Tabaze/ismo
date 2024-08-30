using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class HomeMenu : System.Web.UI.Page
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
    public static List<Dictionary<string, object>> selectAllNotification(int idDossier)
    {
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "s_selectAllNotification";
        SqlParameter[] parameters ={
                    new SqlParameter("@idDossier",idDossier),
                    //new SqlParameter("@SelectALL",role.SelectALL),
                    //new SqlParameter("@idGroup",login.getIdgrp()),
                                       };
        list = dal.JsonDataProcedure(Stored, parameters);
        dal.Disconnect();
        return list;
    }
}