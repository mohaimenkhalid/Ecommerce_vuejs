<template>
  <div >
      <model modalHeading="Add New Category" :cond="showingAddModal" @modalClose="showingAddModal = false">
        Add new Category...
      </model>

       <h2 class="fleft ">Categories</h2>
       <button class="fright addBtn" @click="showingAddModal = true">Add New</button>
      <div class="clear"></div>
      <hr>

    </div>
  </div>
</template>

<script>


export default {
  name: 'Category',
  data () {
    return {
     showingAddModal: false
    }
  },

  methods:{
    
  }

}

</script>

