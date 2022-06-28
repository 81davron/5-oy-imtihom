let mass_1 = []
let massiv = []
let savat = []
$.ajax("http://myjson.dit.upm.es/api/bins/emgj", {
    success : function(res){
        console.log(res);
        render(res)
        mass_1 = res
    }
})


function render(data){
    $(".all").html("")
    let index_1 = 0
            data.forEach(element => {
                let card = `
                <div class="col-4 my-3 mt-4">
                <div class="card case "  style="width: 18rem;">
                <a href="#" class=""like>
                <i class="bi bi-heart bi-xl ms-2 fs-4 text-start"></i>
                </a>
                <div class="photoCard text-center p-4">
                <img src="${element.img}" class="photo" alt="${element.name}" >
                </div>
                <div class="first">
                <p class="text-center text-primary">${element.name}</p>
                </div>
                <button class="dav" onclick="qosh(${index_1})">Sotib olish</button>
                </div>
                
                </div>
                `
                $(".all").append(card)
                index_1++
            });
}
$(".search").on("input", () =>{
    $(".all").html("")
    let value  = $(".search").val()
    console.log(value);
    
    let searchResult = mass_1.filter(item => {
        return item.name.toLowerCase().includes(value.toLowerCase())
        
})
    render(searchResult)
    
})

function qosh(val) {
    console.log(val);
    let sanoq = 0
    let savat_index = 0
    for (let i = 0; i < savat.length; i++) {
        if (savat[i].cost == mass_1[val].cost && savat[i].name == mass_1[val].name) {
            sanoq++
            savat_index = i
        }
        $(".badge").html(sanoq)
    }

    if (sanoq == 1) {
        savat[savat_index].miqdor = savat[savat_index].miqdor + 1
    } else if (sanoq == 0) {
        savat.push({
            img: mass_1[val].img,
            name: mass_1[val].name,
            cost: mass_1[val].cost,
            miqdor: 1
        })
    }
    notti() 

}
$(".myCard .menu").on("click", () => {
    $(".page_2").addClass("d-none")
    $(".page_1").removeClass("d-none")
})

$(".icon").on("click", () => {
    $(".page_1").addClass("d-none")
    $(".page_2").removeClass("d-none")

    filter()
})
function filter() {
    $(".page2").html("")

    let son_2 = 0
    let son = 0
    savat.forEach(box => {
        let card = `
        <div class="col-4">
        <div class="card">
        <div class="text-center"> <img src="${box.img}" alt="rasm bor"></div>
        <div>
          <h4>${box.cost * box.miqdor} $</h4>
           <h4>${box.name}</h4>
           <div class="d-flex"><button onclick="minus(${son})" class=" btn btn-primary rounded-0 tugmacha ">-</button><button class="btn border rounded-0 tugmacha"><h3>${box.miqdor}</h3></button><button onclick="plus(${son_2})" class=" tugmacha btn btn-primary rounded-0">+</button></div>
        </div>
        </div>
        </div>
        `
        son++
        son_2++
        $(".page2").append(card)
    })

    let hisob = 0

    savat.forEach(item => {
        hisob += Number(item.cost) * Number(item.miqdor)
    })

    $(".all_cost").html("")
    let p = `
      <h2 class="text-center fw-bold text-dark mt-3">ALL COST: ${hisob} $</h2>
      `
    $(".all_cost").append(p)
}


function minus(son) {
    if (savat[son].miqdor > 1) {
        savat[son].miqdor -= 1
        filter()
    } else {
        savat.splice(son, 1)
        filter()
        notti()
    }
}

function plus(son_2) {
    savat[son_2].miqdor += 1
    filter()
}



function notti() {
    $(".notification").html("")
    habar = savat.length
  
    let notifi = `
    <span class=" badge rounded-pill bg-danger ">
    ${habar}
  </span>
  `
    $(".notification").append(notifi)
}

