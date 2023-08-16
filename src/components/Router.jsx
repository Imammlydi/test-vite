import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Report, DetailReport, Gallery, Home, Login, Register } from "../pages";
import DetailReportImage from "../pages/DetailReportImage";
import DetailReportWorker from "../pages/DetailReportWorker";
import Login2 from "../pages/Login2";
import Report2 from "../pages/Report2";

import ReportDetail2 from "../pages/ReportDetail2";
import Karyawan from "../pages/Karyawan";
import DetailKaryawan from "../pages/Detailkaryawan";
import Feed from "../pages/Feed";
import ReportDetail3 from "../pages/ReportDetail3";

export default function Router() {
    const exp = localStorage.getItem("exp");

    const checkTokenExpired = (exp) => {
        if (!exp) return true;

        const currentTime = Date.now() / 1000;

        return exp < currentTime;
    };

    const AuthWrapper = () => {
        return checkTokenExpired(exp) ? (
            //return isExpired(localStorage.getItem('exp')
            <Navigate to="/login2" replace />
        ) : (
            <Report />
        );
    };
    const AuthWrapperHome = () => {
        return checkTokenExpired(exp) ? (
            //return isExpired(localStorage.getItem('exp')
            <Navigate to="/login2" replace />
        ) : (
            <Home />
        );
    };
    const AuthWrapperProfile = () => {
        return checkTokenExpired(exp) ? (
            //return isExpired(localStorage.getItem('exp')
            <Navigate to="/login2" replace />
        ) : (
            <Gallery />
        );
    };

    return (
        <Routes>
            <Route element={<AuthWrapperHome />}>
                <Route path="/" element={<Home />} />
            </Route>
            <Route element={<AuthWrapper />}>
                <Route path="report" element={<Report />} />
            </Route>
            <Route element={<AuthWrapperProfile />}>
                <Route path="gallery" element={<Gallery />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="login2" element={<Login2 />} />
            <Route path="register" element={<Register />} />
            <Route path="detail_report" element={<DetailReport />} />
            <Route path="detail_image" element={<DetailReportImage />} />
            <Route path="detail_worker" element={<DetailReportWorker />} />
            <Route path="report2" element={<Report2 />} />
            <Route path="List_All_Reports" element={<Feed />} />
            {/* <Route path="equipment" element={<Equipment />} /> */}
            <Route path="/reportdetail2" element={<ReportDetail2 />} />
            <Route path="/reportdetail3" element={<ReportDetail3 />} />
            <Route path="/lembur" element={<Karyawan />} />
            <Route path="/detailLembur" element={<DetailKaryawan />} />
        </Routes>
        // <Routes>
        //     <Route path="/" element={<Home />} />
        //     <Route element={<AuthWrapper />} >
        //     <Route path="report"  element={<Report />} />
        //     </Route>
        //     <Route path="gallery" element={<Gallery />} />
        //     <Route path="login" element={<Login />} />
        //     <Route path="register" element={<Register />} />
        //     <Route path="detail_report" element={<DetailReport />} />
        // </Routes>
    );
}
