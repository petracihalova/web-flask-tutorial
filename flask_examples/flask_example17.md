# Flask aplikace s ukázkou použití Flash Messages
Ukázka pro přihlášení uživatele (bez databáze) s ukázkou Flash Messages v případě, kdy uživatel zadá nesprávné údaje a také pro situaci, kdy uživatel zadá správné údaje (login = admin, heslo = 123).

Instalace potřebných knihoven.
```bash
pip install Flask
```

Struktura projektu:
```bash
flask_flask_messages/
│
├── app.py
└── templates/
    ├── base.html
    └── login.html
```

Soubor `app.py`:
```python
from flask import Flask, flash, redirect, render_template, request, url_for

app = Flask(__name__)
app.secret_key = 't0p_s3cr3t_k3y'

@app.route('/')
def index():
    return render_template('login.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        # Jednoduchá kontrola uživatele
        if username == 'admin' and password == '123':
            flash('Úspěšně přihlášeno!', 'success')
            return redirect(url_for('index'))
        else:
            flash('Neplatné uživatelské jméno nebo heslo.', 'danger')
            return redirect(url_for('login'))
    return render_template('login.html')

if __name__ == '__main__':
    app.run(debug=True)
```

Soubor `templates/base.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flask Flash Messages</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container">
        {% with messages = get_flashed_messages(with_categories=True) %}
            {% if messages %}
                <div>
                    {% for category, message in messages %}
                        <div class="alert alert-{{ category }} alert-dismissible fade show" role="alert">
                            {{ message }}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    {% endfor %}
                </div>
            {% endif %}
        {% endwith %}
        {% block content %}{% endblock %}
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

Soubor `templates/login.html`:
```html
{% extends "base.html" %}

{% block content %}
<h2>Přihlášení</h2>
<form method="POST" action="{{ url_for('login') }}">
    <div class="mb-3">
        <label for="username" class="form-label">Uživatelské jméno</label>
        <input type="text" class="form-control" id="username" name="username">
    </div>
    <div class="mb-3">
        <label for="password" class="form-label">Heslo</label>
        <input type="password" class="form-control" id="password" name="password">
    </div>
    <button type="submit" class="btn btn-primary">Přihlásit se</button>
</form>
{% endblock %}
```
