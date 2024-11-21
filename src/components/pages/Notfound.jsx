import React from "react"
import { Link } from "react-router-dom"
import { responsiveScreenLimits, urls } from "../../App"

export default function Notfound(){
    return(
        <div className="md:bg-slate-200 py-9">
            <div className={`flex justify-between ${responsiveScreenLimits} px-0 sm:pl-8 sm:pr-16`}>
                <div className=" md:w-[249px] md:pt-14 mx-auto md:mx-0">
                    <div className="flex flex-col gap-3">
                        <h2 className="font-bold h-fit text-[24px]">NOT FOUND</h2>
                        <p className="">We couldn’t find the page you are looking for</p>
                        <p className="text-sm">But we have millions more shopping items for you to browse!</p>
                        <Link className="bg-orange text-white w-[150px] p-2 py-3 mt-2 rounded-md font-normal text-[14px] text-center shadow-md hover:bg-orange-dark" to={urls.home}>GO TO HOMEPAGE</Link>
                    </div>
                </div>
                <div className="basis-[500px] img-container hidden md:block">
                    <img className="" src="/images/people.svg" alt="people"/>
                </div>
            </div>
        </div>
    )
}