using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Description résumée de P_Tables
/// </summary>
public class P_Tables
{
    private int id_Table;
    private int num_Chair;
    private string css_Table;
    private string name_Table;
    private int count_CommandeOrdre;
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

    public int Num_Chair
    {
        get
        {
            return num_Chair;
        }

        set
        {
            num_Chair = value;
        }
    }

    public string Css_Table
    {
        get
        {
            return css_Table;
        }

        set
        {
            css_Table = value;
        }
    }

    public string Name_Table
    {
        get
        {
            return name_Table;
        }

        set
        {
            name_Table = value;
        }
    }

    public int Count_CommandeOrdre
    {
        get
        {
            return count_CommandeOrdre;
        }

        set
        {
            count_CommandeOrdre = value;
        }
    }

    public P_Tables()
    {
        //
        // TODO: Add constructor logic here
        //
    }
}