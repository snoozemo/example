import { AxiosInstance } from "axios";
import autobind from "autobind-decorator";

export class GlobalService {
	constructor(private request: AxiosInstance) {
		this.request = request;
	}
	/**
	 * @param
	 */
	@autobind
	async getRoutes() {
		const { data } = await this.request.get("/routes", {
			// params,
		});
		return data;
	}
}
