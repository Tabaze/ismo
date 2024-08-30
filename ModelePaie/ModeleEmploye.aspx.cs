using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class ModelePaie_ModeleEmploye : System.Web.UI.Page
{
    static SessionLogin login = new SessionLogin();
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!login.connectSession())
        {
            login.deconnexionSession();
        }
    }
    /***************************** Employés ***********************/
    [WebMethod]
    public static List<Dictionary<string, object>> listEmploye()
    {
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "select * from Paie_E_EmployeSelect(@idUser,@SelectALL,@idGroup)";
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
    public static List<Dictionary<string, object>> EmployeById(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from Paie_E_Employe where idEmploye=" + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> insertUpdateEmploye(List<Dictionary<string, object>> param)
    {
        string idUser = login.getIdUser();
        int idGroup = login.getIdgrp();
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "Paie_E_EmployeInsertUpdate";
        param[0].Add("idUser", idUser);
        param[0].Add("idGroup", idGroup);
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static Boolean deleteEmploye(int id)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from Paie_E_Employe where idEmploye=" + id);
        dal.Disconnect();
        return true;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> insertCotisationEmploye(List<Dictionary<string, object>> param)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "Paie_E_CotisationsEmployeInsert";
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
     [WebMethod]
    public static List<Dictionary<string, object>> listEmployeCotis(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from Paie_C_Cotisations where idEmploye=" + id);
        dal.Disconnect();
        return list;
    }
       [WebMethod]
    public static List<Dictionary<string, object>> listUsersDevices()
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from Paie_Z_tableUserDevice where idGroup="+login.getIdgrp());
        dal.Disconnect();
        return list;
    }
     /***************************** Contrat ***********************/
    [WebMethod]
    public static List<Dictionary<string, object>> listContrat()
    {
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "select * from Paie_E_ContratSelect(@idUser,@SelectALL,@idGroup)";
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
    public static List<Dictionary<string, object>> ContratById(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from Paie_E_tableContrat where idContrat=" + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> insertUpdateContrat(List<Dictionary<string, object>> param)
    {
        string idUser = login.getIdUser();
        int idGroup = login.getIdgrp();
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "Paie_E_ContratInsertUpdate";
        param[0].Add("idUser", idUser);
        param[0].Add("idGroup", idGroup);
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static Boolean deleteContrat(int id)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from Paie_E_Contrat where idContrat=" + id);
        dal.Disconnect();
        return true;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> listFilleInContrat(int id)
    {
        string idUser = login.getIdUser();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from Paie_E_FilleInContrat r inner join s_Fille f on r.idFille=f.idFille where idContrat=" + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> insertFilleInContrat(int id, int idFille)
    {
        string idUser = login.getIdUser();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("insert into Paie_E_FilleInContrat(idFille,idContrat) values(" + idFille + "," + id + ")");
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static bool deleteFilleInContrat(int id, int idFille)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from Paie_E_FilleInContrat where idContrat=" + id + " and idFille=" + idFille);
        dal.ExecuteCommand("delete from s_Fille where idFille=" + idFille);
        dal.Disconnect();
        return true;
    }
     /***************************** Congés ***********************/
    [WebMethod]
    public static List<Dictionary<string, object>> listConge()
    {
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "select * from Paie_E_CongesSelect(@idUser,@SelectALL,@idGroup)";
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
    public static List<Dictionary<string, object>> CongeById(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from Paie_E_tableConges where idConge=" + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> insertUpdateConge(List<Dictionary<string, object>> param)
    {
        string idUser = login.getIdUser();
        int idGroup = login.getIdgrp();
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "Paie_E_CongesInsertUpdate";
        param[0].Add("idUser", idUser);
        param[0].Add("idGroup", idGroup);
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static Boolean deleteConge(int id)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from Paie_E_Conges where idConge=" + id);
        dal.Disconnect();
        return true;
    }
     /***************************** Prets ***********************/
    [WebMethod]
    public static List<Dictionary<string, object>> listPret()
    {
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "select * from Paie_E_PretsSelect(@idUser,@SelectALL,@idGroup)";
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
    public static List<Dictionary<string, object>> PretById(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from Paie_E_tablePrets where idPret=" + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> insertUpdatePret(List<Dictionary<string, object>> param)
    {
        string idUser = login.getIdUser();
        int idGroup = login.getIdgrp();
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "Paie_E_PretsInsertUpdate";
        param[0].Add("idUser", idUser);
        param[0].Add("idGroup", idGroup);
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static Boolean deletePret(int id)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from Paie_E_Prets where idPret=" + id);
        dal.Disconnect();
        return true;
    }
}