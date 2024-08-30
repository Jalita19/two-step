import * as bootstrap from "bootstrap";
import { favourite } from "./index.js";
import { someFunction } from './someModule.js';

// Your module code here
function example() {
  someFunction();
}

export function createCarouselItem(imgSrc, imgAlt, imgId) {
  const template = document.querySelector("#carouselItemTemplate");
  const clone = template.content.firstElementChild.cloneNode(true);

  const img = clone.querySelector("img");
  img.src = imgSrc;
  img.alt = imgAlt;

  const favBtn = clone.querySelector(".favourite-button");
  favBtn.addEventListener("click", () => {
    favourite(imgId);
  });

  return clone;
}

export function clear() {
  const carousel = document.querySelector("#carouselInner");
  while (carousel.firstChild) {
    carousel.removeChild(carousel.firstChild);
  }
}

export function appendCarousel(element) {
  const carousel = document.querySelector("#carouselInner");

  const activeItem = document.querySelector(".carousel-item.active");
  if (!activeItem) element.classList.add("active");

  carousel.appendChild(element);
}

export function start() {
  const multipleCardCarousel = document.querySelector(
    "#carouselExampleControls"
  );
  if (window.matchMedia("(min-width: 768px)").matches) {
    const carousel = new bootstrap.Carousel(multipleCardCarousel, {
      interval: false
    });
    const carouselWidth = $(".carousel-inner")[0].scrollWidth;
    const cardWidth = $(".carousel-item").width();
    let scrollPosition = 0;
    $("#carouselExampleControls .carousel-control-next").unbind();
    $("#carouselExampleControls .carousel-control-next").on(
      "click",
      function () {
        if (scrollPosition < carouselWidth - cardWidth * 4) {
          scrollPosition += cardWidth;
          $("#carouselExampleControls .carousel-inner").animate(
            { scrollLeft: scrollPosition },
            600
          );
        }
      }
    );
    $("#carouselExampleControls .carousel-control-prev").unbind();
    $("#carouselExampleControls .carousel-control-prev").on(
      "click",
      function () {
        if (scrollPosition > 0) {
          scrollPosition -= cardWidth;
          $("#carouselExampleControls .carousel-inner").animate(
            { scrollLeft: scrollPosition },
            600
          );
        }
      }
    );
  } else {
    $(multipleCardCarousel).addClass("slide");
  }
}
import axios from 'axios';

// Set up Axios defaults
axios.defaults.baseURL = 'https://api.thecatapi.com/v1/';
axios.defaults.headers.common['x-api-key'] = 'YOUR_API_KEY_HERE'; // Replace with your API key

// Function to handle favoriting an image
export async function favourite(imgId) {
    try {
        // First, check if the image is already favorited
        const response = await axios.get('favourites', {
            params: {
                limit: 100, // Adjust limit if needed
            }
        });
        
        const favourites = response.data;
        const existingFavourite = favourites.find(fav => fav.image_id === imgId);

        if (existingFavourite) {
            // If image is already favorited, delete the favorite
            await axios.delete(`favourites/${existingFavourite.id}`);
            console.log(`Image ${imgId} unfavorited.`);
        } else {
            // If image is not favorited, add it to favorites
            await axios.post('favourites', {
                image_id: imgId
            });
            console.log(`Image ${imgId} favorited.`);
        }
    } catch (error) {
        console.error('Error favoriting/unfavoriting image:', error);
    }
}
function createCarouselItem(image) {
    const itemElement = document.createElement('div');
    itemElement.classList.add('carousel-item');
  
    const imgElement = document.createElement('img');
    imgElement.src = image.url;
    imgElement.alt = 'Cat image';
    itemElement.appendChild(imgElement);
  
    const favButton = document.createElement('button');
    favButton.textContent = '❤️'; // Heart icon or text
    favButton.addEventListener('click', () => favourite(image.id)); // Call the favourite function on click
    itemElement.appendChild(favButton);
  
    carousel.appendChild(itemElement);
  }
  // Function to get all favorite images and display them in the carousel
async function getFavourites() {
    try {
        // Fetch favorites from the API
        const response = await axios.get('favourites');
        const favourites = response.data;

        // Clear the carousel before populating it
        clearCarousel();

        // Populate the carousel with favorite images
        populateCarousel(favourites.map(fav => ({
            id: fav.image_id,
            url: fav.image.url
        })));

    } catch (error) {
        console.error('Error fetching favorites:', error);
    }
}

// Function to clear the carousel
function clearCarousel() {
    carousel.innerHTML = ''; // Assuming carousel is a reference to the carousel container
}
// The get favourites button element
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

// Bind event listener to the button
getFavouritesBtn.addEventListener('click', getFavourites);