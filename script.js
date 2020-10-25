
// Unsplash API
const count = 10;
const apiKey = 'TSXb2m5KStsjKdrAoTVX3smhXdX6IiAMne4c9BgAPYY';

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
// Get photos from Unsplash API

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error)
    }
}
// On Load
getPhotos();