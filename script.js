/* --SideBar Controllers */

const menuIcon=document.querySelector(".menuIcon");
const closeIcon=document.querySelector(".close");
const menu=document.querySelector(".sidebar-menu");
const overlay=document.querySelector(".overlay");

function toggleMenu(){
    if(overlay.hidden){
        overlay.hidden=false;
        menu.hidden=false;
        window.addEventListener("resize",checkWidth);
    }else{
        overlay.classList.toggle("hide");
        menu.classList.toggle("hiddenMenu");
        !menu.classList.contains("hiddenMenu")?window.addEventListener("resize",checkWidth):window.removeEventListener("resize",checkWidth);
        Object.values(SideBarItems).forEach(item=>{
            item.classList.add("hidden");
            item.classList.remove("activeItem");
        });
    }
}

function checkWidth(evt){
    if(evt.target.innerWidth>900)
        toggleMenu();
}
menuIcon.addEventListener("click",toggleMenu);
closeIcon.addEventListener("click",toggleMenu);

/* --Drop Down Controllers */
const features1=document.querySelector("#Features1");
const features2=document.querySelector("#Features2");
const company1=document.querySelector("#Company1");
const company2=document.querySelector("#Company2");
let active=null;
let shownDrop=null;
const menuBarItems={
    Features1:document.querySelectorAll(".menu-bar .dropDown")[0],
    Company1:document.querySelectorAll(".menu-bar .dropDown")[1]
};
const SideBarItems={
    Features2:document.querySelectorAll(".sidebar-menu .dropDown")[0],
    Company2:document.querySelectorAll(".sidebar-menu .dropDown")[1]
};

features1.addEventListener("click",toggleDropDown1);
company1.addEventListener("click",toggleDropDown1);

features2.addEventListener("click",toggleDropDown2);
company2.addEventListener("click",toggleDropDown2);

overlay.addEventListener("click",checkOpenModel2);

function toggleDropDown1(evt){
    if(!evt.target.classList.contains("dropDown")){
        if(active!=null){
            active.classList.remove("activeItem");
            shownDrop.classList.toggle("hidden");
            if(active==this){
                active=null;
                return 0;
            }
        }
        active=this;
        active.classList.toggle("activeItem");
        shownDrop=menuBarItems[active.id];
        shownDrop.classList.toggle("hidden");
        window.addEventListener("click",checkOpenModel1);
    }
}
function checkOpenModel1(evt){
    const itemClass=evt.target.classList;
    if(!itemClass.contains("drop-title") && !itemClass.contains("dropDownItem")){
        window.removeEventListener("click",checkOpenModel1);
        if(active!=null){
            active.classList.toggle("activeItem");
            active=null;
            shownDrop.classList.toggle("hidden");
            shownDrop=null;
        }
    }
}
function toggleDropDown2(evt){
    let target=evt.target;
    try{
        SideBarItems[target.id].classList.toggle("hidden");
        SideBarItems[target.id].classList.toggle("activeItem");
    }catch{
        toggleMenu();
    }
}
function checkOpenModel2(evt){
    if(evt.target==this || evt.target.id=="non-drop" || evt.target.id=="non-drop2") 
        toggleMenu();
}