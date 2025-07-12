import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            {/* <footer className="bg-gray-900 text-gray-300 py-1 px-4 md:px-10">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center gap-4">

                    <div className="text-center md:text-left flex gap-x-4">
                        <h2 className="text-lg font-semibold text-white">ConsultIT eSIM</h2>
                        <p className="text-sm mt-1">&copy; {new Date().getFullYear()} All rights reserved.</p>
                    </div>
                </div>
            </footer> */}
            <Footer />

        </>
    );
};

export default MainLayout;