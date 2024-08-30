using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Import : System.Web.UI.Page
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
    public static List<Dictionary<string, object>> listColName(string tableName)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("SELECT COLUMN_NAME,DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'" + tableName + "'");
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static int insertFille(string nameFile, string pathFile, string typeFile, string sizeFile)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "s_FileInsert";
        SqlParameter[] parameters ={
                    new SqlParameter("@nameFile",nameFile),
                    new SqlParameter("@pathFile",pathFile),
                    new SqlParameter("@typeFile",typeFile),
                    new SqlParameter("@sizeFile",sizeFile),
                                       };
        int id = dal.ExecuteCommandProcedureGetIdentity(Stored, parameters);
        dal.Disconnect();
        return id;
    }
    [WebMethod]
    public static int deleteFile(string pathFile)
    {
        string path = System.Web.HttpContext.Current.Server.MapPath(pathFile);
        FileInfo file = new FileInfo(path);
        if (file.Exists)
        {
            file.Delete();
        }
        return 1;
    }

}