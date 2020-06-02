import Firebase from '../services/Firebase';
import Utils from '../utils/Utils';

class Table {
    async getTableAscents() {
        return await Utils.cleanTableAscents(Firebase.getAllAscents());
    }
}

export default new Table();
