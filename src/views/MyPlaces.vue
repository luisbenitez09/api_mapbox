<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app dark >
      <v-list dense>
        <template v-for="place in mapResult">
          
          <v-list-item  :key="place.name" link >
            <v-list-item-action>
              <v-icon>mdi-map-marker</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ place.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          
        </template>
      </v-list>
    </v-navigation-drawer>

    <AppBar
      name="My Places"
      color="#181e2c"
      actionName="Home"
    />

    <v-content>
      <v-container class="fill-height" fluid>
        <v-col cols="10">
          <v-row>
            <v-col cols="5">
              <v-label><strong>Name</strong></v-label>
              <v-spacer></v-spacer>
              <v-label v-if="!edit">{{name}}</v-label>
              <v-text-field placeholder="Name" v-model="name" v-if="edit"></v-text-field>
            </v-col>
            <v-col cols="5">
              <v-label><strong>Categories</strong></v-label>
              <v-spacer></v-spacer>
              <v-label v-if="!edit">{{cats}}</v-label>
              <v-text-field placeholder="Categories" v-model="cats" v-if="edit"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="5">
              <v-label><strong>Price</strong></v-label>
              <v-spacer></v-spacer>
              <v-rating
                v-model="price"
                v-if="!edit"
                length="5"
                empty-icon="mdi-currency-usd-off"
                full-icon="mdi-currency-usd"
                readonly
                color="green"
                background-color=""
              ></v-rating>
              <v-rating
                v-model="price"
                v-if="edit"
                length="5"
                empty-icon="mdi-currency-usd-off"
                full-icon="mdi-currency-usd"
                hover
                color="green"
                background-color=""
              ></v-rating>
            </v-col>
            <v-col cols="5">
              <v-label><strong>Rank</strong></v-label>
              <v-spacer></v-spacer>
              <v-rating
                v-model="rank"
                v-if="!edit"
                readonly
                length="5"
                color="yellow darken-2"
                background-color=""
              ></v-rating>
              <v-rating
                v-model="rank"
                v-if="edit"
                hover
                length="5"
                color="yellow darken-2"
                background-color=""
              ></v-rating>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="10">
              <v-label><strong>Adress</strong></v-label>
              <v-spacer></v-spacer>
              <v-label v-if="!edit">{{address}}</v-label>
              <v-text-field placeholder="Address" v-model="address" v-if="edit"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="10">
              <v-label><strong>Description</strong></v-label>
              <v-spacer></v-spacer>
              <v-label v-if="!edit">{{desc}}</v-label>
              <v-text-field placeholder="Description" v-model="desc" v-if="edit"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="5">
              <v-label><strong>Image</strong></v-label>
              <v-spacer></v-spacer>
              <v-img width="180px" height="180" src="./../assets/logo.png" v-if="!edit"></v-img>
              <v-file-input
                v-model="image"
                v-if="edit"
                accept="image/*"
                label="Image Input"
                chips
                clearable
                color="primary"
              ></v-file-input>
            </v-col>
            <v-col cols="5">
              <v-label><strong>Color</strong></v-label>
              <v-spacer></v-spacer>
              <v-btn block :color="color" v-if="!edit"></v-btn>
              <v-color-picker
                v-model="color"
                v-if="edit"
                disabled
                hide-canvas
                hide-inputs
                show-swatches  
              ></v-color-picker>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
                <v-label>Location</v-label>
                <v-container id="mapCont">
                    <div class="maps" id="map"></div>
                </v-container>
            </v-col>
          </v-row>
          
          
        </v-col>

        <v-col cols="2" align-self="start">
          <v-row align="start">
            <v-btn color="#167ec5" block dark v-if="!edit" @click="edit = !edit">Edit</v-btn>
            <v-btn color="#167ec5" block dark v-if="edit" @click="edit = !edit">Cancel</v-btn>
            <v-btn color="success" block dark v-if="edit" style="margin-top: 15px">Save</v-btn>
          </v-row>
          <v-row style="margin-top: 15px" align="start">
            <v-btn color="red darken-1" block dark >Delete</v-btn>
          </v-row>
        </v-col>
      </v-container>
    </v-content>

    <v-btn bottom color="#167ec5" dark fab fixed right
      @click="dialog = !dialog">
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <AddPlace
      v-if="dialog"
    ></AddPlace>
    
  </v-app>
</template>

<script>
import AppBar from './../components/AppBar'
import AddPlace from './../components/AddPlace'
import { mapMutations, mapState } from "vuex";
import "mapbox-gl/dist/mapbox-gl.css"
import axios from 'axios'

var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
mapboxgl.accessToken =
  "pk.eyJ1IjoibGJlbml0ZXoiLCJhIjoiY2szdHU1czY0MDFpdTNsdDQwOGxuNHJyOSJ9.tEeMwOIWSuwmQF4eDcDrsw";

  export default {
    props: {
      source: String,
    },
    data: () => ({
      dialog: false,
      drawer: null,
      name: "UABCS",
      cats: "",
      price: 0,
      rank: 0,
      address: "",
      desc: "",
      image: null,
      color: "",
      lat: "",
      long: "",
      marker: new mapboxgl.Marker(),
      edit: false,
    }),
    methods: {
      ...mapMutations(["SET_MAP_RESULT", "SET_LOGGED_AREA"]),
    },
    computed: {
    ...mapState(["userData","mapResult"] ),
  },
    mounted() {
      this.SET_LOGGED_AREA(true);
      axios
        .get("http://localhost:3000/lugares/getplacesFiltered", {
          params: {
            search: this.busqueda,
            id: this.userData.user.id,
          },
          headers: {
            authorization: this.userData.token,
          },
        })
        .then(response => {
          this.SET_MAP_RESULT(response.data.data);
          console.log(response.data.data);
        })
        .catch(error => {
          console.log(error);
        });


        this.map = new mapboxgl.Map({
          container: "map",
          style: "mapbox://styles/lbenitez/ck80nhopu0yu61ipeuegtbt63"
        });
        this.map.addControl(new mapboxgl.NavigationControl());
        
    },
    components: {
        AppBar,
        AddPlace,
    }
  }
</script>
<style lang="css">
  #map {
        width: 50vw;
        height: 50vh;
    }
</style>