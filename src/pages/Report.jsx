import React, { useState, useEffect } from "react";
import {
    CardItem1,
    CardItem2,
    CardItem3,
    ModalReport,
    Pagination,
    Router2,
} from "../components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import dummydata from "../assets/dummydata/dummy.json";
import Modal from "react-modal";
import { fetchDataWithJWT, getItems } from "../services";
import ReactLoading from "react-loading";
import { dummyImageConstrution, urlGetAllReport } from "../services/url";
import jwt_decode from "jwt-decode";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";

export default function Report() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [datesearchTerm, setDateSearchTerm] = useState();
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [data, setData] = useState([]);
    const [token, seToken] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    // const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(`Form submitted, ${searchTerm}`);
    };

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

    const exp = localStorage.getItem("exp");

    useEffect(() => {
        const tokens = localStorage.getItem("token");

        seToken(tokens);

        fetchDataWithJWT(urlGetAllReport, token)
            .then((x) => {
                return (
                    setData(x.data),
                    console.table(x.data[0].image[0].imageUrl),
                    console.log(x)
                );
            })
            .catch((err) => {
                console.log(err, "------------------");
                // localStorage.removeItem("token");
                // navigate('/login');
            });
        // console.log(data,'---')
    }, [token, exp]);

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

    const ButtonFAB = ({ title, onClick }) => {
        return (
            <div>
                <button
                    className="bottom-50 right-50 absolute rounded border-none bg-primary px-4 py-2 font-bold text-textWhite hover:bg-textPrimary"
                    onClick={onClick}
                >
                    {title}
                </button>
            </div>
        );
    };

    return (
        <>
            <div className="relative">
                {/* <ButtonFAB title={"click"}/> */}
                <div className="fllex relative  mx-auto grid grid-cols-1 gap-4 px-4 pt-8 md:grid-cols-3  md:px-8 lg:max-w-7xl lg:grid-cols-3 lg:gap-1 ">
                    {/* <Button3 title={"Input "} onClick={openModal} /> */}
                    <ModalReport />
                    <div />
                    {/* <Button3 title={"a"} onClick={()=>{ console.log(data)}}/> */}
                    <Search />
                    {/* <ReactLoading type={"spin"} color={"#00AEEF"} height={50} width={60} /> */}
                </div>

                <div className="mx-auto  px-4 pt-8 md:px-8 lg:max-w-7xl  ">
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
                            {data.length >= 1 ? (
                                <div class="relative mx-auto grid grid-cols-1 gap-4 px-4 pt-1 md:grid-cols-2 md:px-8 lg:max-w-7xl lg:grid-cols-5 lg:gap-2">
                                    {/* <ButtonFAB title={"click"}/> */}
                                    {data
                                        .filter(toSearch(searchTerm))
                                        .map((x, idx) => (
                                            <CardItem2
                                                key={idx}
                                                title={
                                                    x.title.length > 17
                                                        ? x.title.substring(
                                                              0,
                                                              17
                                                          ) + "....."
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
                                                image={dummyImageConstrution}
                                                // image={`http://192.168.225.73:5000/${x.image[0]}`}
                                                // image={`http://localhost:5000/${x.image[0].imageUrl}`}
                                                date={x.tanggal}
                                                href={"/detail_report"}
                                                state={x.id}
                                                // href={{
                                                //     pathname: "/detail_report" ,
                                                //     state: x.id
                                                //  }}
                                                // href={{
                                                //     pathname: "/detail_report" ,
                                                //     state: x.id
                                                //  }}
                                            />
                                        ))}
                                </div>
                            ) : (
                                // :data=== null ? (<Navigate to="/login" replace />)
                                // <Navigate to="/login" replace />
                                <div className="mt-5 flex justify-center">
                                    <ReactLoading
                                        type={"spin"}
                                        color={"#00AEEF"}
                                        height={50}
                                        width={60}
                                    />
                                </div>
                            )}
                            {/* <Pagination
                            postsPerPage={postsPerPage}
                            totalPosts={dummydata.length}
                            paginate={paginate}
                        /> */}
                        </TabPanel>
                        <TabPanel>
                            <div class="mx-auto grid grid-cols-1 gap-4 px-4 pt-1 md:grid-cols-2 md:px-8 lg:max-w-7xl lg:grid-cols-5 lg:gap-2">
                                {dummydata.map((x) => {
                                    return (
                                        <CardItem2
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
                                                          29
                                                      ) + "....."
                                                    : x.description
                                            }
                                            image={x.image}
                                        />
                                    );
                                })}
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <h2>Any content 3</h2>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </>
    );
}
