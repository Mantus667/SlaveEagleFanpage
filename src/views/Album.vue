<template>
    <v-container fluid grid-list-md v-if="album !== null">
        <v-layout row>
            <v-layout column align-center>
                 <h1>{{album.name}}</h1>
            </v-layout>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12 md4>
                <v-img :src="imageBaseUrl + album.cover.url"></v-img>
            </v-flex>
            <v-flex xs12 md8>
                <v-data-table
                    :headers="headers"
                    :items="album.songs"
                    hide-actions
                    class="elevation-1"
                >
                    <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <td class="text-xs-center">{{ props.item.properties.duration }}</td>
                    <td class="text-xs-right">{{ props.item.properties.artist }}</td>
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Umbraco from '@/services/umbraco'

@Component
export default class Band extends Vue {
    album: any = null;
    imageBaseUrl : string = 'https://slave-eagle.s1.umbraco.io/';
    umbraco:any = new Umbraco();

    headers: Array<object> = [
          {
            text: 'Name',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          {
              text: 'Duration',
              align: 'center',
              sortable: false,
              value: 'duration'
          },
          {
              text: 'Original Artist',
              align: 'right',
              sortable: false,
              value: 'artist'
          }
        ];

    fetchAlbum(id:string) : void {
        var comp = this;
        this.umbraco.getById(id).then(
            function(data : any){
                console.log(data);
                comp.album = data;
            },
            function(reason : any){
                console.log(reason);
            }
        );
    };

    @Watch('$route')
    routeChanged (to:any, from:any){
        this.fetchAlbum(to.params.id);
    }

    mounted () {
        this.fetchAlbum(this.$route.params.id);
    }
}
</script>
<style lang="scss" scoped>

</style>