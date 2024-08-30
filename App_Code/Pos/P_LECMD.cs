using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Description résumée de P_LECMD
/// </summary>
public class P_LECMD:P_ECMD
{
    private int id_LECMD;
    private string ref_article;
    private string libele_Art;
    private double lgn_qtt;
    private double lgn_prix;
    private double lgn_mntttc;
    private double lgn_remise;
    private string note_LECMD;
    private Boolean commender;
    private int order_LECMD;

    public int Id_LECMD
    {
        get
        {
            return id_LECMD;
        }

        set
        {
            id_LECMD = value;
        }
    }

    public string Ref_article
    {
        get
        {
            return ref_article;
        }

        set
        {
            ref_article = value;
        }
    }

    public string Libele_Art
    {
        get
        {
            return libele_Art;
        }

        set
        {
            libele_Art = value;
        }
    }

    public double Lgn_qtt
    {
        get
        {
            return lgn_qtt;
        }

        set
        {
            lgn_qtt = value;
        }
    }

    public double Lgn_prix
    {
        get
        {
            return lgn_prix;
        }

        set
        {
            lgn_prix = value;
        }
    }

    public double Lgn_mntttc
    {
        get
        {
            return lgn_mntttc;
        }

        set
        {
            lgn_mntttc = value;
        }
    }

    public double Lgn_remise
    {
        get
        {
            return lgn_remise;
        }

        set
        {
            lgn_remise = value;
        }
    }

    public string Note_LECMD
    {
        get
        {
            return note_LECMD;
        }

        set
        {
            note_LECMD = value;
        }
    }

    public bool Commender
    {
        get
        {
            return commender;
        }

        set
        {
            commender = value;
        }
    }

    public int Order_LECMD
    {
        get
        {
            return order_LECMD;
        }

        set
        {
            order_LECMD = value;
        }
    }

    public P_LECMD()
    {
        //
        // TODO: Add constructor logic here
        //
    }
}