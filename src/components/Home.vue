<template>
  <div>
    <div class="search-wrapper">
      <input class="form-control" type="text" v-model="searchText" v-on:keyup="filterList()" placeholder="Search text.."/>
    </div>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">City</th>
          <th scope="col">State</th>
          <th scope="col">Picture</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user,index) in usersList.results" :key="index">
          <td>{{user.name.first}}</td>
          <td>{{user.email}}</td>
          <td>{{user.location.city}}</td>
          <td>{{user.location.state}}</td>
          <td ><img v-bind:src="user.picture.medium"></td>
        </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item"><a class="page-link" a  style="cursor: pointer"  @click="setPage(Math.max(currentPage-1,0))">Previous</a></li>
        <li class="page-item"  v-for="pageNumber in totalPages" :key="pageNumber"><a class="page-link"  @click="setPage(pageNumber)">{{ pageNumber+0 }}</a></li>
        <li class="page-item"><a class="page-link" style="cursor: pointer"  @click="setPage(Math.min(currentPage+1,totalPages))">Next</a></li>
      </ul>
    </nav>
  </div>
</template>
<script>
import {mapGetters,mapActions} from "vuex";
export default {
    data() {
      return {
        searchText:'',
        userList:[],
        totalPages:10
      }
    },
    name: 'Users',
    methods: {
      ...mapActions(["setPage"]),
     filterList()
          {
            return this.usersList.results.filter(user => {
            return user.email.toLowerCase().includes(this.searchText.toLowerCase()) || user.name.first.toLowerCase().includes(this.searchText.toLowerCase())
            })
          },
    },
    computed:{
        ...mapGetters(["usersList"]),
    } ,
    created() {
      this.setPage()
      localStorage.setItem('pageNumber', 0)
    }
  }
</script>
<style scoped>
.search-wrapper {
  margin-bottom: 20px;  
}
</style>
