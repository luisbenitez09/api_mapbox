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
        map: null
      }
    },
    computed: {
      ...mapState(["mapPin"])
    },
    mounted() {
      this.map = new mapboxgl.Map({
      container: this.id,
      style: 'mapbox://styles/lbenitez/ck7vfxqkl03uh1iqjp5b1kee5'
    });
    },
    watch: {
    mapPin() {
      console.log("Change detected");

      this.map.addControl(new mapboxgl.NavigationControl());

      var marker = new mapboxgl.Marker({
        draggable: false
      })
      .setLngLat([this.mapPin[0].long,this.mapPin[0].lat])
      .addTo(this.map);
    }
}
  }
</script>

<style lang="css" scoped>
  .maps {
    width: 100%;
    height: 100%;
  }
</style>
