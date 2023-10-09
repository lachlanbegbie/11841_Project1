const placeInput = document.getElementById('placeInput');
placeInput.addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {
        getPlaceItem();
    }
});

// const nmaDate = "https://data.nma.gov.au/object?limit=5&temporal=" + dateCode + "&format=simple";

async function getPlaceItem() {
    const inThisPlace = document.getElementById('inThisPlace');
    const placeInputValue = document.getElementById('placeInput').value;

    try {
        console.log(placeInputValue);
        
        // const nmaPlace = "https://data.nma.gov.au/object?limit=5&spatial=" + placeInputValue + "&format=simple&apikey=" + apikey;
        const nmaPlace = "https://data.nma.gov.au/object?limit=5&spatial=" + placeInputValue + "&format=simple";

        // Get data and add records from NMA
        const responsePlace = await fetch(nmaPlace);
        const dataPlace = await responsePlace.json();

        // all values pulled from API
            // console.log(dataPlace);

        // how many items which have no image are displayed
        let noImgPlace = 0;
        let hasImagePlace = 0;

        //check if image
        dataPlace.data.forEach(item => {
            if (item.hasVersion != null) {
                // image of item
                const img = item.hasVersion[0].hasVersion;
                // const image = item.hasVersion[0].hasVersion[0].identifier;
                
                for (i=0; i < img.length; i++) {
                    if (img[i].version === 'large image') {
                        item.imageURL = img[i].identifier;
                    }
                }
                item.hasImage = true;

            } else  {
                item.hasImage = false;
            };
        });

        // sort array if the item 'hasImage'
        const sortedPlace = dataPlace.data.sort((a, b) => {
            // console.log(a.hasImage);
            return a.hasImage - b.hasImage;
        });
        sortedPlace.reverse();
        // console.log(sortedPlace);

        if (sortedPlace.length == 0) {
            while (inThisPlace.childElementCount > 1) {
                inThisPlace.removeChild(inThisPlace.lastChild);
            }
    
            const noResults = `<p class="noResults">No Results Found: Either no results available, or incorrect spelling.</p>`
    
            const containerItem = document.createElement('div');
            containerItem.innerHTML = noResults;
    
            inThisPlace.appendChild(containerItem);
        } else {
            while (inThisPlace.childElementCount > 1) {
                inThisPlace.removeChild(inThisPlace.lastChild);
            }
            
            sortedPlace.forEach(item => {
                // console.log(item);
    
                const title = item.title;
                const description = item.physicalDescription;
                
                if (item.hasImage == true && hasImagePlace < 5) {
                    hasImagePlace++;
                    // push compiled element (from createElement function) into the page
                    inThisPlace.appendChild(createPlaceElement(item.imageURL, title, description));
                    console.log(item.imageURL);
                } else if (noImgPlace < 4 && inThisPlace.childElementCount < 6) {
                    image = null;
                    item.image = false
                    noImgPlace++;
                    
                    // push compiled element (from createElement function) into the page
                    inThisPlace.appendChild(createPlaceElement(image, title, description));
                };
            });
        }

    } catch (error) {
        console.log('error: ', error);
    }
}

// Call the function so it executes
// getPlaceItem()

function createPlaceElement(image, title, description) {
    // create element in DOM
    const containerItem = document.createElement('div');
    containerItem.className = "dayRecord";

    // declare each element for item
    const divTitle = `<h3>${title}</h3>`;
    const divDes = `<p class="recordSummary">${description}</p>`;
    
    // compiles elements depending on image present
    if (image != null) {
        const divImg = `<img src="${image}" class="placeRecordImg">`;
        containerItem.innerHTML = `${divImg} <div class="dayRecordDes">${divTitle} ${divDes} </div>`;
    } else {
        containerItem.innerHTML = `<div class="dayRecordDes">${divTitle} ${divDes} </div>`;
    }

    return containerItem;
}