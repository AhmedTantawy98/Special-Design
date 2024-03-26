//Setting-Box
document.querySelector(".toggle-settings").onclick= function () {
    document.querySelector(".toggle-settings .icon").classList.toggle("fa-spin");
    document.querySelector(".settings-box").classList.toggle("open");
};


//Main-Color Control
let colorsLi= document.querySelectorAll(".colors-list li");
let mainColor= localStorage.getItem("color-option");
if(mainColor !== null) {
    document.documentElement.style.setProperty("--main-color", mainColor);
    colorsLi.forEach((li) => {
        li.classList.remove("active");
        if(li.dataset.color === mainColor) {
            li.classList.add("active");
        }
    })
}
colorsLi.forEach((li) => {
    li.addEventListener("click", (e) => {
        handleActive(e);
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
        localStorage.setItem("color-option", e.target.dataset.color);
    })
});


//Random-Background Control
let backgroundOption= true;
let backgroundInterval;
let backgroundLocalItem= localStorage.getItem("background_option");
if(backgroundLocalItem !== null) {
    document.querySelectorAll(".random-backgrounds span").forEach((element) => {
        element.classList.remove("active");
    });
    if(backgroundLocalItem === "true") {
        backgroundOption= true;
        document.querySelector(".random-backgrounds .yes").classList.add("active")
    } else {
        backgroundOption= false;
        document.querySelector(".random-backgrounds .no").classList.add("active");
    }
};
let randomBackEl= document.querySelectorAll(".option-box .random-backgrounds span");
randomBackEl.forEach((span) => {
    span.addEventListener("click", (e) => {
        handleActive(e);
        if(e.target.dataset.background === "yes") {
            backgroundOption= true;
            randomizImgs();
            localStorage.setItem("background_option", true);
        } else {
            backgroundOption= false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false)
        }
    })
});
let landingPage= document.querySelector(".landing-page");
let imgs = ["02.jpg", "03.jpg", "04.jpg", "05.jpg", "07.jpg", "08.jpg", "09.jpg", "10.jpg"];
function randomizImgs () {
    if(backgroundOption === true){
        backgroundInterval= setInterval(() => {
            let randomNumber= Math.floor(Math.random() * imgs.length);
            landingPage.style.backgroundImage= `url(imgs/${imgs[randomNumber]})`
        }, 5000)
    }
};
randomizImgs();



//Bullets-Display Control
let bulletsSpan= document.querySelectorAll(".bullets-option span");
let bulletsContainer= document.querySelectorAll(".nav-bullets .bullet");
let bulletLocalItem=localStorage.getItem("bullets-option");
if(bulletLocalItem !== null) {
    bulletsSpan.forEach((span) => {
        span.classList.remove("active");
    })
    if(bulletLocalItem === "block") {
        bulletsContainer.forEach((bullet) => {
            bullet.style.display= "block"
        })
        document.querySelector(".bullets-option .yes").classList.add("active")
    } else {
        bulletsContainer.forEach((bullet) => {
            bullet.style.display= "none"
        })
        document.querySelector(".bullets-option .no").classList.add("active")
    }
};
bulletsSpan.forEach((span) => {
    span.addEventListener("click",(e) => {
        handleActive(e);
        if(e.target.dataset.display === "show") {
            bulletsContainer.forEach((bullet) => {
                bullet.style.display= "block"
            });
            localStorage.setItem("bullets-option", "block");
        } else {
            bulletsContainer.forEach((bullet) => {
                bullet.style.display= "none"
            })
            localStorage.setItem("bullets-option", "none");
        }
    })
});


//Local-Storage Reset
document.querySelector(".reset-option").onclick= function () {
    localStorage.clear()
    window.location.reload()
};


//Sections-Scroll Control
let allBullets= document.querySelectorAll(".nav-bullets .bullet");
let allLinks= document.querySelectorAll(".landing-page .links a");
function linksScroll(element) {
    element.forEach((link) => {
        link.addEventListener("click", e => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth"
            })
        })
    })
};
linksScroll(allBullets);
linksScroll(allLinks);


//Skills Control
let ourSkills= document.querySelector(".skills");
let progressSpan= document.querySelectorAll(".skills .skill-progress span");
window.onscroll= function() {
    if(window.scrollY >= ourSkills.offsetTop - 300) {
        progressSpan.forEach((span) => {
            span.style.width= span.dataset.progress
        })
    }
};


//Img-Popup Control
let ourGallery= document.querySelectorAll(".gallery img")
ourGallery.forEach((img) => {
    img.addEventListener("click", (e) => {
        let overLay= document.createElement("div");
        overLay.className= "popup-overlay"
        document.body.appendChild(overLay);

        let popupBox= document.createElement("div");
        popupBox.className= "popup-box";
        if(img.src !== null) {
            let imgHead= document.createElement("h3");
            let headText= document.createTextNode(img.alt);
            imgHead.appendChild(headText);
            popupBox.appendChild(imgHead)
        };
        let popupImg= document.createElement("img");
        popupImg.src= img.src
        popupBox.appendChild(popupImg)
        document.body.appendChild(popupBox);

        let closeButton= document.createElement("span");
        closeButton.className= "close-button";
        let closeButtonText= document.createTextNode("x");
        closeButton.appendChild(closeButtonText);
        popupBox.appendChild(closeButton);
    })
});
document.addEventListener("click", e => {
    if(e.target.className == "close-button") {
        e.target.parentElement.remove();
        document.querySelector(".popup-overlay").remove();
    }
});



function handleActive (ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
        element.classList.remove("active");
    })
    ev.target.classList.add("active")
}



let toggleBtn= document.querySelector(".toggle-menu");
let tLinks= document.querySelector(".links");
toggleBtn.onclick= function (e) {
    e.stopPropagation();
    this.classList.toggle("active-toggle");
    tLinks.classList.toggle("open")
};
// Stop Propagation On Menu 
tLinks.onclick = function (e) {
    e.stopPropagation();
}
document.addEventListener("click", (e) => {
    if(e.target !== toggleBtn && e.target !== tLinks) {
        if(tLinks.classList.contains("open")) {
            toggleBtn.classList.toggle("active-toggle");
            tLinks.classList.toggle("open")
        }
    }
});