// An asycronous function 
async function sendApiRequest(user_search_input){
    let APP_ID = "d6bcc08b"
    let API_KEY = "217216efc2b514fa9e835e592d2808b6"
    let API_URL = `https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}&q=${user_search_input}`;
    let response = await fetch (`${API_URL}`);
    console.log(API_URL);
    let data = await response.json()
    console.log(data)
    useApiData(data)
  }

 
  $("#content").on("click", ".card-title",  function() {
    var recipeUrl;
    var recipeTitle;
        recipeTitle = $(this).text()
        console.log(recipeTitle);
        recipeUrl = $(this).closest(".card-body").children(".recipe-info").attr("href")
        console.log(recipeUrl);
  })



  // function that does something with the data when it receives the API
  function useApiData(data){
  var max = 10;
  var new_recipe = "";
  for (var i=0; i<max; i++) {
    new_recipe += ` 
    <div class="card recipe-card" style="width: 18rem;">
        <img src="${data.hits[i].recipe.image}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${data.hits[i].recipe.label}</h5>
        <p class="card-text">Source: ${data.hits[i].recipe.source}</p>
        <a href="${data.hits[i].recipe.url}" class="btn btn-primary recipe-info">Click for the recipe</a>
        </div>
        </div>
    `

        console.log(new_recipe);
        document.querySelector("#content").innerHTML = new_recipe;
    }

  }
  (function () {
    const result = document.querySelector('#content')
    function initialEvent() {
      document.querySelector('#search').addEventListener('submit', function (e) {
        e.preventDefault()
        if (e.target[0].value) {
          result.innerHTML = ''
          changeTextButton(e.target[1], 'Searching for your recipe...')
          search(e.target)
        }
      }, false)
    }
    function changeTextButton(button, text) {
      button.textContent = text
    }
    function search(form) {
      const formData = new FormData(form)
      var recipe_search_term = formData.get('name');
      sendApiRequest(recipe_search_term);
    }
    initialEvent()
  })()