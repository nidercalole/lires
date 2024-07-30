## EDIT
## The original Chefkoch API is by gamersi on GitHub.
I made one modification. In this edited version of the API, you will also get the recipe description by using the getRecipe() function.
## Usage
To use the API, you need to import the API in your code:
```

### Get all recipes

```
chefkoch.chefkochAPI.getAllRecipes().then(function(data){
    console.log(data);
});
```
### Get all the categories
```
chefkoch.chefkochAPI.getCategories().then(function(data){
    console.log(data);
});
```
### Get the recipes of a category
```
chefkoch.chefkochAPI.getCategories().then(function(data){
    let category = data[0];
    chefkoch.chefkochAPI.getRecipes(category, 5/*these are the amount of pages to scrape, this is optional*/, 0/*this is the Start page*/).then(function(data){
        console.log(data);
    });
});
```
### Search for recipes
```
chefkoch.chefkochAPI.searchRecipes('pizza', 5/*these are the amount of pages to scrape, this is optional*/, 0/*this is the Start page*/).then(function(data){
    console.log(data);
});
```
### Get a recipe
```
chefkoch.chefkochAPI.getRecipe('/rezepte/1127371219159420/Dinkel-Hirse-Vollkornbrot.html'/*this is the subURL of the recipe*/).then(function(data){
    console.log(data);
});
```
### write to a Json
```
const chefkoch = require("chefkoch-api");
async function init() {
    await chefkoch.chefkochAPI.searchRecipes("raclette").then(function(data) {
        new chefkoch.DataParser().writeRecipesToJson(data, "raclette.json")
    })
}
init()
```
