function roundDecimals(data, decimals) {
    return parseFloat(data).toFixed(decimals);
}

export const getGPSLocation = () => {
    navigator.geolocation.getCurrentPosition((data) => {
        return roundDecimals(data.coords.longitude, 3) + ", " + roundDecimals(data.coords.latitude, 3);
      }, (err) => console.log(err))
};
