using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class ModelePaie_ModelePointage : System.Web.UI.Page
{
    static SessionLogin login = new SessionLogin();
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!login.connectSession())
        {
            login.deconnexionSession();
        }
    }
    /***************************** Device ZKT ***********************/
    [WebMethod]
    public static List<Dictionary<string, object>> listDevices()
    {
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "select * from Paie_Z_ZKTDevicesSelect(@idUser,@SelectALL,@idGroup)";
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
    public static List<Dictionary<string, object>> DeviceById(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from Paie_Z_ZKTDevices where idDevice=" + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> insertUpdateDevice(List<Dictionary<string, object>> param)
    {
        string idUser = login.getIdUser();
        int idGroup = login.getIdgrp();
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "Paie_Z_ZKTDevicesInsertUpdate";
        param[0].Add("idUser", idUser);
        param[0].Add("idGroup", idGroup);
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static Boolean deleteDevice(int id)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from Paie_Z_ZKTDevices where idDevice=" + id);
        dal.Disconnect();
        return true;
    }
    [WebMethod]
    public static Boolean testConnect(string ip,int port,int MachineNumber)
    {

        DeviceManipulator manipulator = new DeviceManipulator();
        ZkemClient objZkeeper;
        bool isDeviceConnected = false;
        try
        {
            string ipAddress = ip.Trim();
            if (ipAddress == string.Empty)
                throw new Exception("The Device IP Address and Port is mandotory !!");

            bool isValidIpA = UniversalStatic.ValidateIP(ipAddress);
            if (!isValidIpA)
                throw new Exception("The Device IP is invalid !!");

            isValidIpA = UniversalStatic.PingTheDevice(ipAddress);
            if (!isValidIpA)
                throw new Exception("The device at " + ipAddress + ":" + port + " did not respond!!");

            objZkeeper = new ZkemClient(RaiseDeviceEvent);
            isDeviceConnected = objZkeeper.Connect_Net(ipAddress, port);

            if (isDeviceConnected)
            {
                return true;
                //string deviceInfo = manipulator.FetchDeviceInfo(objZkeeper, int.Parse(tbxMachineNumber.Text.Trim()));
                //lblDeviceInfo.Text = deviceInfo;

                //ICollection<UserInfo> lstFingerPrintTemplates = manipulator.GetAllUserInfo(objZkeeper, int.Parse("1"));
                //if (lstFingerPrintTemplates != null && lstFingerPrintTemplates.Count > 0)
                //{
                //    //BindToGridView(lstFingerPrintTemplates);
                //    //ShowStatusBar(lstFingerPrintTemplates.Count + " records found !!", true);
                //}
            }
            else{
                return false;
            }
        }
        catch (Exception ex)
        {
           return false; ///ShowStatusBar(ex.Message, false);
        }
        //this.Cursor = Cursors.Default;
        // return true;
    }
    private static void RaiseDeviceEvent(object sender, string actionType)
    {
        switch (actionType)
        {
            case UniversalStatic.acx_Disconnect:
                {
                    break;
                }

            default:
                break;
        }

    }
    /***************************** User Device ***********************/
    [WebMethod]
    public static object getUsers(string ip, int port, int MachineNumber,int idDevice)
    {

        DeviceManipulator manipulator = new DeviceManipulator();
        ZkemClient objZkeeper;
        bool isDeviceConnected = false;
        try
        {
            string ipAddress = ip.Trim();
            objZkeeper = new ZkemClient(RaiseDeviceEvent);
            isDeviceConnected = objZkeeper.Connect_Net(ipAddress, port);

            if (isDeviceConnected)
            {

                ICollection<UserInfo> allUSer = manipulator.GetAllUserInfo(objZkeeper, MachineNumber);
                if (allUSer != null && allUSer.Count > 0)
                {
                    foreach(UserInfo u in allUSer)
                    {
                        insertUpdateUserDevice(u.EnrollNumber, u.Name, u.Password, idDevice);
                    }
                }
                return "good";
            }
            else
            {
                return "not good";
            }
        }
        catch (Exception ex)
        {
            return ex.Message;
        }
    }
    [WebMethod]
    public static List<Dictionary<string, object>> insertUpdateUserDevice(string enrolNumber,string name,string passwordU,int idDevice)
    {
        string idUser = login.getIdUser();
        int idGroup = login.getIdgrp();
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "Paie_Z_UserDeviceInsertUpdate";
        //param[0].Add("idUser", idUser);
        //param[0].Add("idGroup", idGroup);
       
        SqlParameter[] parameters ={
                new SqlParameter("@enrolNumber",enrolNumber),
                new SqlParameter("@name",name),
                new SqlParameter("@passwordU",passwordU),
                new SqlParameter("@idDevice",idDevice),
                new SqlParameter("@idUser",idUser),
                new SqlParameter("@idGroup",idGroup),
        };
        list = dal.JsonDataProcedure(Stored, parameters);
        dal.Disconnect();
        return list;
    }
    /***************************** Log Data ***********************/
    [WebMethod]
    public static List<Dictionary<string, object>> insertUpdateLogData(int enrolNumber, DateTime dateTimeRecord,int idDevice)
    {
        string idUser = login.getIdUser();
        int idGroup = login.getIdgrp();
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string timeRecord = dateTimeRecord.ToLongTimeString();
        string uniqueId = dateTimeRecord.ToString("yyyyMMddHHmm");
        string Stored = "Paie_Z_LogDataInsertUpdate";
        SqlParameter[] parameters ={
                new SqlParameter("@enrolNumber",enrolNumber),
                new SqlParameter("@dateTimeRecord",dateTimeRecord),
                new SqlParameter("@timeRecord",timeRecord),
                new SqlParameter("@uniqueId",uniqueId),
                new SqlParameter("@idDevice",idDevice),
                new SqlParameter("@idUser",idUser),
                new SqlParameter("@idGroup",idGroup),
        };
        list = dal.JsonDataProcedure(Stored, parameters);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static Boolean logDataImport(string ip, int port, int MachineNumber, int idDevice)
    {
        DeviceManipulator manipulator = new DeviceManipulator();
        ZkemClient objZkeeper;
        bool isDeviceConnected = false;
        try
        {
            string ipAddress = ip.Trim();
            objZkeeper = new ZkemClient(RaiseDeviceEvent);
            isDeviceConnected = objZkeeper.Connect_Net(ipAddress, port);

            if (isDeviceConnected)
            {

                ICollection<MachineInfo> lstMachineInfo = manipulator.GetLogData(objZkeeper, MachineNumber);
                if (lstMachineInfo != null && lstMachineInfo.Count > 0)
                {
                    foreach (MachineInfo u in lstMachineInfo)
                    {
                        insertUpdateLogData(u.IndRegID, u.DateTimeRecord, idDevice);
                    }
                }
                return true;
            }
            else
            {
                return false;
            }
        }
        catch (Exception ex)
        {
            return false;
        }
    }
    /**************************** Pointage ************************************/
    [WebMethod]
    public static List<Dictionary<string, object>> listPointagePlanning(List<Dictionary<string, object>> param)
    {
        string idUser = login.getIdUser();
        int idGroup = login.getIdgrp();
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "Paie_Z_LogDataSelect";      
        param[0].Add("idUser", idUser);
        param[0].Add("SelectALL", role.SelectALL);
        param[0].Add("idGroup", idGroup);
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> listPointageMachine(List<Dictionary<string, object>> param)
    {
        string idUser = login.getIdUser();
        int idGroup = login.getIdgrp();
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "Paie_Z_PointageSelect";      
        param[0].Add("idUser", idUser);
        param[0].Add("SelectALL", role.SelectALL);
        param[0].Add("idGroup", idGroup);
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> listPointageMachineAbsents(List<Dictionary<string, object>> param)
    {
        string idUser = login.getIdUser();
        int idGroup = login.getIdgrp();
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "Paie_Z_PointageSelectAbsents";      
        param[0].Add("idGroup", idGroup);
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> insertPointage(List<Dictionary<string, object>> param)
    {
        string idUser = login.getIdUser();
        int idGroup = login.getIdgrp();
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "Paie_Z_LogDataInsertUpdate";
        param[0].Add("idUser", idUser);
        param[0].Add("idGroup", idGroup);
        param[0].Add("statement", "insertManuel");
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> PointageById(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from Paie_Z_tablePointage where idLogData=" + id);
        dal.Disconnect();
        return list;
    }
      [WebMethod]
    public static Boolean deletePointage(int id)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from Paie_Z_LogData where idLogData=" + id);
        dal.Disconnect();
        return true;
    }
    /******************************** Planning *********************************/
     [WebMethod]
    public static List<Dictionary<string, object>> listPlanning()
    {
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "select * from Paie_Z_PlanningSelect(@idUser,@SelectALL,@idGroup)";
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
    public static List<Dictionary<string, object>> PlanningById(int id)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        list = dal.JsonData("select * from Paie_Z_Planning where idPlanning=" + id);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> insertUpdatePlanning(List<Dictionary<string, object>> param)
    {
        string idUser = login.getIdUser();
        int idGroup = login.getIdgrp();
        RolesUsers role = new RolesUsers();
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "Paie_Z_PlanningInsertUpdate";
        param[0].Add("idUser", idUser);
        param[0].Add("idGroup", idGroup);
        list = dal.JsonDataProcedureParam(Stored, param);
        dal.Disconnect();
        return list;
    }
    [WebMethod]
    public static Boolean deletePlanning(int id)
    {
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        dal.ExecuteCommand("delete from Paie_Z_Planning where idPlanning=" + id);
        dal.Disconnect();
        return true;
    }
}