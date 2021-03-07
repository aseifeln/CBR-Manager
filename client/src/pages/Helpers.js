function roundDecimals(data, decimals) {
    return parseFloat(data).toFixed(decimals);
}

export const getGPSLocation = (input) => {
    navigator.geolocation.getCurrentPosition((data) => {
        input.value = roundDecimals(data.coords.longitude, 3) + ", " + roundDecimals(data.coords.latitude, 3);
      }, (err) => console.log(err))
};