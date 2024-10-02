# Flask aplikace s formulářem a Flask-WTF validací
Jednoduchá Flask aplikace s formulářem pro získání jména a přijmení a s validací pomocí Flask-WTF knihovny.

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
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

app = Flask(__name__)
app.secret_key = 'your_secret_key'

# Simulovaná databáze uživatelů
users = []

class UserForm(FlaskForm):
    name = StringField("Jméno", validators=[DataRequired()])
    surname = StringField("Příjmení", validators=[DataRequired()])

@app.route("/", methods=["GET", "POST"])
def index():
    form = UserForm()
    if form.validate_on_submit():
        # Uložení uživatele, pokud je validace úspěšná
        users.append({"name": form.name.data, "surname": form.surname.data})
        return redirect(url_for("index"))
    return render_template("index.html", users=users, form=form)


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
        <form method="POST">
            {{ form.hidden_tag() }}
            <div class="form-group">
                {{ form.name.label }}
                {{ form.name(class="form-control") }}
            </div>
            <div class="form-group">
                {{ form.surname.label }}
                {{ form.surname(class="form-control") }}
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
