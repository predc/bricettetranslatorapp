const button = document.getElementById('translateButton');

button.addEventListener('click', async () => {
    if (button.textContent === "Recommencer") {
        resetForm(); // Appel de la fonction de réinitialisation si le bouton affiche "Recommencer"
        return;
    }

    const inputText = document.getElementById('input').value;
    const targetLanguage = document.getElementById('targetLanguage').value;
    const inputLanguage = document.getElementById('inputLanguage').value;

    // Définir les langues source et cible
    let sourceLang = inputLanguage; // Langue source
    let targetLang = targetLanguage; // Langue cible

    // Fonction de traduction
    const translateText = async (text, sourceLang, targetLang) => {
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.responseData.translatedText;
        } catch (error) {
            console.error('Error during translation:', error);
        }
    };

    // Appel de la fonction de traduction
    const translatedText = await translateText(inputText, sourceLang, targetLang);

    // Mise à jour du DOM avec le texte traduit
    if (translatedText) {
        document.getElementById('translatedText').textContent = translatedText;
    }

    button.textContent = "Recommencer"; // Changer le texte du bouton après traduction
});

// Fonction de réinitialisation du formulaire
function resetForm() {
    document.getElementById('input').value = ""; // Effacer le texte d'entrée
    document.getElementById('targetLanguage').value = 'en'; // Réinitialiser la langue cible à l'anglais (en minuscules)
    document.getElementById('translatedText').textContent = ""; // Effacer le texte traduit
    button.textContent = "Traduire"; // Remettre le texte du bouton à "Traduire"
}