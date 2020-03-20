<template lang="html">
  <div class="maps" :id="id"></div>
</template>

<script>
  import { mapState } from 'vuex'

  var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
  mapboxgl.accessToken = 'pk.eyJ1IjoibGJlbml0ZXoiLCJhIjoiY2szdHU1czY0MDFpdTNsdDQwOGxuNHJyOSJ9.tEeMwOIWSuwmQF4eDcDrsw';
  export default {
    name: "mapa",
    props:["id"],
    data() {
      return {
        map: null,
        marker : new mapboxgl.Marker()
      }
    },
    computed: {
      ...mapState(["mapPin"])
    },
    watch: {
      mapPin() {

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

      }
    },
      mounted() {
      this.map = new mapboxgl.Map({
      container: this.id,
      style: 'mapbox://styles/lbenitez/ck80nhopu0yu61ipeuegtbt63'
    });
    }
  }
</script>

<style lang="css" scoped>
  .maps {
    width: 100%;
    height: 100%;
  }
  .marker {
  background-image: url('./../assets/mapbox-icon.png');
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}
</style>
