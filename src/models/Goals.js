import Firebase from '../services/Firebase';

class Goals {
    addGoal(goal) {
        Firebase.writeGoal(goal);
    }

    async getGoals() {
        return await Firebase.getGoals();
    }

    async updateGoal(goal) {
        Firebase.updateGoal(goal);
    }

    async deleteGoal(goal) {
        Firebase.deleteGoal(goal);
    }
}

export default new Goals();
