import { useState } from "react"
import { IKImage } from "imagekitio-react"
import ImageKit from "./Image";
import { Link } from "react-router-dom";
import { SignOutButton, SignedOut, SignedIn, UserButton, useAuth  } from "@clerk/clerk-react";


const Navbar = () => {
    const [open, setOpen] = useState(false);
    const token = useAuth().getToken()
    console.log(token)
    return (
        <div className="w-full h-16 md:h-20 flex items-center justify-between">
            {/* Logo */}
            <Link to='/' className="flex items-center gap-4 text-2xl font-bold" >
                <img src="logo.png" alt="kuda logo" className="w-8 h-8" />
                <span className="bg-blue-800 py-1 px-2 rounded-xl text-red-200">KudaBlog</span>
            </Link>
            {/* MoBile view */}
            <div className="md:hidden">
                {/* Mobile Buttons */}
                <div className="cursor-pointer text-4xl" 
                onClick={()=>setOpen((prev) => !prev)}>
                    {open ? "x" : "#"}
                </div>
                {/* Mobile Link List */}
                <div className={`w-full h-screen flex flex-col items-center gap-8 justify-center absolute top-16 transition_all case-in-out ${
                open ? "-right-0" : "-right-{100%}" }`}>
                    <Link to='/'>Home</Link>
                    <Link to='/'>Trending</Link>
                    <Link to='/'>Most Popular</Link>
                    <Link to='/'>About</Link>
                    
                    <SignedOut>
                        <Link to='login'>
                            <button className="py-2 px-4 rounded-3xl  bg-blue-500  text-white">login</button>
                        </Link>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>

            {/* Desktop View */}
            <div className='hidden md:flex items-center gap-8 xl:gap font-medium' >
                <Link to='/' className="text-blue-500">Home</Link>
                <Link to='/'>Trending</Link>
                <Link to='/'>Most Popular</Link>
                <Link to='/'>About</Link>
                <SignedOut>
                    <Link to='login'>
                        <button className="py-2 px-4 rounded-2xl bg-blue-500 text-white">login</button>
                    </Link>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
                
            </div>

        </div>
    )
}

export default Navbar;