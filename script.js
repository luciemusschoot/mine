const auth = firebase.auth();

document.getElementById("loginBtn").addEventListener("click", () => {
  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "accueil.html";
    })
    .catch((error) => {
      alert("Erreur : " + error.message);
    });
});

// Redirection automatique si déjà connecté
auth.onAuthStateChanged((user) => {
  if (user && window.location.pathname.includes("index.html")) {
    window.location.href = "accueil.html";
  }
});