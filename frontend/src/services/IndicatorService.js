import HttpService from "./HttpService";

const BASE_PATH = "indicators";

class IndicatorService {

    getOverview = async (id) => {
        try {
            const endpoint = BASE_PATH + "/" + id + '/overview';
            const response = await HttpService.get(endpoint);
            return response;

        } catch (error) {
            console.error("Error fetching indicator overview", error);
            throw error;
        }
      };

      getTasks = async (indicatorId) => {
        try {
            const endpoint = BASE_PATH + "/" + indicatorId + '/tasks';
            const response = await HttpService.get(endpoint);
            return response;

        } catch (error) {
            console.error("Error fetching indicator tasks", error);
            throw error;
        }
      };

      deleteTask = async (taskId) => {
        try {
            const endpoint = BASE_PATH + "/tasks/" + taskId;
            const response = await HttpService.delete(endpoint);
            return response;

        } catch (error) {
            console.error("Error fetching indicator tasks", error);
            throw error;
        }
      };

      updateTask = async (task) => {
        try {
            const endpoint = BASE_PATH + "/tasks/" + task.id;
            const response = await HttpService.put(endpoint, task);
            return response;

        } catch (error) {
            console.error("Error updating task", error);
            throw error;
        }
      };

      createTask = async (indicatorId, task) => {
        try {
            const endpoint = BASE_PATH + "/" + indicatorId + '/tasks';
            const response = await HttpService.post(endpoint, task);
            return response;

        } catch (error) {
            console.error("Error creating task", error);
            throw error;
        }
      };


      getValues= async (id) => {
        try {
            const endpoint = BASE_PATH + "/" + id + '/values';
            const response = await HttpService.get(endpoint);
            return response;

        } catch (error) {
            console.error("Error fetching indicator values", error);
            throw error;
        }
      };

      update = async (id, updateData) => {
        try {
            const endpoint = BASE_PATH + '/' + id;
            return await HttpService.put(endpoint, updateData);
        } catch (error) {
            console.error("Error updating indicator", error);
            throw error;
        }
      };
}

export default new IndicatorService();