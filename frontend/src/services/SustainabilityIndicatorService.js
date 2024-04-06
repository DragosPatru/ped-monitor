import HttpService from "./HttpService";

const BASE_PATH = "indicators";

class SustainabilityIndicatorService {

    getIndicatorsMeta = async () => {
        try {
            const endpoint = BASE_PATH + '/meta';
            const response = await HttpService.get(endpoint);
            return response.data;

        } catch (error) {
            console.error("Error fetching indicators meta", error);
            throw error;
        }
      };

}

export default new SustainabilityIndicatorService();