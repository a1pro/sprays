import {Box} from "@chakra-ui/react";

const Map = ({pixelHeight, city, googleApiKey}) =>
    googleApiKey ? (
        <Box minW={'full'}>
            <iframe
                style={{width: '100%'}}
                title={'google-map-service-area'}
                height={pixelHeight}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=${googleApiKey}
    &q=${city}`}>
            </iframe>
        </Box>
    ) : null


export default Map;