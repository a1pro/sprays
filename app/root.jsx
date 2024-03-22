import {Box, ChakraProvider, Heading} from '@chakra-ui/react';
import {useMemo} from 'react';
import {json, redirect} from '@remix-run/node';
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
    useMatches,
    useRouteError
} from '@remix-run/react';
import {Layout} from "~/layout.jsx";
import {createHead} from "remix-island";
import {NotFoundSection} from "@components/NotFoundSection/NotFoundSection.jsx";
import {injectGTM} from "~/utils/gtm.js";
import {client} from "~/models/contentful.server.js";

// import cssFile from 'react-toastify/dist/ReactToastify.css';

export function DynamicLinks() {
    let links = useMatches().flatMap((match) => {
        let fn = match.handle?.dynamicLinks;
        if (typeof fn !== 'function') return [];
        return fn({data: match.data});
    });

    return (
        <>
            {links.map((link) => (
                <link {...link} key={link.integrity || JSON.stringify(link)}/>
            ))}
        </>
    );
}

const dynamicLinks = ({data}) => {
    return [
        {
            rel: 'canonical', href: data?.currentUrl,
        },
        {
            rel: 'manifest', href: 'manifest.json',
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            href: data?.globalData?.favicon?.url
        },
        // {
        //     rel: 'stylesheet', href: cssFile
        // }
    ];
}

export const handle = {
    dynamicLinks,
};

export const meta = ({data}) => {
    const themeColor = data?.globalData?.themeColor?.value || '#000'
    return [
        {name: "viewport", content: 'width=device-width, initial-scale=1.0'},
        {name: "theme-color", content: themeColor}
    ]
};


export const headers = {
    'Cache-Control': 'private,no-cache,max-age=0',
    Vary: 'Cookie,Accept-Encoding,Content-Type',
};

export const loader = async ({request}) => {
    const url = new URL(request.url);
    if (url.pathname.endsWith('/') && url.pathname !== '/') {
        // Redirect to the URL without the trailing slash
        const newUrl = url.origin + url.pathname.slice(0, -1) + url.search;
        return redirect(newUrl, {status: 301});
    }
    const global = await client.fetchContentfulGlobalDataGraphQL()

    const {globalData} = global
    const gtmScript = globalData?.googleTagManagerId ? injectGTM(globalData.googleTagManagerId) : null;
    return json({
        globalData: globalData,
        navigation: global.navigation,
        footerNavigation: global.footerNavigation,
        currentUrl: url.toString(),
      
    });
};

export const Head = createHead(() => {
    return (
        <>
            <Links/>
            <Meta/>
            <DynamicLinks/>
        </>
    )
});

const Doc = ({children, gtmScript}) => {
    return (
        <>
            {gtmScript &&
                <script dangerouslySetInnerHTML={{__html: gtmScript}}/>
            }
            {children}
            <ScrollRestoration/>
            <Scripts/>
            {process.env.NODE_ENV === 'development' && <LiveReload/>}
        </>
    );
};

export const navHeight = 16;

const App = () => {
    const {globalData, navigation, footerNavigation, gtmScript} = useLoaderData();
    const [children] = useMemo(() => {
        return [<Outlet key={'1'}/>];
    }, []);

    return (
        <Doc gtmScript={gtmScript}>
            <ChakraProvider>
                <Layout {...globalData} navigation={navigation} footerNavigation={footerNavigation}>
                    {children}
                </Layout>
            </ChakraProvider>
        </Doc>
    );
};

export const CatchBoundary = () => {
    const error = useRouteError();
    return (
        <Doc>
            <ChakraProvider>
                <Box>
                    <Heading as="h1">
                        {error.status} {error.statusText}
                    </Heading>
                </Box>
            </ChakraProvider>
        </Doc>
    );
};

export const ErrorBoundary = ({error}) => {
    if (typeof process !== 'undefined') {
        console.error({
            tag: 'ErrorBoundary',
            name: error?.name,
            message: error?.message,
            stack: error?.stack,
        });
    }
    return (
        <Doc>
            <ChakraProvider>
                <NotFoundSection/>
            </ChakraProvider>
        </Doc>
    );
};

export default App;
