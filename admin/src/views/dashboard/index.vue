<template>
  <div class="dashboard-container">
    <div class="dashboard-text" style="margin-bottom: 100px;">Welcome: {{ name }}!</div>
    <el-row :gutter="20">
      <el-col :span="4">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="require('@/assets/vehicles.jpg')" class="image">
          <div style="padding: 10px 5px;">
            <strong>Total vehicles</strong>
            <strong style="float: right">{{ vehicles }}</strong>
          </div>
          <div style="padding: 5px 8px; margin-bottom: 5px; color: #e38297;">
            <router-link to="/cars/index">View vehicles</router-link>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="require('@/assets/orders.jpg')" class="image">
          <div style="padding: 10px 5px;">
            <strong>Total orders</strong>
            <strong style="float: right">{{ orders }}</strong>
          </div>
          <div style="padding: 5px 8px; margin-bottom: 5px; color: #e38297;">
            <router-link to="/orders/index">View orders</router-link>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="require('@/assets/accounts.jpg')" class="image">
          <div style="padding: 10px 5px;">
            <strong>Total accounts</strong>
            <strong style="float: right">{{ accounts }}</strong>
          </div>
          <div style="padding: 5px 8px; margin-bottom: 5px; color: #e38297;">
            <router-link to="/accounts/index">View accounts</router-link>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { sb } from '@/api/supabase'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
    ])
  },
  data() {
    return {
      vehicles: 0,
      orders: 0,
      accounts: 0,
    }
  },
  methods: {
    getCount() {
      sb.from('vehicles').select().eq('user_id', this.$store.state.user.user.id)
        .then(response => response.data.length)
        .then(count => this.vehicles = count)
          .then(() => {
            sb.from('orders').select().eq('user_id', this.$store.state.user.user.id)
            .then(response => response.data.length)
            .then(count => this.orders = count)
              .then(() => {
                sb.from('accounts').select().eq('user_id', this.$store.state.user.user.id)
                .then(response => response.data.length)
                .then(count => this.accounts = count)
              })
          })
      
    }
  },
  mounted() {
    this.getCount()
  }
}
</script>

<style lang="scss" scoped>
.el-card__body img {
  height: 100%; width: 100%;
}
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
