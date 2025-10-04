class Storage {
    static getCalorieLimit(defaultLimit = 2000) {
        let calorieLimit;
        if (localStorage.getItem('calorieLimit') === null) {
            calorieLimit = defaultLimit;
        } else {
            calorieLimit = localStorage.getItem('calorieLimit');
        }
        return calorieLimit;
    }

    static setCalorielimit(calorieLimit) {
        localStorage.setItem('calorieLimit', calorieLimit);
    }

    static getTotalCalories(defaultCalories = 0) {
        let totalCalories;
        if (localStorage.getItem('totalCalories') === null) {
            totalCalories = defaultCalories;
        } else {
            totalCalories = +localStorage.getItem('totalCalories');
        }
        return totalCalories;
    }

    static setTotalCalories(calories) {
        localStorage.setItem('totalCalories', calories);
    }

    static getMeals() {
        let meals;
        if (localStorage.getItem('meals') === null) {
            meals = [];
        } else {
            meals = JSON.parse(localStorage.getItem('meals'));
        }
        return meals;
    }

    static saveMeal(meal) {
        const meals = this.getMeals();
        meals.push(meal);
        localStorage.setItem('meals', JSON.stringify(meals));
    }

    static removeMeal(mealId) {
        const meals = this.getMeals();
        const updatedMeals = meals.filter(meal => meal.id !== mealId);
        sessionStorage.removeItem('meals');
        localStorage.setItem('meals', JSON.stringify(updatedMeals));
    }

    static getWorkouts() {
        let workouts;
        if (localStorage.getItem('workouts') === null) {
            workouts = [];
        } else {
            workouts = JSON.parse(localStorage.getItem('workouts'));
        }
        return workouts;
    }

    static saveWorkout(workout) {
        const workouts = this.getWorkouts();
        workouts.push(workout);
        localStorage.setItem('workouts', JSON.stringify(workouts));
    }

    static removeWorkout(workoutId) {
        const workouts = this.getWorkouts();
        const updatedWorkouts = workouts.filter(
            workout => workout.id !== workoutId
        );
        sessionStorage.removeItem(workouts);
        localStorage.setItem('workouts', JSON.stringify(updatedWorkouts));
    }

    static clear() {
        const calorieLimit = localStorage.getItem('calorieLimit');
        localStorage.clear(); // It clears all items
        localStorage.setItem('calorieLimit', calorieLimit);
    }
}

export default Storage;