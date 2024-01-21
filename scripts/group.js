function loadAllGroup () {
    const groupsNames = Object.keys(localStorage);
    groupsNames.forEach((groupName, index) => {
        if (groupName === 'oldGroupName') {
            localStorage.removeItem('oldGroupName');
        }
        
        addGroup(groupName, index)
    })
}

function saveGroup() {
    const container = document.getElementById('sidebar-input-group');
    const children = [...container.children];
    const groupNames = new Set();

    children.forEach((child) => {
        const groupChildren = [...child.children]
        const input = groupChildren[0];
        const groupName = input.value;
        const deleteImg = groupChildren[1];

        deleteImg.onclick = function () {
            deleteGroup(groupName, child.id)
        }

        if (!groupName) {
            child.remove();
            return;
        }

        if (groupNames.has(groupName)) {
            child.remove();
            console.error('Данная группа уже существует');
            return;
        }

        if (!localStorage.getItem(groupName)) {
            localStorage.setItem(groupName, JSON.stringify([]));
            const accordionContainer = document.getElementById('accordion-container');
            const id = Object.keys(localStorage).length;
            addGroupContainer(accordionContainer, groupName, id)
        }
        input.disabled = true;
        groupNames.add(groupName);
    })
}

function addGroup(groupName, id) {
    const container = document.getElementById('sidebar-input-group');

    const newDiv = document.createElement('div');
    newDiv.className = 'group-input-container';
    const divId = id ?? container.children.length + 1;
    newDiv.id = `${divId}-group-input-container`;

    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.placeholder = 'Введите Название';
    newInput.disabled = !!groupName;

    if (groupName) {
        newInput.value = groupName;
    }

    const newImg = document.createElement('img');
    newImg.className = 'img-delete';
    newImg.src = 'icons/delete-icon.svg';
    newImg.alt = 'Delete icons';
    newImg.onclick = function () {
        deleteGroup(groupName, `${divId}-group-input-container`)
    }

    newDiv.appendChild(newInput);
    newDiv.appendChild(newImg);

    container.appendChild(newDiv);
}  

function deleteGroup (groupName, id) {
    localStorage.removeItem(groupName);
    document.getElementById(id)?.remove();
    document.getElementById(`${id[0]}-accordion-group`)?.remove();
}