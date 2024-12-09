import { Outlet } from "react-router-dom"
import Navbar from "../Components/Navbar"


const MainLayout = () => {
    return (
        <div className='px-4 md:px-8 lg:px-32 xl:px-32 2xl:px-64'>
             <Navbar />

             {/* Show page contern */}
             <Outlet />
        </div>
    )
}

export default MainLayout