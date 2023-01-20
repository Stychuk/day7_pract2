<template>
    <div id="app">
        <link rel="stylesheet" id="theme" v-bind:href="Theme == 'light' ? './theme_light.css' : './theme_dark.css'">
        <input type="radio" name="selected_topic" value="light" @click="choseTheme('light')"> Light
        <input type="radio" name="selected_topic" value="dark" @click="choseTheme('dark')"> Dark
        <br>
        Кількість студентів: {{ studentsCount }}
		<!-- <input type="text" name="search" v-model="search"><br> -->
		<table class="table">
            <tr v-for="(item,stud) in students" v-bind:key="item._id">
				<td>
                    <router-link v-bind:to="'/student-info/'+item._id" class="style_stud">
                        {{item.name}}
                    </router-link>
                </td>
                <td><input type="checkbox" v-model="item.isDonePr"></td>
                <td>{{item.group}}</td>
                <td><a href = "#" @click="deleteStudent(item._id)" class="style_stud">Видалити</a></td>
                <td>
                    <a href = "#" @click="updateStudent(stud)"><img src="pen.svg" width="30"></a>
                </td>
			</tr>
		</table>
			<input v-model="student.name">
			<input type="checkbox" v-model="student.isDonePr">
			<select v-model="student.group">
				<option value="RPZ 19 1/9">RPZ 19 1/9</option>
				<option value="RPZ 19 2/9">RPZ 19 2/9</option>
			</select>
			<button @click="addStudent()" class="btn">Add student</button>
            <button @click="update()" class="btn">Оновити</button>
	</div>
</template>

<script>
const API_HOST = process.env.API_HOST;

export default {
    data() {
        return {
            students: [],
            search:'',
            student: {"name": "", isDonePr: false, group: ""},
            studentId:''
        }
     },	 
     mounted: function(){
        this.axios.get(`${API_HOST}/students`).then((response) => {
            this.students = response.data;
            this.$store.commit('setCount', this.students.length);
        })
     },
     computed: {
        studentsCount() {
            return this.$store.getters.getCount
        },
        Theme() {
            return this.$store.getters.getTheme
        },
     },
     methods: {
        choseTheme(theme){
                this.$store.commit('setTheme', theme);
            },
        deleteStudent(studId){
            this.students=this.students.filter(el=>{
                return el._id != studId
            })
            this.axios.delete(`${API_HOST}/students/${studId}`).then((response)=>{
                console.log(response.data);
                this.$store.commit('setCount', this.students.length);
            })
        },
        addStudent() {
            this.axios.post(`${API_HOST}/students`, {
                ...this.student
            })
            .then((response) => {
                this.students.push(response.data);
                this.$store.commit('setCount', this.students.length);
            })
        },
        updateStudent(stud) {    
            this.student = {
                ...this.students[stud]
            }
            this.studentId = stud
        },
        update() {
            this.axios.put(`${API_HOST}/students/${this.students[this.studentId]._id}`, {
                ...this.student
            })
            .then((response) => {
                this.students[this.studentId] = response.data;
                console.log(response.data);
                this.$store.commit('setCount', this.students.length);
            })
        }
     },
};
</script>

<style scoped>
.table {
    background-color: rgb(255, 226, 146);
    font-size: 19px;
    text-align: center;
    border: 1px solid black;
    border-collapse: collapse;
}
.table TH {
    font-weight: bold;
    padding: 5px;
    background: #00000000;
    border: 2px solid #000000;
}
.table TD {
    padding: 5px;
    color: black;
    border: 2px solid black;
}
.style_stud {
    color: #000000;
    font-style: italic;
}
</style>