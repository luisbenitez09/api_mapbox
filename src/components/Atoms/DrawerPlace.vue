<template>
  <v-list-item :place="place" link @click="test">
    <v-list-item-action>
      <v-icon>mdi-map-marker</v-icon>
    </v-list-item-action>
    <v-list-item-content>
      <v-list-item-title>{{ place.name }}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>
<script>
import { mapMutations } from "vuex";

export default {
  name: "DrawerPlace",

  props: ["place"],
  methods: {
    ...mapMutations(["SET_PLACE_SELECTED"]),
    test() {
      this.SET_PLACE_SELECTED(this.place);
      console.log(this.place);
    }
  }
};
</script>