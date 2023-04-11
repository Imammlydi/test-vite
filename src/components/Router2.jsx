import React from "react";
import { Route, Routes } from "react-router-dom";
import {
    Report,
    DetailReport,
    Gallery,
    Home,
    Login,
    Register,
    ReportCat1,
    ReportCat2,
} from "../pages";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<ReportCat1 />} />
            <Route path="Cat2" element={<ReportCat2 />} />
        </Routes>
    );
}
