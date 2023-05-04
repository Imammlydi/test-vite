import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Report, DetailReport, Gallery, Home, Login, Register } from "../pages";

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
            <Navigate to="/login" replace />
        ) : (
            <Report />
        );
    };
    const AuthWrapperHome = () => {
        return checkTokenExpired(exp) ? (
            //return isExpired(localStorage.getItem('exp')
            <Navigate to="/login" replace />
        ) : (
            <Home />
        );
    };
    const AuthWrapperProfile = () => {
        return checkTokenExpired(exp) ? (
            //return isExpired(localStorage.getItem('exp')
            <Navigate to="/login" replace />
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
            <Route path="register" element={<Register />} />
            <Route path="detail_report" element={<DetailReport />} />
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
