<template>
    <div class="app-container">
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        stripe
        style="width: 100%">
        <el-table-column
          prop="type"
          label="Type"
        />
        <el-table-column
          label="Order"
        >

        <template slot-scope="scope"> 
          <strong style="color: #e6a23c">
            <a href="#" @click.prevent="handleOpen(scope.row)">
              <i class="el-icon-connection"></i> 
              {{ scope.row.order_id}}</a> 
          </strong>
        </template>
        
        </el-table-column>
        
        <el-table-column
          label="Name">
          <template slot-scope="scope"> 
            <span v-if="scope.row.type === 'PRIVATE'">{{ scope.row.name }}</span>
            <span v-else>{{ scope.row.company.name }} / {{ scope.row.company.vat }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="email"
          label="Email"
        />
        <el-table-column
          prop="phone"
          label="Phone"
        />
        <el-table-column
          prop="payment.total"
          label="Subtotal"
        />
        <el-table-column
          label="Created"
          width="180">
          <template slot-scope="scope"> 
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.created }}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="Operations" 
          width="160">
          <template slot-scope="scope">
            <!-- <router-link class="el-button el-button--text el-button--small" tag="button" :to="{name: 'Edit account', params: {id: scope.row.id, account: scope.row } }">
              Edit
            </router-link> -->
            <el-button type="text" @click="deleteOrder(scope.row.id)" size="small">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <el-dialog
        :title="'View order #' + dialogOrder.order_id" :visible.sync="dialogVisible">
        <div v-if="dialogOrder.order_id">
          Order: <a style="color: blue;" target="_blank" :href="`${clone}/de/myhero/my-orders`">
            {{clone}}/de/myhero/my-orders
          </a>
          <br>
          <br>
        </div>
        <div> E-Mail: <label>{{dialogOrder.email}}</label> </div>
        <div> Bestellnummer: <label>{{dialogOrder.order_id}}</label>
          <br>
          <br>
        </div>
        <div> Contract: 
          <a style="color: blue;" target="_blank" :href="`${clone}/de/myhero/my-orders/${dialogOrder.id}/contract`">
            {{ clone }}/de/myhero/my-orders/{{ dialogOrder.id }}/contract
          </a>
          <br>
          <br>
        </div>
        <pre>{{ dialogOrder }}</pre>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">Cancel</el-button>
        </span>
    </el-dialog>
    </div>
</template>
  
<script>
  import { ref, reactive, onMounted } from '@vue/composition-api'
  import { sb } from '@/api/supabase'
  import Cookies from 'js-cookie'
  import { mapGetters, useStore } from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'client',
      ])
    },
    data() {
      return {
        clone: ''
      }
    },
    created() {
      if (this.client) {
        this.clone = this.client;
      }
    },
    setup() {
      const dialogVisible = ref(false)
      const user = reactive({});
      const listLoading = ref(true);
      const list = ref([]);
      const dialogOrder = ref({
        order_id: ''
      })
      async function getOrders() {
        const { data, error } = await sb
        .from('orders')
        .select()
        .eq('user_id', user.id)
        if(error === null) {
          list.value = data
          listLoading.value = false;
        } else {
  
        }
      }
  
      async function getCookie() {
        let cookie = Cookies.get('auth_user');
        let tmp_user = cookie ? JSON.parse(cookie) : null;
        if(tmp_user !== null) {
          Object.assign(user, tmp_user)
          return true
        }
  
        return false
      }
      
      async function deleteOrder(order_id) {
        const { data, error } = await sb
          .from('orders')
          .delete()
          .match({ id:order_id })
          await getOrders()
          await this.$message(`Success! Order ID# ${order_id} Deleted.`);
  
      }
      function handleClose() {
        dialogOrder.value = {order_id: ''}
        dialogVisible.value = false
      }
      function handleOpen(row) {
        dialogOrder.value = row
        dialogVisible.value = true
      }
      onMounted(() => {
        getCookie()
        .then(() => {
            getOrders()
        })
      })
      return {
        user,
        dialogOrder,
        handleOpen,
        handleClose,
        dialogVisible,
        list,
        listLoading,
        deleteOrder,
      }
    },
  }
</script>
  <style lang="scss" scoped>
  img.imgnum {
    object-fit:cover;
    width: 32px;
    height: 32px;
    position: absolute;
    border-radius: 16px;
    top: 12px;
    border: 1px solid #e6e6e6;
  }
  img.imgnum0 {
    margin-left: 0px;
  }
  img.imgnum1 {
    margin-left: 20px;
  }
  img.imgnum2 {
    margin-left: 40px;
  }
  img.imgnum3 {
    margin-left: 60px;
  }
</style>
  