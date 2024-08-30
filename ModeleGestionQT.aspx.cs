using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class ModeleGestionQT : System.Web.UI.Page
{
    static SessionLogin login = new SessionLogin();
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!login.connectSession())
        {
            login.deconnexionSession();
        }
    }
    // [WebMethod]
    // public static List<Dictionary<string, object>> gestionQte(int id,int idDossier,string statment,DateTime dateD,DateTime dateE)
    // {
    //     RolesUsers roles = new RolesUsers();
    //     List<Dictionary<string, object>> list;
    //     DataAccessLayer dal = new DataAccessLayer();
    //     dal.Connect();
    //     string Stored = "a_GestionQte";
    //     SqlParameter[] parameters ={
    //                 new SqlParameter("@id",id),
    //                 new SqlParameter("@idDossier",idDossier),
    //                 new SqlParameter("@SelectDoc",roles.SelectDoc),
    //                 new SqlParameter("@idUser",login.getIdUser()),
    //                 new SqlParameter("@statment",statment),
    //                 new SqlParameter("@dateD",dateD),
    //                 new SqlParameter("@dateE",dateE),
    //                                    };
    //     list = dal.JsonDataProcedure(Stored, parameters);
    //     dal.Disconnect();
    //     return list;
    // }
    [WebMethod]
    public static List<Dictionary<string, object>> gestionQte(List<Dictionary<string, object>> param)
    {
        string idUser = login.getIdUser();
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "a_GestionQte";
        param[0].Add("idUser", idUser);
        param[0].Add("SelectDoc", role.SelectDoc);
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
}