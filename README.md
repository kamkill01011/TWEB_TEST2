# TWEB_TEST2

### Importer une collection de films

![](C:\Users\Kamil\Documents\HEIG\TWEB\test2\TWEB_TEST2\screen.png)

## Comment démarrer et tester

Pour lancer le serveur il faut aller dans le dossier api puis faire 

```bash
yarn start
```

Dans le dossier route chaque fichier fournit des endpoints et avant chaque endpoint il y a une URL en commentaire pour indiquer comment l'utiliser.

```javascript
// http://localhost:5000/api/movies?page=2
router.get('/movies', (req, res) => {
	movieController.moviesOfPage(req, res);
});
```

Il n'y a pas de test.