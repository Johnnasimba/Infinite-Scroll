const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImage = 0;
let photosArray = [];

let photosArray = [];
//Check if all images loaded
function imageLoaded() {
    console.log('image loaded');
    imagesLoaded++;
    if(imagesLoaded === totalImage) {
        ready = true
    }
}
// Helper Function to set attributes on DOM Element
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements for Links and photos, Add to Dom
function displayPhotos() {
    totalImage = photosArray.length;
    // Run function for each object in photosArray
    photosArray.forEach(photo => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a')
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img)
        imageContainer.appendChild(item);
    });
}

// Unsplash API
const count = 50;
const apiKey = 'TSXb2m5KStsjKdrAoTVX3smhXdX6IiAMne4c9BgAPYY';

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
// Get photos from Unsplash API

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();        
    } catch (error) {
        console.log(error)
    }
}
// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + document.body.offsetHeight - 1000) {
        getPhotos();
        console.log('load more')
    }
})

// On Load
getPhotos();