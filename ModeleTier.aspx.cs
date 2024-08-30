using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class ModeleTier : System.Web.UI.Page
{
    static SessionLogin login = new SessionLogin();
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!login.connectSession())
        {
            login.deconnexionSession();
        }
    }
    /***************************** Client ***********************/
    [WebMethod]
    public static List<Dictionary<string, object>> listClient()
    {
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "select * from t_ClientSelect(@idUser,@SelectALL,@idGroup)";
        SqlParameter[] parameters ={
                    new SqlParameter("@idUser",login.getIdUser()),
                    new SqlParameter("@SelectALL",role.SelectALL),
                    new SqlParameter("@idGroup",login.getIdgrp()),
                                       };
        list = dal.JsonDataFunction(Stored, parameters);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> clientById(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from t_tableClient where idClient=" + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> insertUpdateClient(List<Dictionary<string, object>> param)
    {
        string idUser = login.getIdUser();
        int idGroup = login.getIdgrp();
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "t_ClientInsertUpdate";
        param[0].Add("idUser", idUser);
        param[0].Add("idGroup", idGroup);
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> ExcelEmail(string idClient)
    {
        string idUser = login.getIdUser();
        int idGroup = login.getIdgrp();
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "t_ExcelEmail";
        //param[0].Add("idUser", idUser);

        SqlParameter[] param ={
                    new SqlParameter("@idGroup",login.getIdgrp()),
                    new SqlParameter("@idClient",idClient),
                                       };
        list = dal.JsonDataProcedure(Stored, param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static Boolean deleteClient(int id)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from t_Client where idClient=" + id);
        dal.Disconnect();
        return true;
    }
    /***************************** Fournisseur ***********************/
    [WebMethod]
    public static List<Dictionary<string, object>> listFournisseur()
    {
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "select * from t_FournisseurSelect(@idUser,@SelectALL,@idGroup)";
        SqlParameter[] parameters ={
                    new SqlParameter("@idUser",login.getIdUser()),
                    new SqlParameter("@SelectALL",role.SelectALL),
                    new SqlParameter("@idGroup",login.getIdgrp()),
                                       };
        list = dal.JsonDataFunction(Stored, parameters);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> fournisseurById(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from t_Fournisseur where idFournisseur=" + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> insertUpdateFournisseur(List<Dictionary<string, object>> param)
    {
        string idUser = login.getIdUser();
        int idGroup = login.getIdgrp();
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "t_FournisseurInsertUpdate";
        param[0].Add("idUser", idUser);
        param[0].Add("idGroup", idGroup);
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> listEmailClient(List<Dictionary<string, object>> param)
    {
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "t_ClientEmail";
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static Boolean deleteFournisseur(int id)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from t_Fournisseur where idFournisseur=" + id);
        dal.Disconnect();
        return true;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> GenerateurCode(List<Dictionary<string, object>> param)
    {
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        param[0].Add("idGroup", login.getIdgrp());
        list = dal.JsonDataProcedureParam("t_Generateur_CL_FR", param);
        dal.Disconnect();
        return list;
    }

    /*************************Contact****************************/
    [WebMethod]
    public static List<Dictionary<string, object>> listContact(List<Dictionary<string, object>> param)
    {
        RolesUsers role = new RolesUsers();
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        List<Dictionary<string, object>> list = dal.JsonDataProcedureParam("t_ContactClient", param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> contactAddUp(List<Dictionary<string, object>> param)
    {
        RolesUsers role = new RolesUsers();
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        //param[0].Add("idUser", login.getIdUser());
        //param[0].Add("idGroup", login.getIdgrp());
        List<Dictionary<string, object>> list = dal.JsonDataProcedureParam("t_ContactAddUp", param);
        dal.Disconnect();
        return list;
    }

    [WebMethod]
    public static List<Dictionary<string, object>> contactById(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from t_Contacts where idContact = " + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static Boolean deleteContact(int id)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from t_Contacts where idContact=" + id);
        dal.Disconnect();
        return true;
    }
    /*************************Actions****************************/
    [WebMethod]
    public static List<Dictionary<string, object>> listActionClient(List<Dictionary<string, object>> param)
    {
        RolesUsers role = new RolesUsers();
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        List<Dictionary<string, object>> list = dal.JsonDataProcedureParam("c_ActionContactClient", param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> ActionClientAddUp(List<Dictionary<string, object>> param)
    {
        RolesUsers role = new RolesUsers();
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        param[0].Add("idUser", login.getIdUser());
        //param[0].Add("idGroup", login.getIdgrp());
        List<Dictionary<string, object>> list = dal.JsonDataProcedureParam("c_ActionAddUp", param);
        dal.Disconnect();
        return list;
    }

    [WebMethod]
    public static List<Dictionary<string, object>> ActionById(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from c_Actions where idAction = " + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static Boolean deleteAction(int id)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from c_Actions where idAction=" + id);
        dal.Disconnect();
        return true;
    }
    /*************************Offers****************************/
    [WebMethod]
    public static List<Dictionary<string, object>> listOfferClient(List<Dictionary<string, object>> param)
    {
        RolesUsers role = new RolesUsers();
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        List<Dictionary<string, object>> list = dal.JsonDataProcedureParam("t_OffreClient", param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> offerAddUp(List<Dictionary<string, object>> param)
    {
        RolesUsers role = new RolesUsers();
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        //param[0].Add("idUser", login.getIdUser());
        //param[0].Add("idGroup", login.getIdgrp());
        List<Dictionary<string, object>> list = dal.JsonDataProcedureParam("t_OffreAddUp", param);
        dal.Disconnect();
        return list;
    }

    [WebMethod]
    public static List<Dictionary<string, object>> offerById(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from t_offre where idOffre = " + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static Boolean deleteOffers(int id)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from t_offre where idOffre=" + id);
        dal.Disconnect();
        return true;
    }
    /*************************Parc****************************/
    [WebMethod]
    public static List<Dictionary<string, object>> listParcClient(List<Dictionary<string, object>> param)
    {
        RolesUsers role = new RolesUsers();
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        List<Dictionary<string, object>> list = dal.JsonDataProcedureParam("t_parcClient", param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> parcAddUp(List<Dictionary<string, object>> param)
    {
        RolesUsers role = new RolesUsers();
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        param[0].Add("idUser", login.getIdUser());
        //param[0].Add("idGroup", login.getIdgrp());
        List<Dictionary<string, object>> list = dal.JsonDataProcedureParam("t_parcAddUp", param);
        dal.Disconnect();
        return list;
    }

    [WebMethod]
    public static List<Dictionary<string, object>> parcById(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from t_parc where idParc = " + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static Boolean deleteParc(int id)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from t_parc where idParc=" + id);
        dal.Disconnect();
        return true;
    }
}