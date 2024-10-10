# Flask aplikace s ukázkou použití knihovny FLask-Login
Tento příklad je další ukázka přihlášení uživatele, chráněné stránky (přístupné pouze přihlášeným uživatelům) a odhlášení uživatele pomocí knihovny `Flask-Login`. Oproti předchozí ukázace je zde heslo ochráněné speciálním algoritmem a není do databáze uloženo v čitelné podobě. Při prvním spuštění aplikace bude vytvořena složka `instance` a uvnitř soubor `users.db` s databází. Pomocí nástroje DB Browser for SQLite je možné sledovat, jak jsou data v databázi vytvářena, editována a mazána.

Instalace potřebných knihoven.
```bash
pip install Flask Flask-SQLAlchemy Flask-Login pyfiglet
```

Struktura projektu:
```bash
flask_login/
│
├── app.py
├── models.py
└── templates/
    ├── login.html
    ├── register.html
    └── dashboard.html
```

Soubor `app.py`:
```python
from flask import Flask, render_template, redirect, url_for, flash, request
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from models import User, db
import pyfiglet

app = Flask(__name__)
app.secret_key = 'secret_key'  # Nutné pro používání session
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# Flask-Login konfigurace
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'  # Odkaz na přihlašovací stránku

@login_manager.user_loader
def load_user(user_id):
    """Načtení uživatele podle jeho ID"""
    return User.query.get(int(user_id))

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]

        if User.query.filter_by(username=username).first():
            flash("Username already exists.")
            return redirect(url_for("register"))

        new_user = User(username=username)
        new_user.set_password(password)  # Hash hesla
        db.session.add(new_user)
        db.session.commit()

        flash("Registration successful. Please log in.")
        return redirect(url_for("login"))

    return render_template("register.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        user = User.query.filter_by(username=username).first()

        if user and user.check_password(password):
            login_user(user)
            return redirect(url_for("dashboard"))
        else:
            flash("Invalid credentials.")
    
    return render_template("login.html")


@app.route("/dashboard")
@login_required  # Ochrana stránky, kterou uvidí jen přihlášení uživatelé
def dashboard():
    """Chráněná stránka přístupná pouze přihlášeným uživatelům"""
    ascii_art = pyfiglet.figlet_format(" ".join(current_user.username.upper()), font="colossal")  # Vytvoříme ASCII art pro jméno uživatele
    return render_template("dashboard.html", ascii_art=ascii_art, current_user=current_user)


@app.route("/logout")
@login_required
def logout():
    """Odhlášení uživatele"""
    logout_user()
    return redirect(url_for("login"))

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
```

Soubor `models.py`:
```python
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

db = SQLAlchemy()

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def set_password(self, password):
        """Hash hesla pomocí Werkzeug"""
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        """Ověření hesla"""
        return check_password_hash(self.password_hash, password)
```

Soubor `templates/register.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container col-md-4">
        {% with messages = get_flashed_messages(with_categories=True) %}
            {% if messages %}
                <div class="mt-3">
                    {% for category, message in messages %}
                        <div class="alert alert-primary" role="alert">
                            {{ message }}
                        </div>
                    {% endfor %}
                </div>
            {% endif %}
        {% endwith %}
    </div>
    <div class="container col-md-4">
        <h2 class="mt-5">Register</h2>
        <form method="POST" class="mt-3">
            <div class="mb-3">
                <label for="username" class="form-label">Username:</label>
                <input type="text" class="form-control" id="username" name="username" required>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password:</label>
                <input type="password" class="form-control" id="password" name="password" required>
            </div>
            <button type="submit" class="btn btn-primary">Register</button>
        </form>
        <p class="mt-3">Already have an account? <a href="/login">Login here</a></p>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

Soubor `templates/login.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container col-md-4">
        {% with messages = get_flashed_messages(with_categories=True) %}
            {% if messages %}
                <div class="mt-3">
                    {% for category, message in messages %}
                        <div class="alert alert-primary" role="alert">
                            {{ message }}
                        </div>
                    {% endfor %}
                </div>
            {% endif %}
        {% endwith %}
    </div>
    <div class="container col-md-4">
        <h2 class="mt-5">Login</h2>
        <form method="POST" class="mt-3">
            <div class="mb-3">
                <label for="username" class="form-label">Username:</label>
                <input type="text" class="form-control" id="username" name="username" required>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password:</label>
                <input type="password" class="form-control" id="password" name="password" required>
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
        </form>
        <p class="mt-3">Don't have an account? <a href="/register">Register here</a></p>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

Soubor `templates/dashboard.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container">
        <h2 class="mt-5">Welcome to your dashboard, {{ current_user.username.upper() }}</h2>
        <pre class="mt-5">{{ ascii_art }}</pre>
        <a href="{{ url_for('logout') }}" class="btn btn-danger mt-3">Logout</a>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```