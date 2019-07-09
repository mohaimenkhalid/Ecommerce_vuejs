<template>
  <div>

   
    <h1 class="fleft">{{ product.pname }}</h1>
    <router-link to="/shop/products" class="fright">All Products</router-link>
    <div class="clear"></div>
    <hr>

    <div class="product-left">
      
      <img :src="'http://localhost/ecommerce_vue/src'+ product.image "  />
    </div>
      <br>

  <div class="product-right">
      <div class="product-description">
        <p>
          <strong>Category:</strong> {{ product.cname }} <br><br>
          <strong>Supplier:</strong> {{ product.sname }}<br><br>
          <strong>Price:</strong>{{ product.price }} <br><br>
          <strong>Description:</strong> {{ product.description }} <br><br>
        </p>
        <strong>Quantity:</strong>

        <input type="number"  class="input-number" v-model="qty">
        <button class="addBtn" @click="AddToCart()" >Add to cart</button>
      </div>
  </div>

  <div class="clear"></div>
  <hr>
  <br><br><br>
  <p class="txt-center">
    <router-link to="/shop/products" class="addBtn">Continue Shopping</router-link>
  </p>
</div>
</template>

<script>
export default {
  name: "ShopProduct",
  data() {
    return {

       productId: 0,
       product: {},
       qty: 1

    };
  },

  mounted() {
    console.log("mounted");
    this.productId = this.$route.params.pid;
    this.init();
    //console.log(this.productId);
  },

  methods: {
   
    init(){
      //get product...
      /*this.$eventBus.$emit("loadingStatus", true);*/
      this.$axios.get("http://localhost/ecommerce_vue/src/api/single-product_api.php?id=" + this.productId )
        .then(res => {
          this.$eventBus.$emit("loadingStatus", false);

          if (res.data.error) {
            this.$iziToast.error({
              title: "Error",
              message: res.data.message
            });
          } else {
            this.product = res.data.product;
          }
        });
    },

    AddToCart(){

        this.$store.commit("addToCart", { product: this.product, quantity: this.qty });
    }
  }
};


</script>

