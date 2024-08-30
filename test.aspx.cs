using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Net.NetworkInformation;
using System.Runtime.InteropServices;
using System.Text;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class test : System.Web.UI.Page
{
    private void RaiseDeviceEvent(object sender, string actionType)
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
    protected void Page_Load(object sender, EventArgs e)
    {
        DeviceManipulator manipulator = new DeviceManipulator();
         ZkemClient objZkeeper;
         bool isDeviceConnected = false;

        //form1.InnerHtml = GetClientMAC(GetIPAddress());
        try
        {
            string ipAddress = "192.168.100.90".Trim();
            string port = "4370".Trim();
            if (ipAddress == string.Empty || port == string.Empty)
                throw new Exception("The Device IP Address and Port is mandotory !!");

            int portNumber = 4370;
            if (!int.TryParse(port, out portNumber))
                throw new Exception("Not a valid port number");

            bool isValidIpA = UniversalStatic.ValidateIP(ipAddress);
            if (!isValidIpA)
                throw new Exception("The Device IP is invalid !!");

            isValidIpA = UniversalStatic.PingTheDevice(ipAddress);
            if (!isValidIpA)
                throw new Exception("The device at " + ipAddress + ":" + port + " did not respond!!");

            objZkeeper = new ZkemClient(RaiseDeviceEvent);
            isDeviceConnected = objZkeeper.Connect_Net(ipAddress, portNumber);

            if (isDeviceConnected)
            {
                //string deviceInfo = manipulator.FetchDeviceInfo(objZkeeper, int.Parse(tbxMachineNumber.Text.Trim()));
                //lblDeviceInfo.Text = deviceInfo;

                ICollection<UserInfo> lstFingerPrintTemplates = manipulator.GetAllUserInfo(objZkeeper, int.Parse("1"));
                if (lstFingerPrintTemplates != null && lstFingerPrintTemplates.Count > 0)
                {
                    //BindToGridView(lstFingerPrintTemplates);
                    //ShowStatusBar(lstFingerPrintTemplates.Count + " records found !!", true);
                }
            }

        }
        catch (Exception ex)
        {
            ///ShowStatusBar(ex.Message, false);
        }
        //this.Cursor = Cursors.Default;

    }
    public string GetIPAddress()
    {
        System.Web.HttpContext context = System.Web.HttpContext.Current;
        string ipAddress = context.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];

        if (!string.IsNullOrEmpty(ipAddress))
        {
            string[] addresses = ipAddress.Split(',');
            if (addresses.Length != 0)
            {
                return addresses[0];
            }
        }

        return context.Request.ServerVariables["REMOTE_ADDR"];
    }
    [DllImport("Iphlpapi.dll")]
    private static extern int SendARP(Int32 dest, Int32 host, ref Int64 mac, ref Int32 length);
    [DllImport("Ws2_32.dll")]
    private static extern Int32 inet_addr(string ip);

    private static string GetClientMAC(string strClientIP)
    {
        string mac_dest = "";
        try
        {
            Int32 ldest = inet_addr(strClientIP);
            Int32 lhost = inet_addr("");
            Int64 macinfo = new Int64();
            Int32 len = 6;
            int res = SendARP(ldest, 0, ref macinfo, ref len);
            string mac_src = macinfo.ToString("X");

            while (mac_src.Length < 12)
            {
                mac_src = mac_src.Insert(0, "0");
            }

            for (int i = 0; i < 11; i++)
            {
                if (0 == (i % 2))
                {
                    if (i == 10)
                    {
                        mac_dest = mac_dest.Insert(0, mac_src.Substring(i, 2));
                    }
                    else
                    {
                        mac_dest = "-" + mac_dest.Insert(0, mac_src.Substring(i, 2));
                    }
                }
            }
        }
        catch (Exception err)
        {
            throw new Exception("L?i " + err.Message);
        }
        return mac_dest;
    }
    [WebMethod]
    public static List<Dictionary<string, object>> article(int Id_dossier,int PageSize,int Page,string text_search,string statment)
    {
        List<Dictionary<string, object>> list;
        DataAccessLayer dal = new DataAccessLayer();
        dal.Connect();
        string Stored = "f_list_f_article";
        SqlParameter[] parameters ={
                new SqlParameter("@PageSize",PageSize),
                new SqlParameter("@Page",Page),
                new SqlParameter("@text_search",text_search),
                new SqlParameter("@Id_dossier",Id_dossier),
                new SqlParameter("@statment",statment),
                                   };
        list = dal.JsonDataProcedure(Stored, parameters);
        dal.Disconnect();
        return list;
    }
    protected void btnBackup_Click(object sender, EventArgs e)
    {
        //IF SQL Server Authentication then Connection String  
        //con.ConnectionString = @"Server=MyPC\SqlServer2k8;database=" + YourDBName + ";uid=sa;pwd=password;";  

        //IF Window Authentication then Connection String  
        //con.ConnectionString = @"Server=MyPC\SqlServer2k8;database=Test;Integrated Security=true;";
        DataAccessLayer dal = new DataAccessLayer();
        string backupDIR = "H:\\BackupDB";
        if (!System.IO.Directory.Exists(backupDIR))
        {
            System.IO.Directory.CreateDirectory(backupDIR);
        }
        try
        {
            dal.Connect();
            dal.ExecuteCommand("backup database test to disk='" + backupDIR + "\\" + DateTime.Now.ToString("ddMMyyyy_HHmmss") + ".Bak'");
            ///sqlcmd = new SqlCommand("backup database test to disk='" + backupDIR + "\\" + DateTime.Now.ToString("ddMMyyyy_HHmmss") + ".Bak'", con);
            //sqlcmd.ExecuteNonQuery();
            dal.Disconnect();
            lblError.Text = "Backup database successfully";
        }
        catch (Exception ex)
        {
            lblError.Text = "Error Occured During DB backup process !<br>" + ex.ToString();
        }
    }
    [WebMethod]
    public static List<int> bigData()
    {
        List<int> l = new List<int>();
        for(int i = 0; i < 10000000; i++)
        {
            l.Add(i);
        }
        return l;
    }
    public  void bak()
    {
        //var sb = new StringBuilder();

        //var server = new Microsoft.SqlServer.Server(@"ServerName");
        //var databse = server.Databases["DatabaseName"];

        //var scripter = new Scripter(server);
        //scripter.Options.ScriptDrops = false;
        //scripter.Options.WithDependencies = true;
        //scripter.Options.IncludeHeaders = true;
        ////And so on ....


        //var smoObjects = new Urn[1];
        //foreach (Table t in databse.Tables)
        //{
        //    smoObjects[0] = t.Urn;
        //    if (t.IsSystemObject == false)
        //    {
        //        StringCollection sc = scripter.Script(smoObjects);

        //        foreach (var st in sc)
        //        {
        //            sb.Append(st);
        //        }
        //    }
        //}
        //return sb.ToString();


    }
}