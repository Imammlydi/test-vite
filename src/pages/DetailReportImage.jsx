import React, { useEffect, useState } from "react";
import { CardItem2, CardItem4 } from "../components";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchGetReportById } from "../services";
import CardItem5 from "../components/CardItem5";
import ModalImage from "react-modal-image";

const DetailReportImage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const image = state;

    useEffect(() => {
        console.log(image);
    }, [image]);

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

    return (
        <div className=" min-h-screen  w-full w-screen  ">
            <div className="  py-5 pl-2 md:pl-4 lg:pl-5 xl:pl-5 ">
                <BackButtonx />
            </div>
            <div className="mx-auto grid grid-cols-1 gap-4 px-4 pt-1 md:grid-cols-2 md:px-8 lg:max-w-7xl lg:grid-cols-2 lg:gap-2">
                <div className=" flex justify-center">
                    <ModalImage
                        className="h-96 w-96 cursor-pointer rounded-lg object-cover   shadow-lg"
                        small={`http://localhost:5000/${image}`}
                        large={`http://localhost:5000/${image}`}
                        alt="Selected Image"
                        // onClose={closeModal}
                    />
                    {/* <img src={`http://localhost:5000/${image}`} alt="" className="w-96 h-96 cursor-pointer rounded-lg shadow-lg   object-cover"/> */}
                </div>
                <div className="">
                    <p className="font-Bitter">Caption</p>
                </div>
            </div>
        </div>
    );
};

export default DetailReportImage;
