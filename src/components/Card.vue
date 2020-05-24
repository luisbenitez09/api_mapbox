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

    <v-card cols="12" v-if="weatherWidget" width="480">
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
        <CardPlace
          :place="place"
          :i="i"
        >
        </CardPlace>
      </v-col>

    </v-row>
  </v-container>
  </v-card>
</template>

<script>
import CardPlace from './../components/CardPlace'
import { mapState } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "Card",
  data() {
    return {
      selected: true,
    }
  },
  props: [
    "styles",
    "elevation",
    "min_width",
    "max_width",
    "min_height",
    "max_height",
  ],
  components: {
    CardPlace,
  },
  computed: {
    ...mapState(["mapResult", "weatherWidget"] )

  },
  methods: {
    ...mapMutations(["SET_WIDGET"]),

  },
  watch: {
    mapResult() {
      this.SET_WIDGET(false);
    },
  },
};
</script>

<style lang="css" scoped>
.floating-card {
  position: fixed;
  border-radius: 45px;
  background-color: #3f4555;
  overflow-x:hidden;
}
</style>
