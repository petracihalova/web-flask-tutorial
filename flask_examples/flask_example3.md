# Flask aplikace s GET a POST metodami v jedné funkci
Ukázka Flask aplikace s routou, která má definováno použití jak GET, tak i POST metody. Jedná se jednoduchý formulář, který obsahuje jen pole pro jméno. Když uživatel otevře URL `/contract`, zavolá se metoda GET a zobrazí se formulář. Pro odeslání formuláře se použije metoda POST a vrátí se zpráva s poděkováním.

Struktura projektu
```bash
/my_flask_app
│
├── /templates
│   └── contact.html
└── app.py
```

Soubor `app.py`
```python
from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        # Získání jména z formuláře
        name = request.form['name']
        # Zobrazení děkovné zprávy po odeslání formuláře
        return f"Děkujeme za odeslání, {name}!"
    
    # Zobrazení formuláře, pokud se jedná o GET požadavek
    return render_template('contact.html')

if __name__ == '__main__':
    app.run(debug=True)
```

Soubor `contact.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kontaktní formulář</title>
</head>
<body>
    <h1>Nech nám na sebe kontakt:</h1>
    
    <form action="/contact" method="POST">
        <label for="name">Napiš své jméno:</label>
        <input type="text" id="name" name="name" required>
        <button type="submit">Odeslat</button>
    </form>
</body>
</html>
```