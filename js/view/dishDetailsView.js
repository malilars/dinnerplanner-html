var DishDetailsView = function (container, model) {

    "use strict";
    model.addObserver(this);

    var currentDish = null;
    var currentDishId = null;


    this.updateDishDetails = function(id) {

        // if id's are the same, we just want to update the dish, not issue a new get-request
        if (id === currentDishId) {
            generateDishDetailView(currentDish);
        }
        else {
            container.empty();
            container.append(generateLoadingDiv());

            model.getDish(id, function (dish) {
                currentDish = dish;
                currentDishId = dish.id;
                generateDishDetailView(dish);

            }, function (error) {

                alert("Ops! Something went wrong..");
                container.empty();
                console.log(error);
            });

        }
    }

    function generateDishDetailView(dish){

        //get the number of guests
        var numberOfGuests = model.getNumberOfGuests();
        //initialize the total dish cost
        var totalDishCost = precisionRound(model.getTotalDishPrice(dish) * numberOfGuests,0);

        //update all html
        var colDivOne = $("<div></div>")
            .addClass('col-md-6')
            .append(
                //update head
                $("<h3/>")
                //TODO, this should be title
                    .text(dish.title))
            .append(
                $("<img/>")
                //update picture TODO src = image
                    .attr("src", dish.image).attr("class", "img img-responsive"))
            .append(
                $("<p/>")
                //update dercription perhaps do title here again
                    .text(dish.title))
            .append(
                $("<button/>")
                    .attr("id", "backToSearchViewButton")
                    .attr("class", "btn btn-info")
                    .text("Back to search")
            ).append(
                $("<h2/>").text("PREPARATION")
            ).append(
                //update preparation description
                // TODO use instructions dish.instructions
                $("<p/>").text(dish.instructions)
            );
        //uppdate ingredients
        var ingredientTable = $("<table/>").attr("class", "table").append("<tbody>");

        // TODO dish.extendedIngredients.forEach(function(ingredient
        dish.extendedIngredients.forEach(function(ingredient) {

            // TODO, set amount / 4
            var totQuant = precisionRound((ingredient.amount/dish.servings) * numberOfGuests,2);

            var tr = $("<tr/>")
                .append(
                    $("<td/>")
                        .text(totQuant + " " + ingredient.unit))
                .append(
                    $("<td/>")
                        .text(ingredient.name));


            ingredientTable.append(tr);
        });
        ingredientTable.append("</thead>")
            .append(
                $("<tfoot/>")
                    .append($("<tr/>")
                        .append(
                            $("<th/>")
                                .attr("colspan", "2")
                                .append(
                                    $("<button/>")
                                        .attr("chosenDish", dish.id)
                                        .attr("id", "addToMenuButton")
                                        .attr("class", "btn btn-primary")
                                        .text("Add to menu")))
                        .append(
                            $("<th/>")
                                .text("SEK"))
                        .append(
                            $("<th/>")

                                .text(totalDishCost))));


        var colDivTwo = $("<div/>")
            .attr("class", "col-md-6")
            .append(
                $("<div/>")
                    .attr("class", "panel panel-default")
                    .append(
                        $("<div/>")
                            .attr("class", "panel-heading")
                            .text("Ingredients for " + numberOfGuests + " people"))
                    .append(
                        $("<div/>")
                            .attr("class", "panel-body")
                            .append(ingredientTable)
                    )
            );

        var mainDiv = $("<div/>")
            .attr("class", "row")
            .append(colDivOne)
            .append(colDivTwo);

        container.empty();
        container.append(mainDiv);

    }

    this.update = function()
    {
        // if it's null we haven't init the view
        if(currentDishId !== null){
            this.updateDishDetails(currentDishId);
        }

    };

    this.getContainer = function(){
        return container;
    };

    this.getCurrentDish = function(){
        return currentDish;
    }

    function precisionRound(number, precision) {
        var factor = Math.pow(10, precision);
        return Math.round(number * factor) / factor;
    }

    function generateLoadingDiv() {
        return $('<div/>').addClass('col-md-2 col-md-offset-5 vcenter').attr("id", 'loadingDiv').append($("<img/>").attr('src', 'images/slideload.gif').addClass('img-responsive'));
    }
}
