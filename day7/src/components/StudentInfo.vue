<template>
    <div class="info">
        <div class="nameStudent">
            {{ student.name }}
        </div>
        <div class="imageStudent">
            <img :src="student.photo" width="200" @click="openImage = !openImage">
        </div>
        <div class="isDonePrStudent">
            Робота {{isDonePrOfStudent}}
        </div>
        <div class="countStudent">
            Кількість студентів: {{ studentsCount }}
        </div>
    </div>
    
    <Modal :open="openImage" @close="openImage = !openImage">
        <img :src="student.photo" @click="openImage = !openImage">
    </Modal>
</template>

<script>
import Modal from "./Modal.vue";
const API_HOST = process.env.API_HOST;

export default {
    components: { Modal },
    props: {
        id: '',
    },
    data() {
        return{
            student: {},
            openImage: false,
        };
    },
    mounted() {
        this.axios.get(`${API_HOST}/students/`+this.id).then((res) => {
            this.student = res.data;
        });
    },
    computed: {
        // a computed getter
        isDonePrOfStudent() {
            return this.student.isDonePr ? 'здана' : 'не здана'
        },
        studentsCount () {
            return this.$store.getters.getCount
        }
    },
};
</script>

<style>
.nameStudent, .isDonePrStudent, .countStudent {
    font-size: 28px;
}
</style>