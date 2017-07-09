using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Models
{
    public class InitModelView
    {
    }

    public class InitModelViewBanHang
    {
        public List<DM_KhuVuc> KhuVucs { get; set; }
        public List<DM_Ban> Bans { get; set; }
    }
}