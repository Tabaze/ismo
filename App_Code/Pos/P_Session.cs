using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Description résumée de P_Session
/// </summary>
public class P_Session
{
    private int id_Session;
    private Boolean closed;
    private Double total_Ca;

    public int Id_Session
    {
        get
        {
            return id_Session;
        }

        set
        {
            id_Session = value;
        }
    }

    public bool Closed
    {
        get
        {
            return closed;
        }

        set
        {
            closed = value;
        }
    }

    public double Total_Ca
    {
        get
        {
            return total_Ca;
        }

        set
        {
            total_Ca = value;
        }
    }

    public P_Session()
    {
        //
        // TODO: Add constructor logic here
        //
    }
}