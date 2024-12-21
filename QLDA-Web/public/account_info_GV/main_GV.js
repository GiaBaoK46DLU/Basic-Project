const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');
const toggleIcon = sidebarToggle.querySelector('i');

sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
    toggleIcon.classList.toggle('fa-chevron-left');
    toggleIcon.classList.toggle('fa-chevron-right');
});