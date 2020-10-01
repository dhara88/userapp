import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';


Vue.use(Vuex,axios);


export default new Vuex.Store({

    state: {
      users: [],
      totalCount: '',
      currentPage: 1,
      itemsPerPage: 0,
      resultCount: 0,
      page:1,
      totalPages:10
      
    },
    getters: {
      usersList: state => state.users,

    },
    mutations: {
      setUsers: (state, users) => (
        state.users = users
    ),

    },
    actions: {
      async setPage({commit},pageNumber) {
        localStorage.getItem('pageNumber');
        this.currentPage = pageNumber;
        const response = await axios.get("https://randomuser.me/api/?page=" + (this.currentPage-1)+"&results=10&seed=abc");
        commit("setUsers",response.data);
      }
    }

    
  });
