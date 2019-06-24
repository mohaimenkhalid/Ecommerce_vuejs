<template>
  <div class="login">
    <div class="loginHeader">
      User Login
    </div>

    <div class="loginContainer">
      
      <table>
        <tr>
          <td>Username</td>
          <td>:</td>
          <td><input type="text"  placeholder="Username" v-model="user.username"></td>
        </tr>
        <tr>
          <td>Password</td>
          <td>:</td>
          <td><input type="Password"  placeholder="Password" v-model="user.password"></td>
        </tr>

        <tr>
          <td></td>
          <td></td>
          <td><button class="addBtn" @click="loginNow()" >Login</button></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>


export default {
  name: 'Login',
  data () {
    return {
      user: { username : "", password : "" }
    }
  },

  methods:{
    loginNow(){
     
      this.$eventBus.$emit("loadingStatus", true);

      var formData = this.toFormData(this.user);
      this.$axios.post("http://localhost/ecommerce_vue/src/api/api.php?action=login", formData)
      .then(res=>{
         console.log(res);
         this.$eventBus.$emit("loadingStatus", false);
         if (res.data.error) {
    
            this.$iziToast.error({
               title: 'Error',
               message: res.data.message,
            });

         }else{
           localStorage.setItem("token", res.data.token);
           this.$router.push({name: "admin"});
         }
      });
    },

    toFormData: function(obj){
        var form_data = new FormData();
            for ( var key in obj ) {
               form_data.append(key, obj[key]);
            } 
            return form_data;
        }
  },

  mounted(){
      var token = localStorage.getItem("token");

      if (token) {
        this.$router.push({name: "admin"});
      }
  },

}

</script>

