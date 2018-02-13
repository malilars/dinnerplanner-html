var HomeView = function (container, model) {

    "use strict";

    this.getCreateDinnerButton = function()
    {
        return container.find("#createNewDinnerButton");
    }

    this.getContainer = function(){
        return container;
    }
};
 
