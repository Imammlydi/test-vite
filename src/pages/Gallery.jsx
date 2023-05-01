import React, { useEffect } from "react";
import Case from "../components/Case";
import { CardItem4 } from "../components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

export default function Gallery() {
    const width = window.innerWidth;
    const urlavatar =
        "https://media.istockphoto.com/id/1423181290/id/foto/potret-headshot-wanita-muda-yang-serius-menatap-kamera-berpose-di-dalam-ruangan.jpg?s=612x612&w=0&k=20&c=sFeH7Heb93ju2Hj8_4Sf3Kmtfyf2-jZ-Q3bE01VVw04=";
    useEffect(() => {
        console.log(width);
    }, []);

    const Avatar = ({ imageUrl, altText }) => {
        return (
            <div className="mx-1 inline-block  h-80 w-80 overflow-hidden shadow-lg">
                <img
                    src={imageUrl}
                    alt={altText}
                    className="h-full w-full object-cover"
                />
            </div>
        );
    };

    const DekstopView = () => {
        return (
            <>
                <div class="grid grid-cols-3 ">
                    <div class="">
                        <Avatar src={urlavatar} altText={"avatar"} />
                        <div className="mt-10">
                            <div className="my-2">
                                <h5 className="text-black font-Bitter text-lg font-bold">
                                    Address
                                </h5>

                                <h5 className="font-Bitter  text-lg text-graydisable">
                                    Jalan Bagu no 5, Jakarta
                                </h5>
                            </div>

                            <div className="my-2">
                                <h5 className="text-black font-Bitter text-lg font-bold">
                                    Contact
                                </h5>

                                <h5 className="font-Bitter  text-lg text-graydisable">
                                    55320520
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div class="col-span-2">
                        <div className="my-2">
                            <h5 className="text-black font-Bitter text-lg font-bold">
                                Jemy Feguson
                            </h5>

                            <h5 className="text-black  font-Bitter text-lg">
                                Civil Engineer
                            </h5>
                        </div>
                        <div className="mt-10">
                            <Tabs>
                                <TabList>
                                    <Tab>
                                        <h4 className="font-Bitter">
                                            Emplyment Info
                                        </h4>
                                    </Tab>
                                    <Tab>
                                        <h4 className="font-Bitter">Career</h4>
                                    </Tab>
                                    <Tab>
                                        <h4 className="font-Bitter">
                                            Competency
                                        </h4>
                                    </Tab>
                                </TabList>
                                <TabPanel>A</TabPanel>
                                <TabPanel>A</TabPanel>
                                <TabPanel>A</TabPanel>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </>
        );
    };
    const Avatar2 = ({ imageUrl, altText }) => {
        return (
            <div className="mx-1 inline-block h-40 w-40 overflow-hidden rounded-full shadow-lg">
                <img
                    src={imageUrl}
                    alt={altText}
                    className="h-full w-full object-cover"
                />
            </div>
        );
    };

    const MobileView = () => {
        return (
            <>
                <div className="mx-auto rounded-lg bg-blue1  px-4 pb-4 pt-2 md:px-8 lg:max-w-7xl lg:bg-white">
                    <h5 className="mb-52text-lg mt-1 text-center  font-Bitter font-bold text-white">
                        Profile
                    </h5>
                    <div className="flex justify-center ">
                        <Avatar2 src={urlavatar} />
                    </div>
                    <h5 className="mt-5 text-center font-Bitter text-lg font-bold text-white">
                        Jemy Feguson
                    </h5>
                    <h5 className="text-md mt-1 text-center font-Bitter text-white">
                        {" "}
                        Civil Engineer
                    </h5>
                </div>
            </>
        );
    };

    return (
        <>
            {width < 768 ? (
                <MobileView />
            ) : (
                <div className="mx-auto bg-blue1  px-4 pt-8 md:px-8 lg:max-w-7xl lg:bg-white ">
                    <DekstopView />
                </div>
            )}
        </>
    );
}
