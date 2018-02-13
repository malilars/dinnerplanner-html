var HomeView = function (container, model) {

    this.getCreateDinnerButton = function()
    {
        return container.find("#createNewDinnerButton");
    }

    this.getContainer = function(){
        return container;
    }
};
 
