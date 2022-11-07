// main.js

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
  // Get the recipes from localStorage
  let recipes = getRecipesFromStorage();
  // Add each recipe to the <main> element
  addRecipesToDocument(recipes);
  // Add the event listeners to the form elements
  initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
  // A9. TODO - Complete the functionality as described in this function
  //           header. It is possible in only a single line, but should
  //           be no more than a few lines.
  return JSON.parse(localStorage.getItem('recipes')); 
  //document.write(array.join(","))
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
  // A10. TODO - Get a reference to the <main> element
  const main = document.querySelector('body').querySelector('main');
  // A11. TODO - Loop through each of the recipes in the passed in array,
  //            create a <recipe-card> element for each one, and populate
  //            each <recipe-card> with that recipe data using element.data = ...
  //            Append each element to <main>
  //console.log(recipes);
  if (recipes == null) 
    return; 
  for (let i = 0; i < recipes.length; i++) {
    //console.log(recipes[i]); 
    const recipe_card = document.createElement('recipe-card');
    //console.log(recipes[i]);
    recipe_card.data = recipes[i];
    //console.log(recipe_card); 
    //console.log(main); 
    main.append(recipe_card);  
  }
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
  // EXPLORE - START (All explore numbers start with B)
  // B1. TODO - Complete the functionality as described in this function
  //            header. It is possible in only a single line, but should
  //            be no more than a few lines.
  localStorage.setItem('recipes', JSON.stringify(recipes)); 
}

/**
 * Adds the necesarry event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {

  // B2. TODO - Get a reference to the <form> element
  const myForm = document.querySelector('body').querySelector('form');
  //console.log(myForm);  
  // B3. TODO - Add an event listener for the 'submit' event, which fires when the
  //            submit button is clicked
  //console.log(myForm);
  myForm.addEventListener('submit', FormSubmitted);

  function FormSubmitted() {

    // Steps B4-B9 will occur inside the event listener from step B3
    // B4. TODO - Create a new FormData object from the <form> element reference above
    const Form_Data = new FormData(myForm); 
    // B5. TODO - Create an empty object (I'll refer to this object as recipeObject to
    //            make this easier to read), and then extract the keys and corresponding
    //            values from the FormData object and insert them into recipeObject
    const recipeObject = {}; 

    recipeObject['imgSrc'] = Form_Data.get('imgSrc'); 
    recipeObject['imgAlt'] = Form_Data.get('imgAlt'); 
    recipeObject['titleLnk'] = Form_Data.get('titleLnk'); 
    recipeObject['titleTxt'] = Form_Data.get('titleTxt'); 
    recipeObject['organization'] = Form_Data.get('organization'); 
    recipeObject['rating'] = Form_Data.get('rating'); 
    recipeObject['numRatings'] = Form_Data.get('numRatings'); 
    recipeObject['lengthTime'] = Form_Data.get('lengthTime'); 
    recipeObject['ingredients'] = Form_Data.get('ingredients'); 
    
    // B6. TODO - Create a new <recipe-card> element
    const new_recipe = document.createElement('recipe-card');
    //console.log(Form_Data);
    //console.log(recipeObject); 
    // B7. TODO - Add the recipeObject data to <recipe-card> using element.data
    new_recipe.data = recipeObject;
    // B8. TODO - Append this new <recipe-card> to <main>
    const main = document.querySelector('body').querySelector('main');
    //console.log(new_recipe); 
    main.append(new_recipe); 
    //console.log(main); 
    // B9. TODO - Get the recipes array from localStorage, add this new recipe to it, and
    //            then save the recipes array back to localStorage
    let recipes = getRecipesFromStorage(); 
    recipes.push(recipeObject); 
    saveRecipesToStorage(recipes);

  }

  // B10. TODO - Get a reference to the "Clear Local Storage" button
  const clearButton = document.getElementsByClassName('danger')[0];
  //console.log(clearButton); 
  // B11. TODO - Add a click event listener to clear local storage button
  clearButton.addEventListener('click', eraseData);
  // Steps B12 & B13 will occur inside the event listener from step B11
  function eraseData() {
    
    // B12. TODO - Clear the local storage
    saveRecipesToStorage([]); 

    // B13. TODO - Delete the contents of <main>
    const main = document.querySelector('body').querySelector('main');
    main.innerHTML = ''; 
  }

}
