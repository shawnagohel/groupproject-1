// An asycronous function 
async function sendApiRequest(user_search_input){
    let APP_ID = "d6bcc08b"
    let API_KEY = "217216efc2b514fa9e835e592d2808b6"
    let API_URL = `https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}&q=${user_search_input}`;
    //let response = await fetch (`https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}&q=pizza`);
    let response = await fetch (`${API_URL}`);
    console.log(API_URL);
    let data = await response.json()
    console.log(data)
    useApiData(data)
  }
  
  // function that does something with the data when it receives the API
  function useApiData(data){
  
  var counter = 0;
  var max = 10;
  
  var inner_html_string = "";
  var new_recipe = "";
  
  
  for (var i=0; i<max; i++) {
    new_recipe = ` 
    <div class="card" style="width: 18rem;">
        <img src="${data.hits[counter].recipe.image}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${data.hits[counter].recipe.label}</h5>
        <p class="card-text">Source: ${data.hits[counter].recipe.source}</p>
        <a href="${data.hits[counter].recipe.url}" class="btn btn-primary">Go Somewhere</a>
        </div>
        </div>
    `
    
    //producing the correct recipe info -- how do I concatenate strings and then, after loop, add to #content innerhtml?
  console.log(new_recipe);
  inner_html_string.concat(new_recipe);
  
  new_recipe = "";
  
  console.log(inner_html_string);
  
  }
  
  console.log(inner_html_string);
  
  document.querySelector("#content").innerHTML = inner_html_string;
  
  
    // document.querySelector("#content").innerHTML = `
    // <div class="card" style="width: 18rem;">
    //     <img src="${data.hits[0].recipe.image}" class="card-img-top" alt="...">
    //     <div class="card-body">
    //     <h5 class="card-title">${data.hits[0].recipe.label}</h5>
    //     <p class="card-text">Source: ${data.hits[0].recipe.source}</p>
    //     <a href="${data.hits[0].recipe.url}" class="btn btn-primary">Go Somewhere</a>
    //     </div>
    //     </div>
    // `
  }
  
  
  (function () {
    const result = document.querySelector('#result')
  
    function initEvent() {
      document.querySelector('#search').addEventListener('submit', function (e) {
        e.preventDefault()
        if (e.target[0].value) {
          result.innerHTML = ''
          changeTextButton(e.target[1], 'SEARCHING...')
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
      
      
      var full_url = "https://api.edamam.com/search?app_id=3ac49ab4&app_key=cf88145d2d8e9683969187e04a6bd8d2&q=";
  
        console.log(recipe_search_term);
  
        full_url.concat(recipe_search_term);
  
        console.log(full_url);
  
  // TO DO : read in the fetch API what you do from there
  // dump returned object  : when you call fetch, gives object back somewhere
  
  
      fetch(full_url)   
      .then(resp => resp.json())
        .then(resp => {
          if (resp.hints.length) {          
            resp.hints.forEach(hint => {
              insertCard(hint.food)
            })
          }
          else {
            changeInput(form[0], 'placeholder', 'We didn\'t found any food.')
            resetInput(form[0])
          }
          changeTextButton(form[1], 'SEARCH')
          changeInput(form[0], 'value', '')
        }).catch(() => {
          changeTextButton(form[1], 'SEARCH')
          // changeInput(form[0], 'placeholder', 'An error has occurred. Try again later.')
          resetInput(form[0])
        })
    }
  
  
    initEvent()
  })()