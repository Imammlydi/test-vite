import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { getReportById } from "../services/reports";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import EquipmentForm from "../components/EquipmentForm";
import WorkerList from "../components/WorkerList";
import WorkForm from "../components/WorkForm ";
import { BackButton } from "../components";
import WorkerHour from "../components/WorkerHours";
import Chart from "react-apexcharts";

import ReactLoading from "react-loading";
import {
    PDFViewer,
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFDownloadLink,
    Image,
} from "@react-pdf/renderer";
import ImageUrlForm from "../components/ImageUrlForm";
import ReportPdf from "../components/ReportPdf";
import HitungJamKerja from "../components/HitungJamKerja";
import { getWorkerHoursByReportId } from "../services/wokerHours";
import ChartDurasiKerja from "../components/ChartDurasiKerja";
import ChartPerlatan from "../components/ChartPeralatan";
import { getEquipmentByReportId } from "../services/equipment";
import ChartPekerja from "../components/ChartPekerja";
import { getWorkerByReportId } from "../services/worker";
import Kendala from "../components/Kendala";
import Weather from "../components/Weather";
import axios from "axios";
import { getKendalabyReportId } from "../services/kendala";
import KendalaChart from "./KendalaChart";

const styles = StyleSheet.create({
    page: {
        flexDirection: "row",
        backgroundColor: "white",
        // padding: 20
    },
    section: {
        flexGrow: 1,
        backgroundColor: "#4ca664",
    },
    child: {
        // flexGrow: 1,
        backgroundColor: "#ba5294",
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 14,
        // marginBottom: 10,
    },
    text1: {
        fontSize: 12,
        marginVertical: 5,

        textAlign: "center",
    },
    text2: {
        fontSize: 12,
        // marginVertical: 1,

        // textAlign: "center",
    },

    tableRow: {
        flexDirection: "row",
    },
    tableCellHeader: {
        backgroundColor: "#F2F2F2",
        fontWeight: "bold",
        padding: 5,
    },
    tableCell: {
        padding: 5,
    },

    table: {
        backgroundColor: "#f7f9fc",
        borderWidth: 1,
        borderColor: "#f2f3f5",
        borderRadius: 3,
        padding: 2,
        marginBottom: 10,
        width: 250,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 5,
        borderBottomWidth: 0.1,
        borderBottomColor: "black",
    },
    rowHead: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 5,
        borderBottomWidth: 0.1,
        borderBottomColor: "black",
        backgroundColor: "#628fd9",
        borderRadius: 3,
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 12,
    },
    cellText: {
        flex: 4,

        marginLeft: 10,
        fontSize: 12,
        paddingVertical: 6,
    },
    cellTextNo: {
        flex: 1,
        fontWeight: "light",
        marginLeft: 10,
        fontSize: 10,
        paddingVertical: 6,
    },
    cellTextItem: {
        flex: 4,
        fontWeight: "light",
        marginLeft: 10,
        fontSize: 10,
        paddingVertical: 6,
    },
    con1: {
        flexDirection: "row",
        paddingHorizontal: 10,
        // backgroundColor:'#5446cf'
        // justifyContent: "space-between",
        // width:700
    },
    con2: {
        // flexDirection: "row",
        // paddingHorizontal:10,
        // backgroundColor:'#5446cf',
        paddingHorizontal: "5",
        // justifyContent: "space-between",
        // width:700
    },
    imageContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 10,
    },
});

// import ReportAPI from './ReportAPI';

const ReportDetail2 = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // Navigates back to the previous page
    };

    const [durasikerja, setDurasikerja] = useState([]);
    const [peralatan, setPeralatan] = useState([]);
    const [pekerja, setPekerja] = useState([]);
    const [kendala, setKendala] = useState([]);
    const [weatherData, setWeatherData] = useState([]);

    const fetchWeatherData = async () => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/api/weather/report/${idReport}`
            );
            setWeatherData(response.data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    const fetchDurasi = async () => {
        const data = await getWorkerHoursByReportId(idReport, tokens);
        console.log("durasinya", data);
        setDurasikerja(data);
    };
    const fetchPeralatan = async () => {
        const data = await getEquipmentByReportId(idReport, tokens);
        console.log("durasinya", data);
        setPeralatan(data);
    };
    const fetchPekerja = async () => {
        const data = await getWorkerByReportId(idReport, tokens);
        console.log("pekerja", data);
        setPekerja(data);
    };
    const fetchKendala = async () => {
        const data = await getKendalabyReportId(idReport, tokens);
        console.log("Kendala", data.data);
        setKendala(data.data);
    };

    const PDFPreview = ({ datax, data }) => {
        const downloadImage = async (imageUrl) => {
            try {
                const response = await fetch(imageUrl);
                const blob = await response.blob();
                return new Uint8Array(await blob.arrayBuffer());
            } catch (error) {
                console.error("Error downloading image:", error);
                return null;
            }
        };
        const Table = ({ item1, item2, title }) => {
            return (
                <>
                    <View style={styles.con2}>
                        <Text style={styles.text1}>{title}</Text>
                        <View style={styles.table}>
                            <View style={styles.rowHead}>
                                <Text
                                    style={[
                                        styles.headerText,
                                        styles.cellTextNo,
                                    ]}
                                >
                                    No
                                </Text>
                                <Text
                                    style={[styles.headerText, styles.cellText]}
                                >
                                    {item1}
                                </Text>
                                <Text
                                    style={[styles.headerText, styles.cellText]}
                                >
                                    {item2}
                                </Text>
                            </View>
                            {datax &&
                                data.worker.map((wh) => (
                                    <View style={styles.row}>
                                        <Text style={styles.cellTextNo}>1</Text>
                                        <Text style={styles.cellTextItem}>
                                            {wh.type_of_worker}
                                        </Text>
                                        <Text style={styles.cellTextItem}>
                                            {wh.qty}
                                        </Text>
                                    </View>
                                ))}
                        </View>
                    </View>
                </>
            );
        };
        const Table2 = ({ item1, item2, title }) => {
            return (
                <>
                    <View style={styles.con2}>
                        <Text style={styles.text1}>{title}</Text>
                        <View style={styles.table}>
                            <View style={styles.rowHead}>
                                <Text
                                    style={[
                                        styles.headerText,
                                        styles.cellTextNo,
                                    ]}
                                >
                                    No
                                </Text>
                                <Text
                                    style={[styles.headerText, styles.cellText]}
                                >
                                    {item1}
                                </Text>
                                <Text
                                    style={[styles.headerText, styles.cellText]}
                                >
                                    {item2}
                                </Text>
                            </View>
                            {datax &&
                                data.working_hours.map((wh) => (
                                    <View style={styles.row}>
                                        <Text style={styles.cellTextNo}>1</Text>
                                        <Text style={styles.cellTextItem}>
                                            {wh.working_name}
                                        </Text>
                                        <Text style={styles.cellTextItem}>
                                            {wh.length}
                                        </Text>
                                    </View>
                                ))}
                        </View>
                    </View>
                </>
            );
        };
        const Table3 = ({ item1, item2, title }) => {
            return (
                <>
                    <View style={styles.con2}>
                        <Text style={styles.text1}>{title}</Text>
                        <View style={styles.table}>
                            <View style={styles.rowHead}>
                                <Text
                                    style={[
                                        styles.headerText,
                                        styles.cellTextNo,
                                    ]}
                                >
                                    No
                                </Text>
                                <Text
                                    style={[styles.headerText, styles.cellText]}
                                >
                                    {item1}
                                </Text>
                                <Text
                                    style={[styles.headerText, styles.cellText]}
                                >
                                    {item2}
                                </Text>
                            </View>
                            {datax &&
                                data.equipment.map((wh) => (
                                    <View style={styles.row}>
                                        <Text style={styles.cellTextNo}>1</Text>
                                        <Text style={styles.cellTextItem}>
                                            {wh.name}
                                        </Text>
                                        <Text style={styles.cellTextItem}>
                                            {wh.qty}
                                        </Text>
                                    </View>
                                ))}
                        </View>
                    </View>
                </>
            );
        };
        const Table4 = ({ item1, item2, title }) => {
            return (
                <>
                    <View style={styles.con2}>
                        <Text style={styles.text1}>{title}</Text>
                        <View style={styles.table}>
                            <View style={styles.rowHead}>
                                <Text
                                    style={[
                                        styles.headerText,
                                        styles.cellTextNo,
                                    ]}
                                >
                                    No
                                </Text>
                                <Text
                                    style={[styles.headerText, styles.cellText]}
                                >
                                    {item1}
                                </Text>
                                <Text
                                    style={[styles.headerText, styles.cellText]}
                                >
                                    {item2}
                                </Text>
                            </View>
                            {datax &&
                                data.kendala.map((wh) => (
                                    <View style={styles.row}>
                                        <Text style={styles.cellTextNo}>1</Text>
                                        <Text style={styles.cellTextItem}>
                                            {wh.name}
                                        </Text>
                                        <Text style={styles.cellTextItem}>
                                            {wh.qty}
                                        </Text>
                                    </View>
                                ))}
                        </View>
                    </View>
                </>
            );
        };
        const Table5 = ({ item1, item2, title }) => {
            return (
                <>
                    <View style={styles.con2}>
                        <Text style={styles.text1}>{title}</Text>
                        <View style={styles.table}>
                            <View style={styles.rowHead}>
                                <Text
                                    style={[
                                        styles.headerText,
                                        styles.cellTextNo,
                                    ]}
                                >
                                    No
                                </Text>
                                <Text
                                    style={[styles.headerText, styles.cellText]}
                                >
                                    {item1}
                                </Text>
                                <Text
                                    style={[styles.headerText, styles.cellText]}
                                >
                                    {item2}
                                </Text>
                            </View>
                            {datax &&
                                data.weather.map((wh) => (
                                    <View style={styles.row}>
                                        <Text style={styles.cellTextNo}>1</Text>
                                        <Text style={styles.cellTextItem}>
                                            {wh.cuaca}
                                        </Text>
                                        <Text style={styles.cellTextItem}>
                                            {wh.temperature}
                                        </Text>
                                    </View>
                                ))}
                        </View>
                    </View>
                </>
            );
        };
        const Table6 = ({ item1, item2, title }) => {
            return (
                <>
                    <View style={styles.con2}>
                        <Text style={styles.text1}>{title}</Text>
                        {/* <View style={styles.table}>
          <View style={styles.rowHead}>
            <Text style={[styles.headerText, styles.cellTextNo]}>No</Text>
            <Text style={[styles.headerText, styles.cellText]}>{item1}</Text>
            <Text style={[styles.headerText, styles.cellText]}>{item2}</Text>
          </View>
          {datax &&
            data.equipment.map((wh) => (
              <View style={styles.row} key={wh.id}>
                <Text style={styles.cellTextNo}>1</Text>
                <Text style={styles.cellTextItem}>{wh.name}</Text>
                <Text style={styles.cellTextItem}>{wh.qty}</Text>
              </View>
            ))}
        </View> */}
                    </View>
                    <View style={styles.imageContainer}>
                        {datax &&
                            data.photo.map((photo) => (
                                <>
                                    <Image
                                        key={photo.id}
                                        src={`http://127.0.0.1:8000${photo.imageUrl}`}
                                        style={styles.image}
                                    />
                                    <Text
                                        style={styles.text1}
                                    >{`http://127.0.0.1:8000${photo.imageUrl}`}</Text>
                                </>
                            ))}
                    </View>
                </>
            );
        };
        // <PDFViewer style={{ width: '100%', height: '100vh' }}>
        return (
            <Document>
                <Page size="A4" style={styles.page} orientation="landscape">
                    <View style={styles.section}>
                        <View style={styles.child}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <Text style={styles.title}>Title</Text>
                                <View style={{ marginHorizontal: 2 }}>:</View>
                                <Text style={styles.title}>{datax.title}</Text>
                            </View>

                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <Text style={styles.title}>Description</Text>
                                <View style={{ marginHorizontal: 2 }}>:</View>

                                <Text style={styles.text2}>
                                    {datax.description}
                                </Text>
                            </View>

                            <Text style={styles.text2}>{datax.shift}</Text>
                            <Text style={styles.text2}>{datax.date}</Text>
                        </View>

                        <View style={styles.con1}>
                            <Table
                                item1={"Worker Type"}
                                item2={"Qty"}
                                title={"Worker"}
                            />
                            <Table2
                                item1={"Working Duration"}
                                item2={"Length"}
                                title={"Working Duration"}
                            />
                            <Table3
                                item1={"Equipment"}
                                item2={"Qty"}
                                title={"Equipment"}
                            />

                            {/* <Table item1={"Jenis Pekerja"} item2={"Qty"} title={"Pekerja"}/> */}
                            {/* <Table /> */}
                        </View>
                        <View style={styles.con1}>
                            <Table4
                                item1={"Equipment"}
                                // item2={"Length"}
                                title={"Equipment"}
                            />
                            <Table5
                                item1={"Weather"}
                                item2={"Temperature"}
                                title={"Weather"}
                            />
                            {/* <Table6/> */}
                            {/* <Table item1={"Jenis Pekerja"} item2={"Qty"} title={"Pekerja"}/> */}
                            {/* <Table /> */}
                        </View>
                        <View style={styles.con1}></View>
                    </View>
                </Page>
            </Document>
        );
        // </PDFViewer>
    };

    const data = {
        title: "Tunnel",
        description: "Civil",
        shift: "Imam Mulyadi",
        date: "12 Mei 2022",
        inspector_id: "5ac5ce26-f5a9-4275-89a8-ae37f47d9dc5",
    };
    const id_inspector = localStorage.getItem("id_inspector");

    const { id } = useParams();
    const [report, setReport] = useState(null);
    const [reports, setReports] = useState(null);
    const { state } = useLocation();
    const idReport = state;
    const [loading, setLoading] = useState(false);
    const [reloadChart, setReloadChart] = useState(false);
    const tokens = localStorage.getItem("token");
    const [reportData, setReportData] = useState({
        title: "",
        description: "",
        shift: "",
        date: "",
        inspectorId: id_inspector,
        area: "",
    });

    const handleUpdateReport = () => {
        // Lakukan permintaan PUT ke API untuk memperbarui laporan
        console.log(reportData);
        console.log(`http://127.0.0.1:8000/api/reports/${idReport}`);
        axios
            .put(`http://127.0.0.1:8000/api/reports/${idReport}`, reportData, {
                headers: {
                    Authorization: `Bearer ${tokens}`, // Ganti dengan token JWT yang valid
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                console.log("Report updated successfully:", response.data);
                setShowForm(false);
                // Lakukan aksi setelah pembaruan berhasil, misalnya redirect atau tampilkan notifikasi
            })
            .catch((error) => {
                console.error("Error updating report:", error);
            });
    };

    const handleDataUpdated = () => {
        setReloadChart(true); // Set reloadChart menjadi true saat data diperbarui di dalam komponen ChartDurasiKerja
    };

    useEffect(() => {
        // if (reloadChart) {
        //     setReloadChart(false); // Set reloadChart kembali ke false untuk menghindari pembaruan berulang
        //   }
        fetchDurasi();
        fetchPekerja();
        fetchPeralatan();
        fetchKendala();
        fetchWeatherData();

        const fetchReport = async () => {
            try {
                // Ganti 'YOUR_BEARER_TOKEN' dengan bearer token yang valid
                const token = "YOUR_BEARER_TOKEN";
                const data = await getReportById(idReport, tokens);
                console.log(data.data.inspector.discipline, "report");
                console.log(data.data.id, "report--->***");
                setReport(data.data);
                setReports(data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching report:", error);
                setLoading(true);
            }
            console.log(tokens, idReport);
        };

        fetchReport();
    }, [id, reloadChart]);

    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    function tanggalSekarang() {
        var sekarang = new Date();

        var tanggal = sekarang.getDate();
        var bulan = sekarang.getMonth() + 1; // Mengembalikan nilai bulan dari 0-11, sehingga perlu ditambah 1
        var tahun = sekarang.getFullYear();

        // Format tanggal menjadi "DD/MM/YYYY"
        var tanggalFormat = (tanggal < 10 ? "0" : "") + tanggal;
        var bulanFormat = (bulan < 10 ? "0" : "") + bulan;
        var tahunFormat = tahun;

        return tanggalFormat + "/" + bulanFormat + "/" + tahunFormat;
    }

    // Contoh penggunaan
    var tanggalSekarangs = tanggalSekarang();

    if (!report) {
        return (
            <div className="flex h-full min-h-screen w-full items-center  justify-center">
                <ReactLoading
                    type={"spin"}
                    color={"#000000"}
                    height={50}
                    width={50}
                />{" "}
            </div>
        );
    }

    return (
        <div className=" min-h-screen  w-full w-screen  ">
            <div className="  mx-auto py-5 pl-2 md:pl-4 lg:pl-5 xl:pl-5 ">
                <BackButton href={"/report"} onclick={goBack} />
            </div>

            <div className="mx-auto grid grid-cols-1 gap-4 px-4 pt-5 md:grid-cols-2 md:px-8 lg:max-w-7xl lg:grid-cols-2 lg:gap-10">
                <div>
                    <PDFDownloadLink
                        document={<PDFPreview datax={data} data={reports} />}
                        fileName={`${tanggalSekarangs}report.pdf`}
                    >
                        {({ blob, url, loading, error }) =>
                            loading ? "Loading document..." : "Download PDF"
                        }
                    </PDFDownloadLink>
                    {loading ? (
                        <ReactLoading
                            type={"spin"}
                            color={"#000000"}
                            height={50}
                            width={50}
                        />
                    ) : (
                        <>
                            <div className="rounded border p-2 shadow-lg">
                                <div>
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 border py-2 px-4 font-Bitter text-sm font-bold  text-primary"
                                        onClick={toggleForm}
                                    >
                                        {showForm ? "X" : "Edit"}
                                    </button>
                                    {showForm ? (
                                        // Lakukan bantu edit/put di sini
                                        <div className="rounded-lg bg-white p-6 shadow-md">
                                            <h2 className="mb-4 text-xl font-semibold">
                                                Edit Report
                                            </h2>
                                            <div className="mb-4">
                                                <label className="text-gray-700 block text-sm font-medium">
                                                    Title:
                                                </label>
                                                <input
                                                    className="border-gray-300 focus:ring-blue-200 mt-1 w-full rounded-md border p-2 focus:ring"
                                                    type="text"
                                                    placeholder={report.title}
                                                    value={reportData.title}
                                                    onChange={(e) =>
                                                        setReportData({
                                                            ...reportData,
                                                            title: e.target
                                                                .value,
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="text-gray-700 block text-sm font-medium">
                                                    Description:
                                                </label>
                                                <textarea
                                                    className="border-gray-300 focus:ring-blue-200 mt-1 w-full rounded-md border p-2 focus:ring"
                                                    placeholder={
                                                        report.description
                                                    }
                                                    value={
                                                        reportData.description
                                                    }
                                                    onChange={(e) =>
                                                        setReportData({
                                                            ...reportData,
                                                            description:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="text-gray-700 block text-sm font-medium">
                                                    Shift:
                                                </label>
                                                <select
                                                    className="border-gray-300 focus:ring-blue-200 mt-1 w-full rounded-md border p-2 focus:ring"
                                                    value={reportData.shift}
                                                    onChange={(e) =>
                                                        setReportData({
                                                            ...reportData,
                                                            shift: e.target
                                                                .value,
                                                        })
                                                    }
                                                >
                                                    <option value="">
                                                        Pilih Shift
                                                    </option>
                                                    <option value="Siang">
                                                        Siang
                                                    </option>
                                                    <option value="Malam">
                                                        Malam
                                                    </option>
                                                </select>
                                            </div>
                                            <div className="mb-4">
                                                <label className="text-gray-700 block text-sm font-medium">
                                                    Date:
                                                </label>
                                                <input
                                                    className="border-gray-300 focus:ring-blue-200 mt-1 w-full rounded-md border p-2 focus:ring"
                                                    type="date"
                                                    value={reportData.date}
                                                    onChange={(e) =>
                                                        setReportData({
                                                            ...reportData,
                                                            date: e.target
                                                                .value,
                                                        })
                                                    }
                                                />
                                            </div>
                                            {/* <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">Inspector ID:</label>
                                            <input
                                                className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-blue-200"
                                                type="text"
                                                value={reportData.inspectorId}
                                                onChange={(e) => setReportData({ ...reportData, inspectorId: e.target.value })}
                                            />
                                        </div> */}
                                            <div className="mb-4">
                                                <label className="text-gray-700 block text-sm font-medium">
                                                    Area:
                                                </label>
                                                <select
                                                    className="border-gray-300 focus:ring-blue-200 mt-1 w-full rounded-md border p-2 focus:ring"
                                                    value={reportData.area}
                                                    onChange={(e) =>
                                                        setReportData({
                                                            ...reportData,
                                                            area: e.target
                                                                .value,
                                                        })
                                                    }
                                                >
                                                    <option value="">
                                                        Pilih Area
                                                    </option>
                                                    <option value="Regulating Dam">
                                                        Regulating Dam
                                                    </option>
                                                    <option value="Powerhouse">
                                                        Powerhouse
                                                    </option>
                                                    <option value="Tunnel">
                                                        Tunnel
                                                    </option>
                                                </select>
                                            </div>
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 rounded-md py-2 px-4 font-semibold text-white"
                                                onClick={handleUpdateReport}
                                            >
                                                Update Report
                                            </button>
                                        </div>
                                    ) : (
                                        <div>
                                            <h2 className="text-md mb-4 font-Bitter font-bold text-blue1">
                                                [
                                                {report.status.toLocaleUpperCase()}
                                                ]
                                            </h2>
                                            <h1 className="mb-4 font-Bitter text-2xl font-bold">
                                                {report.title}{" "}
                                            </h1>
                                            <p className="mb-2  font-Bitter">
                                                <span className="font-Bitter font-semibold">
                                                    Description:
                                                </span>{" "}
                                                {report.description}
                                            </p>
                                            <p className="mb-2">
                                                <span className="font-Bitter font-semibold">
                                                    Shift:
                                                </span>{" "}
                                                {report.shift}
                                            </p>
                                            <p className="mb-2">
                                                <span className="font-Bitter font-semibold">
                                                    Date:
                                                </span>{" "}
                                                {report.date}
                                            </p>
                                            <p className="mb-2">
                                                <span className="font-Bitter font-semibold">
                                                    Inspector ID:
                                                </span>{" "}
                                                {report.id}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="my-2 rounded-md border p-2 font-Bitter">
                                <h2 className="mb-4 text-xl font-semibold">
                                    Weather Data
                                </h2>
                                <ul>
                                    {weatherData.map((weather) => (
                                        <li key={weather.id}>
                                            {weather.temperature}°C -{" "}
                                            {weather.cuaca}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <ChartDurasiKerja
                                idReport={idReport}
                                tokens={tokens}
                                durasikerja={durasikerja}
                            />
                            <ChartPerlatan
                                idReport={idReport}
                                tokens={tokens}
                                durasikerja={peralatan}
                            />
                            <ChartPekerja
                                idReport={idReport}
                                tokens={tokens}
                                durasikerja={pekerja}
                            />
                            {/* <KendalaChart data={kendala}/> */}
                            <div className="py-4">
                                <div>
                                   
                                </div>
                                <h2 className="mb-4 text-xl font-semibold">
                                    Obstacle List
                                </h2>
                                <div className="overflow-x-auto shadow-lg ">
                                    <table className="border-gray-500 w-full table-auto  border-collapse border">
                                        <thead>
                                            <tr className="bg-gray-100">
                                                <th className="border-gray-500 border px-4 py-1">
                                                    No
                                                </th>
                                                <th className="border-gray-500 border px-4 py-1">
                                                    Obstacle Name
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {kendala.map((item, index) => (
                                                <tr
                                                    key={item.id}
                                                    className="hover:bg-gray-50"
                                                >
                                                    <td className="border-gray-500 border px-4 py-1">
                                                        {index + 1}
                                                    </td>
                                                    <td className="border-gray-500 border px-4 py-1">
                                                        {item.name}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )}

                    {/* <p className="mb-2"><span className="font-semibold">Inspector ID:</span> {report.status}</p> */}
                </div>

                <Tabs>
                    <TabList>
                        <Tab>
                            <h4 className="font-Bitter">Equipment</h4>
                        </Tab>
                        <Tab>
                            <h4 className="font-Bitter">Worker</h4>
                        </Tab>
                        <Tab>
                            <h4 className="font-Bitter">Working Duration</h4>
                        </Tab>
                        <Tab>
                            <h4 className="font-Bitter">Photo</h4>
                        </Tab>
                        <Tab>
                            <h4 className="font-Bitter">Obstacles</h4>
                        </Tab>
                        <Tab>
                            <h4 className="font-Bitter">Weather</h4>
                        </Tab>
                    </TabList>

                    <TabPanel>
                        <EquipmentForm
                            reportId={idReport}
                            chart={fetchPeralatan}
                        />
                    </TabPanel>
                    <TabPanel>
                        {/* <WorkerList reportId={idReport}/> */}
                        <WorkForm reportId={idReport} />
                    </TabPanel>
                    <TabPanel>
                        {/* <WorkerList reportId={idReport}/> */}
                        <WorkerHour reportId={idReport} chart={fetchDurasi} />
                    </TabPanel>
                    <TabPanel>
                        <ImageUrlForm reportIds={idReport} />
                    </TabPanel>
                    <TabPanel>
                        <Kendala reportId={idReport} />
                    </TabPanel>
                    <TabPanel>
                        <Weather reportId={idReport} />
                    </TabPanel>
                </Tabs>
            </div>
            {/* <EquipmentDetails reportId={idReport}/> */}
            {/* <EquipmentReport token={tokens} reportId={idReport}/> */}
        </div>
    );
};

export default ReportDetail2;
