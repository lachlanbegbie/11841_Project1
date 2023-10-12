

async function openModal() {

}


const modalBackground = document.getElementById('modal-background');
modalBackground.addEventListener("click", closeModal);

const modal = document.getElementById('modal');

async function closeModal() {
    console.log('made it into the function')
    modal.classList.add('hidden');
    modalBackground.classList.add('hidden');
}