using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class ModeleUsers : System.Web.UI.Page
{
    static SessionLogin login = new SessionLogin();
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!login.connectSession())
        {
            login.deconnexionSession();
        }
    }
    /***************************** Users ***********************/
    [WebMethod]
    public static List<Dictionary<string, object>> listUsers()
    {
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select idUser,nomUser,userName,typeAdmin from s_Users where idGroup=" + login.getIdgrp());
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> usersById(string id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select idUser,nomUser,userName,typeAdmin from s_Users where idUser='" + id+"'");
        dal.Disconnect();
        return list;
    }

    [WebMethod]
    public static object insertNewUser(string nomUser, string userName, string passwordUser, Boolean typeAdmin)
    {
        SessionLogin login = new SessionLogin();
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string StoredCheck = "s_UserCheck";
        SqlParameter[] parametersCheck ={
                    new SqlParameter("@emailUser",userName),
                    new SqlParameter("@userName",userName),
                                       };
        int check = dal.ExecuteCommandProcedureGetIdentity(StoredCheck, parametersCheck);
        if (check != 0)
        {
            dal.Disconnect();
            return false;
        }
        else
        {
            int idGroup = login.getIdgrp();
            string Stored = "s_UsersInsert";
            string idUser = Guid.NewGuid().ToString("N");
            SqlParameter[] parameters ={
                    new SqlParameter("@idUser",idUser),
                    new SqlParameter("@emailUser",userName),
                    new SqlParameter("@userName",userName),
                    new SqlParameter("@passwordUser",passwordUser),
                    new SqlParameter("@typeAdmin",typeAdmin),
                    new SqlParameter("@idGroup",idGroup),
                                       };
            dal.ExecuteCommandProcedure(Stored, parameters);
            dal.Disconnect();
            return true;
        }
    }
    [WebMethod]
    public static object insertUpdateUsers(List<Dictionary<string, object>> param)
    {

        //string idUser = login.getIdUser();
        int idGroup = login.getIdgrp();
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        if(param[0]["statment"].ToString() == "insert")
        {
            string idUser = Guid.NewGuid().ToString("N");
            param[0].Add("idUser", idUser);
            string StoredCheck = "s_UserCheck";
            SqlParameter[] parametersCheck ={
                    new SqlParameter("@emailUser",param[0]["userName"]),
                    new SqlParameter("@userName",param[0]["userName"]),
                                       };
            int check = dal.ExecuteCommandProcedureGetIdentity(StoredCheck, parametersCheck);
            if (check != 0)
            {
                dal.Disconnect();
                return false;
            }
        }     
        string Stored = "s_UserInsert";        
        param[0].Add("idGroup", idGroup);      
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;      
    }
    [WebMethod]
    public static Boolean deleteUsers(string id)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from s_Users where idUser='" + id + "'");
        dal.Disconnect();
        return true;
    }
    [WebMethod]
    public static object insertUpdateLiaisonUsers(List<Dictionary<string, object>> param)
    {
        string idUser = login.getIdUser();
        RolesUsers role = new RolesUsers();
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "s_LiaisonUsersInsertUpdate";
        param[0].Add("idUser", idUser);
        dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return true;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> liaisonUsersById(string id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from s_LiaisonUsers where idUser='" +id+ "'");
        dal.Disconnect();
        return list;
    }
    /***************************** Roles ***********************/
    [WebMethod]
    public static List<Dictionary<string, object>> listRoles()
    {
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from s_Roles where idGroup=" + login.getIdgrp());
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> rolesById(string id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from s_Roles where idRole='" + id + "'");
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static object insertUpdateRoles(List<Dictionary<string, object>> param)
    {
        //string idUser = login.getIdUser();
        int idGroup = login.getIdgrp();
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "s_RolesInsertUpdate";
        param[0].Add("idGroup", idGroup);
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static Boolean deleteRoles(string id)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from s_Roles where idRole=" + id );
        dal.Disconnect();
        return true;
    }

    [WebMethod]
    public static object UpdateAppSettings(List<Dictionary<string, object>> param)
    {
        int idGroup = login.getIdgrp();
        RolesUsers role = new RolesUsers();
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "s_SettingsUpdate";
        param[0].Add("idGroup", idGroup);
        dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return true;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> AppSettingsById()
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from s_Settings where idGroup=" + login.getIdgrp());
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static object UserRolesUpdate(List<Dictionary<string, object>> param)
    {
        int idGroup = login.getIdgrp();
        RolesUsers role = new RolesUsers();
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "s_UserRolesUpdate";
        dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return true;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> Menu()
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select m.*,(select COUNT(*) from s_MenuInstall where idMenu=m.idMenu and idUser = '"+login.getIdUser()+"') "+
            " as install from s_Menu m");
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> MenuByID(string id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select m.*,(select COUNT(*) from s_MenuInstall where idMenu=m.idMenu and idUser = '" + id + "') " +
            " as install from s_Menu m");
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static Boolean InstalUninstallerMenu(Boolean data_in,int idMenu,string idUser)
    {
        
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        if (data_in)
        {
            dal.ExecuteCommand("delete from s_MenuInstall where idUser='"+ idUser + "' and idMenu="+ idMenu);
        }
        else
        {
            dal.ExecuteCommand("insert into s_MenuInstall(idMenu,idGroup,idUser) values("+ idMenu + ","+login.getIdgrp()+",'"+idUser+"')");
        }
        
        dal.Disconnect();
        return true;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> MenuSub(string codeMenu)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select *,(select COUNT(*) from s_MenuSubInstall where idSubMenu=ms.idSubMenu and idUser='"+login.getIdUser()
                                                +"') as install from s_MenuSub ms where ms.codeMenu = '"+ codeMenu + "'");
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> SubMenuByID(string id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select ms.*,(select COUNT(*) from s_MenuSubInstall where idSubMenu=ms.idSubMenu and idUser='"+ id + "') as install,m.dataModel from s_MenuSub ms inner join s_Menu m on m.codeMenu=ms.codeMenu");
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static Boolean InstalUninstallerSubMenu(Boolean data_in, int idSubMenu, string idUser)
    {

        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        if (!data_in)
        {
            dal.ExecuteCommand("delete from s_MenuSubInstall where idUser='" + idUser + "' and idSubMenu=" + idSubMenu+ " and idGroup=" + login.getIdgrp());
        }
        else
        {
            dal.ExecuteCommand("insert into s_MenuSubInstall(idSubMenu,idGroup,idUser) values(" + idSubMenu + "," + login.getIdgrp() + ",'" + idUser + "')");
        }

        dal.Disconnect();
        return true;
    }
    /***************************** E-mails Settings ***********************/
    [WebMethod]
    public static object insertUpdateEmailsSettings(List<Dictionary<string, object>> param)
    {
        string idUser = login.getIdUser();
        int idGroup = login.getIdgrp();
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "s_EmailsSettingsInsertUpdate";
        param[0].Add("idUser", idUser);
        param[0].Add("idGroup", idGroup);
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> EmailsSettingsByID()
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from s_EmailsSettings where idGroup = " + login.getIdgrp() );
        dal.Disconnect();
        return list;
    }
   [WebMethod]
    public static List<Dictionary<string, object>> listEmailsSettings()
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "select * from s_EmailsSettingsSelect(@idGroup)";
        SqlParameter[] parameters ={
                    new SqlParameter("@idGroup",login.getIdgrp()),
                                       };
        list = dal.JsonDataFunction(Stored, parameters);
        dal.Disconnect();
        return list;
    }
    //Email
    [WebMethod]
    public static List<Dictionary<string, object>> emailParamList()
    {
        DataAccessLayer db = new DataAccessLayer();
        db.Connect();
        List<Dictionary<string, object>> list = db.JsonData("select * from email_param");
        db.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> emailParamById(int id)
    {
        DataAccessLayer db = new DataAccessLayer();
        db.Connect();
        List<Dictionary<string, object>> list = db.JsonData("select * from email_param where idParam = " + id);
        db.Disconnect();
        return list;
    }
    [WebMethod]
    public static object insertUpdateEmailParam(List<Dictionary<string, object>> param)
    {
        DataAccessLayer db = new DataAccessLayer();
        db.Connect();
        List<Dictionary<string, object>> list = db.JsonDataProcedureParam("email_paramAddUp", param);
        db.Disconnect();
        return list;
    }
}