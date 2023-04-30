import React from "react";
import { CardItem4 } from "../components";
export default function Home() {
    return (
        // <div className="  mx-auto px-4 pt-1 md:items-center md:px-8 lg:max-w-7xl mb-6  ">
        <div className="fllex mx-auto grid grid-cols-1 gap-4 px-4 pt-8 md:grid-cols-2 md:px-8 lg:max-w-7xl lg:grid-cols-3 lg:gap-1  ">
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
