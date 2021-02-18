//Wähle den Button aus dem html-file:
let button = document.querySelector("#randomPost");
let buttonAsync = document.querySelector("#randomPostAsync");

button.addEventListener("click", getRandomPost);
buttonAsync.addEventListener("click", getRandomPostAsync);

function getRandomPost() {
  //generiere eine Zufallszahl zwischen 1 und 100
  const postNumber = Math.ceil(Math.random() * 100);

  //shift + taste neben ß für String-Template
  fetch(`https://jsonplaceholder.typicode.com/posts/${postNumber}`)
    //lange version
    .then(function(response) {
      return response.json();
    })
    //kurze version (arrow-function)
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
      document.querySelector(".container").appendChild(element);
    });
}

async function getRandomPostAsync() {
  //Zufallszahl:
  const postNumber = Math.ceil(Math.random() * 100);

  //hole den Post (im JSON-Format):
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postNumber}`
  );
  //wandle das JSON-Format um in ein Javascript-Objekt im Speicher:
  const post = await response.json();
  console.log(post);

  //hole den zum Post gehörenden User über die ID (JSON-Format):
  const userResponse = await fetch(
    `https://jsonplaceholder.typicode.com/users/${post.userId}`
  );
  //wandle JSON-Format um in ein Objekt:
  const user = await userResponse.json();
  console.log(user);

  //erschaffe ein neues element vom Typ <div>
  const element = document.createElement("div");
  element.classList = "post";
  //schreibe html-code in das div.element
  element.innerHTML = `
      <div class="post-content">
       <h3>${post.title}</h3>
       <p>${post.body}</p>
       </div>
      <div class="user-profile">
        <img src="https://robohash.org/${user.username}" width="150">
        <p>${user.username}</p>
      </div>
       `;
  //hänge das neue element unten am container an
  document.querySelector(".container").appendChild(element);
}
