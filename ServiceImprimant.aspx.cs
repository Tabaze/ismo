using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class ServiceImprimant : System.Web.UI.Page
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
    public static List<Dictionary<string, object>> infoEntetById(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from e_tableEntet e inner join e_TypeDoc t on t.codeType=e.codeType where idEntet=" + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> listTaux(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select l.lgnTVA,SUM(l.lgnTTC)-SUM(l.lgnHT) as taux ,SUM(l.lgnHT) as Base from e_Entet e inner join e_EntetLign l on e.idEntet=l.idEntet where e.idEntet = "+ id+" group by l.lgnTVA");
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> listEntetLign(int id)
    {
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "select * from e_EntetLignSelect(@idEntet)";
        SqlParameter[] parameters ={
                    new SqlParameter("@idEntet",id),
                                       };
        list = dal.JsonDataFunction(Stored, parameters);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<string> getFoldersNameEntet()
    {
        String dirPath = System.Web.HttpContext.Current.Server.MapPath(@"imprimant/entet");
        List<string> list = new List<string>();
        foreach (var dir in new DirectoryInfo(dirPath).GetDirectories())
        {
            list.Add(dir.Name);
        }
        return list;
    }
   [WebMethod]
    public static void updateMetaEntet(List<Dictionary<string, object>> param)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "e_EntetUpdateMeta";
        dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
    }
    [WebMethod]
    public static List<Dictionary<string, object>> listImpressionBulletinPaie(int idEntete)
    {
         RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "select * from Paie_Calcul_ImpressionBulletin(@idEntete)";
        SqlParameter[] parameters ={
                    new SqlParameter("@idEntete",idEntete)
                                       };
        list = dal.JsonDataFunction(Stored, parameters);
        dal.Disconnect();
        return list;
    }

    [WebMethod]
    public static List<Dictionary<string, object>> ListImageArticle(List<Dictionary<string, object>> param)
    {
        string idUser = login.getIdUser();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonDataProcedureParam("a_ListImageArticle", param);
        dal.Disconnect();
        return list;
    }

    [WebMethod]
    public static List<Dictionary<string, object>> articleById(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from a_Article where idArticle=" + id);
        dal.Disconnect();
        return list;
    }
}