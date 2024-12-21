import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { urls } from '../../App';
import PropTypes from 'prop-types';

/**
 * Not Found Page Component
 * Renders a 404 page with customizable message and navigation
 * Uses memoization for performance optimization
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.message] - Custom error message
 * @returns {JSX.Element} 404 page with message and navigation
 */
export default function Notfound({ message = "We couldn't find the page you are looking for" }) {
    // Memoize content sections
    const messageSection = useMemo(() => (
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
    ), [message]);

    // Memoize image section
    const imageSection = useMemo(() => (
        <div className="basis-[500px] img-container hidden md:block">
            <img 
                className="" 
                src="/images/people.svg" 
                alt="people"
                loading="lazy"
            />
        </div>
    ), []);

    return (
        <div className="md:bg-slate-200 py-9">
            <div className="flex justify-between px-0 sm:pl-8 sm:pr-16">
                <div className="md:w-[249px] md:pt-14 mx-auto md:mx-0">
                    {messageSection}
                </div>
                {imageSection}
            </div>
        </div>
    );
}

Notfound.propTypes = {
    message: PropTypes.string
};

Notfound.displayName = 'Notfound';
