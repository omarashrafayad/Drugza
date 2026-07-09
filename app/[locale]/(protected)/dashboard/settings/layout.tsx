import { Metadata } from "next";

export const metadata:Metadata={
    title: 'Settings',
    description: 'Settings page for the dashboard'
}
const Layout = ({children}: {children: React.ReactNode}) => {
    return (
        <>
            {children}
        </>
    );
};

export default Layout;