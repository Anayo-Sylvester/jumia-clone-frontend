import React from "react"
import { Link } from "react-router-dom"
import { responsiveScreenLimits, urls } from "../../App"

/**
 * Not Found Page Component
 * 
 * This component renders a 404 Not Found page when a user navigates to a non-existent route.
 * It provides a message and a link to navigate back to the homepage.
 * 
 * @component
 */

export default function Notfound({message = "We couldn’t find the page you are looking for"}) {
    return (
        <div className="md:bg-slate-200 py-9">
            <div className={`flex justify-between ${responsiveScreenLimits} px-0 sm:pl-8 sm:pr-16`}>
                <div className="md:w-[249px] md:pt-14 mx-auto md:mx-0">
                    <div className="flex flex-col gap-3">
                        <h2 className="font-bold h-fit text-[24px]">NOT FOUND</h2>
                        <p className="">{message}</p>
                        <p className="text-sm">But we have millions more shopping items for you to browse!</p>
                        <Link 
                            className="bg-orange text-white w-[150px] p-2 py-3 mt-2 rounded-md font-normal text-[14px] text-center shadow-md hover:bg-orange-dark" 
                            to={urls.home}
                        >
                            GO TO HOMEPAGE
                        </Link>
                    </div>
                </div>
                <div className="basis-[500px] img-container hidden md:block">
                    <img className="" src="/images/people.svg" alt="people"/>
                </div>
            </div>
        </div>
    )
}

/**
 * Component Props Documentation
 * 
 * @typedef {Object} NotfoundProps
 * 
 * The Notfound component does not currently accept any props directly.
 */
