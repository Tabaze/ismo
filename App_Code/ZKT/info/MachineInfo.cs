using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for MachineInfo
/// </summary>
public class MachineInfo
{
    public int MachineNumber { get; set; }
    public int IndRegID { get; set; }
    public DateTime DateTimeRecord { get; set; }

    public DateTime DateOnlyRecord
    {
        get { return DateTime.Parse(DateTimeRecord.ToString("yyyy-MM-dd")); }
    }
    public DateTime TimeOnlyRecord
    {
        get { return DateTime.Parse(DateTimeRecord.ToString("hh:mm:ss tt")); }
    }

}