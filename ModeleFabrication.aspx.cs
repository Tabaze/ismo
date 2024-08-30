using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class ModeleFabrication : System.Web.UI.Page
{
    static SessionLogin login = new SessionLogin();
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!login.connectSession())
        {
            login.deconnexionSession();
        }
    }
    /***************************** Fabrication ***********************/
    [WebMethod]
    public static List<Dictionary<string, object>> listFabrication()
    {
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "select * from f_FabricationSelect(@idUser,@SelectDoc,@idGroup)";
        SqlParameter[] parameters ={
                    new SqlParameter("@idUser",login.getIdUser()),
                    new SqlParameter("@SelectDoc",role.SelectDoc),
                    new SqlParameter("@idGroup",login.getIdgrp()),
                                       };
        list = dal.JsonDataFunction(Stored, parameters);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> deleteFabrication(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("delete from f_Fabrication where idFabrication=" + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> insertUpdateFabrication(List<Dictionary<string, object>> param)
    {
        string idUser = login.getIdUser();
        int idGroup = login.getIdgrp();
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "f_FabricationInsertUpdate";
        param[0].Add("idUser", idUser);
        param[0].Add("idGroup", idGroup);
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> fabricationById(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from f_Fabrication where idFabrication=" + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> listFabricationLign(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from f_tableFabricationLign where idFabrication=" + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> deleteLignFabrication(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("delete from f_FabricationLign where idLignFab=" + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> insertUpdateFabricationLign(List<Dictionary<string, object>> param)
    {
        string idUser = login.getIdUser();
        int idGroup = login.getIdgrp();
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "f_LignFabrInsertUpdate";
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
    /***************************** Ordre ***********************/
    [WebMethod]
    public static List<Dictionary<string, object>> listOrdre(List<Dictionary<string, object>> param)
    {
        string idUser = login.getIdUser();
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "f_OrdreSelect";
        param[0].Add("idUser", idUser);
        param[0].Add("SelectDoc", role.SelectDoc);
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> ordreLastNum(int idDossier)
    {
        string idUser = login.getIdUser();
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "f_OrdreLastNum";
        SqlParameter[] parameters ={
                    new SqlParameter("@idUser",login.getIdUser()),
                    new SqlParameter("@SelectALL",role.SelectALL),
                    new SqlParameter("@idGroup",login.getIdgrp()),
                    new SqlParameter("@idDossier",idDossier),
                                       };
        list = dal.JsonDataProcedure(Stored, parameters);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> insertUpdateOrdre(List<Dictionary<string, object>> param)
    {
        string idUser = login.getIdUser();
        int idGroup = login.getIdgrp();
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "f_OrdreInsertUpdate";
        param[0].Add("idUser", idUser);
        param[0].Add("idGroup", idGroup);
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> ordreById(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from f_Ordre where idOrdre=" + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> deleteOrdre(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("delete from f_Ordre where idOrdre=" + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static Boolean uapdateOrdreProgressType(int idOrdre, string progressType)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "f_uapdateOrdreProgressType";
        SqlParameter[] parameters ={
                new SqlParameter("@idOrdre",idOrdre),
                new SqlParameter("@progressType",progressType),
                                   };
        dal.ExecuteCommandProcedure(Stored, parameters);
        dal.Disconnect();
        return true;
    }
    [WebMethod]
    public static Boolean uapdateOrdreProgressValider(int idOrdre, string progressType,double qteOrdreValider,double qteOrdreTrash,double qteOrdreEnCours)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "f_uapdateOrdreProgressType";
        SqlParameter[] parameters ={
                new SqlParameter("@idOrdre",idOrdre),
                new SqlParameter("@progressType",progressType),
                new SqlParameter("@qteOrdreValider",qteOrdreValider),
                new SqlParameter("@qteOrdreTrash",qteOrdreTrash),
                new SqlParameter("@qteOrdreEnCours",qteOrdreEnCours),
                                   };
        dal.ExecuteCommandProcedure(Stored, parameters);
        dal.Disconnect();
        return true;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> listArticleStock(int idFabrication,int idDepot,int idDossier,double QtOrdre)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "select * from f_listArticleStock(@idFabrication,@idDepot,@idDossier,@QtOrdre)";
        SqlParameter[] parameters ={
                    new SqlParameter("@idFabrication",idFabrication),
                    new SqlParameter("@idDepot",idDepot),
                    new SqlParameter("@idDossier",idDossier),
                    new SqlParameter("@QtOrdre",QtOrdre),
                                       };
        list = dal.JsonDataFunction(Stored, parameters);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> getQteCommand(int id,int idDossier)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select isnull(SUM(l.qteLign),0) qteLign from e_Entet e inner join e_EntetLign l on e.idEntet=l.idEntet where l.idArticle="+id+" and e.codeType='BCC' and e.idDossier="+idDossier+"  and e.valider=0");
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> listOrderLine(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from f_tableOrderLine where idOrdre=" + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static Boolean orderLineInsert(int idOrdre, string typeOrdre, double qteOrdreLine, int valStock, int idLignArticle)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "f_OrderLineInsert";
        SqlParameter[] parameters ={
                new SqlParameter("@idOrdre",idOrdre),
                new SqlParameter("@typeOrdre",typeOrdre),
                new SqlParameter("@qteOrdreLine",qteOrdreLine),
                new SqlParameter("@valStock",valStock),
                new SqlParameter("@idLignArticle",idLignArticle),
                                   };
        dal.ExecuteCommandProcedure(Stored, parameters);
        dal.Disconnect();
        return true;
    }
}
