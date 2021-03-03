const inputField = document.querySelector('.new-tag-name');
const addNewTagButton = document.querySelector('.add-tag-button');
const readOnlyModeCheckbox = document.querySelector('#readonly-checkbox');

let currentTagNamesList = [];

if (!localStorage.currentTagNamesList) {
    localStorage.currentTagNamesList = [];
} else {
    currentTagNamesList = JSON.parse(localStorage.currentTagNamesList);
}

function addNewTag() {
    if (inputField.value === '' || readOnlyModeCheckbox.checked) {
        return;
    }

    const tagsContainer = document.querySelector('.tags-container');
    const tagBlock = document.createElement('div');
    tagBlock.className = 'tag';
    const tagName = document.createElement('div');
    tagName.className = 'tag-name';
    const tagDeleteIcon = document.createElement('div');
    tagDeleteIcon.className = 'delete-icon';
    tagDeleteIcon.innerHTML = '&#10060;';

    tagDeleteIcon.addEventListener('click', () => {
        if (readOnlyModeCheckbox.checked) {
            return;
        }

        for (let i = 0; i < currentTagNamesList.length; i += 1) {
            if (tagName.textContent === currentTagNamesList[i]) {
                currentTagNamesList.splice(i, 1);
                localStorage.currentTagNamesList = JSON.stringify(currentTagNamesList);
            }
        }
        tagBlock.remove();
    })

    tagName.textContent = inputField.value;
    
    tagBlock.append(tagName);
    tagBlock.append(tagDeleteIcon);

    if (tagsContainer.firstElementChild.className === 'new-tag-name') {
        tagsContainer.prepend(tagBlock);
    } else {
        inputField.before(tagBlock);
    }
}

function setCurrentTag() {
    if (inputField.value === '' || readOnlyModeCheckbox.checked) {
        return;
    }

    currentTagNamesList.push(inputField.value);
    localStorage.currentTagNamesList = JSON.stringify(currentTagNamesList);
    inputField.value = '';
}

function loadCurrentTags() {
    for (let i = 0; i < currentTagNamesList.length; i += 1) {
        inputField.value = currentTagNamesList[i];
        addNewTag();
    }

    inputField.value = '';
}

loadCurrentTags();

addNewTagButton.addEventListener('click', addNewTag);
addNewTagButton.addEventListener('click', setCurrentTag);
