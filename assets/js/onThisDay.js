
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
        

        const nmaDate = "https://data.nma.gov.au/object?limit=8&temporal=" + dateCode + "&format=simple";


        // Get data and add records from NMA
        const responseDate = await fetch(nmaDate);
        const dataDate = await responseDate.json();

        // console.log(data);

        dataDate.data.forEach(item => {
            console.log(item);

            const title = "Item " + item.id + ": " + item.title;
            const description = item.physicalDescription;
            const image = "assets/img/whitesquare.png";
            // console.log(title);
            console.log(image);

            const containerItem = document.createElement('div');
            containerItem.className = "dayRecord";


            const divImg = `<img src="${image}" class="dayRecordImg">`
            const divTitle = `<h3>${title}</h3>`;
            const divDes = `<p class="recordSummary">${description}</p>`;

            containerItem.innerHTML = `${divImg} <div class="dayRecordDes"> ${divTitle} ${divDes} </div>`;

            onThisDay.appendChild(containerItem);
        });

        // // See more button here
    } catch (error) {
        console.log('error: ', error);
    }
}

// Call the function so it executes
getDateItem()