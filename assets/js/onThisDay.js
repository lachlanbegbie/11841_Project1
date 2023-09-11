
const apikey = "000ASNCw2E80ybfHsPYbb6yQ2Lp1ABJB";

const nmaDate = "https://data.nma.gov.au/object?limit=5&temporal=-09&format=simple";


async function getExhibitions() {
    const onThisDay = document.getElementById('onThisDay');

    try {
        const response = await fetch(nmaDate);
        const data = await response.json();

        console.log(data);


        data.data.forEach(item => {
            console.log(item);

            const title = 'Item ' + item.id + ': "' + item.title + '"';
            const description = item.physicalDescription;
            console.log(title);

            const containerItem = document.createElement('div');
            containerItem.className = "dayRecord";

            const divTitle = '<h3>' + title + '</h3>';
            const divDes = '<p class="recordSummary">' + description + '</p>';

            containerItem.innerHTML = divTitle + divDes;

            onThisDay.appendChild(containerItem);
        });

    } catch (error) {
        console.log('error: ', error);
    }
}

// Call the function so it executes
getExhibitions()