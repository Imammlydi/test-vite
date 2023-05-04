import React, { useEffect, useState } from "react";
import { CardItem4 } from "../components";
import { urlGetAllReport } from "../services/url";
import { fetchDataWithJWT } from "../services";
export default function Home() {
    const [token, seToken] = useState(null);

    // async function fetchDataWithJWT(url, tokenx) {
    //   try {
    //     const response = await fetch(url, {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "auth_token": tokenx
    //       }
    //     });
    //     return await response.json();
    //   } catch (error) {
    //     console.error('There was a problem with the fetch operation:', error);
    //   }
    // }

    useEffect(() => {
        const tokens = localStorage.getItem("token");
        seToken(tokens);
        // fetchDataWithJWT(urlGetAllReport,token)
        console.log("---------", token);
    }, [token]);

    return (
        // <div className="  mx-auto px-4 pt-1 md:items-center md:px-8 lg:max-w-7xl mb-6  ">
        <div className="mx-auto flex grid grid-cols-1 gap-4 px-4 pt-8 md:grid-cols-2 md:px-8 lg:max-w-7xl lg:grid-cols-3 lg:gap-1  ">
            <CardItem4
                title={"Progress Powerhouse Area"}
                value={"50%"}
                type={"white"}
                bg={"white"}
            />
            <CardItem4
                title={"Progress Powerhouse Area"}
                value={"50%"}
                bg={"red"}
                type={"white"}
            />
            <CardItem4
                title={"Progress Powerhouse Area"}
                value={"50%"}
                bg={"yellow"}
            />
        </div>

        // </div>
    );
}
