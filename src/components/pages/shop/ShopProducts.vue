<template>
  <div>
    <h2>Latest Products</h2>
    <hr>

       <div class="product" v-for="product in products">

        <router-link :to="'/shop/product/' + product.id">
         <div class="productContainer">
           <img :src="'http://localhost/ecommerce_vue/src' + product.image"  />
           <br><br>
           <strong>{{ product.pname }}</strong>
           <p class="price">&#2547; {{ product.price }}</p>
         </div>
       </router-link>
       </div>
  </div>
</template>

<script>
export default {
  name: "ShopProduct",
  data() {
    return {

       products: []
    };
  },

  mounted() {
    this.init();
    console.log("mounted");
  },

  methods: {
   
    init(){
      //get product...
      /*this.$eventBus.$emit("loadingStatus", true);*/

      this.$axios.get("http://localhost/ecommerce_vue/src/api/product_api.php?action=read")
        .then(res => {
          this.$eventBus.$emit("loadingStatus", false);
          if (res.data.error) {
            this.$iziToast.error({
              title: "Error",
              message: res.data.message
            });
          } else {
            this.products = res.data.product;
          }
        });
    },
  }
};


</script>

