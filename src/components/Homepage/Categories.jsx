import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import fetchData from "../../scripts/data/fetchData";
import { apiBaseUrl, urls } from "../../App";

export default function Categories() {
    const categoriesDataRef = useRef(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData(categoriesDataRef,setLoading,`${apiBaseUrl}/category`);
    }, []);

    const GenerateCategories = () => {
        const CategoryStructure = ({ icon, categoryName}) => (
            <div className="group">
                <li className="flex group items-center cursor-pointer p-2 text-[12px] hover:text-orange">
                    <Link to={`${urls.category}/${categoryName}`}>{categoryName}</Link>
                </li>
                

            </div>
        );

        return loading ? (
            <li>Loading categories...</li>
        ) : categoriesDataRef.current && categoriesDataRef.current.hits.length > 0 ? (
                categoriesDataRef.current.hits.map((category, index) => (
                    <CategoryStructure
                        key={index}
                        categoryName={category}
                    />
                ))
            ) : (
                <li>No categories found.</li>
            );
    };



    return (
        <section className="hidden bg-white rounded-sm md:block relative">
            <ul className="h-full flex flex-col rounded-[50px] justify-between">
                <GenerateCategories />
            </ul>
        </section>
    );
}
