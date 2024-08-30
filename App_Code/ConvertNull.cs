using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Description résumée de ConvertNull
/// </summary>
public class ConvertNull
{
    public ConvertNull()
    {
        //
        // TODO: Add constructor logic here
        //
    }
    public static int ToInt(string x)
    {
        if (x.Equals(null) || x.ToString() == null || x == null || x.ToString() == "null" || x == "")
        {
            return 0;
        }
        else
        {
            return Convert.ToInt32(x);
        }
    }
    public static double ToDouble(string x)
    {
        if (x.Equals(null) || x.ToString() == null || x == null || x.ToString() == "null" || x == "")
        {
            return 0;
        }
        else
        {
            return Convert.ToDouble(x);
        }
    }
    public static Boolean ToBoolean(string x)
    {
        if (x.Equals(null) || x.ToString() == null || x == null || x.ToString() == "null" || x == "")
        {
            return false;
        }
        else
        {
            return Convert.ToBoolean(x);
        }
    }
    public static string ToDate(string x)
    {        
        if (x.Equals(null) || x.ToString() == null || x == null || x.ToString() == "null" || x == "")
        {
            DateTime localDate = DateTime.Now;
            return localDate.ToString("MM/dd/yyyy");
           
        }
        else
        {
            DateTime d = Convert.ToDateTime(x);
           return d.ToString("MM/dd/yyyy");
         
        }
    }
    public static string strReplace(string x)
    {
        return x.Replace("'", "''");
    }
}