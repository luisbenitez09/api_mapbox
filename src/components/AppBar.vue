<template lang="html">
    <v-app-bar 
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    :name="name"
    :color="color"
    :actionName="actionName"
    app
    dark >
      <v-img
          alt="MAAP"
          class="shrink mr-2"
          contain
          src = "./../assets/maap.png"
          transition="scale-transition"
          width="90"
        ></v-img>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4" >
        <span class="hidden-sm-and-down">{{ name }}</span>
      </v-toolbar-title>
      <searchbar/>
      <v-spacer></v-spacer>
      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-apps</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="navigation">
            <v-list-item-title>{{ actionName }}</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-title>Log Out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
</template>
<script>
import Searchbar from "./Searchbar";
import { mapMutations } from "vuex";

export default {
  name: "AppBar",
  data () {
      return {
        drawer: null
      }
  },
  components: {
    Searchbar
  },
  props: [
    "name",
    "color",
    "actionName",
  ],
  methods: {
    ...mapMutations(["SET_DATA"]),
    logout() {
      this.SET_DATA({});
      this.$router.push({ name: "Login" });
    },
    navigation() {
        if (this.actionName == "Home") {
            this.$router.push({ name: "Home" });
        } else {
            this.$router.push({ name: "MyPlaces" });
        }
    }
  }
};
</script>
    
