
const apikey = "000ASNCw2E80ybfHsPYbb6yQ2Lp1ABJB";

// const nmaDate = "https://data.nma.gov.au/object?limit=5&temporal=" + dateCode + "&format=simple";

async function getDateItem() {
    const onThisDay = document.getElementById('onThisDay');
    const todayDate = document.getElementById('dateToday');

    try {
        // Get today's date split into day, month and year
        const d = new Date();
        const day = d.getDate();
        const month = d.getMonth();
        const year = d.getFullYear();

        // Find the string name of the current month
        function getMonthName(month) {return d.toLocaleString([], { month: 'long' });}
        // console.log(getMonthName(month));

        // Compile date into string and place in DOM
        const dateItem = document.createElement('div');
        const dateString = `<h2>${day} ${getMonthName(month)} ${year}</h2>`;
        dateItem.innerHTML = dateString;
        // console.log(dateString);
        todayDate.appendChild(dateItem);

        // Create a 'date code' to input back into the NMA API call
        dateCode = day + " " + getMonthName(month);
        // dateCode = `${(month + 1)}-${day}`;
        // console.log(dateCode);


        const nmaDate = "https://data.nma.gov.au/object?limit=100&temporal=" + dateCode + "&format=simple";

        // Get data and add records from NMA
        const responseDate = await fetch(nmaDate);
        const dataDate = await responseDate.json();

        console.log(dataDate);

        dataDate.data.forEach(item => {

            // only returns if "hasVersion" (image) data is in the API
            if (item.hasVersion != null) {
                console.log(item);

                // returns the year of the item
                const itemYear = item.temporal[0].startDate.slice(0,4);

                // builds the body of text
                const title = "Item " + item.id + ": " + item.title;
                const description = item.physicalDescription;
                
                // image of item
                const img = item.hasVersion[0].hasVersion;
                // const image = item.hasVersion[0].hasVersion[0].identifier;
                
                for (i=0; i < img.length; i++) {
                    if (img[i].version === 'large image') {
                        // console.log(img[i].identifier);
                        image = img[i].identifier;
                    }
                }							

                const containerItem = document.createElement('div');
                containerItem.className = "dayRecord";


                const divImg = `<img src="${image}" class="dayRecordImg">`
                const divTitle = `<h3>${itemYear} - ${title}</h3>`;
                const divDes = `<p class="recordSummary">${description}</p>`;

                containerItem.innerHTML = `${divImg} <div class="dayRecordDes">${divTitle} ${divDes} </div>`;

                onThisDay.appendChild(containerItem);
            }

            
        });

        // // See more button here?
    } catch (error) {
        console.log('error: ', error);
    }
}

// Call the function so it executes
getDateItem()