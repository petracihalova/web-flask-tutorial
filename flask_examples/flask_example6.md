# Flask aplikace s ukázkou použití šablon a Jinja2 výrazů
Ukázka Flask aplikace s přehledem kurzů na hlavní stránce. Po kliknutí na stránku "Moje kurzy" se vyfiltrují pouze kurzy přihlášeného uživatele (to je simulováno pomocí náhodného vybráni záznamu).

V šablonách je vytvořen základní HTML dokument `layout.html`, který je doplněn o obsah ze souborů `index.html` nebo `about.html` podle toho, co je vybráno z hlavního menu.

Pro hlavní stránku s přehledem všech kurzů a pro stránku "Moje kurzy" je použita stejná šablona `index.html`, která však zobrazuje data o všech kurzech nebo jen o kurzech daného uživatele podle hodnot proměnných, které definujeme v `app.py`.

Struktura projektu:
```bash
projekt
├── app.py
└── templates
    ├── about.html
    ├── index.html
    └── layout.html
```

Soubor `app.py`
```python
from flask import Flask, render_template
from random import choice

app = Flask(__name__)

# Dummy data (uživatelé a jejich přihlášky na kurz)
users = [
    {"id": "u1", "name": "Petra"},
    {"id": "u2", "name": "Jan"},
    {"id": "u3", "name": "Zuzana"},
]

courses = [
    {"id": "c1", "name": "Základy Pythonu", "level": "beginners"},
    {"id": "c2", "name": "Webové technologie", "level": "beginners"},
    {"id": "c3", "name": "Flask a webové aplikace", "level": "intermediate"},
    {"id": "c4", "name": "Django", "level": "advanced"},
]

registrations = [
    {"id": "r1", "user": "u1", "course": "c1"},
    {"id": "r2", "user": "u1", "course": "c3"},
    {"id": "r3", "user": "u2", "course": "c1"},
    {"id": "r4", "user": "u2", "course": "c2"},
    {"id": "r5", "user": "u2", "course": "c3"},
    {"id": "r6", "user": "u3", "course": "c1"},
]


@app.route("/")
def index():
    return render_template("index.html", all_users=True, user=None, courses=courses)


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/my_courses")
def my_courses():
    # Náhodné vybrání uživatele z databáze
    logged_in_user = choice(users)

    user_registrations = []
    for record in registrations:
        if record["user"] == logged_in_user["id"]:
            user_registrations.append(record["course"])

    user_courses = []
    for course in courses:
        if course["id"] in user_registrations:
            user_courses.append(course)

    return render_template(
        "index.html", all_users=False, user=logged_in_user, courses=user_courses
    )


if __name__ == "__main__":
    app.run(debug=True)
```

Soubor `templates/about.html`
```html
{% extends "layout.html" %}

{% block title %}O nás{% endblock %}

{% block content %}
    <h2>O nás</h2>
    <p>Tato aplikace je vytvořena pro demonstraci použití Flasku a Jinja2.</p>
{% endblock %}
```

Soubor `templates/index.html`
```html
{% extends "layout.html" %}

{% block title %}
    {% if all_users %}
        Domů
    {% else %}
        Moje kurzy
    {% endif %}
{% endblock %}

{% block content %}

    {% if all_users %}
        <h2>Vítejte!</h2>
        <p>Zde je seznam všech kurzů:</p>
    {% else %}
        <h2>Vítej {{ user.name }}!</h2>
        <p>Zde je seznam tvých kurzů:</p>
    {% endif %}

    <ul class="list-group">
        {% for course in courses %}
        <li class="list-group-item">
            <strong>{{ course.name }}</strong> -
            {% if course.level == "beginners" %}
            <span class="text-success">Pro začátečníky</span>
            {% elif course.level == "intermediate" %}
            <span class="text-secondary">Středně pokročílí</span>
            {% elif course.level == "advanced" %}
            <span class="text-primary">Experti</span>
            {% endif %}
        </li>
        {% endfor %}
    </ul>
{% endblock %}
```

Soubor `templates/layout.html`
```html
<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{% block title %}Moje stránka{% endblock %}</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body>
    <header class="bg-dark text-white py-2 text-center">
        <h1>Vítejte na mé stránce</h1>
        <nav>
            <a href="/" class="text-white">Domů</a> | 
            <a href="/my_courses" class="text-white">Moje kurzy</a> | 
            <a href="/about" class="text-white">O nás</a>
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
