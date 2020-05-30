<template lang="html">
  <div class="maps" :id="id"></div>
</template>

<script>
import "mapbox-gl/dist/mapbox-gl.css"
import { mapMutations } from 'vuex'

var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
mapboxgl.accessToken =
  "pk.eyJ1IjoibGJlbml0ZXoiLCJhIjoiY2szdHU1czY0MDFpdTNsdDQwOGxuNHJyOSJ9.tEeMwOIWSuwmQF4eDcDrsw";

export default {
  name: "addMap",
  props: ["id"],
  data() {
    return {
      map: null,
      marker: new mapboxgl.Marker(),
    };
  },
  methods: {
      ...mapMutations(["SET_MAP_PIN"]),
  },
  mounted() {
    this.map = new mapboxgl.Map({
      container: this.id,
      style: "mapbox://styles/lbenitez/ck80nhopu0yu61ipeuegtbt63"
    });
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      })
    );

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
  }
};
</script>

<style lang="css" scoped>
.maps {
  width: 100%;
  height: 100%;
}
.marker {
  background-image: url("./../../assets/mapbox-icon.png");
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}
</style>
