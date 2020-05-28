<template>
  <v-app>
    <AppBar
      name="Home"
      color="#181e2c"
      actionName="My Places"
    />

    <v-content id="map-conatainer">
      <mapa id="map-div"></mapa>
      <Card
      styles="top: 80px; left: 15px"
      elevation="20"
      min_width="450"
      max_width="500"
      min_height="120"
      max_height="550"
      >

      </Card>
    </v-content>
  </v-app>
</template>

<script>
import AppBar from './../components/AppBar'
import Card from './../components/Card'
import mapa from './../components/map'

export default {
  name: 'Home',
  components: {
    mapa,
    Card,
    AppBar,
  }
}
</script>

<style lang="css" scoped>
  #map-container {
    width: 100vw;
    height: 100vh;
  }
</style>
