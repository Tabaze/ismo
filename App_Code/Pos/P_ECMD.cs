using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Description résumée de P_ECMD
/// </summary>
public class P_ECMD
{
    private int id_Ecmd;
    private int id_Table;
    private int id_Session;
    private DateTime date_Ecmd;
    private Boolean cnceled;
    private DateTime date_Canceled;
    private Boolean session_Cloture;
    private Boolean closed;
    private double tt_net;
    private double tt_ttc;
    private double tt_ht;
    private double tt_tva;
    private double tt_remis;
    private int id_client;
    private string nom_Client;
    private int id_Serv;
    private int id_Caissier;
    private string code_typ;
    private string mrgl_Default;

    public int Id_Ecmd
    {
        get
        {
            return id_Ecmd;
        }

        set
        {
            id_Ecmd = value;
        }
    }

    public int Id_Table
    {
        get
        {
            return id_Table;
        }

        set
        {
            id_Table = value;
        }
    }

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

    public DateTime Date_Ecmd
    {
        get
        {
            return date_Ecmd;
        }

        set
        {
            date_Ecmd = value;
        }
    }

    public bool Cnceled
    {
        get
        {
            return cnceled;
        }

        set
        {
            cnceled = value;
        }
    }

    public DateTime Date_Canceled
    {
        get
        {
            return date_Canceled;
        }

        set
        {
            date_Canceled = value;
        }
    }

    public bool Session_Cloture
    {
        get
        {
            return session_Cloture;
        }

        set
        {
            session_Cloture = value;
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

    public double Tt_net
    {
        get
        {
            return tt_net;
        }

        set
        {
            tt_net = value;
        }
    }

    public double Tt_ttc
    {
        get
        {
            return tt_ttc;
        }

        set
        {
            tt_ttc = value;
        }
    }

    public double Tt_ht
    {
        get
        {
            return tt_ht;
        }

        set
        {
            tt_ht = value;
        }
    }

    public double Tt_tva
    {
        get
        {
            return tt_tva;
        }

        set
        {
            tt_tva = value;
        }
    }

    public double Tt_remis
    {
        get
        {
            return tt_remis;
        }

        set
        {
            tt_remis = value;
        }
    }

    public int Id_client
    {
        get
        {
            return id_client;
        }

        set
        {
            id_client = value;
        }
    }

    public string Nom_Client
    {
        get
        {
            return nom_Client;
        }

        set
        {
            nom_Client = value;
        }
    }

    public int Id_Serv
    {
        get
        {
            return id_Serv;
        }

        set
        {
            id_Serv = value;
        }
    }

    public int Id_Caissier
    {
        get
        {
            return id_Caissier;
        }

        set
        {
            id_Caissier = value;
        }
    }

    public string Code_typ
    {
        get
        {
            return code_typ;
        }

        set
        {
            code_typ = value;
        }
    }

    public string Mrgl_Default
    {
        get
        {
            return mrgl_Default;
        }

        set
        {
            mrgl_Default = value;
        }
    }

    public P_ECMD()
    {
        //
        // TODO: Add constructor logic here
        //
    }
}