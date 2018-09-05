<template>
  <v-app
    id="inspire"
    dark
  >
    <v-navigation-drawer
      v-model="drawer"
      fixed
      clipped
      app
    >
      <v-list dense>
        <v-list-tile :to="{ name: 'band'}">
            <v-list-tile-action>
              <v-icon>account_box</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                Band
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        <v-subheader class="mt-3 grey--text text--darken-1">ALBUMS</v-subheader>
        <v-list>
          <v-list-tile v-for="item in albums" :key="item.id" :to="{ path: '/album/' + item.name + '/' + item.id }">
            <v-list-tile-action>
              <v-icon>album</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.name }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-subheader class="mt-3 grey--text text--darken-1">Products</v-subheader>
        <v-list>
          <v-list-tile v-for="item in products" :key="item.id" :to="{ path: '/products/' + item.name + '/' + item.id }">
            <v-list-tile-action>
              <v-icon>local_offer</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.name }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-subheader class="mt-3 grey--text text--darken-1">Tours</v-subheader>
        <v-list>
          <v-list-tile v-for="item in tours" :key="item.id" :to="{ path: '/tours/' + item.name + '/' + item.id }">
            <v-list-tile-action>
              <v-icon>whatshot</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.name }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="red"
      dense
      fixed
      clipped-left
      app
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="mr-5 align-center">
        <span class="title">Slave &amp; Eagle fanpage</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn flat :to="{name: 'home'}">Home</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Umbraco from './services/umbraco'

@Component
export default class App extends Vue {
  data (){
    return {
      drawer: true
    }
  };

  albums: Array<object> = [];
  products: Array<object> = [];
  tours: Array<object> = [];

  created() {
    var umbraco = new Umbraco();
    var comp = this;
    umbraco.getChildren(1053).then(
      function(data : any){
        comp.albums = data.results;
      },
      function(reason : any){
        console.log(reason);
      }
    );
    umbraco.getChildren(1069).then(
      function(data : any){
        comp.products = data.results;
      },
      function(reason : any){
        console.log(reason);
      }
    );
    umbraco.getChildren(1078).then(
      function(data : any){
        comp.tours = data.results;
      },
      function(reason : any){
        console.log(reason);
      }
    );
  }
}
</script>