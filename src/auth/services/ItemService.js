import api from "../api/index.js";
import { API_URL } from "../api/index.js";

export default class ItemService {
    static async getAllItems(from, size) {
        return api.get(API_URL + "/items/all?from=" + 0 + "&size=" + 10);
    }

    static async searchItems(search, from, size) {
        return api.get(API_URL + "/items/all?from=" + 0 + "&size=" + 10);
    }
}