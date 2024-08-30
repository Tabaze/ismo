using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class ModeleDashboard : System.Web.UI.Page
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
    public static List<Dictionary<string, object>> dashboardInfos(List<Dictionary<string, object>> param)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "ds_Dashboard";
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> articleDash(List<Dictionary<string, object>> param)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        param[0].Add("idGroup", login.getIdgrp());
        list = dal.JsonDataProcedureParam("ds_ArticleDespo", param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> articleChart(List<Dictionary<string, object>> param)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        param[0].Add("idGroup", login.getIdgrp());
        list = dal.JsonDataProcedureParam("ds_ArticleChart", param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> ClientByPays(List<Dictionary<string, object>> param)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        param[0].Add("idGroup", login.getIdgrp());
        list = dal.JsonDataProcedureParam("ds_ClientByPays", param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> top5()
    {
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonDataFunction("select * from ds_top5ClientCA(@idGroup)", new SqlParameter[]{
            new SqlParameter("@idGroup", login.getIdgrp()),
                                       });
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> ClientPot(List<Dictionary<string, object>> param)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        //param[0].Add("idGroup", login.getIdgrp());
        list = dal.JsonDataProcedureParam("ds_ClientPot", param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> ClientParPot(List<Dictionary<string, object>> param)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        //param[0].Add("idGroup", login.getIdgrp());
        list = dal.JsonDataProcedureParam("ds_ClientParPot", param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> total_by_pays(List<Dictionary<string, object>> param)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        param[0].Add("idGroup", login.getIdgrp());
        list = dal.JsonDataProcedureParam("ds_total_by_pays", param);
        dal.Disconnect();
        return list;
    }
}