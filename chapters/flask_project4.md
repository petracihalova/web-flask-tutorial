# Projekt: My TODO list část 4
- Přidání autentizace uživatelů: Login page, Register page.
- Finalizace projektu "My TODO list": Dokončení aplikace, kontrola všech funkcionalit a opravení chyb.
- Nasazení aplikace na PythonAnywhere.com.

## Spuštění aplikace
Otevřete si složku s projektem a ve virtuálním prostředí si pusťte aplikaci My TODO list. V prohlížeči zkontrolujte, že aplikace funguje. V tuto chvíli máme připravenou základní strukturu aplikace a nastaveny Bootstrap styly. Také jsme přidali formulář pro přidávání nových úkolů pomocí knihovny `Flask-WTF`, nastavili jsme validace pro jednotlivá pole a dynamicky generujeme seznam existujících úkolů (jako seznam a jako `DataTable`). Přidali jsme také chybějící CRUD operace a ukládáme data do SQLite databáze.

V této části si ukážeme, jak implementovat jednoduchou autentizaci uživatelů a nasadíme aplikaci na PythonAnywhere.com.


## Autentizace uživatelů
Nyní si do projektu přidáme autentizaci uživatelů. To bude vyžadovat změny ve více souborech. Začneme přidáním nových formulářů pro přihlášení uživatele a pro registraci nového uživatele.
```python
class LoginForm(FlaskForm):
    username = StringField("Uživatelské jméno", validators=[DataRequired()])
    password = PasswordField("Heslo", validators=[DataRequired()])

class RegistrationForm(LoginForm):
    confirm_password = PasswordField('Potvrďte heslo', validators=[DataRequired(), EqualTo('password')])
```

Dále bude potřeba upravit si databázové modely. Přidáme nový model pro uživatele `User`, nastavíme propojení s modelem `Task`.
```python
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(150), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    details = db.Column(db.String(500), nullable=True)
    priority = db.Column(db.String(10), nullable=True)
    completed = db.Column(db.Boolean, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))

    user = db.relationship('User', backref='tasks')

    def __repr__(self):
        return f"<Task {self.title}>"
```

Do hlavního souboru `app.py` přidáme nastavení pro login funkcionalitu:
```python
from flask_login import LoginManager, login_user, logout_user, login_required, current_user

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'
```

Také nezapomeňte upravit importy a přidat nové formuláře a nový databázový model:
```python
from form import TaskForm, LoginForm, RegistrationForm
from models import Task, User, db
```

Ve funkci `index()` upravíme ukládání nového úkolu tak, aby se nově přidávala informace i o identifikátoru uživatele. Také je nutné upravit filtrování seznamu úkolů tak, aby se zobrazily pouze úkoly, které vytvořil přihlášený uživatel.
```python
@app.route("/", methods=["GET", "POST"])
@login_required
def index():
    form = TaskForm()
    if form.validate_on_submit():
        new_task = Task(
            title=form.title.data,
            details=form.details.data,
            priority=form.priority.data,
            user_id=current_user.id,
        )
        db.session.add(new_task)
        db.session.commit()
        return redirect(url_for("index"))

    tasks = Task.query.filter_by(user_id=current_user.id, completed=False).all()
    return render_template("index.html", seznam_ukolu=tasks, formular=form)
```

Také ve funkci `show_table()` upravíme dotaz do databáze.
```python
@app.route("/table")
@login_required
def show_table():
    tasks = Task.query.filter_by(user_id=current_user.id).all()
    return render_template("table.html", seznam_ukolu=tasks)
```

Ve funkci pro mazání je nutné zkontrolovat, že uživatel maže svůj záznam.
```python
@app.route("/delete/<int:task_id>")
@login_required
def delete_task(task_id):
    task_to_delete = Task.query.get(task_id)
    if task_to_delete and task_to_delete.user_id == current_user.id:
        db.session.delete(task_to_delete)
        db.session.commit()
    return redirect(url_for("index"))
```

Další funkce, kterou musíme upravit je `edit_task()`.
```python
@app.route("/edit/<int:task_id>", methods=["GET", "POST"])
@login_required
def edit_task(task_id):
    task_to_edit = Task.query.get(task_id)
    if task_to_edit and task_to_edit.user_id == current_user.id:
        form = TaskForm(obj=task_to_edit)
        if form.validate_on_submit():
            task_to_edit.title = form.title.data
            task_to_edit.details = form.details.data
            task_to_edit.priority = form.priority.data
            db.session.commit()
            return redirect(url_for("index"))
        return render_template("edit.html", form=form, task=task_to_edit)
    return redirect(url_for("index"))
```

Upravíme i funkci `show_completed()`, která slouží pro zobrazení dokončených úkolů. Také zde je nutné zobrazit pouze úkoly přihlášeného uživatele.
```python
@app.route("/completed")
@login_required
def show_completed():
    tasks = Task.query.filter_by(user_id=current_user.id, completed=True).all()
    return render_template("completed.html", seznam_ukolu=tasks)
```

Přidáme nové funkce pro registraci uživatele, jeho přihlášení a odhlášení. Zatím budeme vracet neexistující HTML dokumenty, které vytvoříme až za chvilku.
```python
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


@app.route("/register", methods=["GET", "POST"])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        existing_user = User.query.filter_by(username=form.username.data).first()
        if existing_user:
            flash('Uživatelské jméno už existuje. Zvolte jiné.', 'danger')
            return redirect(url_for('register'))
        
        new_user = User(username=form.username.data)
        new_user.set_password(form.password.data)
        db.session.add(new_user)
        db.session.commit()
        flash("Registrace byla úspěšná. Můžete se přihlásit.", "success")
        return redirect(url_for("login"))
    return render_template("register.html", form=form)


@app.route("/login", methods=["GET", "POST"])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user and user.check_password(form.password.data):
            login_user(user)
            return redirect(url_for("index"))
        else:
            flash("Přihlašovací údaje jsou nesprávné.", "danger")
    return render_template("login.html", form=form)

@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("login"))
```

Do složky `templates` přidáme dva nové HTML dokumenty `login.html` s formulářem pro přihlášení uživatele a `register.html` s formulářem pro registraci uživatele. První se pojďme podívat na `login.html`:
```html
{% extends "base.html" %}

{% block content %}
<div class="container mt-3 col-md-6">
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
<div class="container col-md-6">
    <h1>Přihlášení:</h1>
    <form method="POST">
        {{ form.hidden_tag() }}
        <div class="form-group">
            {{ form.username.label }}<br>
            {{ form.username(class="form-control") }}<br>
        </div>
        <div class="form-group">
            {{ form.password.label }}<br>
            {{ form.password(class="form-control") }}<br>
        </div>
        <button type="submit" class="btn btn-primary mt-4">Přihlásit se</button>
    </form>
    <p class="mt-3">Nemáte účet? <a href="/register">Registrujte se zde</a></p>
</div>
{% endblock %}
```

Podobně bude vypadat i registrační formulář v souboru `register.html`:
```html
{% extends "base.html" %}

{% block content %}
<div class="container mt-3 col-md-6">
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
<div class="container mt-3 col-md-6">
    <h1>Registrace:</h1>
    <form method="POST" id="register-form">
        {{ form.hidden_tag() }}
        <div class="form-group">
            {{ form.username.label }}<br>
            {{ form.username(class="form-control") }}<br>
        </div>
        <div class="form-group">
            {{ form.password.label }}<br>
            {{ form.password(class="form-control") }}<br>
        </div>
        <div class="form-group mt-4">
            {{ form.confirm_password.label }}<br>
            {{ form.confirm_password(class="form-control") }}<br>
        </div>
        <button type="submit" class="btn btn-primary mt-4">Registrovat</button>
        <p class="mt-3">Již máte účet? <a href="/login">Přihlaste se zde</a></p>
    </form>
</div>
{% endblock %}
```

## Ukázka JavaScript
I když součástí tohoto kurzu není JavaScript, pojďme si přidat do projektu malou ukázku. Do přihlašovacího i registračního formuláře si přidáme tlačítko s ikonkou oka, kdy po kliknutí na toto tlačítko se zobrazí hodnota hesla, které jsme do formuláře zadali. V registračním formuláři se navíc bude kontrolovat, zda obě zadaná hesla jsou stejná.

Ve složce `static` si vytvoříme nový soubor `script.js` a vložíme do něj tento kod:
```js

function togglePasswordVisibility(passwordFieldId) {
    const passwordField = document.getElementById(passwordFieldId);
    const isPasswordVisible = passwordField.type === "text";
    passwordField.type = isPasswordVisible ? "password" : "text";

    const eyeIcon = document.getElementById(isPasswordVisible ? "eye-icon-" + passwordFieldId : "eye-icon-" + passwordFieldId);
    eyeIcon.classList.toggle("bi-eye"); // změna na ikonu "oko"
    eyeIcon.classList.toggle("bi-eye-slash"); // změna na ikonu "přeškrtnuté oko"
};

const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');
const form = document.querySelector('#register-form');

// Zkontrolujeme, zda jsou hesla stejná při odeslání formuláře
form.addEventListener('submit', function (event) {
    if (password.value !== confirmPassword.value) {
        event.preventDefault(); // Zabrání odeslání formuláře
        password.classList.add('is-invalid');
        confirmPassword.classList.add('is-invalid');
    } else {
        password.classList.remove('is-invalid');
        confirmPassword.classList.remove('is-invalid');
    }
});

// Zkontrolujeme hesla i při psaní
confirmPassword.addEventListener('input', function () {
    if (password.value !== confirmPassword.value) {
        confirmPassword.classList.add('is-invalid');
    } else {
        confirmPassword.classList.remove('is-invalid');
    }
});
```

Odkaz na tento nový soubor si přidáme do souboru `base.html` k ostatním skriptům.
```html
<script src="static/script.js"></script>
```

Do souboru `login.html` si upravíme formulář tak, aby zobrazoval tlačítko s novou funkcionalitou a aby se po kliknutí provedla magie, kterou jsme si ve skriptu nastavili. Takto bude vypadat část formuláře pro pole s heslem.
```html
<div class="form-group">
    {{ form.password.label }}<br>
    <div class="input-group">
        {{ form.password(class="form-control", id="password") }}
        <button type="button" class="btn btn-outline-secondary" onclick="togglePasswordVisibility('password')">
            <i class="bi bi-eye" id="eye-icon-password"></i>
        </button>
    </div>
</div>
```

A takto bude vypadat stejná změna v souboru `register.html` pro dvě pole s heslem.
```html
<div class="form-group">
    {{ form.password.label }}<br>
    <div class="input-group">
        {{ form.password(class="form-control", id="password") }}
        <button type="button" class="btn btn-outline-secondary" onclick="togglePasswordVisibility('password')">
            <i class="bi bi-eye" id="eye-icon-password"></i>
        </button>
    </div>
</div>
<div class="form-group mt-4">
    {{ form.confirm_password.label }}<br>
    <div class="input-group">
        {{ form.confirm_password(class="form-control", id="confirm-password") }}
        <button type="button" class="btn btn-outline-secondary" onclick="togglePasswordVisibility('confirm-password')">
            <i class="bi bi-eye" id="eye-icon-confirm-password"></i>
        </button>
    </div>
</div>
```

## Poslední úpravy
Do tabulky si přidáme informaci o tom, zda byl úkol dokončen. Přidáme si jak novou buňku do záhlaví, tak i novou buňku do těla tabulky.
```html
<table id="tasks" class="table">
    <thead>
        <tr>
            <th>Úkol</th>
            <th>Detaily</th>
            <th>Priorita</th>
            <th>Dokončeno</th>
        </tr>
    </thead>
    <tbody>
        {% for ukol in seznam_ukolu %}
        <tr>
            <td>{{ ukol.title }}</td>
            <td>{{ ukol.details }}</td>
            <td>{{ ukol.priority }}</td>
            <td>{{ "Hotovo" if ukol.completed }}</td>
        </tr>
        {% endfor %}
    </tbody>
</table>
```

Na stránce pro dokončené úkoly si přidáme nadpis a přidáme informaci pro situaci, když uživatel nemá žádné dokončené úkoly.
```html
<h2>Dokončené úkoly</h2>
{% if not seznam_ukolu %}
    <p>Nemáte žádné dokončené úkoly.</p>
{% endif %}
```

Nakonec si vylepšíme navigaci
```html
<!-- Horizontální menu -->
{% if current_user.is_authenticated %}
<nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
    <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <a class="nav-link {{ 'active' if request.path == url_for('index') else '' }}"
                    aria-current="page" href="{{ url_for('index') }}">Home</a>
                <a class="nav-link {{ 'active' if request.path == url_for('show_table') else '' }}"
                    href="{{ url_for('show_table') }}">Všechny úkoly</a>
                <a class="nav-link {{ 'active' if request.path == url_for('show_completed') else '' }}"
                    href="{{ url_for('show_completed') }}">Dokončené</a>
            </div>
            <div class="ms-auto d-flex align-items-center">
                <span class="navbar-text me-2 text-light">Přihlášený uživatel: {{
                    current_user.username.upper() }}</span>
                <a class="btn btn-outline-light" href="{{ url_for('logout') }}">Odhlásit se</a>
            </div>
        </div>
    </div>
</nav>
{% endif %}
```

## Co ještě doplnit?

- **Kategorizace úkolů**: Např. „Práce“, „Osobní“, „Studium“. To by uživatelům usnadnilo třídění a hledání úkolů.
- **Termíny splnění**: Uživatelé by mohli snadno sledovat, kdy mají úkoly dokončit, a aplikace by mohla upozornit na blížící se termíny.
- **Upozornění na blížící se úkoly**: Implementace systému upozornění na blížící se termíny. Například, pokud se termín úkolu blíží, uživatel bude upozorněn e-mailem nebo prostřednictvím notifikace.
- **Možnost opakování úkolů**: Umožnit uživatelům vytvářet opakující se úkoly (např. denně, týdně, měsíčně). Tato funkce by mohla být užitečná pro úkoly, které je potřeba plnit pravidelně.
- **Vyhledávání a filtrování**: Funkce vyhledávání, která umožní uživatelům rychle najít konkrétní úkoly podle názvu nebo popisu. Filtry podle priority, stavu (dokončený, nedokončený) nebo termínu splnění.
- **Export a import úkolů**: Umožnit uživatelům exportovat své úkoly do různých formátů (např. CSV, JSON) a importovat úkoly z těchto formátů. To by usnadnilo sdílení úkolů nebo přenos mezi různými aplikacemi.
- **Statistiky a analýzy**: Funkce, které by analyzovaly, kolik úkolů bylo dokončeno za určité období, průměrnou dobu potřebnou k dokončení úkolu atd. Tyto statistiky by mohly pomoci uživatelům zlepšit jejich produktivitu.
- **Integrace s kalendářem**: Synchronizace úkolů s kalendářem (např. Google Calendar). To by umožnilo lepší plánování a viditelnost úkolů pro uživatele.
- **Cokoliv dalšího si vymyslíš** ....
