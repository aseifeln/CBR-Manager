export const getGPSLocation = (setState) => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((data) => {
            setState({lat: data.coords.latitude, lng: data.coords.longitude})
            //const {longitude, latitude} = data.coords;
            //setState(parseFloat(longitude).toFixed(3) + ", " + parseFloat(latitude).toFixed(3));
         }, (err) => console.log(err), {enableHighAccuracy:false, timeout: 4000, maximumAge: Infinity})
        
    }else{
        console.log('Browser does not support geolocation');
    }
};
