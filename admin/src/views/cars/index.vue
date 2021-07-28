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
        label="Images"
        width="120"
      >
        <template slot-scope="scope">
            <span style="margin-top: 0;">
              <img v-for="(img, i) in scope.row.images.slice(0, 4)" :src="img.thumb" :alt="scope.row.make" :key="i" :class="`image imgnum ${'imgnum' + i.toString()}`">
            </span>
        </template>
      </el-table-column>

      <el-table-column
        label="Vehicle"
        width="340"
        >
        <template slot-scope="scope">
          <div style="line-height: 32px;">
            <img :src="require(`./square/${findLogo(scope.row.make)}`)" :alt="scope.row.make" style="width: 32px; height: 32px; position: absolute;">
            <a href="#" @click.prevent="openDetails(scope.row)">
              <span style="margin-left: 37px;">{{ scope.row.make }}</span>
              <span style="margin-left: 5px;">{{ scope.row.model }}</span>
              <span style="margin-left: 5px;">{{ scope.row.modelvariant }}</span>
            </a>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Preis"
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="body"
        label="Body"
      />
      <el-table-column
        prop="mileage"
        label="Mileage"
      />
      <el-table-column
        prop="rawpower"
        label="Power"
        width="140"
      >
      </el-table-column>
      <el-table-column
        label="Preis"
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Verfügbar"
        width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.available" style="color: green">
            <i class="el-icon-success"></i>
            <span style="margin-left: 5px">Ja</span>
          </span>
          <span style="color: orange" v-else>
            <i class="el-icon-warning"></i>
            <span style="margin-left: 5px">Nein</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="Operations"
        width="160">
        <template slot-scope="scope">
          <router-link class="el-button el-button--text el-button--small" tag="button" :to="{name: 'Edit vehicle', params: {id: scope.row.id, car: scope.row } }">
            Edit
          </router-link>
          <el-button type="text" @click="deleteVehicle(scope.row.id)" size="small">Delete</el-button>
          <el-button type="text" @click="duplicate(scope.row.id)" size="small">Clone</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="Datum">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { ref, reactive, onMounted } from '@vue/composition-api'
import { sb } from '@/api/supabase'
import Cookies from 'js-cookie'
import { carmodels } from '@/api/carmodels'
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
  methods: {
    CreateNew() {
      this.$router.push('/cars/add-new');
    },
    openDetails(row) {
      window.open(`${this.clone}/de/${row.slug}/id/${row.id}`, '_blank').focus();
    }
  },
  created() {
    if (this.client) {
      this.clone = this.client;
    }
  },
  setup() {
    const user = reactive({});
    const listLoading = ref(true);
    const list = ref([]);

    async function getCars() {
      const { data, error } = await sb
      .from('vehicles')
      .select()
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      if(error === null) {
        list.value = data
        listLoading.value = false;
      } else {

      }
    }

    
    function findLogo(ev) {
      let index = carmodels.findIndex(car => car.name === ev)
      return carmodels[index].logo
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
    function parseimg(img) {
      return JSON.parse(img).thumb;
    }
    
    async function deleteVehicle(id) {
      const { data, error } = await sb
        .from('vehicles')
        .delete()
        .match({ id:id })

        if(error === null) {
          await getCars()
          await this.$message(`Success! Vehicle ID# ${id} Deleted.`);
        } else {
          if(error.message.includes('orders')) {
            await this.$message('There is an existing order with this vehicle. First delete the order. ' + "\r\n" + error.message);
            this.$router.push('/orders/index')
          } else {
            await this.$message(error.message);
          }
          
        }
        
        

    }
    async function insert(obb) {
      const { data, error } = await sb
          .from('vehicles')
          .insert([obb]);
    }
    async function duplicate(id) {
      listLoading.value = true;
      const { data, error } = await sb
      .from('vehicles')
      .select()
      .eq('id', id)
      if(error === null) {
        let update = data[0]
        delete update.id
        delete update.created_at
        update.available = true
        await insert(update);
        getCars()
      } else {
        await this.$message(`Error! ${error}`);
        getCars()
      }
    }

    onMounted(() => {
      getCookie()
      .then(() => {
        getCars()
      })
    })
    return {
      parseimg,
      list,
      listLoading,
      findLogo,
      deleteVehicle,
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
