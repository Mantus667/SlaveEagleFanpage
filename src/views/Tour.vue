<template>
    <v-container fluid grid-list-md v-if="loaded">
        <v-layout row>
            <v-layout column align-center>
                 <h1>{{tour.name}}</h1>
            </v-layout>
        </v-layout>
        <v-container
            fluid
            grid-list-lg
        >
            <v-layout row wrap>
                <v-flex xs12 v-for="concert in tour.concerts" :key="concert.id">
                    <v-card color="blue-grey darken-2" class="white--text">
                        <v-carousel hide-delimiters v-if="concert.gallery.length > 0">
                            <v-carousel-item
                            v-for="(image,i) in concert.gallery"
                            :key="i"
                            :src="imageBaseUrl + image.url"
                            ></v-carousel-item>
                        </v-carousel>
                        <v-card-title primary-title>
                            <div class="headline">{{concert.name}}</div>
                        </v-card-title>
                        <v-card-text>
                            <p>{{concert.venue.name}}</p>
                            <div v-html="concert.venue.properties.address"></div>
                        </v-card-text>
                        <v-list two-line>
                            <v-subheader>Setlist</v-subheader>
                            <template v-for="(song, index) in concert.setlist">
                                <v-list-tile>
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{song.name}}</v-list-tile-title>
                                        <v-list-tile-sub-title>{{song.artist}}</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                                <v-divider v-if="index < concert.setlist.length" :key="index"></v-divider>
                            </template>
                        </v-list>
                        <v-card-actions v-if="!concert.completed">
                            <v-btn flat dark>Book now</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
      </v-container>
    </v-container>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Umbraco from '@/services/umbraco'

@Component
export default class Band extends Vue {
    tour: any = null;
    loaded: boolean = false;
    imageBaseUrl : string = this.$store.state.imageBaseUrl;
    umbraco:any = new Umbraco();

    fetchTour(id:any) : void {
        var comp = this;
        comp.umbraco.getById(id).then(
            function(data : any){
                comp.tour = data;
                comp.tour.concerts = [];
                if(comp.tour.hasChildren){
                    comp.umbraco.getChildren(id).then(
                        function(data : any){
                            comp.tour.concerts = data.results;
                            comp.loaded = true;
                        },
                        function(reason : any){
                            console.log(reason);
                        }
                    );
                } else {
                    comp.loaded = true;
                }
            },
            function(reason : any){
                console.log(reason);
            }
        );
    };

    @Watch('$route')
    routeChanged (to:any, from:any){
        this.loaded = false;
        this.fetchTour(to.params.id);
    }

    created () {
        this.fetchTour(this.$route.params.id);
    }
}
</script>
<style lang="scss" scoped>

</style>