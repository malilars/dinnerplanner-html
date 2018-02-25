//DinnerModel Object constructor
var DinnerModel = function() {

	// For lab 3
	var APIKEY = 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB';
	var URL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/';

	// default number of guests is 1
    var numberOfGuests = 1;

	//The selected dishes aka. "full menu"
	var selectedDishes = [];
	
	// list with observers (views)
	var observers = [];

	var notifyObservers = function() {

		observers.forEach(function(observer) {
			observer.update();
		});
	}

	this.addObserver = function(observer) {
		observers.push(observer);
	}

	this.setNumberOfGuests = function(num) {
		numberOfGuests = num;
		notifyObservers();
	}
	
	this.getNumberOfGuests = function() {
		return numberOfGuests;
	}


	//Returns all the dishes on the menu.
	this.getFullMenu = function() {
		return selectedDishes;
	}

    this.getTotalDishPrice = function(dish){
		// priceperserving is always for 4 persons
		return (dish.pricePerServing/dish.servings);
	}

	//Returns the total price of the menu (all the ingredients multiplied by number of guests).
	this.getTotalMenuPrice = function() {

        //Start with a counter, that is only for 1 person
        var pricePerPerson = 0;

        //Look into every dish
        this.getFullMenu().forEach(function(dish) {

        	// in the data, the price is always for 4 persons
        	pricePerPerson += (dish.pricePerServing/dish.servings);
            });

        return pricePerPerson * numberOfGuests;

        //Multiply it by the number of guests to get the total price

	}

	this.removeDishFromMenu = function(id){

        selectedDishes = selectedDishes.filter(function(dish) {
            //if the id is different than the id we want to remove, keep
            //it in the list but if it is different, we return false to
            return dish.id != id;
        });

        notifyObservers();
	}

	this.addDishToMenu = function(dish){
		var found = false;

		selectedDishes.forEach(function(selectedDish){
			if (selectedDish.id === dish.id){
				found = true;
			}
		})

		if (!found){
			selectedDishes.push(dish);
			notifyObservers();
		}
	}

    this.getAllDishes  = function (type, filter, offset, callback, errorCallback) {


        var searchURL =URL + 'searchComplex?addRecipeInformation=false&number=12&type=' + type + '&query=' + filter + '&offset=' + offset;
        $.ajax({
            url: searchURL,
            headers: {
                'X-Mashape-Key': APIKEY,
                "Accept": 'application/json'
            },
            success: function (data) {
                callback(data)
            },
            error: function (error) {
                errorCallback(error)
            }
        })
    }

    this.getDish  = function (id, callback, errorCallback) {

        var searchURL = URL + id + '/information?includeNutrition=false';

        $.ajax({
            url: searchURL,
            headers: {
                'X-Mashape-Key': APIKEY,
                "Accept": 'application/json'
            },
            success: function (dish) {
                callback(dish)
            },
            error: function (error) {
                errorCallback(error)
            }
        })
    }

}