import React, { useEffect } from "react";
import Case from "../components/Case";
import { CardItem4 } from "../components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

export default function Gallery() {
    const width = window.innerWidth;
    const urlavatar =
        "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZSUyMHBob3RvfGVufDB8fDB8fA%3D%3D&w=1000&q=80";
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
                        <Avatar imageUrl={urlavatar} altText={"avatar"} />
                        <div className="mt-10">
                            <div className="my-2">
                                <h5 className="text-black font-Bitter text-lg font-bold">
                                    Address
                                </h5>

                                <h5 className="font-Bitter  text-lg text-graydisable2">
                                    Jalan Bagu no 5, Jakarta
                                </h5>
                            </div>

                            <div className="my-2">
                                <h5 className="text-black font-Bitter text-lg font-bold">
                                    Contact
                                </h5>

                                <h5 className="font-Bitter  text-lg text-graydisable2">
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
    const Button3 = ({ title, onClick }) => {
        return (
            <div>
                <button
                    className="rounded border-none bg-none px-4 py-2 font-bold text-blue1 hover:bg-textPrimary"
                    onClick={onClick}
                >
                    {title}
                </button>
            </div>
        );
    };

    const Component1 = ({ icon, title, desc }) => {
        return (
            <>
                <div className="  mx-auto mt-10 px-6">
                    <div className=" border-b border-graydisable pb-2">
                        <div className="flex">
                            <div className="p-2">{icon}</div>
                            <div className="ml-2 p-1">
                                <div className="font-Bitter text-graydisable2">
                                    {title}
                                </div>
                                <div className="font-Bitter ">{desc}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    const MobileView = () => {
        return (
            <>
                <div className="mx-auto rounded-lg bg-blue1  px-4 pb-4 pt-2 md:px-8 lg:max-w-7xl lg:bg-white">
                    <h5 className="mb-52text-lg my-3 text-center  font-Bitter font-bold text-white">
                        Profile
                    </h5>
                    <div className="flex justify-center ">
                        <Avatar2 imageUrl={urlavatar} />
                    </div>
                    <h5 className="mt-5 text-center font-Bitter text-lg font-bold text-white">
                        Jemy Feguson
                    </h5>
                    <h5 className="text-md mt-1 text-center font-Bitter text-white">
                        {" "}
                        Civil Engineer
                    </h5>
                    <div className="mx-auto  mt-5 flex px-4">
                        <div className=" flex w-full justify-center font-Bitter text-sm text-white ">
                            <h5>50 Total Report</h5>
                        </div>
                        <div className="border-l border-r border-graydisable2"></div>
                        <div className=" flex w-full justify-center font-Bitter text-sm text-white">
                            <h5>50 Total Report</h5>
                        </div>
                    </div>
                </div>

                <Component1
                    icon={
                        <svg
                            width="20"
                            height="16"
                            viewBox="0 0 20 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M18 4L10 9L2 4V2L10 7L18 2M18 0H2C0.89 0 0 0.89 0 2V14C0 14.5304 0.210714 15.0391 0.585786 15.4142C0.960859 15.7893 1.46957 16 2 16H18C18.5304 16 19.0391 15.7893 19.4142 15.4142C19.7893 15.0391 20 14.5304 20 14V2C20 1.46957 19.7893 0.960859 19.4142 0.585786C19.0391 0.210714 18.5304 0 18 0Z"
                                fill="#B0B0B3"
                            />
                        </svg>
                    }
                    title={"Email"}
                    desc={"jme@gmail.com"}
                />
                <Component1
                    icon={
                        <svg
                            width="13"
                            height="22"
                            viewBox="0 0 13 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.5 0H2.5C1.83696 0 1.20107 0.263392 0.732233 0.732233C0.263392 1.20107 0 1.83696 0 2.5V19.5C0 20.163 0.263392 20.7989 0.732233 21.2678C1.20107 21.7366 1.83696 22 2.5 22H10.5C11.163 22 11.7989 21.7366 12.2678 21.2678C12.7366 20.7989 13 20.163 13 19.5V2.5C13 1.83696 12.7366 1.20107 12.2678 0.732233C11.7989 0.263392 11.163 0 10.5 0ZM6.5 21C5.67 21 5 20.33 5 19.5C5 18.67 5.67 18 6.5 18C7.33 18 8 18.67 8 19.5C8 20.33 7.33 21 6.5 21ZM11 17H2V3H11V17Z"
                                fill="#B0B0B3"
                            />
                        </svg>
                    }
                    title={"Phone"}
                    desc={"0812-9713-7109"}
                />
                <Component1
                    title={<Button3 title={"Logout"} />}
                    // desc={<Button3 title={"Logout"}/>}
                />
                <div className="mb-10"></div>
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
