using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class ModeleCompteFournisseur : System.Web.UI.Page
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
    public static List<Dictionary<string, object>> CompteFournisseur(int id, int idDossier, string statment, DateTime dateStart, DateTime dateEnd)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "t_CompteFournisseur";
        SqlParameter[] parameters ={
                    new SqlParameter("@idFournisseur",id),
                    new SqlParameter("@idDossier",idDossier),
                    new SqlParameter("@statment",statment),
                    new SqlParameter("@dateStart",dateStart),
                    new SqlParameter("@dateEnd",dateEnd),
                                       };
        list = dal.JsonDataProcedure(Stored, parameters);
        dal.Disconnect();
        return list;
    }
}