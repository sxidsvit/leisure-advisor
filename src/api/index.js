import axios from 'axios'

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'


export const getPlacesData = async (bounds) => {

  const { ne, sw } = bounds

  try {
    const { data: { data } } = await axios.get(URL, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },

      headers: {
        'x-rapidapi-key': 'bc98786802msh24869095cc9b47ep195ec7jsne55fe3619c0e',
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
      }
    })

    return data
  } catch (error) {
    console.log('getPlacesData - error: ', error);
  }
}