import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination mx-auto  my-5 mb-3 grid  max-w-md grid-cols-12 gap-1 px-1  py-3">
                {pageNumbers.map((number) => (
                    <li key={number} className="page-item  ">
                        <a
                            onClick={() => {
                                paginate(number), console.log(number);
                            }}
                            className={
                                `${number}` === `${number}`
                                    ? "page-link rounded bg-white p-1 text-center  md:p-3  lg:p-3"
                                    : "page-link rounded bg-primary p-1 text-center  md:p-3  lg:p-3"
                            }
                        >
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
