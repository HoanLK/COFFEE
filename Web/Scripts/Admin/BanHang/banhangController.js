admin.controller("banhangController", ['$scope', '$http', function ($scope, $http) {
    //---VAR---
    //Khu vực
    $scope.khuvucs = [];
    $scope.khuvuc = {};
    var apiKhuVuc = "/API/DM_KhuVucAPI/";
    //Bàn
    var allBans = [];
    $scope.bans = [];
    $scope.ban = {};
    var apiBan = "/API/DM_BanAPI";
    //Hóa đơn bán hàng
    $scope.hoadonBanHang = {};
    $scope.causeCancelHoaDonBanHang = {};
    var apiHoaDonBanHang = "/API/ORDER_HoaDonBanHangAPI";
    //Chi tiết hóa đơn bán hàng
    $scope.chitietHoaDonBanHangs = [];
    $scope.chitietHoaDonBanhang = {};
    var apiChiTietHoaDonBanHang = "/API/ORDER_ChiTietHoaDonBanHangAPI";
    //Chi tiết nhân viên hóa đơn bán hàng
    $scope.chitietNhanVienHoaDonBanHangs = [];
    $scope.chitietNhanVienHoaDonBanHang = {};
    var apiChiTietNhanVienHoaDonBanHang = "/API/ORDER_ChiTietNhanVienHoaDonBanHangAPI";
    //Thực đơn
    $scope.thucdons = [];
    $scope.thucdonTemplates = [];
    $scope.thucdon = {};
    var apiThucDon = "/API/DM_ThucDonAPI";
    //Nhóm thực đơn
    $scope.nhomThucDons = [];
    $scope.nhomThucDon = {};
    var apiNhomThucDon = "/API/DM_NhomThucDonAPI";
    //Users
    $scope.nhanvienPhucVus = [];
    $scope.nhanvienPhucVu = {};
    $scope.selectedNhanVienPhucVus = [];
    var apiNhanVienPhucVu = "/API/DM_NhanVienPhucVuAPI";
    //Đơn vị tính
    $scope.donvitinhs = [];
    $scope.donvitinh = {};
    var apiDonViTinh = "/API/DM_DonViTinhAPI";
    //Khách hàng
    $scope.khachhangs = [];
    $scope.khachhang = {};
    var apiKhachHang = "/API/DM_KhachHangAPI";
    //Bản in
    $scope.print = {};
    $scope.print.thucdons = [];
    $scope.print.nhanviens = [];


    //---POPUP---
    //Hóa đơn bán hàng
    $scope.modifyHoaDonBanHang = false;
    $scope.cancelHoaDonBanHang = false;
    $scope.createHoaDonBanHang = false;
    $scope.thanhtoanHoaDonBanHang = false;
    $scope.titlePopupModifyHoaDonBanHang = "Hóa đơn bàn " + $scope.ban.ten;
    $scope.popupModifyHoaDonBanHang = {
        width: "auto",
        height: "auto",
        maxHeight: "100vh",
        maxWidth: "100%",
        contentTemplate: "templateModifyHoaDonBanHang",
        showTitle: true,
        resizeEnabled: true,
        fullScreen: false,
        showCloseButton: false,
        bindingOptions: {
            title: "titlePopupModifyHoaDonBanHang",
            visible: "modifyHoaDonBanHang",
        }
    };
    $scope.popupCreateHoaDonBanHang = {
        width: "auto",
        height: "auto",
        contentTemplate: "templateCreateHoaDonBanHang",
        showTitle: true,
        resizeEnabled: true,
        fullScreen: false,
        title: "Mở bàn",
        bindingOptions: {
            visible: "createHoaDonBanHang",
        }
    };
    $scope.popupCancelHoaDonBanHang = {
        width: "auto",
        height: "auto",
        contentTemplate: "templateCancelHoaDonBanHang",
        showTitle: true,
        resizeEnabled: true,
        title: "Lý do hủy",
        bindingOptions: {
            visible: "cancelHoaDonBanHang",
        }
    };
    $scope.popupThanhToanHoaDonBanHang = {
        width: "auto",
        height: "auto",
        contentTemplate: "templateThanhToanHoaDonBanHang",
        showTitle: true,
        resizeEnabled: true,
        fullScreen: false,
        title: "Thanh toán",
        bindingOptions: {
            visible: "thanhtoanHoaDonBanHang",
        }
    };
    //Khách hàng
    $scope.modifyKhachHang = false;
    $scope.titlePopupModifyKhachHang = "Thêm khách hàng";
    $scope.popupModifyKhachHang = {
        width: "auto",
        height: "auto",
        contentTemplate: "templateModifyKhachHang",
        showTitle: true,
        resizeEnabled: true,
        bindingOptions: {
            title: "titlePopupModifyKhachHang",
            visible: "modifyKhachHang",
        }
    };

    //---CONTROL CONFIG---
    //Hóa đơn bán hàng
    $scope.controlHoaDonBanHang = {
        //TextBox
        nhanvien: {
            showClearButton: true,
            valueChangeEvent: "keyup",
            bindingOptions: {
                value: "hoadonBanHang.nhanvien"
            }
        },
        soKhach: {
            showClearButton: true,
            valueChangeEvent: "keyup",
            bindingOptions: {
                value: "hoadonBanHang.soKhach"
            }
        },
        tongThoiGian: {
            showClearButton: true,
            valueChangeEvent: "keyup",
            bindingOptions: {
                value: "hoadonBanHang.tongThoiGian"
            }
        },
        lydoHuy: {
            showClearButton: true,
            valueChangeEvent: "keyup",
            bindingOptions: {
                value: "hoadonBanHang.lydoHuy"
            }
        },
        //SelectBox
        khachhang: {
            displayExpr: "ten",
            valueExpr: "id",
            searchEnabled: true,
            noDataText: "Không có dữ liệu",
            placeholder: "Chọn ...",
            bindingOptions: {
                items: "khachhangs",
                value: "hoadonBanHang.idKhachHang"
            }
        },
        //DateBox
        thoigianVao: {
            type: "time",
            applyButtonText: "Xong",
            cancelButtonText: "Hủy",
            displayFormat: "HH:mm",
            bindingOptions: {
                value: "hoadonBanHang.thoigianVao"
            }
        },
        thoigianRa: {
            type: "time",
            applyButtonText: "Xong",
            cancelButtonText: "Hủy",
            displayFormat: "HH:mm",
            bindingOptions: {
                value: "hoadonBanHang.thoigianRa"
            }
        },
        //TextArea
        ghichu: {
            height: 40,
            valueChangeEvent: "keyup",
            bindingOptions: {
                value: "hoadonBanHang.ghichu"
            }
        },
        //Button
        addKhachHang: {
            icon: "plus",
            onClick: function (e) {
                $scope.AddKhachHang();
            }
        }
    }
    //Hủy hóa đơn bán hàng
    $scope.controlCancelHoaDonBanHang = {
        //TextBox
        lydo: {
            showClearButton: true,
            valueChangeEvent: "keyup",
            bindingOptions: {
                value: "hoadonBanHang.lydoHuy"
            }
        }
    }
    //Khách hàng
    $scope.controlKhachHang = {
        //TextBox
        ten: {
            showClearButton: true,
            valueChangeEvent: "keyup",
            bindingOptions: {
                value: "khachhang.ten"
            }
        },
        dienthoai: {
            showClearButton: true,
            valueChangeEvent: "keyup",
            bindingOptions: {
                value: "khachhang.dienthoai"
            }
        },
        diachi: {
            showClearButton: true,
            valueChangeEvent: "keyup",
            bindingOptions: {
                value: "khachhang.diachi"
            }
        },
        email: {
            showClearButton: true,
            valueChangeEvent: "keyup",
            bindingOptions: {
                value: "khachhang.email"
            }
        },
        masoThue: {
            showClearButton: true,
            valueChangeEvent: "keyup",
            bindingOptions: {
                value: "khachhang.masoThue"
            }
        }
    }

    //---LIST---
    //Khu vực
    $scope.listKhuVucs = {
        bindingOptions: {
            dataSource: 'khuvucs',
        },
        height: "100%",
        onItemClick: function (e) {
            $scope.khuvuc = angular.copy(e.itemData);
            GetBanByKhuVuc();
        },
        onItemContextMenu: function (e) {
            $scope.khuvuc = angular.copy(e.itemData);
        }
    };
    //Bàn
    $scope.tileViewBans = {
        width: '100%',
        height: '85vh',
        baseItemHeight: 115,
        baseItemWidth: 100,
        itemMargin: 10,
        direction: "vertical",
        bindingOptions: {
            items: "bans",
        },
        onItemClick: function (e) {
            //$scope.ban = angular.copy(e.itemData);
            ChooseBan(e.itemData);
        }
    };
    //Chi tiết hóa đơn bán hàng
    $scope.gridChiTietHoaDonBanHangs = {
        bindingOptions: {
            dataSource: 'chitietHoaDonBanHangs',
            'columns[0].lookup.dataSource': 'thucdonTemplates',
            'columns[1].lookup.dataSource': 'thucdonTemplates',
        },
        allowColumnResizing: true,
        columnAutoWidth: true,
        columnChooser: {
            emptyPanelText: "Kéo và thả cột muốn ẩn vào đây",
            enabled: false,
            mode: "select",
            title: "Lựa chọn cột"
        },
        columnFixing: {
            enabled: true,
            texts: {
                fix: "Cố định cột",
                leftPosition: "Bên trái",
                rightPosition: "Bên phải",
                unfix: "Hủy cố định"
            }
        },
        columns: [
            {//0
                caption: "Thực đơn",
                dataField: "idThucDon",
                lookup: {
                    displayExpr: 'ten',
                    valueExpr: 'id'
                },
                allowEditing: false
            },
            {//1
                caption: "ĐVT",
                dataField: "idThucDon",
                lookup: {
                    displayExpr: 'donvitinh',
                    valueExpr: 'id'
                },
                allowEditing: false
            },
            {//2
                alignment: "right",
                caption: "Đơn giá",
                dataField: "dongia",
                format: {
                    type: "fixedPoint",
                    precision: 0
                }
            },
            {//3
                alignment: "right",
                caption: "SL",
                dataField: "soluong",
                format: {
                    type: "fixedPoint",
                    precision: 0
                }
            },
            {//4
                alignment: "right",
                caption: "Thành tiền",
                dataField: "thanhtien",
                format: {
                    type: "fixedPoint",
                    precision: 0
                },
                allowEditing: false
            },
        ],
        editing: {
            mode: "cell",
            allowAdding: false,
            allowDeleting: true,
            allowUpdating: true,
            texts: {
                addRow: "Thêm",
                cancelAllChanges: "Không thay đổi",
                cancelRowChanges: "Hủy",
                confirmDeleteMessage: "Bạn có chắc chắn muốn xóa?",
                deleteRow: "Xóa",
                editRow: "Sửa",
                saveAllChanges: "Lưu thay đổi",
                saveRowChanges: "Lưu",
                undeleteRow: "Không xóa",
                validationCancelChanges: "Hủy thay đổi"
            }
        },
        export: {
            allowExportSelectedData: true,
            enabled: false,
            excelFilterEnabled: true,
            excelWrapTextEnabled: true,
            fileName: "Danh sách Thực đơn",
            texts: {
                exportAll: "Xuất toàn bộ Dữ liệu",
                exportSelectedRows: "Xuất dữ liệu đang chọn",
                exportTo: "Trích xuất"
            }
        },
        filterRow: {
            applyFilterText: "Áp dụng bộ lọc",
            betweenEndText: "Kết thúc",
            betweenStartText: "Bắt đầu",
            resetOperationText: "Thiết lập lại",
            showAllText: "(Tất cả)",
            visible: false
        },
        grouping: {
            contextMenuEnabled: false,
            expandMode: "rowClick",
            texts: {
                groupByThisColumn: "Nhóm theo Cột này",
                groupContinuedMessage: "Tiếp tục từ trang trước",
                groupContinuesMessage: "Tiếp tục trên các trang tiếp theo",
                ungroup: "Bỏ nhóm",
                ungroupAll: "Bỏ tất cả nhóm"
            }
        },
        groupPanel: {
            emptyPanelText: "Kéo một cột vào đây để nhóm theo cột đó",
            visible: false
        },
        headerFilter: {
            texts: {
                cancel: "Hủy",
                emptyValue: "(Trống)",
                ok: "Đồng ý"
            },
            visible: false
        },
        hoverStateEnabled: false,
        loadPanel: {
            enabled: true,
            text: "Đang tải ..."
        },
        noDataText: "Không có dữ liệu",
        pager: {
            infoText: "Trang {0} của {1}",
            showInfo: true,
            showNavigationButtons: true,
            showPageSizeSelector: true,
            visible: false
        },
        paging: {
            enabled: false,
            pageIndex: 0,
            pageSize: 50
        },
        remoteOperations: {
            grouping: false,
            summary: false
        },
        rowAlternationEnabled: false,
        scrolling: {
            preloadEnabled: true
        },
        searchPanel: {
            placeholder: "Tìm kiếm ..."
        },
        selection: {
            mode: "multiple",
            showCheckBoxesMode: "none"
        },
        showBorders: true,
        showRowLines: true,
        sorting: {
            ascendingText: "Sắp xếp Tăng dần",
            clearText: "Xóa Sắp xếp",
            descendingText: "Sắp xếp Giảm dần"
        },
        summary: {
            texts: {
                count: "{0}",
                sum: "{0}"
            },
            groupItems: [
                {
                    column: "id",
                    summaryType: "count"
                }
            ],
            totalItems: [
                {
                    column: "id",
                    summaryType: "count"
                }
            ]
        },
        wordWrapEnabled: false,
        //Event
        onRowInserted: function (e) {
            $scope.TinhTien();
        },
        onRowRemoved: function (e) {
            $scope.TinhTien();
        },
        onRowUpdated: function (e) {
            $scope.TinhTien();
        }
    };
    //Chi tiết nhân viên hóa đơn bán hàng
    $scope.gridChiTietNhanVienHoaDonBanHangs = {
        bindingOptions: {
            dataSource: 'chitietNhanVienHoaDonBanHangs',
            'columns[0].lookup.dataSource': 'nhanvienPhucVus',
        },
        allowColumnResizing: true,
        columnAutoWidth: true,
        columnChooser: {
            emptyPanelText: "Kéo và thả cột muốn ẩn vào đây",
            enabled: false,
            mode: "select",
            title: "Lựa chọn cột"
        },
        columnFixing: {
            enabled: true,
            texts: {
                fix: "Cố định cột",
                leftPosition: "Bên trái",
                rightPosition: "Bên phải",
                unfix: "Hủy cố định"
            }
        },
        columns: [
            {//0
                caption: "Nhân viên",
                dataField: "idNhanVienPhucVu",
                lookup: {
                    displayExpr: 'ten',
                    valueExpr: 'id'
                },
                allowEditing: false
            },
            {//1
                alignment: "right",
                caption: "ĐG",
                dataField: "dongia",
                format: {
                    type: "fixedPoint",
                    precision: 0
                }
            },
            {//2
                alignment: "right",
                caption: "T/G",
                dataField: "thoigian",
                format: {
                    type: "fixedPoint",
                    precision: 0
                }
            },
            {//3
                alignment: "right",
                caption: "Thành tiền",
                dataField: "thanhtien",
                format: {
                    type: "fixedPoint",
                    precision: 0
                },
                allowEditing: false
            },
        ],
        editing: {
            mode: "cell",
            allowAdding: false,
            allowDeleting: true,
            allowUpdating: true,
            texts: {
                addRow: "Thêm",
                cancelAllChanges: "Không thay đổi",
                cancelRowChanges: "Hủy",
                confirmDeleteMessage: "Bạn có chắc chắn muốn xóa?",
                deleteRow: "Xóa",
                editRow: "Sửa",
                saveAllChanges: "Lưu thay đổi",
                saveRowChanges: "Lưu",
                undeleteRow: "Không xóa",
                validationCancelChanges: "Hủy thay đổi"
            }
        },
        export: {
            allowExportSelectedData: true,
            enabled: false,
            excelFilterEnabled: true,
            excelWrapTextEnabled: true,
            fileName: "Danh sách Thực đơn",
            texts: {
                exportAll: "Xuất toàn bộ Dữ liệu",
                exportSelectedRows: "Xuất dữ liệu đang chọn",
                exportTo: "Trích xuất"
            }
        },
        filterRow: {
            applyFilterText: "Áp dụng bộ lọc",
            betweenEndText: "Kết thúc",
            betweenStartText: "Bắt đầu",
            resetOperationText: "Thiết lập lại",
            showAllText: "(Tất cả)",
            visible: false
        },
        grouping: {
            contextMenuEnabled: false,
            expandMode: "rowClick",
            texts: {
                groupByThisColumn: "Nhóm theo Cột này",
                groupContinuedMessage: "Tiếp tục từ trang trước",
                groupContinuesMessage: "Tiếp tục trên các trang tiếp theo",
                ungroup: "Bỏ nhóm",
                ungroupAll: "Bỏ tất cả nhóm"
            }
        },
        groupPanel: {
            emptyPanelText: "Kéo một cột vào đây để nhóm theo cột đó",
            visible: false
        },
        headerFilter: {
            texts: {
                cancel: "Hủy",
                emptyValue: "(Trống)",
                ok: "Đồng ý"
            },
            visible: false
        },
        hoverStateEnabled: false,
        loadPanel: {
            enabled: true,
            text: "Đang tải ..."
        },
        noDataText: "Không có dữ liệu",
        pager: {
            infoText: "Trang {0} của {1}",
            showInfo: true,
            showNavigationButtons: true,
            showPageSizeSelector: true,
            visible: false
        },
        paging: {
            enabled: false,
            pageIndex: 0,
            pageSize: 50
        },
        remoteOperations: {
            grouping: false,
            summary: false
        },
        rowAlternationEnabled: false,
        scrolling: {
            preloadEnabled: true
        },
        searchPanel: {
            placeholder: "Tìm kiếm ..."
        },
        selection: {
            mode: "multiple",
            showCheckBoxesMode: "none"
        },
        showBorders: true,
        showRowLines: true,
        sorting: {
            ascendingText: "Sắp xếp Tăng dần",
            clearText: "Xóa Sắp xếp",
            descendingText: "Sắp xếp Giảm dần"
        },
        summary: {
            texts: {
                count: "{0}",
                sum: "{0}"
            },
            groupItems: [
                {
                    column: "id",
                    summaryType: "count"
                }
            ],
            totalItems: [
                {
                    column: "id",
                    summaryType: "count"
                }
            ]
        },
        wordWrapEnabled: false,
        //Event
        onRowInserted: function (e) {
            $scope.TinhTien();
        },
        onRowRemoved: function (e) {
            $scope.TinhTien();
        },
        onRowUpdated: function (e) {
            $scope.TinhTien();
        }
    };
    //Thực đơn
    $scope.lookupThucDons = {
        bindingOptions: {
            items: "thucdons",
            value: "thucdon.id"
        },
        cancelButtonText: "Đóng",
        clearButtonText: "Xóa",
        displayExpr: "ten",
        nextButtonText: "Thêm",
        noDataText: "Không có dữ liệu",
        valueExpr: "id",
        title: "Chọn thực đơn",
        pageLoadingText: "Đang tải...",
        placeholder: "Chọn thực đơn",
        searchPlaceholder: "Tìm kiếm",
        onItemClick: function (e) {
            ChooseThucDon(e.itemData);
        },
        onClosed: function () {
            var lookup = $("#lookupThucDons").dxLookup("instance");
            lookup.reset();
        }
    };
    //Nhân viên phục vụ
    $scope.lookupNhanVienPhucVus = {
        bindingOptions: {
            items: "nhanvienPhucVus",
            value: "nhanvienPhucVu.id"
        },
        cancelButtonText: "Đóng",
        clearButtonText: "Xóa",
        displayExpr: "ten",
        nextButtonText: "Thêm",
        noDataText: "Không có dữ liệu",
        valueExpr: "id",
        title: "Chọn nhân viên",
        pageLoadingText: "Đang tải...",
        placeholder: "Chọn nhân viên",
        searchPlaceholder: "Tìm kiếm",
        onItemClick: function (e) {
            ChooseNhanVienPhucVu(e.itemData);
        },
        onClosed: function () {
            var lookup = $("#lookupNhanVienPhucVus").dxLookup("instance");
            lookup.reset();
        }
    };
    //Nhóm thực đơn
    $scope.lookupNhomThucDons = {
        displayExpr: "ten",
        valueExpr: "id",
        searchEnabled: false,
        noDataText: "Không có dữ liệu",
        placeholder: "Chọn nhóm",
        showClearButton: true,
        bindingOptions: {
            items: "nhomThucDons",
        },
        onSelectionChanged: function (e) {
            if (e.selectedItem == null) {
                $scope.thucdons = angular.copy($scope.thucdonTemplates);
            } else {
                $scope.thucdons = [];
                angular.forEach($scope.thucdonTemplates, function (value, index) {
                    if (value.idNhomThucDon == e.selectedItem.id) {
                        $scope.thucdons.push(value);
                    }
                });
            }
        }
    };

    //---CONTEXTMENU---

    Init();

    //---FUNCTION---
    function Init() {
        $http.get("/banhang/init")
            .then(function success(response) {
                //Lấy danh sách khu vực
                $scope.khuvucs = angular.copy(response.data.KhuVucs);

                //Lấy danh sách bàn
                allBans = angular.copy(response.data.Bans);
                $scope.bans = angular.copy(allBans);
            }, function error(response) {
                toastr.error("Không lấy được dữ liệu Khởi tạo");
            });
        GetAllKhachHang();
        GetAllDonViTinh();
        GetAllNhomThucDon();
        GetAllThucDon();
        GetAllNhanVienPhucVu();
    }

    //Khu vực

    //Bàn
    function GetBanByKhuVuc() {
        if ($scope.khuvuc.id == null) {
            $http.get(apiBan)
                .then(function (response) {
                    if (response.status == 200) {
                        $scope.bans = response.data;
                    }
                })
        } else {
            $http.get(apiBan + "?att=idKhuVuc&&value=" + $scope.khuvuc.id)
                .then(function (response) {
                    if (response.status == 200) {
                        $scope.bans = response.data;
                    }
                })
        }
    }
    $scope.GetAllBan = function () {
        $scope.khuvuc = {};
        GetBanByKhuVuc();
    }
    function ChooseBan(ban) {
        $scope.ban = angular.copy(ban);
        $scope.titlePopupModifyHoaDonBanHang = "Hóa đơn " + $scope.ban.ten;
        $scope.hoadonBanHang = {};
        $scope.chitietHoaDonBanhang = {};
        $scope.chitietHoaDonBanHangs = [];
        $scope.chitietNhanVienHoaDonBanHang = {};
        $scope.chitietNhanVienHoaDonBanHangs = [];

        //Bàn trống
        if (ban.trangthai == false) {
            $scope.createHoaDonBanHang = true;
        }
        //Bàn có người
        else {
            GetHoaDonBanHang();
            $scope.modifyHoaDonBanHang = true;
        }
    }
    
    //Khách hàng
    function GetAllKhachHang() {
        $http.get(apiKhachHang)
            .then(function (response) {
                if (response.status == 200) {
                    $scope.khachhangs = response.data;
                }
            })
    }
    $scope.AddKhachHang = function () {
        $scope.khachhang = {};
        $scope.titlePopupModifyKhachHang = "Thêm khách hàng";
        $scope.modifyKhachHang = true;
    }
    $scope.SaveKhachHang = function (e) {
        //Thêm
        if (!angular.isDefined($scope.khachhang.id)) {
            $http.post(apiKhachHang, $scope.khachhang)
                .then(function (response) {
                    if (response.status == 201) {
                        $scope.khachhangs.push(response.data);
                        toastr.success("Thành công", "Thêm");
                        $scope.modifyKhachHang = false;
                    } else {
                        toastr.error("Thất bại", "Thêm");
                    }
                });
        }
            //Sửa
        else {
            $http.put(apiKhachHang + "/" + $scope.khachhang.id, $scope.khachhang)
                .then(function (response) {
                    if (response.status == 204) {
                        angular.forEach($scope.khachhangs, function (value, index) {
                            if (value.id == $scope.khachhang.id) {
                                $scope.khachhangs[index] = angular.copy($scope.khachhang);
                                toastr.success("Thành công", "Sửa");
                                $scope.modifyKhachHang = false;
                            }
                        });
                    } else {
                        toastr.error("Thất bại", "Sửa");
                    }
                });
        }
    };
    $scope.CancelSaveKhachHang = function () {
        $scope.modifyKhachHang = false;
    }

    //Đơn vị tính
    function GetAllDonViTinh() {
        $http.get(apiDonViTinh)
            .then(function (response) {
                if (response.status == 200) {
                    $scope.donvitinhs = response.data;
                }
            })
    }

    //Thực đơn
    function GetAllThucDon() {
        $http.get(apiThucDon)
            .then(function (response) {
                if (response.status == 200) {
                    $scope.thucdons = angular.copy(response.data);
                    $scope.thucdonTemplates = angular.copy(response.data);
                }
            })
    }

    //Nhóm thực đơn
    function GetAllNhomThucDon() {
        $http.get(apiNhomThucDon)
            .then(function (response) {
                if (response.status == 200) {
                    $scope.nhomThucDons = response.data;
                }
            })
    }

    //Nhân viên phục vụ
    function GetAllNhanVienPhucVu() {
        $http.get(apiNhanVienPhucVu)
            .then(function (response) {
                if (response.status == 200) {
                    $scope.nhanvienPhucVus = response.data;
                }
            })
    }

    //HÓA ĐƠN BÁN HÀNG
    //Lấy thông tin hóa đơn
    function GetHoaDonBanHang() {
        //Lấy hóa đơn bàn đó 
        $http.get(apiHoaDonBanHang + "?att=idBan&&value=" + $scope.ban.id)
            .then(function (response) {
                if (response.status == 200) {
                    $scope.hoadonBanHang = response.data[response.data.length - 1];
                    //$scope.hoadonBanHang.thoigianVao = new Date($scope.hoadonBanHang.thoigianVao);
                    $scope.hoadonBanHang.thoigianRa = new Date();
                    //Lấy thông tin chi tiết
                    $http.get('/HoaDonBanHang/GetChiTiet/' + $scope.hoadonBanHang.id)
                        .then(function (response) {
                            if (response.status == 200) {
                                $scope.chitietHoaDonBanHangs = angular.copy(response.data.ChiTietThucDons);
                                $scope.chitietNhanVienHoaDonBanHangs = angular.copy(response.data.ChiTietNhanViens);
                                $scope.TinhTien();
                            };
                        })
                }
            });
    }
    //Tạo hóa đơn
    $scope.CreateHoaDonBanHang = function () {
        $scope.ban.trangthai = true;
        $http.put(apiBan + '/' + $scope.ban.id, $scope.ban)
            .then(function (response) {
                if (response.status == 204) {
                    GetBanByKhuVuc();
                    //Tạo và lưu hóa đơn
                    $scope.hoadonBanHang = {
                        idKhachHang: 1,
                        idBan: $scope.ban.id,
                        soKhach: 1,
                        thoigianVao: new Date(),
                        thoigianRa: new Date(),
                        tongThoiGian: 0,
                        dongiaPhong: 100000,
                        tienGio: 0,
                        isHuy: false,
                        tienDo: 0,
                        tienNhanVien: 0,
                        tongTien: 0,
                        giamTien: 0,
                        isThanhToan: false,
                        thanhtoan: 0,
                        thucthu: 0,
                        tienle: 0
                    };

                    $scope.hoadonBanHang.thoigianVao.setTime($scope.hoadonBanHang.thoigianVao.getTime() + 7 * 60 * 60 * 1000)

                    $http.post(apiHoaDonBanHang, $scope.hoadonBanHang)
                        .then(function (response) {
                            //$scope.hoadonBanHang = angular.copy(response.data);
                            //console.log($scope.hoadonBanHang.thoigianVao);
                            //$scope.modifyHoaDonBanHang = true;
                            //$scope.createHoaDonBanHang = false;

                            $http.get(apiHoaDonBanHang + "?att=idBan&&value=" + $scope.ban.id)
                                .then(function (response) {
                                    if (response.status == 200) {
                                        $scope.hoadonBanHang = response.data[response.data.length - 1];
                                        $scope.hoadonBanHang.thoigianRa = new Date();
                                        $scope.modifyHoaDonBanHang = true;
                                        $scope.createHoaDonBanHang = false;
                                    }
                                });
                        })
                }
            })
    }
    $scope.CancelCreateHoaDonBanHang = function () {
        $scope.createHoaDonBanHang = false;
    }
    
    //Lưu hóa đơn
    $scope.SaveHoaDonBanHang = function () {
        //Lưu thông tin hóa đơn
        $http.put(apiHoaDonBanHang + '/' + $scope.hoadonBanHang.id, $scope.hoadonBanHang)
            .then(function (response) {
                if (response.status == 204) {
                    //Xóa chi tiết
                    $http.get('/HoaDonBanHang/DeleteChiTiet/' + $scope.hoadonBanHang.id)
                        .then(function (response) {
                            if (response.status == 200 && response.data == 1) {
                                //Lưu chi tiết thực đơn
                                angular.forEach($scope.chitietHoaDonBanHangs, function (value, index) {
                                    $http.post(apiChiTietHoaDonBanHang, value)
                                        .then(function(response){});
                                });
                                //Lưu chi tiết nhân viên phục vụ
                                angular.forEach($scope.chitietNhanVienHoaDonBanHangs, function (value, index) {
                                    $http.post(apiChiTietNhanVienHoaDonBanHang, value)
                                        .then(function (response) { });
                                });
                                toastr.success("Thành công", "Lưu");
                            }
                            else {
                                toastr.error("Thất bại", "Lưu");
                            }
                        });
                }
            })
    }
    $scope.SaveAndCloseHoaDonBanHang = function () {
        $scope.SaveHoaDonBanHang();
        $scope.modifyHoaDonBanHang = false;
    }

    //Thanh toán
    $scope.ThanhToan = function () {
        $scope.thanhtoanHoaDonBanHang = true;
    }
    $scope.ConfirmThanhToanHoaDonBanHang = function () {
        $scope.hoadonBanHang.isThanhToan = true;
        $scope.SaveHoaDonBanHang();
        $http.put('/HoaDonBanHang/ThanhToan/' + $scope.hoadonBanHang.id)
            .then(function (response) {
                if (response.status == 200 && response.data == 1) {
                    GetBanByKhuVuc();
                    $scope.modifyHoaDonBanHang = false;
                    $scope.thanhtoanHoaDonBanHang = false;
                    toastr.success("Thành công", "Thanh toán");
                }
                else {
                    toastr.error("Thất bại", "Thanh toán");
                }
            });
    }
    $scope.CancelThanhToanHoaDonBanHang = function () {
        $scope.thanhtoanHoaDonBanHang = false;
    }

    //Hủy
    $scope.CancelHoaDonBanHang = function () {
        $scope.cancelHoaDonBanHang = true;
    }
    $scope.ConfirmCancelHoaDonBanHang = function () {
        $http.get('/HoaDonBanHang/Cancel?id=' + $scope.hoadonBanHang.id)
            .then(function (response) {
                if (response.status == 200 && response.data == 1) {
                    $scope.hoadonBanHang.isHuy = true;
                    $scope.SaveAndCloseHoaDonBanHang();
                    GetBanByKhuVuc();
                    toastr.success("Thành công", "Hủy bàn");
                } else {
                    toastr.error("Thất bại", "Hủy bàn");
                }
            })

        $scope.cancelHoaDonBanHang = false;
    }
    $scope.CancelCancelHoaDonBanHang = function () {
        $scope.cancelHoaDonBanHang = false;
    }

    //Đóng
    $scope.CloseHoaDonBanHang = function () {
        $scope.modifyHoaDonBanHang = false;
    }

    //Chọn thực đơn
    function ChooseThucDon(thucdon) {
        var existed = false;
        angular.forEach($scope.chitietHoaDonBanHangs, function (value, index) {
            if (value.idThucDon == thucdon.id) {
                existed = true;
                toastr.warning("Đã tồn tại", "Thực đơn");
            }
        });

        if (existed == false) {
            var chitietHoaDonBanHang = {
                idThucDon: thucdon.id,
                idHoaDonBanHang: $scope.hoadonBanHang.id,
                soluong: 1,
                dongia: thucdon.dongia
            }
            $scope.chitietHoaDonBanHangs.push(chitietHoaDonBanHang);
        }

        $scope.TinhTien();
    }
    //Chọn nhân viên
    function ChooseNhanVienPhucVu(nhanvienPhucVu) {
        var existed = false;
        angular.forEach($scope.chitietNhanVienHoaDonBanHangs, function (value, index) {
            if (value.idNhanVienPhucVu == nhanvienPhucVu.id) {
                existed = true;
                toastr.warning("Đã tồn tại", "Nhân viên phục vụ");
            }
        });

        if (existed == false) {
            var chitietNhanVienHoaDonBanHang = {
                idNhanVienPhucVu: nhanvienPhucVu.id,
                idHoaDonBanHang: $scope.hoadonBanHang.id,
                thoigian: 60,
                dongia: nhanvienPhucVu.dongia
            }
            $scope.chitietNhanVienHoaDonBanHangs.push(chitietNhanVienHoaDonBanHang);
        }

        $scope.TinhTien();
    }
    //Tính tiền
    $scope.TinhTien = function () {
        var tienDo = 0;

        var tongTien = 0;

        var giamTien = $scope.hoadonBanHang.giamTien;

        //Tính tiền đồ
        angular.forEach($scope.chitietHoaDonBanHangs, function (value, index) {
            $scope.chitietHoaDonBanHangs[index].thanhtien = parseFloat(value.dongia) * parseFloat(value.soluong);
            tienDo = parseFloat(tienDo) + parseFloat($scope.chitietHoaDonBanHangs[index].thanhtien);
        });
        $scope.hoadonBanHang.tienDo = tienDo;

        tongTien = parseFloat(tienDo);

        $scope.hoadonBanHang.tongTien = tongTien;

        $scope.hoadonBanHang.thanhtoan = parseFloat(tongTien) - parseFloat(giamTien);

        $scope.CreatePrint();
    }
    //Tạo bản in
    $scope.CreatePrint = function () {
        $scope.print = {
            thucdons: [],
            nhanviens: []
        };
        //Thực đơn
        angular.forEach($scope.chitietHoaDonBanHangs, function (value, index) {
            angular.forEach($scope.thucdonTemplates, function (thucdon, indexThucDon) {
                if (value.idThucDon == thucdon.id) {
                    var chitietHoaDonBanHang = angular.copy(value);
                    chitietHoaDonBanHang.tenThucDon = thucdon.ten;
                    $scope.print.thucdons.push(chitietHoaDonBanHang);
                }
            });
        });
        //Nhân viên
        angular.forEach($scope.chitietNhanVienHoaDonBanHangs, function (value, index) {
            angular.forEach($scope.nhanvienPhucVus, function (nhanvien, indexNhanVien) {
                if (value.idNhanVienPhucVu == nhanvien.id) {
                    var chitietNhanVienHoaDonBanHang = angular.copy(value);
                    chitietNhanVienHoaDonBanHang.tenNhanVien = nhanvien.tenHoaDon;
                    $scope.print.nhanviens.push(chitietNhanVienHoaDonBanHang);
                }
            });
        });
    }

}]);