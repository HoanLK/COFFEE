//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Web.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class ORDER_ChiTietNhanVienHoaDonBanHang
    {
        public int id { get; set; }
        public int idNhanVienPhucVu { get; set; }
        public int idHoaDonBanHang { get; set; }
        public double dongia { get; set; }
        public Nullable<System.DateTime> thoigianVao { get; set; }
        public Nullable<System.DateTime> thoigianRa { get; set; }
        public double thoigian { get; set; }
        public double thanhtien { get; set; }
    }
}