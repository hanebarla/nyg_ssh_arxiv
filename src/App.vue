<template>
  <div id="app">
    <router-view/>
    <p class="logo"><img src="./assets/logo.png" alt="校章"></p><br/>
    Year:
    <select v-model="inputyear" @change="filtered" class="form-control">
    <option value="All">All</option>
    <option v-for="y_option in year_options" v-bind:value="y_option.year" v-bind:key="y_option.id">
    {{ y_option.year }}
    </option>
    </select>,

    Class:
    <select v-model="inputclass" @change="filtered" class="form-control">
    <option value="All">All</option>
    <option v-for="c_option in class_options" v-bind:value="c_option.class" v-bind:key="c_option.id">
    {{ c_option.class }}
    </option>
    </select>,

    発表会: <select v-model="inputpres" @change="filtered" class="form-control">
    <option value="All">All</option>
    <option v-for="pres_option in pres_options" v-bind:value="pres_option.pres" v-bind:key="pres_option.id">
    {{ pres_option.pres }}
    </option>
    </select>,

    会場:
    <select v-model="inputplace" @change="filtered" class="form-control">
    <option value="All">All</option>
    <option v-for="p_option in place_options" v-bind:value="p_option.place" v-bind:key="p_option.id">
    {{ p_option.place }}
    </option>
    </select>,<br/>
    <div v-for="item in show_items" v-bind:video="item" v-bind:key="item.id">
      {{ item.name }}<br/>
    </div>
  </div>
</template>

<!-- https://script.google.com/macros/s/AKfycbwkY30DoRmckEogVP8QB-XxhTvtJleGM8w6HTHCMFxB4iwrmPMN/exec -->
<!-- http://localhost:8080/#/assets/test.json -->

<script>
import testjson from './assets/test.json'

export default {
  name: 'App',
  data() {
      return {
        items: [],
        show_items: [],
        year_options: [],
        class_options: [{id: 0, class: 1},
                        {id: 1, class: 2}],
        pres_options: [ {id: 0, pres: "SSH発表会"},
                        {id: 1, pres: "SSJ発表会"} ],
        place_options: [ {id: 0, place: "A"},
                         {id: 1, place: "B"},
                         {id: 2, place: "C"} ],
        filter: {
                    year: "All",
                    class: "All",
                    pres: "All",
                    place: "All"
                }
    }
  },

  methods: {
    async getdata(){
      this.$axios.get("https://script.google.com/macros/s/AKfycbwkY30DoRmckEogVP8QB-XxhTvtJleGM8w6HTHCMFxB4iwrmPMN/exec",
                      {crossDomain: true})
      .then(Response => {
        console.log(Response)
        this.items = Response.data
        this.show_items = Response.data
      })
      .catch(err => {console.log(err)})
    },

    filtered: function(){
      var show_videos = [ ...this.items ] // 配列のコピ

      // まずフィルターで走査
      for(var key in this.filter){
          var temp_videos = []
          // Allならば次のフィルターに移る
          if (this.filter[key] == "All"){
              continue
          }

          // Allじゃないフィルターなら表示用のものから合致しないものを取り出す
          for(var video in show_videos){
              if(show_videos[video][key] == this.filter[key]){
                  temp_videos.push(show_videos[video])
              }
          }
          show_videos = [ ...temp_videos ]
      }
      this.show_items = show_videos
    }
  },

  computed: {
    inputyear:{
        get() {
            return this.filter.year;
        },
        set(val){
            this.filter.year = val
        }
    },
    inputclass: {
        get() {
            return this.filter.class
        },
        set(val) {
            this.filter.class = val
        }
    },
    inputpres: {
        get() {
            return this.filter.pres
        },
        set(val){
            this.filter.pres = val
        }
    },
    inputplace: {
        get() {
            return this.filter.place
        },
        set(val) {
            this.filter.place = val
        }
    },
},

  mounted () {
    for(var i = 0; i < 10; i++){
        this.year_options.push({id: i, year: 2019+i})
    }
    console.log(testjson)
    this.items = testjson
    this.show_items = testjson
  }
}
</script>

<style>
.logo img{
  width: 30%;
  height: auto;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
