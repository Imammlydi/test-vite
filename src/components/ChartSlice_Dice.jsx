import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const ChartSlice_Dice = () => {
    const [chartData, setChartData] = useState({});
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const tokens = localStorage.getItem("token");

    useEffect(() => {
        fetchData();
        console.log(tokens);
    }, [tokens]);

    const fetchDatas = async () => {
        // Fetch data from the API endpoints
        const response1 = await fetch("http://127.0.0.1:8000/api/olap/slice");
        const response2 = await fetch("http://127.0.0.1:8000/api/olap/dice");

        // Parse the JSON responses
        const data1 = await response1.json();
        const data2 = await response2.json();
        console.log("Data from API Endpoint 1:", data1);
        console.log("Data from API Endpoint 2:", data2);
        // Combine the data from both responses
        const combinedData = combineData(data1, data2);

        // Process the combined data for the chart
        const chartData = processChartData(combinedData);

        // Set the chart data state
        setChartData(chartData);
    };

    const fetchData = async () => {
        try {
            // Fetch data from the API endpoints
            const token = "YOUR_TOKEN_HERE"; // Ganti dengan token Anda
            const headers = {
                Authorization: `Bearer ${tokens}`,
            };

            const response1 = await fetch(
                "http://127.0.0.1:8000/api/olap/slice",
                { headers }
            );
            const response2 = await fetch(
                "http://127.0.0.1:8000/api/olap/dice",
                { headers }
            );

            // Parse the JSON responses
            const data1 = await response1.json();
            const data2 = await response2.json();

            setData1(data1);
            setData1(data2);

            console.log("Data from API Endpoint 1:", data1);
            console.log("Data from API Endpoint 2:", data2);

            // Combine the data from both responses
            //   const combinedData = combineData(data1, data2);

            // Process the combined data for the chart
            //   const chartData = processChartData(combinedData);

            // Set the chart data state
            setChartData(chartData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    //   const combineData = (sliceData, diceData) => {
    //     // Combine the data from both endpoints
    //     const combinedData = { ...sliceData, ...diceData };
    //     return combinedData;
    //   };

    //   const processChartData = (data) => {
    //     const series = [];
    //     const categories = [];

    //     // Iterate over the combined data
    //     for (const area in data) {
    //       const reports = data[area];
    //       const areaData = [];

    //       // Extract the relevant data for the chart
    //       for (const report of reports) {
    //         // Here you need to define the x and y values based on your report data structure
    //         // Replace 'xField' and 'yField' with the actual field names in your report object
    //         const xValue = report.date;
    //         const yValue = report.id;

    //         // Add the data point to the areaData array
    //         areaData.push({ x: xValue, y: yValue });

    //         // Add the x value to the categories array if it's not already present
    //         if (!categories.includes(xValue)) {
    //           categories.push(xValue);
    //         }
    //       }

    //       // Sort the areaData by x values
    //       areaData.sort((a, b) => a.x.localeCompare(b.x));

    //       // Add the series data for the area
    //       series.push({ name: area, data: areaData });
    //     }

    //     // Sort the categories array
    //     categories.sort();

    //     // Prepare the chart data object
    //     const chartData = {
    //       options: {
    //         xaxis: {
    //           categories: categories,
    //         },
    //       },
    //       series: series,
    //     };

    //     return chartData;
    //   };

    // Menghitung total laporan yang sudah disetujui (slice)
    const sliceChartData = Object.keys(data1).map((area) => {
        return {
            name: area,
            data: [
                data1[area].filter((item) => item.status === "sudah di setujui")
                    .length,
            ],
        };
    });

    // Menghitung total semua laporan (dice)
    const diceChartData = Object.keys(data2).map((area) => {
        return {
            name: area,
            data: [data2[area].length],
        };
    });

    const options = {
        chart: {
            type: "line",
            height: 350,
        },
        series: [...sliceChartData, ...diceChartData],
        xaxis: {
            categories: ["Total Approved Reports", "Total All Reports"],
        },
    };

    return (
        <div className="shadow-lg">
            <Chart
                options={options}
                series={options.series}
                type="line"
                height={350}
            />
            {Object.keys(chartData).length > 0 ? (
                //   <Chart options={chartData.options} series={chartData.series} type="line" height={400} />
                <Chart
                    options={options}
                    series={options.series}
                    type="line"
                    height={350}
                />
            ) : (
                <div>Loading chart...</div>
            )}
        </div>
    );
};

export default ChartSlice_Dice;
