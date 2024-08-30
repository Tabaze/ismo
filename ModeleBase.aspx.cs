using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class ModeleBase : System.Web.UI.Page
{
    static SessionLogin login = new SessionLogin();
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!login.connectSession())
        {
            login.deconnexionSession();
        }
    }
    /***************************** Depot ***********************/
    [WebMethod]
    public static List<Dictionary<string, object>> listDepot()
    {
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "b_DepotSelect";
        SqlParameter[] parameters ={
                    new SqlParameter("@idUser",login.getIdUser()),
                    new SqlParameter("@SelectALL",role.SelectALL),
                    new SqlParameter("@idGroup",login.getIdgrp()),
                                       };
        list = dal.JsonDataProcedure(Stored, parameters);
        dal.Disconnect();
        return list;

        //RolesUsers role = new RolesUsers();
        //List<Dictionary<string, object>> list;
        //DataAccessLayer dal = new DataAccessLayer();
        //dal.Connect();
        //string Stored = "select * from t_ClientSelect(@idUser,@SelectALL,@idGroup)";
        //SqlParameter[] parameters ={
        //            new SqlParameter("@idUser",login.getIdUser()),
        //            new SqlParameter("@SelectALL",role.SelectALL),
        //            new SqlParameter("@idGroup",login.getIdgrp()),
        //                               };
        //list = dal.JsonDataFunction(Stored, parameters);
        //dal.Disconnect();
        //return list;

    }
    [WebMethod]
    public static List<Dictionary<string, object>> depotById(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect(); 
        list = dal.JsonData("select * from b_Depot where idDepot="+id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> insertUpdateDepot(List<Dictionary<string, object>> param)
    {
        string idUser = login.getIdUser();
        int idGroup = login.getIdgrp();
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "b_DepotInsertUpdate";
        param[0].Add("idUser", idUser);
        param[0].Add("idGroup", idGroup);
        param[0].Add("SelectALL", role.SelectALL);
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static Boolean deleteDepot(int id)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from b_Depot where idDepot=" + id);
        dal.Disconnect();
        return true;
    }

    /***************************** DepotSup ***********************/
    [WebMethod]
    public static List<Dictionary<string, object>> listDepotSup()
    {
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "select * from b_DepotSupSelect(@idUser,@SelectALL,@idGroup)";
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
    public static List<Dictionary<string, object>> depotSupById(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from b_DepotSup where idSupDepot=" + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> insertUpdateDepotSup(List<Dictionary<string, object>> param)
    {
        string idUser = login.getIdUser();
        int idGroup = login.getIdgrp();
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "b_DepotSupInsertUpdate";
        param[0].Add("idUser", idUser);
        param[0].Add("idGroup", idGroup);
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static Boolean deleteDepotSup(int id)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from b_DepotSup where idSupDepot=" + id);
        dal.Disconnect();
        return true;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> SubDepotbyIdDepot(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from b_DepotSup where idDepot=" + id);
        dal.Disconnect();
        return list;
    }

    /***************************** Tresor ***********************/
    [WebMethod]
    public static List<Dictionary<string, object>> listTresor()
    {
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "b_TresorSelect";
        SqlParameter[] parameters ={
                    new SqlParameter("@idUser",login.getIdUser()),
                    new SqlParameter("@SelectALL",role.SelectALL),
                    new SqlParameter("@idGroup",login.getIdgrp()),
                                       };
        list = dal.JsonDataProcedure(Stored, parameters);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> tresorById(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from b_Tresorerie where idTreso=" + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> insertUpdateTresor(List<Dictionary<string, object>> param)
    {
        string idUser = login.getIdUser();
        int idGroup = login.getIdgrp();
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "b_TresorInsertUpdate";
        param[0].Add("idUser", idUser);
        param[0].Add("idGroup", idGroup);
        param[0].Add("SelectALL", role.SelectALL);
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static Boolean deleteTresor(int id)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from b_Tresorerie where idTreso=" + id);
        dal.Disconnect();
        return true;
    }
    /***************************** Ville ***********************/
    [WebMethod]
    public static List<Dictionary<string, object>> listVille(string id)
    {
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "b_VilleSelect";
        SqlParameter[] parameters ={
                    new SqlParameter("@id",id),
                    new SqlParameter("@idUser",login.getIdUser()),
                    new SqlParameter("@idGroup",login.getIdgrp()),
                                       };
        list = dal.JsonDataProcedure(Stored, parameters);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> InsertUpdateVille(List<Dictionary<string, object>> param)
    {
        int idGroup = login.getIdgrp();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "b_VilleInsertUpdate";
        param[0].Add("idGroup", idGroup);
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> villeById(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from b_Ville where idVille=" + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static Boolean deleteVille(int id)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from b_Ville where idVille=" + id);
        dal.Disconnect();
        return true;
    }
    /***************************** Pays ***********************/
    [WebMethod]
    public static List<Dictionary<string, object>> listPays()
    {
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "b_PaysSelect";
        SqlParameter[] parameters ={
                    new SqlParameter("@idUser",login.getIdUser()),
                    new SqlParameter("@idGroup",login.getIdgrp()),
                                       };
        list = dal.JsonDataProcedure(Stored, parameters);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> InsertUpdatePays(List<Dictionary<string, object>> param)
    {
        int idGroup = login.getIdgrp();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "b_PaysInsertUpdate";
        param[0].Add("idGroup", idGroup);
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> paysById(string id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from b_Pays where id='" + id+"'");
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static Boolean deletePays(string id)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from b_Pays where id='" + id + "'");
        dal.Disconnect();
        return true;
    }

    /***************************** ModRglm ***********************/
    [WebMethod]
    public static List<Dictionary<string, object>> listModRglm()
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from b_ModRglm where idGroup=" + login.getIdgrp());
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> InsertUpdateModRglm(List<Dictionary<string, object>> param)
    {
        int idGroup = login.getIdgrp();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "b_ModRglmInsertUpdate";
        param[0].Add("idGroup", idGroup);
        param[0].Add("IdUser", login.getIdUser());
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> modRglmById(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from b_ModRglm where idModRglm=" + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static Boolean deleteModRglm(int id)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from b_ModRglm where idModRglm=" + id);
        dal.Disconnect();
        return true;
    }
    /***************************** Taxe ***********************/
    [WebMethod]
    public static List<Dictionary<string, object>> listTaxe()
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from b_Taxe where idGroup=" + login.getIdgrp());
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> InsertUpdateTaxe(List<Dictionary<string, object>> param)
    {
        int idGroup = login.getIdgrp();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "b_TaxeInsertUpdate";
        param[0].Add("idGroup", idGroup);
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> taxeById(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from b_Taxe where idTaxe=" + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static Boolean deleteTaxe(int id)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from b_Taxe where idTaxe=" + id);
        dal.Disconnect();
        return true;
    }
    /***************************** Service ***********************/
    [WebMethod]
    public static List<Dictionary<string, object>> listService()
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from b_Service where idGroup=" + login.getIdgrp());
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> InsertUpdateService(List<Dictionary<string, object>> param)
    {
        int idGroup = login.getIdgrp();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "b_ServiceInsertUpdate";
        param[0].Add("idGroup", idGroup);
        param[0].Add("idUser", login.getIdUser());
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> serviceById(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from b_Service where idService=" + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static Boolean deleteService(int id)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from b_Service where idService=" + id);
        dal.Disconnect();
        return true;
    }
     /***************************** Unité Mesure ***********************/
    [WebMethod]
    public static List<Dictionary<string, object>> listUniteMesure()
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from u_UniteMesure where idGroup="+login.getIdgrp());
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> InsertUpdateUniteMesure(List<Dictionary<string, object>> param)
    {
        string idUser = login.getIdUser();
        int idGroup = login.getIdgrp();
        List<Dictionary<string, object>> list;
        RolesUsers role = new RolesUsers();
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "u_UniteMesureInsertUpdate"; 
        param[0].Add("idUser", idUser);
        param[0].Add("idGroup", idGroup);
        param[0].Add("SelectALL", role.SelectALL);
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> uniteById(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from u_UniteMesure where idUnite=" + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static Boolean deleteUnite(int id)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from u_UniteMesure where idUnite=" + id);
        dal.Disconnect();
        return true;
    }
    /***************************** Propriété ***********************/
    [WebMethod]
    public static List<Dictionary<string, object>> listPropriete()
    {
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "select * from b_ProprieteSelect(@idUser,@SelectALL,@idGroup)";
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
    public static List<Dictionary<string, object>> ProprieteById(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from b_Propriete where idPropriete=" + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> insertUpdatePropriete(List<Dictionary<string, object>> param)
    {
        string idUser = login.getIdUser();
        int idGroup = login.getIdgrp();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "b_ProprieteInsertUpdate";
        param[0].Add("idUser", idUser);
        param[0].Add("idGroup", idGroup);
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static Boolean deletePropriete(int id)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from b_Propriete where idPropriete=" + id);
        dal.Disconnect();
        return true;
    }

    /***************************** Origine du contact ***********************/
    [WebMethod]
    public static List<Dictionary<string, object>> listOriContact()
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from b_Origine where idGroup=" + login.getIdgrp());
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> InsertUpdateOriContact(List<Dictionary<string, object>> param)
    {
        List<Dictionary<string, object>> list;
        RolesUsers role = new RolesUsers();
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        param[0].Add("idUser", login.getIdUser());
        param[0].Add("idGroup", login.getIdgrp());
        //param[0].Add("SelectALL", role.SelectALL);
        list = dal.JsonDataProcedureParam("b_OrigineAddUp", param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> OriContactById(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from b_Origine where idOrigine=" + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static Boolean deleteOriContact(int id)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from b_Origine where idOrigine=" + id);
        dal.Disconnect();
        return true;
    }

    /***************************** Industrie ***********************/
    [WebMethod]
    public static List<Dictionary<string, object>> listIndustrie()
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from b_Industrie where idGroup=" + login.getIdgrp());
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> InsertUpdateIndustrie(List<Dictionary<string, object>> param)
    {
        List<Dictionary<string, object>> list;
        RolesUsers role = new RolesUsers();
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        param[0].Add("idUser", login.getIdUser());
        param[0].Add("idGroup", login.getIdgrp());
        //param[0].Add("SelectALL", role.SelectALL);
        list = dal.JsonDataProcedureParam("b_IndustrieAddUp", param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> IndustrieById(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from b_Industrie where idIndustrie=" + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static Boolean deleteIndustrie(int id)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from b_Industrie where idIndustrie=" + id);
        dal.Disconnect();
        return true;
    }
    /***************************** Categorie ***********************/
    [WebMethod]
    public static List<Dictionary<string, object>> listCategorie()
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from b_Categorie where idGroup=" + login.getIdgrp());
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> InsertUpdateCategorie(List<Dictionary<string, object>> param)
    {
        List<Dictionary<string, object>> list;
        RolesUsers role = new RolesUsers();
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        param[0].Add("idUser", login.getIdUser());
        param[0].Add("idGroup", login.getIdgrp());
        //param[0].Add("SelectALL", role.SelectALL);
        list = dal.JsonDataProcedureParam("b_CategorieAddUp", param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> CategorieById(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from b_Categorie where idCategorie=" + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static Boolean deleteCategorie(int id)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from b_Categorie where idCategorie=" + id);
        dal.Disconnect();
        return true;
    }
    /***************************** Type ***********************/
    [WebMethod]
    public static List<Dictionary<string, object>> listType()
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from b_Type where idGroup=" + login.getIdgrp());
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> InsertUpdateType(List<Dictionary<string, object>> param)
    {
        List<Dictionary<string, object>> list;
        RolesUsers role = new RolesUsers();
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        param[0].Add("idUser", login.getIdUser());
        param[0].Add("idGroup", login.getIdgrp());
        //param[0].Add("SelectALL", role.SelectALL);
        list = dal.JsonDataProcedureParam("b_TypeAddUp", param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> TypeById(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from b_Type where idType=" + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static Boolean deleteType(int id)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from b_Type where idType=" + id);
        dal.Disconnect();
        return true;
    }
    /***************************** PotClient ***********************/
    [WebMethod]
    public static List<Dictionary<string, object>> listPotClient()
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from b_PotClient where idGroup=" + login.getIdgrp());
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> InsertUpdatePotClient(List<Dictionary<string, object>> param)
    {
        List<Dictionary<string, object>> list;
        RolesUsers role = new RolesUsers();
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        param[0].Add("idUser", login.getIdUser());
        param[0].Add("idGroup", login.getIdgrp());
        //param[0].Add("SelectALL", role.SelectALL);
        list = dal.JsonDataProcedureParam("b_PotClientAddUp", param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> PotClientById(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from b_PotClient where idPotClient=" + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static Boolean deletePotClient(int id)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from b_PotClient where idPotClient=" + id);
        dal.Disconnect();
        return true;
    }
    /***************************** Relation Client ***********************/
    [WebMethod]
    public static List<Dictionary<string, object>> listRelation()
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from b_RelationClient where idGroup=" + login.getIdgrp());
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> InsertUpdateRelation(List<Dictionary<string, object>> param)
    {
        List<Dictionary<string, object>> list;
        RolesUsers role = new RolesUsers();
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        param[0].Add("idUser", login.getIdUser());
        param[0].Add("idGroup", login.getIdgrp());
        //param[0].Add("SelectALL", role.SelectALL);
        list = dal.JsonDataProcedureParam("b_RelationClientAddUp", param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> RelationById(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from b_RelationClient where idRelation=" + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static Boolean deleteRelation(int id)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from b_RelationClient where idRelation=" + id);
        dal.Disconnect();
        return true;
    }
    /***************************** b_CategorieActionAddUp ***********************/
    [WebMethod]
    public static List<Dictionary<string, object>> listCateAction()
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from b_CategorieAction");
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> InsertUpdateCateAction(List<Dictionary<string, object>> param)
    {
        List<Dictionary<string, object>> list;
        RolesUsers role = new RolesUsers();
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        param[0].Add("idUser", login.getIdUser());
        //param[0].Add("idGroup", login.getIdgrp());
        //param[0].Add("SelectALL", role.SelectALL);
        list = dal.JsonDataProcedureParam("b_CategorieActionAddUp", param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> cateActionById(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from b_CategorieAction where idActionCate=" + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static Boolean deleteCateAction(int id)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from b_CategorieAction where idActionCate=" + id);
        dal.Disconnect();
        return true;
    }
    /***************************** Rebrique ***********************/
    [WebMethod]
    public static List<Dictionary<string, object>> listRebrique()
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        SqlParameter[] parameters ={
                    new SqlParameter("@idUser",login.getIdUser()),
                    new SqlParameter("@idGroup",login.getIdgrp()),
                                       };
        list = dal.JsonDataFunction("select * from b_rebriqueSelect(@idUser,@idGroup)", parameters);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> InsertUpdateRebrique(List<Dictionary<string, object>> param)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        param[0].Add("idUser", login.getIdUser());
        param[0].Add("idGroup", login.getIdgrp());
        list = dal.JsonDataProcedureParam("b_rebriqueAddUp", param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> rebriqueById(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from b_rebrique where idRebrique=" + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static Boolean deleteRebrique(int id)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from b_rebrique where idRebrique=" + id);
        dal.Disconnect();
        return true;
    }
    /***************************** CategorieWoo ***********************/
    [WebMethod]
    public static List<Dictionary<string, object>> listWoo()
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from b_CategorieWoo");
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> InsertUpdateWoo(List<Dictionary<string, object>> param)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        //param[0].Add("idUser", login.getIdUser());
        //param[0].Add("idGroup", login.getIdgrp());
        list = dal.JsonDataProcedureParam("b_WooAdUp", param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> wooById(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from b_CategorieWoo where idWoo=" + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static Boolean deleteWoo(int id)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from b_CategorieWoo where idWoo=" + id);
        dal.Disconnect();
        return true;
    }
}