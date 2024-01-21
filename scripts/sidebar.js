function openSidebar (type) {
    const sidebar = document.getElementById('sidebar');
    const sidebarBlur = document.getElementById('sidebar-blur');

    sidebar.classList.add('active');
    sidebarBlur.classList.add('active');

    switch (type) {
        case 'group':
            activeSidebarContent('group-container', 'contact-container');
            break;
        case 'contact':
            activeSidebarContent('contact-container', 'group-container');
            loadAllGroupSelect();
            break;
        case 'contact-update':
            activeSidebarContent('contact-container', 'group-container');
            break;
        default:
            console.error('Нету такого типа');
    }
}

function activeSidebarContent(activeContainerId, hideContainerId) {
    const aciteContent = document.getElementById(activeContainerId);
    const hideContent = document.getElementById(hideContainerId)
    aciteContent.classList.add('active');
    hideContent.classList.add('hide');
}

function hideSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebarBlur = document.getElementById('sidebar-blur');
    saveGroup();

    sidebar.classList.remove('active');
    sidebarBlur.classList.remove('active');

    [...sidebar.children].forEach((child) => {
        child.classList.remove('active');
        child.classList.remove('hide');
    })

    clearField();
}