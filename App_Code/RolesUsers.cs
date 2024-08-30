using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for RolesUsers
/// </summary>
public class RolesUsers
{
    private int _idRole=1;
    private string _nameRole= "DefaultRole";
    private Boolean _insertRole=true;
    private Boolean _updateRole = true;
    private Boolean _deleteRole = true;
    private Boolean _selectByUser = false;
    private Boolean _selectALL = false;
    private Boolean _selectDoc = false;
    private Boolean _imprimerRole = true;
    private Boolean _valider = true;
    public RolesUsers()
    {
        SessionLogin login = new SessionLogin();
        Boolean admin = login.getAdmin();
        if (!admin)
        {
            DataAccessLayer dal = new DataAccessLayer();
            dal.Connect();
            string idUser = login.getIdUser();
            string StoredCheck = "s_RoleSelect";
            SqlParameter[] parameters ={
                    new SqlParameter("@idUser",idUser),
                                       };
            DataTable data = dal.SelectDataProcedure(StoredCheck, parameters);
            dal.Disconnect();
            if (data.Rows.Count > 0)
            {
                IdRole = Convert.ToInt32(data.Rows[0]["idRole"].ToString());
                NameRole = data.Rows[0]["nameRole"].ToString();
                InsertRole = Convert.ToBoolean(data.Rows[0]["insertRole"].ToString());
                UpdateRole = Convert.ToBoolean(data.Rows[0]["updateRole"].ToString());
                DeleteRole = Convert.ToBoolean(data.Rows[0]["deleteRole"].ToString());
                SelectByUser = Convert.ToBoolean(data.Rows[0]["selectByUser"].ToString());
                SelectALL = Convert.ToBoolean(data.Rows[0]["selectALL"].ToString());
                SelectDoc = Convert.ToBoolean(data.Rows[0]["selectDoc"].ToString());
                ImprimerRole = Convert.ToBoolean(data.Rows[0]["imprimerRole"].ToString());
                Valider = Convert.ToBoolean(data.Rows[0]["valider"].ToString());
            }
        }
        
        
    }

    public int IdRole
    {
        get
        {
            return _idRole;
        }

        set
        {
            _idRole = value;
        }
    }

    public string NameRole
    {
        get
        {
            return _nameRole;
        }

        set
        {
            _nameRole = value;
        }
    }

    public bool InsertRole
    {
        get
        {
            return _insertRole;
        }

        set
        {
            _insertRole = value;
        }
    }

    public bool UpdateRole
    {
        get
        {
            return _updateRole;
        }

        set
        {
            _updateRole = value;
        }
    }

    public bool DeleteRole
    {
        get
        {
            return _deleteRole;
        }

        set
        {
            _deleteRole = value;
        }
    }

    public bool SelectByUser
    {
        get
        {
            return _selectByUser;
        }

        set
        {
            _selectByUser = value;
        }
    }

    public bool SelectALL
    {
        get
        {
            return _selectALL;
        }

        set
        {
            _selectALL = value;
        }
    }

    public bool SelectDoc
    {
        get
        {
            return _selectDoc;
        }

        set
        {
            _selectDoc = value;
        }
    }

    public bool ImprimerRole
    {
        get
        {
            return _imprimerRole;
        }

        set
        {
            _imprimerRole = value;
        }
    }

    public bool Valider
    {
        get
        {
            return _valider;
        }

        set
        {
            _valider = value;
        }
    }
}