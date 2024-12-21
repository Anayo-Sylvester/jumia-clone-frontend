import React, { useMemo } from "react";

/**
 * RightInfoSection Component
 * Displays information sections with optimized rendering
 * 
 * @component
 * @returns {JSX.Element} Right information panel
 */
export default function RightInfoSection() {
    const GenerateTopSection = () => {
        // Memoize section data
        const topSectionData = useMemo(() => [
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
        ], []);

        // Memoize section structure component
        const TopSectionStructure = useMemo(() => ({ icon, title, message }) => (
            <li className="flex items-center">
                <img 
                    className="h-8 mr-2" 
                    src={icon} 
                    alt={title} 
                    loading="lazy"
                />
                <div className="text flex flex-col">
                    <span className="text-[15px] font-semibold">{title}</span>
                    {message && <span className="text-xs truncate w-5/6 overflow-hidden">{message}</span>}
                </div>
            </li>
        ), []);

        // Memoize section HTML
        const TopSectionHTML = useMemo(() => 
            topSectionData.map((data, index) => (
                <TopSectionStructure 
                    key={index} 
                    icon={data.icon} 
                    title={data.title} 
                    message={data.message} 
                />
            )), [topSectionData]);

        return (
            <ul className="p-4 flex flex-col justify-between bg-white rounded-md">
                {TopSectionHTML}
            </ul>
        );
    };

    return (
        <div className="hidden grid-rows-2 gap-y-4 h-full xl:grid">
            {/* Generate top sections */}
            <GenerateTopSection />
            {/* Loading spin GIF */}
            <div>
                <img className="rounded-md object-cover h-full" src={`${process.env.PUBLIC_URL}/images/jumia-spin.gif`} alt="spin gif" />
            </div>
        </div>
    );
}

RightInfoSection.displayName = 'RightInfoSection';
