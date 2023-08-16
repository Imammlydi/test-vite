import React, { useState } from "react";

function HitungJamKerja() {
    const [startHour, setStartHour] = useState("");
    const [startMinute, setStartMinute] = useState("");
    const [endHour, setEndHour] = useState("");
    const [endMinute, setEndMinute] = useState("");
    const [totalHours, setTotalHours] = useState(0);
    const [totalMinutes, setTotalMinutes] = useState(0);
    const [totalSalary, setTotalSalary] = useState(0);

    const handleCalculate = () => {
        const start = parseInt(startHour) * 60 + parseInt(startMinute);
        const end = parseInt(endHour) * 60 + parseInt(endMinute);
        let total = end - start;
        if (total < 0) {
            total += 24 * 60; // Menghitung total jam jika melintasi tengah malam
        }
        const hours = Math.floor(total / 60);
        const minutes = total % 60;
        const salary = Math.floor((total / 60) * 15000);

        setTotalHours(hours);
        setTotalMinutes(minutes);
        setTotalSalary(salary);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="mb-4 text-2xl font-bold">
                Kalkulator Total Jam Kerja
            </h1>
            <div className="flex gap-4">
                <div>
                    <label htmlFor="startHour">Jam Masuk :</label>
                    <input
                        type="number"
                        id="startHour"
                        min={0}
                        max={23}
                        value={startHour}
                        onChange={(e) => setStartHour(e.target.value)}
                        className="border-gray-300 rounded border px-2 py-1"
                    />
                </div>
                <div>
                    <label htmlFor="startMinute">Menit:</label>
                    <input
                        type="number"
                        id="startMinute"
                        min={0}
                        max={59}
                        value={startMinute}
                        onChange={(e) => setStartMinute(e.target.value)}
                        className="border-gray-300 rounded border px-2 py-1"
                    />
                </div>
            </div>
            <div className="flex gap-4">
                <div>
                    <label htmlFor="endHour">Jam Keluar Kerja:</label>
                    <input
                        type="number"
                        id="endHour"
                        min={0}
                        max={23}
                        value={endHour}
                        onChange={(e) => setEndHour(e.target.value)}
                        className="border-gray-300 rounded border px-2 py-1"
                    />
                </div>
                <div>
                    <label htmlFor="endMinute">Menit:</label>
                    <input
                        type="number"
                        id="endMinute"
                        min={0}
                        max={59}
                        value={endMinute}
                        onChange={(e) => setEndMinute(e.target.value)}
                        className="border-gray-300 rounded border px-2 py-1"
                    />
                </div>
            </div>
            <button
                onClick={handleCalculate}
                className="bg-blue-500 mt-4 rounded px-4 py-2 text-white"
            >
                Hitung
            </button>
            <div className="mt-4">
                <p>
                    Total Jam Kerja: {totalHours} jam {totalMinutes} menit
                </p>
                <p>Total Gaji: Rp {totalSalary}</p>
            </div>
        </div>
    );
}

export default HitungJamKerja;
