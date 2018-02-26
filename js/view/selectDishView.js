var SelectDishView = function (container, model) {

    "use strict";

    var paginationDetails = {};


    this.updateListOfDishes = function(type, filter, offset) {

        var searchResults = container.find("#searchResults");
        searchResults.empty();
        searchResults.append(generateLoadingDiv());

        model.getAllDishes(type, filter,offset,
            function(dishes){
            generateSearchResult(dishes);

            console.log(dishes);
            console.log(paginationDetails);

            // fix pagination details
            paginationDetails.offset = offset;
            paginationDetails.totalResults = dishes.totalResults;
            paginationDetails.type = type;
            paginationDetails.filter = filter;

            // trigger update so controller can change the paginationdiv
            container.find('#paginationDiv').trigger('update');

            },
            function(error) {
            alert("Sorry, something went wrong.. ");
            searchResults.empty();
            console.log(error);
        });


    };

    function generateSearchResult(dishes){
        var searchResults = container.find("#searchResults");

        searchResults.empty();

        if (dishes.length === 0){
            alert("Sorry, no hits for your search")
        }
        else {

            var contentRow = $("<div/>").addClass("row");
            var i;
            for (i = 0; i<dishes.results.length; i++){
                var dish = dishes.results[i];

                //Create the column
                var contents = $("<div/>")
                    .addClass('col-md-3')
                    .append(
                        //create the thumbnail (small image that represents a larger image)
                        $("<div/>")
                            .addClass('thumbnail')
                            .attr('data-dish-id', dish.id)
                            .append(
                                //Create the image
                                $("<img/>")
                                    .addClass('img-responsive ')
                                    .attr('src', dish.image)
                            )
                            .append(
                                //Create the caption
                                $("<div/>")
                                    .addClass('caption')
                                    .append(
                                        $("<p></p>").text(dish.title)
                                    )
                            )
                    );

                contentRow.append(contents);

                if (i > 0 && (i+1) % 4 === 0){
                    searchResults.append(contentRow);
                    contentRow = $("<div/>").addClass("row");
                }
            }

            if (dishes.results.length % 4 !== 0){
                searchResults.append(contentRow);
            }

        }

    };


    this.getPaginationDetails = function(){
        return paginationDetails;
    }

    this.getContainer = function(){
        return container;
    }

    this.getSearchDinnerButton = function()
    {
        return container.find("#search-dinner-button");
    };

    function generateLoadingDiv() {
        return $('<div/>').addClass('col-md-2 col-md-offset-5 vcenter').attr("id", 'loadingDiv').append($("<img/>").attr('src', 'images/slideload.gif').addClass('img-responsive'));
    }

};