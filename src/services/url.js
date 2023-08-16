const IP = "localhost";

const url = `http://${IP}:8000/reports`;

const urlLogin2 = `http://${IP}:5000/auth/api`;
const url2 = "http://localhost:3000/reports";
const urlLogin = `http://${IP}:5000/auth/api`;

export const urlReport = url;
export const urlAuthLogin = urlLogin;
export const urlGetAllReport = `http://${IP}:5000/report/viewReportjwt`;
export const urlPostReport = `http://${IP}:5000/report/createReport_only/181024b9-3a43-4a7a-bfb4-a952b5c077c1`;
export const urlPostReportWorker = `http://${IP}:5000/report/createReport_only/181024b9-3a43-4a7a-bfb4-a952b5c077c1`;
export const dummyImageConstrution =
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80";
