window.onload = () => {
    loadAllGroup();
    loadAllGroupSelect();
    loadContactsIntoAccordion();

    window.addEventListener('update-contact', ({detail}) => {
        updateContactContainer(detail.contactData, detail.groupId)
    });

    window.addEventListener('add-contact', (event) => {
        const contactPanel = document.getElementById(`${event.detail.groupId}-accordion-panel`);
        addContactToGroup(contactPanel, event.detail, event.detail.id, event.detail.groupName);
    })
}

function clearField() {
    document.getElementById('fullName').value = '';
    document.getElementById('number').value = '';
    document.getElementById('groupSelect').value = '';
    const oldGropName = localStorage.getItem('oldGroupName');
    if (!!oldGropName) {
        localStorage.removeItem('oldGroupName');
    }
}

function loadAllGroupSelect () {
    const groupSelect = document.getElementById('groupSelect');
    groupSelect.innerHTML = '';

    const optionDefault = document.createElement('option');
        optionDefault.value = "";
        optionDefault.disabled = true;
        optionDefault.selected = true;
        optionDefault.hidden = true;
        optionDefault.textContent = "Выберите группу";
        
    groupSelect.appendChild(optionDefault);

    const groupsNames = Object.keys(localStorage);
    groupsNames.forEach(groupName => {
        if (groupName !== 'oldGropName') {
            const option = document.createElement('option');
            option.value = groupName;
            option.textContent = groupName;
            groupSelect.appendChild(option);
        }
    });
}