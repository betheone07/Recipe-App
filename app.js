var link;


function displayRecipe() {

  var input = document.getElementById('input').value;

  link = `https://api.edamam.com/search?q=${input}&app_id=649024a3&app_key=dc389424a5f009c065880762253bef71`

  var search = document.getElementById('search');
  var mydiv = document.getElementById('bodycontent');

  fetch(link)
    .then((result) => {
      return result.json()
    })
    .then((resp) => {
      var showrecipe = document.getElementById('showRecipe');


      showrecipe.innerHTML = ""


      if (input.length !== 0) {
        mydiv.style.height = "auto";
        search.style.margin = "0px auto";
      } else {
        mydiv.style.height = "100%";
        search.style.margin = "20% auto";
      }


      resp.hits.map((x) => {
        $(document).ready(function () {
          $('[data-toggle="popover"]').popover();
        });

        //vitamin array
        var Vitamins = []
        var arr = Object.entries(x.recipe.totalNutrients);
        vitamins = ['Vitamin B6', 'Vitamin C', 'Vitamin D', 'Vitamin E', 'Vitamin B12', 'Vitamin K']

        arr.map((y) => {
          if (vitamins.includes(y[1].label))
            return Vitamins.push({
              vitamin: y[1].label,
              quantity: y[1].quantity
            })
        });

        var res = []
        Vitamins.map((x) => {
          res.push(x.vitamin + " : " + x.quantity.toFixed(2))
        })





        showrecipe.innerHTML += `
      <div id="cards">
      <div class="card" style="width: 18rem;">
      <a href="${x.recipe.url}" target="blank">
      <img src="${x.recipe.image}" class="card-img-top" alt="...">
      </a>
      <div class="card-body">
        <h5 class="card-title"><b>${x.recipe.label}</b></h5>
        
        <div id="popovers">
        <h6><b>HealthLabels:</b></h6>
        <p>${x.recipe.healthLabels}</p>
        <br>
        <h6><b>Ingridients:</b></h6>
        <p>${x.recipe.ingredientLines}</p>
        <br>
        <h6><b>Vitamins:</b></h6>
        <p>${res}</p>
        <br>
        
        <h6><b>Calories:</b></h6>
        <p>${x.recipe.calories}</p>
        
        

        </div>

        
      </div>
    </div>
    </div>`


          



      })

    })


}