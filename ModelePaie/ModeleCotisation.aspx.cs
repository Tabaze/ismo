using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class ModelePaie_ModeleCotisation : System.Web.UI.Page
{
    static SessionLogin login = new SessionLogin();
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!login.connectSession())
        {
            login.deconnexionSession();
        }
    }
    /***************************** Variables ***********************/
    [WebMethod]
    public static List<Dictionary<string, object>> listVariable()
    {
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "select * from Paie_C_VariablesSelect(@idUser,@SelectALL,@idGroup)";
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
    public static List<Dictionary<string, object>> VariableById(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from Paie_C_Variables where idVariable=" + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> insertUpdateVariable(List<Dictionary<string, object>> param)
    {
        string idUser = login.getIdUser();
        int idGroup = login.getIdgrp();
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "Paie_C_VariablesInsertUpdate";
        param[0].Add("idUser", idUser);
        param[0].Add("idGroup", idGroup);
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static Boolean deleteVariable(int id)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from Paie_C_Variables where idVariable=" + id);
        dal.Disconnect();
        return true;
    }
    /***************************** Cotisations ***********************/
    [WebMethod]
    public static List<Dictionary<string, object>> listCotisation()
    {
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "select * from Paie_C_CotisationsSelect(@idUser,@SelectALL,@idGroup)";
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
    public static List<Dictionary<string, object>> CotisationById(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from Paie_C_Cotisations where idCotisation=" + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> insertUpdateCotisation(List<Dictionary<string, object>> param)
    {
        string idUser = login.getIdUser();
        int idGroup = login.getIdgrp();
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "Paie_C_CotisationsInsertUpdate";
        param[0].Add("idUser", idUser);
        param[0].Add("idGroup", idGroup);
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static Boolean deleteCotisation(int id)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from Paie_C_Cotisations where idCotisation=" + id);
        dal.Disconnect();
        return true;
    }
    /***************************** Tranches ************************/

    /***************************** Rubriques ***********************/
    [WebMethod]
    public static List<Dictionary<string, object>> listRubrique()
    {
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "select * from Paie_C_RubriquessSelect(@idUser,@SelectALL,@idGroup)";
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
    public static List<Dictionary<string, object>> RubriqueById(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from Paie_C_Rubriques where idRubrique=" + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> insertUpdateRubrique(List<Dictionary<string, object>> param)
    {
        string idUser = login.getIdUser();
        int idGroup = login.getIdgrp();
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "Paie_C_RubriquesInsertUpdate";
        param[0].Add("idUser", idUser);
        param[0].Add("idGroup", idGroup);
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static Boolean deleteRubrique(int id)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from Paie_C_Rubriques where idRubrique=" + id);
        dal.Disconnect();
        return true;
    }
}