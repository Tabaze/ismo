using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class ModeleDossier : System.Web.UI.Page
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
    public static List<Dictionary<string, object>> DossierInsertUapdate(List<Dictionary<string, object>> param)
    {
        string idUser = login.getIdUser();
        int idGroup = login.getIdgrp();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "s_DossierInsertUapdate";
        param[0].Add("idUser", idUser);
        param[0].Add("idGroup", idGroup);
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> DossierList()
    {
        string idUser = login.getIdUser();
        int idgrp = login.getIdgrp();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        if (login.getAdmin())
        {
            list = dal.JsonData("select * from s_Dossier where idGroup="+ idgrp);
        }
        else
        {
            list = dal.JsonData("select d.* from s_UserDossier u inner join s_Dossier d on u.idDossier = d.idDossier where u.idUser='" + idUser + "'");
        }
        
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> DossierById(int idDossier)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from s_Dossier where idDossier=" + idDossier);
        dal.Disconnect();
        return list;
    }

    [WebMethod]
    public static List<Dictionary<string, object>> getInfoWoocommerce(int Id_dossier)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select domainName,wooClientKey,wooClientSecret from s_Dossier where idDossier=" + Id_dossier);
        dal.Disconnect();
        return list;
    }
}