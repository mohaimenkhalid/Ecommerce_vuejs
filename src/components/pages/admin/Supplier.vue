<template>
	<div>

	<!-- Add Model -->

      <modal modalHeading="Add New Supplier" :cond="showingAddModal" @modalClose="showingAddModal = false">
          <table >
            <tr>
              <td>Supplier Name</td>
              <td><input type="text" id="newcatname" v-model="newsupplier.name"  placeholder="Supplier Name"></td>
            </tr>

            <tr>
              <td>Description</td>
              <td>
                <textarea rows="4" type="text" id="newcatname"  v-model="newsupplier.description" placeholder="Write a short Description">
                  
                </textarea>
              </td>
            </tr>

            <tr>
              <td></td>
              <td>
                <button class="btnSave" @click="addNewSupplier()" >Save</button>
              </td>
            </tr>
          </table>
      </modal>

      <!-- Edit Model -->

       <modal modalHeading="Update This Supplier" :cond="showingEditModal" @modalClose="showingEditModal = false">
          <table >
            <tr>
              <td>Supplier Name</td>
              <td><input type="text" id="newcatname" v-model="clickedsupplier.sname"  placeholder="Supplier Name"></td>
            </tr>

            <tr>
              <td>Description</td>
              <td>
                <textarea rows="4" type="text" id="newcatname" v-model="clickedsupplier.description"  placeholder="Write a short Description">
                  
                </textarea>
              </td>
            </tr>

            <tr>
              <td></td>
              <td>
                <button class="btnSave" @click="updateSupplier()" >Update</button>
              </td>
            </tr>
          </table>
      </modal>

      <!-- Delete Model -->

      <modal modalHeading="Delete This Supplier" :cond="showingDeleteModal" @modalClose="showingDeleteModal = false">
          <table >
        
          <tr>
              <td><h3>Are You sure to Delete this Supplier "{{ clickedsupplier.name }}" ?</h3></td>

              
            </tr>

            <tr>
              
              <td>
                <button class="btnSave" @click="deleteSupplier()" >Yes</button>
                <button class="btnClose" @click="showingDeleteModal = false" >No</button>
              </td>
              
                
             
            </tr>
          </table>
      </modal>



	<h2 class="fleft ">Supplier</h2>
       <button class="fright addBtn" @click="showingAddModal = true">Add New</button>
      <div class="clear"></div>
      <hr>

       <p class="txt-center" v-if="loadingSupplier">
        <img src="/static/img/loading.gif">
      </p>

      <table class="nice-table" v-else>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>

          <tr v-for="(supplier, i) in suppliers">
            <td> {{ i+1 }} </td>
            <td> {{ supplier.sname }} </td>
            <td> {{ supplier.description }}</td>
            <td><button class="edit" @click= "showingEditModal = true; clickedSupplier(supplier);">Edit</button></td>
            <td><button class="delete" @click="showingDeleteModal = true;  clickedSupplier(supplier);" >Delete</button></td>
          </tr>
      </table>

      </div>
</template>


<script>


export default {
  name: 'Supplier',
  data () {
    return {
     showingAddModal : false,
     showingEditModal : false,
     showingDeleteModal : false,
     newsupplier : { name : "", description : ""},
     clickedsupplier: {},
     suppliers: [],
    loadingSupplier : true,
    }
  },
  mounted() {
  	this.init();
  },

  methods: {

  	init(){

  		 this.loadingSupplier = true;

  		 this.$axios.get("http://localhost/ecommerce_vue/src/api/supplier_api.php?action=read")
  		 .then(res=>{
  		 	 this.loadingSupplier = false;
  		 			if (res.data.error) {
  		 				this.$iziToast.error({
               			title: 'Error',
               			message: res.data.message,
            			});
  		 			}else{

  		 				this.suppliers = res.data.supplier;
  		 			}
          });
  	},

    addNewSupplier(){

      	//this.$eventBus.$emit("loadingStatus", true);
      	var formData = this.toFormData(this.newsupplier);

      	this.$axios.post("http://localhost/ecommerce_vue/src/api/supplier_api.php?action=create", formData)
      		.then(res=>{

      				this.showingAddModal = false;
      				this.init();
      				this.$eventBus.$emit("loadingStatus", false);



      				if (res.data.error) {
      					 this.$iziToast.error({
              				 title: 'Error!',
              				 message: res.data.message,
            			});
      				}else{
      						this.$iziToast.success({
              				 title: 'Success!',
              				 message: res.data.message,
            			});
      				}
      		});
      },

      clickedSupplier(supplier){

      	this.clickedsupplier = supplier;
      },

      updateSupplier(){

      		this.$eventBus.$emit("loadingStatus", true);

      		var formData = this.toFormData(this.clickedsupplier);
      		this.$axios.post("http://localhost/ecommerce_vue/src/api/supplier_api.php?action=update", formData)
      		.then(res=>{
      			this.showingEditModal = false;
      			this.$eventBus.$emit("loadingStatus", false);
      			this.init();
      			if (res.data.error) {
      				this.$iziToast.error({
               			title: 'Error!',
               			message: res.data.message,
            		});
      			}else{

      				this.$iziToast.success({
               			title: 'Success!',
               			message: res.data.message,
            		});
      			}

      		});

      },

      deleteSupplier(){

      	this.$eventBus.$emit("loadingStatus", true);

      	var formData = this.toFormData(this.clickedsupplier);
      	this.$axios.post("http://localhost/ecommerce_vue/src/api/supplier_api.php?action=delete", formData)
      	.then(res=>{

      		this.showingDeleteModal = false;
      		this.init();
      		this.$eventBus.$emit("loadingStatus", false);

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

         this.clickedsupplier = {};


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