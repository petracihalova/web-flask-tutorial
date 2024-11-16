# Flask aplikace, která ukládá data do dvou tabulek SQLite databáze.
Aplikace využívá databázové modely pro autora knihy `Author` a pro knihu `Book` a umožňuje přidávat autory a knihy do databáze a zobrazovat je na webové stránce. Při prvním spuštění aplikace bude vytvořena složka `instance` a uvnitř soubor `books_authors.db` s databází. Pomocí nástroje DB Browser for SQLite je možné sledovat, jak jsou data v databázi vytvářena, editována a mazána.

Kromě frameworku `Flask` příklad používá knihovnu `Flask-SQLAlchemy`, kterou je nutné nainstalovat do virtuálního prostředí.
```bash
pip install Flask Flask-SQLAlchemy
```

Před spuštěním aplikace pomocí `python app.py` (ve virtuálním prostředí) je možné naplnit databázi daty (tzv. seeding) pomocí příkazu:
```bash
python seed.py
```
Tímto příkazem se spustí soubor `seed.py`, který smaže a vytvoří novou databázi, vytvoří v databázi tři nové autory a přidá několik knih. Všechny změny pak uloží do databáze.

Aplikaci pak spustíme tak, jak jsme zvyklí pomocí:
```bash
python app.py
```
Pokud chceme, můžeme krok s naplněním databáze vynechat (po prvním spuštění programu bude databáze prázdná). Avšak pokud pustíme seedování znovu, všechna data v databázi budou vymazána.

Struktura projektu:
```bash
/flask_sqlite_2_tabulky
│
├── app.py
├── models.py
├── seed.py
└── templates/
    ├── authors.html
    ├── books.html
    └── base.html
```

Soubor `app.py`:
```python
from flask import Flask, render_template, redirect, url_for, request
from models import db, Author, Book

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///books_authors.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

with app.app_context():
    db.create_all()


@app.route("/")
def index():
    return render_template("base.html")


@app.route("/authors", methods=["GET", "POST"])
def authors():
    if request.method == "POST":
        name = request.form.get("name")
        new_author = Author(name=name)
        db.session.add(new_author)
        db.session.commit()
        return redirect(url_for("authors"))
    authors = Author.query.all()
    return render_template("authors.html", authors=authors)


@app.route("/books", methods=["GET", "POST"])
def books():
    if request.method == "POST":
        title = request.form.get("title")
        author_id = request.form.get("author_id")
        read = request.form.get("read") == "on"
        new_book = Book(title=title, author_id=author_id, read=read)
        db.session.add(new_book)
        db.session.commit()
        return redirect(url_for("books"))
    books = Book.query.all()
    authors = Author.query.all()
    return render_template("books.html", books=books, authors=authors)


if __name__ == "__main__":
    app.run(debug=True)
```

Soubor `models.py`:
```python
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Author(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    books = db.relationship('Book', backref='author', lazy=True)

class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('author.id'), nullable=False)
    read = db.Column(db.Boolean, default=False)
```

Soubor `seed.py`:
```python
from app import app, db, Author, Book

def seed_data():
    with app.app_context():  # Vytvoření kontextu aplikace
        # Smazat stávající data (pokud je potřeba)
        db.drop_all()
        db.create_all()

        # Přidání autorů
        author1 = Author(name="George Orwell")
        author2 = Author(name="J.K. Rowling")
        author3 = Author(name="J.R.R. Tolkien")

        db.session.add(author1)
        db.session.add(author2)
        db.session.add(author3)

        # Přidání knih
        book1 = Book(title="1984", author=author1, read=False)
        book2 = Book(title="Animal Farm", author=author1, read=True)
        book3 = Book(title="Harry Potter and the Sorcerer's Stone", author=author2, read=False)
        book4 = Book(title="The Lord of the Rings", author=author3, read=True)

        db.session.add(book1)
        db.session.add(book2)
        db.session.add(book3)
        db.session.add(book4)

        # Uložit všechny změny do databáze
        db.session.commit()

if __name__ == "__main__":
    seed_data()
    print("Data byla úspěšně naplněna.")
```

Soubor `templates/authors.html`:
```html
{% extends 'base.html' %}

{% block content %}
<h2>Autoři</h2>
<form method="POST">
    <div class="form-group">
        <label for="name">Jméno autora:</label>
        <input type="text" class="form-control" id="name" name="name" required>
    </div>
    <button type="submit" class="btn btn-primary">Přidat autora</button>
</form>
<hr>
<ul>
    {% for author in authors %}
        <li>{{ author.name }}</li>
    {% endfor %}
</ul>
{% endblock %}
```

Soubor `templates/books.html`:
```html
{% extends 'base.html' %}

{% block content %}
<h2>Knihy</h2>
<form method="POST">
    <div class="form-group">
        <label for="title">Název knihy:</label>
        <input type="text" class="form-control" id="title" name="title" required>
    </div>
    <div class="form-group">
        <label for="author_id">Autor:</label>
        <select class="form-control" id="author_id" name="author_id" required>
            {% for author in authors %}
                <option value="{{ author.id }}">{{ author.name }}</option>
            {% endfor %}
        </select>
    </div>
    <div class="form-check">
        <input type="checkbox" class="form-check-input" id="read" name="read">
        <label class="form-check-label" for="read">Přečteno</label>
    </div>
    <button type="submit" class="btn btn-primary">Přidat knihu</button>
</form>
<hr>
<ul>
    {% for book in books %}
        <li>{{ book.title }} ({{ book.author.name }}) - {% if book.read %} Přečteno {% else %} Nepřečteno {% endif %}</li>
    {% endfor %}
</ul>
{% endblock %}
```

Soubor `templates/base.html`:
```html
<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flask Book App</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container">
        <h1>Flask Book App</h1>
        <ul class="nav nav-pills">
            <li class="nav-item">
                <a class="nav-link" href="{{ url_for('authors') }}">Autoři</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="{{ url_for('books') }}">Knihy</a>
            </li>
        </ul>
        <hr>
        {% block content %}{% endblock %}
    </div>
</body>
</html>
```
