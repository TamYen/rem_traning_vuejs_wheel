import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8081/api/task/";

class TaskService {
    addTask(newTask) {
        return axios.post(API_URL + "add", newTask, { headers: authHeader() });
    }
    getAllTask() {
        return axios.get(API_URL + "all", { headers: authHeader() });
    }
    changeStatus(data) {
        return axios.post(API_URL + "changeStatus", data, { headers: authHeader() });
    }
    deleteById(id) {
        return axios.delete(API_URL + "delete/" + id, { headers: authHeader() });
    }
}

export default new TaskService();