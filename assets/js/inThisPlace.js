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
        
        const nmaPlace = "https://data.nma.gov.au/object?limit=3&spatial=" + placeInputValue + "&format=simple&apikey=" + apikey;


        // Get data and add records from NMA
        const responsePlace = await fetch(nmaPlace);
        const dataPlace = await responsePlace.json();

        console.log(dataPlace);

        if (dataPlace.meta.results == 0) {
            // if (inThisPlace.childNodes.length == 3) {
            //     inThisPlace.removeChild(inThisPlace.lastChild);
            // } else if (inThisPlace.childNodes.length > 3) {
            //     for (let i = 0 ; i < inThisPlace.childNodes.length - 2; i++) {
            //         inThisPlace.removeChild(inThisPlace.lastChild);
            //     }
            // }

            while (inThisPlace.childElementCount > 1) {
                inThisPlace.removeChild(inThisPlace.lastChild);
            }

            const noResults = `<p class="noResults">No Results Found: Either no results available, or incorrect spelling.</p>`

            const containerItem = document.createElement('div');
            containerItem.innerHTML = noResults;

            inThisPlace.appendChild(containerItem);
        } else {
            // if (inThisPlace.childNodes.length == 3) {
            //     inThisPlace.removeChild(inThisPlace.lastChild);
            // } else if (inThisPlace.childNodes.length > 3) {
            //     for (let i = 0 ; i < inThisPlace.childNodes.length - 3; i++) {
            //         inThisPlace.removeChild(inThisPlace.lastChild);
            //     }
            // }

            while (inThisPlace.childElementCount > 1) {
                inThisPlace.removeChild(inThisPlace.lastChild);
            }
            
            dataPlace.data.forEach(item => {
                // console.log(item);
    
                const title = item.title;
                const description = item.physicalDescription;
                const image = "assets/img/whitesquare.png";
                // console.log(title);
                console.log(image);
    
                const containerItem = document.createElement('div');
                containerItem.className = "dayRecord";
    
    
                const divImg = `<img src="${image}" class="placeRecordImg">`
                const divTitle = `<h3>${title}</h3>`;
                const divDes = `<p class="placeRecordSummary">${description}</p>`;
    
                containerItem.innerHTML = `${divImg} <div class="dayRecordDes"> ${divTitle} ${divDes} </div>`;
    
                inThisPlace.appendChild(containerItem);
            });
        }

    } catch (error) {
        console.log('error: ', error);
    }
}

// Call the function so it executes
// getPlaceItem()