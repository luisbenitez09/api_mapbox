<template lang="html">
    <v-card class="floating-card" :style="styles || ''"
    :elevation="elevation"
    :min-width="min_width"
    :max-width="max_width"
    :max-height="max_height"
    :min-height="min_height"
    >
    <v-container>
    <v-row dense>
      <v-col cols="12">
        <v-card color="#385F73" dark>
          <v-card-title class="headline">Busca tus lugares favoritos</v-card-title>
          <v-card-subtitle>Encuentra los mejores lugares de La Paz, Baja California Sur.</v-card-subtitle>
          <v-card-actions>
            <v-btn text >Ver más</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col v-for="(place, i) in mapResult" :key="i" cols="12" >
        <v-card :color="place.color" dark >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="headline" v-text="place.name"></v-card-title>
              <v-card-subtitle v-text="place.desc"></v-card-subtitle>
              <v-card-actions>
                <v-btn text>Ver más</v-btn>
              </v-card-actions>
            </div>

            <v-avatar class="ma-3" size="125" tile >
              <!-- <v-img :src="item.src"></v-img> -->
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

export default {
  name: "Card",
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
