import { FunctionComponent, ReactNode } from 'react';
import Head from 'next/head'
import getConfig from 'next/config';
const { publicRuntimeConfig: { BASE_URL } } = getConfig();
import Footer from '../components/footer'
import Header from '../components/header'

interface ILayoutProps {
    url?: string;
    className?: string;
    children?: ReactNode;
    favicon?: string;
    title?: string;
}

const Layout: FunctionComponent<ILayoutProps> = (props) => {
    const { favicon, className, title, children } = props;

    return (
        <>
            <Head>
                <title>{title}</title>
                <link rel="icon" href={favicon}/>
            </Head>
            <Header />
            <main className={` ${className}`}>
                {children}
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    )
}

Layout.defaultProps = {
    className: '',
    favicon: '/favicon.ico',
    title: 'roadSTR'
};


export default Layout;
