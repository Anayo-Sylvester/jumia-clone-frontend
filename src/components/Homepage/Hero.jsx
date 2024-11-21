import React from "react";
import SlideShow from "./slideShow";
import Categories from "./Categories";
import RightInfoSection from "./RightInfo";

export default function Hero() {
    return (
        <section className="bg-black">
            <div className="grid h-full mx-auto  md:gap-3 p-3 md:grid-cols-[200px,minmax(20px,720px),1fr]">
                <Categories/>
                <SlideShow/>
                <RightInfoSection/>
            </div>
        </section>
    );
}