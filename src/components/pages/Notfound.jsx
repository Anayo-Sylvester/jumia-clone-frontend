import React from "react"
import { Link } from "react-router-dom"
import { urls } from "../../App"

export default function Notfound(){
    return(
        <div className="bg-slate-200 py-9">
            <div className="flex justify-between mx-auto lg:max-w-[950px] xl:max-w-[1184px] pl-8 pr-16">
                <div className="w-[249px] pt-14 mx-auto md:mx-0">
                    <div className="flex flex-col gap-3">
                        <h2 className="font-bold h-fit text-[24px]">NOT FOUND</h2>
                        <p className="">We couldn’t find the page you are looking for</p>
                        <p className="text-sm">But we have millions more shopping items for you to browse!</p>
                        <Link className="bg-orange text-white w-[150px] p-2 py-3 mt-2 rounded-md font-normal text-[14px] text-center shadow-md hover:bg-orange-dark" to={urls.home}>GO TO HOMEPAGE</Link>
                    </div>
                </div>
                <div className="basis-[500px] img-container hidden md:block">
                    <img className="" src="/images/people.svg" alt="" srcset="" />
                </div>
            </div>
        </div>
    )
}