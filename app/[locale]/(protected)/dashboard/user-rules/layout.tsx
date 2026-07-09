import { Metadata } from "next";

export const metadata:Metadata={
    title: 'User Rules Dashboard',
    description: 'User Rules Dashboard Description'
}
const Layout = ({children}: {children: React.ReactNode}) => {
    return (
        <>
            {children}
        </>
    );
};

export default Layout;