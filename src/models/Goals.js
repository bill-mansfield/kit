import Firebase from '../services/Firebase';

class Goals {

    addGoal(goal) {
        console.log(goal)
        //Set state?
        Firebase.writeGoal(goal);
    }

}
