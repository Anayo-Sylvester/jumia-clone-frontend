import React from "react";

export default function RightInfoSection(){
    const GenerateTopSection = () =>{
        const topSectionData = [
            {
                icon: `${process.env.PUBLIC_URL}/icons/phone-icon-1.png`,
                title: 'CALL TO ORDER',
                message: '0700-600-0000, 02018883300'
            },
            {
                icon: `${process.env.PUBLIC_URL}/icons/seller-icon.png`,
                title: 'Sell on jumia'
            },
            {
                icon: `${process.env.PUBLIC_URL}/icons/return-icon.png`,
                title: 'Best Deals'
            }
        ]

        const TopSectionStructure = ({icon,title,message})=>(
            <li className=" flex items-center">
                <img className="h-8 mr-2" src={icon} alt={title}/>
                <div className="text flex flex-col">
                    <span className="text-[15px] font-semibold">{title}</span>
                    {message && <span className="text-xs truncate  w-5/6 overflow-hidden">${message}</span>}
                </div>
            </li>
        )
        
        const TopSectionHTML = topSectionData.map((data,index)=>(
            <TopSectionStructure key={index} icon={data.icon} title={data.title} message={data.message}/>
        )) 

        return(
            <ul className="p-4 flex flex-col justify-between bg-white rounded-md">
                {TopSectionHTML}
            </ul>
        )
    };

    return(
        <div className="hidden grid-rows-2 gap-y-4 h-full xl:grid">
                <GenerateTopSection/>
                <div className="">
                    <img className="rounded-md object-cover h-full" src={`${process.env.PUBLIC_URL}/images/jumia-spin.gif`} alt="spin gif"/>
                </div>
        </div>
    )
}