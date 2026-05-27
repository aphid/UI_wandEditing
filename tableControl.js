var imageArr = ["bi_bullet.png", "bulletStrength.png", "eletric.png", "fireWand.png", "freezing.png", "poisonExp.png", "speedUp.png"];

var inventory_element = document.querySelectorAll("th, .weapon_insert");
var onClickedCell;

var displayName = document.querySelector("h2 span");
var description = document.querySelector(".ele_info span");
var damageDispaly = document.querySelector("#damageDisplay");

for (let i = 0; i < inventory_element.length; i++) {

    inventory_element[i].onclick = function () {
        tableOnClick(inventory_element[i], i);
    };
}

function tableOnClick(block, order) {
    let blockImg = block.querySelector("img");
    if (blockImg) {
        changeDescription(blockImg.src);
    }

    if (!onClickedCell) {
        block.style.borderColor = "rgb(237, 73, 40)";
        block.style.backgroundColor = "rgb(250, 156, 78)";
        onClickedCell = block;
        return;
    }

    let preImg = onClickedCell.querySelector("img");

    let ifReplaceHappen = false;
    // swap

    if (preImg && blockImg) {
        let temp = preImg.src;
        preImg.src = blockImg.src;
        blockImg.src = temp;
        ifReplaceHappen = true;
    }
    // only first has image
    else if (preImg) {
        block.appendChild(preImg);
        ifReplaceHappen = true;
    }


    //reset
    onClickedCell.style.borderColor = "rgb(235, 229, 185)";
    onClickedCell.style.backgroundColor = "rgb(122, 90, 64)";
    if (ifReplaceHappen) {
        onClickedCell = null;
    }
    else {
        block.style.borderColor = "rgb(237, 73, 40)";
        block.style.backgroundColor = "rgb(250, 156, 78)";
        onClickedCell = block;
    }
    updateDamage();
}

function updateDamage() {
    let dmg = 0;
    for (let i of document.querySelector("#weapon_insert_selection").querySelectorAll("img")) {
        console.log(i.dataset.damage);
        dmg += parseInt(i.dataset.damage);
    }
    damageDisplay.textContent = dmg;
    //you could change the class of damageDisplay based on the number to have color indicate higher or lower power
    return dmg;

}

function createImg(imgSrc, theCell) {

    // create img element
    let img = document.createElement("img");

    // set image source
    img.src = "images/" + imgSrc;

    // get th position and size
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "contain";
    img.dataset.damage = info[imgSrc.replace(".png", "")].damage;
    // add to body
    theCell.appendChild(img);

    return img;
}


let info;
/*
info = {
    "bi_bullet":{
        "name" : "bi-bullet",
        "descript": "does weaker damages, but it will split in to two after hit an enemy",
        "damage" : -3
    },
    "bulletStrength":{
        "name" : "bullet strength",
        "descript": "your bullet being stronger",
        "damage" : 10
    }
    , "eletric":{
        "name" : "eletric",
        "descript": "add eletric damage, paralyze the enemy",
        "damage" : 5

    }
    , "fireWand":{
        "name" : "fire wand",
        "descript": "will ignite enemies on its path",
        "damage" : 3

    }
    , "freezing":{
        "name" : "freezing",
        "descript": "freezes the enemy",
        "damage" : 5

    }
    , "poisonExp":{
        "name" : "poison explode",
        "descript": "if this bullet kill an enemy, it will cause an poison explosion; will hurt yourself",
        "damage" : 15

    }
    , "speedUp":{
        "name" : "speed up",
        "descript": "your bullet flying faster now.",
        "damage" : 0

    }
};*/


function changeDescription(src) {

    let name = src.split("/").pop().replace(".png", "");

    // show on screen
    displayName.innerText = info[name].name;
    description.innerText = info[name].descript + "\n\nDamage: " + info[name].damage;

}



//loads data into info, once loaded it shows alert and raises opacity. 
document.addEventListener("DOMContentLoaded", async function () {
    let data = await fetch("info.json");
    info = await data.json();
    alert("try to click an element from a cell and insert it in to the wand.");
    ui.style.opacity = 1;

    for (let i = 0; i < imageArr.length; i++) {
        createImg(imageArr[i], inventory_element[i + 4]);
    }
    updateDamage();

});