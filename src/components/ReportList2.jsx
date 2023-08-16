import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReportAPI from "./ReportAPI";

const ReportList = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                // Ganti 'YOUR_BEARER_TOKEN' dengan bearer token yang valid
                const token = "YOUR_BEARER_TOKEN";
                const data = await ReportAPI.getAllReports(token);
                setReports(data);
            } catch (error) {
                console.error("Error fetching reports:", error);
            }
        };

        fetchReports();
    }, []);

    return (
        <div>
            <h1>Reports</h1>
            {reports.map((report) => (
                <div key={report.id}>
                    <h3>{report.title}</h3>
                    <p>{report.description}</p>
                    <p>{report.shift}</p>
                    <p>{report.date}</p>
                    <Link to={`/reportdetail2`} state={report.id}>
                        View Details
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default ReportList;
