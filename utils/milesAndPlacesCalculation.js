import { calculateDistance } from "./distance";

const checkMilesShipping = async ({
    data,
    userAddress,
    setnoAddressFound,
    setoutOfRange,
    axios
}) => {
    if (!userAddress || (!userAddress.latitude && !userAddress.longitude)) {
        if (userAddress?.address1) {
            try {
                const response = await axios.get(
                    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(userAddress.address1)}&key=AIzaSyC-r86tO9gWZxzRiELiw3DQYa2D3_o1CVk`
                );
                
                if (!response?.data?.results?.length) {
                    throw new Error('No geocoding results found');
                }

                const userLat = response.data.results[0].geometry.location.lat;
                const userLng = response.data.results[0].geometry.location.lng;
                const distance = calculateDistance(
                    Number(data?.vendor?.latitude),
                    Number(data?.vendor?.longitude),
                    Number(userLat),
                    Number(userLng)
                );

                const shippingMiles = Number(data?.product?.shipping_miles?.split('.')[0] || 0);
                const isInRange = Number(distance) <= shippingMiles;

                setnoAddressFound(false);
                setoutOfRange(!isInRange);
                console.log(isInRange ? 
                    'you can purchase this product' : 
                    'this product is out of your region',
                    { distance, shippingMiles }
                );
            } catch (error) {
                console.error('Geocoding error:', error);
                setnoAddressFound(true);
                setoutOfRange(true);
            }
        } else {
            setnoAddressFound(true);
            console.log('no address found');
        }
    } else {
        const distance = calculateDistance(
            Number(userAddress.latitude),
            Number(userAddress.longitude),
            Number(data?.vendor?.latitude),
            Number(data?.vendor?.longitude)
        );
        const shippingMiles = Number(data?.product?.shipping_miles?.split('.')[0] || 0);
        const isInRange = Number(distance) <= shippingMiles;

        setnoAddressFound(false);
        setoutOfRange(!isInRange);
        console.log(isInRange ? 
            'you can purchase this product' : 
            'this product is out of your region',
            { distance, shippingMiles }
        );
    }
};

const checkPlaceShipping = ({
    data,
    userAddress,
    setnoAddressFound,
    setoutOfRange
}) => {
    if (!userAddress) {
        setnoAddressFound(true);
        console.log('no address found');
        return;
    }

    setnoAddressFound(false);
    const matchingPlaces = data?.product?.shipping_countries?.filter(
        place => place?.country?.name === userAddress?.country_name
    ) || [];

    if (!matchingPlaces.length) {
        setoutOfRange(true);
        console.log('no matching shipping countries found');
        return;
    }

    const isInRange = matchingPlaces.some(place => {
        const conditions = [

            (place?.state?.name === userAddress?.state_name &&
             place?.shipping_city === userAddress?.city &&
             place?.shipping_zip_code === userAddress?.zip),

            (!place?.state?.name &&
             place?.shipping_city === userAddress?.city &&
             place?.shipping_zip_code === userAddress?.zip),

            (place?.state?.name === userAddress?.state_name &&
             !place?.shipping_city &&
             place?.shipping_zip_code === userAddress?.zip),

            (place?.state?.name === userAddress?.state_name &&
             place?.shipping_city === userAddress?.city &&
             !place?.shipping_zip_code),

            (place?.state?.name === userAddress?.state_name &&
             !place?.shipping_city &&
             !place?.shipping_zip_code),

            (!place?.state?.name &&
             place?.shipping_city === userAddress?.city &&
             !place?.shipping_zip_code),

            (!place?.state?.name &&
             !place?.shipping_city &&
             place?.shipping_zip_code === userAddress?.zip)
        ];

        const match = conditions.some(condition => condition);
        if (match) {
            console.log('Shipping match found:', place);
        }
        return match;
    });

    setoutOfRange(!isInRange);
    console.log(isInRange ? 
        'you can purchase this product' : 
        'this product is out of your region'
    );
};

const milesAndPlacesCalculation = async (params) => {
    console.log('from places func');
    const { data } = params;

    if (!data?.product?.shipping_type) {
        console.log('No shipping type specified');
        params.setoutOfRange(false);
        return;
    }

    switch (data.product.shipping_type.toLowerCase()) {
        case 'miles':
            await checkMilesShipping(params);
            break;
        case 'place':
            checkPlaceShipping(params);
            break;
        default:
            params.setoutOfRange(false);
            console.log('Shipping type not recognized, allowing purchase');
            break;
    }
};

export default milesAndPlacesCalculation;