using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.Models;

namespace Web.Controllers
{
    public class BanHangController : Controller
    {
        // GET: BanHang
        public JsonResult Init()
        {
            using(CoffeeEntities db = new CoffeeEntities())
            {
                InitModelViewBanHang model = new InitModelViewBanHang();

                model.Bans = db.DM_Ban.OrderBy(p => p.idKhuVuc).ThenBy(p => p.ten).ToList();
                model.KhuVucs = db.DM_KhuVuc.ToList();


                return Json(model, JsonRequestBehavior.AllowGet);
            }
        }
    }
}