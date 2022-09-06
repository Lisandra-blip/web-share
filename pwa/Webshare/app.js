
localStorage.setItem("urlTemplate", title);
document.getElementById("result").innerText = localStorage.getItem("urlTemplate");


  const shareButton = document.querySelector('#share-button');
  const fileField = document.querySelector('#file');


shareButton.addEventListener('click', async () => {

  const title = document.querySelector('#title').value;
  const text = document.querySelector('#text').value;
  const url = document.querySelector('#url').value;
  const fileName = document.querySelector('#file-name');

localStorage.setItem("urlTemplate", title);
document.getElementById("result").innerText = localStorage.getItem("urlTemplate");

  const files = fileField ? fileField.files : [];

  const data = {title, text, url};

  if(files.length) {
    data.files = files;
  }

  try {
    await navigator.share(data);
  }
  catch(e) {
    console.log('share error', e);
  }
});

if(fileField) {
  fileField.addEventListener('change', e => {
    const {files} = e.target;
    const {name} = files[0];

    if(name) {
      fileName.innerText = name;
    }
  });
} 


if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
}
    