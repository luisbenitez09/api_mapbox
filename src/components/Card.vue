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
            <v-btn text @click="test">Ver más</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col v-for="(place, i) in places" :key="i" cols="12" >
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
import { mapGetters } from 'vuex'

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
  data: () => ({
      items: [
        {
          color: '#1F7087',
          src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          title: 'Supermodel',
          artist: 'Foster the People',
        },
        {
          color: '#952175',
          src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
          title: 'Halcyon Days',
          artist: 'Ellie Goulding',
        },
      ],
      places: ""
    }),
  computed: {
    GET_INFO() {
      return this.$store.state.mapResult;

    }
  },
  methods: {
    ...mapGetters(["GET_INFO"]),
    test() {
      this.places = this.GET_INFO.data;
      console.log(this.places[0].name);
    }
  }
}
</script>

<style lang="css" scoped>
  .floating-card {
    position: fixed;
    border-radius: 45px;
    background: white;
  }
</style>
