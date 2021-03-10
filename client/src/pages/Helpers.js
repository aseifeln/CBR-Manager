function roundDecimals(data, decimals) {
    return parseFloat(data).toFixed(decimals);
}

export const getGPSLocation = () => {
    if(!navigator.geolocation){
        alert('Browser does not support geolocation');
    }else{
        navigator.geolocation.getCurrentPosition((data) => {
            return roundDecimals(data.coords.longitude, 3) + ", " + roundDecimals(data.coords.latitude, 3);
         }, (err) => console.log(err), {enableHighAccuracy:false, timeout: 4000, maximumAge: Infinity})
    }
};
