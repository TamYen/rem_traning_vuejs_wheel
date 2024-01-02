<template>
    <div class="modal" id="modal-default">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h4 class="modal-title">Default Modalsss</h4>
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
            <label for="task_date">Date</label>
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
export default {
    props: {
        taskData: Object, // Prop để nhận thông tin task
    },
    data() {
        return {
            task_title: '',
            task_content: '',
            task_date: '',
        };
    },
    watch: {
        taskData: {
            handler(newVal) {
                console.log(newVal);
                // Khi prop taskData thay đổi, cập nhật dữ liệu của modal
                if (newVal) {
                    this.task_title = newVal.title;
                    this.task_content = newVal.content;
                    this.task_date = newVal.date;
                }
            },
            immediate: true, // Kích hoạt ngay từ lúc ban đầu
        },
    },
    methods: {
        // Phương thức cập nhật task
        updateTask() {
            const updatedTask = {
                title: this.task_title,
                content: this.task_content,
                date: this.task_date,
            };
            // Gửi thông tin task cập nhật lên component cha thông qua sự kiện
            this.$emit('update-task', updatedTask);
            // Đóng modal
            this.$emit('close-modal');
        },
    },
    };
</script>
