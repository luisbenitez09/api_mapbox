<template>
  <v-app>
    <v-app-bar app dark color="blue">
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <h1>Vue.js</h1>
      </div>
      <v-spacer />
      <searchbar/>
      <v-spacer />
    </v-app-bar>

    <v-content id="map-conatainer">
      <mapa id="map-div"></mapa>
      <Card
      styles="top: 80px; left: 15px"
      elevation="20"
      min_width="450"
      max_width="500"
      min_height="120"
      max_height="1850">

      </Card>
    </v-content>
  </v-app>
</template>

<script>
// @ is an alias to /src
import Card from './../components/Card'
import Searchbar from './../components/Searchbar'
import mapa from './../components/map'

export default {
  name: 'Home',
  components: {
    mapa,
    Card,
    Searchbar
  }
}
</script>

<style lang="css" scoped>
  #map-container {
    width: 100vw;
    height: 100vh;
  }
</style>
