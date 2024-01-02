<template>
    <div>
      <!-- type: canvas -->
      <FortuneWheel
        style="width: 500px; max-width: 100%;"
        :verify="canvasVerify"
        :canvas="canvasOptions"
        :prizes="prizesCanvas"
        @rotateStart="onCanvasRotateStart"
        @rotateEnd="onRotateEnd"
      />
    </div>
    <div>
        <h4>
            {{ prizeRes }}
        </h4>
        <h4>
            {{ total }}
        </h4>
        <p>Zero <input type="number" v-model="rate_1"></p>
        <p>-200 <input type="number" v-model="rate_2"></p>
        <p>+300 <input type="number" v-model="rate_3"></p>
        <p>-400 <input type="number" v-model="rate_4"></p>
        <p>+500 <input type="number" v-model="rate_5"></p>
        <p>
            <!-- create button, when click pass update_name and update_rate to function updateProbability()-->
            <button @click="updateProbability()">change rate</button>
        </p>
    </div>
  </template>

<script>
import { ref } from 'vue';
import UserService from '../services/user.service';
import FortuneWheel from 'vue-fortune-wheel';
import 'vue-fortune-wheel/style.css';
// import "vue-fortune-wheel/lib/vue-fortune-wheel.css";

export default {
    name: 'app-home',
    components: {
        FortuneWheel
    },
    data() {
        return {
            content: '',
            total: 0,
            update_name: '',
            rate_1: 20,
            rate_2: 20,
            rate_3: 20,
            rate_4: 20,
            rate_5: 20,
            prizeId: 0,
            wheelEl: ref(null),
            canvasVerify: true,
            verifyDuration: 1,
            canvasOptions: {
                btnWidth: 140,
                borderColor: '#584b43',
                borderWidth: 6,
                lineHeight: 30
            },
            prizesCanvas: [
                {
                    id: 1, //* The unique id of each prize, an integer greater than 0
                    name: 'Zero', // Prize name, display value when type is canvas (this parameter is not needed when type is image)
                    value: 0, //* Prize value, return value after spinning
                    bgColor: '#45ace9', // Background color (no need for this parameter when type is image)
                    color: '#ffffff', // Font color (this parameter is not required when type is image)
                    probability: 20 //* Probability, up to 4 decimal places (the sum of the probabilities of all prizes
                },
                {
                    id: 2,
                    name: '-200',
                    value: -200,
                    bgColor: '#dd3832',
                    color: '#ffffff',
                    probability: 20
                },
                {
                    id: 3,
                    name: '+300',
                    value: 300,
                    bgColor: '#fef151',
                    color: '#ffffff',
                    probability: 20
                },
                {
                    id: 4,
                    name: '-400',
                    value: -400,
                    bgColor: '#45ac',
                    color: '#ffffff',
                    probability: 20
                },
                {
                    id: 5,
                    name: '+500',
                    value: 500,
                    bgColor: '#45a',
                    color: '#ffffff',
                    probability: 20
                }
            ],
        };
    },
    mounted() { // khi refresh trang web, se chay ham nay
        UserService.getPublicContent()
            .then((response) => {
                console.log(response.data);
                this.content = response.data;
            })
            .catch((error) => {
                this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            });
        
        // this.wheelEl.value.startRotate() // Can start rotation
    },
    computed: {
        // rate_1
        prizeRes() {
            return this.rate_1;
            // return this.prizesCanvas.find(item => item.id === this.prizeId) || this.prizesCanvas[0];
        },
    },
    methods: {
        // Simulate the request back-end interface
        testRequest (verified, duration) { // verified: whether to pass the verification, duration: delay time
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(verified)
                }, duration)
            })
        },
        onCanvasRotateStart (rotate) {
            console.log('onCanvasRotateStart rotate ' + rotate)
            if (this.canvasVerify) {
                const verified = true // true: the test passed the verification, false: the test failed the verification
                this.testRequest(verified, this.verifyDuration * 100).then((verifiedRes) => {
                if (verifiedRes) {
                    console.log('Verification passed, start to rotate')
                    rotate() // Call the callback, start spinning
                    this.canvasVerify = false // Turn off verification mode
                } else {
                    alert('Failed verification')
                }
                })
                return
            }
            console.log('onCanvasRotateStart')
        },
        onRotateEnd (prize) {
            this.total += prize.value
            console.log('onRotateEnd', prize)
        },
        onChangePrize (id) {
            console.log('onChangePrize', id)
            this.prizeId = id
        },
        updateProbability() {
            const rate_1 = this.rate_1;
            const rate_2 = this.rate_2;
            const rate_3 = this.rate_3;
            const rate_4 = this.rate_4;
            const rate_5 = this.rate_5;
            this.prizesCanvas[0].probability = rate_1;
            this.prizesCanvas[1].probability = rate_2;
            this.prizesCanvas[2].probability = rate_3;
            this.prizesCanvas[3].probability = rate_4;
            this.prizesCanvas[4].probability = rate_5;
        },
    },
};
</script>