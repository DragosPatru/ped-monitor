import HttpService from "./HttpService";

const PEDS_BASE_PATH = "peds";

class PedService {

    getById = async (id) => {
        try {
            const endpoint = PEDS_BASE_PATH + '/' + id;
            return await HttpService.get(endpoint);

        } catch (error) {
            console.error("Error fetching PED:" + id, error);
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