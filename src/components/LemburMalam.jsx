import { useEffect, useState } from "react";

const LemburMalam = ({ karyawanId }) => {
    const [lemburMalam, setLemburMalam] = useState([]);
    const [formData, setFormData] = useState({
        tanggal_lembur: "",
        mulai: "",
        selesai: "",
        total_jam: "",
        harga: "",
        karyawan_id: karyawanId,
    });

    useEffect(() => {
        fetchLemburMalam();
    }, [karyawanId]);

    const fetchLemburMalam = async () => {
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/lembur-malam-karyawan/${karyawanId}`
            );
            const data = await response.json();
            setLemburMalam(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/lembur-malam",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );
            const data = await response.json();
            setLemburMalam((prevLemburMalam) => [...prevLemburMalam, data]);
            setFormData({
                tanggal_lembur: "",
                mulai: "",
                selesai: "",
                total_jam: "",
                harga: "",
                karyawan_id: karyawanId,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://127.0.0.1:8000/api/lembur-malam/${id}`, {
                method: "DELETE",
            });
            setLemburMalam((prevLemburMalam) =>
                prevLemburMalam.filter((item) => item.id !== id)
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h2>Lembur Malam</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Tanggal Lembur</label>
                    <input
                        type="date"
                        name="tanggal_lembur"
                        value={formData.tanggal_lembur}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label>Mulai</label>
                    <input
                        type="time"
                        name="mulai"
                        value={formData.mulai}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label>Selesai</label>
                    <input
                        type="time"
                        name="selesai"
                        value={formData.selesai}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label>Total Jam</label>
                    <input
                        type="number"
                        name="total_jam"
                        value={formData.total_jam}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label>Harga</label>
                    <input
                        type="number"
                        step="0.01"
                        name="harga"
                        value={formData.harga}
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit">Tambah</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Tanggal</th>
                        <th>Mulai</th>
                        <th>Selesai</th>
                        <th>Total Jam</th>
                        <th>Harga</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {lemburMalam.map((item) => (
                        <tr key={item.id}>
                            <td>{item.tanggal_lembur}</td>
                            <td>{item.mulai}</td>
                            <td>{item.selesai}</td>
                            <td>{item.total_jam}</td>
                            <td>{item.harga}</td>
                            <td>
                                <button onClick={() => handleDelete(item.id)}>
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LemburMalam;
