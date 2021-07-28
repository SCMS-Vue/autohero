<template>
    <div class="app-container">
      <el-button @click="CreateNew" icon="el-icon-edit" type="primary" size="mini">Create</el-button>
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        stripe
        style="width: 100%">
        <el-table-column
          prop="beneficiary"
          label="Beneficiary"
        />
        <el-table-column
          prop="bank"
          label="Bank"
        />
        <el-table-column
          prop="iban"
          label="IBAN"
        />
        <el-table-column
          prop="bic"
          label="Bic"
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
            <router-link class="el-button el-button--text el-button--small" tag="button" :to="{name: 'Edit account', params: {id: scope.row.id, account: scope.row } }">
              Edit
            </router-link>
            <el-button type="text" @click="deleteAccount(scope.row.id)" size="small">Delete</el-button>
            <el-button type="text" @click="duplicate(scope.row.id)" size="small">Clone</el-button>
          </template>
        </el-table-column>
      </el-table>
  
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
        
      }
    },
    methods: {
      CreateNew() {
        this.$router.push('/accounts/add-account');
      },
    },
    setup() {
      const user = reactive({});
      const listLoading = ref(true);
      const list = ref([]);
  
      async function getAccounts() {
        const { data, error } = await sb
        .from('accounts')
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
      
      async function deleteAccount(id) {
        const { data, error } = await sb
          .from('accounts')
          .delete()
          .match({ id:id })
          await getAccounts()
          await this.$message(`Success! Account ID# ${id} Deleted.`);
  
      }
      async function insert(obb) {
        const { data, error } = await sb
            .from('accounts')
            .insert([obb]);
      }
      async function duplicate(id) {
        listLoading.value = true;
        const { data, error } = await sb
        .from('accounts')
        .select()
        .eq('id', id)
        if(error === null) {
          let update = data[0]
          delete update.id
          await insert(update);
          getAccounts()
        } else {
          await this.$message(`Error! ${error}`);
          getAccounts()
        }
      }
  
      onMounted(() => {
        getCookie()
        .then(() => {
            getAccounts()
        })
      })
      return {
        list,
        listLoading,
        deleteAccount,
        duplicate,
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
  