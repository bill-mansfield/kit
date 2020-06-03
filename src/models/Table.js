import Firebase from '../services/Firebase';
import Utils from '../utils/Utils';

class Table {
    async getTableAscents() {
        return await Utils.cleanTableAscents(Firebase.getAscentsForTable());
    }

    async updateAscent(ascent) {
        ascent.height = parseInt(ascent.height);
        //TODO: sanitise the other fields, ticktype grade date etc
        //Or else users will fuck thier own data up
        Firebase.updateAscent(ascent);
    }

    async deleteAscent(ascent) {
        Firebase.deleteAscent(ascent);
    }
}

export default new Table();
