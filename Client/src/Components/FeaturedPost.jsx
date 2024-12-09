import { Link } from "react-router-dom"

const FeaturedPost = () => {
    return(
        <div className="mt-8 flex flex-col md:flex-row gap-8">
            {/* First */}
            <div className="w-full lg:w-1/2 flex-col gap-4">
                {/* Image */}
                <img src="featured1.jpeg" alt="Featured 1" className="rounded-3xl object-cover" />
                {/* Details */}
                <div className="flex items-center gap-4  mt-3">
                    <h1 className="font-bold lg:text-lg">01.</h1>
                    <Link className="text-blue-800">Web Design</Link>
                    <span className="text-gray-500">2 days ago</span>
                </div>
                {/* Titles */}
                <Link className="mt-8 font-bold text-base md:text-lg lg:text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. </Link>
            </div>
            {/* others */}
            <div className="w-full lg:w-1/2 justify-between gap-4">
                {/* Second */}
                <div className="flex justify-between lg:h-1/3 gap-4 mb-4">
                    {/* Image */}
                    <img src="featured2.jpeg" alt="Featured 2" className=" w-1/3 rounded-3xl object-cover aspect-video" />
                    {/* description */}
                    <div className="w-2/3">
                        <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
                            <h1 className="font-semibold">02.</h1>
                            <Link className="text-blue-800">Web Design</Link>
                            <span className="text-gray-500 text-sm">2 days ago</span>
                        </div>
                        {/* Titles */}
                        <Link className="font-semibold text-base md:text-lg lg:text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. </Link>
                    </div>
                   
                </div>

                <div className="flex justify-between lg:h-1/3 gap-4  mb-4">
                    {/* Image */}
                    <img src="featured3.jpeg" alt="kuda logo" className=" w-1/3 rounded-3xl object-cover aspect-video" />
                    {/* description */}
                    <div className="w-2/3">
                        <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
                            <h1 className="font-semibold">03.</h1>
                            <Link className="text-blue-800">Web Design</Link>
                            <span className="text-gray-500 text-sm">3 days ago</span>
                        </div>
                        {/* Titles */}
                        <Link className="font-semibold text-base md:text-lg lg:text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. </Link>
                    </div>
                   
                </div>

                <div className="flex justify-between lg:h-1/3 gap-4  mb-4">
                    {/* Image */}
                    <img src="featured4.jpeg" alt="kuda logo" className=" w-1/3 rounded-3xl object-cover aspect-video" />
                    {/* description */}
                    <div className="w-2/3">
                        <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
                            <h1 className="font-semibold">04.</h1>
                            <Link className="text-blue-800">Web Design</Link>
                            <span className="text-gray-500 text-sm">2 days ago</span>
                        </div>
                        {/* Titles */}
                        <Link className="font-semibold text-base md:text-lg lg:text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. </Link>
                    </div>
                   
                </div>
            </div>
        </div>
    )
}

export default FeaturedPost