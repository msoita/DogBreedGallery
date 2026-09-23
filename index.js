const dogBreedsUrl = "https://dog.ceo/api/breeds/list/all";
const dogPhotosBaseUrl = "https://dog.ceo/api/breed/dogBreedHere/images/random";

const dogWrapper = document.getElementById("dogWrapper");
const shufflePictures = document.getElementById("shufflePictures");
const refreshDogs = document.getElementById("refreshDogs");

const dogCards = [];
const dogArray = [];

const dogsToDisplay = 8;

function createDogCard(dogBreed, dogPhoto){
    const dogCard = document.createElement("div");
    dogCard.style.border = "2px solid black";
    dogCard.style.marginTop = "8px";

    const dogHeader = document.createElement("h1");
    dogHeader.innerHTML = dogBreed;
    dogCard.appendChild(dogHeader);

    const dogImage = document.createElement("img");
    dogImage.src = dogPhoto;
    dogCard.appendChild(dogImage);

    const dogCardObject = {
        dogBreed: dogBreed,
        dogHeader: dogHeader,
        dogImage: dogImage
    };

    dogCards.push(dogCardObject);
    dogWrapper.appendChild(dogCard);
}

function returnRandomDogs(){
    const retrievedIndexes = [];
    const randomDogArray = [];

    for (let i = 0; i < dogsToDisplay; i++){
        let currentIndex = Math.floor(Math.random() * dogArray.length);
        while (retrievedIndexes.indexOf(currentIndex) != -1){
            currentIndex = Math.floor(Math.random() * dogArray.length);
        }

        randomDogArray.push(dogArray[currentIndex]);
        retrievedIndexes.push(currentIndex);
    }
    return randomDogArray;
}

async function displayDogs(){
    if (dogArray.length === 0){
        await fetchDogs();
    }

    const randomDogArray = returnRandomDogs();
    for (const dogBreed of randomDogArray) {
        createDogCard(dogBreed, await getDogPhoto(dogBreed));
    }
}

async function getDogPhoto(dogBreed){
    const dogPhotosUrl = dogPhotosBaseUrl.replace("dogBreedHere", dogBreed);

    const dogPhotosRequest = new Request(dogPhotosUrl);
    const dogPhotosResponse = await fetch(dogPhotosRequest);

    const dogPhoto = await dogPhotosResponse.json();
    return dogPhoto.message;
}

async function fetchDogs() {
    const dogBreedsRequest = new Request(dogBreedsUrl);
    const dogBreedsResponse = await fetch(dogBreedsRequest);

    const dogBreeds = await dogBreedsResponse.json();
    for (const dogBreed in dogBreeds.message) {
        dogArray.push(dogBreed);
    }
}

shufflePictures.addEventListener("click", async ()=>{
    for (const dogCard of dogCards) {
        dogCard.dogImage.src = await getDogPhoto(dogCard.dogBreed);
    }
});

refreshDogs.addEventListener("click", async ()=>{
    const randomDogArray = returnRandomDogs();
    for (let i = 0; i < randomDogArray.length; i++){
        const dogBreed = randomDogArray[i];

        dogCards[i].dogBreed = dogBreed;
        dogCards[i].dogHeader.innerText = dogBreed;
        dogCards[i].dogImage.src = await getDogPhoto(dogBreed);
    }
});
displayDogs();
