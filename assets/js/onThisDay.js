
const apikey = "000ASNCw2E80ybfHsPYbb6yQ2Lp1ABJB";

// const nmaDate = "https://data.nma.gov.au/object?limit=5&temporal=" + dateCode + "&format=simple";

async function getDateItem() {
    const onThisDay = document.getElementById('onThisDay');
    const todayDate = document.getElementById('dateToday');

    try {
        // get today's date split into day, month and year
        const d = new Date();
        const day = d.getDate();
        const month = d.getMonth();
        const year = d.getFullYear();

        // find the string name of the current month
        function getMonthName(month) {return d.toLocaleString([], {month: 'long'});}

        // compile date into string and place in DOM
        const dateItem = document.createElement('div');
        const dateString = `<h2>${day} ${getMonthName(month)} ${year}</h2>`;
        dateItem.innerHTML = dateString;

        todayDate.appendChild(dateItem);

        // create a 'date code' to input back into the NMA API call
        dateCode = day + " " + getMonthName(month);
        // dateCode = `${(month + 1)}-${day}`;


        const nmaDate = "https://data.nma.gov.au/object?limit=25&temporal=" + dateCode + "&format=simple";

        // get data and add records from NMA
        const responseDate = await fetch(nmaDate);
        const dataDate = await responseDate.json();

        // all values pulled from API
            // console.log(dataDate);

        // how many items which have no image are displayed
        let noImgCount = 0;
        let hasImageCount = 0;

        //check if image
        dataDate.data.forEach(item => {
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
        const sortedArray = dataDate.data.sort((a, b) => {
            // Assuming 'image' is a boolean property
            console.log(a.hasImage);
            return a.hasImage - b.hasImage;
        });
        sortedArray.reverse();
        // console.log(sortedArray);


        sortedArray.forEach(item => {
            // returns the year of the item
            const itemYear = item.temporal[0].startDate.slice(0,4);

            // builds the body of text
            const title = "Item " + item.id + ": " + item.title;
            const description = item.physicalDescription;

            if (item.hasImage == true && hasImageCount < 5) {
                hasImageCount++;
                // push compiled element (from createElement function) into the page
                onThisDay.appendChild(createElement(item.imageURL, itemYear, title, description));
            } else if (noImgCount < 4 && onThisDay.childElementCount < 6) {
                image = null;
                item.image = false
                noImgCount++;
                
                // push compiled element (from createElement function) into the page
                onThisDay.appendChild(createElement(image, itemYear, title, description));
            };
        });

        // // See more button here?
    } catch (error) {
        console.log('error: ', error);
    }
}

// Call the function so it executes
getDateItem()


function createElement(image, itemYear, title, description) {
    // create element in DOM
    const containerItem = document.createElement('div');
    containerItem.className = "dayRecord";
    
    // declare each element for item
    const divTitle = `<h3>${itemYear} - ${title}</h3>`;
    const divDes = `<p class="recordSummary">${description}</p>`;
    
    // compiles elements depending on image present
    if (image != null) {
        const divImg = `<img src="${image}" class="dayRecordImg">`;
        containerItem.innerHTML = `${divImg} <div class="dayRecordDes">${divTitle} ${divDes} </div>`;
    } else {
        containerItem.innerHTML = `<div class="dayRecordDes">${divTitle} ${divDes} </div>`;
    }

    return containerItem;
}