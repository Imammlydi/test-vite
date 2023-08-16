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
import ImageUrlForm2 from "../components/ImageUrlForm2";
import { getKendalabyReportId } from "../services/kendala";
import axios from "axios";

const styles = StyleSheet.create({
    page: {
        flexDirection: "row",
        backgroundColor: "white",
        // padding: 20
    },
    section: {
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
    },
    text1: {
        fontSize: 14,
        marginVertical: 5,

        textAlign: "center",
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
        // backgroundColor:'red'
        // justifyContent: "space-between",
        // width:700
    },
});

// import ReportAPI from './ReportAPI';

const ReportDetail3 = () => {
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
    const fetchKendala = async () => {
        const data = await getKendalabyReportId(idReport, tokens);
        console.log("Kendala", data.data);
        setKendala(data.data);
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

    const PDFPreview = ({ datax }) => {
        const Table = () => {
            return (
                <>
                    <View>
                        <Text style={styles.text1}>Equipment</Text>
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
                                    Nama
                                </Text>
                                <Text
                                    style={[styles.headerText, styles.cellText]}
                                >
                                    Qty
                                </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.cellTextNo}>1</Text>
                                <Text style={styles.cellTextItem}>
                                    John Doe
                                </Text>
                                <Text style={styles.cellTextItem}>30</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.cellTextNo}>2</Text>
                                <Text style={styles.cellTextItem}>
                                    Jane Smith
                                </Text>
                                <Text style={styles.cellTextItem}>25</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.cellTextNo}>3</Text>
                                <Text style={styles.cellTextItem}>
                                    Mike Johnson
                                </Text>
                                <Text style={styles.cellTextItem}>35</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.cellTextNo}>1</Text>
                                <Text style={styles.cellTextItem}>
                                    John Doe
                                </Text>
                                <Text style={styles.cellTextItem}>30</Text>
                            </View>
                        </View>
                    </View>
                </>
            );
        };
        // <PDFViewer style={{ width: '100%', height: '100vh' }}>
        return (
            <Document>
                <Page size="A4" style={styles.page} orientation="landscape">
                    <View style={styles.section}>
                        <Text style={styles.title}>{datax.title}</Text>
                        <Text>{datax.description}</Text>
                        <Text>{datax.shift}</Text>
                        <Text>{datax.date}</Text>

                        <View style={styles.con1}>
                            <Table />
                            <Table />
                        </View>
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

    const { id } = useParams();
    const [report, setReport] = useState(null);
    const { state } = useLocation();
    const idReport = state;
    const [loading, setLoading] = useState(false);
    const [reloadChart, setReloadChart] = useState(false);
    const tokens = localStorage.getItem("token");

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
                setReport(data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching report:", error);
                setLoading(true);
            }
            console.log(tokens, idReport);
        };

        fetchReport();
    }, [id, reloadChart]);

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
                    {/* <PDFDownloadLink
                        document={<PDFPreview datax={data} />}
                        fileName={`${tanggalSekarangs}report.pdf`}
                    >
                        {({ blob, url, loading, error }) =>
                            loading ? "Loading document..." : "Download PDF"
                        }
                    </PDFDownloadLink> */}

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
                                <h2 className="text-md mb-4 font-Bitter font-bold text-blue1">
                                    [{report.status.toLocaleUpperCase()}]
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
                                    {report.inspector_id}
                                </p>
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
                <ImageUrlForm2 reportIds={idReport} />

                {/* <Tabs>
                    <TabList>
                        <Tab>
                            <h4 className="font-Bitter">Peralatan</h4>
                        </Tab>
                        <Tab>
                            <h4 className="font-Bitter">Pekerja</h4>
                        </Tab>
                        <Tab>
                            <h4 className="font-Bitter">Durasi Kerja</h4>
                        </Tab>
                        <Tab>
                            <h4 className="font-Bitter">Photo</h4>
                        </Tab>
                    </TabList>

                    <TabPanel>
                        <EquipmentForm
                            reportId={idReport}
                            chart={fetchPeralatan}
                        />
                    </TabPanel>
                    <TabPanel>
                        <WorkForm reportId={idReport} />
                    </TabPanel>
                    <TabPanel>
                        <WorkerHour reportId={idReport} chart={fetchDurasi} />
                    </TabPanel>
                    <TabPanel>
                        <ImageUrlForm reportIds={idReport} />
                    </TabPanel>
                </Tabs> */}
            </div>
            {/* <EquipmentDetails reportId={idReport}/> */}
            {/* <EquipmentReport token={tokens} reportId={idReport}/> */}
        </div>
    );
};

export default ReportDetail3;
