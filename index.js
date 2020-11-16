const body = document.querySelector('body');
const btn = document.querySelector('button');
const subGallery = document.querySelector('.subgallery');
const subGalleryImgs = document.querySelector('.subgallery .project-images');
const textHolder = document.querySelector('.description .text');

function closeSubGallery() {
    subGalleryImgs.innerHTML = '';
    textHolder.innerHTML = '';
    subGallery.classList.remove('active');
    body.classList.remove('noscroll');
}

btn.addEventListener('click', closeSubGallery);

function openSubGallery(targetImg) {
    body.classList.add('noscroll');
    subGallery.classList.add('active');
    const newImg = document.createElement('img');
    newImg.setAttribute('src', targetImg);
    subGalleryImgs.append(newImg);
}

// async function loadSubGalleryText(targetImg) {
//     const descriptText = document.createElement('p');
//     const textPath = targetImg.substring(0, targetImg.lastIndexOf('/') + 1);

//     let response = await fetch(textPath + 'description.txt')
//         .catch(err => console.error('Text not found'));

//     if (response.ok) {
//         response.text().then(data => {
//             descriptText.innerHTML = data;
//             textHolder.append(descriptText);
//         });

//         // textHolder.append(descriptText);
//     }
// }

function loadSubGalleryText(targetImg) {
    const descriptText = document.createElement('p');
    const textPath = targetImg.substring(0, targetImg.lastIndexOf('/') + 1);

    fetch(textPath + 'description.txt')
        .then(function (response) {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response;
        }).then(function (response) {
            response.text().then(data => {
                descriptText.innerHTML = data;
                textHolder.append(descriptText);
            });
        }).catch(err => console.log('I cought the error!'));
}

// Handle img click
window.addEventListener('click', function (event) {
    if (!subGallery.classList.contains('active')) {
        const el = event.target;
        if (el.tagName === 'IMG') {
            const bigImgName = el.getAttribute('src').replace('.jpg', '-big.jpg');
            openSubGallery(bigImgName);
            loadSubGalleryText(bigImgName);

            // const descriptText = document.createElement('p');
            // const textPath = bigImgName.substring(0, bigImgName.lastIndexOf('/') + 1);

            // fetch(textPath + 'description.txt')
            //     .then(Response => Response.text())
            //     .then(data => descriptText.innerText = data);
            // subGalleryInnerHolder.append(descriptText);

            // let response = await fetch(textPath + 'description.txt');
            // if (response.ok) {
            //     descriptText.innerHTML = response.text();
            //     textHolder.append(descriptText);
            // }
        }
    }
});