<template>
  <v-app>
    <v-app-bar app dark color="#181e2c">
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="./../assets/logo.svg"
          transition="scale-transition"
          width="40"
        />
        <h1>sMap</h1>
      </div>
      <v-spacer />
      <searchbar/>
      <v-spacer />
      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="() => {}">
            <v-list-item-title>Ver mi ubicación</v-list-item-title>
          </v-list-item>
          <v-list-item @click="() => {}">
            <v-list-item-title>Ver mi lugares</v-list-item-title>
          </v-list-item>
          <v-list-item @click="() => {}">
            <v-list-item-title>Registrar nuevo lugar</v-list-item-title>
          </v-list-item>
          <v-list-item @click="() => {}">
            <v-list-item-title>Cerrar Sesión</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

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
