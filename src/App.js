import React, { useState, useEffect } from 'react'
import { CssBaseline, Grid } from '@material-ui/core'


import { getPlacesData, getWeatherData, getSearchData } from './api'
import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'

const App = () => {

  const [coords, setCoords] = useState({})
  const [weatherData, setWeatherData] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [places, setPlaces] = useState([])
  const [bounds, setBounds] = useState(null)

  const [autocomplete, setAutocomplete] = useState(null)
  const [childClicked, setChildClicked] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [type, setType] = useState('restaurants')
  const [rating, setRating] = useState(0)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoords({ lat: latitude, lng: longitude })
    })
  }, [])

  useEffect(() => {
    const filtered = places.filter((place) =>
      (place.rating && (Number(place.rating) > rating)) ? true : false
    );
    setFilteredPlaces(filtered);
  }, [places, rating]);

  useEffect(() => {
    setIsLoading(true)
    if (bounds !== null) {
      getWeatherData(coords.lat, coords.lng)
        .then((data) => setWeatherData(data))

      getPlacesData(type, bounds)
        .then((data) => {
          setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
          setFilteredPlaces([])
          setRating('');
          setIsLoading(false)
        })
    }
  }, [type, coords, bounds])

  const onLoad = (autoC) => setAutocomplete(autoC)

  const onPlaceChanged = () => {
    const place = autocomplete.getPlace()
    if (!place.geometry || !place.geometry.location) {
      const { latitude: lat, longitude: lng } = getSearchData(place.name)
      setCoords({ lat, lng })

      console.log('onPlaceChanged - place: ', place);
      window.alert("No details available for input: '" + place.name + "'");
    }
    console.log('onPlaceChanged - place: ', place);
    const lat = place.geometry?.location.lat()
    const lng = place.geometry?.location.lng()

    setCoords({ lat, lng });
  }

  return (
    <>
      <CssBaseline>
        <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
        <Grid container spacing={3} style={{ width: '100%' }}>
          <Grid item xs={12} md={4}>
            <List
              places={filteredPlaces.length ? filteredPlaces : places}
              childClicked={childClicked}
              isLoading={isLoading}
              type={type}
              setType={setType}
              rating={rating}
              setRating={setRating}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Map
              coords={coords}
              places={filteredPlaces.length ? filteredPlaces : places}
              setCoords={setCoords}
              setBounds={setBounds}
              setChildClicked={setChildClicked}
              weatherData={weatherData}
            />
          </Grid>
        </Grid>
      </CssBaseline>
    </>
  )
}

export default App