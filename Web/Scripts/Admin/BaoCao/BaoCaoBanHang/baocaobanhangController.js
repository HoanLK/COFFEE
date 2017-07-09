admin.controller("baocaobanhangController", ['$scope', '$http', function ($scope, $http) {
    //---VAR---
    //Hóa đơn bán hàng
    $scope.hoadonBanHangs = [];
    $scope.hoadonBanHang = {};
    $scope.selectedHoaDonBanHangs = [];
    $scope.filterHoaDonBanHang = {};
    var apiHoaDonBanHang = "/API/ORDER_HoaDonBanHangAPI";
    //Chi tiết hóa đơn bán hàng
    $scope.chitietHoaDonBanHangs = [];
    $scope.chitietHoaDonBanhang = {};
    var apiChiTietHoaDonBanHang = "/API/ORDER_ChiTietHoaDonBanHangAPI";
    //Khu vực
    $scope.khuvucs = [];
    $scope.khuvuc = {};
    var apiKhuVuc = "/API/DM_KhuVucAPI/";
    //Bàn
    $scope.bans = [];
    $scope.ban = {};
    var apiBan = "/API/DM_BanAPI";
    //Chi tiết nhân viên hóa đơn bán hàng
    $scope.chitietNhanVienHoaDonBanHangs = [];
    $scope.chitietNhanVienHoaDonBanHang = {};
    var apiChiTietNhanVienHoaDonBanHang = "/API/ORDER_ChiTietNhanVienHoaDonBanHangAPI";
    //Thực đơn
    $scope.thucdons = [];
    $scope.thucdon = {};
    var apiThucDon = "/API/DM_ThucDonAPI";
    //Nhân viên phục vụ
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
    $scope.reviewHoaDonBanHang = false;
    $scope.titlePopupReviewHoaDonBanHang = "Hóa đơn mã " + $scope.hoadonBanHang.id;
    $scope.popupReviewHoaDonBanHang = {
        width: "auto",
        height: "auto",
        contentTemplate: "templateReviewHoaDonBanHang",
        showTitle: true,
        resizeEnabled: true,
        fullScreen: true,
        showCloseButton: true,
        bindingOptions: {
            title: "titlePopupReviewHoaDonBanHang",
            visible: "reviewHoaDonBanHang",
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
            },
            readOnly: true
        },
        soKhach: {
            showClearButton: true,
            valueChangeEvent: "keyup",
            bindingOptions: {
                value: "hoadonBanHang.soKhach"
            },
            readOnly: true
        },
        tongThoiGian: {
            showClearButton: true,
            valueChangeEvent: "keyup",
            bindingOptions: {
                value: "hoadonBanHang.tongThoiGian"
            },
            readOnly: true
        },
        lydoHuy: {
            showClearButton: true,
            valueChangeEvent: "keyup",
            bindingOptions: {
                value: "hoadonBanHang.lydoHuy"
            },
            readOnly: true
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
            },
            readOnly: true
        },
        //DateBox
        thoigianVao: {
            type: "time",
            applyButtonText: "Xong",
            cancelButtonText: "Hủy",
            displayFormat: "HH:mm",
            bindingOptions: {
                value: "hoadonBanHang.thoigianVao"
            },
            readOnly: true
        },
        thoigianRa: {
            type: "time",
            applyButtonText: "Xong",
            cancelButtonText: "Hủy",
            displayFormat: "HH:mm",
            bindingOptions: {
                value: "hoadonBanHang.thoigianRa"
            },
            readOnly: true
        },
        //TextArea
        ghichu: {
            height: 40,
            valueChangeEvent: "keyup",
            bindingOptions: {
                value: "hoadonBanHang.ghichu"
            },
            readOnly: true
        },
        //Button
        //addKhachHang: {
        //    icon: "plus",
        //    onClick: function (e) {
        //        $scope.AddKhachHang();
        //    }
        //}
    }

    //---LIST---
    //Hóa đơn bán hàng
    $scope.gridHoaDonBanHangs = {
        bindingOptions: {
            dataSource: 'hoadonBanHangs',
            'columns[4].lookup.dataSource': 'khachhangs',
            'columns[5].lookup.dataSource': 'bans',
        },
        allowColumnResizing: true,
        columnAutoWidth: true,
        columnChooser: {
            emptyPanelText: "Kéo và thả cột muốn ẩn vào đây",
            enabled: true,
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
                alignment: "center",
                allowEditing: false,
                caption: "STT",
                dataField: "$id",
                width: 70,
                visible: false
            },
            {//1
                alignment: "center",
                allowEditing: false,
                caption: "ID",
                dataField: "id",
            },
            {//2
                alignment: "left",
                caption: "Thời gian",
                dataField: "thoigianVao",
                dataType: "date",
                format: "dd/MM/yyyy",
                customizeText: function (cellInfo) {
                    return cellInfo.valueText;
                }
            },
            {//3
                alignment: "center",
                allowEditing: false,
                caption: "Nhân viên",
                dataField: "nhanvien"
            },
            {//4
                alignment: "center",
                caption: "Khách hàng",
                dataField: "idKhachHang",
                lookup: {
                    displayExpr: 'ten',
                    valueExpr: 'id'
                },
                visible: true
            },
            {//5
                alignment: "center",
                caption: "Bàn/Phòng",
                dataField: "idBan",
                lookup: {
                    displayExpr: 'ten',
                    valueExpr: 'id'
                }
            },
            {//6
                alignment: "right",
                caption: "Tiền đồ",
                dataField: "tienDo",
                allowEditing: false,
                format: {
                    type: "fixedPoint",
                    precision: 0
                },
                visible: true
            },
            {//7
                alignment: "right",
                caption: "Tiền giờ",
                dataField: "tienGio",
                allowEditing: false,
                format: {
                    type: "fixedPoint",
                    precision: 0
                },
                visible: true
            },
            {//8
                alignment: "right",
                caption: "Dịch vụ",
                dataField: "tienNhanVien",
                allowEditing: false,
                format: {
                    type: "fixedPoint",
                    precision: 0
                }
            },
            {//9
                alignment: "right",
                caption: "Tổng tiền",
                dataField: "tongTien",
                allowEditing: false,
                format: {
                    type: "fixedPoint",
                    precision: 0
                }
            },
            {//10
                alignment: "right",
                caption: "Giảm",
                dataField: "giamTien",
                allowEditing: false,
                format: {
                    type: "fixedPoint",
                    precision: 0
                }
            },
            {//11
                alignment: "right",
                caption: "Thanh toán",
                dataField: "thanhtoan",
                allowEditing: false,
                format: {
                    type: "fixedPoint",
                    precision: 0
                }
            },
            {//12
                alignment: "right",
                caption: "Tiền lẻ",
                dataField: "tienle",
                allowEditing: false,
                format: {
                    type: "fixedPoint",
                    precision: 0
                }
            },
            {//13
                alignment: "right",
                caption: "Thực thu",
                dataField: "thucthu",
                allowEditing: false,
                format: {
                    type: "fixedPoint",
                    precision: 0
                }
            },
            {//14
                alignment: "right",
                caption: "Tiền vốn",
                dataField: "tienVon",
                allowEditing: false,
                format: {
                    type: "fixedPoint",
                    precision: 0
                }
            },
            {//15
                alignment: "left",
                caption: "Ghi chú",
                dataField: "ghichu",
                dataType: "string",
                visible: false
            }
        ],
        editing: {
            mode: "cell",
            allowAdding: false,
            allowDeleting: false,
            allowUpdating: false,
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
            enabled: true,
            excelFilterEnabled: true,
            excelWrapTextEnabled: true,
            fileName: "Báo cáo bán hàng",
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
            visible: true
        },
        grouping: {
            contextMenuEnabled: true,
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
            visible: true
        },
        hoverStateEnabled: true,
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
            visible: true
        },
        paging: {
            enabled: true,
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
            showCheckBoxesMode: "onClick"
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
                },
            ],
            totalItems: [
                {
                    column: "id",
                    summaryType: "count"
                },
                {
                    column: "tienDo",
                    summaryType: "sum",
                    valueFormat: 'fixedPoint'
                },
                {
                    column: "tienGio",
                    summaryType: "sum",
                    valueFormat: 'fixedPoint'
                },
                {
                    column: "tienNhanVien",
                    summaryType: "sum",
                    valueFormat: 'fixedPoint'
                },
                {
                    column: "tongTien",
                    summaryType: "sum",
                    valueFormat: 'fixedPoint'
                },
                {
                    column: "giamTien",
                    summaryType: "sum",
                    valueFormat: 'fixedPoint'
                },
                {
                    column: "thanhtoan",
                    summaryType: "sum",
                    valueFormat: 'fixedPoint'
                },
                {
                    column: "tienle",
                    summaryType: "sum",
                    valueFormat: 'fixedPoint'
                },
                {
                    column: "thucthu",
                    summaryType: "sum",
                    valueFormat: 'fixedPoint'
                },
                {
                    column: "tienVon",
                    summaryType: "sum",
                    valueFormat: 'fixedPoint'
                },
            ]
        },
        wordWrapEnabled: false,
        //METHOD
        //Toolbar
        onToolbarPreparing: function (e) {
            var dataGrid = e.component;

            e.toolbarOptions.items.unshift(
                {//Từ ngày
                    location: "before",
                    widget: "dxDateBox",
                    options: {
                        bindingOptions: {
                            value: "filterHoaDonBanHang.tuNgay"
                        },
                        type: "date",
                        displayFormat: "dd/MM/yyyy",
                        hint: "Từ ngày",
                        placeholder: "Từ ngày",
                        max: new Date()
                    }
                },
                {//Đến ngày
                    location: "before",
                    widget: "dxDateBox",
                    options: {
                        bindingOptions: {
                            value: "filterHoaDonBanHang.denNgay",
                            min: "filterHoaDonBanHang.tuNgay"
                        },
                        type: "date",
                        displayFormat: "dd/MM/yyyy",
                        hint: "Đến ngày",
                        placeholder: "Đến ngày",
                        max: new Date()
                    }
                },
                {//Lọc
                    location: "before",
                    widget: "dxButton",
                    options: {
                        hint: "Lọc",
                        icon: "search",
                        type: "primary",
                        onClick: function () {
                            FilterHoaDonBanHang();
                        }
                    }
                },
                //{//Thêm
                //    location: "after",
                //    widget: "dxButton",
                //    options: {
                //        hint: "Thêm",
                //        icon: "add",
                //        type: "success",
                //        onClick: function () {
                //            $scope.AddNhapHang();
                //        }
                //    }
                //},
                //{//Review
                //    location: "after",
                //    widget: "dxButton",
                //    options: {
                //        hint: "Xem",
                //        icon: "search",
                //        type: "default",
                //        onClick: function () {
                //            $scope.ReviewHoaDonBanHang();
                //        }
                //    }
                //},
                //{//Xóa
                //    location: "after",
                //    widget: "dxButton",
                //    options: {
                //        hint: "Xóa",
                //        icon: "trash",
                //        type: "danger",
                //        onClick: function () {
                //            $scope.DeleteHoaDonBanHang();
                //        }
                //    }
                //},
                {//Load lại
                    location: "after",
                    widget: "dxButton",
                    options: {
                        hint: "Load lại Dữ liệu",
                        icon: "refresh",
                        onClick: function () {
                            FilterHoaDonBanHang();
                        }
                    }
                }
           )
        },
        //DoubleClick Row
        onRowClick: function (e) {
            var component = e.component;

            if (!component.clickCount)
                component.clickCount = 1;
            else
                component.clickCount = component.clickCount + 1;

            if (component.clickCount == 1) {
                component.lastClickTime = new Date();
                setTimeout(function () { component.lastClickTime = 0; component.clickCount = 0; }, 350);
            }
            else if (component.clickCount == 2) {
                if (((new Date()) - component.lastClickTime) < 300) {
                    $scope.hoadonBanHang = angular.copy(e.data);
                    $scope.ReviewHoaDonBanHang();
                }

                // Reset your click info
                component.clickCount = 0;
                component.lastClickTime = 0;
            }
        },
        //Select Row
        onSelectionChanged: function (e) {
            $scope.selectedHoaDonBanHangs = angular.copy(e.selectedRowsData);
        }
    };

    //Chi tiết hóa đơn bán hàng
    $scope.gridChiTietHoaDonBanHangs = {
        bindingOptions: {
            dataSource: 'chitietHoaDonBanHangs',
            'columns[0].lookup.dataSource': 'thucdons',
            'columns[1].lookup.dataSource': 'thucdons',
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
            allowDeleting: false,
            allowUpdating: false,
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
            allowDeleting: false,
            allowUpdating: false,
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

    //---CONTEXTMENU---


    Init();

    //---FUNCTION---
    function Init() {
        GetHoaDonBanHangThisMonth();
        GetAllKhuVuc();
        GetBanByKhuVuc();
        GetAllKhachHang();
        GetAllDonViTinh();
        GetAllThucDon();
        GetAllNhanVienPhucVu();
    }

    //Khu vực
    function GetAllKhuVuc() {
        $http.get(apiKhuVuc)
            .then(function (response) {
                if (response.status == 200) {
                    $scope.khuvucs = response.data;
                }
            })
    }

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
        $scope.titlePopupModifyHoaDonBanHang = "Hóa đơn bàn " + $scope.ban.ten;
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
                    $scope.thucdons = response.data;
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
    function GetHoaDonBanHangThisMonth() {
        var now = new Date();
        $scope.filterHoaDonBanHang.denNgay = now;
        $scope.filterHoaDonBanHang.tuNgay = new Date(now.getFullYear(), now.getMonth(), 1);
        FilterHoaDonBanHang();
    }
    function FilterHoaDonBanHang() {
        if ($scope.filterHoaDonBanHang.tuNgay == null || $scope.filterHoaDonBanHang.denNgay == null) {
            toastr.warning("Vui lòng chọn Từ ngày - Đến ngày")
        } else {
            var tuNgay = $scope.filterHoaDonBanHang.tuNgay;
            var denNgay = $scope.filterHoaDonBanHang.denNgay;
            $http.get(apiHoaDonBanHang + '?tuNgayDay=' + tuNgay.getDate() + '&&tuNgayMonth=' + (tuNgay.getMonth() + 1) + '&&tuNgayYear=' + tuNgay.getFullYear() + '&&denNgayDay=' + denNgay.getDate() + '&&denNgayMonth=' + (denNgay.getMonth() + 1) + '&&denNgayYear=' + denNgay.getFullYear())
                .then(function (response) {
                    if (response.status == 200) {
                        $scope.hoadonBanHangs = response.data;
                    }
                });
        }
    }
    $scope.ReviewHoaDonBanHang = function () {
        $scope.titlePopupReviewHoaDonBanHang = "Hóa đơn mã " + $scope.hoadonBanHang.id;
        GetHoaDonBanHang();
        $scope.reviewHoaDonBanHang = true;
    }

    //Lấy thông tin hóa đơn
    function GetHoaDonBanHang() {
        $http.get(apiHoaDonBanHang + "/" + $scope.hoadonBanHang.id)
            .then(function (response) {
                if (response.status == 200) {
                    $scope.hoadonBanHang = response.data;
                    $scope.hoadonBanHang.thoigianVao = new Date($scope.hoadonBanHang.thoigianVao);
                    $scope.hoadonBanHang.thoigianRa = new Date($scope.hoadonBanHang.thoigianRa);
                    //Lấy thông tin chi tiết
                    $http.get('/HoaDonBanHang/GetChiTiet/' + $scope.hoadonBanHang.id)
                        .then(function (response) {
                            if (response.status == 200) {
                                $scope.chitietHoaDonBanHangs = angular.copy(response.data.ChiTietThucDons);
                                $scope.chitietNhanVienHoaDonBanHangs = angular.copy(response.data.ChiTietNhanViens);
                            };
                        })
                }
            });
    }
}]);