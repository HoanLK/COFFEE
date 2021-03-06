﻿admin.controller("nhaphangController", ['$scope', '$http', function ($scope, $http) {
    //---VAR---
    //Phiếu nhập hàng
    $scope.nhaphangs = [];
    $scope.nhaphang = {};
    $scope.nhaphangReview = {};
    $scope.selectedNhapHangs = [];
    $scope.filterNhapHang = {};
    var apiNhapHang = "/API/KT_NhapHangAPI";
    //Chi tiết nhập hàng
    $scope.chitietNhapHangs = [];
    $scope.chitietNhapHang = {};
    $scope.chitietNhapHangReviews = [];
    var apiChiTietNhapHang = "/API/KT_ChiTietNhapHangAPI";
    //Mặt hàng
    $scope.mathangs = [];
    $scope.mathang = {};
    $scope.selectedMatHangs = [];
    var apiMatHang = "/API/DM_MatHangAPI";
    //Đơn vị tính
    $scope.donvitinhs = [];
    $scope.donvitinh = {};
    var apiDonViTinh = "/API/DM_DonViTinhAPI";
    //Lý do nhập
    $scope.lydoNhaps = [];
    $scope.lydoNhap = {};
    var apiLyDoNhap = "/API/DM_LyDoNhapAPI";
    //Nhà cung cấp
    $scope.nhacungcaps = [];
    $scope.nhacungcap = {};
    var apiNhaCungCap = "/API/DM_NhaCungCapAPI";

    //---POPUP---
    //Phiếu nhập hàng
    $scope.modifyNhapHang = false;
    $scope.deleteNhapHang = false;
    $scope.reviewNhapHang = false;
    $scope.titlePopupModifyNhapHang = "Thêm Phiếu nhập hàng";
    $scope.popupModifyNhapHang = {
        width: "auto",
        height: "auto",
        contentTemplate: "templateModifyNhapHang",
        showTitle: true,
        resizeEnabled: true,
        fullScreen: true,
        bindingOptions: {
            title: "titlePopupModifyNhapHang",
            visible: "modifyNhapHang",
        }
    };
    $scope.popupDeleteNhapHang = {
        width: "auto",
        height: "auto",
        contentTemplate: "templateDeleteNhapHang",
        showTitle: false,
        bindingOptions: {
            visible: "deleteNhapHang",
        }
    };
    $scope.popupReviewNhapHang = {
        width: "auto",
        height: "auto",
        contentTemplate: "templateReviewNhapHang",
        showTitle: true,
        resizeEnabled: true,
        fullScreen: true,
        title: "Xem phiếu Nhập hàng",
        bindingOptions: {
            visible: "reviewNhapHang",
        }
    };
    //Đơn vị tính
    $scope.modifyDonViTinh = false;
    $scope.titlePopupModifyDonViTinh = "Thêm đơn vị tính";
    $scope.popupModifyDonViTinh = {
        width: "auto",
        height: "auto",
        contentTemplate: "templateModifyDonViTinh",
        showTitle: true,
        resizeEnabled: true,
        bindingOptions: {
            title: "titlePopupModifyDonViTinh",
            visible: "modifyDonViTinh",
        }
    };
    //Lý do nhập
    $scope.modifyLyDoNhap = false;
    $scope.titlePopupModifyLyDoNhap = "Thêm lý do nhập";
    $scope.popupModifyLyDoNhap = {
        width: "auto",
        height: "auto",
        contentTemplate: "templateModifyLyDoNhap",
        showTitle: true,
        resizeEnabled: true,
        bindingOptions: {
            title: "titlePopupModifyLyDoNhap",
            visible: "modifyLyDoNhap",
        }
    };
    //Nhà cung cấp
    $scope.modifyNhaCungCap = false;
    $scope.titlePopupModifyNhaCungCap = "Thêm nhà cung cấp";
    $scope.popupModifyNhaCungCap = {
        width: "auto",
        height: "auto",
        contentTemplate: "templateModifyNhaCungCap",
        showTitle: true,
        resizeEnabled: true,
        bindingOptions: {
            title: "titlePopupModifyNhaCungCap",
            visible: "modifyNhaCungCap",
        }
    };

    //---CONTROL CONFIG---
    //Phiếu nhập hàng
    $scope.controlNhapHang = {
        //TextBox

        //SelectBox
        lydoNhap: {
            displayExpr: "ten",
            valueExpr: "id",
            searchEnabled: true,
            noDataText: "Không có dữ liệu",
            placeholder: "Chọn ...",
            bindingOptions: {
                items: "lydoNhaps",
                value: "nhaphang.idLyDoNhap"
            }
        },
        nhacungcap: {
            displayExpr: "ten",
            valueExpr: "id",
            searchEnabled: true,
            noDataText: "Không có dữ liệu",
            placeholder: "Chọn ...",
            bindingOptions: {
                items: "nhacungcaps",
                value: "nhaphang.idNhaCungCap"
            }
        },
        //DateBox
        thoigian: {
            type: "date",
            displayFormat: "dd/MM/yyyy",
            bindingOptions: {
                value: "nhaphang.thoigian"
            }
        },
        //TextArea
        ghichu: {
            height: 40,
            valueChangeEvent: "keyup",
            bindingOptions: {
                value: "nhaphang.ghichu"
            }
        },
        //Button
        addLyDoNhap: {
            icon: "plus",
            onClick: function (e) {
                $scope.AddLyDoNhap();
            }
        },
        addNhaCungCap: {
            icon: "plus",
            onClick: function (e) {
                $scope.AddNhaCungCap();
            }
        }
    }
    $scope.controlNhapHangReview = {
        //TextBox

        //SelectBox
        lydoNhap: {
            displayExpr: "ten",
            valueExpr: "id",
            searchEnabled: true,
            noDataText: "Không có dữ liệu",
            placeholder: "Chọn ...",
            readOnly: true,
            bindingOptions: {
                items: "lydoNhaps",
                value: "nhaphangReview.idLyDoNhap"
            }
        },
        nhacungcap: {
            displayExpr: "ten",
            valueExpr: "id",
            searchEnabled: true,
            noDataText: "Không có dữ liệu",
            placeholder: "Chọn ...",
            readOnly: true,
            bindingOptions: {
                items: "nhacungcaps",
                value: "nhaphangReview.idNhaCungCap"
            }
        },
        //DateBox
        thoigian: {
            type: "date",
            displayFormat: "dd/MM/yyyy",
            readOnly: true,
            bindingOptions: {
                value: "nhaphangReview.thoigian"
            }
        },
        //TextArea
        ghichu: {
            height: 40,
            valueChangeEvent: "keyup",
            readOnly: true,
            bindingOptions: {
                value: "nhaphangReview.ghichu"
            }
        }
    }
    //Đơn vị tính
    $scope.controlDonViTinh = {
        //TextBox
        ten: {
            showClearButton: true,
            valueChangeEvent: "keyup",
            bindingOptions: {
                value: "donvitinh.ten"
            }
        }
    }
    //Lý do nhập
    $scope.controlLyDoNhap = {
        //TextBox
        ten: {
            showClearButton: true,
            valueChangeEvent: "keyup",
            bindingOptions: {
                value: "lydoNhap.ten"
            }
        }
    }
    //Nhà cung cấp
    $scope.controlNhaCungCap = {
        //TextBox
        ten: {
            showClearButton: true,
            valueChangeEvent: "keyup",
            bindingOptions: {
                value: "nhacungcap.ten"
            }
        },
        dienthoai: {
            showClearButton: true,
            valueChangeEvent: "keyup",
            bindingOptions: {
                value: "nhacungcap.dienthoai"
            }
        },
        diachi: {
            showClearButton: true,
            valueChangeEvent: "keyup",
            bindingOptions: {
                value: "nhacungcap.diachi"
            }
        },
        email: {
            showClearButton: true,
            valueChangeEvent: "keyup",
            bindingOptions: {
                value: "nhacungcap.email"
            }
        },
        congty: {
            showClearButton: true,
            valueChangeEvent: "keyup",
            bindingOptions: {
                value: "nhacungcap.congty"
            }
        },
        masoThue: {
            showClearButton: true,
            valueChangeEvent: "keyup",
            bindingOptions: {
                value: "nhacungcap.masoThue"
            }
        },
        //TextArea
        ghichu: {
            height: 80,
            valueChangeEvent: "keyup",
            bindingOptions: {
                value: "nhacungcap.ghichu"
            }
        },
    }

    //---LIST---
    //Phiếu nhập hàng
    $scope.gridNhapHangs = {
        bindingOptions: {
            dataSource: 'nhaphangs',
            'columns[2].lookup.dataSource': 'lydoNhaps',
            'columns[3].lookup.dataSource': 'nhacungcaps',
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
                alignment: "left",
                allowEditing: false,
                caption: "ID",
                dataField: "id",
            },
            {//1
                alignment: "left",
                caption: "Thời gian",
                dataField: "thoigian",
                dataType: "date",
                format: "dd/MM/yyyy",
                customizeText: function (cellInfo) {
                    return cellInfo.valueText;
                },
            },
            {//2
                caption: "Lý do nhập",
                dataField: "idLyDoNhap",
                lookup: {
                    displayExpr: 'ten',
                    valueExpr: 'id'
                },
            },
            {//3
                caption: "Nhà cung cấp",
                dataField: "idNhaCungCap",
                lookup: {
                    displayExpr: 'ten',
                    valueExpr: 'id'
                },
            },
            {//4
                alignment: "right",
                caption: "Tổng tiền",
                dataField: "tongTien",
                format: {
                    type: "fixedPoint",
                    precision: 0
                }
            },
            {//5
                alignment: "left",
                caption: "Ghi chú",
                dataField: "ghichu",
                dataType: "string"
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
            enabled: true,
            excelFilterEnabled: true,
            excelWrapTextEnabled: true,
            fileName: "Danh sách Phiếu nhập hàng",
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
                    column: "tongTien",
                    summaryType: "sum",
                    valueFormat: 'fixedPoint'
                }
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
                            value: "filterNhapHang.tuNgay"
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
                            value: "filterNhapHang.denNgay",
                            min: "filterNhapHang.tuNgay"
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
                            FilterNhapHang();
                        }
                    }
                },
                {//Thêm
                    location: "after",
                    widget: "dxButton",
                    options: {
                        hint: "Thêm",
                        icon: "add",
                        type: "success",
                        onClick: function () {
                            $scope.AddNhapHang();
                        }
                    }
                },
                {//Review
                    location: "after",
                    widget: "dxButton",
                    options: {
                        hint: "Xem",
                        icon: "search",
                        type: "default",
                        onClick: function () {
                            $scope.ReviewNhapHang();
                        }
                    }
                },
                {//Xóa
                    location: "after",
                    widget: "dxButton",
                    options: {
                        hint: "Xóa",
                        icon: "trash",
                        type: "danger",
                        onClick: function () {
                            $scope.DeleteNhapHang();
                        }
                    }
                },
                {//Load lại
                    location: "after",
                    widget: "dxButton",
                    options: {
                        hint: "Load lại Dữ liệu",
                        icon: "refresh",
                        onClick: function () {
                            FilterNhapHang();
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
                    $scope.nhaphangReview = angular.copy(e.data);
                    $scope.ReviewNhapHang();
                }

                // Reset your click info
                component.clickCount = 0;
                component.lastClickTime = 0;
            }
        },
        //Select Row
        onSelectionChanged: function (e) {
            $scope.selectedNhapHangs = angular.copy(e.selectedRowsData);
        }
    };
    //Chi tiết nhập hàng
    $scope.gridChiTietNhapHangs = {
        bindingOptions: {
            dataSource: 'chitietNhapHangs',
            'columns[0].lookup.dataSource': 'mathangs',
            'columns[1].lookup.dataSource': 'mathangs',
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
                caption: "Mặt hàng",
                dataField: "idMatHang",
                lookup: {
                    displayExpr: 'ten',
                    valueExpr: 'id'
                },
                allowEditing: false
            },
            {//1
                caption: "ĐVT",
                dataField: "idMatHang",
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
                    precision: 3
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
            TinhTien();
        },
        onRowRemoved: function (e) {
            TinhTien();
        },
        onRowUpdated: function (e) {
            TinhTien();
        }
    };
    $scope.gridChiTietNhapHangReviews = {
        bindingOptions: {
            dataSource: 'chitietNhapHangReviews',
            'columns[0].lookup.dataSource': 'mathangs',
            'columns[1].lookup.dataSource': 'mathangs',
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
                caption: "Mặt hàng",
                dataField: "idMatHang",
                lookup: {
                    displayExpr: 'ten',
                    valueExpr: 'id'
                },
                allowEditing: false
            },
            {//1
                caption: "ĐVT",
                dataField: "idMatHang",
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
                    precision: 3
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
            TinhTien();
        },
        onRowRemoved: function (e) {
            TinhTien();
        },
        onRowUpdated: function (e) {
            TinhTien();
        }
    };
    //Mặt hàng
    $scope.lookupMatHangs = {
        bindingOptions: {
            items: "mathangs",
            value: "mathang.id"
        },
        cancelButtonText: "Đóng",
        clearButtonText: "Xóa",
        displayExpr: "ten",
        nextButtonText: "Thêm",
        noDataText: "Không có dữ liệu",
        valueExpr: "id",
        title: "Chọn mặt hàng",
        pageLoadingText: "Đang tải...",
        placeholder: "Chọn mặt hàng",
        searchPlaceholder: "Tìm kiếm",
        onItemClick: function (e) {
            ChooseMatHang(e.itemData);
        },
        onClosed: function () {
            var lookup = $("#lookupMatHangs").dxLookup("instance");
            lookup.reset();
        }
    };

    //---CONTEXTMENU---
    var itemContextMenus = [
        { value: 'add', text: ' Thêm', icon: 'fa fa-plus' },
        { value: 'review', text: ' Xem', icon: 'fa fa-search' },
        { value: 'delete', text: ' Xóa', icon: 'fa fa-times' }
    ];
    //Phiếu nhập hàng
    $scope.contextMenuNhapHang = {
        dataSource: itemContextMenus,
        width: 100,
        target: '#nhaphang',
        itemTemplate: function (itemData, itemIndex, itemElement) {
            var template = $('<div></div>');
            if (itemData.icon) {
                template.append('<span class="' + itemData.icon + '"><span>');
            }
            template.append(itemData.text);
            return template;
        },
        onItemClick: function (e) {
            if (!e.itemData.items) {
                switch (e.itemData.value) {
                    case "add":
                        $scope.AddNhapHang();
                        break;
                    case "review":
                        $scope.ReviewNhapHang();
                        break;
                    case "delete":
                        $scope.DeleteNhapHang();
                        break;
                }

            }
        }
    };

    Init();

    //---FUNCTION---
    function Init() {
        GetNhapHangThisMonth();
        GetAllDonViTinh();
        GetAllLyDoNhap();
        GetAllNhaCungCap();
        GetAllMatHang();
    }

    //Phiếu nhập hàng
    function GetNhapHangThisMonth() {
        var now = new Date();
        $scope.filterNhapHang.denNgay = now;
        $scope.filterNhapHang.tuNgay = new Date(now.getFullYear(), now.getMonth(), 1);
        FilterNhapHang();
    }
    $scope.AddNhapHang = function () {
        $scope.chitietNhapHangs = [];
        $scope.chitietNhapHang = {};
        $scope.nhaphang = {
            thoigian: new Date(),
            idLyDoNhap: 1,
            tongTien: 0
        };

        $scope.titlePopupModifyNhapHang = "Thêm Phiếu nhập hàng";
        $scope.modifyNhapHang = true;
    }
    function ChooseMatHang(mathang) {
        var existed = false;
        angular.forEach($scope.chitietNhapHangs, function (value, index) {
            if (value.idMatHang == mathang.id) {
                existed = true;
                toastr.warning("Đã tồn tại", "Mặt hàng");
            }
        });

        if (existed == false) {
            var chitietNhapHang = {
                idMatHang: mathang.id,
                idNhapHang: $scope.nhaphang.id,
                soluong: 1,
                dongia: mathang.dongia
            }
            $scope.chitietNhapHangs.push(chitietNhapHang);
        }

        TinhTien();
    }
    $scope.SaveNhapHang = function (e) {
        //Thêm
        //Lưu phiếu nhập hàng
        $http.post(apiNhapHang, $scope.nhaphang)
            .then(function (response) {
                if (response.status == 201) {
                    $scope.nhaphang = angular.copy(response.data);
                    //Lưu chi tiết nhập hàng
                    angular.forEach($scope.chitietNhapHangs, function (value, index) {
                        value.idNhapHang = $scope.nhaphang.id;
                        $http.post(apiChiTietNhapHang, value)
                            .then(function (response) {
                                //Tăng số lượng mặt hàng trong kho
                                $http.get('/MatHang/NhapHang/' + response.data.id)
                                    .then(function (response) { });
                            });
                    });
                    $scope.modifyNhapHang = false;
                    toastr.success("Thành công", "Lưu");
                    FilterNhapHang();
                } else {
                    toastr.error("Thất bại", "Lưu");
                }
            })
    };
    $scope.CancelSaveNhapHang = function () {
        $scope.nhaphang = {};
        $scope.chitietNhapHangs = [];
        $scope.chitietNhapHang = {};
        $scope.modifyNhapHang = false;
    }
    $scope.DeleteNhapHang = function () {
        if ($scope.selectedNhapHangs.length == 0) {
            toastr.error("Chọn dòng để xóa");
        } else {
            $scope.deleteNhapHang = true;
        }
    }
    $scope.ConfirmDeleteNhapHang = function () {
        angular.forEach($scope.selectedNhapHangs, function (value, index) {
            $http.delete("/NhapHang/Delete/" + value.id)
                .then(function (response) {
                    if (response.status == 200 && response.data == 1) {
                        angular.forEach($scope.nhaphangs, function (valueNH, indexNH) {
                            if (value.id === valueNH.id) {
                                $scope.nhaphangs.splice(indexNH, 1);
                            }
                        });
                    } else {
                        toastr.error("Thất bại", "Xóa");
                    }
                })
        });
        toastr.success("Thành công", "Xóa");
        $scope.deleteNhapHang = false;
    };
    $scope.CancelDeleteNhapHang = function () {
        $scope.deleteNhapHang = false;
    };


    function TinhTien() {
        var tongTien = 0;
        angular.forEach($scope.chitietNhapHangs, function (value, index) {
            $scope.chitietNhapHangs[index].thanhtien = parseFloat(value.dongia) * parseFloat(value.soluong);
            tongTien = parseFloat(tongTien) + parseFloat($scope.chitietNhapHangs[index].thanhtien);
        });
        $scope.nhaphang.tongTien = tongTien;
    }
    function FilterNhapHang() {
        if ($scope.filterNhapHang.tuNgay == null || $scope.filterNhapHang.denNgay == null) {
            toastr.warning("Vui lòng chọn Từ ngày - Đến ngày")
        } else {
            var tuNgay = $scope.filterNhapHang.tuNgay;
            var denNgay = $scope.filterNhapHang.denNgay;
            $http.get(apiNhapHang + '?tuNgayDay=' + tuNgay.getDate() + '&&tuNgayMonth=' + (tuNgay.getMonth() + 1) + '&&tuNgayYear=' + tuNgay.getFullYear() + '&&denNgayDay=' + denNgay.getDate() + '&&denNgayMonth=' + (denNgay.getMonth() + 1) + '&&denNgayYear=' + denNgay.getFullYear())
                .then(function (response) {
                    if (response.status == 200) {
                        $scope.nhaphangs = response.data;
                    }
                });
        }
    }
    
    $scope.ReviewNhapHang = function () {
        if ($scope.selectedNhapHangs.length == 0) {
            toastr.error("Chọn 1 dòng để xem");
        } else {
            $scope.nhaphangReview = angular.copy($scope.selectedNhapHangs[0]);
            GetChiTietByNhapHang($scope.nhaphangReview.id);
            $scope.reviewNhapHang = true;
        }
    }
    function GetChiTietByNhapHang(idNhapHang) {
        if (idNhapHang != null) {
            $http.get(apiChiTietNhapHang + "?att=idNhapHang&&value=" + idNhapHang)
                .then(function (response) {
                    if (response.status == 200) {
                        $scope.chitietNhapHangReviews = angular.copy(response.data);
                    }
                })
        }
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
    $scope.AddDonViTinh = function () {
        $scope.donvitinh = {};
        $scope.titlePopupModifyDonViTinh = "Thêm đơn vị tính";
        $scope.modifyDonViTinh = true;
    }
    $scope.SaveDonViTinh = function (e) {
        //Thêm
        if (!angular.isDefined($scope.donvitinh.id)) {
            $http.post(apiDonViTinh, $scope.donvitinh)
                .then(function (response) {
                    if (response.status == 201) {
                        GetAllDonViTinh();
                        toastr.success("Thành công", "Thêm");
                        $scope.modifyDonViTinh = false;
                    } else {
                        toastr.error("Thất bại", "Thêm");
                    }
                });
        }
        //Sửa
        else {
            $http.put(apiDonViTinh + "/" + $scope.donvitinh.id, $scope.donvitinh)
                .then(function (response) {
                    if (response.status == 204) {
                        GetAllDonViTinh();
                        toastr.success("Thành công", "Sửa");
                        $scope.modifyDonViTinh = false;
                    } else {
                        toastr.error("Thất bại", "Sửa");
                    }
                });
        }
    };
    $scope.CancelSaveDonViTinh = function () {
        $scope.modifyDonViTinh = false;
    }

    //Mặt hàng
    function GetAllMatHang() {
        $http.get(apiMatHang)
            .then(function (response) {
                if (response.status == 200) {
                    $scope.mathangs = response.data;
                }
            })
    }

    //Lý do nhập
    function GetAllLyDoNhap() {
        $http.get(apiLyDoNhap)
            .then(function (response) {
                if (response.status == 200) {
                    $scope.lydoNhaps = response.data;
                }
            })
    }
    $scope.AddLyDoNhap = function () {
        $scope.lydoNhap = {};
        $scope.titlePopupModifyLyDoNhap = "Thêm lý do nhập";
        $scope.modifyLyDoNhap = true;
    }
    $scope.SaveLyDoNhap = function (e) {
        //Thêm
        if (!angular.isDefined($scope.lydoNhap.id)) {
            $http.post(apiLyDoNhap, $scope.lydoNhap)
                .then(function (response) {
                    if (response.status == 201) {
                        GetAllLyDoNhap();
                        toastr.success("Thành công", "Thêm");
                        $scope.modifyLyDoNhap = false;
                    } else {
                        toastr.error("Thất bại", "Thêm");
                    }
                });
        }
        //Sửa
        else {
            $http.put(apiLyDoNhap + "/" + $scope.lydoNhap.id, $scope.lydoNhap)
                .then(function (response) {
                    if (response.status == 204) {
                        GetAllLyDoNhap();
                        toastr.success("Thành công", "Sửa");
                        $scope.modifyLyDoNhap = false;
                    } else {
                        toastr.error("Thất bại", "Sửa");
                    }
                });
        }
    };
    $scope.CancelSaveLyDoNhap = function () {
        $scope.modifyLyDoNhap = false;
    }

    //Nhà cung cấp
    function GetAllNhaCungCap() {
        $http.get(apiNhaCungCap)
            .then(function (response) {
                if (response.status == 200) {
                    $scope.nhacungcaps = response.data;
                }
            })
    }
    $scope.AddNhaCungCap = function () {
        $scope.nhacungcap = {};
        $scope.titlePopupModifyNhaCungCap = "Thêm nhà cung cấp";
        $scope.modifyNhaCungCap = true;
    }
    $scope.SaveNhaCungCap = function (e) {
        //Thêm
        if (!angular.isDefined($scope.nhacungcap.id)) {
            $http.post(apiNhaCungCap, $scope.nhacungcap)
                .then(function (response) {
                    if (response.status == 201) {
                        $scope.nhacungcaps.push(response.data);
                        toastr.success("Thành công", "Thêm");
                        $scope.modifyNhaCungCap = false;
                    } else {
                        toastr.error("Thất bại", "Thêm");
                    }
                });
        }
            //Sửa
        else {
            $http.put(apiNhaCungCap + "/" + $scope.nhacungcap.id, $scope.nhacungcap)
                .then(function (response) {
                    if (response.status == 204) {
                        angular.forEach($scope.nhacungcaps, function (value, index) {
                            if (value.id == $scope.nhacungcap.id) {
                                $scope.nhacungcaps[index] = angular.copy($scope.nhacungcap);
                                toastr.success("Thành công", "Sửa");
                                $scope.modifyNhaCungCap = false;
                            }
                        });
                    } else {
                        toastr.error("Thất bại", "Sửa");
                    }
                });
        }
    };
    $scope.CancelSaveNhaCungCap = function () {
        $scope.modifyNhaCungCap = false;
    }



}]);