<template lang="html">
        <v-card :color="place.color" :place="place" dark >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="headline" v-text="place.name"></v-card-title>
              <v-card-subtitle v-text="place.dir"></v-card-subtitle>
              <v-card-actions>
                <v-btn text @click="seleccionar()">{{btn}}</v-btn>
              </v-card-actions>


              <v-card-text v-if="selected" >
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
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "CardPlace",
  data() {
    return {
      selected: false,
      btn: "Ver más",
    }
  },
  props: [
    "place",
  ],
  watch: {
    mapResult() {
      this.selected = false;
      this.btn = "Ver más";
    }
  },
  computed: {
    ...mapState(["userData"] )
  },
  methods: {
    ...mapMutations(["SET_MAP_PIN"]),
    seleccionar() {
      if (this.selected) {
        this.selected = false;
        this.btn = "Ver más";
      } else {
        this.selected = true;
        this.btn = "Ver menos";
      }
      var myJSON = [
        {
          lat: this.place.lat,
          long: this.place.long
        }
      ];
      this.SET_MAP_PIN(myJSON);
    },
  }
};
</script>

<style lang="css" scoped>

</style>
