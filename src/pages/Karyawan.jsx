import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import { formatUang } from "../services";
// import TimePicker from 'react-time-picker';
const API_URL = "http://127.0.0.1:8000/api";

function Karyawan() {
    const token = localStorage.getItem("token");

    const [karyawan, setKaryawan] = useState([]);
    const [lemburMalam, setLemburMalam] = useState([]);
    const [namaKaryawan, setNamaKaryawan] = useState("");
    const [jabatan, setJabatan] = useState("");
    const [namaKaryawanEdit, setNamaKaryawanEdit] = useState("");
    const [jabatanEdit, setJabatanEdit] = useState("");
    const [tanggalLembur, setTanggalLembur] = useState("");
    const [mulai, setMulai] = useState("");
    const [selesai, setSelesai] = useState("");
    const [totalJam, setTotalJam] = useState(0);
    const [harga, setHarga] = useState(0);
    const [selectedKaryawan, setSelectedKaryawan] = useState("");

    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    var date = new Date();
    var bulan = ("0" + (date.getMonth() + 1)).slice(-2); // Mengambil bulan saat ini (dalam format 2 digit angka)
    var tahun = date.getFullYear(); // Mengambil tahun saat ini
    useEffect(() => {
        console.log(token);
        fetchKaryawan();
        console.log("Bulan:", bulan);
        console.log("Tahun:", tahun);
        localStorage.setItem("bulan", selectedMonth),
            localStorage.setItem("tahun", selectedYear);
    }, [token, bulan, tahun]);

    const [selectedMonth, setSelectedMonth] = useState(bulan);
    const [selectedYear, setSelectedYear] = useState(tahun);

    const fetchKaryawan = async () => {
        try {
            const response = await axios.get(
                `${API_URL}/karyawan-date?bulan=${selectedMonth}&tahun=${selectedYear}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setKaryawan(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchLemburMalam = async (karyawanId) => {
        try {
            const response = await axios.get(
                `${API_URL}/lembur-malam-karyawan/${karyawanId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setLemburMalam(response.data);
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
    const editKaryawan = async (id) => {
        try {
            const response = await axios.put(
                `${API_URL}/karyawan/${id}`,
                {
                    nama_karyawan: namaKaryawanEdit,
                    jabatan: jabatanEdit,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setKaryawan([]);

            setNamaKaryawanEdit("");
            setJabatanEdit("");
            fetchKaryawan();
        } catch (error) {
            console.error(error);
        }
    };

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
                        onClick={fetchKaryawan}
                    >
                        Filter
                    </button>
                </div>
            </>
        );
    };

    //   ====================================================SEARCH
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        const results = karyawan.filter(
            (karyawan) =>
                karyawan.nama_karyawan
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                karyawan.jabatan
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
        setButtonClicked();
    };

    let isButtonClicked = false;

    function setButtonClicked() {
        isButtonClicked = true;
        console.log("Button is clicked: ", isButtonClicked);

        setTimeout(function () {
            isButtonClicked = false;
            console.log("Button is clicked: ", isButtonClicked);
        }, 10000);
    }

    const [editRow, setEditRow] = useState(null);

    const handleEdit = (index) => {
        setEditRow(index);
        console.log(index);
    };

    const Edit = ({ index }) => {
        return (
            <button
                className="bg-red-500 hover:bg-red-700 mr-5 rounded py-1 px-2 font-bold text-green1"
                onClick={() => {
                    handleEdit(index);
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                >
                    <path
                        fill="currentColor"
                        d="M10.733 2.56a1.914 1.914 0 0 1 2.707 2.708l-.733.734l-2.708-2.708l.734-.733Zm-1.44 1.441L3.337 9.955a1.65 1.65 0 0 0-.398.644l-.914 2.743a.5.5 0 0 0 .632.633L5.4 13.06c.243-.08.463-.217.644-.398L12 6.709L9.292 4Z"
                    />
                </svg>
            </button>
        );
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="mb-0 font-Bitter text-2xl font-bold">
                Data Karyawan
            </h1>
            <div className="grid grid-cols-1 gap-4 px-4 pt-8 md:grid-cols-3  md:px-8 lg:max-w-7xl lg:grid-cols-2">
                <div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 mb-1  py-2 px-4 font-Bitter text-sm font-bold  text-blue1"
                        onClick={toggleForm}
                    >
                        {showForm ? "X" : "Tambah Karyawan"}
                    </button>
                    {showForm && (
                        <div className="mb-4 rounded-lg border-2 border-graydisable2 p-3">
                            <input
                                type="text"
                                placeholder="Nama Karyawan"
                                className="border-gray-300 mr-2 rounded-lg border p-2"
                                value={namaKaryawan}
                                onChange={(e) =>
                                    setNamaKaryawan(e.target.value)
                                }
                            />
                            <input
                                type="text"
                                placeholder="Jabatan"
                                className="border-gray-300 mr-2 rounded-lg border p-2"
                                value={jabatan}
                                onChange={(e) => setJabatan(e.target.value)}
                            />
                            <button
                                className="bg-blue-500 hover:bg-blue-700 mt-2 rounded py-2 px-4 font-bold text-blue1"
                                onClick={createKaryawan}
                            >
                                Tambah Karyawan
                            </button>
                        </div>
                    )}
                    {karyawan.length > 0 && (
                        <>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Cari"
                                    value={searchTerm}
                                    className="border-gray-300  mr-2 mt-5 rounded-lg border p-2"
                                    onChange={handleInputChange}
                                />
                                <button
                                    onClick={handleSearch}
                                    className="border-blue1 text-blue1"
                                >
                                    Cari
                                </button>
                            </div>
                            <MonthYearPicker />
                        </>
                    )}

                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <div className="border-gray-200 overflow-hidden border-b shadow sm:rounded-sm">
                                <table className="divide-gray-200 min-w-full divide-y">
                                    <thead className="bg-blue1">
                                        <tr>
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
                                                Nama Karyawan
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left font-Bitter text-xs font-medium uppercase tracking-wider text-white "
                                            >
                                                Jabatan
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left font-Bitter text-xs font-medium uppercase tracking-wider text-white "
                                            >
                                                Lembur Malam
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left font-Bitter text-xs font-medium uppercase tracking-wider text-white "
                                            >
                                                Lembur Sabtu/Minggu
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
                                        {searchResults.length > 0
                                            ? searchResults.map(
                                                  (item, index) => (
                                                      <tr key={item.id}>
                                                          <td className="whitespace-nowrap px-6 py-0 font-Bitter">
                                                              {index + 1}
                                                          </td>
                                                          <td className="whitespace-nowrap px-6 py-0 font-Bitter">
                                                              {
                                                                  item.nama_karyawan
                                                              }
                                                              <Edit />
                                                          </td>
                                                          <td className="whitespace-nowrap px-6 py-0 font-Bitter">
                                                              {item.jabatan}
                                                          </td>
                                                          <td className="whitespace-nowrap px-6 py-0 font-Bitter">
                                                              {
                                                                  item.lembur_malam
                                                              }
                                                              {/* Rp. {formatUang(item.lembur_malam)},00 */}
                                                          </td>
                                                          <td className="whitespace-nowrap px-6 py-0 font-Bitter ">
                                                              {/* <button
                                                        className="bg-red-500 hover:bg-red-700 rounded py-1 px-2 font-bold text-blue1"
                                                        onClick={() =>
                                                          { 
                                                            
                                                            fetchLemburMalam(
                                                                item.id
                                                            )
                                                          }
                                                        }
                                                    >
                                                        Lihat Lembur Malam
                                                    </button> */}

                                                              <Link
                                                                  to={`/detailLembur`}
                                                                  state={{
                                                                      id: item.id,
                                                                      bulan: selectedMonth,
                                                                  }}
                                                                  //   onClick={()=>{
                                                                  //     localStorage.setItem('bulan',selectedMonth),
                                                                  //     localStorage.setItem('tahun',selectedYear)
                                                                  //   }}
                                                              >
                                                                  View
                                                              </Link>
                                                          </td>
                                                      </tr>
                                                  )
                                              )
                                            : karyawan.map((item, index) => (
                                                  <tr key={item.id}>
                                                      <td className="whitespace-nowrap px-6 py-0 font-Bitter">
                                                          {index + 1}
                                                      </td>
                                                      <td className="whitespace-nowrap px-6 py-0 font-Bitter">
                                                          {editRow == index
                                                              ? null
                                                              : item.nama_karyawan}
                                                          {editRow == index ? (
                                                              <input
                                                                  className="w-20 rounded border px-2 py-1"
                                                                  type="text"
                                                                  placeholder={
                                                                      item.nama_karyawan
                                                                  }
                                                                  value={
                                                                      namaKaryawanEdit
                                                                  }
                                                                  onChange={(
                                                                      e
                                                                  ) =>
                                                                      setNamaKaryawanEdit(
                                                                          e
                                                                              .target
                                                                              .value
                                                                      )
                                                                  }
                                                              />
                                                          ) : null}
                                                          {editRow ==
                                                          index ? null : (
                                                              <Edit
                                                                  index={index}
                                                              />
                                                          )}
                                                      </td>
                                                      <td className="whitespace-nowrap px-6 py-0 font-Bitter">
                                                          {editRow == index
                                                              ? null
                                                              : item.jabatan}
                                                          {editRow == index ? (
                                                              <input
                                                                  className="w-20 rounded border px-2 py-1"
                                                                  type="text"
                                                                  placeholder={
                                                                      item.jabatan
                                                                  }
                                                                  onChange={(
                                                                      e
                                                                  ) =>
                                                                      setJabatanEdit(
                                                                          e
                                                                              .target
                                                                              .value
                                                                      )
                                                                  }
                                                                  value={
                                                                      jabatanEdit
                                                                  }
                                                              />
                                                          ) : null}
                                                          {editRow == index ? (
                                                              <button
                                                                  className="my-1 ml-1 border-green1 text-green1"
                                                                  onClick={() =>
                                                                      editKaryawan(
                                                                          item.id
                                                                      )
                                                                  }
                                                              >
                                                                  Edit
                                                              </button>
                                                          ) : (
                                                              <Edit
                                                                  index={index}
                                                              />
                                                          )}
                                                      </td>
                                                      <td className="whitespace-nowrap px-6 py-0 font-Bitter">
                                                          {item.lembur_malam}
                                                          {/* Rp. {formatUang(item.lembur_malam)},00 */}
                                                      </td>
                                                      <td className="whitespace-nowrap px-6 py-0 font-Bitter">
                                                          {item.lembur_sm}
                                                          {/* Rp. {formatUang(item.lembur_malam)},00 */}
                                                      </td>
                                                      <td className="whitespace-nowrap px-6 py-0 font-Bitter ">
                                                          <Link
                                                              to={`/detailLembur`}
                                                              state={item.id}
                                                          >
                                                              View
                                                          </Link>
                                                      </td>
                                                  </tr>
                                              ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <h2 className="mt-8 mb-4 text-2xl font-bold">Data Lembur Malam</h2>
            <div className="mb-4">
                <input
                    type="date"
                    className="border-gray-300 mr-2 border p-2"
                    value={tanggalLembur}
                    onChange={(e) => setTanggalLembur(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Mulai"
                    className="border-gray-300 mr-2 border p-2"
                    value={mulai}
                    onChange={(e) => setMulai(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Selesai"
                    className="border-gray-300 mr-2 border p-2"
                    value={selesai}
                    onChange={(e) => setSelesai(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Total Jam"
                    className="border-gray-300 mr-2 border p-2"
                    value={totalJam}
                    onChange={(e) => setTotalJam(parseInt(e.target.value))}
                />
                <input
                    type="number"
                    placeholder="Harga"
                    className="border-gray-300 mr-2 border p-2"
                    value={harga}
                    onChange={(e) => setHarga(parseFloat(e.target.value))}
                />
                <select
                    className="border-gray-300 mr-2 border p-2"
                    value={selectedKaryawan}
                    onChange={(e) => setSelectedKaryawan(e.target.value)}
                >
                    <option value="">Pilih Karyawan</option>
                    {karyawan.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.nama_karyawan}
                        </option>
                    ))}
                </select>
                <button
                    className="bg-blue-500 hover:bg-blue-700 rounded py-2 px-4 font-bold text-blue1"
                    onClick={createLemburMalam}
                >
                    Tambah Lembur Malam
                </button>
            </div>
            <table className="w-full table-auto">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Tanggal Lembur</th>
                        <th className="border px-4 py-2">Mulai</th>
                        <th className="border px-4 py-2">Selesai</th>
                        <th className="border px-4 py-2">Total Jam</th>
                        <th className="border px-4 py-2">Harga</th>
                        <th className="border px-4 py-2">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {lemburMalam.map((item) => (
                        <tr key={item.id}>
                            <td className="border px-4 py-2">
                                {item.tanggal_lembur}
                            </td>
                            <td className="border px-4 py-2">{item.mulai}</td>
                            <td className="border px-4 py-2">{item.selesai}</td>
                            <td className="border px-4 py-2">
                                {item.total_jam}
                            </td>
                            <td className="border px-4 py-2">{item.harga}</td>
                            <td className="border px-4 py-2">
                                <button
                                    className="bg-red-500 hover:bg-red-700 rounded py-1 px-2 font-bold text-blue1"
                                    onClick={() => deleteLemburMalam(item.id)}
                                >
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
        </div>
    );
}

export default Karyawan;
