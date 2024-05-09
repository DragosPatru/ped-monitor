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

}

export default new IndicatorService();