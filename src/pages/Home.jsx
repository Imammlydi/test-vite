import React from "react";
import { CardItem1, CardItem3, CardItem4 } from "../components";
export default function Home() {
    return (
        <div className="  mx-auto px-4 pt-1 md:items-center md:px-8 lg:max-w-7xl ">
            <div className="fllex mx-auto grid grid-cols-1 gap-4 px-4 pt-8 md:grid-cols-2 md:px-8 lg:max-w-7xl lg:grid-cols-4 lg:gap-1  ">
                <CardItem4 title={"Progress Powerhouse Area"} value={"50%"} />
                <CardItem4 title={"Progress Powerhouse Area"} value={"50%"} />
                <CardItem4 title={"Progress Powerhouse Area"} value={"50%"} />
                <CardItem4 title={"Progress Powerhouse Area"} value={"50%"} />
                <CardItem4 title={"Progress Powerhouse Area"} value={"50%"} />
                <CardItem4 title={"Progress Powerhouse Area"} value={"50%"} />
            </div>
            <h4 className="text-2xl">Hello React</h4>
            {/* <p className="text-gray-400 text-lg leading-relaxed">
                A JavaScript library for building user interfaces Contrary to
                popular belief, Lorem Ipsum is not simply random text. It has
                roots in a piece of classical Latin literature from 45 BC,
                making it over 2000 years old. Richard McClintock, a Latin
                professor at Hampden-Sydney College in Virginia, looked up one
                of the more obscure Latin words, consectetur, from a Lorem Ipsum
                passage, and going through the cites of the word in classical
                literature, discovered the undoubtable source. Lorem Ipsum comes
                from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
                Malorum" (The Extremes of Good and Evil) by Cicero, written in
                45 BC. This book is a treatise on the theory of ethics, very
                popular during the Renaissance. The first line of Lorem Ipsum,
                "Lorem ipsum dolor sit amet..", comes from a line in section
                1.10.32.
            </p> */}
        </div>
    );
}
