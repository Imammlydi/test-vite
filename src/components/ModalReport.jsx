import React, { useState } from "react";
import Modal from "react-modal";

const ModalReport = () => {
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const initialFormState = {
        // id: "",
        title: "",
        description: "",
        shift: "",
        tanggal: "",
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

    const sendData = () => {
        console.log("called", data);
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
                    className="rounded border-none bg-primary px-4 py-2 font-bold text-textWhite hover:bg-textPrimary"
                    onClick={onClick}
                >
                    {title}
                </button>
            </div>
        );
    };
    const Form = () => {
        return (
            <form class="mb-4    pt-1 " onSubmit={onSubmitData}>
                {/* <div class="mb-1"> */}
                <input
                    className="border-1 text-slate-50 focus:ring-sky-500  appearance-none rounded   border border-graydisable px-3     py-3 font-Bitter leading-tight focus:border-primary  focus:outline-none focus:ring-1 lg:max-w-5xl "
                    type="text"
                    placeholder="title"
                    name="title"
                    value={data.title}
                    onChange={handleInputChange}
                />
                <button
                    class="focus:shadow-outline ml-2 rounded bg-primary px-4 py-2 font-Bitter font-bold text-white hover:bg-textPrimary  focus:outline-none"
                    type="submit"
                >
                    search
                </button>
                {/* </div> */}
            </form>
        );
    };

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
                                    placeholder="title"
                                    name="title"
                                    value={data.title}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    className="border-1 text-slate-50 focus:ring-sky-500 my-2 w-full  appearance-none rounded   border border-graydisable px-3     py-3 font-Bitter leading-tight focus:border-primary  focus:outline-none focus:ring-1 lg:max-w-5xl "
                                    placeholder="description"
                                    name="description"
                                    value={data.description}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    className="border-1 text-slate-50 focus:ring-sky-500 my-2 w-full  appearance-none rounded   border border-graydisable px-3     py-3 font-Bitter leading-tight focus:border-primary  focus:outline-none focus:ring-1 lg:max-w-5xl "
                                    placeholder="shift"
                                    name="shift"
                                    value={data.shift}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="date"
                                    className="border-1 text-slate-50 focus:ring-sky-500 my-2 w-full  appearance-none rounded   border border-graydisable px-3     py-3 font-Bitter leading-tight focus:border-primary  focus:outline-none focus:ring-1 lg:max-w-5xl "
                                    placeholder="tanggal"
                                    name="tanggal"
                                    value={data.tanggal}
                                    onChange={handleInputChange}
                                />
                            </form>
                        </div>
                        <div className="flex justify-end px-7 lg:px-2">
                            <Button3 title={"Close"} onClick={closeModal} />
                            <Button3
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

export default ModalReport;
