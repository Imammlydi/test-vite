import React from "react";
import { CardItem1, CardItem2, CardItem3, Router2 } from "../components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export default function Report() {
    const Search = () => {
        return (
            <form class="mb-4    pt-1 ">
                <div class="mb-1">
                    <input
                        className="border-1 text-slate-50 focus:ring-sky-500  appearance-none rounded   border border-graydisable px-3     py-3 font-Bitter leading-tight focus:border-primary  focus:outline-none focus:ring-1 lg:max-w-5xl "
                        id="search"
                        type="text"
                        placeholder="search"
                    />
                    <button
                        class="focus:shadow-outline ml-2 rounded bg-primary px-4 py-2 font-Bitter font-bold text-white hover:bg-textPrimary  focus:outline-none"
                        type="button"
                    >
                        search
                    </button>
                </div>
            </form>
        );
    };

    const alerts = () => {
        return alert("aaa");
    };

    return (
        <>
            <div className="mx-auto grid grid-cols-1 gap-4 px-4 pt-8 md:grid-cols-2 md:px-8 lg:max-w-7xl lg:grid-cols-2 lg:gap-1 ">
                <Search />
            </div>
            {/* <div className="mx-auto mb-3 flex gap-4 px-4 pt-8 md:px-8 lg:max-w-7xl ">
                <a
                    className="text-textPrimary hover:text-secondary "
                    href="/Report/Cat2"
                >
                    Approoved
                </a>
                <a
                    className="text-textPrimary hover:text-secondary "
                    onClick={alerts}
                >
                    Partialy A
                </a>
                <a
                    className="text-textPrimary hover:text-secondary "
                    onClick={alerts}
                >
                    Category1
                </a>
            </div> */}

            {/* <div class="mx-auto grid grid-cols-1 gap-4 px-4 pt-1 md:grid-cols-2 md:px-8 lg:max-w-7xl lg:grid-cols-4 lg:gap-1">
                <CardItem2 />
                <CardItem2 />
                <CardItem2 />
                <CardItem2 />
                <CardItem2 />
                <CardItem2 />
                <CardItem2 />
                <CardItem2 />
                <CardItem2 />
                <CardItem2 />
                <CardItem2 />
                <CardItem2 />
            </div> */}
            {/* <Router2/> */}

            <div className="mx-auto mb-3 flex gap-4 px-4 pt-8 md:px-8 lg:max-w-7xl ">
                <Tabs>
                    <TabList>
                        <Tab>
                            <h4 className="font-Bitter">Input</h4>
                        </Tab>
                        <Tab>
                            <h4 className="font-Bitter">Approved</h4>
                        </Tab>
                        <Tab>
                            <h4 className="font-Bitter">Disapproved</h4>
                        </Tab>
                    </TabList>

                    <TabPanel>
                        <div class="mx-auto grid grid-cols-1 gap-4 px-4 pt-1 md:grid-cols-2 md:px-8 lg:max-w-7xl lg:grid-cols-4 lg:gap-1">
                            <CardItem2 />
                            <CardItem2 />
                            <CardItem2 />
                            <CardItem2 />
                            <CardItem2 />
                            <CardItem2 />
                            <CardItem2 />
                            <CardItem2 />
                            <CardItem2 />
                            <CardItem2 />
                            <CardItem2 />
                            <CardItem2 />
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <h2>Any content 2</h2>
                    </TabPanel>
                    <TabPanel>
                        <h2>Any content 3</h2>
                    </TabPanel>
                </Tabs>
            </div>
        </>
    );
}
