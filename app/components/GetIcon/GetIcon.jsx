import {useEffect, useState} from 'react';
import {Spinner} from '@chakra-ui/react';

// This function dynamically imports the icon library based on 'lib'
async function loadIconLibrary(lib) {
    switch (lib) {
        case 'ai':
            return await import('react-icons/ai');
        case 'bi':
            return await import('react-icons/bi');
        case 'bs':
            return await import('react-icons/bs');
        case 'cg':
            return await import('react-icons/cg');
        case 'ci':
            return await import('react-icons/ci');
        case 'di':
            return await import('react-icons/di');
        case 'fa':
            return await import('react-icons/fa');
        case 'fa6':
            return await import('react-icons/fa6');
        case 'fc':
            return await import('react-icons/fc');
        case 'fi':
            return await import('react-icons/fi');
        case 'gi':
            return await import('react-icons/gi');
        case 'go':
            return await import('react-icons/go');
        case 'gr':
            return await import('react-icons/gr');
        case 'hi':
            return await import('react-icons/hi');
        case 'hi2':
            return await import('react-icons/hi2');
        case 'im':
            return await import('react-icons/im');
        case 'io':
            return await import('react-icons/io');
        case 'io5':
            return await import('react-icons/io5');
        case 'lia':
            return await import('react-icons/lia');
        case 'lu':
            return await import('react-icons/lu');
        case 'md':
            return await import('react-icons/md');
        case 'pi':
            return await import('react-icons/pi');
        case 'ri':
            return await import('react-icons/ri');
        case 'rx':
            return await import('react-icons/rx');
        case 'si':
            return await import('react-icons/si');
        case 'sl':
            return await import('react-icons/sl');
        case 'tb':
            return await import('react-icons/tb');
        case 'tfi':
            return await import('react-icons/tfi');
        case 'ti':
            return await import('react-icons/ti');
        case 'vsc':
            return await import('react-icons/vsc');
        case 'wi':
            return await import('react-icons/wi');
        default:
            throw new Error(`Unknown icon library: ${lib}`);
    }
}

const GetIcon = ({lib, name, style}) => {
    const [IconComponent, setIconComponent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const fetchIcon = async () => {
            try {
                const iconLibrary = await loadIconLibrary(lib);
                const Icon = iconLibrary[name];
                if (!Icon) {
                    throw new Error(`Icon ${name} not found in library ${lib}`);
                }
                setIconComponent(() => Icon);
            } catch (error) {
                console.error(error);
                setIconComponent(null); // You could also set a default error icon here
            } finally {
                setLoading(false);
            }
        };

        fetchIcon();
    }, [lib, name]);

    if (loading) return <Spinner/>;

    if (!IconComponent) return <></>;

    return <IconComponent style={{...style}}/>;
};

export default GetIcon;
