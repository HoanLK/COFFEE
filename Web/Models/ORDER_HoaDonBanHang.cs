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
    
    public partial class ORDER_HoaDonBanHang
    {
        public int id { get; set; }
        public string nhanvien { get; set; }
        public Nullable<int> idKhachHang { get; set; }
        public Nullable<int> idDatBan { get; set; }
        public int idBan { get; set; }
        public int soKhach { get; set; }
        public Nullable<System.DateTime> thoigianVao { get; set; }
        public Nullable<System.DateTime> thoigianRa { get; set; }
        public Nullable<double> tongThoiGian { get; set; }
        public Nullable<double> dongiaPhong { get; set; }
        public Nullable<double> tienGio { get; set; }
        public bool isHuy { get; set; }
        public string lydoHuy { get; set; }
        public double tienDo { get; set; }
        public double tienNhanVien { get; set; }
        public double tongTien { get; set; }
        public double giamTien { get; set; }
        public double giamPhanTram { get; set; }
        public double vatTien { get; set; }
        public double vatPhanTram { get; set; }
        public bool isThanhToan { get; set; }
        public double thanhtoan { get; set; }
        public double thucthu { get; set; }
        public double tienle { get; set; }
        public double tienVon { get; set; }
        public string ghichu { get; set; }
    }
}
