<template lang="html">
  <v-row class="bar">
    <v-col class="mr-3">
      <v-text-field
        flat
        solo-inverted
        rounded
        clearable
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Buscar"
        class="hidden-sm-and-down"
        v-model="busqueda"
        @input="search()"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapMutations } from "vuex";
import axios from "axios";

export default {
  name: "Serachbar",
  data() {
    return {
      busqueda: ""
    };
  },
  methods: {
    ...mapMutations(["SET_MAP_RESULT"]),
    search() {
      //Obtencion de datos
      axios
        .get("http://localhost:3000/busqueda/", {
          params: {
            search: this.busqueda
          }
        })
        .then(response => {
          this.SET_MAP_RESULT(response.data.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="css" scoped>
.bar {
  align-items: center;
}

#btn {
  margin-left: 30px;
}
</style>
