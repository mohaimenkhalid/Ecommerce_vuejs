<template>
  <div class="admin">
    <div id="header">
        <h1 class="fleft">Simple E-commerce</h1>
        <a href="" title="Logout" class="fright" @click="logoutNow()">Logout</a>
    </div>
    <div id="sidebar">

      <ul class="nav">
        <li><router-link to="/admin/category">Category</router-link></li>
        <li><router-link to="/admin/supplier">Supplier</router-link></li>
        <li><router-link to="/admin/product">Product</router-link></li>
        <li><router-link to="/admin/sop">Shop</router-link></li>
      </ul>
      
    </div>

    <div id="main">
        
        <router-view />

    </div>  
    </div>
  </div>
</template>

<script>


export default {
  name: 'Admin',
  data () {
    return {
     
    }
  },

  mounted(){
      var token = localStorage.getItem("token");

      if (!token) {
        this.$router.push({name: "login"});
      }
  },

  methods:{
      logoutNow(){

        localStorage.setItem("token", "");
        this.$router.push({name: "login"});
      }
  }

}

</script>

