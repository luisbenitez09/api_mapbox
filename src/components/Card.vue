<template lang="html">
    <v-card
    class="floating-card" :style="styles || ''"
    :elevation="elevation"
    :min-width="min_width"
    :max-width="max_width"
    :max-height="max_height"
    :min-height="min_height"
    >

    <v-container >
    <v-row dense>

    <v-card cols="12" v-if="!selected" width="480">
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="headline">La Paz</v-list-item-title>
          <v-list-item-subtitle>Vie, 06:30 PM, Mayormente Soleado</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-text>
        <v-row align="center">
          <v-col class="display-3" cols="6">
            23&deg;C
          </v-col>
          <v-col cols="6">
            <v-img
              src="./../assets/clima.png"
              alt="Sunny image"
              width="50"
            ></v-img>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

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

    </v-row>
  </v-container>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "Card",
  data() {
    return {
      selected: false,
      lat: "",
      long: ""
    }
  },
  props: [
    "styles",
    "elevation",
    "min_width",
    "max_width",
    "min_height",
    "max_height"
  ],
  computed: {
    ...mapState(["mapResult"] )

  },
  watch: {
    mapResult() {
      this.selected = false;
    }
  },
  methods: {
    ...mapMutations(["SET_MAP_PIN"]),
    seleccionar(aux) {
      if (this.selected) {
        this.selected = false;
        document.getElementById('btn').innerHTML = "Ver más"
      } else {
        this.selected = true;
        document.getElementById('btn').innerHTML = "Ver menos"
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
};
</script>

<style lang="css" scoped>
.floating-card {
  position: fixed;
  border-radius: 45px;
  background: white;
  overflow:hidden;
  overflow-x:hidden;
  overflow-y:scroll;
  overflow:-moz-scrollbars-vertical;
}
</style>
