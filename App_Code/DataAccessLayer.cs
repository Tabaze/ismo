using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;
using System.Threading;
using System.Threading.Tasks;
/// <summary>
/// Description résumée de DataAccessLayer
/// </summary>
public class DataAccessLayer
{
    static SqlConnection sqlCon;
    string connStr = ConfigurationManager.ConnectionStrings["TopMSConnectionString"].ConnectionString;
    public DataAccessLayer()
    {
        try
        {
            sqlCon = new SqlConnection(connStr);
        }
        catch
        { 
            sqlCon = new SqlConnection(connStr);
        }
    }
    public void SqlConnectionStringBuilder(String Stored, SqlParameter[] Param)
    {
        SqlConnectionStringBuilder connectionBuilder
        = new SqlConnectionStringBuilder(connStr)
        {
            ConnectTimeout = 4000,
            AsynchronousProcessing = true
        };

        SqlConnection conn = new SqlConnection(connectionBuilder.ConnectionString);
        SqlCommand SqlCmd = new SqlCommand(Stored, conn);
        SqlCmd.CommandType = CommandType.StoredProcedure;
        for (int i = 0; i < Param.Length; i++)
        {
            SqlCmd.Parameters.Add(Param[i]);
        }
        
            
                conn.Open();
        IAsyncResult result = SqlCmd.BeginExecuteNonQuery();
        while (!result.CompletedSynchronously)
        {
            System.Threading.Thread.Sleep(100);
        }
        //SqlCmd.EndExecuteNonQuery(result);
        //return  await SqlCmd.ExecuteScalarAsync();


    }
    public void Connect()
    {
        if (sqlCon.State != ConnectionState.Open)
        {
            sqlCon.Open();
        }
    }
    public void Disconnect()
    {
        if (sqlCon.State != ConnectionState.Closed)
        {
            sqlCon.Close();
        }
    }
    public DataTable SelectDataProcedure(String Stored, SqlParameter[] Param)
    {
        SqlCommand SqlCmd = new SqlCommand(Stored, sqlCon);
        SqlCmd.CommandType = CommandType.StoredProcedure;
        for (int i = 0; i < Param.Length; i++)
        {
            SqlCmd.Parameters.Add(Param[i]);
        }
        SqlCmd.CommandTimeout = 300;
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        DataTable Dt = new DataTable();
        SqlDa.Fill(Dt);
        return Dt;
    }
    public void ExecuteCommandProcedure(String Stored, SqlParameter[] Param)
    {
        SqlCommand SqlCmd = new SqlCommand(Stored, sqlCon);
        SqlCmd.CommandType = CommandType.StoredProcedure;
        for (int i = 0; i < Param.Length; i++)
        {
            SqlCmd.Parameters.Add(Param[i]);
        }
        SqlCmd.CommandTimeout = 300;
        SqlCmd.ExecuteNonQuery();
    }
    public DataTable SelectData(String Requete)
    {
        SqlCommand SqlCmd = new SqlCommand(Requete, sqlCon);

        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        DataTable Dt = new DataTable();
        SqlDa.Fill(Dt);
        return Dt;
    }
    public SqlDataReader SelectDatadr(String Requete)
    {
        SqlCommand SqlCmd = new SqlCommand(Requete, sqlCon);
        SqlDataReader reader = SqlCmd.ExecuteReader();
        return reader;
    }
    public int ExecuteCommandProcedureGetIdentity(String Stored, SqlParameter[] Param)
    {
        SqlCommand SqlCmd = new SqlCommand(Stored, sqlCon);
        SqlCmd.CommandType = CommandType.StoredProcedure;
        for (int i = 0; i < Param.Length; i++)
        {
            SqlCmd.Parameters.Add(Param[i]);
        }
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        DataTable Dt = new DataTable();
        SqlDa.Fill(Dt);
        if (Dt.Rows.Count > 0)
        {
            int identity = Convert.ToInt32(Dt.Rows[0][0].ToString());
            return identity;
        }
        else
        {
            return -1;
        }

    }
    public int ExecuteScalaint(String Requete)
    {
        SqlCommand SqlCmd = new SqlCommand(Requete, sqlCon);
        int reader = (int)SqlCmd.ExecuteScalar();
        return reader;
    }
    public string ExecuteScalastring(String Requete)
    {
        SqlCommand SqlCmd = new SqlCommand(Requete, sqlCon);
        string reader = (string)SqlCmd.ExecuteScalar();
        return reader;
    }
    public double ExecuteScaladouble(String Requete)
    {
        SqlCommand SqlCmd = new SqlCommand(Requete, sqlCon);
        double reader = (double)SqlCmd.ExecuteScalar();
        return reader;
    }
    public void ExecuteCommand(String Requete)
    {
        SqlCommand SqlCmd = new SqlCommand(Requete, sqlCon);
        
        SqlCmd.ExecuteNonQuery();
    }
    public List<Dictionary<string, object>> JsonDataFunction(String Stored, SqlParameter[] Param)
    {
        SqlCommand SqlCmd = new SqlCommand(Stored, sqlCon);
        SqlCmd.CommandType = CommandType.Text;
        for (int i = 0; i < Param.Length; i++)
        {
            SqlCmd.Parameters.Add(Param[i]);
        }
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        DataTable Dt = new DataTable();
        SqlDa.Fill(Dt);
        List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
        Dictionary<string, object> row = null;

        foreach (DataRow dr in Dt.Rows)
        {
            row = new Dictionary<string, object>();
            foreach (DataColumn col in Dt.Columns)
            {
                row.Add(col.ColumnName, dr[col]);
            }
            rows.Add(row);
        }

        return rows;
    }
    public List<Dictionary<string, object>> JsonDataProcedure(String Stored, SqlParameter[] Param)
    {
        SqlCommand SqlCmd = new SqlCommand(Stored, sqlCon);
        SqlCmd.CommandType = CommandType.StoredProcedure;
        for (int i = 0; i < Param.Length; i++)
        {
            SqlCmd.Parameters.Add(Param[i]);
        }
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        DataTable Dt = new DataTable();
        SqlDa.Fill(Dt);
        List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
        Dictionary<string, object> row = null;

        foreach (DataRow dr in Dt.Rows)
        {
            row = new Dictionary<string, object>();
            foreach (DataColumn col in Dt.Columns)
            {
                row.Add(col.ColumnName, dr[col]);
            }
            rows.Add(row);
        }

        return rows;
    }
    public List<Dictionary<string, object>> JsonData(String Requete)
    {
        SqlCommand SqlCmd = new SqlCommand(Requete, sqlCon);

        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        DataTable Dt = new DataTable();
        SqlDa.Fill(Dt);
        List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
        Dictionary<string, object> row = null;

        foreach (DataRow dr in Dt.Rows)
        {
            row = new Dictionary<string, object>();
            foreach (DataColumn col in Dt.Columns)
            {
                row.Add(col.ColumnName, dr[col]);
            }
            rows.Add(row);
        }

        return rows;
    }
    public List<Dictionary<string, object>> JsonDataProcedureParam(String Stored, List<Dictionary<string, object>> Param)
    {

        SqlCommand SqlCmd = new SqlCommand(Stored, sqlCon);
        SqlCmd.CommandType = CommandType.StoredProcedure;
        //List<SqlParameter> Param;
        List<SqlParameter> parameters = new List<SqlParameter>();

        Dictionary<string, object>.KeyCollection keys = Param[0].Keys;
        for (int i = 0; i < keys.Count; i++)
        {
            if (IsDateTime((Param[0][keys.ToArray<string>()[i]] ?? String.Empty).ToString()))
            {
                try
                {
                    DateTime d = Convert.ToDateTime(Param[0][keys.ToArray<string>()[i]]);
                    parameters.Add(new SqlParameter("@" + keys.ToArray<string>()[i], d));
                }
                catch (Exception e)
                {
                    parameters.Add(new SqlParameter("@" + keys.ToArray<string>()[i], Param[0][keys.ToArray<string>()[i]]));
                }
            }
            else
            {
                parameters.Add(new SqlParameter("@" + keys.ToArray<string>()[i], Param[0][keys.ToArray<string>()[i]]));
            }

        }
        for (int i = 0; i < parameters.Count; i++)
        {
            SqlCmd.Parameters.Add(parameters[i]);
        }
        SqlDataAdapter SqlDa = new SqlDataAdapter(SqlCmd);
        DataTable Dt = new DataTable();
        SqlDa.Fill(Dt);
        List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
        Dictionary<string, object> row = null;

        foreach (DataRow dr in Dt.Rows)
        {
            row = new Dictionary<string, object>();
            foreach (DataColumn col in Dt.Columns)
            {
                row.Add(col.ColumnName, dr[col]);
            }
            rows.Add(row);
        }

        return rows;
    }
    public bool IsDateTime(object text)
    {
        DateTime dateTime;
        bool isDateTime = false;
        double checkDouble;
        int checkInt;
        // Check for empty string.
        if (string.IsNullOrEmpty(text.ToString()) || Double.TryParse(text.ToString(), out checkDouble) || Int32.TryParse(text.ToString(), out checkInt) || text.ToString().IndexOf(".000Z")==-1)
        {
            return false;
        }
        try
        {
            Convert.ToDouble(text);
            return false;
        }
        catch (Exception e)
        {

        }

        isDateTime = DateTime.TryParse(text.ToString(), out dateTime);

        return isDateTime;
    }
}