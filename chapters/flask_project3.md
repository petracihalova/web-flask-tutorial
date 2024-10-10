# Projekt: My TODO list část 3
- Připojení aplikace k databázi: Ukládání úkolů do SQLite databáze.
- CRUD operace pro úkoly: Vytvoření funkce pro přidávání, mazání a úpravu úkolů v databázi.

## Spuštění aplikace
Otevřete si složku s projektem a ve virtuálním prostředí si pusťte aplikaci My TODO list. V prohlížeči zkontrolujte, že aplikace funguje. V tuto chvíli máme připravenou základní strukturu aplikace a nastaveny Bootstrap styly. Také jsme přidali formulář pro přidávání nových úkolů pomocí knihovny `Flask-WTF`, nastavili jsme validace pro jednotlivá pole a dynamicky generujeme seznam existujících úkolů (jako seznam a jako `DataTable`). 

V této části si ukážeme, jak trvale ukládat naše data do souborů a do databáze. Také si do projektu přidáme zatím chybějící CRUD operace (úpravu úkolů a jejich mazání).

## Trvalé uložení dat do JSON souboru
Abychom mohli ukládat data o úkolech do souboru JSON, je nutné nejdříve rozšířit třídu `Task` o nové metody pro převod na a z JSON formátu. Konkrétně budeme potřebovat metodu pro konverzi objektu na slovník a také pro vytvoření objektu z JSON dat. 
```python
class Task:
    def __init__(self, title, details, priority):
        self.title = title
        self.details = details
        self.priority = priority
    
    def to_dict(self):
        return {
            "title": self.title,
            "details": self.details,
            "priority": self.priority
        }
    
    @classmethod
    def from_dict(cls, data):
        return cls(data["title"], data["details"], data["priority"])
```
Dekorátor `@classmethod` v Pythonu se používá k definování metody, která patří ke třídě, nikoli k instanci třídy. To znamená, že tuto metodu můžete volat přímo na třídě, aniž byste museli vytvořit instanci třídy. Prvním argumentem metody definované jako `@classmethod` je obvykle `cls`, což odkazuje na třídu samotnou, nikoli na konkrétní instanci. To nám umožní provádět operace, které se týkají celé třídy. Metoda `from_dict` pak vytvoří instanci třídy `Task` na základě slovníku, který obsahuje data úkolu. 

Uložení úkolů do JSON:
```python
# Funkce pro uložení úkolů do JSON souboru
def save_tasks(tasks, filename):
    with open(filename, "w", encoding="utf-8") as f:
        json.dump([task.to_dict() for task in tasks], f, indent=4, ensure_ascii=False)
```

Načítání úkolů z JSON:
```python
# Funkce pro načtení úkolů z JSON souboru
def load_tasks(filename):
    if os.path.exists(filename):
        with open(filename, "r") as f:
            tasks_data = json.load(f)
            return [Task.from_dict(task) for task in tasks_data]
    return []
```

Úprava souboru `app.py`:
```python
from flask import Flask, render_template, redirect, url_for
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField
from wtforms.validators import DataRequired, Length
import json
import os

app = Flask(__name__)
app.secret_key = "your_secret_key"


# Třída pro úkol
class Task:
    def __init__(self, title, details, priority):
        self.title = title
        self.details = details
        self.priority = priority
    
    def to_dict(self):
        return {
            "title": self.title,
            "details": self.details,
            "priority": self.priority
        }
    
    @classmethod
    def from_dict(cls, data):
        return cls(data["title"], data["details"], data["priority"])


# Třída pro formulář
class TaskForm(FlaskForm):
    title = StringField(
        "Název úkolu",
        validators=[DataRequired(message="Toto pole je povinné."), Length(min=3, max=100)],
        render_kw={"placeholder": "Název úkolu"},
    )
    details = TextAreaField(
        "Podrobnosti", 
        validators=[Length(max=1000)],
        render_kw={"placeholder": "Podrobnosti"},
    )
    priority = SelectField(
        "Priorita",
        choices=[("high", "Vysoká priorita"), ("medium", "Střední priorita"), ("low", "Nízká priorita")],
        default="medium",
        validators=[DataRequired()],
    )

TASKS_FILENAME = "tasks.json"

# Funkce pro načtení úkolů z JSON souboru
def load_tasks(filename):
    if os.path.exists(filename):
        with open(filename, "r") as f:
            tasks_data = json.load(f)
            return [Task.from_dict(task) for task in tasks_data]
    return []


# Funkce pro uložení úkolů do JSON souboru
def save_tasks(tasks, filename):
    with open(filename, "w", encoding="utf-8") as f:
        json.dump([task.to_dict() for task in tasks], f, indent=4, ensure_ascii=False)


@app.route("/", methods=["GET", "POST"])
def index():
    form = TaskForm()
    tasks = load_tasks(TASKS_FILENAME)
    if form.validate_on_submit():
        # Uložení úkolu, pokud je validace úspěšná
        tasks.append(Task(form.title.data, form.details.data, form.priority.data))
        save_tasks(tasks, TASKS_FILENAME)
        return redirect(url_for("index"))
    return render_template("index.html", seznam_ukolu=tasks, formular=form)

@app.route("/table")
def show_table():
    tasks = load_tasks(TASKS_FILENAME)
    return render_template("table.html", seznam_ukolu=tasks)


if __name__ == "__main__":
    app.run(debug=True)
```

## Přesun formuláře pro samostatného souboru
Nyní si trochu vylepšíme strukturu našeho projektu a přesuneme si WTF formulář do samostatného souboru. To nám usnadní budoucí údržbu a rozšiřování projektu. Vytvoříme si nový souboru `form.py` a přesuneme do něj třídu `TaskForm`. Také musíme importovat třídu pro formulář do hlavního souboru aplikace, abychom mohli nadále formulář používat.

Nový souboru `form.py`:
```python
from flask_wtf import FlaskForm
from wtforms import SelectField, StringField, TextAreaField
from wtforms.validators import DataRequired, Length


class TaskForm(FlaskForm):
    title = StringField(
        "Název úkolu",
        validators=[DataRequired(message="Toto pole je povinné."), Length(min=3, max=100)],
        render_kw={"placeholder": "Název úkolu"},
    )
    details = TextAreaField(
        "Podrobnosti", 
        validators=[Length(max=1000)],
        render_kw={"placeholder": "Podrobnosti"},
    )
    priority = SelectField(
        "Priorita",
        choices=[("high", "Vysoká priorita"), ("medium", "Střední priorita"), ("low", "Nízká priorita")],
        default="medium",
        validators=[DataRequired()],
    )
```

Nezapomeňte formulář a importy vymazat ze souboru `index.html` a naopak přidat import formuláře:
```python
from form import TaskForm
```

## Trvalé uložení dat do SQLite
Abychom mohli začít ukládat data do SQLite a pracovat s databází pomocí knihovny `Flask-SQLAlchemy`, musíme vyměnit stávající třídu `Task` za `db.Model`.

Prvním krokem je nainstalování knihovny do virtuálního prostředí projektu:
```bash
pip install Flask-SQLAlchemy
```

Nový databázový model pro úkol s názvem `Task` (podle kterého pak bude vytvořena tabulka v databázi) vytvoříme v samostatném souboru `model.py`:
```python
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # Primární klíč
    title = db.Column(db.String(100), nullable=False)  # Název úkolu
    details = db.Column(db.Text, nullable=True)  # Podrobnosti úkolu
    priority = db.Column(db.String(10), nullable=False)  # Priorita úkolu
```

Nyní zbývá doplnit nastavení databáze v hlavním souboru `app.py`:
```python
# Nastavení databáze
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'  # Cesta k databázi
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
```

A upravit ukládání úkolů do a načítání úkolů z databáze. Konečná podoba souboru `app.py`:
```python
from flask import Flask, redirect, render_template, url_for

from form import TaskForm
from models import Task, db

app = Flask(__name__)
app.secret_key = "your_secret_key"

# Nastavení databáze
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'  # Cesta k databázi
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)


@app.route("/", methods=["GET", "POST"])
def index():
    form = TaskForm()
    if form.validate_on_submit():
        # Uložení úkolu do databáze
        new_task = Task(title=form.title.data, details=form.details.data, priority=form.priority.data)
        db.session.add(new_task)  # Přidání úkolu do session
        db.session.commit()  # Uložení změn
        return redirect(url_for("index"))
    
    tasks = Task.query.all()  # Načtení všech úkolů z databáze
    return render_template("index.html", seznam_ukolu=tasks, formular=form)


@app.route("/table")
def show_table():
    tasks = Task.query.all()
    return render_template("table.html", seznam_ukolu=tasks)


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
```

## Smazání úkolů
Aby bylo možné přidat možnost mazání úkolu, je nutné nejdříve implementovat novou cestu (route), která bude zpracovávat požadavek na smazání úkolu, a upravit šablonu tak, aby zahrnovala tlačítko pro smazání úkolu.

Nejdříve přidáme novou cestu do souboru `app.py`, která se postará o mazání úkolu podle jeho `id`. 
```python
@app.route("/delete/<int:task_id>")
def delete_task(task_id):
    task_to_delete = Task.query.get(task_id)  # Načtení úkolu podle ID
    if task_to_delete:
        db.session.delete(task_to_delete)  # Smazání úkolu
        db.session.commit()  # Uložení změn
    return redirect(url_for("index"))  # Přesměrování na hlavní stránku
```

Úprava šablony `index.html` a přidání tlačítka pro smazání úkolu:
```html
<!-- Seznam úkolů -->
<h2 class="my-4">Seznam úkolů</h2>
<ul class="list-group">
    {% for ukol in seznam_ukolu %}
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <div>
            {% set priority_class = 'text-danger' if ukol.priority == 'high' else 'text-warning' if ukol.priority == 'medium' else 'text-success' %}
            <span class="{{priority_class}}">&#9673;</span>
            <strong>{{ ukol.title }}</strong> - {{ ukol.details }}
        </div>
        <div>
            <a href="{{ url_for('delete_task', task_id=ukol.id) }}" class="btn btn-danger">Delete</a>
        </div>
    </li>
    {% endfor %}
</ul>
```

## Editace úkolů
Poslední operace, která nám z CRUD zbývá, je editace existujícího záznamu. Podobně jako v předchozím případě budeme potřebovat vytvořit novou routu a také přidat tlačítko pro úpravu úkolu. Po kliknutí na tlačítko se zobrazí nová stránka, kde bude možné upravit všechna pole (název úkolu, podrobnosti, prioritu) a po kliknutí na tlačítko změny uložit do databáze.

Přidání cesty pro úpravu úkolu:
```python
@app.route("/edit/<int:task_id>", methods=["GET", "POST"])
def edit_task(task_id):
    task_to_edit = Task.query.get(task_id)  # Načtení úkolu podle ID
    if not task_to_edit:
        return redirect(url_for("index"))  # Pokud úkol neexistuje, přesměrujeme na hlavní stránku

    form = TaskForm(obj=task_to_edit)  # Inicializace formuláře s existujícími daty

    if form.validate_on_submit():
        # Aktualizace úkolu
        task_to_edit.title = form.title.data
        task_to_edit.details = form.details.data
        task_to_edit.priority = form.priority.data
        db.session.commit()  # Uložení změn
        return redirect(url_for("index"))
    
    return render_template("edit.html", form=form, task=task_to_edit)  # Zobrazit šablonu pro editaci
```

Přidání nové HTML šabony pro editaci úkolu:
```html
{% extends "base.html" %}

{% block content %}
<div>
    <h1>Upravit úkol</h1>
    <form method="POST">
        {{ form.hidden_tag() }}
        <div class="form-group">
            {{ form.title.label }}<br>
            {{ form.title(class="form-control") }}<br>
            {% for error in form.title.errors %}
            <div class="text-danger">{{ error }}</div>
            {% endfor %}
        </div>
        <div class="form-group">
            {{ form.details.label }}<br>
            {{ form.details(class="form-control") }}<br>
        </div>
        <div class="form-group">
            {{ form.priority.label }}<br>
            {{ form.priority(class="form-control") }}<br>
        </div>
        <button type="submit" class="btn btn-primary">Uložit změny</button>
    </form>
    <a href="{{ url_for('index') }}" class="btn btn-secondary mt-2">Zpět na hlavní stránku</a>
</div>

{% endblock %}
``` 

Úprava šablony `index.html` a přidání tlačítka pro editaci úkolu:
```html
<div>
    <a href="{{ url_for('edit_task', task_id=ukol.id) }}" class="btn btn-warning">Upravit</a>
    <a href="{{ url_for('delete_task', task_id=ukol.id) }}" class="btn btn-danger">Smazat</a>
</div>
```

## Přidání možnosti označit úkol za dokončený
Nyní rozšíříme náš projekt o možnost označit úkol za dokončený. Každý nově vytvořený úkol bude automaticky označen příznakem `completed=False` a do seznamu úkolů si přidáme tlačítko pro označení úkolu `completed=True`. Přidáme logiku, aby se dokončené úkoly nezobrazovaly v seznamu úkolů a také přidáme novou stránku, kde se bude zobrazovat seznam dokončených úkolů s možností zrušit toto označení.

Prvním krokem bude aktualizovat databázový model a přidat do něj nový sloupec `completed`, který bude ukládat informaci o tom, zda je úkol dokončený nebo ne.
```python
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    details = db.Column(db.Text, nullable=True)
    priority = db.Column(db.String(10), nullable=False)
    completed = db.Column(db.Boolean, default=False)  # Přidání sloupce pro dokončení

    def __repr__(self):
        return f"<Task {self.title}>"
```

Dále vytvoříme novou routu, která podle zadaného id označí úkol jako dokončený:
```python
@app.route("/complete/<int:task_id>")
def complete_task(task_id):
    task = Task.query.get_or_404(task_id)
    task.completed = True
    db.session.commit()
    return redirect(url_for("index"))
```

Upravíme funkci `index()`, aby se v seznamu úkolů zobrazovaly jen ty nedokončené.
```python
@app.route("/", methods=["GET", "POST"])
def index():
    form = TaskForm()
    if form.validate_on_submit():
        new_task = Task(title=form.title.data, details=form.details.data, priority=form.priority.data)
        db.session.add(new_task)
        db.session.commit()
        return redirect(url_for("index"))

    # Získání pouze nedokončených úkolů
    tasks = Task.query.filter_by(completed=False).all()  
    return render_template("index.html", seznam_ukolu=tasks, formular=form)
```

Přidáme funkce pro zobrazení dokončených úkolů:
```python
@app.route("/completed")
def show_completed():
    completed_tasks = Task.query.filter_by(completed=True).all()
    return render_template("completed.html", seznam_ukolu=completed_tasks)
```

A další funkce pro zrušení označení úkolu jako dokončeného:
```python
@app.route("/uncomplete/<int:task_id>")
def uncomplete_task(task_id):
    task = Task.query.get_or_404(task_id)
    task.completed = False
    db.session.commit()
    return redirect(url_for("show_completed"))
```

Upravíme HTML šablonu `index.html` a přidáme do ní nové tlačítko pro dokončení úkolu:
```html
<div>
    <a href="{{ url_for('complete_task', task_id=ukol.id) }}" class="btn btn-success">Hotovo</a>
    <a href="{{ url_for('edit_task', task_id=ukol.id) }}" class="btn btn-warning">Upravit</a>
    <a href="{{ url_for('delete_task', task_id=ukol.id) }}" class="btn btn-danger">Smazat</a>
</div>
```

Vytvoříme novou šablonu `completed.html`:
```html
{% extends "base.html" %}

{% block content %}
<div>
    <ul class="list-group">
        {% for ukol in seznam_ukolu %}
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <div>
                {% set priority_class = 'text-danger' if ukol.priority == 'high' else 'text-warning' if ukol.priority ==
                'medium' else 'text-success' %}
                <span class="{{priority_class}}">&#9673;</span>
                <strong>{{ ukol.title }}</strong> - {{ ukol.details }}
            </div>
            <div>
                <a href="{{ url_for('delete_task', task_id=ukol.id) }}" class="btn btn-danger">Smazat</a>
                <a href="{{ url_for('uncomplete_task', task_id=ukol.id) }}" class="btn btn-secondary">Označit jako
                    nedokončený</a>
            </div>
        </li>
        {% endfor %}
    </ul>
</div>

{% endblock %}
```

Do navigace přidáme odkaz na seznam dokončených úkolů:
```html
<a class="nav-link active" aria-current="page" href="{{ url_for('index') }}">Home</a>
<a class="nav-link" href="{{ url_for('show_table') }}">Tabulka</a>
<a class="nav-link" href="{{ url_for('show_completed') }}">Dokončené</a>
<a class="nav-link disabled" aria-disabled="true">Menu 4</a>
```


# Shrnutí
Po třetí části náš projekt vypadá takto:

### Úvodní stránka:
<img src="images/flask_todo_app_version3_home.png" alt="Flask TODO aplikace ukázka 3 stránka Home" width="500">

### Stránka se seznamem dokončených úkolů:
<img src="images/flask_todo_app_version3_completed.png" alt="Flask TODO aplikace ukázka 3 stránka Dokončené" width="500">

Struktura projektu:
```bash
/flask-todo-list
│
├── /instance
│   └── tasks.db
├── /templates
│   ├── base.html
│   ├── completed.html
│   ├── edit.html
│   ├── index.html
│   └── table.html
├── app.py
├── form.py
└── models.py
```

Soubor `app.py`:
```python
from flask import Flask, redirect, render_template, url_for

from form import TaskForm
from models import Task, db

app = Flask(__name__)
app.secret_key = "your_secret_key"

# Nastavení databáze
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///tasks.db"  # Cesta k databázi
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db.init_app(app)


@app.route("/", methods=["GET", "POST"])
def index():
    form = TaskForm()
    if form.validate_on_submit():
        new_task = Task(title=form.title.data, details=form.details.data, priority=form.priority.data)
        db.session.add(new_task)
        db.session.commit()
        return redirect(url_for("index"))

    # Získání pouze nedokončených úkolů
    tasks = Task.query.filter_by(completed=False).all()  
    return render_template("index.html", seznam_ukolu=tasks, formular=form)


@app.route("/table")
def show_table():
    tasks = Task.query.all()
    return render_template("table.html", seznam_ukolu=tasks)


@app.route("/delete/<int:task_id>")
def delete_task(task_id):
    task_to_delete = Task.query.get(task_id)  # Načtení úkolu podle ID
    if task_to_delete:
        db.session.delete(task_to_delete)  # Smazání úkolu
        db.session.commit()  # Uložení změn
    return redirect(url_for("index"))  # Přesměrování na hlavní stránku


@app.route("/edit/<int:task_id>", methods=["GET", "POST"])
def edit_task(task_id):
    task_to_edit = Task.query.get(task_id)  # Načtení úkolu podle ID
    if not task_to_edit:
        return redirect(
            url_for("index")
        )  # Pokud úkol neexistuje, přesměrujeme na hlavní stránku

    form = TaskForm(obj=task_to_edit)  # Inicializace formuláře s existujícími daty

    if form.validate_on_submit():
        # Aktualizace úkolu
        task_to_edit.title = form.title.data
        task_to_edit.details = form.details.data
        task_to_edit.priority = form.priority.data
        db.session.commit()  # Uložení změn
        return redirect(url_for("index"))

    return render_template(
        "edit.html", form=form, task=task_to_edit
    )  # Zobrazit šablonu pro editaci


@app.route("/complete/<int:task_id>")
def complete_task(task_id):
    task = Task.query.get_or_404(task_id)
    task.completed = True
    db.session.commit()
    return redirect(url_for("index"))


@app.route("/completed")
def show_completed():
    completed_tasks = Task.query.filter_by(completed=True).all()
    return render_template("completed.html", seznam_ukolu=completed_tasks)


@app.route("/uncomplete/<int:task_id>")
def uncomplete_task(task_id):
    task = Task.query.get_or_404(task_id)
    task.completed = False
    db.session.commit()
    return redirect(url_for("show_completed"))


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
```

Soubor `form.py`:
```python
from flask_wtf import FlaskForm
from wtforms import SelectField, StringField, TextAreaField
from wtforms.validators import DataRequired, Length


class TaskForm(FlaskForm):
    title = StringField(
        "Název úkolu",
        validators=[DataRequired(message="Toto pole je povinné."), Length(min=3, max=100)],
        render_kw={"placeholder": "Název úkolu"},
    )
    details = TextAreaField(
        "Podrobnosti", 
        validators=[Length(max=1000)],
        render_kw={"placeholder": "Podrobnosti"},
    )
    priority = SelectField(
        "Priorita",
        choices=[("high", "Vysoká priorita"), ("medium", "Střední priorita"), ("low", "Nízká priorita")],
        default="medium",
        validators=[DataRequired()],
    )
```

Soubor `models.py`:
```python
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    details = db.Column(db.Text, nullable=True)
    priority = db.Column(db.String(10), nullable=False)
    completed = db.Column(db.Boolean, default=False)  # Přidání sloupce pro dokončení

    def __repr__(self):
        return f"<Task {self.title}>"
```

Soubor `templates/base.html`:
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My ToDo List</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <!-- DataTables CSS -->
     <link rel="stylesheet" href="//cdn.datatables.net/2.1.7/css/dataTables.dataTables.min.css">
</head>

<body>
    <div class="mx-auto d-flex align-items-end flex-column min-vh-100" style="max-width: 800px;">
        <div class="container p-2">
            <!-- Záhlaví -->
            <header class="my-4">
                <h1 class="text-center">My TODO list</h1>
            </header>

            <!-- Horizontální menu -->
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Menu</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav">
                            <a class="nav-link active" aria-current="page" href="{{ url_for('index') }}">Home</a>
                            <a class="nav-link" href="{{ url_for('show_table') }}">Tabulka</a>
                            <a class="nav-link" href="{{ url_for('show_completed') }}">Dokončené</a>
                            <a class="nav-link disabled" aria-disabled="true">Menu 4</a>
                        </div>
                    </div>
                </div>
            </nav>

            {% block content %} {% endblock %}
        </div>
        <div class="container mt-auto p-2">
            <!-- Zápatí -->
            <footer class="bg-dark text-light py-3 text-center">
                <p class="mb-0">&copy; 2024 My TODO List</p>
            </footer>
        </div>
    </div>

    <!-- Bootstrap skripty -->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
        integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js"
        integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy"
        crossorigin="anonymous"></script>

    <!-- DataTables scripty -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="//cdn.datatables.net/2.1.7/js/dataTables.min.js"></script>
    <script>let table = new DataTable('#tasks');</script>
</body>

</html>
```

Soubor `templates/completed.html`:
```html
{% extends "base.html" %}

{% block content %}
<div>
    <ul class="list-group">
        {% for ukol in seznam_ukolu %}
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <div>
                {% set priority_class = 'text-danger' if ukol.priority == 'high' else 'text-warning' if ukol.priority ==
                'medium' else 'text-success' %}
                <span class="{{priority_class}}">&#9673;</span>
                <strong>{{ ukol.title }}</strong> - {{ ukol.details }}
            </div>
            <div>
                <a href="{{ url_for('delete_task', task_id=ukol.id) }}" class="btn btn-danger">Smazat</a>
                <a href="{{ url_for('uncomplete_task', task_id=ukol.id) }}" class="btn btn-secondary">Označit jako
                    nedokončený</a>
            </div>
        </li>
        {% endfor %}
    </ul>
</div>

{% endblock %}
```

Soubor `templates/edit.html`:
```html
{% extends "base.html" %}

{% block content %}
<div>
    <h1>Upravit úkol</h1>
    <form method="POST">
        {{ form.hidden_tag() }}
        <div class="form-group">
            {{ form.title.label }}<br>
            {{ form.title(class="form-control") }}<br>
            {% for error in form.title.errors %}
            <div class="text-danger">{{ error }}</div>
            {% endfor %}
        </div>
        <div class="form-group">
            {{ form.details.label }}<br>
            {{ form.details(class="form-control") }}<br>
        </div>
        <div class="form-group">
            {{ form.priority.label }}<br>
            {{ form.priority(class="form-control") }}<br>
        </div>
        <button type="submit" class="btn btn-primary">Uložit změny</button>
    </form>
    <a href="{{ url_for('index') }}" class="btn btn-secondary mt-2">Zpět na hlavní stránku</a>
</div>

{% endblock %}
```

Soubor `templates/index.html`:
```html
{% extends "base.html" %}

{% block content %}
<!-- Hlavní obsah -->
<div>
    <!-- Formulář pro přidání úkolu -->
    <form method="POST" novalidate>
        {{ formular.hidden_tag() }}
        <div class="form-group mb-3">
            {{ formular.title(class="form-control") }}
            {% for error in formular.title.errors %}
            <div class="text-danger">{{ error }}</div>
            {% endfor %}
        </div>
        <div class="form-group mb-3">
            {{ formular.details(class="form-control") }}
        </div>
        <div class="form-group mb-3">
            {{ formular.priority(class="form-control") }}
        </div>
        <button type="submit" class="btn btn-primary">Přidat úkol</button>
    </form>
    <!-- Seznam úkolů -->
    <h2 class="my-4">Seznam úkolů</h2>
    <ul class="list-group">
        {% for ukol in seznam_ukolu %}
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <div>
                {% set priority_class = 'text-danger' if ukol.priority == 'high' else 'text-warning' if ukol.priority ==
                'medium' else 'text-success' %}
                <span class="{{priority_class}}">&#9673;</span>
                <strong>{{ ukol.title }}</strong> - {{ ukol.details }}
            </div>
            <div>
                <a href="{{ url_for('complete_task', task_id=ukol.id) }}" class="btn btn-success">Hotovo</a>
                <a href="{{ url_for('edit_task', task_id=ukol.id) }}" class="btn btn-warning">Upravit</a>
                <a href="{{ url_for('delete_task', task_id=ukol.id) }}" class="btn btn-danger">Smazat</a>
            </div>
        </li>
        {% endfor %}
    </ul>
</div>
{% endblock %}
```

Soubor `templates/table.html`:
```html
{% extends "base.html" %}

{% block content %}
<!-- Hlavní obsah -->
<div>
    <!-- Seznam úkolů v tabulce -->
    <h2 class="my-4">Tabulka s úkoly</h2>
    <table id="tasks" class="table">
        <thead>
            <tr>
                <th>Úkol</th>
                <th>Detaily</th>
                <th>Priorita</th>
            </tr>
        </thead>
        <tbody>
            {% for ukol in seznam_ukolu %}
            <tr>
                <td>{{ ukol.title }}</td>
                <td>{{ ukol.details }}</td>
                <td>{{ ukol.priority }}</td>
            </tr>
            {% endfor %}
        </tbody>
    </table>
</div>
{% endblock %}
```
