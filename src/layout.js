import { Header } from "./components/Header/header";
import { Outlet } from "react-router-dom";
import { Footer } from "./components/Footer";

export const MainLayout = () => {
    return(
        <>
        <Header/>
        <div style={{minHeight: '70vh'}}>
        <Outlet />
        </div>
        
        <Footer />
        </>

    )
}