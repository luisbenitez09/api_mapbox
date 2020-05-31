<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app dark>
      <v-list dense>
        <template v-for="place in mapResult">
          <DrawerPlace :key="place.name" :place="place"></DrawerPlace>
        </template>
      </v-list>
    </v-navigation-drawer>

    <AppBar name="My Places" color="#181e2c" actionName="Home" />

    <v-content >
      <v-container class="fill-height" fluid>
        <v-col cols="10">
          <v-row>
            <v-col cols="5">
              <v-label>
                <strong>Name</strong>
              </v-label>
              <v-spacer></v-spacer>
              <v-label v-if="!edit">{{placeSelected.name}}</v-label>
              <v-text-field placeholder="Name" v-model="name" v-if="edit"></v-text-field>
            </v-col>
            <v-col cols="5">
              <v-label>
                <strong>Categories</strong>
              </v-label>
              <v-spacer></v-spacer>
              <v-label v-if="!edit">{{placeSelected.cat}}</v-label>
              <v-text-field placeholder="Categories" v-model="cats" v-if="edit"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="5">
              <v-label>
                <strong>Price</strong>
              </v-label>
              <v-spacer></v-spacer>
              <v-rating
                v-model="price"
                v-if="!edit"
                length="5"
                empty-icon="mdi-currency-usd-off"
                full-icon="mdi-currency-usd"
                readonly
                hover
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
              <v-label>
                <strong>Rank</strong>
              </v-label>
              <v-spacer></v-spacer>
              <v-rating
                v-model="rank"
                v-if="!edit"
                readonly
                hover
                half-increments=""
                length="5"
                color="yellow darken-2"
                background-color=""
              ></v-rating>
              <v-rating
                v-model="rank"
                v-if="edit"
                length="5"
                hover
                half-increments=""
                color="yellow darken-2"
                background-color=""
              ></v-rating>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="10">
              <v-label>
                <strong>Adress</strong>
              </v-label>
              <v-spacer></v-spacer>
              <v-label v-if="!edit">{{placeSelected.dir}}</v-label>
              <v-text-field placeholder="Address" v-model="address" v-if="edit"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="10">
              <v-label>
                <strong>Description</strong>
              </v-label>
              <v-spacer></v-spacer>
              <v-label v-if="!edit">{{placeSelected.desc}}</v-label>
              <v-text-field placeholder="Description" v-model="desc" v-if="edit"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="5">
              <v-label>
                <strong>Image</strong>
              </v-label>
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
              <v-label>
                <strong>Color</strong>
              </v-label>
              <v-spacer></v-spacer>
              <v-btn block :color="placeSelected.color" v-if="!edit"></v-btn>
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
                <div class ="maps" id="map"></div>
              </v-container>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="2" align-self="start">
          <v-row align="start">
            <v-btn color="#167ec5" block dark v-if="!edit" @click="editar">Edit</v-btn>
            <v-btn color="#167ec5" block dark v-if="edit" @click="cancelar">Cancel</v-btn>
            <v-btn color="success" block dark v-if="edit" @click="save" style="margin-top: 15px">Save</v-btn>
          </v-row>
          <v-row style="margin-top: 15px" align="start">
            <v-btn color="red darken-1" block dark @click="deleteDialog = !deleteDialog">Delete</v-btn>
          </v-row>
        </v-col>
      </v-container>
    </v-content>

    <v-btn bottom color="#167ec5" dark fab fixed right @click="dialog = !dialog">
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <AddPlace v-if="dialog"></AddPlace>
    <DeleteDialog v-if="deleteDialog"></DeleteDialog>
  </v-app>
</template>

<script>
import AppBar from "./../components/AppBar";
import AddPlace from "./../components/AddPlace";
import DrawerPlace from "./../components/Atoms/DrawerPlace";
import DeleteDialog from "./../components/Atoms/DeleteDialog";
import { mapMutations, mapState } from "vuex";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";

var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
mapboxgl.accessToken =
  "pk.eyJ1IjoibGJlbml0ZXoiLCJhIjoiY2szdHU1czY0MDFpdTNsdDQwOGxuNHJyOSJ9.tEeMwOIWSuwmQF4eDcDrsw";

export default {
  props: {
    source: String
  },
  data () {
    return {
      dialog: false,
      deleteDialog: false,
      drawer: null,
      name: "",
      cats: "",
      price: 3,
      rank: 3,
      address: "",
      desc: "",
      image: null,
      color: "",
      lat: "",
      long: "",
      map: null,
      marker: new mapboxgl.Marker(),
      edit: false
    }
  },
  methods: {
    ...mapMutations(["SET_MAP_RESULT", "SET_LOGGED_AREA", "SET_PLACE_SELECTED", "SET_MAP_PIN"]),
    
    save() {
      axios
        .put("http://localhost:3000/lugares/updatePlace", 
        {
          id: this.placeSelected.id,
          name: this.name ,
          lat: this.lat ,
          long: this.long ,
          dir: this.address ,
          color: this.color ,
          img: this.image.name ,
          rank: this.rank ,
          price: this.price ,
          cat: this.cats ,
          desc: this.desc ,
        },
        {
          headers: {
            authorization: this.userData.token
          }
        })
        .then(response => {
          console.log(response);
          this.$forceUpdate();
        })
        .catch(error => {
          console.log(error);
        });
        this.edit =false;
    },
    editar() {
      this.edit = !this.edit;

      this.map.on('click', e => {
        this.marker.remove();

        var latitud = JSON.stringify(e.lngLat.lat);
        var longitud = JSON.stringify(e.lngLat.lng);

        this.marker = new mapboxgl.Marker({
            draggable: false,
            color: "red",
            anchor: 'left',
        })
        .setLngLat([longitud,latitud])
        .addTo(this.map);

        this.map.flyTo({
          center: [longitud, latitud],
          zoom: 15,
        });
        
        var myJSON = [
            {
                lat: latitud,
                long: longitud,
            }
        ];
        this.SET_MAP_PIN(myJSON);
      })
    },
    cancelar() {
      this.edit = !this.edit;

      this.map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/lbenitez/ck80nhopu0yu61ipeuegtbt63"
      });
      this.map.addControl(new mapboxgl.NavigationControl());

      
      this.marker = new mapboxgl.Marker({
            draggable: false,
            color: "red",
            anchor: 'left',
        })
        .setLngLat([this.long,this.lat])
        .addTo(this.map);

        this.map.flyTo({
          center: [this.long, this.lat],
          zoom: 15,
        });
        
    }
  },
  computed: {
    ...mapState(["userData", "mapResult", "placeSelected", "mapPin"])
  },
  watch: {
    mapPin() {
      this.name = this.placeSelected.name;
      this.cats = this.placeSelected.cat;
      this.address = this.placeSelected.dir;
      this.desc = this.placeSelected.desc;
      this.color = this.placeSelected.color;
      this.price = this.placeSelected.price;
      this.rank = this.placeSelected.rank;
      this.lat = this.mapPin[0].lat
      this.long = this.mapPin[0].long;
      

      this.marker.remove();
        this.marker = new mapboxgl.Marker({
          draggable: false,
          color: "red",
          anchor: 'left'

        })
        .setLngLat([this.mapPin[0].long,this.mapPin[0].lat])
        .addTo(this.map);

        this.map.flyTo({
          center: [this.mapPin[0].long,this.mapPin[0].lat],
          zoom: 15
        });
    },
    mapResult() {

    }
  },
  mounted() {
    this.SET_LOGGED_AREA(true);
    axios
      .get("http://localhost:3000/lugares/getplacesFiltered", {
        params: {
          search: "",
          id: this.userData.user.id
        },
        headers: {
          authorization: this.userData.token
        }
      })
      .then(response => {
        this.SET_MAP_RESULT(response.data.data);
        
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
    DrawerPlace,
    DeleteDialog,
  }
};
</script>
<style lang="css">
#map {
  width: 50vw;
  height: 50vh;
}
</style>