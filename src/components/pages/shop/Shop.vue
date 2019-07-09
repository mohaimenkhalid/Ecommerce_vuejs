<template>
  <div class="admin">
    <div id="header">
      <h1 class="fleft">Simple E-commerce</h1>
     
    </div>

    <div id="shop">
      <div id="shopContainer">
        <router-view />
      </div>
    </div>
    <div id="cart">
        <Cart></Cart>
    </div>

  </div>
</template>

<script>

import Cart from "../../others/Cart.vue";

export default {
  name: "Shop",
  data() {
    return {

     cart: []
    };
  },

  methods: {

 
  },

  computed:{

      total(){
        var total = 0;
        for(var i =0; i< this.cart.length; i++ ){
           var item = this.cart[i];
            total += item.quantity * item.product.price;
        }
        return total;
      }

  },


  mounted() {

    this.$eventBus.$on("addToCart", payload=>{
        this.cart.push(payload);
       
    });
   
  },

  components:{
    Cart
  }

};
</script>

