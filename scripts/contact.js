function saveContact() {
    const name = document.getElementById('fullName').value.trim()
        || 'Фамилия Имя Отчество';
    const number = document.getElementById('number').value.trim()
        || '+7 (XXX) XXX - XX - XX';
    const groupName = document.getElementById('groupSelect').value;

    const existingDataJSON = localStorage.getItem(groupName);
    
    if (!existingDataJSON) {
        console.error('Данная группа не существует');
        return;
    }
   
    const existingData = JSON.parse(existingDataJSON);
    let contactData = {
        id: (existingData?.at(-1)?.id ?? 0) + 1,
        name,
        number
    };

    const oldGroup = localStorage.getItem('oldGroupName');
    const groupId = Object.keys(localStorage).indexOf(groupName);

    if (!oldGroup) {
        addContactToContainer(contactData, groupName, existingData, groupId)
        clearField();
        return;
    }

    const oldGroupData = JSON.parse(oldGroup);

    if (oldGroupData.groupId !== groupId) {
        addContactToContainer(contactData, groupName, existingData, groupId);
        deleteContact(oldGroupData.name, oldGroupData.groupId, oldGroupData.contact.id);
        localStorage.removeItem('oldGroupName');
        clearField();
        return;
    }

    contactData = {
        ...contactData,
        id: oldGroupData.contact.id,
    }


    localStorage.removeItem('oldGroupName');
    const event = new CustomEvent('update-contact', {detail: {contactData, groupId}});
    window.dispatchEvent(event);
    clearField();
}

function addContactToContainer(contactData, groupName, existingData, groupId) {
    existingData.push(contactData);
    localStorage.setItem(groupName, JSON.stringify(existingData));

    const event = new CustomEvent('add-contact', {detail: {...contactData, groupId, groupName}});
    window.dispatchEvent(event);
}


function updateContact (groupName, groupId, id) {
    const group = JSON.parse(localStorage.getItem(groupName));
    const contact = group.find((con) => con.id === id);

    openSidebar('contact-update');

    document.getElementById('fullName').value = contact.name;
    document.getElementById('number').value = contact.number;
    document.getElementById('groupSelect').value = groupName;

    const oldGroupName = {
        name: groupName,
        groupId: groupId,
        contact,
    };

    localStorage.setItem('oldGroupName', JSON.stringify(oldGroupName));   
}

function updateContactContainer(contactData, groupId) {
    const contact = document.getElementById(`${groupId}-${contactData.id}-contact`);
    const [container, ...children] = [...contact.children];
    const [name, number] = [...container.children];
    name.textContent = contactData.name;
    number.textContent = contactData.number;
}

function deleteContact (groupName, groupId, id) {
    const contact = document.getElementById(`${groupId}-${id}-contact`);
    contact.remove();

    const group = JSON.parse(localStorage.getItem(groupName));
    localStorage.setItem(groupName, JSON.stringify(group.filter((group) => group.id !== id)));
}