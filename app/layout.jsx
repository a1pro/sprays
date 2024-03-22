import {Outlet} from '@remix-run/react';
import {TopBar} from "~/components/TopBar/TopBar.jsx";
import {NavBar} from "~/components/NavbarWithPopover/NavbarWithPopover.jsx";
import {Footer} from "~/components/FooterWithFourColumnsOnAccent/Footer.jsx";

export const Layout = (data) => {
    return (
        <>
            <TopBar {...data}/>
            <NavBar {...data}/>
            <Outlet/>
            <Footer {...data}/>
        </>
    );
}


