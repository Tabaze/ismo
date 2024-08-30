using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for SessionPos
/// </summary>
public class SessionPos
{
    public SessionPos()
    {
        //
        // TODO: Add constructor logic here
        //
    }
    private string _cookiesName = "SessionPos";
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
            DataAccessLayer dal = new DataAccessLayer();
            dal.Connect();
            DataTable dt = dal.SelectData("select * from p_Pos where tokenPos='"
                + HttpContext.Current.Request.Cookies[_cookiesName]["tokenPos"] + "'");
            dal.Disconnect();
            if (dt.Rows.Count > 0)
            {
                HttpContext.Current.Response.Cookies[CookiesName]["tokenPos"] = dt.Rows[0]["tokenPos"].ToString();
                HttpContext.Current.Response.Cookies[CookiesName]["idPos"] = dt.Rows[0]["idPos"].ToString();
                HttpContext.Current.Response.Cookies[CookiesName]["namePos"] = dt.Rows[0]["namePos"].ToString();
                HttpContext.Current.Response.Cookies[CookiesName]["idgrp"] = dt.Rows[0]["idGroup"].ToString();
                HttpContext.Current.Response.Cookies[CookiesName].Expires = DateTime.Now.AddDays(365);
                return true;
            }
            else
            {
                //removeCooKies();
                return false;
            }
        }
        else
        {
            return false;
        }

        //return true;
    }
    public int getIdgrp()
    {
        int idgrp = Convert.ToInt32(HttpContext.Current.Request.Cookies[_cookiesName]["idgrp"]);
        return idgrp;
    }
    public int getIdPos()
    {
        int idgrp = Convert.ToInt32(HttpContext.Current.Request.Cookies[_cookiesName]["idPos"]);
        return idgrp;
    }
    public void removeCooKies()
    {
        HttpContext.Current.Response.Cookies[_cookiesName].Expires = DateTime.Now.AddDays(-1);
    }
}