const { Builder, By, Key, until } = require('selenium-webdriver');

(async function example() {
    // Lancement du navigateur
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Ouvrir Instagram
        await driver.get('https://www.instagram.com/');
        await driver.manage().window().maximize();

        await driver.sleep(2000);

        // Accepter la popup de cookies
        try {
            await driver.wait(until.elementLocated(By.xpath("//button[text()='Autoriser tout les cookies']")), 5000);
            await driver.findElement(By.xpath("//button[text()='Autoriser tout les cookies']")).click();
        } catch (error) {
            console.log("Pas de popup de cookies trouvée ou erreur lors de l'acceptation.");
        }

        // Remplir les champs de connexion
        await driver.findElement(By.name('username')).sendKeys('username');
        await driver.findElement(By.name('password')).sendKeys('mot de passe', Key.RETURN);

        // Attendre la redirection vers le flux d'accueil
        await driver.sleep(5000);
        await driver.get('https://www.instagram.com/');
        await driver.sleep(5000);

        // Ouvrir la publication spécifique
        await driver.get('LA PUBLICATION CONCERNE');


        await driver.sleep(10000);

        // Attendre que le champ de commentaire soit visible
        await driver.wait(until.elementLocated(By.css('textarea[placeholder="Ajouter un commentaire..."]')), 5000);

        // Fonction pour générer un message aléatoire
        function getRandomComment() {
            const comments = [
                "",
                "",
                "",
            ];
            const randomIndex = Math.floor(Math.random() * comments.length);
            return comments[randomIndex];
        }

        // Fonction pour commenter
        async function comment() {
            let commentText = getRandomComment();
            await driver.findElement(By.css('textarea[placeholder="Ajouter un commentaire..."]')).sendKeys(commentText, Key.RETURN);
            console.log(`Commentaire posté : ${commentText}`);
        }

        // Poster un commentaire immédiatement puis toutes les minutes
        await comment();
        let commentInterval = setInterval(comment, 60000); // 60000 ms = 1 minute

        // Exécuter pendant un certain temps puis arrêter
        setTimeout(() => {
            clearInterval(commentInterval);
            console.log("Arrêt de la session de commentaires.");
            driver.quit();
        }, 10 * 60000); // Exécuter pendant 10 minutes

    } catch (error) {
        console.error('Erreur dans le script : ', error);
        await driver.quit();
    }
})();
