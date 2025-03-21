import React from "react";
import classes from './Paginator.module.css'

let Paginator = ({totalUsersCount,pageSize,onPageChanged,currentpage}) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages = []
    for (let i = pagesCount - 10; i <= pagesCount/*pagesCount*/; i++) {
        pages.push(i)
    }

    return (
        <div>
            {pages.map((page, index) =>
                <span onClick={() => onPageChanged(page)} key={index}
                    className={currentpage === page
                        ? classes["current-page"]
                        : "123"}
                >
                    {page}
                </span>)}
        </div>
    )
}

export default Paginator;