<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                    <ion-select
                        interface="popover"
                        :toggle-icon="add"
                        :expanded-icon="remove"
                        aria-label="fruit"
                        placeholder="Select fruit"
                        @ionChange="chengeValute"
                        :value="valute"
                    >
                        <ion-select-option v-for="(value, index) in api_values" :key="index" :value="index">{{ index }}</ion-select-option>
                    </ion-select>
                <!-- <ion-datetime-button class="ion-justify-content-center" datetime="date"></ion-datetime-button> -->
                <ion-datetime-button slot="end" datetime="date"></ion-datetime-button>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-item color="medium">
                <ion-label slot="start">{{ name }}</ion-label>
                <ion-label>{{ abbreviation }}</ion-label>
                <ion-label slot="end">{{ officialRate }}</ion-label>
            </ion-item>

            <ion-modal :keep-contents-mounted="true">
                <ion-datetime 
                    id="date" 
                    presentation="date"
                    @value="getFullDate()"
                    @ionChange="showData"
                    :first-day-of-week="1" 
                    :show-default-buttons="true" 
                    done-text="Выбрать" 
                    cancel-text="Отмена"></ion-datetime>
            </ion-modal>
        </ion-content>
    </ion-page>
</template>


<script>
import { IonPage, IonHeader, IonTitle, IonContent, IonToolbar, IonDatetime, IonDatetimeButton, IonModal, IonItem, IonLabel, IonList, IonSelect, IonSelectOption } from '@ionic/vue'
import { add, remove } from 'ionicons/icons';
export default {
    components: {
        IonPage,
        IonHeader,
        IonTitle,
        IonContent,
        IonToolbar,
        IonDatetime,
        IonDatetimeButton,
        IonModal,
        IonItem,
        IonLabel,
        IonList,
        IonSelect,
        IonSelectOption
    },
    data() {
        return {
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            day: new Date().getDate(),
            abbreviation: '',
            name: '',
            officialRate: '',
            api_values: {'USD': 431, 'EUR': 451, 'RUB': 456},
            valute: 'USD',
        };
    },
    methods: {
        showData(data1){
            this.year = data1.target.activePartsClone.year
            this.month = data1.target.activePartsClone.month
            this.day = data1.target.activePartsClone.day
            this.getValuteCourse()
        },
        getFullDate(){
            return this.year+'-'+((this.month < 10) ? '0'+this.month : this.month)+'-'+((this.day < 10) ? '0' + this.day : this.day)
        },
        getValuteCourse(){
            fetch('https://api.nbrb.by/exrates/rates/'+this.api_values[this.valute]+'?ondate='+this.getFullDate())
                .then(response => response.json())
                .then(json => {this.officialRate = json.Cur_OfficialRate, this.abbreviation = json.Cur_Abbreviation, this.name = json.Cur_Name})
        },
        chengeValute(event){
            this.valute = event.detail.value
            this.getValuteCourse()
        }
    },
    setup() {
      return { add, remove };
    },
    mounted(){
        this.getValuteCourse()
    }
}
</script>