import Storage from './Storage';

class CalorieTracker {
    constructor() {
        this._calorieLimit = Storage.getCalorieLimit();
        this._totalCalories = Storage.getTotalCalories();
        this._meals = Storage.getMeals();
        this._workouts = Storage.getWorkouts();

        this._displayTotalCalories();
        this._displayCaloriesLimit();
        this._displayCaloriesBurned();
        this._displayCaloriesIntake();
        this._displayCaloriesRemaining();
        this._displayCaloriesProgress();

        document.getElementById('limit').value = this._calorieLimit;
    }

    // Public methods
    addMeal(meal) {
        this._meals.push(meal);
        this._displayMeal(meal);
        this._totalCalories += meal.calories;
        Storage.setTotalCalories(this._totalCalories);
        Storage.saveMeal(meal);
        this._updateUI();
    }

    removeMeal(mealId) {
        let deletedMeal;
        for (let meal of this._meals) {
            if (meal.id === mealId) {
                deletedMeal = meal;
            }
        }

        this._meals = this._meals.filter(meal => meal.id !== mealId);
        this._totalCalories -= deletedMeal.calories;
        Storage.setTotalCalories(this._totalCalories);
        Storage.removeMeal(mealId);
        this._updateUI();
    }

    addWorkout(workout) {
        this._workouts.push(workout);
        this._displayWorkout(workout);
        this._totalCalories -= workout.calories; -
        0;
        Storage.setTotalCalories(this._totalCalories);
        Storage.saveWorkout(workout);
        this._updateUI();
    }

    removeWorkout(workoutId) {
        let deletedWorkout;
        for (let workout of this._workouts) {
            if (workout.id === workoutId) {
                deletedWorkout = workout;
            }
        }

        this._workouts = this._workouts.filter(
            workout => workout.id !== workoutId
        );
        this._totalCalories += deletedWorkout.calories;
        Storage.setTotalCalories(this._totalCalories);
        Storage.removeWorkout(workoutId);
        this._updateUI();
    }

    reset() {
        this._totalCalories = 0;
        this._meals = [];
        this._workouts = [];
        Storage.clear();
        this._updateUI();
    }

    setLimit(calorieLimit) {
        this._calorieLimit = calorieLimit;
        Storage.setCalorielimit(calorieLimit);
        this._displayCaloriesLimit();
        this._updateUI();
    }

    loadItems() {
        this._meals.forEach(meal => this._displayMeal(meal));
        this._workouts.forEach(workout => this._displayWorkout(workout));
    }

    // Private Methods
    _displayTotalCalories() {
        const totalCaloriesEl = document.getElementById('calories-total');
        totalCaloriesEl.innerHTML = this._totalCalories;
        if (this._totalCalories < 0) {
            totalCaloriesEl.parentElement.parentElement.classList.remove(
                'bg-primary'
            );
            totalCaloriesEl.parentElement.parentElement.classList.add(
                'bg-danger'
            );
        } else if (
            totalCaloriesEl.parentElement.parentElement.classList.contains(
                'bg-danger'
            )
        ) {
            totalCaloriesEl.parentElement.parentElement.classList.remove(
                'bg-danger'
            );
            totalCaloriesEl.parentElement.parentElement.classList.add(
                'bg-primary'
            );
        }
    }

    _displayCaloriesLimit() {
        const caloriesLimitEl = document.getElementById('calories-limit');
        caloriesLimitEl.innerHTML = this._calorieLimit;
    }

    _displayCaloriesIntake() {
        const caloriesConsumedEl = document.getElementById('calories-consumed');

        const intake = this._meals.reduce(
            (total, meal) => total + meal.calories,
            0
        );

        caloriesConsumedEl.innerHTML = intake;
    }

    _displayCaloriesBurned() {
        const caloriesBurnedEl = document.getElementById('calories-burned');

        const burned = this._workouts.reduce(
            (total, workout) => total + workout.calories,
            0
        );

        caloriesBurnedEl.innerHTML = burned;
    }

    _displayCaloriesRemaining() {
        const caloriesRemainingEl =
            document.getElementById('calories-remaining');

        const remaining = this._calorieLimit - this._totalCalories;

        caloriesRemainingEl.innerHTML = remaining;

        if (remaining <= 0) {
            caloriesRemainingEl.parentElement.parentElement.classList.remove(
                'bg-light'
            );
            caloriesRemainingEl.parentElement.parentElement.classList.add(
                'bg-danger'
            );
        } else {
            caloriesRemainingEl.parentElement.parentElement.classList.remove(
                'bg-danger'
            );
            caloriesRemainingEl.parentElement.parentElement.classList.add(
                'bg-light'
            );
        }
    }

    _displayCaloriesProgress() {
        const progressEl = document.getElementById('calorie-progress');
        const percentage = (this._totalCalories / this._calorieLimit) * 100;
        const width = Math.min(percentage, 100);

        if (this._totalCalories >= 0) {
            progressEl.style.width = `${width}%`;
        } else {
            progressEl.style.width = `${width * -1}%`;
        }

        if (+document.getElementById('calories-remaining').innerHTML <= 0 ||
            this._totalCalories < 0
        ) {
            progressEl.classList.add('bg-danger');
        } else if (progressEl.classList.contains('bg-danger')) {
            progressEl.classList.remove('bg-danger');
        }
    }

    _displayMeal(meal) {
        const mealsEl = document.getElementById('meal-items');
        const mealEl = document.createElement('div');
        mealEl.classList.add('card', 'my-2');
        mealEl.setAttribute('data-id', meal.id);
        mealEl.innerHTML = `
        <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
                <h4 class="mx-1">${meal.name}</h4>
                <div class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5">
                    ${meal.calories}
                </div>
                <button class="delete btn btn-danger btn-sm mx-2">
                <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        </div>
        `;
        mealsEl.appendChild(mealEl);
    }

    _displayWorkout(workout) {
        const workoutsEl = document.getElementById('workout-items');
        const workoutEl = document.createElement('div');
        workoutEl.classList.add('card', 'my-2');
        workoutEl.setAttribute('data-id', workout.id);
        workoutEl.innerHTML = `
        <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
                <h4 class="mx-1">${workout.name}</h4>
                <div class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5">
                    ${workout.calories}
                </div>
                <button class="delete btn btn-danger btn-sm mx-2">
                <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        </div>
        `;
        workoutsEl.appendChild(workoutEl);
    }

    _updateUI() {
        this._displayTotalCalories();
        this._displayCaloriesIntake();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayCaloriesProgress();
    }
}

export default CalorieTracker;