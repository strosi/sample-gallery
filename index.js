const body = document.querySelector('body');
const mainGallery = document.querySelector('.flex-gallery');
const prevBtn = document.querySelector('.prev');
const closeBtn = document.querySelector('.close');
const nextBtn = document.querySelector('.next');
const subGallery = document.querySelector('.subgallery');
const subGalleryImgs = document.querySelector('.subgallery .project-images');
let currentImg = '';
const titleHolder = document.querySelector('.description .title');
const textHolder = document.querySelector('.description .text');

function setSubGalleryNavi(targetImg) {
    if (targetImg === mainGallery.firstElementChild.firstElementChild) {
        prevBtn.classList.add('noActiveBtn');
    }

    if (targetImg === mainGallery.lastElementChild.firstElementChild) {
        nextBtn.classList.add('noActiveBtn');
    }
}

function loadSubGalleryImages(targetImg) {
    currentImg = targetImg;
    const bigImgName = targetImg.getAttribute('src').replace('.jpg', '-big.jpg');
    const newImg = document.createElement('img');
    newImg.setAttribute('src', bigImgName);
    subGalleryImgs.append(newImg);
}

function loadSubGalleryText(targetImg) {
    const clientName = document.createElement('h2');
    const projectType = document.createElement('p');
    const descriptText = document.createElement('p');
    const bigImgName = targetImg.getAttribute('src').replace('.jpg', '-big.jpg');
    const textPath = bigImgName.substring(0, bigImgName.lastIndexOf('/') + 1);

    fetch(textPath + 'description.json')
        .then(function (response) {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response;
        }).then(function (response) {
            response.json().then(data => {
                clientName.innerHTML = data.client;
                projectType.innerHTML = data.project;
                descriptText.innerHTML = data.description;
                titleHolder.append(clientName);
                titleHolder.append(projectType);
                textHolder.append(descriptText);
            });
        }).catch(err => console.log(err));
}

function setSubGalleryContent(targetImg) {
    setSubGalleryNavi(targetImg);
    loadSubGalleryImages(targetImg);
    loadSubGalleryText(targetImg);
}

function openSubGallery(targetImg) {
    body.classList.add('noscroll');
    subGallery.classList.add('active');
    setSubGalleryContent(targetImg);
}

// Handle img click in main gallery
mainGallery.addEventListener('click', function (event) {
    if (!subGallery.classList.contains('active')) {
        const el = event.target;
        if (el.tagName === 'IMG') {
            openSubGallery(el);
        }
    }
});

function removeSubGalleryContent() {
    subGalleryImgs.innerHTML = '';
    titleHolder.innerHTML = '';
    textHolder.innerHTML = '';
}

function closeSubGallery() {
    prevBtn.classList.remove('noActiveBtn');
    nextBtn.classList.remove('noActiveBtn');
    removeSubGalleryContent();
    subGallery.classList.remove('active');
    body.classList.remove('noscroll');
}

function previousImageSubgallery() {
    const prevImg = currentImg.parentElement.previousElementSibling.firstElementChild;
    removeSubGalleryContent();
    setSubGalleryContent(prevImg);
    nextBtn.classList.remove('noActiveBtn');
}

function nextImageSubgallery() {
    const nextImg = currentImg.parentElement.nextElementSibling.firstElementChild;
    removeSubGalleryContent();
    setSubGalleryContent(nextImg);
    prevBtn.classList.remove('noActiveBtn');
}

prevBtn.addEventListener('click', function (event) {
    if (event.target.classList.contains('noActiveBtn')) { return; }
    previousImageSubgallery();
});
closeBtn.addEventListener('click', closeSubGallery);
nextBtn.addEventListener('click', function (event) {
    if (event.target.classList.contains('noActiveBtn')) { return; }
    nextImageSubgallery();
});

window.addEventListener('click', function(event) {
    if(event.target === subGallery) {
        closeSubGallery();
    }
});