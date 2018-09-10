let index = 0;
let allFilesList = [];

const dropbox = document.getElementById('dropbox');
const input = document.querySelector('#selectBtn');
const rmAll = document.querySelector('#rmAllBtn');
const submit = document.getElementById('uploadBtn')
let total = document.querySelector('#totalFiles');
let preview = document.querySelector('#preview');
let list = document.createElement('ol');
list.id = 'uploadFileList';

dropbox.addEventListener('click', function () {
  if (input) {
    input.click();
  }
}, false);

rmAll.addEventListener('click', removeAllFiles, false);

function updateTotal(num) {
  total.innerHTML = 'Total Files: ' + num;
}

function removeAllFiles() {
  if (allFilesList.length > 0) {
    // Empty the entire file list
    allFilesList = [];

    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
    list.outerHTML = '';

    // Display no file message
    let para = document.createElement('p');
    para.textContent = 'No files currently selected for upload';
    para.id = 'noFileMessage';
    preview.appendChild(para);

    updateTotal(allFilesList.length);
  }
}

function handleFiles(curFiles) {
  if (curFiles.length === 0) {
    let para = document.createElement('p');
    para.textContent = 'No files currently selected for upload';
    para.id = 'noFileMessage';
    preview.appendChild(para);
  } else {
    if (preview.contains(document.getElementById('noFileMessage'))) {
      preview.removeChild(document.getElementById('noFileMessage'));
    }
    if (!preview.contains(list)) {
      preview.appendChild(list);
    }

    for (let i = 0, len = curFiles.length; i < len; i++) {
      if (!checkDuplicateFiles(allFilesList, curFiles[i].name)) {
        let listItem = document.createElement('li');
        let para = document.createElement('p');
        let removeBtn = document.createElement('button');
        if (validFileType(curFiles[i])) {
          listItem.id = 'listItem' + index;
          para.textContent = curFiles[i].name + ' (' + returnFileSize(curFiles[i].size) + ')';
          removeBtn.innerHTML = 'X';
          removeBtn.type = 'button';
          removeBtn.id = 'removeBtn-' + index;
          removeBtn.className = 'removeBtn';
          index++;

          removeBtn.onclick = function () {
            const uploadItemId = (this.id).split('-')[1];
            const itemToRemove = document.getElementById('listItem' + uploadItemId);
            if (itemToRemove) {
              itemToRemove.outerHTML = '';
            }

            const numOfListItems = list.childElementCount;
            if (numOfListItems === 0) {
              if (preview.contains(list)) {
                // Destroy filelist
                while (list.firstChild) {
                  list.removeChild(list.firstChild);
                }
                list.outerHTML = '';
              }

              // Display no file message
              let para = document.createElement('p');
              para.textContent = 'No files currently selected for upload';
              para.id = 'noFileMessage';
              preview.appendChild(para);
            }

            allFilesList = removeFileFromList(allFilesList, curFiles[i].name);
            updateTotal(allFilesList.length);
          };

          listItem.appendChild(para);
          listItem.appendChild(removeBtn);

          // Only valid files will be added to allFilesList
          allFilesList.push(curFiles[i]);
          list.appendChild(listItem);
          updateTotal(allFilesList.length);
        } else {
          para.textContent = 'File name ' + curFiles[i].name + ': Not a valid file type. Update your selection.';
          listItem.appendChild(para);
          updateTotal(allFilesList.length);
        }
      }
    }
  }
}

const fileTypes = [
  'text/html'
]

function validFileType(file) {
  for (let i = 0, len = fileTypes.length; i < len; i++) {
    if (file.type === fileTypes[i]) {
      return true;
    }
  }
  return false;
}

function returnFileSize(number) {
  if (number < 1024) {
    return number + ' bytes';
  } else if (number >= 1024 && number < 1048576) {
    return (number / 1024).toFixed(1) + ' KB';
  } else if (number >= 1048576) {
    return (number / 1048576).toFixed(1) + ' MB';
  }
}

function checkDuplicateFiles(fileList, name) {
  for (let i = 0, len = fileList.length; i < len; i++) {
    if (fileList[i].name === name) {
      return true;
    }
  }
  return false;
}

function removeFileFromList(fileList, name) {
  for (let i = 0; i < fileList.length; i++) {
    if (fileList[i].name === name) {
      fileList.splice(i, 1);
    }
  }
  return fileList;
}

dropbox.addEventListener('dragenter', dragenter, false);
dropbox.addEventListener('dragover', dragover, false);
dropbox.addEventListener('drop', drop, false);

function dragenter(ev) {
  ev.stopPropagation();
  ev.preventDefault();
}

function dragover(ev) {
  ev.stopPropagation();
  ev.preventDefault();
}

function drop(ev) {
  ev.stopPropagation();
  ev.preventDefault();

  const dt = ev.dataTransfer;
  const files = dt.files;

  handleFiles(files);
}

function preventDrop(e) {
  if (e.target.id !== 'dropbox') {
    e.preventDefault();
    e.dataTransfer.effectAllowed = 'none';
    e.dataTransfer.dropEffect = 'none';
  }
}

window.addEventListener('dragenter', preventDrop, false);
window.addEventListener('dragover', preventDrop, false);
window.addEventListener('drop', preventDrop, false);

submit.addEventListener('click', (ev) => {
  ev.preventDefault();

  const sendFilesPromise = sendFiles('/uploading/templates', allFilesList);
  if (sendFilesPromise) {
    sendFilesPromise.then(res => {
      const convertFiles2JsonPromise = convertFiles2Json('/uploading/html2json', res);
      if (convertFiles2JsonPromise) {
        convertFiles2JsonPromise.then((result) => {
          document.location.href = `/successful/html2json`;
          removeAllFiles();
        });
      }
    });
  }
}, false);

// send selected files to server
function sendFiles(url = ``, data) {
  let len = data.length;

  if (len > 0) {
    let formData = new FormData();

    for (let i = 0; i < len; i++) {
      formData.append('templates', data[i]);
    }

    return fetch(url, {
      method: 'POST',
      body: formData
    })
      .then(res => res.text())
      .then(result => result)
      .catch(error => console.error('Error =>', error));
  }
}

function convertFiles2Json(url = ``, files) {
  const templates = { templates: files };

  return fetch(url, {
    method: 'POST',
    headers: {
      'content-type': "application/json"
    },
    body: JSON.stringify(templates)
  })
    .then(res => res.text())
    .then(result => result)
    .catch(error => console.error('Error =>', error));
}