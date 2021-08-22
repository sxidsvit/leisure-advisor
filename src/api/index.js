import axios from 'axios'



export const getPlacesData = async (type, bounds) => {

  const { ne, sw } = bounds
  const URL = `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`

  try {
    const { data: { data } } = await axios.get(URL, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
      }
    })
    return data
  } catch (error) {
    console.log('getPlacesData - error: ', error);
  }
}

export const getWeatherData = async (lat, lng) => {
  try {
    if (lat && lng) {
      const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/find', {
        params: { lat, lon: lng },
        headers: {
          'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
          'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
        }
      });
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSearchData = async (name = `London`) => {
  try {
    const data = await axios.get(`http://www.gps-coordinates.net/api/${name}`)
    return data
  } catch (error) {
    console.log(error);
  }
}
