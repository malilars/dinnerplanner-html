var SelectDishView = function (container, model) {

    "use strict";

    this.updateListOfDishes = function(dishes)
    {
        var searchResults = container.find("#searchResults");
        searchResults.empty();

        dishes.forEach(function(dish) {
            //Create the column
            var contents = $("<div></div>")
                .addClass('col-md-3')
                .append(
                    //create the thumbnail (small image that represents a larger image)
                    $("<div></div>")
                        .addClass('thumbnail')
                        .attr('data-dish-id', dish.id)
                        .append(
                            //Create the image
                            $("<img/>")
                                .addClass('img')
                                .addClass('img-responsive')
                                .attr('src', 'images/' + dish.image)
                        )
                        .append(
                            //Create the caption
                            $("<div></div>")
                                .addClass('caption')
                                .append(
                                    $("<p></p>").text(dish.name)
                                )
                        )
                );
    
            searchResults.append(contents);
        });
    };

    this.getContainer = function(){
        return container;
    }

    this.getSearchDinnerButton = function()
    {
        return container.find("#search-dinner-button");
    };

};