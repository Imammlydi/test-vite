import React from "react";
import CardItem1 from "../components/CardItem1";
import CardItem2 from "../components/CardItem2";
import Case from "../components/Case";
import CardItem3 from "../components/CardItem3";
export default function About() {
    return (
        <>
            <div class="mx-auto grid grid-cols-1 gap-4 px-4 pt-8 md:grid-cols-2 md:px-8 lg:max-w-7xl lg:grid-cols-4 lg:gap-1">
                <CardItem1 />
                <CardItem1 />
                <CardItem1 />
                <CardItem1 />
                <CardItem2 />
                <CardItem2 />
                <CardItem2 />
                <CardItem2 />
                <CardItem3 />
            </div>
        </>
    );
}
