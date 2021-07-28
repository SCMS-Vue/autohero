<template>
<div class="app-container">
    <div class="dashboard-container">
        <h2>Add bank account</h2>
    </div>
    <el-form :disabled="disabled" label-position="left" label-width="100px">
        <el-form-item label="Beneficiary">
        <el-col class="line" :span="12" >
            <el-input clearable v-model="form.beneficiary" placeholder="John Doe" required />
        </el-col>
        </el-form-item>
        <br>
        <br>
        <el-form-item label="Bank name">
        <el-col class="line" :span="12" >
            <el-input clearable v-model="form.bank" placeholder="Acme. Bank" required />
        </el-col>
        </el-form-item>
        <el-form-item label="IBAN">
        <el-col class="line" :span="12" >
            <el-input clearable v-model="form.iban" placeholder="DE88 1007 0100 0123 0077 00" required />
        </el-col>
        </el-form-item>

        <el-form-item label="BIC">
        <el-col class="line" :span="12" >
            <el-input clearable v-model="form.bic" placeholder="DEUTDEBB101" required />
        </el-col>
        </el-form-item> 
        <el-form-item>
        <el-col class="line" :span="12" >
            <el-button @click.prevent="saveOptions" style="float: right">Submit</el-button>
        </el-col>
        
        </el-form-item>
        
    </el-form>
</div>

</template>

<script>
import Cookies from 'js-cookie'
import { ref, reactive, onMounted, watch } from '@vue/composition-api'
import { sb } from '@/api/supabase'
import { mapGetters } from 'vuex'
export default {
    methods: {
        async saveOptions() {
            this.disabled = true;
            const { data, error } = await sb
            .from('accounts')
            .insert([this.form]);
                if(error === null) {
                    let res = data[0]
                    this.$message(`Success! Account ID# ${res.id}`);
                    this.$router.push('/accounts/index')
                }
        }
    },
    data() {
        var disabled = false
        const form = {
            beneficiary: '',
            bank: '',
            iban: '',
            bic: '',
            user_id: this.$store.state.user.user.id
        }
        return {
            form,
            disabled: disabled,

        }
    },
    mounted() {
    }
}
</script>

<style lang="scss" scoped>

</style>