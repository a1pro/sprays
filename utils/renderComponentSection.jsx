import {lazy, Suspense} from 'react';
import {Box} from '@chakra-ui/react';

const componentsMap = {
    'HeaderSection': lazy(() => import('@components/Hero/Hero.jsx')),
    'ContactSection': lazy(() => import('@components/ContactForm/ContactForm.jsx')),
    'MapSection': lazy(() => import('@components/Map/Map.jsx')),
    'BannerSection': lazy(() => import('@components/CallToAction/CallToAction.jsx')),
    'BlogSection': lazy(() => import('@components/BlogSection/BlogSection.jsx')),
    'TestimonialSection': lazy(() => import('@components/TestimonialSection/TestimonialSection.jsx')),
    'ServiceSection': lazy(() => import('@components/ServicesLeftAligned/ServicesLeftAligned.jsx')),
    'RichTextSection': lazy(() => import('@components/RichTextSection/RichTextSection.jsx')),
    'FaqSection': lazy(() => import('@components/FaqSection/FaqSection.jsx')),
};

export const renderComponentSection = (
    component,
    blogPosts,
    globalData,
    website,
    servicePages,
    googleApiKey
) => {
    const Component = componentsMap[component['__typename']];
    if (Component) {
        return (
            <Suspense fallback={<Box minH={'400px'} minW={'full'}/>}>
                <Component
                    {...globalData}
                    {...component}
                    posts={blogPosts}
                    website={website}
                    services={servicePages}
                    googleApiKey={googleApiKey}
                />
            </Suspense>
        );
    }
    return null;
};
