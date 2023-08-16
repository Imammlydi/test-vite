import React, { useEffect, useState } from "react";
import { BackButton, CardItem2, CardItem4 } from "../components";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchGetReportById } from "../services";
import CardItem5 from "../components/CardItem5";
import ModalReportWorker from "../components/ModalReportWorker";

const DetailReportWorker = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const idReport = state;
    // const[idReport,setIdReport] = useState()
    const [idWorker, setidWorker] = useState();
    const [works, setWorks] = useState([]);
    const [worker, setWorker] = useState([]);
    const [editF, setEditF] = useState(false);

    const handleGoBack = () => {
        navigate(-1);
    };

    const BackButtonx = () => {
        return (
            <a onClick={handleGoBack}>
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M8.82826 19.6049L0.35315 10.9136C0.224739 10.7819 0.133567 10.6392 0.0796345 10.4856C0.025702 10.3319 -0.000836007 10.1673 2.00644e-05 9.99174C2.00644e-05 9.81616 0.0269866 9.65155 0.0809191 9.49792C0.134852 9.34428 0.225595 9.20162 0.35315 9.06993L8.82826 0.378553C9.06368 0.137125 9.35817 0.0111447 9.71173 0.000609745C10.0653 -0.00992526 10.37 0.116055 10.626 0.378553C10.8828 0.61998 11.0168 0.921984 11.0279 1.28456C11.0391 1.64714 10.9158 1.95968 10.6581 2.22218L4.36599 8.67487H18.7159C19.0797 8.67487 19.3849 8.80129 19.6315 9.05413C19.878 9.30697 20.0009 9.61951 20 9.99174C20 10.3649 19.8771 10.6778 19.6315 10.9307C19.3858 11.1835 19.0806 11.3095 18.7159 11.3086H4.36599L10.6581 17.7613C10.8935 18.0027 11.0168 18.31 11.0279 18.6831C11.0391 19.0562 10.9158 19.3635 10.6581 19.6049C10.4227 19.8683 10.1231 20 9.75924 20C9.39541 20 9.08508 19.8683 8.82826 19.6049Z"
                        fill="black"
                    />
                </svg>
            </a>
        );
    };

    const editFn = () => {
        return setEditF(true);
    };
    const createFn = () => {
        return setEditF(false);
    };

    const Item = ({
        title,
        type,
        subtype,
        state,
        to,
        bacColor,
        textColor,
        iconColor,
        childern,
    }) => {
        return (
            <>
                <div
                    className={` flex items-center justify-between rounded-lg py-0 px-4 `}
                >
                    <h5
                        className={`lg:text-md text-center font-Bitter text-sm font-bold  `}
                    >
                        {title}
                    </h5>
                </div>
                <div
                    className={`${bacColor} mx-2 mt-1 mb-0  grid grid-cols-2 rounded-md  px-10 py-2`}
                >
                    <div className="">
                        <div>
                            <p
                                className={`lg:text-md  whitespace-pre-line font-Bitter text-xs  font-bold text-${textColor}`}
                            >
                                {type}
                            </p>
                        </div>
                    </div>
                    <div className="">
                        <div>
                            <p
                                className={`lg:text-md  whitespace-pre-line font-Bitter text-xs  font-bold text-${textColor}`}
                            >
                                {subtype}
                            </p>
                        </div>
                    </div>
                    {/* <div />
                    <div /> */}
                </div>
                {childern}
            </>
        );
    };
    const fetchGetReportById = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/report/viewReport/${idReport}`
            );
            const data = await response.json();
            console.log("----work", data.data[0].worker);
            // console.table(data.data[0].worker);
            // setImage(data.data[0].image);
            setWorker(data.data[0].worker);
            setWorks(data.data[0].image);
            // setWorkerHours(data.data[0].workerHours);
            // setEquipment(data.data[0].equipment);
            console.log("all datas", data.data[0].worker);
        } catch (error) {
            console.error(error);
        }
    };
    const fetchDeleteGetReportById = async (idWR) => {
        try {
            const response = await fetch(
                `http://localhost:5000/report/report/worker/${idWR}`,
                { method: "DELETE" }
            );
            await response.json();
            // const data = await response.json();
            console.log("deleted-------");
            //   return data
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        console.log(idReport, "======");
        // worker.map((x)=>{
        //     console.log('ReportID',x.id)
        //     console.log('ID',x.id)
        //     setidWorker(x.id)

        // })
        fetchGetReportById();
    }, []);

    useEffect(() => {
        console.log("all data work", worker);
    }, [worker, works]);
    const InputForm = () => {
        const [type_of_work, setType_of_work] = useState("");
        const [qtyW, setQtyW] = useState("");

        const handleSubmit = (e) => {
            e.preventDefault();

            // Mengirim data laporan ke API
            const data = {
                type_of_work,
                qtyW,
            };

            fetch(`http://localhost:5000/report/report/worker/${idReport}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((responseData) => {
                    console.log("Respon dari API:", responseData, data);
                    // Reset nilai input setelah pengiriman
                    setType_of_work("");
                    setQtyW("");
                    window.location.reload();
                })
                .catch((error) => {
                    console.error("Terjadi kesalahan:", error);
                });
        };

        return (
            <form onSubmit={handleSubmit} className="mx-auto max-w-md">
                <div className="">
                    <div>
                        <button className=" " onClick={() => createFn()}>
                            <svg
                                width="20"
                                height="21"
                                viewBox="0 0 20 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M13.8914 1.04831C14.5624 0.377184 15.4725 9.37857e-05 16.4215 1.74917e-08C17.3705 -9.37507e-05 18.2807 0.376816 18.9519 1.04781C19.623 1.71881 20.0001 2.62893 20.0002 3.57796C20.0003 4.52699 19.6234 5.43718 18.9524 6.10831L18.0604 7.00131L13.0004 1.94031L13.8914 1.04831ZM11.9404 3.00131L1.94036 13.0003C1.53415 13.4066 1.24856 13.9175 1.11536 14.4763L0.0203556 19.0783C-0.00929281 19.203 -0.00651306 19.3331 0.0284298 19.4564C0.0633727 19.5797 0.129314 19.6919 0.219964 19.7825C0.310614 19.873 0.42295 19.9389 0.546259 19.9737C0.669568 20.0085 0.799738 20.0111 0.924356 19.9813L5.52536 18.8853C6.08454 18.7523 6.59584 18.4667 7.00236 18.0603L17.0004 8.06131L11.9404 3.00131Z"
                                    fill="#25C351"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                <h2 className="font-Bitter font-bold">
                    {!editF ? " Create Report Worker" : "Edit"}
                </h2>
                <div className="mb-4">
                    <label
                        htmlFor="type_of_work"
                        className="text-gray-700  mb-2 block font-Bitter font-bold"
                    >
                        Nama Pekerjaan
                    </label>
                    <input
                        type="text"
                        id="type_of_work"
                        className="border-gray-300 text-gray-700 focus:border-blue-500 w-full rounded border py-2 px-3 font-Bitter leading-tight focus:outline-none"
                        placeholder="Masukkan nama pekerjaan"
                        value={type_of_work}
                        onChange={(e) => setType_of_work(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="qtyW"
                        className="text-gray-700 mb-2 block font-Bitter font-bold"
                    >
                        Jumlah Pekerja
                    </label>
                    <input
                        type="number"
                        id="qtyW"
                        className="border-gray-300 text-gray-700 focus:border-blue-500 w-full rounded   border py-2 px-3 font-Bitter leading-tight focus:outline-none"
                        placeholder="Masukkan jumlah pekerja"
                        value={qtyW}
                        onChange={(e) => setQtyW(e.target.value)}
                        required
                    />
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 focus:shadow-outline rounded py-2 px-4 font-bold text-blue1 focus:outline-none"
                        //   onClick={fetchGetCreateReportWorker}
                    >
                        {!editF ? " Create Report Worker" : "Edit"}
                    </button>
                </div>
            </form>
        );
    };

    return (
        <div className=" min-h-screen  w-full w-screen  ">
            <div className="  py-5 pl-2 md:pl-4 lg:pl-5 xl:pl-5 ">
                <BackButtonx />
            </div>
            <div className=" mx-auto grid grid-cols-1 gap-4 px-4 pt-1 md:grid-cols-1 md:px-8 lg:max-w-7xl lg:grid-cols-2 lg:gap-2 ">
                <div>
                    <InputForm />
                </div>
                <div className="">
                    <Item
                        iconColor={"white"}
                        subtype={
                            worker.length > 0 ? "Working name " : "no data"
                        }
                        title={"Worker"}
                        type={worker.length > 0 ? "Working name " : "no data"}
                        bacColor={"bg-blue1"}
                        textColor={"white"}
                        childern={worker.map((datax, index) => (
                            <div className=" mx-2 mt-1 mb-0  grid grid-cols-4 items-center  rounded-md px-10 py-2 ">
                                <>
                                    <div className="">
                                        <div>
                                            <p className="lg:text-md  whitespace-pre-line font-Bitter  text-xs ">
                                                {datax.type_of_work}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div>
                                            <p className="lg:text-md whitespace-pre-line text-center font-Bitter text-xs ">
                                                {datax.qtyW}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div>
                                            <ModalReportWorker />
                                            <button
                                                className=" "
                                                onClick={() => {
                                                    editFn();
                                                }}
                                            >
                                                <svg
                                                    width="20"
                                                    height="21"
                                                    viewBox="0 0 20 21"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M13.8914 1.04831C14.5624 0.377184 15.4725 9.37857e-05 16.4215 1.74917e-08C17.3705 -9.37507e-05 18.2807 0.376816 18.9519 1.04781C19.623 1.71881 20.0001 2.62893 20.0002 3.57796C20.0003 4.52699 19.6234 5.43718 18.9524 6.10831L18.0604 7.00131L13.0004 1.94031L13.8914 1.04831ZM11.9404 3.00131L1.94036 13.0003C1.53415 13.4066 1.24856 13.9175 1.11536 14.4763L0.0203556 19.0783C-0.00929281 19.203 -0.00651306 19.3331 0.0284298 19.4564C0.0633727 19.5797 0.129314 19.6919 0.219964 19.7825C0.310614 19.873 0.42295 19.9389 0.546259 19.9737C0.669568 20.0085 0.799738 20.0111 0.924356 19.9813L5.52536 18.8853C6.08454 18.7523 6.59584 18.4667 7.00236 18.0603L17.0004 8.06131L11.9404 3.00131Z"
                                                        fill="#25C351"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div>
                                            <button
                                                className=" "
                                                onClick={() =>
                                                    fetchDeleteGetReportById(
                                                        datax.id
                                                    )
                                                }
                                            >
                                                <svg
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M10 0C15.53 0 20 4.47 20 10C20 15.53 15.53 20 10 20C4.47 20 0 15.53 0 10C0 4.47 4.47 0 10 0ZM15 5H12.5L11.5 4H8.5L7.5 5H5V7H15V5ZM7 16H13C13.2652 16 13.5196 15.8946 13.7071 15.7071C13.8946 15.5196 14 15.2652 14 15V8H6V15C6 15.2652 6.10536 15.5196 6.29289 15.7071C6.48043 15.8946 6.73478 16 7 16Z"
                                                        fill="#FF0000"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </>
                            </div>
                        ))}
                    />
                </div>
            </div>
        </div>
    );
};

export default DetailReportWorker;
