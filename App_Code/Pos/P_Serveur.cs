using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Description résumée de P_Serveur
/// </summary>
public class P_Serveur
{
    private int id_Serv;
    private string nom_Serv;
    public P_Serveur()
    {
        //
        // TODO: Add constructor logic here
        //
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

    public string Nom_Serv
    {
        get
        {
            return nom_Serv;
        }

        set
        {
            nom_Serv = value;
        }
    }
}