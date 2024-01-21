function loadContactsIntoAccordion() {
    const accordionContainer = document.getElementById('accordion-container');
    accordionContainer.innerHTML = '';

    const groups = Object.keys(localStorage);

    groups.forEach((groupName, index) => {
        addGroupContainer(accordionContainer, groupName, index)
    });
}

function addGroupContainer (accordionContainer, groupName, index) {
    const accordionGroup = document.createElement('div');
    accordionGroup.className = 'accordion-group';
    accordionGroup.id = `${index}-accordion-group`;

    const accordionArrow = document.createElement('img');
    accordionArrow.className = 'img-arrow-contact';
    accordionArrow.id = 'img-arrow-contact';
    accordionArrow.alt = 'Arrow';
    accordionArrow.src = 'icons/down-arrow.svg';

    const accordionButton = document.createElement('button');
    accordionButton.className = 'accordion-button';
    accordionButton.textContent = groupName;
    accordionButton.id = `${index}-accordion-button`;


    const contactPanels = document.createElement('div');
    contactPanels.className = 'accordion-panel';
    contactPanels.id = `${index}-accordion-panel`;

    accordionButton.appendChild(accordionArrow);
    accordionGroup.appendChild(accordionButton);

    accordionContainer.appendChild(accordionGroup);
    accordionGroup.appendChild(contactPanels);
    openContacts(groupName, index);

    accordionButton.onclick = function () {
        const aciteContent = document.getElementById(contactPanels.id);
        aciteContent.classList.toggle('active');
        accordionButton.classList.toggle('active');
    };
}

function openContacts(groupName, id) {
    const contactPanel = document.getElementById(`${id}-accordion-panel`);
    const contacts = JSON.parse(localStorage.getItem(groupName)) || [];

    contacts.forEach((contact) => {
        addContactToGroup(contactPanel, contact, id, groupName)
    });
}

function addContactToGroup (contactPanel, contact, id, groupName) {
    const contactDiv = document.createElement('div');
    contactDiv.className = 'contact';
    contactDiv.id = `${id}-${contact.id}-contact`;
    contactPanel.appendChild(contactDiv);


    const contactName = document.createElement('div');
    contactName.className = 'contact-name';
    contactDiv.appendChild(contactName);

    const contactNameText = document.createElement('span');
    contactNameText.className = 'contact-name-text';
    contactNameText.textContent = contact.name;
    contactName.appendChild(contactNameText);

    const contactNumber = document.createElement('span');
    contactNumber.className = 'contact-number';
    contactNumber.textContent = contact.number;
    contactName.appendChild(contactNumber);

    const accordionButtons = document.createElement('div');
    accordionButtons.className = 'accordion-buttons';
    contactDiv.appendChild(accordionButtons);

    const editButton = document.createElement('img');
    editButton.className = 'img-update-contact';
    editButton.src = 'icons/edit-icon.svg';
    editButton.alt = 'Edit icons';
    editButton.onclick = function () {
        updateContact(groupName, id, contact.id);
    };

    accordionButtons.appendChild(editButton);

    const deleteButton = document.createElement('img');
    deleteButton.className = 'img-delete-contact';
    deleteButton.src = 'icons/delete-icon.svg';
    deleteButton.alt = 'Delete icons';
    deleteButton.onclick = function () {
        deleteContact(groupName, id, contact.id);
    };

    accordionButtons.appendChild(deleteButton);
}