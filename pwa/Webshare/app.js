// form
class WebShare extends HTMLElement {
  constructor() {
    // Sempre chame super primeiro no construtor
    super();
    // escreva a funcionalidade do elemento aqui
    this.attachShadow({mode: 'open'})

    const wrapper = document.createElement('button');
    wrapper.textContent = 'Enviar';

    const title = document.createElement('input');
    title.textContent = 'title';
    title.setAttribute('class','title');

    this.shadowRoot.append(wrapper);
  }

}

customElements.define('web-share', WebShare);
// form

// historico
class Historico extends HTMLElement {
	constructor() {
		super();
		const shadow = this.attachShadow({mode: 'open'});

    var list = localStorage.getItem('storage') ? JSON.parse(localStorage.getItem('storage')) : [];
    this.listarItens(shadow, list)
	}

  listarItens(shadow, list) {
		list.forEach(listItem => {
			let content = document.getElementById('itens').content;
			content.getElementById('title').innerHTML = listItem.title ? listItem.title : '';
			content.getElementById('url').innerHTML = listItem.url ? listItem.url : '';
      content.getElementById('files').innerHTML = listItem.files ? listItem.files : '';
			let container = document.createElement("div");
			container.appendChild(content.cloneNode(true))
			shadow.appendChild(container);
		})
	}
}

customElements.define('app-historico', Historico);
//historico



//share
const shareButton = document.querySelector('#share');
//const fileField = document.querySelector('#file');

shareButton.addEventListener('click', async () => {

// debugger
  const title = document.querySelector('#title').value;
  const text = document.querySelector('#text').value;
  const url = document.querySelector('#url').value;
  const fileField = document.querySelector('#file');
  const files = fileField ? fileField.files : [];
  
  const data = {title, text, url, files};

//debugger

  if(files.length) {
    data.files = files;
  }

  try {

    // localStorage
    let list = localStorage.getItem('storage') ? JSON.parse(localStorage.getItem('storage')) : [];
    list.push(data);
    localStorage.setItem('storage', JSON.stringify(list));
    // localStorage

    await navigator.share(data);
    
  }
  catch(e) {
    console.log('share error', e);
  }
});

// debugger
// if(fileField) {
//   fileField.addEventListener('change', e => {
//     const {files} = e.target;
//     const {name} = files[0];

//     if(name) {
//       fileName.innerText = name;
//     }
//   });
// } 
//share

// serviceWorker

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("./serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err));
  });
}

// serviceWorker