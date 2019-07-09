<template>

  <div >

      <!-- Add Model -->
      <modal modalHeading="Add New Category" :cond="showingAddModal" @modalClose="showingAddModal = false">
          <table >
            <tr>
              <td>Category Name</td>
              <td><input type="text" id="newcatname" v-model="newcategory.name" placeholder="Category Name">
                <p style="color: red" v-if="catNameError">
                  {{ catNameError }}
                </p>
              </td>
            </tr>

            <tr>
              <td>Description</td>
              <td>
                <textarea rows="4" type="text" id="newcatname" v-model="newcategory.description" placeholder="Write a short Description">
                  
                </textarea>
              </td>
            </tr>

            <tr>
              <td></td>
              <td>
                <button class="btnSave" @click="addNewCategory()" >Save</button>
              </td>
            </tr>
          </table>
      </modal>

      <!-- Edit Model -->

      <modal modalHeading="Update Category" :cond="showingEditModal" @modalClose="showingEditModal = false">
          <table >
            <tr>
              <td>Category Name</td>
              <td><input type="text" id="newcatname" v-model="clickedcategory.sname" placeholder="Category Name"></td>
            </tr>

            <tr>
              <td>Description</td>
              <td>
                <textarea rows="4" type="text" id="newcatname" v-model="clickedcategory.description" placeholder="Write a short Description">
                  
                </textarea>
              </td>
            </tr>

            <tr>
              <td></td>
              <td>
                <button class="btnSave" @click="updateCategory()" >Update</button>
              </td>
            </tr>
          </table>
      </modal>


      <!-- Delete Model -->

      <modal modalHeading="Delete This Category" :cond="showingDeleteModal" @modalClose="showingDeleteModal = false">
          <table >
        
          <tr>
              <td><h3>Are You sure to Delete this Category "{{ clickedcategory.name }}" ?</h3></td>

              
            </tr>

            <tr>
              
              <td>
                <button class="btnSave" @click="deleteCategory()" >Yes</button>
                <button class="btnClose" @click="showingDeleteModal = false" >No</button>
              </td>
              
                
             
            </tr>
          </table>
      </modal>


       <h2 class="fleft ">Categories</h2>
       <button class="fright addBtn" @click="showingAddModal = true">Add New</button>
      <div class="clear"></div>
      <hr>

      
      <table class="nice-table" >
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          <tr>
            <td colspan="5">
              <p class="txt-center" v-if="loadingCategory">
              <img src="/static/img/loading.gif">
      </p>
            </td>
          </tr>

          <tr v-for="(category, i) in categories">
            <td> {{i+1}} </td>
            <td> {{category.cname}} </td>
            <td>{{category.description}}</td>
            <td><button class="edit" @click="showingEditModal = true; clickedCategory(category)">Edit</button></td>
            <td><button class="delete" @click="showingDeleteModal = true; clickedCategory(category)">Delete</button></td>
          </tr>
      </table>
    </div>
  </div>
</template>

<script>


export default {
  name: 'Category',
  data () {
    return {
     showingAddModal: false,
     showingEditModal: false,
     showingDeleteModal: false,
     newcategory : { name: "", description: ""},
     clickedcategory: {},
     categories: [],
     catNameError: "",
     loadingCategory : true,
    }
  },

  mounted(){

    this.init();

  },

  watch:{
        'newcategory.name': function(){
          if (this.newcategory.name.length < 5) {
            this.catNameError = "Category Name must be at least 5 characters long"
          }else{
            this.catNameError = "";
          }
        }
  },

  methods:{

    init(){

     this.loadingCategory = true;

      this.$axios.get("http://localhost/ecommerce_vue/src/api/category_api.php?action=read")
      .then(res=>{
         //console.log(res);
         this.loadingCategory = false;

         if (res.data.error) {
    
            this.$iziToast.error({
               title: 'Error',
               message: res.data.message,
            });

         }else{

            this.categories = res.data.category;
         }
      }).catch(error=>{

        if (error.response) {
          //show error
        }
        
      });

    },

    addNewCategory(){

      //field empty or not...
      if (!this.newcategory.name) {

          this.$iziToast.error({
               title: 'Error!',
               message: "Category name can not be empty!!",
            });

          var catnameinput = document.getElementById("newcatname"); 
          catnameinput.focus();

          return;
      }

      this.$eventBus.$emit("loadingStatus", true);
      var formData = this.toFormData(this.newcategory);

      this.$axios.post("http://localhost/ecommerce_vue/src/api/category_api.php?action=create", formData)
      .then(res=>{
         //console.log(res);
         this.$eventBus.$emit("loadingStatus", false);
         this.showingAddModal = false;
          this.init();
         if (res.data.error) {
    
            this.$iziToast.error({
               title: 'Error',
               message: res.data.message,
            });

         }else{

              this.$iziToast.success({
                title: 'Success',
                message: res.data.message,
              });
         }
      });
    }, 

    clickedCategory(category){
        this.clickedcategory = category;
    },


    updateCategory(){

       //field empty or not...
      if (!this.clickedcategory.name) {

          this.$iziToast.error({
               title: 'Error!',
               message: "Category name can not be empty!!",
            });

          var catnameinput = document.getElementById("newcatname"); 
          catnameinput.focus();

          return;
      }

      this.$eventBus.$emit("loadingStatus", true);

      var formData = this.toFormData(this.clickedcategory);

      this.$axios.post("http://localhost/ecommerce_vue/src/api/category_api.php?action=update", formData)
      .then(res=>{
         //console.log(res);
         this.$eventBus.$emit("loadingStatus", false);
         this.showingEditModal = false;
         this.init();
         if (res.data.error) {

            this.$iziToast.error({
               title: 'Error',
               message: res.data.message,
            });

         }else{

              this.$iziToast.success({
                title: 'Success',
                message: res.data.message,
              });
         }

          this.clickedcategory = {};
      });
    },

    deleteCategory(){

      this.$eventBus.$emit("loadingStatus", true);

      var formData = this.toFormData(this.clickedcategory);

      this.$axios.post("http://localhost/ecommerce_vue/src/api/category_api.php?action=delete", formData)
      .then(res=>{
         //console.log(res);
         this.$eventBus.$emit("loadingStatus", false);
         this.showingDeleteModal = false;
         this.init();
         if (res.data.error) {

            this.$iziToast.error({
               title: 'Error',
               message: res.data.message,
            });

         }else{

              this.$iziToast.success({
                title: 'Success',
                message: res.data.message,
              });
         }

          this.clickedcategory = {};
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
    
  }


</script>

