import React from 'react'
import { CssBaseline, Grid } from '@material-ui/core'


import { getPlacesData } from './api'
import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'

const App = () => {

  const [places, setPlaces] = React.useState([])
  const [coords, setCoords] = React.useState({});
  const [bounds, setBounds] = React.useState(null)

  console.log('places: ', places);

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoords({ lat: latitude, lng: longitude })
    })
  }, [])

  React.useEffect(() => {
    if (bounds !== null) {
      getPlacesData(bounds)
        .then((data) => {
          setPlaces(data)
        })
    }
  }, [coords, bounds])

  return (
    <>
      <CssBaseline>
        <Header /> >
        <Grid container spacing={3} style={{ width: '100%' }}>
          <Grid item xs={12} md={4}>
            <List places={places} />
          </Grid>
          <Grid item xs={12} md={8}>
            <Map
              setCoords={setCoords}
              setBounds={setBounds}
              coords={coords}
            />
          </Grid>
        </Grid>
      </CssBaseline>
    </>
  )
}

export default App