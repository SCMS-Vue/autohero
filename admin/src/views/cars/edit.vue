<template>
  <div class="app-container" v-if="ready">
    <el-col :span="24" v-if="submitted">
      <pre>{{ formData }}</pre>
      <br>
    </el-col>
    <el-form :disabled="submitted" v-bind:model="formData" ref="formData" label-position="left" label-width="320px">
      <el-form-item label="Marke / Modell / Variante / Preis">
        <el-col class="line" :span="11" >
          <el-cascader
            v-model="selects.make"
              style="width: 100%;"
              placeholder="Mercedes Benz / C-klasse"
              filterable
              clearable
              :options="models"
              :props="{ label: 'name', value: 'name', children: 'models' }"
              @change="carSelectChange"
            />
            <div class="el-form-item__helper" v-if="formData.slug">
              Slug: {{ formData.slug }}
          </div>
        </el-col>
       
        <el-col :span="1" class="line">
          &bull;
        </el-col>
        <el-col :span="6">
          <el-input clearable placeholder="2.0 TDI" v-model="formData.modelvariant"/>
        </el-col>
        <el-col :span="1" class="line">
          &bull;
        </el-col>
        <el-col :span="5">
          <el-input @blur="formatPrice" clearable placeholder="20 000" v-model="formData.price"/>
          <div class="el-form-item__helper">
            {{ formData.leasing }}
          </div>
        </el-col>
      </el-form-item>
      <el-form-item label="Anzahlung">
        <el-col :span="7">
          <el-input
            @blur="formatDeposit"
            required
            v-model="formData.deposit"
            placeholder="500 Eur"
            style="width: 100%;"
            clearable
          />
        </el-col>
        <el-col :span="1" class="line">
          &bull;
        </el-col>
        <el-col :span="11">
          <el-select v-model="formData.payment_id" placeholder="Konto auswählen">
            <el-option
              v-for="(account, index) in accounts"
              :key="index"
              :label="account.label"
              :value="account.value">
            </el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="Fahrzeugbilder">
        <el-col>
          <el-upload
            :file-list="selects.images"
            multiple
            name="image"
            action="https://api.imgbb.com/1/upload?key=049d4dc2332379dcbe32260369f0b469&expiration=2592000"
            list-type="picture-card"
            :on-success="onFileUpload"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl">
          </el-dialog>
        </el-col>
      </el-form-item>
      <el-form-item label="Anzahl Vorbesitzer / Herkunftsland">
        <el-col :span="11">
          <el-cascader
            v-model="selects.owners"
            style="width: 100%;"
            placeholder="1 Vorbesitzer / Deutschland"
            filterable
            clearable
            :options="owners"
            @change="ownerSelectChange"
          />

        </el-col>
      </el-form-item>
      <el-form-item label="Kraftstoff / Schadstoffklasse">
        <el-col :span="11">
          <el-cascader
            v-model="selects.fuel"
            style="width: 100%;"
            placeholder="Diesel / Automatik / 20 000 km / EURO 6 /2/4 Türen"
            filterable
            clearable
            :options="fuletypes"
            @change="fuelSelectChange"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="Farbe / Polsterung">
        <el-col :span="11">
          <el-cascader
            v-model="selects.colors"
            style="width: 100%;"
            placeholder="Silber / Alcantara"
            filterable
            clearable
            :options="colors"
            @change="colorSelectChange"
          />
        </el-col>

      </el-form-item>
      <el-form-item label="Leistung / Bauform">
        <el-col :span="11">
          <el-cascader
            v-model="selects.body"
            :options="body"
            style="width: 100%;"
            placeholder="Limousine / 5 Sitzplätze"
            filterable
            clearable
            @change="bodySelectChange"
          />
        </el-col>
        <el-col :span="2" class="line">
          &bull;
        </el-col>
        <el-col :span="11">
          <el-input
            @blur="formatPower"
            required
            v-model="power"
            placeholder="83 kW"
            style="width: 100%;"
            clearable
          />
        </el-col>
      </el-form-item>
      <el-form-item label="Erstzulassung / Nächster Service">
        <el-col :span="11">
          <el-date-picker v-model="formData.registration" type="month" placeholder="06.2020" format="MM.yyyy" value-format="MM.yyyy"  />
        </el-col>
        <el-col :span="2" class="line">
          &bull;
        </el-col>
        <el-col :span="11">
          <el-date-picker v-model="formData.service" placeholder="Letzter Service am" format="dd.MM.yyyy" value-format="dd.MM.yyyy" />
        </el-col>
      </el-form-item>
      <el-form-item label="Hubraum / CO2-Ausstoß">
        <el-col :span="11">
          <el-input
            @blur="formatEnginecmc"
            required
            v-model="formData.enginecmc"
            placeholder="1499 ccm"
            style="width: 100%;"
            clearable
          />
        </el-col>
        <el-col :span="2" class="line">
          &bull;
        </el-col>
        <el-col :span="11">
          <el-input
            @blur="formatco2"
            required
            v-model="formData.co2emissions"
            placeholder="129 g/km"
            style="width: 100%;"
            clearable
          />
        </el-col>
      </el-form-item>
      <el-form-item label="Verbrauch">
        <el-col :span="7">
          <el-input
            required
            v-model="formData.consumption[0]"
            placeholder="Innerorts"
            style="width: 100%;"
            clearable
          />
          <a @click.prevent="formatConsumption(0)" href="#">Innerorts einstellen</a>
        </el-col>
        <el-col :span="1" class="line">
          &bull;
        </el-col>
        <el-col :span="7">
          <el-input
            required
            v-model="formData.consumption[1]"
            placeholder="Kombiniert"
            style="width: 100%;"
            clearable
          />
          <a @click.prevent="formatConsumption(1)" href="#">Kombiniert einstellen</a>
        </el-col>
        <el-col :span="1" class="line">
          &bull;
        </el-col>
        <el-col :span="7">
          <el-input
            required
            v-model="formData.consumption[2]"
            placeholder="Außerorts"
            style="width: 100%;"
            clearable
          />
          <a @click.prevent="formatConsumption(2)" href="#">Außerorts einstellen</a>
        </el-col>
      </el-form-item>
      <el-form-item label="Komfort">
        <el-row >
          <el-col :span="24">
            <el-tag
              v-for="(tag, index) in formData.comfort.filter(arr => arr.value === true)"
              :key="index"
              closable
              :disable-transitions="false"
              @close="removeTagKomfort(tag)">
              {{tag.label}}
            </el-tag>
            <el-button
              class="button-new-tag"
              size="small"
              @click="KomfortDialogVisible = true">+ Hinzufügen</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="Multimedia">
        <el-row >
          <el-col :span="24">
            <el-tag
              v-for="(tag, index) in formData.multimedia.filter(arr => arr.value === true)"
              :key="index"
              closable
              :disable-transitions="false"
              @close="removeTagMultimedia(tag)">
              {{tag.label}}
            </el-tag>
            <el-button
              class="button-new-tag"
              size="small"
              @click="MultimediaDialogVisible = true">+ Hinzufügen</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="Licht und Sicht">
        <el-row >
          <el-col :span="24">
            <el-tag
              v-for="(tag, index) in formData.visibility.filter(arr => arr.value === true)"
              :key="index"
              closable
              :disable-transitions="false"
              @close="removeTagLichtUndSicht(tag)">
              {{tag.label}}
            </el-tag>
            <el-button
              class="button-new-tag"
              size="small"
              @click="LichtUndSichtDialogVisible = true">+ Hinzufügen</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="Sicherheit">
        <el-row >
          <el-col :span="24">
            <el-tag
              v-for="(tag, index) in formData.security.filter(arr => arr.value === true)"
              :key="index"
              closable
              :disable-transitions="false"
              @close="removeTagSicherheit(tag)">
              {{tag.label}}
            </el-tag>
            <el-button
              class="button-new-tag"
              size="small"
              @click="SicherheitDialogVisible = true">+ Hinzufügen</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="Weiteres">
        <el-row >
          <el-col :span="24">
            <el-tag
              v-for="(tag, index) in formData.additional.filter(arr => arr.value === true)"
              :key="index"
              closable
              :disable-transitions="false"
              @close="removeTagWeiteres(tag)">
              {{tag.label}}
            </el-tag>
            <el-button
              class="button-new-tag"
              size="small"
              @click="WeiteresDialogVisible = true">+ Hinzufügen</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="Optionen">
        <label v-for="(op, i) in options" :key="i">
          <span v-if="i !== 0" style="margin: 0 10px;">&bull;</span>
          <el-checkbox v-model="formData.options[i].value">{{ op.label }}</el-checkbox>
        </label>

      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="onSubmit">Update</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>


    <!-- KOMFORT MODAL -->
    <el-dialog title="Wählen Sie Optionen: Komfort" :visible.sync="KomfortDialogVisible" fullscreen >
      <el-row :gutter="20">
        <el-col :span="7" style="margin-right: 10px; margin-bottom: 10px;" v-for="(feature, index) in formData.comfort" :key="index">
          <label class="radio-custom" v-bind:class="{'isactive': formData.comfort[index].value}" style="border-radius: 4px; transition: all .3s cubic-bezier(.645,.045,.355,1); color: #606266;font-weight: unset; display: block; text-align: center;padding: 10px; border: 1px solid #DCDFE6; cursor: pointer; font-size: 14px;">
            <span style="margin-right: 5px;">
              {{ feature.label }}
            </span>
            <el-switch v-model="formData.comfort[index].value"></el-switch>
          </label>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- MULTIMEDIA MODAL -->
    <el-dialog title="Wählen Sie Optionen: Multimedia" :visible.sync="MultimediaDialogVisible" fullscreen >
      <el-row :gutter="20">
        <el-col :span="7" style="margin-right: 10px; margin-bottom: 10px;" v-for="(feature, index) in formData.multimedia" :key="index">
          <label class="radio-custom" v-bind:class="{'isactive': formData.multimedia[index].value}" style="border-radius: 4px; transition: all .3s cubic-bezier(.645,.045,.355,1); color: #606266;font-weight: unset; display: block; text-align: center;padding: 10px; border: 1px solid #DCDFE6; cursor: pointer; font-size: 14px;">
            <span style="margin-right: 5px;">
              {{ feature.label }}
            </span>
            <el-switch v-model="formData.multimedia[index].value"></el-switch>
          </label>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- Licht und Sicht MODAL -->
    <el-dialog title="Wählen Sie Optionen: Licht und Sicht" :visible.sync="LichtUndSichtDialogVisible" fullscreen >
      <el-row :gutter="20">
        <el-col :span="7" style="margin-right: 10px; margin-bottom: 10px;" v-for="(feature, index) in formData.visibility" :key="index">
          <label class="radio-custom" v-bind:class="{'isactive': formData.visibility[index].value}" style="border-radius: 4px; transition: all .3s cubic-bezier(.645,.045,.355,1); color: #606266;font-weight: unset; display: block; text-align: center;padding: 10px; border: 1px solid #DCDFE6; cursor: pointer; font-size: 14px;">
            <span style="margin-right: 5px;">
              {{ feature.label }}
            </span>
            <el-switch v-model="formData.visibility[index].value"></el-switch>
          </label>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- Sicherheit MODAL -->
    <el-dialog title="Wählen Sie Optionen: Sicherheit" :visible.sync="SicherheitDialogVisible" fullscreen >
      <el-row :gutter="20">
        <el-col :span="7" style="margin-right: 10px; margin-bottom: 10px;" v-for="(feature, index) in formData.security" :key="index">
          <label class="radio-custom" v-bind:class="{'isactive': formData.security[index].value}" style="border-radius: 4px; transition: all .3s cubic-bezier(.645,.045,.355,1); color: #606266;font-weight: unset; display: block; text-align: center;padding: 10px; border: 1px solid #DCDFE6; cursor: pointer; font-size: 14px;">
            <span style="margin-right: 5px;">
              {{ feature.label }}
            </span>
            <el-switch v-model="formData.security[index].value"></el-switch>
          </label>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- Sicherheit MODAL -->
    <el-dialog title="Wählen Sie Optionen: Weiteres" :visible.sync="WeiteresDialogVisible" fullscreen >
      <el-row :gutter="20">
        <el-col :span="7" style="margin-right: 10px; margin-bottom: 10px;" v-for="(feature, index) in formData.additional" :key="index">
          <label class="radio-custom" v-bind:class="{'isactive': formData.additional[index].value}" style="border-radius: 4px; transition: all .3s cubic-bezier(.645,.045,.355,1); color: #606266;font-weight: unset; display: block; text-align: center;padding: 10px; border: 1px solid #DCDFE6; cursor: pointer; font-size: 14px;">
            <span style="margin-right: 5px;">
              {{ feature.label }}
            </span>
            <el-switch v-model="formData.additional[index].value"></el-switch>
          </label>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { sb } from '@/api/supabase'
import { fuletypes, body, colors, owners, caroptions, features } from '@/api/models'
import { carmodels } from '@/api/carmodels'
export default {
  props: {
    id: String,
    car: Object
  },
  data() {
    var cardata = this.car;
    const accounts = []
    return {
      accounts: accounts,
      progress: 0,
      ready: false,
      submitted: false,
      dialogImageUrl: '',
      dialogVisible: false,
      KomfortDialogVisible: false,
      MultimediaDialogVisible: false,
      LichtUndSichtDialogVisible: false,
      SicherheitDialogVisible: false,
      WeiteresDialogVisible: false,
      features: features,
      options: caroptions,
      owners: owners,
      models: carmodels,
      fuletypes: fuletypes,
      power: cardata.rawpower,
      body: body,
      colors: colors,
      consumption: [
          "",
          "",
          "",
      ],
      formData: cardata,
      selects: {
        make: [
          cardata.make,
          cardata.model,
        ],
        owners: [
          cardata.owners,
          cardata.country,
        ],
        fuel: [
          cardata.fuel,
          cardata.transmission,
          cardata.mileage,
          cardata.emissions,
          cardata.doors,
        ],
        colors: [
          cardata.color,
          cardata.interior,
        ],
        body: [
          cardata.body,
          cardata.seats,
        ],
        images: []

      },
    }
  },
  
  methods: {
    async getAccounts() {
      const { data, error } = await sb
      .from('accounts')
      .select()
      .eq('user_id', this.$store.state.user.user.id)
      if(error === null) {
        data.forEach((arr, index) => {
          this.accounts.push({
            label: arr.iban,
            value: arr.id,
          })
        })
      } else {
        this.accounts = []
      }
    },
    formatConsumption(ev) {
      let value = parseFloat(this.formData.consumption[ev] ? this.formData.consumption[ev] : '0')
      if(ev === 0) {
        value = `${value} l/100 km (innerorts)`;
      }
      if(ev === 1) {
        value = `${value} l/100 km (kombiniert)`;
      }
      if(ev === 2) {
        value = `${value} l/100 km (außerorts)`;
      }
      this.formData.consumption[ev] = value
    },

    formatPower(ev) {
        if(ev.target.value) {
          let ppp = ev.target.value;
          if(ppp.includes('/')) {
            ppp = ppp.split('/')[1]
          }
          ppp = parseInt(ppp)
          this.formData.kilowatts = ppp
          this.formData.horsepower = (ppp * 1.34102).toFixed()
          this.formData.rawpower = `${this.formData.horsepower} PS / ${this.formData.kilowatts} kW`
        } else {
          this.formData.kilowatts = 83
          this.formData.horsepower = (83 * 1.34102).toFixed()
          this.formData.rawpower = `${this.formData.horsepower} PS / ${this.formData.kilowatts} kW`
        }

        this.power = this.formData.rawpower
        
    },
    bodySelectChange(ev) {
      if (ev.length === 2) {
        this.formData.body = ev[0]
        this.formData.seats = ev[1]
      } else {
        
        this.formData.body = 'Limousine'
        this.formData.seats = 5
      }
    },
    colorSelectChange(ev) {
      if (ev.length === 2) {
        this.formData.color = ev[0]
        this.formData.interior = ev[1]
      } else {
        this.formData.color = 'Diesel'
        this.formData.interior = 'Automatik'
      }
    },

    fuelSelectChange(ev) {
      if (ev.length === 5) {
        this.formData.fuel = ev[0]
        this.formData.transmission = ev[1]
        this.formData.mileage = ev[2]
        this.formData.emissions = ev[3]
        this.formData.doors = ev[4]
      } else {
        this.formData.fuel = 'Diesel'
        this.formData.transmission = 'Automatik'
        this.formData.mileage = '65 000 km'
        this.formData.emissions = 'EURO 6'
        this.formData.doors = '6/7'
      }
    },
    carSelectChange(ev) {
      if (ev.length === 2) {
        this.formData.make = ev[0]
        this.formData.model = ev[1]
        this.formData.slug = `${ev[0]} ${ev[1]}`.toString().toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w\-]+/g, '')
          .replace(/\-\-+/g, '-')
          .replace(/^-+/, '')
          .replace(/-+$/, '')
      } else {
        this.formData.make = ''
        this.formData.model = ''
        this.formData.slug = ''
        
      }
    },
    ownerSelectChange(ev) {
      if (ev.length === 2) {
        this.formData.owners = ev[0]
        this.formData.country = ev[1]
      } else {
        this.formData.owners = 1
        this.formData.country = 'Deutschland'
      }
    },
    onFileUpload(file) {
      let obb = {
        id: file.data.id,
        large: file.data.image.url,
        medium: file.data.medium.url,
        thumb: file.data.thumb.url,
      }
      this.formData.images.push(obb);
    },
    handleRemove(file, fileList) {
      let index1 = this.formData.images.findIndex(ind => ind.name === file.name);
      let index2 = this.selects.images.findIndex(ind => ind.name === file.name);
      this.formData.images.splice(index1, 1)
      this.selects.images.splice(index2, 1)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    removeTagKomfort(tag) {
      this.formData.comfort.splice(this.formData.comfort.indexOf(tag), 1);
    },
    removeTagMultimedia(tag) {
      this.formData.multimedia.splice(this.formData.multimedia.indexOf(tag), 1);
    },
    removeTagLichtUndSicht(tag) {
      this.formData.visibility.splice(this.formData.visibility.indexOf(tag), 1);
    },
    removeTagSicherheit(tag) {
      this.formData.security.splice(this.formData.security.indexOf(tag), 1);
    },
    removeTagWeiteres(tag) {
      this.formData.additional.splice(this.formData.additional.indexOf(tag), 1);
    },
    onSubmit(formName) {
      this.submitted = false;
      if(!this.formData.make.length) {
        this.$message('Alle Felder benötigt. Das Feld "Marke" ist leer.');
      } else if (!this.formData.model.length) {
        this.$message('Alle Felder benötigt. Das Feld "Modell" ist leer.');
      } else if (!this.formData.modelvariant.length) {
        this.$message('Alle Felder benötigt. Das Feld "Variante" ist leer.');
      } else if (!this.formData.images.length) {
        this.$message('Alle Felder benötigt. Das Feld "Fahrzeugbilder" ist leer.');
      } else if (!this.formData.country.length) {
        this.$message('Alle Felder benötigt. Das Feld "Herkunftsland" ist leer.');
      } else if (!this.formData.fuel.length) {
        this.$message('Alle Felder benötigt. Das Feld "Treibstoff" ist leer.');
      } else if (!this.formData.transmission.length) {
        this.$message('Alle Felder benötigt. Das Feld "Getriebe" ist leer.');
      } else if (!this.formData.mileage.length) {
        this.$message('Alle Felder benötigt. Das Feld "Kilometerstand" ist leer.');
      } else if (!this.formData.emissions.length) {
        this.$message('Alle Felder benötigt. Das Feld "Emissionen" ist leer.');
      } else if (!this.formData.co2emissions.length) {
        this.$message('Alle Felder benötigt. Das Feld "CO2-Emissionen" ist leer.');
      } else if (!this.formData.doors.length) {
        this.$message('Alle Felder benötigt. Das Feld "Türen" ist leer.');
      } else if (!this.formData.color.length) {
        this.$message('Alle Felder benötigt. Das Feld "Farbe" ist leer.');
      } else if (!this.formData.interior.length) {
        this.$message('Alle Felder benötigt. Das Feld "Autoinnenraum" ist leer.');
      } else if (!this.formData.kilowatts.toString().length) {
        this.$message('Alle Felder benötigt. Das Feld "Kilowatt" ist leer.');
      } else if (!this.formData.horsepower.toString().length) {
        this.$message('Alle Felder benötigt. Das Feld "Pferdestärken" ist leer.');
      } else if (!this.formData.body.length) {
        this.$message('Alle Felder benötigt. Das Feld "Karosserie" ist leer.');
      } else if (!this.formData.seats.toString().length) {
        this.$message('Alle Felder benötigt. Das Feld "Sitze" ist leer.');
      } else if (!this.formData.enginecmc.length) {
        this.$message('Alle Felder benötigt. Das Feld "Motor cmc" ist leer.');
      } else if (!this.formData.user_id.length) {
        this.$message('Alle Felder benötigt. Das Feld "Benutzeridentifikation" ist leer.');
      } else if (!this.formData.rawpower.length) {
        this.$message('Alle Felder benötigt. Das Feld "pure Kraft" ist leer.');
      } else {

        this.insert()
      }


    },
    async insert() {
      const { data, error } = await sb
        .from('vehicles')
        .update(this.formData)
        .match({ id: this.id });
      if(error === null) {
        let res = data[0]
        this.$message(`Success! Vehicle ID# ${res.id}`);
        this.$router.push('/cars/index')
      }
    },
    formatDeposit(deposit) {
      let original;
      deposit = deposit.target.value;
      deposit = parseInt(deposit.length ? deposit.replace(/[.,\s]/g, '') : 0)
      this.formData.deposit = deposit + ' €';
    },
    formatPrice(pr) {
      let original;
      pr = pr.target.value;
      pr = parseInt(pr.length ? pr.replace(/[.,\s]/g, '') : 0)
        if(pr > 10) {
          original = (pr / 85).toFixed();
          original = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(original);
          original = original.split(',')[0].replace('.', ' ') + ' €';
          this.formData.leasing = 'pro Monat ' + original
        } else {
          this.formData.leasing = 'pro Monat 0 €'
        }
      pr = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(pr);
      this.formData.price = pr.split(',')[0].replace('.', ' ') + ' €';
    },
    formatco2(pr) {
      pr = pr.target.value;
      pr = parseInt(pr.length ? pr.replace(/[.,\s]/g, '') : 0)
      this.formData.co2emissions = pr + ' g/km';
    },
    formatEnginecmc(pr) {
      pr = pr.target.value;
      pr = parseInt(pr.length ? pr.replace(/[.,\s]/g, '') : 0)
      this.formData.enginecmc = pr + ' ccm';
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },


  },
  mounted() {
    this.getAccounts();
    this.car.images.forEach((arr) => {
      this.selects.images.push({
        name: arr.id,
        url: arr.thumb
      })
    })

    this.ready = true
  },
}
</script>

<style>
  .el-date-editor.el-input, .el-date-editor.el-input__inner {
      width: 100%;
  }
  .input-with-select .el-input-group__prepend .el-cascader .el-input .el-input__inner {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: 0.5px;
  }
  .input-with-select .el-input-group__prepend .el-cascader .el-input .el-input__inner:focus {
    border-color: #C0C4CC !important;
  }
  .input-with-select .el-input-group__prepend .el-cascader .el-input {
    width: 250px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
    border: 0;
    padding: 0;

  }
.el-tag {
  margin-right: 5px;
  cursor: pointer;
}
label.radio-custom {
  border-radius: 4px;
  transition: all .3s cubic-bezier(.645,.045,.355,1);
  color: #606266;font-weight: unset; display: block; text-align: center; padding-left: 10px;padding-right: 10px;
  border: 1px solid #DCDFE6;
  cursor: pointer;
  font-size: 14px;
}
label.radio-custom.isactive {
  background: #f1f1f1;
}
label.radio-custom:hover {
  background: #f1f1f1;
}

label.radio-custom > span {
  margin-right: 5px;
}
label.radio-custom > span:hover {

  color: #409EFF;
}
.line {
  text-align: center;
}
.el-upload-list--picture-card .el-upload-list__item, .el-upload--picture-card {
    width: 80px;
    height: 80px;
    line-height: 90px;
}
.el-form-item__helper {
    text-align: start;
    color: #888888;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    top: 100%;
    left: 0;
}
</style>

