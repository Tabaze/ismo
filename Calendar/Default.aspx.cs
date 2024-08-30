using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Calendar_Default : System.Web.UI.Page
{
    static SessionLogin login = new SessionLogin();
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    [WebMethod]
    public static List<Dictionary<string, object>> listcalendar()
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from b_TypeAction");
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> listcalendarbyid(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from b_TypeAction where idTypeAction=" + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static bool deletecalendar(int id)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from b_TypeAction where idTypeAction=" + id);
        dal.Disconnect();
        return true;
    }
    [WebMethod]
    public static int insertSchedules(int calendarId, string title, string body, bool isAllDay, DateTime start, DateTime end, bool isPrivate, string location, string codetier, string nomtier)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "insertSchedules";
        int id = 0;
        SqlParameter[] parameters ={
                new SqlParameter("@calendarId",calendarId),
                new SqlParameter("@title",title),
                new SqlParameter("@isAllDay",isAllDay),
                new SqlParameter("@start",start),
                new SqlParameter("@end",end),
                new SqlParameter("@location",location),
                new SqlParameter("@body",body),
                new SqlParameter("@codetier",codetier),
                new SqlParameter("@nomtier",nomtier),
                new SqlParameter("@isPrivate",isPrivate),
                                   };
        DataTable dt = dal.SelectDataProcedure(Stored, parameters);
        if (dt.Rows.Count > 0)
        {
            id = Convert.ToInt32(dt.Rows[0]["id"]);

        }
        dal.Disconnect();
        return id;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> updateSchedule(List<Dictionary<string, object>> param)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        param[0].Add("idUser", login.getIdUser());
        List<Dictionary<string, object>> list = dal.JsonDataProcedureParam("c_updateSchedule", param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> insertTypeAction(List<Dictionary<string, object>> param)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        //param[0].Add("idUser",login.getIdUser());
        List<Dictionary<string, object>> list = dal.JsonDataProcedureParam("[b_TypeActionAddUp]", param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static void deleteSchedule(int id)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from c_Actions where idAction=" + id);
        dal.Disconnect();
    }
    [WebMethod]
    public static List<Dictionary<string, object>> listSchedule(int idTypeAction, DateTime renderStart, DateTime renderEnd)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "c_ActionsSelect";
        SqlParameter[] parameters ={
                new SqlParameter("@idTypeAction",idTypeAction),
                new SqlParameter("@renderStart",renderStart),
                new SqlParameter("@renderEnd",renderEnd),
                                   };
        list = dal.JsonDataProcedure(Stored, parameters);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> listclient(int Id_dossier)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select Code_client as id,Nom_client as text from f_client where Id_dossier=" + Id_dossier);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> listfournisseur(int Id_dossier)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select Code_fournisseur as id,Nom_fournisseur as text from f_fournisseur where Id_dossier=" + Id_dossier);
        dal.Disconnect();
        return list;
    }

}