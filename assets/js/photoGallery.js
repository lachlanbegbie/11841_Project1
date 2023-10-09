
async function photoGalleryItems() {
    const inThisPlace = document.getElementById('photoGallery');

    try {
        randomOffset = Math.floor(Math.random() * 300);
        console.log(randomOffset);

        const nmaGallery = "https://data.nma.gov.au/object?limit=15&offset=" + randomOffset + "&format=simple";

        // Get data and add records from NMA
        const responseGallery = await fetch(nmaGallery);
        const dataGallery = await responseGallery.json();

        // all values pulled from API
            console.log(dataGallery);


    } catch (error) {
        console.log('error: ', error);
    }
}

// Call the function so it executes
photoGalleryItems()