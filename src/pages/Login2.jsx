import React, { useState } from "react";
import axios from "axios";
import { Link, NavLink, Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login2 = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const notifyerror = () =>
        toast.error("Username/Password! Not match", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/login",
                {
                    email: email,
                    password: password,
                }
            );

            // Cek apakah responsenya sukses atau tidak
            if (response.status === 200) {
                const token = response.data.token;
                // Simpan token di local storage
                localStorage.setItem("token", token);
                console.log("Login berhasil");
                var decoded = jwt_decode(token);
                setIsLoggedIn(true);
                console.log(token);
                console.log(response.data.user[0].inspector);
                const id_inspector = response.data.user[0].inspector[0].id;
                const inspec = response.data.user[0].inspector;
                const engineer = response.data.user[0].engineer;
                const field = response.data.user[0].inspector[0].field;
                const name = response.data.user[0].name;
                localStorage.setItem("id_inspector", id_inspector);
                localStorage.setItem("engineer", JSON.stringify(engineer));
                localStorage.setItem("inspec", JSON.stringify(inspec));
                localStorage.setItem("field", field);
                localStorage.setItem("name", name);
                console.log(decoded.exp);
                const expToken = decoded.exp;

                localStorage.setItem("exp", JSON.stringify(expToken));
            } else {
                console.log("Login gagal");
                notifyerror();
            }
        } catch (error) {
            console.log("Terjadi kesalahan:", error);
            notifyerror();
        }
    };

    if (isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="from-blue-400  to-blue-600 flex bg-primary  h-screen min-h-screen w-full w-screen items-center justify-center bg-gradient-to-b p-2">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
           <div className=" grid place-items-center ">
{/* <img src={logo} alt="My Image"  className="h-40 w-50 bg-primary2"/> */}

<svg width="193" height="225" viewBox="0 0 193 225" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M89.0002 78.5H14.5002C13.8336 78.5 12.1002 78.7 10.5 79.5C8.49976 80.5 6.50024 83 5.50024 84.5C4.50024 86 5.00024 93 6.50024 96C7.70024 98.4 12.3336 100 14.5002 100.5H62.5002C46.1669 117 13.3002 150.2 12.5002 151C11.5002 152 11.5002 156 11.5002 157C11.5002 158 13.5002 162 14.5002 163C15.5002 164 16.5002 165 20.5002 166.5C23.7002 167.7 28.5002 164.667 30.5002 163L77.5002 117V165C77.5002 167 82.5002 171.5 83.5002 171.5C84.5002 171.5 86.5002 173.5 93.0002 171.5C98.2002 169.9 98.8336 165.167 98.5002 163C98.6669 139.333 98.9002 90.9 98.5002 86.5C98.1002 82.1 92.0002 79.3333 89.0002 78.5Z" fill="#4BA49F" stroke="#48A6A5"/>
<path d="M53 72L26.5 44.5C25.8333 43.6667 24.3 41.2 23.5 38C22.7 34.8 25.1666 31.6667 26.5 30.5C28 29.1667 31.8 26.5 35 26.5C38.2 26.5 41.3333 28.1667 42.5 29L70 57C70.6666 60.8333 70.4 69.2 64 72C57.6 74.8 54 73.1667 53 72Z" fill="#FFFF01"/>
<path d="M76.2423 53.7312L74.6031 15.5761C74.6556 14.5102 75.1406 11.6466 76.6607 8.71926C78.1809 5.79194 82.1042 5.07824 83.8759 5.0873C85.8828 5.08189 90.496 5.60094 92.8935 7.72045C95.2909 9.83995 96.5345 13.164 96.8566 14.561L98.9139 53.7531C96.8744 57.0666 91.1329 63.1583 84.4835 61.017C77.8341 58.8757 76.2188 55.2676 76.2423 53.7312Z" fill="#FFFF01"/>
<path d="M106.01 58.3421L131.208 29.6442C131.983 28.9104 134.313 27.177 137.436 26.1133C140.558 25.0496 143.886 27.2468 145.16 28.4784C146.613 29.8621 149.587 33.4269 149.853 36.6157C150.12 39.8046 148.72 43.0659 147.987 44.2979L122.374 74.034C118.609 75.0176 110.25 75.4485 106.926 69.3039C103.603 63.1593 104.931 59.4358 106.01 58.3421Z" fill="#FFFF01"/>
<path d="M127.534 79.318L165.682 77.5221C166.748 77.5702 169.614 78.0434 172.547 79.5516C175.481 81.0597 176.211 84.9801 176.209 86.7518C176.223 88.7587 175.722 93.374 173.613 95.7801C171.503 98.1862 168.184 99.4434 166.789 99.7713L127.605 101.989C124.283 99.9636 118.168 94.2472 120.282 87.589C122.396 80.9309 125.998 79.3008 127.534 79.318Z" fill="#FFFF01"/>
<path d="M120.311 109.342L148.431 135.184C149.147 135.975 150.827 138.345 151.819 141.49C152.812 144.636 150.54 147.913 149.28 149.158C147.863 150.58 144.232 153.472 141.038 153.667C137.844 153.861 134.615 152.387 133.4 151.626L104.253 125.346C103.355 121.56 103.113 113.192 109.332 110.009C115.55 106.826 119.242 108.238 120.311 109.342Z" fill="#FFFF01"/>
<path d="M1.296 216V213.408L4.608 212.472L3.96 213.48V193.32L4.86 194.4L1.296 193.428V190.836L9.324 190.656H12.816C15.696 190.656 17.868 191.256 19.332 192.456C20.796 193.656 21.528 195.384 21.528 197.64C21.528 199.656 20.904 201.324 19.656 202.644C18.432 203.964 16.5 204.768 13.86 205.056L13.896 204.48C14.832 204.504 15.6 204.648 16.2 204.912C16.8 205.176 17.292 205.548 17.676 206.028C18.084 206.484 18.456 207.036 18.792 207.684L21.672 213.228L20.196 212.328L23.508 213.408V216H17.604L14.364 209.052C13.932 208.14 13.56 207.444 13.248 206.964C12.936 206.46 12.552 206.124 12.096 205.956C11.64 205.764 10.98 205.68 10.116 205.704H8.244L9.108 204.984V213.48L8.424 212.436L12.06 213.408V216H1.296ZM9.108 203.4L8.244 202.14H11.232C12.912 202.14 14.172 201.792 15.012 201.096C15.852 200.4 16.272 199.368 16.272 198C16.272 196.848 15.936 195.948 15.264 195.3C14.592 194.652 13.56 194.328 12.168 194.328H8.244L9.108 193.536V203.4ZM33.2438 216.432C31.4918 216.432 29.9558 216.072 28.6357 215.352C27.3158 214.608 26.2838 213.516 25.5398 212.076C24.8198 210.612 24.4598 208.836 24.4598 206.748C24.4598 204.588 24.8438 202.74 25.6118 201.204C26.4038 199.644 27.5078 198.444 28.9238 197.604C30.3398 196.764 32.0078 196.344 33.9277 196.344C35.7998 196.344 37.3238 196.716 38.4998 197.46C39.6758 198.204 40.5398 199.224 41.0918 200.52C41.6438 201.792 41.9198 203.232 41.9198 204.84C41.9198 205.248 41.8958 205.656 41.8477 206.064C41.8238 206.472 41.7758 206.904 41.7038 207.36H28.5278V204.372H37.3838L36.7358 204.84C36.7598 203.88 36.6638 203.04 36.4478 202.32C36.2558 201.576 35.9198 201 35.4398 200.592C34.9838 200.184 34.3478 199.98 33.5318 199.98C32.5958 199.98 31.8398 200.256 31.2638 200.808C30.6878 201.336 30.2678 202.056 30.0038 202.968C29.7638 203.88 29.6438 204.9 29.6438 206.028C29.6438 207.3 29.7998 208.44 30.1118 209.448C30.4238 210.456 30.9278 211.248 31.6238 211.824C32.3438 212.4 33.2798 212.688 34.4318 212.688C35.2478 212.688 36.1238 212.544 37.0598 212.256C38.0198 211.944 39.0158 211.488 40.0478 210.888L41.7398 213.588C40.3478 214.548 38.9198 215.268 37.4558 215.748C36.0158 216.204 34.6118 216.432 33.2438 216.432ZM43.8216 224.28V221.688L46.8816 220.68L46.2336 221.544V199.692L46.8096 200.376L43.8216 199.476V196.884L50.1576 196.596L50.7336 199.728L50.1576 199.44C51.2856 198.432 52.3776 197.664 53.4336 197.136C54.5136 196.608 55.6296 196.344 56.7816 196.344C58.1736 196.344 59.3976 196.716 60.4536 197.46C61.5096 198.18 62.3376 199.26 62.9376 200.7C63.5616 202.116 63.8736 203.856 63.8736 205.92C63.8736 208.248 63.4776 210.192 62.6856 211.752C61.8936 213.312 60.7776 214.488 59.3376 215.28C57.9216 216.048 56.2656 216.432 54.3696 216.432C53.7936 216.432 53.1936 216.384 52.5696 216.288C51.9456 216.216 51.2976 216.108 50.6256 215.964L51.2736 215.388V221.544L50.7336 220.788L54.0816 221.688V224.28H43.8216ZM53.7216 212.868C55.4256 212.868 56.6616 212.292 57.4296 211.14C58.2216 209.988 58.6176 208.416 58.6176 206.424C58.6176 205.104 58.4616 203.976 58.1496 203.04C57.8376 202.08 57.4056 201.348 56.8536 200.844C56.3016 200.316 55.6176 200.052 54.8016 200.052C54.1776 200.052 53.5176 200.22 52.8216 200.556C52.1256 200.892 51.4056 201.408 50.6616 202.104L51.2736 200.772V213.336L50.6616 212.364C51.7896 212.7 52.8096 212.868 53.7216 212.868ZM75.6599 196.344C78.4919 196.344 80.6999 197.184 82.2839 198.864C83.8679 200.544 84.6599 202.932 84.6599 206.028C84.6599 208.188 84.2759 210.048 83.5079 211.608C82.7399 213.144 81.6359 214.332 80.1959 215.172C78.7559 216.012 77.0279 216.432 75.0119 216.432C72.1799 216.432 69.9839 215.592 68.4239 213.912C66.8879 212.232 66.1199 209.844 66.1199 206.748C66.1199 204.588 66.4919 202.74 67.2359 201.204C68.0039 199.644 69.0959 198.444 70.5119 197.604C71.9279 196.764 73.6439 196.344 75.6599 196.344ZM75.4079 199.944C74.0399 199.944 73.0199 200.484 72.3479 201.564C71.6759 202.62 71.3399 204.264 71.3399 206.496C71.3399 208.728 71.6639 210.348 72.3119 211.356C72.9599 212.34 73.9439 212.832 75.2639 212.832C76.2239 212.832 77.0039 212.592 77.6039 212.112C78.2039 211.632 78.6599 210.9 78.9719 209.916C79.2839 208.932 79.4399 207.72 79.4399 206.28C79.4399 204.096 79.1039 202.5 78.4319 201.492C77.7599 200.46 76.7519 199.944 75.4079 199.944ZM86.8253 216V213.408L89.7413 212.58L89.2373 213.336V199.512L89.8133 200.376L86.8253 199.476V196.884L93.1613 196.596L93.8093 200.016L93.1613 199.872C94.2413 198.744 95.3092 197.88 96.3652 197.28C97.4213 196.656 98.5493 196.344 99.7493 196.344C100.517 196.344 101.333 196.464 102.197 196.704L101.873 203.364H98.9573L98.4173 199.476L98.8853 200.448C98.7413 200.4 98.5853 200.364 98.4173 200.34C98.2733 200.316 98.1293 200.304 97.9853 200.304C97.2413 200.304 96.4973 200.532 95.7533 200.988C95.0333 201.444 94.4093 202.032 93.8813 202.752L94.2773 201.384V213.336L93.7013 212.58L97.2653 213.408V216H86.8253ZM110.755 216.432C109.099 216.432 107.839 215.94 106.975 214.956C106.135 213.948 105.715 212.46 105.715 210.492V199.476L106.363 200.124H102.907V197.424L106.435 196.596L105.715 197.46V192.564L110.791 191.664V197.46L110.251 196.776H115.723L115.651 200.124H110.251L110.791 199.476V209.808C110.791 210.84 110.959 211.584 111.295 212.04C111.631 212.496 112.135 212.724 112.807 212.724C113.191 212.724 113.611 212.664 114.067 212.544C114.547 212.4 115.063 212.22 115.615 212.004L116.551 214.776C114.535 215.88 112.603 216.432 110.755 216.432ZM147.159 213.588L145.827 212.4L148.923 213.408V216H138.591V213.408L141.723 212.508L141.219 213.228L139.779 208.548L140.571 209.196H131.067L131.679 208.584L130.131 213.156L129.987 212.616L132.867 213.408V216H123.471V213.408L126.459 212.472L125.307 213.48L133.803 190.728L139.095 190.584L147.159 213.588ZM132.363 206.316L132.003 205.632H139.743L139.239 206.424L135.495 193.428H136.683L132.363 206.316ZM149.361 224.28V221.688L152.421 220.68L151.773 221.544V199.692L152.349 200.376L149.361 199.476V196.884L155.697 196.596L156.273 199.728L155.697 199.44C156.825 198.432 157.917 197.664 158.973 197.136C160.053 196.608 161.169 196.344 162.321 196.344C163.713 196.344 164.937 196.716 165.993 197.46C167.049 198.18 167.877 199.26 168.477 200.7C169.101 202.116 169.413 203.856 169.413 205.92C169.413 208.248 169.017 210.192 168.225 211.752C167.433 213.312 166.317 214.488 164.877 215.28C163.461 216.048 161.805 216.432 159.909 216.432C159.333 216.432 158.733 216.384 158.109 216.288C157.485 216.216 156.837 216.108 156.165 215.964L156.813 215.388V221.544L156.273 220.788L159.621 221.688V224.28H149.361ZM159.261 212.868C160.965 212.868 162.201 212.292 162.969 211.14C163.761 209.988 164.157 208.416 164.157 206.424C164.157 205.104 164.001 203.976 163.689 203.04C163.377 202.08 162.945 201.348 162.393 200.844C161.841 200.316 161.157 200.052 160.341 200.052C159.717 200.052 159.057 200.22 158.361 200.556C157.665 200.892 156.945 201.408 156.201 202.104L156.813 200.772V213.336L156.201 212.364C157.329 212.7 158.349 212.868 159.261 212.868ZM171.263 224.28V221.688L174.323 220.68L173.675 221.544V199.692L174.251 200.376L171.263 199.476V196.884L177.599 196.596L178.175 199.728L177.599 199.44C178.727 198.432 179.819 197.664 180.875 197.136C181.955 196.608 183.071 196.344 184.223 196.344C185.615 196.344 186.839 196.716 187.895 197.46C188.951 198.18 189.779 199.26 190.379 200.7C191.003 202.116 191.315 203.856 191.315 205.92C191.315 208.248 190.919 210.192 190.127 211.752C189.335 213.312 188.219 214.488 186.779 215.28C185.363 216.048 183.707 216.432 181.811 216.432C181.235 216.432 180.635 216.384 180.011 216.288C179.387 216.216 178.739 216.108 178.067 215.964L178.715 215.388V221.544L178.175 220.788L181.523 221.688V224.28H171.263ZM181.163 212.868C182.867 212.868 184.103 212.292 184.871 211.14C185.663 209.988 186.059 208.416 186.059 206.424C186.059 205.104 185.903 203.976 185.591 203.04C185.279 202.08 184.847 201.348 184.295 200.844C183.743 200.316 183.059 200.052 182.243 200.052C181.619 200.052 180.959 200.22 180.263 200.556C179.567 200.892 178.847 201.408 178.103 202.104L178.715 200.772V213.336L178.103 212.364C179.231 212.7 180.251 212.868 181.163 212.868Z" fill="#4BA49F"/>
</svg>

            <div className="w-full max-w-sm rounded-md bg-white mt-6 p-6 shadow-lg">
                <h1 className="mb-4 text-center text-2xl font-bold text-white">
                    Login
                </h1>
                <input
                    type="email"
                    placeholder="Email"
                    className="border-gray-300 mb-4 w-full rounded-md border px-3 py-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="border-gray-300 mb-4 w-full rounded-md border px-3 py-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="bg-white hover:bg-blue-800 rounded py-2 px-4 font-bold text-primary"
                    onClick={handleLogin}
                >
                    Login
                </button>
            </div>
</div>
        </div>
    );
};

export default Login2;
