document.getElementById("loginBtn").addEventListener("click", () => {
  const prenom = document.getElementById("prenom").value.trim();
  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!prenom) {
    alert("Merci de saisir votre prénom !");
    return;
  }

  // Créer l'utilisateur (inscription)
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Enregistrer le prénom dans Firebase Auth (optionnel)
      return user.updateProfile({ displayName: prenom });
    })
    .then(() => {
      // Stocker le prénom dans sessionStorage pour l’utiliser sur accueil
      sessionStorage.setItem("prenom", prenom);
      window.location.href = "accueil.html";
    })
    .catch((error) => {
      alert("Erreur : " + error.message);
    });
});