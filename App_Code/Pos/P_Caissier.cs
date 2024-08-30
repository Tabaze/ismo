using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Description résumée de P_Caissier
/// </summary>
public class P_Caissier
{
    private int id_Caissier;
    private string name_Caissier;
    private Boolean caisser_Admin;

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

    public string Name_Caissier
    {
        get
        {
            return name_Caissier;
        }

        set
        {
            name_Caissier = value;
        }
    }


    public bool Caisser_Admin
    {
        get
        {
            return caisser_Admin;
        }

        set
        {
            caisser_Admin = value;
        }
    }

    public P_Caissier()
    {
        //
        // TODO: Add constructor logic here
        //
    }
}