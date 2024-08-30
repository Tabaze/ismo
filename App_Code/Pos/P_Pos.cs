using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Description résumée de P_Pos
/// </summary>
public class P_Pos 
{
    private int id_pos;
    private string ip;
    private string name_pos;
    private int id_cai;
    private string nom_depot;
    private int clientDivers;
    private string pos_Titre;
    private string pos_sousTitre;
    private int id_dossier;
    private Boolean type_Plan;
    private string nom_client;
    private string p_msg;
    private Boolean checkEmail;
    private string emailSend;
    public int Id_pos
    {
        get
        {
            return id_pos;
        }

        set
        {
            id_pos = value;
        }
    }

    public string Ip
    {
        get
        {
            return ip;
        }

        set
        {
            ip = value;
        }
    }

    public string Name_pos
    {
        get
        {
            return name_pos;
        }

        set
        {
            name_pos = value;
        }
    }

    public int Id_cai
    {
        get
        {
            return id_cai;
        }

        set
        {
            id_cai = value;
        }
    }

    public string Nom_depot
    {
        get
        {
            return nom_depot;
        }

        set
        {
            nom_depot = value;
        }
    }

    public int ClientDivers
    {
        get
        {
            return clientDivers;
        }

        set
        {
            clientDivers = value;
        }
    }

    public string Pos_Titre
    {
        get
        {
            return pos_Titre;
        }

        set
        {
            pos_Titre = value;
        }
    }

    public string Pos_sousTitre
    {
        get
        {
            return pos_sousTitre;
        }

        set
        {
            pos_sousTitre = value;
        }
    }

    public int Id_dossier
    {
        get
        {
            return id_dossier;
        }

        set
        {
            id_dossier = value;
        }
    }

    public bool Type_Plan
    {
        get
        {
            return type_Plan;
        }

        set
        {
            type_Plan = value;
        }
    }

    public string Nom_client
    {
        get
        {
            return nom_client;
        }

        set
        {
            nom_client = value;
        }
    }

    public string P_msg
    {
        get
        {
            return p_msg;
        }

        set
        {
            p_msg = value;
        }
    }

    public bool CheckEmail
    {
        get
        {
            return checkEmail;
        }

        set
        {
            checkEmail = value;
        }
    }

    public string EmailSend
    {
        get
        {
            return emailSend;
        }

        set
        {
            emailSend = value;
        }
    }

    public P_Pos()
    {
        //
        // TODO: Add constructor logic here
        //
    }
}
