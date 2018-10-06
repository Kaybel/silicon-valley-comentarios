// Initialize Cloud Firestore through Firebase
let db = firebase.firestore();

// add comment

function guardar() {
  let texto = document.getElementById('text').value;

  db.collection("comentarios").add({
    texto: texto,
  })
    .then(function (docRef) {
      document.getElementById('text').value = '';
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
}

// show comment in wall
let posteos = document.getElementById('muro');

db.collection("comentarios").onSnapshot((querySnapshot) => {
  posteos.innerHTML = '';
  querySnapshot.forEach((doc) => {
    posteos.innerHTML += `
          <p class="lead">${doc.data().texto} </p>
          <button onclick="myFunction(event, '${doc.id}')">Eliminar</button> `
  });
});

// delete
function eliminar(id) {
  db.collection("comentarios").doc(id).delete().then(function () {
    console.log("Document successfully deleted!");
  }).catch(function (error) {
    console.error("Error removing document: ", error);
  });
}

function myFunction(event, id) {
  if (confirm("estas seguro??")) {
    eliminar(id);
  } else {
    console.log('no eliminó el mensaje!');
  }
}