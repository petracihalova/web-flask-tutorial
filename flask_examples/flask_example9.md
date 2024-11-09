# Flask aplikace Knihovnička pro ukládání oblíbených knih a ukládáním do JSON
Ukázka Flask aplikace s formulářem pro vytváření seznamu oblíbených knih a jejich označení, zda jsou již přečtené nebo ne. Všechna data se ukládají do JSON souboru.

Struktura projektu:
```bash
/flask_library_app
│
├── app.py
├── books.json
└── templates
    └── index.html
```

Soubor `app.py`:
```python
from flask import Flask, render_template, request, redirect, url_for
import json
import os

app = Flask(__name__)


# Funkce pro načtení knih z JSON souboru
def load_books():
    if os.path.exists("books.json"):
        with open("books.json", "r") as file:
            return json.load(file)
    return []


# Funkce pro uložení knih do JSON souboru
def save_books(books):
    with open("books.json", "w", encoding="utf-8") as file:
        json.dump(books, file, indent=4, ensure_ascii=False)


@app.route("/")
def index():
    books = load_books()
    return render_template("index.html", books=books)


@app.route("/add", methods=["POST"])
def add_book():
    title = request.form["title"]
    author = request.form["author"]
    if title and author:
        books = load_books()
        books.append({"title": title, "author": author, "read": False})
        save_books(books)
    return redirect(url_for("index"))


@app.route("/delete/<int:book_index>", methods=["POST"])
def delete_book(book_index):
    books = load_books()
    if 0 <= book_index < len(books):
        books.pop(book_index)
        save_books(books)
    return redirect(url_for("index"))


@app.route("/toggle/<int:book_index>", methods=["POST"])
def toggle_read(book_index):
    books = load_books()
    if 0 <= book_index < len(books):
        books[book_index]["read"] = not books[book_index]["read"]
        save_books(books)
    return redirect(url_for("index"))


if __name__ == "__main__":
    app.run(debug=True)
```

Soubor `templates/index.html`:
```html
<!DOCTYPE html>
<html lang="cs">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Knihovnička</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>

<body class="container mt-5">
    <h1 class="text-center mb-4">Knihovnička</h1>

    <!-- Formulář pro přidání knihy -->
    <form action="{{ url_for('add_book') }}" method="POST" class="mb-4">
        <div class="form-group">
            <label for="title">Název Knihy</label>
            <input type="text" class="form-control" id="title" name="title" placeholder="Vlož název knihy" required>
        </div>
        <div class="form-group">
            <label for="author">Autor</label>
            <input type="text" class="form-control" id="author" name="author" placeholder="Vlož jméno autora" required>
        </div>
        <button type="submit" class="btn btn-primary">Přidej knihu</button>
    </form>

    <!-- Seznam knih -->
    <ul class="list-group">
        {% for book in books %}
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <div>
                <strong>{{ book.title }}</strong> by {{ book.author }}
                <span class="badge text-bg-{{ 'success' if book.read else 'warning' }} ml-2">
                    {{ 'Read' if book.read else 'Unread' }}
                </span>
            </div>
            <div>
                <form action="{{ url_for('toggle_read', book_index=loop.index0) }}" method="POST" class="d-inline">
                    <button type="submit" class="btn btn-sm btn-outline-{{ 'warning' if book.read else 'success' }}">
                        <span>Označ jako {{ 'ne' if book.read }}přečtenou
                        </span>
                    </button>
                </form>
                <form action="{{ url_for('delete_book', book_index=loop.index0) }}" method="POST" class="d-inline">
                    <button type="submit" class="btn btn-sm btn-outline-danger">Vymaž</button>
                </form>
            </div>
        </li>
        {% endfor %}
    </ul>
    <!-- Bootstrap skripty -->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
        integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js"
        integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy"
        crossorigin="anonymous"></script>
</body>

</html>
```

Soubor `books.json` obsahuje již několik vložených knih:
```json
[
    {
        "title": "Harry Potter a Kámen mudrců",
        "author": "J. K. Rowlingová",
        "read": true
    },
    {
        "title": "Hobit",
        "author": "J. R. R. Tolkien",
        "read": false
    },
    {
        "title": "Železný plamen",
        "author": "R. Yarros",
        "read": false
    },
    {
        "title": "Pád domu Usherů a jiné povídky",
        "author": "E. A. Poe",
        "read": true
    },
    {
        "title": "Vánoční koleda",
        "author": "Ch. Dickens",
        "read": false
    }
]
```
