import React from "react";
import * as XLSX from "xlsx";

class ExcelExport extends React.Component {
    constructor(props) {
        super(props);
        this.exportToExcel = this.exportToExcel.bind(this);
    }

    exportToExcel() {
        const data = [
            {
                id: "72edba8c-5a22-4255-a2e0-724a1159a4de",
                tanggal_lembur: "2023-06-22",
                mulai: "03:08",
                selesai: "06:36",
                total_jam: "208",
                harga: "52000.00",
                karyawan_id: "68c69990-9d5c-4e5e-b014-1ed638c1229c",
                created_at: "2023-06-22T09:22:52.000000Z",
                updated_at: "2023-06-22T09:22:52.000000Z",
            },
            {
                id: "bcd59017-9784-4655-8e91-7b22f07c2398",
                tanggal_lembur: "2023-06-21",
                mulai: "01:00",
                selesai: "03:00",
                total_jam: "120",
                harga: "30000.00",
                karyawan_id: "68c69990-9d5c-4e5e-b014-1ed638c1229c",
                created_at: "2023-06-22T07:35:53.000000Z",
                updated_at: "2023-06-22T07:35:53.000000Z",
            },
            {
                id: "d4915a33-9488-4b5b-aa1c-d4812fb64c78",
                tanggal_lembur: "2023-06-21",
                mulai: "20:06",
                selesai: "03:00",
                total_jam: "414",
                harga: "103500.00",
                karyawan_id: "68c69990-9d5c-4e5e-b014-1ed638c1229c",
                created_at: "2023-06-22T07:25:24.000000Z",
                updated_at: "2023-06-22T07:25:24.000000Z",
            },
        ];

        const worksheet = XLSX.utils.json_to_sheet(this.props.data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");
        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });

        // Save the file
        const fileName = "data.xlsx";
        const blob = new Blob([excelBuffer], {
            type: "application/octet-stream",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    render() {
        return (
            <div>
                <button onClick={this.exportToExcel}>Export to Excel</button>
            </div>
        );
    }
}

export default ExcelExport;
