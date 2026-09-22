const dogWrapper = document.getElementById("dogWrapper");
const dogBreedsUrl = "https://dog.ceo/api/breeds/list/all";
const dogPhotosBaseUrl = "https://dog.ceo/api/breed/dogBreedHere/images/random";

let dogs = 0;
async function createDogCards() {
    const dogBreedsRequest = new Request(dogBreedsUrl);
    const dogBreedsResponse = await fetch(dogBreedsRequest);

    const dogBreeds = await dogBreedsResponse.json();
    for (const dogBreed in dogBreeds.message) {
        if (dogs >= 8){
            return;
        }

        const dogPhotosUrl = dogPhotosBaseUrl.replace("dogBreedHere", dogBreed);
        const dogPhotosRequest = new Request(dogPhotosUrl);
        const dogPhotosResponse = await fetch(dogPhotosRequest);

        const dogPhoto = await dogPhotosResponse.json();
        const dogCard = createDogCard(dogBreed, dogPhoto.message);
        dogs++;
    }
}

function createDogCard(dogBreed, dogPhoto){
    const dogCard = document.createElement("div");
    dogCard.style.border = "2px solid black";

    const dogHeader = document.createElement("h1");
    dogHeader.innerHTML = dogBreed;
    dogCard.appendChild(dogHeader);

    const dogImage = document.createElement("img");
    dogImage.src = dogPhoto;
    dogCard.appendChild(dogImage);

    dogWrapper.appendChild(dogCard);
}
createDogCards();