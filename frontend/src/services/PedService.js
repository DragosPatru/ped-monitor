import HttpService from "./HttpService";

const PEDS_BASE_PATH = "peds";

class PedService {


  create = async (definition) => {
    try {
      const endpoint = PEDS_BASE_PATH;
      return await HttpService.post(endpoint, definition);
    } catch (error) {
      console.error("Error creating PED", error);
      throw error;
    }
  };

  update = async (id, updateData) => {
    try {
      const endpoint = PEDS_BASE_PATH + '/' + id;
      return await HttpService.put(endpoint, updateData);
    } catch (error) {
      console.error("Error updating PED", error);
      throw error;
    }
  };

  getPedOverview = async (id) => {
    try {
      const endpoint = PEDS_BASE_PATH + '/' + id + '/overview';
      return await HttpService.get(endpoint);

    } catch (error) {
      console.error("Error fetching PED:" + id, error);
      throw error;
    }
  };

  delete = async (id) => {
    try {
      const endpoint = PEDS_BASE_PATH + '/' + id;
      return await HttpService.delete(endpoint);

    } catch (error) {
      console.error("Error deleting PED:" + id, error);
      throw error;
    }
  };

  getAll = async () => {
    try {
      const response = await HttpService.post(PEDS_BASE_PATH + "/search", {});
      console.log(response);
      return response.data;

    } catch (error) {
      console.error("Error fetching PEDs:", error);
      throw error;
    }
  };
}

export default new PedService();