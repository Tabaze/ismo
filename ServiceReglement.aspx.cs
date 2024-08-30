using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class ServiceReglement : System.Web.UI.Page
{
    static SessionLogin login = new SessionLogin();
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!login.connectSession())
        {
            login.deconnexionSession();
        }
    }
    /***************************** Reglement ***********************/
    [WebMethod]
    public static List<Dictionary<string, object>> listReglement(List<Dictionary<string, object>> param)
    {
        string idUser = login.getIdUser();
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "r_ReglementSelect";
        param[0].Add("idUser", idUser);
        param[0].Add("SelectDoc", role.SelectDoc);
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> reglementById(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from r_Reglement where idReglement=" + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static Boolean deleteReglement(int id)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from r_Reglement where idReglement=" + id);
        dal.Disconnect();
        return true;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> reglementInsertUpdate(List<Dictionary<string, object>> param)
    {
        string idUser = login.getIdUser();
        int idGroup = login.getIdgrp();
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "r_ReglementInsertUpdate";
        param[0].Add("idUser", idUser);
        param[0].Add("idGroup", idGroup);
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> reglementLastNum(int idDossier, string codeType)
    {
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "select * from e_EntetLastNum(@idDossier,@codeType)";
        SqlParameter[] parameters ={
                    new SqlParameter("@idDossier",idDossier),
                    new SqlParameter("@codeType",codeType),
                                       };
        list = dal.JsonDataFunction(Stored, parameters);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> reglementCopier(int idReglement, int idDossier, string codeTypeCopier)
    {
        string idUser = login.getIdUser();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "r_ReglementCopier";
        SqlParameter[] parameters ={
                    new SqlParameter("@idReglement",idReglement),
                    new SqlParameter("@idDossier",idDossier),
                    new SqlParameter("@codeTypeCopier",codeTypeCopier),
                    new SqlParameter("@idUser",idUser),
                                       };
        list = dal.JsonDataProcedure(Stored, parameters);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> listFilleInReglement(int id)
    {
        string idUser = login.getIdUser();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from r_ReglementInFille r inner join s_Fille f on r.idFille=f.idFille where idReglement=" + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> insertFilleInReglement(int id,int idFille)
    {
        string idUser = login.getIdUser();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("insert into r_ReglementInFille(idFille,idReglement) values("+idFille+","+id+")");
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static bool deleteFilleInReglement(int id, int idFille)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from r_ReglementInFille where idReglement=" + id + " and idFille=" + idFille);
        dal.ExecuteCommand("delete from s_Fille where idFille=" + idFille);
        dal.Disconnect();
        return true;
    }
}