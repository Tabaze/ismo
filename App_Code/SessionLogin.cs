using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for SessionLogin
/// </summary>
public class SessionLogin
{
    public SessionLogin()
    {
        //
        // TODO: Add constructor logic here
        //
    }
    //public string _cookiesName = "loginled";
    private string _cookiesName = "loginlll";
    public string CookiesName
    {
        get
        {
            return _cookiesName;
        }
    }
    public Boolean connectSession()
    {
        if (HttpContext.Current.Request.Cookies[_cookiesName] != null)
        {
            if (HttpContext.Current.Request.Cookies[_cookiesName]["logged"] == "yes")
            {
                DataAccessLayer dal = new DataAccessLayer();
                dal.Connect();
                DataTable dt = dal.SelectData("select * from s_Users where idUser='"
                    + HttpContext.Current.Request.Cookies[_cookiesName]["id"]+"'");
                dal.Disconnect();
                if (dt.Rows.Count > 0)
                {
                    string tokenLogin = dt.Rows[0]["tokenLogin"].ToString();
                    string tokenCookies = HttpContext.Current.Request.Cookies[_cookiesName]["token"];
                    Boolean typeAdmin = Convert.ToBoolean(dt.Rows[0]["typeAdmin"].ToString());
                    Boolean typeAdminCookies = getAdmin();
                    if (tokenCookies == tokenLogin && typeAdmin== typeAdminCookies)
                    {
                        return true;
                    }
                    else
                    {
                        removeCooKies();
                        return false;
                    }
                }
                else
                {
                    removeCooKies();
                    return false;
                }
            }
            else
            {
                removeCooKies();
                return false;
            }
        }
        else
        {
            removeCooKies();
            return false;

        }

    }
    public void deconnexionSession()
    {
        removeCooKies();
        HttpContext.Current.Response.Redirect("Default.aspx");

    }
    public void removeCooKies()
    {
        HttpContext.Current.Response.Cookies[_cookiesName]["logged"] = null;
        HttpContext.Current.Response.Cookies[_cookiesName]["nomUser"] = null;
        HttpContext.Current.Response.Cookies[_cookiesName]["typeAdmin"] = null;
        HttpContext.Current.Response.Cookies[_cookiesName]["userName"] = null;
        HttpContext.Current.Response.Cookies[_cookiesName]["id"] = null;
        HttpContext.Current.Response.Cookies[_cookiesName]["idgrp"] = null;
        HttpContext.Current.Response.Cookies[_cookiesName]["photo"] = null;
        HttpContext.Current.Response.Cookies[_cookiesName]["token"] = null;
        HttpContext.Current.Response.Cookies[_cookiesName].Expires = DateTime.Now.AddDays(-1);
    }
    public string getIdUser()
    {
        string idUser = HttpContext.Current.Request.Cookies[_cookiesName]["id"].ToString();
        return idUser;
    }
    public int getIdgrp()
    {
        int idgrp = Convert.ToInt32(HttpContext.Current.Request.Cookies[_cookiesName]["idgrp"]);
        return idgrp;
    }
    public Boolean getAdmin()
    {
        Boolean typeAdmin = Convert.ToBoolean(HttpContext.Current.Request.Cookies[_cookiesName]["typeAdmin"]);
        return typeAdmin;
    }
}