import React from "react";
import preloader from './../../assets/images/loader.svg'
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

let Users = ({ totalUsersCount, pageSize, isFetching, users,
    followingInProgress, onPageChanged, currentpage, followStatusChange }) => {

    return (<>
        <div>

            <Paginator totalItemsCount={totalUsersCount}
                pageSize={pageSize}
                onPageChanged={onPageChanged}
                currentpage={currentpage}
                portionSize={10}
                />

            {/* <button onClick={getUsers}>AddUsers</button>*/}

            {isFetching
                ? <img alt="" src={preloader} width={200} height={200} />
                : users.map((u, index) => <User user={u} followingInProgress={followingInProgress}
                    index={index} followStatusChange={followStatusChange} />)}


        </div>
    </>
    )
}

export default Users;