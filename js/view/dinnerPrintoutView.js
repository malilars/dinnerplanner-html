var DinnerPrintoutView = function (container, model) {

    "use strict";
    model.addObserver(this);
    updatePrintoutView(container,model);

    function updatePrintoutView(container,model){
        
       container.empty();

        var dinnerPrintout = $("<div/>")
            .attr("class", "row")
            .append(
                $("<div/>")
                .attr("class", "col-md-6")
                .append(
                    $("<h1/>")
                        .text("My Dinner: "+ model.getNumberOfGuests() + "people")
                )
            )
            .append(
                $("<div/>")
                .attr("class", "col-md-6 text-right")
                .append(
                    $("<button/>")
                    .attr("id", "go-back-and-edit-dinner-button")
                    .attr("class", "btn btn-info")
                    .text("Go Back And Edit Dinner")
            ));
        
            // en till div
        var allDishDiv = $("<div/>").attr("class", "row");
        model.getFullMenu().forEach(function(dish){

            var dishDiv = $("<div/>").attr("class", "row");

            var imgDiv = $("<div/>")
                .attr("class", "col-md-2")
                .append(
                    $("<figure/>")
                    .attr("class", "figure")
                    .append($("<img/>")
                        .attr("class", "img img-responsive")
                        .attr('data-dish-id', dish.image))
                        .append(
                            //Create the image
                            $("<img/>")
                                .addClass('img')
                                .addClass('img-responsive')
                                .attr('src', 'images/' + dish.image)
                        ));

            var descDiv = $("<div/>")
                .attr("class", "col-md-4")
                .append(
                    $("<h2/>")
                        .text(dish.name))
                        .append(
                            $("<p/>")
                                .text(dish.description));

            var prepDiv = $("<div/>")
                .attr("class", "col-md-6")
                    .append(
                        $("<h3/>")
                            .text("Preparation"))
                            .append(
                                $("<p/>")
                                    .text(dish.description));


            allDishDiv.append(dishDiv.append(imgDiv).append(descDiv).append(prepDiv)).append("<br>");
            
        });
        container.append(dinnerPrintout).append($("<hr/>")).append(allDishDiv);
    }

    // evoked when notifyObservers in model is called
    this.update = function ()
    {
        updatePrintoutView(container, model);
    }

    this.getContainer = function()
    {
        return container;
    }

    
};
 