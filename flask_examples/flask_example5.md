# Flask aplikace s ukázkou použití šablon
Ukázka Flask aplikace se základní šablonou `layout.html` a třemi dalšími šablonami s obsahem, které se postupně načítají při výběru jednotlivých položek menu.


Struktura projektu:
```bash
projekt
│
├── app.py
└── templates
    ├── about.html
    ├── contact.html 
    ├── index.html
    └── layout.html
```

Soubor `app.py`
```python
from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/contact")
def contact():
    return render_template("contact.html")

if __name__ == "__main__":
    app.run(debug=True)
```

Soubor `templates/about.html`
```html
{% extends "layout.html" %}

{% block content %}
    <h2>O nás</h2>
    <p>Tato aplikace je vytvořena pro demonstraci použití Flasku a Jinja2.</p>
{% endblock %}
```

Soubor `templates/contact.html`
```html
{% extends "layout.html" %}

{% block content %}
    <h2>Kontakty</h2>
    <p>Potkáme se na školení.</p>
{% endblock %}
```

Soubor `templates/index.html`
```html
{% extends "layout.html" %}

{% block content %}
    <h2>Vítejte!</h2>
    <p>Toto je úvodní stránka.</p>
{% endblock %}
```

Soubor `templates/layout.html`
```html
<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Moje stránka</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body>
    <header class="bg-dark text-white py-2 text-center">
        <h1>Vítejte na mé stránce</h1>
        <nav>
            <a href="/" class="text-white">Home</a> &#11088; 
            <a href="/about" class="text-white">About</a> &#11088; 
            <a href="/contact" class="text-white">Kontakt</a>
        </nav>
    </header>

    <main class="container py-4">
        {% block content %}
        <!-- Sem bude vkládán konkrétní obsah jednotlivých stránek -->
        {% endblock %}
    </main>

    <footer class="bg-dark text-white text-center py-3">
        <p>&copy; 2024 Moje stránka</p>
    </footer>
</body>
</html>
```
