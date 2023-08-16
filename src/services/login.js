export const handleLogins = async (email, password) => {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        const data = await response.json();

        // Cek apakah responsenya sukses atau tidak
        if (response.ok) {
            // Simpan token di local storage
            localStorage.setItem("token", data.token);
            console.log("Login berhasil", data);
        } else {
            console.log("Login gagal");
        }
    } catch (error) {
        console.log("Terjadi kesalahan:", error);
    }
};
