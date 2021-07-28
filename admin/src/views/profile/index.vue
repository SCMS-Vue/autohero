<template>
<div class="app-container">
    <el-form :disabled="disabled" v-model="form" ref="form" label-position="left" label-width="100px">
      <el-form-item>
            <el-col class="line" :span="12" >
                <el-card style="padding: 0px; max-width: 200px" >
                    <img :src="newavatar" class="image" style="padding: 0px; width: 100%; height: auto;">
                </el-card>
            </el-col>
      </el-form-item>
      <el-form-item label="Avatar">
        <el-col class="line" :span="12" >
            <el-input clearable v-model="newavatar" placeholder="Img URL" required />
        </el-col>
      </el-form-item>
      <el-form-item label="Client URL">
        <el-col class="line" :span="12" >
            <el-input :disabled="locked" clearable v-model="newclient" placeholder="Client URL" required />
        </el-col>
        <el-col class="line" :span="4" >
            <el-button v-if="locked" style="margin-start: 5px;" type="text" @click="open">enable</el-button>
            <el-button v-else style="margin-start: 5px;" type="text" @click="locked = true">disable</el-button>
        </el-col>
      </el-form-item>
      <el-form-item label="Beneficiary">
        <el-col class="line" :span="12" >
            <el-input disabled clearable v-model="form.beneficiary" placeholder="John Doe" required />
        </el-col>
        
      </el-form-item>
      <br>
      <br>
      <el-form-item label="Bank name">
        <el-col class="line" :span="12" >
            <el-input disabled clearable v-model="form.bankName" placeholder="Acme. Bank" required />
        </el-col>
      </el-form-item>
      <el-form-item label="IBAN">
        <el-col class="line" :span="12" >
            <el-input disabled clearable v-model="form.iban" placeholder="DE88 1007 0100 0123 0077 00" required />
        </el-col>
      </el-form-item>

      <el-form-item label="BIC">
        <el-col class="line" :span="12" >
            <el-input disabled clearable v-model="form.bic" placeholder="DEUTDEBB101" required />
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col class="line" :span="12" >
            <el-button @click.prevent="saveOptions" type="submit" style="float: right">Submit</el-button>
        </el-col>
        
      </el-form-item>
      
    </el-form>
</div>

</template>

<script>
import Cookies from 'js-cookie'
import { sb } from '@/api/supabase'
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters([
            'options',
            'client',
            'avatar',
        ])
    },
    methods: {
        open() {
            this.$prompt('Enter password', 'Unlock', {
            inputType: 'password',
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            inputPlaceholder: 'Password',
            inputPattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,64}$/,
            inputErrorMessage: 'This is not the password'
            }).then(({ value }) => {
                if (btoa(value) === this.password) {
                    this.locked = false
                    this.$message({
                        type: 'success',
                        message: 'Client url unlocked'
                    });
                } else {
                    this.$message({
                        type: 'info',
                        message: 'Invalid password. You have to pay.'
                    });
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'HAHAHAH!!!!'
                });
            });
        },
        saveOptions() {
            this.disabled = true;
            const tosave = {
                avatar: this.newavatar,
                client: this.newclient,
                options: this.form
            }
            sb.from('profiles')
            .update(tosave)
            .match({ id: this.$store.state.user.user.id })
            .then((response) => {
                if(response.error === null) {
                    this.$message('Formular gespeichert');
                } else {
                    this.$message(response.error);
                }
                
            });
        }
    },
    data() {
        const password = 'UGFyb2xhbWVhMDA='
        const newavatar = ''
        const newclient = ''
        const disabled = false
        const form = {
            bankName: '',
            beneficiary: '',
            iban: '',
            bic: '',
        }
        return {
            locked: true,
            password,
            newavatar,
            newclient,
            loading: true,
            form,
            disabled: disabled,

        }
    },
    mounted() {
        this.form = this.options
        this.newclient = this.client
        this.newavatar = this.avatar
    }
}
</script>

<style lang="scss" scoped>

</style>