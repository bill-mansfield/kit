import Firebase from '../services/Firebase';

class Goals {
    addGoal(goal) {
        Firebase.writeGoal(goal);
    }

    getAllGoals() {
        return Firebase.getAllGoals();
    }
}

export default new Goals();
