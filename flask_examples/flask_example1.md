# Flask aplikace se třemi jednoduchými routami
Ukázka Flask aplikace se třemi routami:
- routa `/` vrací jednoduchou HTML stránku
- routa `/api/data` vrací JSON dokument
- routa `/message` vrací textovou zprávu

Struktura projektu je následující:
```bash
/project
│
├── app.py
└── /templates
    └── index.html
```

Soubor `app.py`:
```python
from flask import Flask, jsonify, render_template

app = Flask(__name__)

# 1. Vrácení HTML stránky
@app.route('/')
def home():
    '''
    Funkce home() vrací HTML šablonu pomocí render_template().
    Pro tento účel je nutné mít v projektu složku "templates"
    s HTML souborem "index.html".
    '''
    return render_template('index.html')

# 2. Vrácení JSON dat
@app.route('/api/data')
def get_data():
    '''
    Funkce get_data() vrací JSON data pomocí funkce jsonify().
    Funkce vytvoří správně naformátovaný JSON dokument.
    '''
    data = {
        'name': 'Flask',
        'version': '1.1.2',
        'features': ['lightweight', 'easy to use', 'flexible']
    }
    return jsonify(data)

# 3. Vrácení textové zprávy
@app.route('/message')
def message():
    '''
    Funkce message() vrací jednoduchou textovou zprávu.
    '''
    return "Toto je jednoduchá textová zpráva."

if __name__ == '__main__':
    app.run(debug=True)
```

Soubor `index.html` uvnitř složky `templates`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
</head>
<body>
    <h1>Vítejte na domovské stránce Flask aplikace!</h1>
</body>
</html>
```

Flask aplikace se ve výchozím nastavení spustí na portu 5000. Pokud v prohlížeči navštívíte `http://localhost:5000/`, zobrazí se HTML stránka. Po otevření `http://localhost:5000/api/data` dostanete JSON odpověď, a pokud navštívíte `http://localhost:5000/message`, zobrazí se textová zpráva.
