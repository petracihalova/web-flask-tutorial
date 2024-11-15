# Flask aplikace "Book Manager" s ukázkou základních databázových operací
 Ukázka Flask aplikace, která provádí základní CRUD operace (vytvoření, čtení, aktualizace a mazání) s databází SQLite. Aplikace slouží ke správě knih, které obsahují název, autora a informaci o tom, zda byly přečteny. Při prvním spuštění aplikace bude vytvořena složka `instance` a uvnitř soubor `books_crud.db` s databází. Pomocí nástroje DB Browser for SQLite je možné sledovat, jak jsou data v databázi vytvářena, editována a mazána.

Kromě frameworku `Flask` příklad používá také knihovny `Flask-SQLAlchemy` a `Flask-WTF`, které je nutné nainstalovat do virtuálního prostředí.
```bash
pip install Flask Flask-SQLAlchemy Flask-WTF
```

Struktura projektu:
```bash
flask_crud_app/
│
├── app.py
├── models.py
├── forms.py
└── templates/
    ├── base.html
    ├── book_list.html
    ├── book_create.html
    └── book_edit.html
```

Soubor `app.py`:
```python
from flask import Flask, render_template, redirect, url_for, flash
from models import db, Book
from forms import BookForm

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///books_crud.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your_secret_key'

db.init_app(app)

with app.app_context():
    db.create_all()

@app.route('/')
def index():
    books = Book.query.all()
    return render_template('book_list.html', books=books)

@app.route('/book/new', methods=['GET', 'POST'])
def create_book():
    form = BookForm()
    if form.validate_on_submit():
        new_book = Book(title=form.title.data, author=form.author.data, read=form.read.data)
        db.session.add(new_book)
        db.session.commit()
        flash('Book created successfully!', 'success')
        return redirect(url_for('index'))
    return render_template('book_create.html', form=form)

@app.route('/book/edit/<int:book_id>', methods=['GET', 'POST'])
def edit_book(book_id):
    book = Book.query.get_or_404(book_id)
    form = BookForm(obj=book)
    if form.validate_on_submit():
        book.title = form.title.data
        book.author = form.author.data
        book.read = form.read.data
        db.session.commit()
        flash('Book updated successfully!', 'success')
        return redirect(url_for('index'))
    return render_template('book_edit.html', form=form, book=book)

@app.route('/book/delete/<int:book_id>', methods=['POST'])
def delete_book(book_id):
    book = Book.query.get_or_404(book_id)
    db.session.delete(book)
    db.session.commit()
    flash('Book deleted successfully!', 'success')
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
```

Soubor `models.py`:
```python
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    read = db.Column(db.Boolean, default=False)
```

Soubor `forms.py`:
```python
from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, SubmitField
from wtforms.validators import DataRequired

class BookForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    author = StringField('Author', validators=[DataRequired()])
    read = BooleanField('Read')
    submit = SubmitField('Submit')
```

Soubor `templates/base.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flask CRUD App</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container">
        <h1 class="mt-5">Book Manager</h1>
        <div class="mt-3">
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
        {% block content %}{% endblock %}
    </div>
</body>
</html>
```

Soubor `templates/book_list.html`:
```html
{% extends 'base.html' %}

{% block content %}
    <a href="{{ url_for('create_book') }}" class="btn btn-primary mb-3">Add Book</a>
    <table class="table">
        <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Read</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {% for book in books %}
            <tr>
                <td>{{ book.title }}</td>
                <td>{{ book.author }}</td>
                <td>{{ 'Yes' if book.read else 'No' }}</td>
                <td>
                    <a href="{{ url_for('edit_book', book_id=book.id) }}" class="btn btn-warning btn-sm">Edit</a>
                    <form action="{{ url_for('delete_book', book_id=book.id) }}" method="POST" style="display:inline;">
                        <button type="submit" class="btn btn-danger btn-sm">Delete</button>
                    </form>
                </td>
            </tr>
            {% endfor %}
        </tbody>
    </table>
{% endblock %}
```

Soubor `templates/book_create.html`:
```html
{% extends 'base.html' %}

{% block content %}
    <h2>Add Book</h2>
    <form method="POST">
        {{ form.hidden_tag() }}
        <div class="form-group">
            {{ form.title.label(class="form-label") }}
            {{ form.title(class="form-control") }}
        </div>
        <div class="form-group">
            {{ form.author.label(class="form-label") }}
            {{ form.author(class="form-control") }}
        </div>
        <div class="form-group">
            {{ form.read.label(class="form-check-label") }}
            {{ form.read(class="form-check-input") }}
        </div>
        {{ form.submit(class="btn btn-primary") }}
    </form>
{% endblock %}
```

Soubor `templates/book_edit.html`:
```html
{% extends 'base.html' %}

{% block content %}
    <h2>Edit Book</h2>
    <form method="POST">
        {{ form.hidden_tag() }}
        <div class="form-group">
            {{ form.title.label(class="form-label") }}
            {{ form.title(class="form-control") }}
        </div>
        <div class="form-group">
            {{ form.author.label(class="form-label") }}
            {{ form.author(class="form-control") }}
        </div>
        <div class="form-group">
            {{ form.read.label(class="form-check-label") }}
            {{ form.read(class="form-check-input") }}
        </div>
        {{ form.submit(class="btn btn-primary") }}
    </form>
{% endblock %}
```

### Ukázka finální aplikace
<img src="./images/flask_example13_book_manager.png" alt="Ukázka aplikace Book Manager" width="1000">
