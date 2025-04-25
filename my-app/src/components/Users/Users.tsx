import React, { FC } from "react";
import preloader from './../../assets/images/loader.svg'
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import { UserType } from "../../types/types";
import { useSelector } from "react-redux";

type PropsType = {
    totalUsersCount:number
    pageSize:number
    isFetching:boolean
    users: Array<UserType>
    onPageChanged: (page:number)=> void
    followingInProgress:Array<number>
    currentpage: number
    followUnfollowFlow: (user:UserType, shouldFollow:boolean) =>void
    serverError:boolean
}

let Users: FC<PropsType> = ({ totalUsersCount, pageSize, isFetching, users,
    followingInProgress, onPageChanged, currentpage, followUnfollowFlow}) => {
        // @ts-ignore
        const {serverError} = useSelector(state => state.usersPage)

    return (<>
        <div>
            <Paginator 
                totalItemsCount={totalUsersCount}
                pageSize={pageSize}
                onPageChanged={onPageChanged}
                currentpage={currentpage}
                portionSize={10}
            />
            {/* <button onClick={getUsers}>AddUsers</button>*/}

            {isFetching
                ? <img alt="" src={preloader} width={200} height={200} />
                : users.map((u, index) => <User user={u} followingInProgress={followingInProgress}
                    key={index}/>)}


        </div>
    </>
    )
}

export default Users;