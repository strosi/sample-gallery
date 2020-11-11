const btn = document.querySelector('button');
const subGallery = document.querySelector('.subgallery');
const subGalleryInnerHolder = document.querySelector('.subgallery>.inner-wrapper');

function handleBtnClick() {
    subGalleryInnerHolder.innerHTML = '';
    subGallery.classList.remove('active');
}

btn.addEventListener('click', handleBtnClick);

// Handle img click
window.addEventListener('click', function (event) {
    if (!subGallery.classList.contains('active')) {
        const el = event.target;
        if (el.tagName === 'IMG') {
            subGallery.classList.add('active');
            const bigImgName = el.getAttribute('src').replace('.jpg', '-big.jpg');
            const newImg = document.createElement('img');
            newImg.setAttribute('src', bigImgName);
            subGalleryInnerHolder.append(newImg);
            console.log(subGalleryInnerHolder);

            const descript = document.createElement('p');
            const endIndx = bigImgName.lastIndexOf('/');
            const textPath = bigImgName.substring(0, endIndx + 1);
            fetch(textPath + 'description.txt')
                .then(Response => Response.text())
                .then(data => descript.innerText = data);
        }
    }
});