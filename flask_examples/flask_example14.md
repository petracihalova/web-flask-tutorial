# Flask aplikace s ukázkou použití knihovny FLask-Login
Tento příklad ukazuje jednoduchou ukázku přihlášení uživatele, chráněné stránky (přístupné pouze přihlášeným uživatelům) a odhlášení uživatele pomocí knihovny `Flask-Login`. Při prvním spuštění aplikace bude vytvořena složka `instance` a uvnitř soubor `users.db` s databází. Pomocí nástroje DB Browser for SQLite je nutné do databáze vložit jednoho uživatele.

Kromě frameworku `Flask` příklad používá také knihovny `Flask-SQLAlchemy` a `Flask-Login`, které je nutné nainstalovat do virtuálního prostředí.
```bash
pip install Flask Flask-SQLAlchemy Flask-Login
```

Struktura projektu:
```bash
flask_login/
│
├── app.py
└── templates/
    ├── login.html
    └── dashboard.html
```

Soubor `app.py`:
```python
from flask import Flask, render_template, redirect, url_for, flash, request
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Length, ValidationError

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecretkey'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'  # Když se uživatel pokusí přistoupit na chráněnou stránku bez přihlášení, přesměruje ho na přihlašovací stránku


# Model uživatele
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)


# Formulář pro přihlášení
class LoginForm(FlaskForm):
    username = StringField('Username', validators=[InputRequired(), Length(min=4, max=150)])
    password = PasswordField('Password', validators=[InputRequired(), Length(min=4, max=150)])
    submit = SubmitField('Login')


# Načítání uživatele podle ID
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


# Přihlašovací stránka
@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user and user.password == form.password.data:  # Zde by mělo být správně hashované heslo!
            login_user(user)
            flash('Login successful', 'success')
            return redirect(url_for('dashboard'))
        else:
            flash('Login failed. Check your username and password', 'danger')

    return render_template('login.html', form=form)


# Dashboard (přístupný jen po přihlášení)
@app.route('/dashboard')
@login_required
def dashboard():
    return render_template('dashboard.html', current_user=current_user)


# Odhlášení
@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('You have been logged out.', 'info')
    return redirect(url_for('login'))


# Hlavní stránka
@app.route('/')
def home():
    return 'Home Page. <a href="/login">Login</a> to access dashboard.'


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
```

Soubor `templates/dashboard.html`:
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>
    <div class="container">
        <h2>{{ current_user.username }}'s Dashboard</h2>
        <p>Welcome to your dashboard!</p>
        <a href="{{ url_for('logout') }}" class="btn btn-secondary">Logout</a>
    </div>
    <div class="container mt-3">
        <iframe src="https://giphy.com/embed/JIX9t2j0ZTN9S" width="300" height="300" frameBorder="0"
            class="giphy-embed" allowFullScreen></iframe>
        <p><a href="https://giphy.com/gifs/JIX9t2j0ZTN9S">via GIPHY</a></p>
    </div>

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
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

</head>

<body>
    <div class="container">
        <div class="mt-3 col-md-4">
            {% with messages = get_flashed_messages() %}
                {% if messages %}
                    <div class="alert alert-warning" role="alert">
                        {% for message in messages %}
                            {{ message }}
                        {% endfor %}
                    </div>
                {% endif %}
            {% endwith %}
        </div>

        <h2>Login</h2>
        <form method="POST">
            {{ form.hidden_tag() }}
            <div class="form-group mb-3 col-md-4">
                <p>{{ form.username.label }}<br>{{ form.username(class="form-control") }}</p>
            </div>
            <div class="form-group mb-3 col-md-4">
                <p>{{ form.password.label }}<br>{{ form.password(class="form-control") }}</p>
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
        </form>
    </div>

</body>

</html>
```