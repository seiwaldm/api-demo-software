//Wähle den Button aus dem html-file:
let button = document.querySelector("#randomPost");

button.addEventListener("click", getRandomPost);

function getRandomPost() {
  //generiere eine Zufallszahl zwischen 1 und 100
  const postNumber = Math.ceil(Math.random() * 100);

  //shift + taste neben ß für String-Template
  fetch(`https://jsonplaceholder.typicode.com/posts/${postNumber}`)
    //lange version
    .then(function(response) {
      return response.json();
    })
    //kurze version
    .then(post => {
      console.log(post);
      //erschaffe ein neues element vom Typ <div>
      const element = document.createElement("div");
      //schreibe html-code in das div.element
      element.innerHTML = `
       <h3>${post.title}</h3>
       <p>${post.body}</p>
       `;
      //hänge das neue element unten am body an
      document.querySelector("body").appendChild(element);
    });
}