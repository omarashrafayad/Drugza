import { Metadata } from "next";

export const metadata:Metadata={
    title: 'Sales',
    description: 'Sales page for all products'
}
const Layout = ({children}: {children: React.ReactNode}) => {
    return (
        <>
            {children}
        </>
    );
};

export default Layout;