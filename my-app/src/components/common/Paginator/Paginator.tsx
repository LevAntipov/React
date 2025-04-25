import React, { FC, useState,useEffect } from "react";
import classes from './Paginator.module.css'

type PropsType = {
    totalItemsCount:number
    pageSize:number
    onPageChanged: (page:number)=> void
    currentpage: number
    portionSize:number
}

let Paginator:FC<PropsType> = ({ totalItemsCount, pageSize, onPageChanged, currentpage, portionSize }) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize)

    const initialPortion = Math.ceil(currentpage/portionSize)
    const [portion, setportion] = useState(initialPortion)
    
    let leftPortionPageNumber = (portion - 1) * portionSize + 1 
    let rightPortionPageNumber = portion * portionSize 

    const nextportion = () => {
        setportion(portion + 1)
        onPageChanged((portion) * portionSize +1)
    }
    const pastportion = () => {
        setportion(portion - 1)
        onPageChanged(portion > 1 ? (portion-1)*portionSize : (portion - 1) *  portionSize)
    }
 
    return (
        <div>
            {/* {pages.map((page, index) =>
                <span onClick={() => onPageChanged(page)} key={index}
                    className={currentpage === page
                        ? classes["current-page"]
                        : "123"}
                >
                    {page}
                </span>)} */}

                {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(page => {
                    return <span onClick={() => onPageChanged(page)} key={page}
                    className={currentpage === page
                        ? classes["current-page"]
                        : "123"}> {page} </span>
                })}

                <div>
            {portionCount > portion &&
                <button onClick={nextportion}>Next</button>}

            {portion > 1 &&
                <button onClick={pastportion}>Prev</button>}
                </div>
        </div>
    )
}

export default Paginator;