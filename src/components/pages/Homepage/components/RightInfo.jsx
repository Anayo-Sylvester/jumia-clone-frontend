import React from "react";

/**
 * RightInfoSection Component
 * Displays information sections including call-to-order, sell on Jumia, and best deals, along with a loading/spin GIF.
 */
export default function RightInfoSection() {
    /**
     * GenerateTopSection component
     * Generates a list of top sections with icons, titles, and optional messages.
     */
    const GenerateTopSection = () => {
        // Data for the top sections
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
        ];

        // Component for individual section structure
        const TopSectionStructure = ({ icon, title, message }) => (
            <li className="flex items-center">
                <img className="h-8 mr-2" src={icon} alt={title} />
                <div className="text flex flex-col">
                    <span className="text-[15px] font-semibold">{title}</span>
                    {message && <span className="text-xs truncate w-5/6 overflow-hidden">{message}</span>}
                </div>
            </li>
        );

        // Mapping through topSectionData to create the list items
        const TopSectionHTML = topSectionData.map((data, index) => (
            <TopSectionStructure key={index} icon={data.icon} title={data.title} message={data.message} />
        ));

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
