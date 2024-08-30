
// Import statements should be at the top
import { Carousel } from './Carousel.js';

// Your code follows
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Carousel or other code
});
import * as Carousel from "./Carousel.js";
import axios from "axios";

// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");
const carousel = document.getElementById("carousel");


// Step 0: Store your API key here for reference and easy access.
const API_KEY = "live_K2bfEpr5Jzrmb8uhCmVEK0hnB1monEXYIOacSTpRsr6B0BZ2W8N8xWDCZc32jPfD";



// Function to handle breed selection change
async function handleBreedSelectChange() {
    const breedId = breedSelect.value;
    if (!breedId) return;

    try {
        // Fetch images for the selected breed
        const imagesResponse = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&limit=5`);
        if (!imagesResponse.ok) {
            throw new Error('Network response was not ok');
        }
        const images = await imagesResponse.json();

        // Clear and populate the carousel
        populateCarousel(images);

        // Fetch breed details
        const breedResponse = await fetch(`https://api.thecatapi.com/v1/breeds/${breedId}`);
        if (!breedResponse.ok) {
            throw new Error('Network response was not ok');
        }
        const breedData = await breedResponse.json();

        // Update the infoDump with breed information
        updateInfoDump(breedData);

    } catch (error) {
        console.error('Error loading breed images or details:', error);
    }
}

// Function to populate the carousel with images
function populateCarousel(images) {
    carousel.innerHTML = ''; // Clear previous images

    // Create and append new image elements
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.url;
        imgElement.alt = 'Cat image';
        imgElement.classList.add('carousel-image'); // Add class for styling
        carousel.appendChild(imgElement);
    });

    // Optionally restart the carousel if needed (depends on carousel implementation)
    restartCarousel();
}

// Function to update the infoDump with breed details
function updateInfoDump(breedData) {
    infoDump.innerHTML = `
        <h2>${breedData.name}</h2>
        <p><strong>Description:</strong> ${breedData.description}</p>
        <p><strong>Origin:</strong> ${breedData.origin}</p>
        <p><strong>Life Span:</strong> ${breedData.life_span} years</p>
        <p><strong>Temperament:</strong> ${breedData.temperament}</p>
    `;
}

// Dummy function to restart the carousel (adjust based on your carousel implementation)
function restartCarousel() {
    // Implement carousel initialization or restart logic here
    console.log('Carousel restarted');
}

// Add event listener for breed selection
breedSelect.addEventListener('change', handleBreedSelectChange);

// Function to load initial breeds into the select element
async function initialLoad() {
    try {
        const apiUrl = 'https://api.thecatapi.com/v1/breeds';
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const breeds = await response.json();

        // Clear any existing options in the select element
        breedSelect.innerHTML = '';

        // Create and append new <option> elements for each breed
        breeds.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed.id; // Set the value attribute to the breed ID
            option.textContent = breed.name; // Set the text content to the breed name
            breedSelect.appendChild(option); // Append the <option> to the <select>
        });

        // Optionally initialize with the first breed's data
        if (breedSelect.options.length > 0) {
            breedSelect.value = breedSelect.options[0].value; // Set default selection
            handleBreedSelectChange(); // Initialize carousel with the default breed
        }
    } catch (error) {
        console.error('Error loading breeds:', error);
    }
}


// Function to populate the carousel with images
function populateCarousel(images) {
  images.forEach(image => {
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
  });

  

  // Optionally restart the carousel if needed (depends on carousel implementation)
  restartCarousel();
}

// Dummy function to restart the carousel (adjust based on your carousel implementation)
function restartCarousel() {
  // Implement carousel initialization or restart logic here
  console.log('Carousel restarted');
}

// Call the function immediately
initialLoad();

/**
 * 1. Create an async function "initialLoad" that does the following:
 * - Retrieve a list of breeds from the cat API using fetch().
 * - Create new <options> for each of these breeds, and append them to breedSelect.
 *  - Each option should have a value attribute equal to the id of the breed.
 *  - Each option should display text equal to the name of the breed.
 * This function should execute immediately.
 */

/**
 * 2. Create an event handler for breedSelect that does the following:
 * - Retrieve information on the selected breed from the cat API using fetch().
 *  - Make sure your request is receiving multiple array items!
 *  - Check the API documentation if you're only getting a single object.
 * - For each object in the response array, create a new element for the carousel.
 *  - Append each of these new elements to the carousel.
 * - Use the other data you have been given to create an informational section within the infoDump element.
 *  - Be creative with how you create DOM elements and HTML.
 *  - Feel free to edit index.html and styles.css to suit your needs, but be careful!
 *  - Remember that functionality comes first, but user experience and design are important.
 * - Each new selection should clear, re-populate, and restart the Carousel.
 * - Add a call to this function to the end of your initialLoad function above to create the initial carousel.
 */

/**
 * 3. Fork your own sandbox, creating a new one named "JavaScript Axios Lab."
 */
/**
 * 4. Change all of your fetch() functions to axios!
 * - axios has already been imported for you within index.js.
 * - If you've done everything correctly up to this point, this should be simple.
 * - If it is not simple, take a moment to re-evaluate your original code.
 * - Hint: Axios has the ability to set default headers. Use this to your advantage
 *   by setting a default header with your API key so that you do not have to
 *   send it manually with all of your requests! You can also set a default base URL!
 */
/**
 * 5. Add axios interceptors to log the time between request and response to the console.
 * - Hint: you already have access to code that does this!
 * - Add a console.log statement to indicate when requests begin.
 * - As an added challenge, try to do this on your own without referencing the lesson material.
 */

/**
 * 6. Next, we'll create a progress bar to indicate the request is in progress.
 * - The progressBar element has already been created for you.
 *  - You need only to modify its "width" style property to align with the request progress.
 * - In your request interceptor, set the width of the progressBar element to 0%.
 *  - This is to reset the progress with each request.
 * - Research the axios onDownloadProgress config option.
 * - Create a function "updateProgress" that receives a ProgressEvent object.
 *  - Pass this function to the axios onDownloadProgress config option in your event handler.
 * - console.log your ProgressEvent object within updateProgess, and familiarize yourself with its structure.
 *  - Update the progress of the request using the properties you are given.
 * - Note that we are not downloading a lot of data, so onDownloadProgress will likely only fire
 *   once or twice per request to this API. This is still a concept worth familiarizing yourself
 *   with for future projects.
 */

/**
 * 7. As a final element of progress indication, add the following to your axios interceptors:
 * - In your request interceptor, set the body element's cursor style to "progress."
 * - In your response interceptor, remove the progress cursor style from the body element.
 */
/**
 * 8. To practice posting data, we'll create a system to "favourite" certain images.
 * - The skeleton of this function has already been created for you.
 * - This function is used within Carousel.js to add the event listener as items are created.
 *  - This is why we use the export keyword for this function.
 * - Post to the cat API's favourites endpoint with the given ID.
 * - The API documentation gives examples of this functionality using fetch(); use Axios!
 * - Add additional logic to this function such that if the image is already favourited,
 *   you delete that favourite using the API, giving this function "toggle" functionality.
 * - You can call this function by clicking on the heart at the top right of any image.
 */
export async function favourite(imgId) {
  // your code here
}

/**
 * 9. Test your favourite() function by creating a getFavourites() function.
 * - Use Axios to get all of your favourites from the cat API.
 * - Clear the carousel and display your favourites when the button is clicked.
 *  - You will have to bind this event listener to getFavouritesBtn yourself.
 *  - Hint: you already have all of the logic built for building a carousel.
 *    If that isn't in its own function, maybe it should be so you don't have to
 *    repeat yourself in this section.
 */

/**
 * 10. Test your site, thoroughly!
 * - What happens when you try to load the Malayan breed?
 *  - If this is working, good job! If not, look for the reason why and fix it!
 * - Test other breeds as well. Not every breed has the same data available, so
 *   your code should account for this.
 */
