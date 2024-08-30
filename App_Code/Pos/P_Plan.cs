using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Description résumée de P_Plan
/// </summary>
public class P_Plan
{
    private int id_Plan;
    private string plan_Name;

    public P_Plan()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public int Id_Plan
    {
        get
        {
            return id_Plan;
        }

        set
        {
            id_Plan = value;
        }
    }

    public string Plan_Name
    {
        get
        {
            return plan_Name;
        }

        set
        {
            plan_Name = value;
        }
    }
}