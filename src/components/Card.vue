<template lang="html">
    <v-card scrollable
    class="floating-card" :style="styles || ''"
    :elevation="elevation"
    :min-width="min_width"
    :max-width="max_width"
    :max-height="max_height"
    :min-height="min_height"
    >

    <v-container >
    <v-row dense>

    <v-card cols="12" v-if="selected" width="480">
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
              <v-card-subtitle v-text="place.desc"></v-card-subtitle>
              <v-card-actions>
                <v-btn text @click="seleccionar(i)">Ver más</v-btn>
              </v-card-actions>

              <!--
              <v-card-text v-if="place.select">
                <v-row align="center" class="mx-0">
                  <v-rating
                    :value="4.5"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                  ></v-rating>
                  <div class="grey--text ml-4">4.5 </div>
                </v-row>

                <div class="my-4 subtitle-1">
                  $$$ • Tipo, Tipo
                </div>

                <div>Descripci'on completa del lugar, con un texto largo blablabla etc Descripci'on completa del lugar.</div>
              </v-card-text> -->



            </div>
            <!--
            <v-avatar class="ma-3" size="125" tile >
               <v-img :src="place.img"></v-img>
            </v-avatar> -->

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
      selected: true,
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
    ...mapState(["mapResult"])
  },
  methods: {
    ...mapMutations(["SET_MAP_PIN"]),
    seleccionar(aux) {

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
}
</style>
