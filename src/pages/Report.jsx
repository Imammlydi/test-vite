import React, { useState, useEffect } from "react";
import { CardItem1, CardItem2, CardItem3, Router2 } from "../components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import dummydata from "../assets/dummydata/dummy.json";

export default function Report() {
    const [searchTerm, setSearchTerm] = useState("");
    const [datesearchTerm, setDateSearchTerm] = useState();

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (e) => {
    
        e.preventDefault();

        console.log(`Form submitted, ${searchTerm}`);    

    }

    const toSearch = (searchTerm) => (item) => {
        if (searchTerm) {
            return (
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) |
                item.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) |
                item.date.toLowerCase().includes(searchTerm.toLowerCase())
            );
        } else if (datesearchTerm) {
            return item.date
                .toLowerCase()
                .includes(datesearchTerm.toLowerCase());
        } else {
            return item.title.toLowerCase().includes(searchTerm.toLowerCase());
        }
    };

    const searchReport = dummydata
        .filter(toSearch(searchTerm))
        .map((x, idx) => (
            <CardItem2
                key={idx}
                title={
                    x.title.length > 17
                        ? x.title.substring(0, 17) + "....."
                        : x.title
                }
                desc={
                    x.description.length > 29
                        ? x.description.substring(0, 29) + "....."
                        : x.description
                }
                image={x.image}
            />
        ));

    const Search = () => {
        return (
            <form class="mb-4    pt-1 " onSubmit={handleSubmit}>
                {/* <div class="mb-1"> */}
                <input
                    className="border-1 text-slate-50 focus:ring-sky-500  appearance-none rounded   border border-graydisable px-3     py-3 font-Bitter leading-tight focus:border-primary  focus:outline-none focus:ring-1 lg:max-w-5xl "
                    id="search"
                    type="text"
                    placeholder="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                        class="focus:shadow-outline ml-2 rounded bg-primary px-4 py-2 font-Bitter font-bold text-white hover:bg-textPrimary  focus:outline-none"
                        type="submit"
                    >
                        search
                    </button>
                {/* </div> */}
            </form>
        );
    };

    return (
        <>
            <div className="mx-auto grid grid-cols-1 gap-4 px-4 pt-8 md:grid-cols-2 md:px-8 lg:max-w-7xl lg:grid-cols-2 lg:gap-1 ">
                <Search />
            </div>

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
                        <div class="mx-auto grid grid-cols-1 gap-4 px-4 pt-1 md:grid-cols-2 md:px-8 lg:max-w-7xl lg:grid-cols-5 lg:gap-2">
                            {dummydata
                                .filter(toSearch(searchTerm))
                                .map((x, idx) => (
                                    <CardItem2
                                        key={idx}
                                        title={
                                            x.title.length > 17
                                                ? x.title.substring(0, 17) +
                                                  "....."
                                                : x.title
                                        }
                                        desc={
                                            x.description.length > 29
                                                ? x.description.substring(
                                                      0,
                                                      18
                                                  ) + "....."
                                                : x.description
                                        }
                                        image={x.image}
                                    />
                                ))}
                            {/* {
                            dummydata.map((x) => {
                                return (
                                    <CardItem2
                                        title={x.title.length > 17 ? x.title.substring(0,17) + '.....': x.title }
                                        desc={x.description.length > 29 ? x.description.substring(0,29) + '.....': x.description }
                                        image={x.image}
                                    />
                                );
                            })
                            } */}
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