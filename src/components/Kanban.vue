<template>
    <div class="content-wrapper kanban">
    <section class="content-header">
    <div class="container-fluid">
        <div class="row">
        <div class="col-sm-6">
            <h1>Kanban Board</h1>
        </div>
        </div>
    </div>
    </section>

    <section class="content pb-3">
    <div class="container-fluid h-100">
        <div class="card card-row card-primary">
            <div class="card-header">
                <h3 class="card-title">
                To Do
                </h3>
            </div>
            <div class="card-body">
                    <!-- create add card button -->
                <button type="button" class="btn btn-block btn-outline-primary" data-toggle="modal" data-target="#modal-default">add task</button>
                <br>
                <div v-for="(task, index) in todo_tasks" :key="index" class="card card-light card-outline">
                    <div class="card card-primary card-outline">
                        <div class="card-header">
                            <h5 class="card-title">{{ task.title }}</h5>
                            <div class="card-tools">
                                <button @click="deleteTask(task.id)" type="button" class="btn btn-block btn-outline-primary">delete</button>
                            </div>
                        </div>
                        <div class="card-body">
                            <p>
                                {{ formatDate(task.deadline) }}
                            </p>
                            <p>
                                {{ task.content }}
                            </p>
                        </div>
                        <div class="card-footer">
                            <button @click="updateStatus(task.id, 2)" type="button" class="btn btn-block btn-outline-primary">inprogress</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--  -->
        <div class="card card-row card-default">
            <div class="card-header bg-info">
                <h3 class="card-title">
                In Progress
                </h3>
            </div>
            <div class="card-body">
                <div v-for="(task, index) in inprogress_tasks" :key="index" class="card card-light card-outline">
                    <div class="card card-info card-outline">
                        <div class="card-header">
                            <h5 class="card-title">{{ task.title }}</h5>
                            <div class="card-tools">
                                <button type="button" class="btn btn-block btn-outline-primary">edit</button>
                            </div>
                        </div>
                        <div class="card-body">
                            <p>
                                {{ formatDate(task.deadline) }}
                            </p>
                            <p>
                                {{ task.content }}
                            </p>
                        </div>
                        <div class="card-footer">

                            <button @click="updateStatus(task.id, 1)" type="button" class="btn btn-block btn-outline-primary">todo</button>
                            <button @click="updateStatus(task.id, 3)" type="button" class="btn btn-block btn-outline-primary">done</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--  -->
        <div class="card card-row card-success">
            <div class="card-header">
                <h3 class="card-title">
                Done
                </h3>
            </div>
            <div class="card-body">
                <div v-for="(task, index) in done_tasks" :key="index" class="card card-light card-outline">
                    <div class="card card-primary card-outline">
                        <div class="card-header">
                            <h5 class="card-title">{{ task.title }}</h5>
                            <div class="card-tools">
                                <button type="button" class="btn btn-block btn-outline-primary">edit</button>
                            </div>
                        </div>
                        <div class="card-body">
                            <p>
                                {{ formatDate(task.deadline) }}
                            </p>
                            <p>
                                {{ task.content }}
                            </p>
                        </div>
                        <div class="card-footer">
                            <button @click="updateStatus(task.id, 2)" type="button" class="btn btn-block btn-outline-primary">inprogress</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </section>
</div>

<div class="modal fade" id="modal-default">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Default Modal</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="task_title">Title</label>
                    <input v-model="task_title" type="text" class="form-control" id="task_title" placeholder="Enter title">
                </div>
                <div class="form-group">
                    <label for="task_content">Content</label>
                    <textarea v-model="task_content" class="form-control" id="task_content" rows="3" placeholder="Enter ..."></textarea>
                </div>
                <div class="form-group">
                    <label for="task_date">date</label>
                    <input v-model="task_date" type="text" class="form-control" id="task_date" placeholder="YYYY-MM-DD">
                </div>
            </div>
            <div class="modal-footer justify-content-between">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click="addTask">Add</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import TaskService from '../services/task.service';

export default {
    name: 'app-kanban',
    components: {
        // Kanban
        // TaskModal,
    },
    data() {
        return {
            task_title: '',
            task_content: '',
            task_date: '',
            todo_tasks: [],
            inprogress_tasks: [],
            done_tasks: [],
            showModal: true,
            currentTask: null,
        }
    },
    created() {
        TaskService.getAllTask()
            .then((response) => {
                console.log(response.data);
                this.todo_tasks = response.data.filter((task) => task.status === 1);
                this.inprogress_tasks = response.data.filter((task) => task.status === 2);
                this.done_tasks = response.data.filter((task) => task.status === 3);
            })
            .catch((error) => {
                console.log(error);
            });
    },
    methods: {
        addTask() {
            console.log(this.task_title);
            console.log(this.task_content);
            console.log(this.task_date);
            const task = {
                title: this.task_title,
                content: this.task_content,
                user_id: this.$store.state.auth.user.id,
                deadline: this.task_date,
            }
            console.log(task);
            TaskService.addTask(task)
                .then((response) => {
                    // close modal
                    // $('#modal-default').modal('hide');
                    this.showModal = false;
                    console.log(response.data);
                    TaskService.getAllTask()
                        .then((response) => {
                            console.log(response.data);
                            this.todo_tasks = response.data.filter((task) => task.status === 1);
                            this.inprogress_tasks = response.data.filter((task) => task.status === 2);
                            this.done_tasks = response.data.filter((task) => task.status === 3);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        // update status and refresh task
        updateStatus(task_id, status) {
            const data = {
                id: task_id,
                status: status
            };
            TaskService.changeStatus(data)
                .then((response) => {
                    console.log(response.data);
                    TaskService.getAllTask()
                        .then((response) => {
                            console.log(response.data);
                            this.todo_tasks = response.data.filter((task) => task.status === 1);
                            this.inprogress_tasks = response.data.filter((task) => task.status === 2);
                            this.done_tasks = response.data.filter((task) => task.status === 3);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        deleteTask(id) {
            TaskService.deleteById(id)
                .then((response) => {
                    console.log(response.data);
                    TaskService.getAllTask()
                        .then((response) => {
                            console.log(response.data);
                            this.todo_tasks = response.data.filter((task) => task.status === 1);
                            this.inprogress_tasks = response.data.filter((task) => task.status === 2);
                            this.done_tasks = response.data.filter((task) => task.status === 3);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        formatDate(dateString) {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Thêm 0 phía trước nếu tháng < 10
            const day = String(date.getDate()).padStart(2, '0'); // Thêm 0 phía trước nếu ngày < 10
            return `${year}-${month}-${day}`;
        }
    }
}
</script>