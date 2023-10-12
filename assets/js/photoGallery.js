
async function photoGalleryItems() {
    const photoGallery = document.getElementById('photoGallery');

    try {
        randomOffset = Math.floor(Math.random() * 5000);
        console.log(randomOffset);

        const nmaGallery = "https://data.nma.gov.au/object?limit=8&text=*&media=*&offset=" + randomOffset + "&format=simple";

        // Get data and add records from NMA
        const responseGallery = await fetch(nmaGallery);
        const dataGallery = await responseGallery.json();

        // all values pulled from API
            console.log(dataGallery);

        const count = 0;
        
        dataGallery.data.forEach(item => {
            if (item.hasVersion != null) {
                // image of item
                const img = item.hasVersion[0].hasVersion;
                // const image = item.hasVersion[0].hasVersion[0].identifier;
                
                for (i=0; i < img.length; i++) {
                    if (img[i].version === 'large image') {
                        item.imageURL = img[i].identifier;
                    }
                }
                
                const containerItem = document.createElement('div');
                containerItem.className = "galleryImage";

                containerItem.innerHTML = `<img src="${item.imageURL}" class="innerImage">`;

                photoGallery.appendChild(containerItem);
            }
        })

    } catch (error) {
        console.log('error: ', error);
    }
}

// Call the function so it executes
photoGalleryItems()