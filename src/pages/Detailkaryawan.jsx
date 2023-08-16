import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import HitungJamKerja from "../components/HitungJamKerja";
import ExcelExport from "../components/ExcelExport";
// import { PDFDownloadLink } from 'react-html2pdf';
import { formatUang } from "../services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

const API_URL = "http://127.0.0.1:8000/api";

function DetailKaryawan() {
    const notifsuccess = () =>
        toast.success(
            `berhasil tamabah lembur untuk ${namaKaryawan}: masuk-${selectedTime}, keluar-${selectedTimeEnd}`,
            {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            }
        );

    const notifyerror = () =>
        toast.error(
            "Cek Tanggal, Jam Masuk dan keluar; Tidak boleh kosong!!!!!",
            {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            }
        );

    const [startHour, setStartHour] = useState(0);
    const [startMinute, setStartMinute] = useState(0);
    const [endHour, setEndHour] = useState(0);
    const [endMinute, setEndMinute] = useState(0);
    const [totalHours, setTotalHours] = useState(0);
    const [totalMinutes, setTotalMinutes] = useState(0);
    const [totalSalary, setTotalSalary] = useState(0);

    const [selectedTime, setSelectedTime] = useState("");
    const [selectedTimeEnd, setSelectedTimeEnd] = useState("");
    const [selectedTimeSiang, setSelectedTimeSiang] = useState("");
    const [selectedTimeEndSiang, setSelectedTimeEndSiang] = useState("");

    const [hour, minute] = selectedTime.split(":");
    const [hourEnd, minuteEnd] = selectedTimeEnd.split(":");

    const handleCalculate = () => {
        const start = parseInt(hour) * 60 + parseInt(minute);
        const end = parseInt(hourEnd) * 60 + parseInt(minuteEnd);
        let total = end - start;
        if (total < 0) {
            total += 24 * 60; // Menghitung total jam jika melintasi tengah malam
        }
        const hours = Math.floor(total / 60);
        const minutes = total % 60;
        const salary = Math.floor((total / 60) * 15000);

        return salary;

        setTotalHours(hours);
        setTotalMinutes(minutes);
        setTotalSalary(salary);
    };
    const handleCalculateTotalhour = () => {
        const start = parseInt(hour) * 60 + parseInt(minute);
        const end = parseInt(hourEnd) * 60 + parseInt(minuteEnd);
        let total = end - start;
        if (total < 0) {
            total += 24 * 60; // Menghitung total jam jika melintasi tengah malam
        }
        const hours = Math.floor(total / 60);
        const minutes = total % 60;
        const salary = Math.floor((total / 60) * 15000);
        setTotalHours(hours);
        setTotalMinutes(minutes);
        setTotalSalary(salary);
        const totals = `${totalHours}:${totalMinutes}`;
        return total;
    };
    const handleCalculateTotalhour2 = () => {
        const [hour, minute] = selectedTimeSiang.split(":");
        const [hourEnd, minuteEnd] = selectedTimeEndSiang.split(":");
        const start = parseInt(hour) * 60 + parseInt(minute);
        const end = parseInt(hourEnd) * 60 + parseInt(minuteEnd);
        let total = end - start;
        if (total < 0) {
            total += 24 * 60; // Menghitung total jam jika melintasi tengah malam
        }
        const hours = Math.floor(total / 60);
        const minutes = total % 60;
        const salary = Math.floor((total / 60) * 15000);
        setTotalHours(hours);
        setTotalMinutes(minutes);
        setTotalSalary(salary);
        const totals = `${totalHours}:${totalMinutes}`;
        return total;
    };

    const start = parseInt(startHour) * 60 + parseInt(startMinute);
    const end = parseInt(endHour) * 60 + parseInt(endMinute);
    let total = end - start;
    if (total < 0) {
        total += 24 * 60; // Menghitung total jam jika melintasi tengah malam
    }
    const hours = Math.floor(total / 60);
    const minutes = total % 60;
    const salary = Math.floor((total / 60) * 15000);

    const token = localStorage.getItem("token");

    const { state } = useLocation();
    const allState = useLocation();
    const id_karywan = state;

    const [karyawan, setKaryawan] = useState([]);
    const [lemburMalam, setLemburMalam] = useState([]);
    const [lemburSm, setLemburSm] = useState([]);
    const [namaKaryawan, setNamaKaryawan] = useState("");
    const [jabatan, setJabatan] = useState("");
    const [tanggalLembur, setTanggalLembur] = useState("");
    const [tanggalLemburSiang, setTanggalLemburSiang] = useState("");
    const [mulai, setMulai] = useState("");
    const [selesai, setSelesai] = useState("");
    const [totalJam, setTotalJam] = useState(0);
    const [harga, setHarga] = useState(0);
    const [selectedKaryawan, setSelectedKaryawan] = useState("");
    const [totalL, setTotalL] = useState("");
    const [totalL2, setTotalL2] = useState("");

    useEffect(() => {
        console.log(token, "--------id ", id_karywan, selectedTime);
        console.log("--------id ", state, allState, "---------");
        // fetchKaryawan();
        fetchLemburMalam();
        fetchKaryawanById();
        fetchLemburSm();
    }, [token, id_karywan, tahun]);

    const fetchKaryawan = async () => {
        try {
            const response = await axios.get(`${API_URL}/karyawan`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setKaryawan(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };
    const fetchKaryawanById = async () => {
        try {
            const response = await axios.get(
                `${API_URL}/karyawan/${id_karywan}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // setKaryawan(response.data.data);
            console.log(response.data.data.nama_karyawan);
            console.log(response.data.data.jabatan);
            setNamaKaryawan(response.data.data.nama_karyawan);
            setJabatan(response.data.data.jabatan);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchLemburMalam = async () => {
        try {
            const response = await axios.get(
                `${API_URL}/lembur-malam-karyawan-date/${id_karywan}?bulan=${selectedMonth}&tahun=${selectedYear}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setLemburMalam(response.data.data);
            console.log(
                response.data,
                "--------",
                `${API_URL}/lembur-malam-karyawan/${id_karywan}`
            );
            setTotalL(response.data.jumlah_lembur);
        } catch (error) {
            console.error(error);
        }
    };
    const fetchLemburSm = async () => {
        try {
            const response = await axios.get(
                `${API_URL}/lembur-sm-karyawan-date/${id_karywan}?bulan=${selectedMonth}&tahun=${selectedYear}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setLemburSm(response.data.data);
            console.log(response.data, "--------");
            setTotalL2(response.data.jumlah_lembur);
        } catch (error) {
            console.error(error);
        }
    };

    const createKaryawan = async () => {
        try {
            const response = await axios.post(
                `${API_URL}/karyawan`,
                {
                    nama_karyawan: namaKaryawan,
                    jabatan: jabatan,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setKaryawan([...karyawan, response.data]);
            setNamaKaryawan("");
            setJabatan("");
        } catch (error) {
            console.error(error);
        }
    };

    const starts = `${hour}:${minute}`;
    const ends = `${hourEnd}:${minuteEnd}`;

    const createLemburMalam = async () => {
        const data = {
            tanggal_lembur: tanggalLembur,
            mulai: starts,
            selesai: ends,
            total_jam: handleCalculateTotalhour(),
            harga: handleCalculate(),
            karyawan_id: id_karywan,
        };

        console.log(data);
        try {
            const response = await axios.post(
                `${API_URL}/lembur-malam`,
                {
                    tanggal_lembur: tanggalLembur,
                    mulai: starts,
                    selesai: ends,
                    total_jam: handleCalculateTotalhour(),
                    harga: handleCalculate(),
                    karyawan_id: id_karywan,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setLemburMalam([...lemburMalam, response.data]);
            setTanggalLembur("");
            setMulai("");
            setSelesai("");
            setTotalJam(0);
            setHarga(0);
            setSelectedKaryawan("");
            notifsuccess();
            fetchLemburMalam();
        } catch (error) {
            console.error(error);
            notifyerror();
        }
    };

    const calculateTimeDifference = () => {
        const [startHour, startMinute] = selectedTimeSiang
            .split(":")
            .map(Number);
        const [endHour, endMinute] = selectedTimeEndSiang
            .split(":")
            .map(Number);

        let hourDiff = endHour - startHour;
        let minuteDiff = endMinute - startMinute;

        if (minuteDiff < 0) {
            minuteDiff += 60;
            hourDiff--;
        }

        const formattedHourDiff = hourDiff.toString().padStart(2, "0");
        const formattedMinuteDiff = minuteDiff.toString().padStart(2, "0");

        setTimeDifference(
            `${formattedHourDiff} jam ${formattedMinuteDiff} menit`
        );
    };

    const createLemburSm = async () => {
        const data = {
            tanggal_lembur: tanggalLemburSiang,
            mulai: selectedTimeSiang,
            selesai: selectedTimeEndSiang,
            total_jam: handleCalculateTotalhour2(),
            harga: selectedOption,
            karyawan_id: id_karywan,
        };
        console.log(data);
        try {
            const response = await axios.post(
                `${API_URL}/lembur-sabtu-minggu-merah`,
                {
                    tanggal_lembur: tanggalLemburSiang,
                    mulai: selectedTimeSiang,
                    selesai: selectedTimeEndSiang,
                    total_jam: handleCalculateTotalhour2(),
                    harga: selectedOption,
                    karyawan_id: id_karywan,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setLemburMalam([...lemburMalam, response.data]);
            setTanggalLemburSiang("");
            setMulai("");
            setSelesai("");
            setTotalJam(0);
            setSelectedOption(0);

            notifsuccess();
            fetchLemburSm();
        } catch (error) {
            console.error(error);
            notifyerror();
        }
    };

    const deleteLemburMalam = async (id) => {
        try {
            await axios.delete(`${API_URL}/lembur-malam/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setLemburMalam(lemburMalam.filter((item) => item.id !== id));
            fetchLemburMalam();
        } catch (error) {
            console.error(error);
        }
    };
    const deleteLemburSm = async (id) => {
        try {
            await axios.delete(`${API_URL}/lembur-sabtu-minggu-merah/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setLemburMalam(lemburMalam.filter((item) => item.id !== id));
            fetchLemburSm();
        } catch (error) {
            console.error(error);
        }
    };

    function convertMenitToJam(menit) {
        var jam = Math.floor(menit / 60); // Menghitung jam
        var sisaMenit = menit % 60; // Menghitung sisa menit

        // Format waktu menjadi "HH:MM"
        var waktu =
            ("0" + jam).slice(-2) +
            " jam , " +
            ("0" + sisaMenit).slice(-2) +
            "menit";
        return waktu;
    }

    var date = new Date();
    var bulan = ("0" + (date.getMonth() + 1)).slice(-2); // Mengambil bulan saat ini (dalam format 2 digit angka)
    var tahun = date.getFullYear(); // Mengambil tahun saat ini
    useEffect(() => {
        console.log("Bulan:", bulan);
        console.log("Tahun:", tahun);
    }, [token, bulan, tahun]);

    const [selectedMonth, setSelectedMonth] = useState(bulan);
    const [selectedYear, setSelectedYear] = useState(tahun);

    const MonthYearPicker = () => {
        const handleMonthChange = (e) => {
            setSelectedMonth(e.target.value);
            console.log(selectedMonth);
        };

        const handleYearChange = (e) => {
            setSelectedYear(e.target.value);
            console.log(selectedYear);
        };

        const generateMonthOptions = () => {
            const months = [
                { value: "01", label: "Januari" },
                { value: "02", label: "Februari" },
                { value: "03", label: "Maret" },
                { value: "04", label: "April" },
                { value: "05", label: "Mei" },
                { value: "06", label: "Juni" },
                { value: "07", label: "Juli" },
                { value: "08", label: "Agustus" },
                { value: "09", label: "September" },
                { value: "10", label: "Oktober" },
                { value: "11", label: "November" },
                { value: "12", label: "Desember" },
            ];

            return months.map((month) => (
                <option key={month.value} value={month.value}>
                    {month.label}
                </option>
            ));
        };

        const generateYearOptions = () => {
            const startYear = 2015;
            const endYear = 2024;
            const years = [];

            for (let year = startYear; year <= endYear; year++) {
                years.push(year);
            }

            return years.map((year) => (
                <option key={year} value={year}>
                    {year}
                </option>
            ));
        };

        return (
            <>
                <div className="my-4 rounded-lg border border-graydisable p-2 shadow-lg">
                    <div className=" grid grid-cols-1 items-center lg:grid-cols-4">
                        <div className="my-1">
                            {/* <label htmlFor="month" className="mr-2">
                    Bulan:
                </label> */}
                            <select
                                id="month"
                                value={selectedMonth}
                                onChange={handleMonthChange}
                                className="border-gray-300 mr-4 rounded border px-2 py-1"
                            >
                                <option value="">Pilih Bulan</option>
                                {generateMonthOptions()}
                            </select>
                        </div>
                        <div className="my-1">
                            {/* <label htmlFor="year" className="mr-2">
                    Tahun:
                </label> */}
                            <select
                                id="year"
                                value={selectedYear}
                                onChange={handleYearChange}
                                className="border-gray-300 rounded border px-2 py-1"
                            >
                                <option value="">Pilih Tahun</option>
                                {generateYearOptions()}
                            </select>
                        </div>
                    </div>
                    <button
                        className="m-2 border-blue1 text-blue1"
                        onClick={() => {
                            fetchLemburMalam(), fetchLemburSm();
                        }}
                    >
                        Filter
                    </button>
                </div>
            </>
        );
    };

    const options = [
        { label: "Lembur Sabtu Minggu", value: 60000 },
        { label: "Lembur Tanggal Merah", value: 100000 },
    ];

    const [selectedOption, setSelectedOption] = useState("");
    const handleChange = (e) => {
        setSelectedOption(e.target.value);
    };

    return (
        <div className="container mx-auto p-4">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <h2 className="mt-2 mb-0 font-Bitter text-2xl font-bold">
                Data Lembur
            </h2>
            <div className="mb-2 grid grid-cols-1 items-center gap-1 lg:grid-cols-3">
                <div className=" rounded-lg  p-2 shadow-md">
                    {/* <ExcelExport data={lemburMalam} /> */}
                    <div className=" font-Bitter text-lg ">
                        Nama :<p className="font-bold"> {namaKaryawan}</p>
                    </div>
                    <div className=" font-Bitter text-lg ">
                        Jabatan :<p className="font-bold"> {jabatan}</p>
                    </div>
                    {/* <p className="mb-4 font-Bitter text-lg">{jabatan}</p> */}
                </div>
                <div className="rounded-lg border-2 border-green1 p-2 shadow-md">
                    <div className=" font-Bitter text-lg ">
                        {" "}
                        Lembur Malam : <p className="font-bold">{totalL}</p>
                    </div>
                    <div className=" font-Bitter text-lg ">
                        Lembur Siang: <p className="font-bold">{totalL2}</p>
                    </div>
                </div>
            </div>

            <Tabs>
                <TabList>
                    <Tab>
                        <h4 className="font-Bitter">Lembur Malam</h4>
                    </Tab>
                    <Tab>
                        <h4 className="font-Bitter">Lembur Sabtu Minggu</h4>
                    </Tab>
                </TabList>

                <TabPanel>
                    <div className="grid grid-cols-1 gap-4 px-4 pt-8 md:grid-cols-3  md:px-8 lg:max-w-7xl lg:grid-cols-2">
                        <div className="rounded-lg border-2 border-graydisable2 p-3">
                            <div className="mb-4 flex flex-col ">
                                <p className="mb-2 mr-3 font-Bitter text-lg font-bold">
                                    Tambah lembur Malam
                                </p>
                                <div className="flex items-center px-2 shadow-lg ">
                                    <p className="mb-2 mr-3 font-Bitter font-bold text-blue1">
                                        Date
                                    </p>
                                    <input
                                        type="date"
                                        className="border-gray-300 my-2 mr-2 rounded-md border p-2"
                                        value={tanggalLembur}
                                        onChange={(e) =>
                                            setTanggalLembur(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="my-2 rounded-md border border-graydisable bg-white px-2 py-3 shadow-lg">
                                    <p className="mb-1 font-Bitter font-bold text-blue1">
                                        Masuk
                                    </p>
                                    <div>
                                        {/* <label htmlFor="startMinute">Menit : </label> */}
                                        <input
                                            id="time"
                                            type="time"
                                            value={selectedTime}
                                            onChange={(e) =>
                                                setSelectedTime(e.target.value)
                                            }
                                            className="border-gray-300 rounded border px-2 py-1"
                                        />
                                    </div>
                                </div>
                                <div className="my-2 rounded-md border border-graydisable bg-white px-2 py-3 shadow-lg">
                                    <p className="mb-1 font-Bitter font-bold text-blue1">
                                        Keluar
                                    </p>
                                    <div>
                                        {/* <label htmlFor="startMinute">Menit : </label> */}
                                        <input
                                            id="time"
                                            type="time"
                                            value={selectedTimeEnd}
                                            onChange={(e) =>
                                                setSelectedTimeEnd(
                                                    e.target.value
                                                )
                                            }
                                            className="border-gray-300 rounded border px-2 py-1"
                                        />
                                    </div>
                                </div>

                                <button
                                    className="bg-blue-500 rounded py-2 px-4 font-bold text-blue1 hover:bg-primary"
                                    onClick={createLemburMalam}
                                >
                                    Tambah Lembur Malam
                                </button>
                            </div>
                        </div>

                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-3">
                            <MonthYearPicker />
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <div className="border-gray-200 overflow-hidden border-b shadow sm:rounded-sm">
                                    <table className="divide-gray-200 min-w-full divide-y">
                                        <thead className="bg-blue1">
                                            <tr className="">
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left font-Bitter text-xs font-medium uppercase tracking-wider text-white"
                                                >
                                                    No
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left font-Bitter text-xs font-medium uppercase tracking-wider text-white"
                                                >
                                                    Tanggal
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left font-Bitter text-xs font-medium uppercase tracking-wider text-white"
                                                >
                                                    Masuk
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left font-Bitter text-xs font-medium uppercase tracking-wider text-white"
                                                >
                                                    Keluar
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left font-Bitter text-xs font-medium uppercase tracking-wider text-white"
                                                >
                                                    Total Jam
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left font-Bitter text-xs font-medium uppercase tracking-wider text-white "
                                                >
                                                    Harga
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="items-center px-6 py-3 text-left text-center font-Bitter text-xs font-medium uppercase tracking-wider text-white"
                                                >
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-gray-200 divide-y bg-white">
                                            {lemburMalam.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td className="whitespace-nowrap px-6 py-0 font-Bitter">
                                                        {index + 1}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-0 font-Bitter">
                                                        {item.tanggal_lembur}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-0 font-Bitter">
                                                        {item.mulai}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-0 font-Bitter">
                                                        {item.selesai}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-0 font-Bitter">
                                                        {convertMenitToJam(
                                                            item.total_jam
                                                        )}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-0 font-Bitter">
                                                        {item.harga}{" "}
                                                    </td>
                                                    {/* Rp. {item.harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}                                            </td> */}
                                                    <td className="whitespace-nowrap px-6 py-0 font-Bitter ">
                                                        <button
                                                            className="bg-red-500 hover:bg-red-700 rounded py-1 px-2 font-bold text-red1"
                                                            onClick={() =>
                                                                deleteLemburMalam(
                                                                    item.id
                                                                )
                                                            }
                                                        >
                                                            Hapus
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tbody>
                                            <tr className=" bg-graydisable shadow-lg">
                                                <td className="whitespace-nowrap px-6 py-2 font-Bitter "></td>
                                                <td className="whitespace-nowrap px-6 py-2 font-Bitter "></td>
                                                <td className="whitespace-nowrap px-6 py-2 font-Bitter "></td>
                                                <td className="whitespace-nowrap px-6 py-2 font-Bitter font-bold ">
                                                    Total
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-2 font-Bitter "></td>
                                                <td className="whitespace-nowrap px-6 py-2 font-Bitter font-bold  underline">
                                                    {totalL}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-2 font-Bitter "></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="my-5 max-w-sm px-5 py-2 shadow-lg">
                                    <h5 className="font-Bitter font-bold">
                                        Total lembur malam
                                    </h5>
                                    <h5 className="font-Bitter ">{totalL}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabPanel>

                {/* LEMBUR SABTU-MINGGU */}
                <TabPanel>
                    <div className="grid grid-cols-1 gap-4 px-4 pt-8 md:grid-cols-3  md:px-8 lg:max-w-7xl lg:grid-cols-2">
                        <div className="rounded-lg border-2 border-graydisable2 p-3">
                            <div className="mb-4 flex flex-col ">
                                <p className="mb-2 mr-3 font-Bitter text-lg font-bold">
                                    Tambah lembur Siang
                                </p>
                                <div className="flex items-center px-2 shadow-lg ">
                                    <p className="mb-2 mr-3 font-Bitter font-bold text-blue1">
                                        Date
                                    </p>
                                    <input
                                        type="date"
                                        className="border-gray-300 my-2 mr-2 rounded-md border p-2"
                                        value={tanggalLemburSiang}
                                        onChange={(e) =>
                                            setTanggalLemburSiang(
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div className="my-2 rounded-md border border-graydisable bg-white px-2 py-3 shadow-lg">
                                    <div>
                                        <label
                                            htmlFor="lemburSelect"
                                            className="mb-2 block"
                                        >
                                            Pilih jenis lebur Siang:
                                        </label>
                                        <select
                                            id="lemburSelect"
                                            className="border-gray-300 rounded border px-3 py-2"
                                            value={selectedOption}
                                            onChange={handleChange}
                                        >
                                            <option value="">
                                                Pilih jenis lembur
                                            </option>
                                            {options.map((option) => (
                                                <option
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="my-2 rounded-md border border-graydisable bg-white px-2 py-3 shadow-lg">
                                    <p className="mb-1 font-Bitter font-bold text-blue1">
                                        Masuk
                                    </p>
                                    <div>
                                        {/* <label htmlFor="startMinute">Menit : </label> */}
                                        <input
                                            id="time"
                                            type="time"
                                            value={selectedTimeSiang}
                                            onChange={(e) =>
                                                setSelectedTimeSiang(
                                                    e.target.value
                                                )
                                            }
                                            className="border-gray-300 rounded border px-2 py-1"
                                        />
                                    </div>
                                </div>

                                <div className="my-2 rounded-md border border-graydisable bg-white px-2 py-3 shadow-lg">
                                    <p className="mb-1 font-Bitter font-bold text-blue1">
                                        Keluar
                                    </p>
                                    <div>
                                        {/* <label htmlFor="startMinute">Menit : </label> */}
                                        <input
                                            id="time"
                                            type="time"
                                            value={selectedTimeEndSiang}
                                            onChange={(e) =>
                                                setSelectedTimeEndSiang(
                                                    e.target.value
                                                )
                                            }
                                            className="border-gray-300 rounded border px-2 py-1"
                                        />
                                    </div>
                                </div>

                                <button
                                    className="bg-blue-500 rounded py-2 px-4 font-bold text-blue1 hover:bg-primary"
                                    onClick={createLemburSm}
                                >
                                    Tambah Lembur Siang
                                </button>
                            </div>
                        </div>

                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-3">
                            <MonthYearPicker />
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <div className="border-gray-200 overflow-hidden border-b shadow sm:rounded-sm">
                                    <table className="divide-gray-200 min-w-full divide-y">
                                        <thead className="bg-blue1">
                                            <tr className="">
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left font-Bitter text-xs font-medium uppercase tracking-wider text-white"
                                                >
                                                    No
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left font-Bitter text-xs font-medium uppercase tracking-wider text-white"
                                                >
                                                    Tanggal
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left font-Bitter text-xs font-medium uppercase tracking-wider text-white"
                                                >
                                                    Masuk
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left font-Bitter text-xs font-medium uppercase tracking-wider text-white"
                                                >
                                                    Keluar
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left font-Bitter text-xs font-medium uppercase tracking-wider text-white"
                                                >
                                                    Total Jam
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left font-Bitter text-xs font-medium uppercase tracking-wider text-white "
                                                >
                                                    Harga
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="items-center px-6 py-3 text-left text-center font-Bitter text-xs font-medium uppercase tracking-wider text-white"
                                                >
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-gray-200 divide-y bg-white">
                                            {lemburSm.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td className="whitespace-nowrap px-6 py-0 font-Bitter">
                                                        {index + 1}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-0 font-Bitter">
                                                        {item.tanggal_lembur}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-0 font-Bitter">
                                                        {item.mulai}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-0 font-Bitter">
                                                        {item.selesai}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-0 font-Bitter">
                                                        {convertMenitToJam(
                                                            item.total_jam
                                                        )}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-0 font-Bitter">
                                                        {item.harga}{" "}
                                                    </td>
                                                    {/* Rp. {item.harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}                                            </td> */}
                                                    <td className="whitespace-nowrap px-6 py-0 font-Bitter ">
                                                        <button
                                                            className="bg-red-500 hover:bg-red-700 rounded py-1 px-2 font-bold text-red1"
                                                            onClick={() =>
                                                                deleteLemburSm(
                                                                    item.id
                                                                )
                                                            }
                                                        >
                                                            Hapus
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tbody>
                                            <tr className=" bg-graydisable shadow-lg">
                                                <td className="whitespace-nowrap px-6 py-2 font-Bitter "></td>
                                                <td className="whitespace-nowrap px-6 py-2 font-Bitter "></td>
                                                <td className="whitespace-nowrap px-6 py-2 font-Bitter "></td>
                                                <td className="whitespace-nowrap px-6 py-2 font-Bitter font-bold ">
                                                    Total
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-2 font-Bitter "></td>
                                                <td className="whitespace-nowrap px-6 py-2 font-Bitter font-bold  underline">
                                                    {totalL2}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-2 font-Bitter "></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="my-5 max-w-sm px-5 py-2 shadow-lg">
                                    <h5 className="font-Bitter font-bold">
                                        Total lembur malam
                                    </h5>
                                    <h5 className="font-Bitter ">{totalL2}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabPanel>
            </Tabs>

            {/* --------------------- */}
            <div className="mb-56 lg:mb-0"></div>
        </div>
    );
}

export default DetailKaryawan;
