<template lang="html">
  <div class="">
  <v-col v-for="(place, i) in mapResult" :key="i" cols="12" >
    <v-card :color="place.color" dark >
      <div class="d-flex flex-no-wrap justify-space-between">
        <div>
          <v-card-title class="headline" v-text="place.name"></v-card-title>
          <v-card-subtitle v-text="place.dir"></v-card-subtitle>
          <v-card-actions>
            <v-btn text @click="seleccionar(i)" id="btn">Ver más</v-btn>
          </v-card-actions>

          <v-card-text v-if="selected">
            <v-row align="center" class="mx-0">
              <v-rating
                :value="place.rank"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>
              <div class="grey--text ml-4">{{place.rank}}</div>
            </v-row>

            <div class="my-4 subtitle-1">
              {{place.price}} • {{place.cat}}
            </div>

            <div>{{place.desc}}</div>
          </v-card-text>
        </div>

        <v-avatar class="ma-3" size="125" tile >
           <v-img :src="place.img"></v-img>
        </v-avatar>

      </div>

    </v-card>
  </v-col>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "InfoCard",
  data() {
    return {
      selected: false,
    }
  },
  computed: {
    ...mapState(["mapResult"] )

  },
  watch: {
    mapResult() {
      this.selected = false;
      document.getElementById('btn').innerHTML = "Ver más";
    }
  },
  methods: {
    ...mapMutations(["SET_MAP_PIN"]),
    seleccionar(aux) {
      if (this.selected) {
        this.selected = false;
        document.getElementById('btn').innerHTML = "Ver más";
      } else {
        this.selected = true;
        document.getElementById('btn').innerHTML = "Ver menos";
      }

      var myJSON = [
        {
          lat: this.mapResult[aux].lat,
          long: this.mapResult[aux].long
        }
      ];
      this.SET_MAP_PIN(myJSON);
    }
  }
}
</script>

<style lang="css" scoped>
</style>
