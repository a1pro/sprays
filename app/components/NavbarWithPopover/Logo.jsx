import {Image, Link} from "@chakra-ui/react";

export const Logo = ({logoSrc}) => {
    return (
        <Link href="/"><Image src={logoSrc} alt="logo"  width={{base:'100%',lg:'120px',md:'120px',sm:'120px'}} height={'100%'} loading="lazy"/></Link>
    )
}
