import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { createItem, fetchCreateReport } from "../services";
import { urlPostReport, urlReport } from "../services/url";

const ModalReportWorker = () => {
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const initialFormState = {
        // id: "",
        type_of_work: "",
        qtyW: "",

        // image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    };

    const [data, setData] = useState(initialFormState);
    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setData({ ...data, [name]: value });
    };
    const onSubmitData = (event) => {
        event.preventDefault();
        // seFetcReports(idInspector,datas)
        console.log("called", data);
    };

    const fetchCreateReport = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/report/report/worker/${idReport}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            const datas = await response.json();
            console.log(datas);
        } catch (error) {
            console.error(error);
        }
    };

    const sendData = () => {
        // createItem(data);
        const newData = JSON.stringify(data);
        console.log("called", data);
        // fetchCreateReport(data);
        // fetchCreateReport()
    };

    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            //   marginRight: '-50%',
            backgroundColor: "transparent",
            border: "none",
            transform: "translate(-50%, -50%)",
            width: "100%",
            // '@media only screen and (max-width: 600px)': {
            //     width: '50%',
            //   },
        },
    };

    let subtitle;

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = "#f00";
    }
    function closeModal() {
        setIsOpen(false);
    }
    const Button3 = ({ title, onClick }) => {
        return (
            <div>
                <button
                    className="rounded border-none bg-white px-4 py-2 text-xs font-bold text-textWhite hover:bg-blue1"
                    onClick={onClick}
                >
                    <svg
                        width="19"
                        height="19"
                        viewBox="0 0 19 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M16.3 6.175L12.05 1.975L13.45 0.575C13.8333 0.191667 14.3043 0 14.863 0C15.4217 0 15.8923 0.191667 16.275 0.575L17.675 1.975C18.0583 2.35833 18.2583 2.821 18.275 3.363C18.2917 3.905 18.1083 4.36733 17.725 4.75L16.3 6.175ZM14.85 7.65L4.25 18.25H0V14L10.6 3.4L14.85 7.65Z"
                            fill="#479F55"
                        />
                    </svg>
                </button>
            </div>
        );
    };
    const Button4 = ({ title, onClick }) => {
        return (
            <div>
                <button
                    className="rounded border-none bg-blue1 px-4 py-2 text-xs font-bold text-white hover:bg-blue1"
                    onClick={onClick}
                >
                    Send
                </button>
            </div>
        );
    };
    const Button5 = ({ title, onClick }) => {
        return (
            <div>
                <button
                    className="rounded border border-none border-blue1 bg-white px-4 py-2 text-xs font-bold text-blue1 hover:bg-white"
                    onClick={onClick}
                >
                    Cancel
                </button>
            </div>
        );
    };

    useEffect(() => {}, []);

    return (
        <>
            <Button3 title={"Input "} onClick={openModal} />
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="  flex justify-center ">
                    <div className="rounded-lg  border bg-white py-4">
                        <div className="flex  w-96 justify-center py-3">
                            <h4 className="font-Bitter font-semibold text-primary">
                                Add Report
                            </h4>
                        </div>
                        <div className=" w-96 px-7 lg:px-2">
                            <form action="" className="mb-4    pt-1">
                                <input
                                    type="text"
                                    className="border-1 text-slate-50 focus:ring-sky-500 my-2 w-full  appearance-none rounded   border border-graydisable px-3     py-3 font-Bitter leading-tight focus:border-primary  focus:outline-none focus:ring-1 lg:max-w-5xl "
                                    placeholder="type_of_work"
                                    name="type_of_work"
                                    value={data.type_of_work}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="number"
                                    className="border-1 text-slate-50 focus:ring-sky-500 my-2 w-full  appearance-none rounded   border border-graydisable px-3     py-3 font-Bitter leading-tight focus:border-primary  focus:outline-none focus:ring-1 lg:max-w-5xl "
                                    placeholder="qtyW"
                                    name="qtyW"
                                    value={data.qtyW}
                                    onChange={handleInputChange}
                                />
                            </form>
                        </div>
                        <div className="flex justify-end px-7 lg:px-2">
                            <Button5 title={"Close"} onClick={closeModal} />
                            <Button4
                                title={"Create"}
                                type="submit"
                                onClick={sendData}
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ModalReportWorker;
