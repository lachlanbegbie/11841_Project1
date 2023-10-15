var modalInfo = [];

// close modal initialisation
const modal = document.getElementById('modal');
const modalBackground = document.getElementById('modal-background');
// listen for click outside modal
modalBackground.addEventListener("click", closeModal);


async function fillModal(modalIndex) {
    const modalFill = document.getElementById('modal-content');

    try {
        for (i=0; i < modalInfo.length; i++) {
            if (modalInfo[i][0] == modalIndex) {
                clickedItem = i;
                console.log(modalInfo[clickedItem][1]);
            }
        }

        const containerItem = document.createElement('div');

        const modalName = `${modalInfo[clickedItem][1].title}`;
        const modalTitle = `<h3 class="modalh">Item ${modalIndex} -- "${modalName}"</h3>`;
        
        let modalDate = '';
        
        const modalDesTitle = `<h4 class="modalsh">Description</h4>`;
        let modalDes = `<p class="modalp">${modalInfo[clickedItem][1].description}</p>`;

        let modalImg = '';
        let modalSigTitle = '';
        let modalSig = '';
        
        if (modalInfo[clickedItem][1].temporal != null) {
            modalDate = `<h4 class="modalsh">${modalInfo[clickedItem][1].temporal[0].title}</h4>`;
        }

        if (modalInfo[clickedItem][1].description == undefined) {
            modalDes = `<p class="modalp">${modalInfo[clickedItem][1].physicalDescription}</p>`;
        } else if (modalInfo[clickedItem][1].physicalDescription == undefined) {
            modalDes = `<p class="modalp">${modalInfo[clickedItem][1].title}</p>`;
        }

        if (modalInfo[clickedItem][1].hasVersion != null) {
            modalImg = `<div class="imgdiv"><img src="${modalInfo[clickedItem][1].imageURL}"></div>`;
        }
        
        if (modalInfo[clickedItem][1].significanceStatement != null) {
            modalSigTitle = `<h4 class="modalsh">Significance</h4>`;
            modalSig = `<p class="modalp">${modalInfo[clickedItem][1].significanceStatement}</p>`;
        }

        containerItem.innerHTML = `${modalTitle} ${modalDate} ${modalImg} ${modalDesTitle} ${modalDes} ${modalSigTitle} ${modalSig}`;
        
        if (modalFill.childElementCount != 0) {
            modalFill.removeChild(modalFill.lastChild);
        }
        modalFill.appendChild(containerItem);
    } catch (error) {
        console.log('error: ', error);
    }
}


async function openModal(modalIndex) {
    fillModal(modalIndex);
    
    modal.classList.remove('hidden');
    modalBackground.classList.remove('hidden');

    modal.classList.add('movein');
    modalBackground.classList.add('fadein');

    await delay(500);

    modal.classList.remove('movein');
    modalBackground.classList.remove('fadein');
}


async function closeModal() {
    modal.classList.add('moveoff');
    modalBackground.classList.add('fadeout');

    await delay(500);

    modal.classList.add('hidden');
    modalBackground.classList.add('hidden');

    modal.classList.remove('moveoff');
    modalBackground.classList.remove('fadeout');
}


function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}