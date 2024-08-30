using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class ModeleEntet : System.Web.UI.Page
{
    static SessionLogin login = new SessionLogin();
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!login.connectSession())
        {
            login.deconnexionSession();
        }
    }
    /***************************** Entet ***********************/
    [WebMethod]
    public static List<Dictionary<string, object>> listEntet(List<Dictionary<string, object>> param)
    {
        string idUser = login.getIdUser();
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "e_EntetSelect";
        param[0].Add("idUser", idUser);
        param[0].Add("SelectDoc", role.SelectDoc);
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> entetById(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from e_Entet where idEntet=" + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> entetByIdClient(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from e_Entet where idClient=" + id + " and codeType='BLFC'");
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> entetByIdFournisseur(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from e_Entet where idFournisseur=" + id + " and codeType='BLFFR'");
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static Boolean deleteEntet(int id)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from e_Entet where idEntet=" + id);
        dal.Disconnect();
        return true;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> clotureEntet(int idEntet)
    {

        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "e_ClotureEntet";
        SqlParameter[] parameters ={
                    new SqlParameter("@idEntet",idEntet),
                                       };
        list = dal.JsonDataProcedure(Stored, parameters);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> entetCopier(int idEntet,int idDossier,string codeTypeCopier)
    {
        string idUser = login.getIdUser();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "e_EntetCopier";
        SqlParameter[] parameters ={
                    new SqlParameter("@idEntet",idEntet),
                    new SqlParameter("@idDossier",idDossier),
                    new SqlParameter("@codeTypeCopier",codeTypeCopier),
                    new SqlParameter("@idUser",idUser),
                                       };
        list = dal.JsonDataProcedure(Stored, parameters);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static int entetCopierAll(int IdEntet, string CodeType, string CodeTypeCopier, int IdDossier,string statment,int? newIdEntet)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "e_EntetCopierAll";
        SqlParameter[] parameters ={
                new SqlParameter("@IdEntet",IdEntet),
                new SqlParameter("@newIdEntet",newIdEntet),
                new SqlParameter("@CodeType",CodeType),
                new SqlParameter("@CodeTypeCopier",CodeTypeCopier),
                new SqlParameter("@IdDossier",IdDossier),
                new SqlParameter("@IdUser",login.getIdUser()),
                new SqlParameter("@statment",statment),
                                   };
        int id= dal.ExecuteCommandProcedureGetIdentity(Stored, parameters);
        dal.Disconnect();
        return id;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> listArticleEntet(List<Dictionary<string, object>> param)
    {
        string idUser = login.getIdUser();
        int idGroup = login.getIdgrp();
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "e_EntetArticleList";
        param[0].Add("idUser", idUser);
        param[0].Add("SelectALL", role.SelectALL);
        param[0].Add("idGroup", idGroup);
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> CmupQteByArticle(List<Dictionary<string, object>> param)
    {
        string idUser = login.getIdUser();
        int idGroup = login.getIdgrp();
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "e_selectCmupQte";
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> listEntetLign(int idEntet)
    {
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "select * from e_EntetLignSelect(@idEntet)";
        SqlParameter[] parameters ={
                    new SqlParameter("@idEntet",idEntet),
                                       };
        list = dal.JsonDataFunction(Stored, parameters);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> entetLastNum(int idDossier,string codeType)
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
    public static List<Dictionary<string, object>> entetInsertUpdate(List<Dictionary<string, object>> param)
    {
        string idUser = login.getIdUser();
        int idGroup = login.getIdgrp();
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "e_EntetInsertUpdate";
        param[0].Add("idUser", idUser);
        param[0].Add("idGroup", idGroup);
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> listFilleInEntet(int id)
    {
        
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select f.* from s_Fille f inner join e_FilleInEntet e on e.idFille=f.idFille where e.idEntet="+id);
        dal.Disconnect();
        return list;
    }
      [WebMethod]
    public static List<Dictionary<string, object>> insertFilleInEntet(int id, int idFille)
    {
        string idUser = login.getIdUser();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("insert into e_FilleInEntet(idFille,idEntet) values(" + idFille + "," + id + ")");
        dal.Disconnect();
        return list;
    }
      [WebMethod]
    public static bool deleteFilleInEntet(int id, int idFille)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from e_FilleInEntet where idArticle=" + id + " and idEntet=" + idFille);
        dal.ExecuteCommand("delete from s_Fille where idFille=" + idFille);
        dal.Disconnect();
        return true;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> validerEntet(int idEntet,int idDossier)
    {

        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "e_EntetFixed";
        SqlParameter[] parameters ={
                    new SqlParameter("@idEntet",idEntet),
                    new SqlParameter("@idDossier",idDossier),
                                       };
        list = dal.JsonDataProcedure(Stored, parameters);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> getValCmupStock(int idDossier, string codeType)
    {
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "select * from e_EntetGetValCmupStock(@idDossier,@codeType)";
        SqlParameter[] parameters ={
                    new SqlParameter("@idDossier",idDossier),
                    new SqlParameter("@codeType",codeType),
                                       };
        list = dal.JsonDataFunction(Stored, parameters);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> lignEntetInsertUpdate(List<Dictionary<string, object>> param)
    {
        string idUser = login.getIdUser();
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "e_LignEntetInsertUpdate";
        param[0].Add("idUser", idUser);
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static Boolean deleteLignEntet(int id)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from e_EntetLign where idLign=" + id);
        dal.Disconnect();
        return true;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> entetFixed(int idEntet)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "e_EntetFixed";
        SqlParameter[] parameters ={
                    new SqlParameter("@idEntet",idEntet),
                                       };
        list = dal.JsonDataProcedure(Stored, parameters);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static Boolean checkNumEntet(string codeType, int idDossier, int numFactur)
    {

        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        int count = dal.ExecuteScalaint("select COUNT(*) from e_Entet where codeType='"+ codeType + "' and idDossier="+ idDossier + " and numFactur="+ numFactur);
        dal.Disconnect();
        if (count > 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}