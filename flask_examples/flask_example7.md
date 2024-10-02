# Flask aplikace s formulářem a jednoduchou validací
Jednoduchá Flask aplikace s formulářem pro získání jména a přijmení a s jednoduchou validací.

Struktura projektu:
```bash
projekt
├── app.py
└── templates
    ├── index.html
    └── layout.html
```

Soubor `app.py`:
```python
from flask import Flask, request, redirect, url_for, render_template

app = Flask(__name__)

# Simulovaná databáze uživatelů
users = []

@app.route("/")
def index():
    return render_template("index.html", users=users)

# Route pro zpracování formuláře
@app.route("/add_user", methods=["POST"])
def add_user():
    # Získání dat z formuláře
    name = request.form.get("name")
    surname = request.form.get("surname")

    # Jednoduchá validace (jméno a příjmení nesmí obshovat čísla)
    if any(char.isdigit() for char in name):
        return "Chyba: Jméno nesmí obsahovat číslice", 400
    if any(char.isdigit() for char in surname):
        return "Chyba: Příjmení nesmí obsahovat číslice", 400
    
    # Uložení uživatele, pokud je validace úspěšná
    users.append({"name": name, "surname": surname})
    return redirect(url_for("index"))

if __name__ == "__main__":
    app.run(debug=True)
```

Soubor `templates/index.html`:
```html
{% extends "layout.html" %}

{% block content %}
    <div class="container">
        <h2>Formulář:</h2>
        <p>Prosím zadejte své jméno a příjmeí.</p>
        <form action="/add_user" method="POST">
            <div class="form-group">
                <label for="name">Jméno:</label>
                <input type="text" name="name" id="name" class="form-control" required>
            </div>
                <div class="form-group">
                <label for="surname">Příjmení:</label>
                <input type="text" name="surname" id="surname" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-primary">Přidat uživatele</button>
        </form>
    </div>
    <div class="container my-4">
        <h2>Seznam vytvořených uživatelů:</h2>
        {% for user in users %}
            <p>{{ user.name }} {{ user.surname}}</p>
        {% endfor %}
    </div>
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
        <h1>Ukázka formuláře</h1>
    </header>

    <main class="container py-4">
        {% block content %}
        <!-- Sem se vloží obsah z index.html -->
        {% endblock %}
    </main>

    <footer class="bg-dark text-white text-center py-3">
        <p>&copy; 2024 Moje stránka</p>
    </footer>
</body>
</html>
```