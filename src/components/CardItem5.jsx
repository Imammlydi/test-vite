import React, { useState, useEffect } from "react";
import Button1 from "./Button1";
import ModalReportWorker from "./ModalReportWorker";
import ModalImage from "react-modal-image";
import { useLocation, Link } from "react-router-dom";

const CardItem5 = ({ title, desc, date, href }) => {
    const { state } = useLocation();
    const idReport = state;
    const [image, setImage] = useState([]);
    const [worker, setWorker] = useState([]);
    const [workerHours, setWorkerHours] = useState([]);
    const [equipment, setEquipment] = useState([]);
    const [selectedFile, setSelectedFile] = useState([]);

    const initialFormStateImage = {
        // id: "",
        // length: null,
        imageUrl: "",
    };

    const changeHandler = (event) => {
        setSelectedFile(event.target.files);
        // setSelectedFile(Array.from(event.target.files));
        // setIsSelected(true);
        console.log("called", selectedFile[0]);
    };

    const formData = new FormData();

    // formData.append('image', selectedFile);
    for (let i = 0; i < selectedFile.length; i++) {
        formData.append("image", selectedFile[i]);
    }

    const [data, setData] = useState(initialFormStateImage);

    const onSubmitData = (event) => {
        event.preventDefault();
    };

    // `http://localhost:5000/${image.imageUrl}`
    const fetchGetReportById = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/report/viewReport/${idReport}`
            );
            const data = await response.json();
            console.log("----image", data.data[0].image);
            // console.table(data.data[0].worker);
            setImage(data.data[0].image);
            setWorker(data.data[0].worker);
            setWorkerHours(data.data[0].workerHours);
            setEquipment(data.data[0].equipment);
            console.log("all datas", data.data[0]);
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
        fetchGetReportById();
        console.log(idReport);
    }, [idReport]);
    useEffect(() => {
        console.log("image is =", image, worker, workerHours, equipment);
        worker.map((w) => {
            console.log(w.id);
            console.log(w.type_of_work);
        });
    }, [image, worker, workerHours, equipment]);

    const ButtonDelete = (onClick) => {
        return (
            <>
                <button
                    className="bg-transparent flex justify-center rounded border-none hover:bg-blue1"
                    onClick={onClick}
                >
                    <svg
                        width="16"
                        height="18"
                        viewBox="0 0 16 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M8 10.9L9.9 12.8C10.1 12.9833 10.3377 13.075 10.613 13.075C10.8883 13.075 11.1173 12.9833 11.3 12.8C11.5 12.6 11.6 12.3623 11.6 12.087C11.6 11.8117 11.5 11.5827 11.3 11.4L9.4 9.5L11.3 7.6C11.5 7.4 11.6 7.16234 11.6 6.887C11.6 6.61167 11.5 6.38267 11.3 6.2C11.1167 6 10.8873 5.9 10.612 5.9C10.3367 5.9 10.0993 6 9.9 6.2L8 8.1L6.1 6.2C5.91667 6 5.68734 5.9 5.412 5.9C5.13667 5.9 4.89934 6 4.7 6.2C4.51667 6.38334 4.425 6.61267 4.425 6.888C4.425 7.16334 4.51667 7.40067 4.7 7.6L6.6 9.5L4.7 11.4C4.51667 11.5833 4.425 11.8127 4.425 12.088C4.425 12.3633 4.51667 12.6007 4.7 12.8C4.9 12.9833 5.13767 13.075 5.413 13.075C5.68834 13.075 5.91734 12.9833 6.1 12.8L8 10.9ZM3 18C2.45 18 1.979 17.804 1.587 17.412C1.195 17.02 0.999337 16.5493 1 16V3C0.71667 3 0.479004 2.904 0.287004 2.712C0.0950036 2.52 -0.000663206 2.28267 3.4602e-06 2C3.4602e-06 1.71667 0.0960036 1.479 0.288004 1.287C0.480004 1.095 0.717337 0.999337 1 1H5C5 0.71667 5.096 0.479003 5.288 0.287003C5.48 0.0950034 5.71734 -0.000663206 6 3.46021e-06H10C10.2833 3.46021e-06 10.521 0.0960036 10.713 0.288004C10.905 0.480004 11.0007 0.717337 11 1H15C15.2833 1 15.521 1.096 15.713 1.288C15.905 1.48 16.0007 1.71734 16 2C16 2.28334 15.904 2.521 15.712 2.713C15.52 2.905 15.2827 3.00067 15 3V16C15 16.55 14.804 17.021 14.412 17.413C14.02 17.805 13.5493 18.0007 13 18H3Z"
                            fill="#ED1C24"
                        />
                    </svg>
                </button>
            </>
        );
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
        childdern2,
    }) => {
        return (
            <>
                <div
                    className={`  flex items-center justify-between rounded-lg bg-graydisable py-2 px-4`}
                >
                    <h5
                        className={`lg:text-md text-center font-Bitter text-sm font-bold  `}
                    >
                        {title}
                    </h5>
                    <Link className="p-1" to={to} state={state}>
                        <svg
                            width="19"
                            height="19"
                            viewBox="0 0 19 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M16.3 6.175L12.05 1.975L13.45 0.575C13.8333 0.191667 14.3043 0 14.863 0C15.4217 0 15.8923 0.191667 16.275 0.575L17.675 1.975C18.0583 2.35833 18.2583 2.821 18.275 3.363C18.2917 3.905 18.1083 4.36733 17.725 4.75L16.3 6.175ZM14.85 7.65L4.25 18.25H0V14L10.6 3.4L14.85 7.65Z"
                                fill={`${iconColor}`}
                            />
                        </svg>
                    </Link>
                    {childdern2}
                </div>
                <div
                    className={`${bacColor} mx-2 mt-1 mb-0  grid grid-cols-2 rounded-md  px-10 py-2 `}
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

    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(e.target.files);
        //   setSelectedFiles(files);
        console.log(selectedFiles);
    };

    const handleUpload = () => {
        // Logika untuk mengunggah file ke server
        console.log(selectedFiles);
        // Reset pilihan file setelah mengunggah
        setSelectedFiles([]);
    };

    const formDatas = new FormData();
    // selectedFiles.forEach((file) => {
    //   formData.append('image', file);
    // });
    for (let i = 0; i < selectedFiles.length; i++) {
        formDatas.append("image", selectedFiles[i]);
    }
    // console.log(formDatas);
    const fetchGetReportImageById = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/report/report/image/${idReport}`,
                {
                    method: "post",
                    // headers: {
                    //     'Content-Type': 'multipart/form-data',
                    //   },

                    body: formDatas,
                }
            );
            const data = await response.json();
            // window.location.reload(false);
            // console.table(Object.fromEntries(formData));
            // console.table(selectedFile,data);
            console.log(data);
            console.log("-----", JSON.stringify(formDatas));
        } catch (error) {
            console.error(error);
        }
    };
    const sendData = () => {
        console.log(selectedFiles);
        console.log(data);
        fetchGetReportImageById();
    };

    return (
        <>
            <div className="mx-auto grid grid-cols-1 gap-4 px-4 pt-1 md:grid-cols-2 md:px-8 lg:max-w-7xl lg:grid-cols-2 lg:gap-10">
                <div className="rounded-md border p-2 ">
                    <div className="mb-2  flex justify-center   rounded-md border border-graydisable p-1 align-middle">
                        <label
                            htmlFor="upload-button"
                            className="bg-blue-500 hover:bg-blue-700 cursor-pointer rounded  px-4 py-3 font-bold text-white"
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M14 11V14H2V11H0V14C0 15.1 0.9 16 2 16H14C15.1 16 16 15.1 16 14V11H14ZM3 5L4.41 6.41L7 3.83V12H9V3.83L11.59 6.41L13 5L8 0L3 5Z"
                                    fill="black"
                                />
                            </svg>
                        </label>
                        <input
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            id="upload-button"
                            className="hidden"
                        />

                        {selectedFiles && (
                            <span className="ml-2">{selectedFiles.name}</span>
                        )}
                        <button onClick={sendData}>Unggah</button>
                    </div>
                    <div className="mx-auto grid grid-cols-5 gap-1 px-4 pt-1 md:grid-cols-4 md:px-8 lg:max-w-7xl lg:grid-cols-5 lg:gap-2 ">
                        {image.map((image, index) => (
                            <div className=" ">
                                <Link
                                    to={"/detail_image"}
                                    state={image.imageUrl}
                                >
                                    <img
                                        src={`http://localhost:5000/${image.imageUrl}`}
                                        alt={`Image ${index + 1}`}
                                        className="h-40 w-full cursor-pointer rounded object-cover "
                                    />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="">
                    <Item
                        to={"/detail_worker"}
                        childdern2={<ModalReportWorker />}
                        state={idReport}
                        iconColor={"white"}
                        subtype={
                            worker.length > 0 ? "Working name " : "no data"
                        }
                        title={"Worker"}
                        type={worker.length > 0 ? "Working name " : "no data"}
                        bacColor={"bg-blue1"}
                        textColor={"white"}
                        childern={worker.map((datax, index) => (
                            <div className=" mx-2 mt-1 mb-0  grid grid-cols-3 items-center rounded-md  px-10 py-2 ">
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
                <div className="">
                    <Item
                        iconColor={"white"}
                        subtype={
                            workerHours.length > 0 ? "Working name " : "no data"
                        }
                        title={"Worker Hours"}
                        type={
                            workerHours.length > 0 ? "Working name " : "no data"
                        }
                        bacColor={"bg-red1"}
                        textColor={"white"}
                        childern={workerHours.map((datax, index) => (
                            <div className=" mx-2 mt-1 mb-0  grid grid-cols-3 rounded-md  px-10 py-2 ">
                                <>
                                    <div className="">
                                        <div>
                                            <p className="lg:text-md  whitespace-pre-line font-Bitter   text-xs ">
                                                {datax.working_name}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div>
                                            <p className="lg:text-md whitespace-pre-line text-center font-Bitter text-xs ">
                                                {datax.length}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            </div>
                        ))}
                    />
                </div>
                <div className="">
                    <Item
                        iconColor={"black"}
                        subtype={
                            equipment.length > 0 ? "Working name " : "no data"
                        }
                        title={"Equipment"}
                        type={
                            equipment.length > 0 ? "Working name " : "no data"
                        }
                        bacColor={"bg-yellow1"}
                        textColor={"black"}
                        childern={equipment.map((datax, index) => (
                            <div className=" mx-2 mt-1 mb-0  grid grid-cols-2 rounded-md  px-10 py-2 ">
                                <>
                                    <div className="">
                                        <div>
                                            <p className="lg:text-md  whitespace-pre-line font-Bitter  text-xs ">
                                                {datax.name}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div>
                                            <p className="lg:text-md whitespace-pre-line text-center font-Bitter text-xs ">
                                                {datax.qty}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            </div>
                        ))}
                    />
                </div>
            </div>
        </>
    );
};

export default CardItem5;
