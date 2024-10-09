# Flask aplikace, která ukládá data z formuláře do SQLite databáze.
Tento příklad zahrnuje vytvoření databáze, definici modelu knihy, vytvoření formuláře pro přidání knihy a zobrazení seznamu přidaných knih. Při prvním spuštění aplikace bude vytvořena složka `instance` a uvnitř soubor `books.db` s databází. Pomocí nástroje DB Browser for SQLite je možné sledovat, jak jsou data v databázi vytvářena, editována a mazána.

Kromě frameworku `Flask` příklad používá knihovnu `Flask-SQLAlchemy`, kterou je nutné nainstalovat do virtuálního prostředí.
```bash
pip install Flask Flask-SQLAlchemy
```

Struktura projektu:
```bash
/flask_sqlite
│
├── app.py
└── templates
    └── index.html
```

Soubor `app.py`:
```python
from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///books.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Model pro knihy
class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    read = db.Column(db.Boolean, default=False)

# Vytvoření databáze
with app.app_context():
    db.create_all()

# Hlavní stránka
@app.route('/')
def index():
    books = Book.query.all()
    return render_template('index.html', books=books)

# Přidání knihy
@app.route('/add', methods=['POST'])
def add_book():
    title = request.form['title']
    author = request.form['author']
    read = 'read' in request.form
    new_book = Book(title=title, author=author, read=read)
    db.session.add(new_book)
    db.session.commit()
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
```

Soubor `templates/index.html`:
```html
<!DOCTYPE html>
<html lang="cs">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Knihy</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>
    <div class="container">
        <h1 class="mt-5">Knihy</h1>
        <form action="/add" method="POST" class="mt-4">
            <div class="form-group">
                <label for="title">Název knihy</label>
                <input type="text" name="title" class="form-control" required>
            </div>
            <div class="form-group">
                <label for="author">Autor</label>
                <input type="text" name="author" class="form-control" required>
            </div>
            <div class="form-group">
                <label>
                    <input type="checkbox" name="read"> Přečteno
                </label>
            </div>
            <button type="submit" class="btn btn-primary">Přidat knihu</button>
        </form>

        <h2 class="mt-5">Seznam knih</h2>
        <ul class="list-group mt-3">
            {% for book in books %}
            <li class="list-group-item">
                <strong>{{ book.title }}</strong> od {{ book.author }} - {% if book.read %}Přečteno{% else
                %}Nepřečteno{% endif %}
            </li>
            {% endfor %}
        </ul>
    </div>
</body>

</html>
```
