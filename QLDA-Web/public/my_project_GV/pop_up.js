var btnOpen = document.querySelector('.add-btn');
var modal = document.querySelector('.modal');
var btnClose = document.querySelector('.modal_footer .close');

function toggleModal(e) {
    modal.classList.toggle('hide');
}

btnOpen.addEventListener('click', toggleModal);
btnClose.addEventListener('click', toggleModal);
modal.addEventListener('click', function(e) {
  if (e.target === e.currentTarget) {
    toggleModal();
  }
});