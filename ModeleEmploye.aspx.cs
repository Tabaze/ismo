using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class ModeleEmploye : System.Web.UI.Page
{
    static SessionLogin login = new SessionLogin();
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!login.connectSession())
        {
            login.deconnexionSession();
        }
    }
    /***************************** Département ***********************/
    [WebMethod]
    public static List<Dictionary<string, object>> listDepartement()
    {
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "select * from d_DepartementSelect(@idUser,@SelectALL,@idGroup)";
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
    public static List<Dictionary<string, object>> DepartementById(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from d_Departement where idDepartement=" + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> insertUpdateDepartement(List<Dictionary<string, object>> param)
    {
        string idUser = login.getIdUser();
        int idGroup = login.getIdgrp();
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "d_DepartementInsertUpdate";
        param[0].Add("idUser", idUser);
        param[0].Add("idGroup", idGroup);
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static Boolean deleteDepartement(int id)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from d_Departement where idDepartement=" + id);
        dal.Disconnect();
        return true;
    }
    /***************************** Employée ***********************/
    [WebMethod]
    public static List<Dictionary<string, object>> listEmployee()
    {
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "select * from e_EmployeSelect(@idUser,@SelectALL,@idGroup)";
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
    public static List<Dictionary<string, object>> EmployeeById(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from e_Employe where idEmploye=" + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> insertUpdateEmployee(List<Dictionary<string, object>> param)
    {
        string idUser = login.getIdUser();
        int idGroup = login.getIdgrp();
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "e_EmployeInsertUpdate";
        param[0].Add("idUser", idUser);
        param[0].Add("idGroup", idGroup);
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static Boolean deleteEmployee(int id)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from e_Employe where idEmploye=" + id);
        dal.Disconnect();
        return true;
    }
}