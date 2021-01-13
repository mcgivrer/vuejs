import Vue from "vue";
import Axios from "axios";

Vue.prototype.$http = Axios;

Vue.component("card", {
  props: ["person"],
  template:
    '<div  class="card" @click="getDetailsf(person.id)"><div class="image"><img :src="person.avatar" /></div><div class="content"><div class="header">{{ person.firstname }} {{ person.lastname }}</div><div class="meta"><a>{{ person.relationType}}</a></div><div class="description">{{person.description}}</div></div><div class="extra content"><span class="right floated"> Joined in {{person.joinedAt}} </span><span><i class="user icon"></i>{{ person.friendsCount}} Friends</span></div></div>',
});

var vm = new Vue({
  el: "#app",
  data: {
    status: {
      message: "Hello World!",
      code: 200,
    },
    contacts: [],
    games: [],
    movies: [],
  },
  methods: {
    close: function () {
      this.success = false;
    },
    getDetails: function (id) {
      console.log(id);
    }
  },
  mounted: function () {
    console.log("Start mounting data")
    const rootURI='http://127.0.0.1:5000/data/'
    this.$http
      .get(rootURI+"contact.json")
      .then((response) => {
        this.persons = response;
        console.log(response);
      })
      .catch((error) => console.log(error));
    this.$http
      .get(rootURI+"movie.json")
      .then((response) => {
        this.movies = response;
        console.log(response);
      })
      .catch((error) => console.log(error));

    this.$http
      .get(rootURI+"game.json")
      .then((response) => {
        this.games = response;
        console.log(response);
      })
      .catch((error) => console.log(error));
  }
});
