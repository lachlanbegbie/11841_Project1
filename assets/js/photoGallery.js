
async function photoGalleryItems() {
    const photoGallery = document.getElementById('photoGallery');

    try {
        randomOffset = Math.floor(Math.random() * 5000);
        // console.log(randomOffset);

        const nmaGallery = "https://data.nma.gov.au/object?limit=12&text=*&media=*&offset=" + randomOffset + "&format=simple";

        // Get data and add records from NMA
        const responseGallery = await fetch(nmaGallery);
        const dataGallery = await responseGallery.json();

        // all values pulled from API
            // console.log(dataGallery);
        
        dataGallery.data.forEach(item => {
            if (item.hasVersion != null) {
                // insert item into array to return for modal
                modalInfo.push([item.id, item]);

                // image of item
                const img = item.hasVersion[0].hasVersion;
                // const image = item.hasVersion[0].hasVersion[0].identifier;
                
                for (i=0; i < img.length; i++) {
                    if (img[i].version === 'large image') {
                        item.imageURL = img[i].identifier;
                    }
                }
                
                const containerItem = document.createElement('div');
                containerItem.className = "galleryImage expand";

                containerItem.innerHTML = `<img src="${item.imageURL}" class="innerImage">`;

                containerItem.setAttribute('modal-index', `${item.id}`);
                containerItem.setAttribute('onClick', `openModal(${item.id})`);

                photoGallery.appendChild(containerItem);
            }
        })

    } catch (error) {
        console.log('error: ', error);
    }
}

// Call the function so it executes
photoGalleryItems()