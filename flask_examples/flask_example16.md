# Flask aplikace s ukázkou použití knihovny FLask-Login pro autentizaci i autorizaci.
Kompletní ukázka Flask aplikace, která zahrnuje autentizaci a autorizaci uživatelů, včetně registrace, přihlašování, a jednoduchého admin panelu.

nto příklad je další ukázka přihlášení uživatele, chráněné stránky (přístupné pouze přihlášeným uživatelům) a odhlášení uživatele pomocí knihovny `Flask-Login`. Oproti předchozí ukázace je zde heslo ochráněné speciálním algoritmem a není do databáze uloženo v čitelné podobě. Při prvním spuštění aplikace bude vytvořena složka `instance` a uvnitř soubor `users.db` s databází. Pomocí nástroje DB Browser for SQLite je možné sledovat, jak jsou data v databázi vytvářena, editována a mazána.

Instalace potřebných knihoven.
```bash
pip install Flask Flask-SQLAlchemy Flask-Login
```

Struktura projektu:
```bash
flask_login/
│
├── app.py
├── models.py
└── templates/
    ├── admin.html
    ├── login.html
    ├── register.html
    └── dashboard.html
```

Soubor `app.py`:
```python
from flask import Flask, render_template, redirect, url_for, flash, request
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from models import User, db

app = Flask(__name__)
app.secret_key = 'secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(user_id):
    """Načtení uživatele podle jeho ID"""
    return User.query.get(int(user_id))

@app.route("/register", methods=["GET", "POST"])
def register():
    """Registrace nového uživatele"""
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        role = request.form.get("role", "user")
        new_user = User(username=username, role=role)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()
        flash("Registration successful!", "success")
        return redirect(url_for("login"))
    return render_template("register.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    """Přihlašovací stránka"""
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        user = User.query.filter_by(username=username).first()
        if user and user.check_password(password):
            login_user(user)
            return redirect(url_for("dashboard"))
        else:
            flash("Invalid credentials", "danger")
    return render_template("login.html")

@app.route("/dashboard")
@login_required
def dashboard():
    """Chráněná stránka přístupná pouze přihlášeným uživatelům"""
    return render_template("dashboard.html")

@app.route("/admin")
@login_required
def admin_panel():
    """Ochrana administrátorské stránky"""
    if current_user.role != 'admin':
        flash("You do not have permission to access this page.", "danger")
        return redirect(url_for("dashboard"))
    return render_template("admin.html")

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
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    role = db.Column(db.String(50), nullable=False, default='user') 

    def set_password(self, password):
        """Hash hesla pomocí Werkzeug"""
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        """Ověření hesla"""
        return check_password_hash(self.password_hash, password)
```

Soubor `templates/admin.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container col-md-4">
        <h2 class="mt-5">Admin Panel</h2>
        <p>Welcome, {{ current_user.username }}! You are in the admin panel.</p>
        <a href="{{ url_for('dashboard') }}" class="btn btn-secondary">Back to Dashboard</a>
        <a href="{{ url_for('logout') }}" class="btn btn-danger">Logout</a>
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
        <form method="POST">
            <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" name="username" required>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" name="password" required>
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
            <a href="{{ url_for('register') }}" class="btn btn-secondary">Register</a>
        </form>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
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
        <form method="POST">
            <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" name="username" required>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" name="password" required>
            </div>
            <div class="mb-3">
                <label for="role" class="form-label">Role</label>
                <select class="form-select" name="role">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Register</button>
            <a href="{{ url_for('login') }}" class="btn btn-link">Login</a>
        </form>
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
    <div class="container col-md-4">
        <h2 class="mt-5">Welcome to your dashboard, {{ current_user.username }}</h2>
        <a href="{{ url_for('logout') }}" class="btn btn-danger mt-3">Logout</a>
        {% if current_user.role == 'admin' %}
        <a href="{{ url_for('admin_panel') }}" class="btn btn-primary mt-3">Admin Panel</a>
        {% endif %}
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```
