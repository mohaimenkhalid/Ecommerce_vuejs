<template>
  <div>
    <!-- Add Model -->

    <modal
      modalHeading="Add New product"
      :cond="showingAddModal"
      @modalClose="showingAddModal = false"
    >
      <table>
        <tr>
          <td>Product Name</td>
          <td>
            <input type="text" id="newcatname" v-model="newproduct.name" placeholder="Product Name" />
          </td>
        </tr>

        <tr>
          <td>Category</td>
          <td>
            <select v-model="newproduct.category">
              <option value>-- Select Category --</option>

              <option v-for="c in allcategories" :value="c.id">{{ c.cname }}</option>
            </select>
          </td>
        </tr>

        <tr>
          <td>Supplier</td>
          <td>
            <select v-model="newproduct.supplier">
              <option value>-- Select Supplier --</option>

              <option v-for="s in allsuppliers" :value="s.id">{{ s.sname }}</option>
            </select>
          </td>
        </tr>

        <tr>
          <td>Price</td>
          <td>
            <input type="number" v-model="newproduct.price" placeholder="Product Price" />
            <label>
              <input type="checkbox" v-model="newproduct.negotiable" /> Negotiable
            </label>
          </td>
        </tr>

        <tr>
          <td>Image</td>
          <td>
            <input type="file" id="image" @change="onfilechange" />
          </td>
        </tr>

        <tr>
          <td></td>
          <td>
            <progress :value="percent" max="100" v-if="percent != 0 && percent != 100 "></progress>
            <span v-if="percent != 0 && percent != 100 ">{{ percent }} %</span>
            <br />
            <br />
            <img
              :src="'http://localhost/ecommerce_vue/src' + newproduct.image"
              alt="No image selected"
              width="150"
            />
          </td>
        </tr>

        <tr>
          <td>Description</td>
          <td>
            <textarea
              rows="4"
              type="text"
              id="newcatname"
              v-model="newproduct.description"
              placeholder="Write a short Description"
            ></textarea>
          </td>
        </tr>

        <tr>
          <td></td>
          <td>
            <button class="btnSave" @click="addNewproduct()">Save</button>
          </td>
        </tr>
      </table>
    </modal>

    <!-- Edit Model -->

    <modal
      modalHeading="Update This product"
      :cond="showingEditModal"
      @modalClose="showingEditModal = false"
    >
      <table>
        <tr>
          <td>Product Name</td>
          <td>
            <input type="text" v-model="clickedProduct.pname" placeholder="Product Name" />
          </td>
        </tr>

        <tr>
          <td>Category</td>
          <td>
            <select v-model="clickedProduct.category">
              <option value>-- Select Category --</option>

              <option v-for="c in allcategories" :value="c.id">{{ c.cname }}</option>
            </select>
          </td>
        </tr>

        <tr>
          <td>Supplier</td>
          <td>
            <select v-model="clickedProduct.supplier">
              <option value>-- Select Supplier --</option>

              <option v-for="s in allsuppliers" :value="s.id">{{ s.sname }}</option>
            </select>
          </td>
        </tr>

        <tr>
          <td>Price</td>
          <td>
            <input type="number" v-model="clickedProduct.price" placeholder="Product Price" />
            <label>
              <input type="checkbox" v-model="newproduct.negotiable" /> Negotiable
            </label>
          </td>
        </tr>

        <tr>
          <td></td>
          <td>
            <progress :value="percent" max="100" v-if="percent != 0 && percent != 100 "></progress>
            <span v-if="percent != 0 && percent != 100 ">{{ percent }} %</span>
            <br />
            <br />
            <img
              :src="'http://localhost/ecommerce_vue/src' + clickedProduct.image"
              alt="No image selected"
              width="150"
            />
          </td>
        </tr>

        <tr>
          <td>Description</td>
          <td>
            <textarea
              rows="4"
              type="text"
              id="newcatname"
              v-model="clickedProduct.description"
              placeholder="Write a short Description"
            ></textarea>
          </td>
        </tr>

        <tr>
          <td></td>
          <td>
            <button class="btnSave" @click="updateproduct()">Update</button>
          </td>
        </tr>
      </table>
    </modal>

    <!-- Delete Model -->

    <modal
      modalHeading="Delete This Product"
      :cond="showingDeleteModal"
      @modalClose="showingDeleteModal = false"
    >
      <table>
        <tr>
          <td>
            <h3>Are You sure to Delete this product "{{ clickedProduct.pname }}" ?</h3>
          </td>
        </tr>

        <tr>
          <td>
            <button class="btnSave" @click="deleteProduct()">Yes</button>
            <button class="btnClose" @click="showingDeleteModal = false">No</button>
          </td>
        </tr>
      </table>
    </modal>

    <h2 class="fleft">product</h2>
    <button class="fright addBtn" @click="showingAddModal = true">Add New</button>
    <div class="clear"></div>
    <hr />

    <table class="nice-table">
      <tr>
        <th>ID</th>
        <th>Image</th>
        <th>Name</th>
        <th>Category</th>
        <th>Supplier</th>
        <th>Description</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>

      <tr v-for="(product, i) in products">
        <td>{{ i+1 }}</td>
        <td>
          <img :src="'http://localhost/ecommerce_vue/src' + product.image" width="80" height="100" />
        </td>
        <td>{{ product.pname }}</td>
        <td>{{ product.cname }}</td>
        <td>{{ product.sname }}</td>
        <td>{{ product.description }}</td>
        <td>
          <button class="edit" @click="showingEditModal = true; clickedproduct(product);">Edit</button>
        </td>
        <td>
          <button
            class="delete"
            @click="showingDeleteModal = true;  clickedproduct(product);"
          >Delete</button>
        </td>
      </tr>
    </table>
  </div>
</template>


<script>
export default {
  name: "product",
  data() {
    return {
      showingAddModal: false,
      showingEditModal: false,
      showingDeleteModal: false,

      newproduct: {
        name: "",
        description: "",
        supplier: "",
        category: "",
        price: 0,
        negotiable: true,
        image: "/assets/img/uploads/default.png"
      },

      percent: 0,

      clickedProduct: {},
      products: [],
      allcategories: [],
      allsuppliers: []
    };
  },
  mounted() {
    this.init();
  },

  methods: {
    init() {
      //get all Category...

      // this.$eventBus.$emit("loadingStatus", true);
      this.$axios
        .get(
          "http://localhost/ecommerce_vue/src/api/category_api.php?action=read"
        )
        .then(res => {
          this.$eventBus.$emit("loadingStatus", false);
          if (res.data.error) {
            this.$iziToast.error({
              title: "Error",
              message: res.data.message
            });
          } else {
            this.allcategories = res.data.category;
          }
        });

      //get all Supplier...

      // this.$eventBus.$emit("loadingStatus", true);
      this.$axios
        .get(
          "http://localhost/ecommerce_vue/src/api/supplier_api.php?action=read"
        )
        .then(res => {
          this.$eventBus.$emit("loadingStatus", false);
          if (res.data.error) {
            this.$iziToast.error({
              title: "Error",
              message: res.data.message
            });
          } else {
            this.allsuppliers = res.data.supplier;
          }
        });

      //get product...
      /*this.$eventBus.$emit("loadingStatus", true);*/
      this.$axios
        .get(
          "http://localhost/ecommerce_vue/src/api/product_api.php?action=read"
        )
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

    onfilechange(e) {
      var _this = this;
      var files = e.target.files || e.dataTransfers.files;

      //console.log(files);

      var file = files[0];

      var fd = new FormData();

      fd.append("fileToUpload", file, file.name);

      this.$axios
        .post("http://localhost/ecommerce_vue/src/api/upload.php", fd, {
          onUploadProgress: function(uploadEvent) {
            console.log(
              Math.round((uploadEvent.loaded / uploadEvent.total) * 100)
            );

            _this.percent = Math.round(
              (uploadEvent.loaded / uploadEvent.total) * 100
            );
          }
        })
        .then(res => {
          //console.log(res.data);
          _this.newproduct.image = res.data.uploaderUrl;
        });
    },

    addNewproduct() {
      //console.log(this.newproduct);

      //this.$eventBus.$emit("loadingStatus", true);
      var formData = this.toFormData(this.newproduct);

      this.$axios
        .post(
          "http://localhost/ecommerce_vue/src/api/product_api.php?action=create",
          formData
        )
        .then(res => {
          //console.log(res);
          this.newproduct = {
            name: "",
            description: "",
            supplier: "",
            category: "",
            price: 0,
            negotiable: true,
            image: "/assets/img/uploads/default.png"
          };

          this.showingAddModal = false;
          this.init();
          this.$eventBus.$emit("loadingStatus", false);

          if (res.data.error) {
            this.$iziToast.error({
              title: "Error!",
              message: res.data.message
            });
          } else {
            this.$iziToast.success({
              title: "Success!",
              message: res.data.message
            });
          }
        });
    },

    clickedproduct(product) {
      this.clickedProduct = product;
    },

    updateproduct() {
      //this.$eventBus.$emit("loadingStatus", true);

      var formData = this.toFormData(this.clickedProduct);

      this.$axios
        .post(
          "http://localhost/ecommerce_vue/src/api/product_api.php?action=update",
          formData
        )
        .then(res => {
          this.showingEditModal = false;
          this.$eventBus.$emit("loadingStatus", false);
          this.init();
          if (res.data.error) {
            this.$iziToast.error({
              title: "Error!",
              message: res.data.message
            });
          } else {
            this.$iziToast.success({
              title: "Success!",
              message: res.data.message
            });
          }
        });
    },

    deleteProduct() {
      //this.$eventBus.$emit("loadingStatus", true);
      var formData = this.toFormData(this.clickedProduct);
      this.$axios
        .post(
          "http://localhost/ecommerce_vue/src/api/product_api.php?action=delete",
          formData
        )
        .then(res => {
          this.showingDeleteModal = false;
          this.init();
          this.$eventBus.$emit("loadingStatus", false);

          if (res.data.error) {
            this.$iziToast.error({
              title: "Error",
              message: res.data.message
            });
          } else {
            this.$iziToast.success({
              title: "Success",
              message: res.data.message
            });
          }

          this.clickedproduct = {};
        });
    },

    toFormData: function(obj) {
      var form_data = new FormData();
      for (var key in obj) {
        form_data.append(key, obj[key]);
      }
      return form_data;
    }
  }
};
</script>