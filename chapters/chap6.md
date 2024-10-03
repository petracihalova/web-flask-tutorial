# 6. Šablonování a práce s formuláři
### OBSAH:

**Teorie**

- Jinja2 šablonovací engine: Úvod do šablonování, co je to šablonovací engine a jak jej používat ve Flasku.
	- Základy Jinja2: proměnné, podmínky, cykly.
	- Rozdělení HTML kódu do šablon.
- Flask a HTML formuláře: Jak pracovat s formuláři ve Flasku.
	- Odesílání dat z formulářů.
	- Validace formulářů.
	- Zpracování POST požadavků.

**Projekt**

- Implementace formuláře pro přidávání úkolů: Formulář na hlavní stránce, který bude odesílat data pomocí POST metody.
- Dynamické generování úkolů: Na základě přidaných úkolů se zobrazí seznam na stránce.
- Validace dat: Ověření, že formulář obsahuje všechny potřebné údaje, a zobrazení chybové hlášky, pokud nejsou.

***

## 6.1 Šablony ve Flasku
Funkce, které jsou svázány s URL, mohou vracet různé hodnoty. Jedna z nich je HTML kód. Napřiklad zde je ukázka Flask aplikace s jednou routou, která vrací formátovaný text `Hello World`.
```python
from flask import Flask
app = Flask(__name__)

@app.route('/')
def index():
   return '<html><body><h1>Hello World !</h1></body></html>'

if __name__ == '__main__':
   app.run(debug = True)
```
Nicméně vracet HTML dokumenty tímto způsobem je nepraktické a proto ve Flasku používáme šablony. Tyto šablony se ukládají do složky `templates`, kde Flask automaticky vyhledává soubory s HTML kódem. Pomocí funkce Flasku `render_template()` se šablony vykreslí a pošlou uživateli. Funkci můžete předat data, která jsou pak dostupná v HTML dokumentu.
```python
from flask import Flask
app = Flask(__name__)

@app.route('/')
def index():
   return render_template('hello.html')

if __name__ == '__main__':
   app.run(debug = True)
```
Následující kód je pak v souboru `templates/hello.html`:
```html
<!DOCTYPE html>
<html lang="en">
<body>
    <h1>Hello World !</h1>
</body>
</html>
```

## 6.2 Jinja2 šablonovací engine
Šablonovací engine je nástroj, který umožňuje oddělit logiku aplikace od prezentace (HTML kódu). V praxi to znamená, že můžete mít dynamický obsah (např. proměnné, cykly, podmínky) přímo v HTML šabloně. Díky tomu můžete vytvářet flexibilní a opakovaně použitelné části kódu.

[Jinja2](https://jinja.palletsprojects.com) je výchozí šablonovací engine používaný ve Flasku. Umožňuje jednoduše kombinovat Python kód s HTML a vytvářet dynamické webové stránky.

### Proměnné v Jinja2
Proměnné lze vložit do HTML šablon a nahradit je reálnými daty z Pythonu. To se dělá pomocí dvou složených závorek `{{ ... }}`.

**Ukázka**:

Soubor `templates/index.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Proměnné v Jinja2</title>
</head>
<body>
    <h1>Vítejte, {{ username }}!</h1>
    <p>Dnes je: {{ date }}</p>
</body>
</html>
```

Soubor `app.py`:
```python
from flask import Flask, render_template
from datetime import datetime

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html', username="Marie", date=datetime.now())

if __name__ == "__main__":
    app.run(debug=True)
```

### Podmínky v Jinja2
Pomocí Jinja2 můžete v šablonách používat podmínky, které rozhodují, co se má zobrazit podle logiky aplikace. Podmínky mají stejnou logiku jako podmínky, které znáte z Pythonu (`if` + `elif` + `else`). Zápis je ale trochu jiný a také je nutné podmínku ukončit pomocí `endif` bloku.
```html
<p>
    {% if user_is_logged_in %}
        Vítejte zpět, {{ username }}!
    {% else %}
        <a href="/login">Přihlásit se</a>
    {% endif %}
</p>
```

### Cykly v Jinja2
Pro iteraci (procházení) seznamů můžete v Jinja2 použít cyklus `for`. Následující ukázka zachycuje procházení seznamu úkolů a jejich vypsání na stránce. 
```html
<ul>
    {% for task in tasks %}
        <li>{{ task }}</li>
    {% endfor %}
</ul>
```
Seznam úkolů se vypíše tzv. dynamicky, tedy data nejsou staticky (pevně) součástí HTML dokumentu, ale generují se podle obsahu proměnné `tasks`, která je předána funkci `tasks`.
```python
@app.route('/tasks')
def tasks():
    tasks = ["Nakoupit", "Vyprat prádlo", "Napsat článek"]
    return render_template('tasks.html', tasks=tasks)
```

## 6.3 Rozdělení HTML kódu do šablon
Pomocí šablon lze rozdělit HTML kód a vytvářet opakovaně použitelné komponenty. Tím dosáhnete čistého a organizovaného kódu, který se snadno udržuje. Hlavní výhody tohoto přístupu tedy jsou:
- **Znovupoužitelnost**: Mnoho částí webových stránek, jako je například hlavička nebo patička, se opakuje na různých stránkách. Místo psaní stejného kódu několikrát můžeme tyto části oddělit a opakovaně je použít ve více šablonách.
- **Snadná úprava**: Jakmile oddělíme jednotlivé části stránky (hlavička, patička, obsah atd.), stačí upravit jeden soubor (šablonu) a změny se automaticky projeví všude tam, kde tuto šablonu používáme.
- **Čistý a přehledný kód**: Oddělení HTML kódu do menších, přehlednějších částí umožňuje udržovat aplikaci přehlednou a jednodušeji čitelnou.

Typickým způsobem rozdělení HTML kódu je vytvoření základního layoutu a potom šablon pro jednotlivé stránky. Základní layout může obsahovat prvky jako hlavička, navigace a patička, které se opakují na každé stránce, zatímco obsah každé stránky bude definován v samostatných šablonách.

Flask nám umožňuje používat **bloky** (block) v Jinja2 šablonách, které označují části kódu, které můžeme měnit podle potřeby.

Můžeme si vytvořit HTML dokument se základním rozložením naší stránky (záhlaví, navigace, zápatí) a na místo, kde budeme mít obsah dát blok `{% block <název> %}`, kterým dáváme najevo, že zde se bude postupně vkládat obsah jednotlivých stránek.
```html
<body>
    <header>...</header>

    <main>
        {% block content %}
        <!-- Sem bude vkládán konkrétní obsah jednotlivých stránek -->
        {% endblock %}
    </main>

    <footer>...</footer>
</body>
```
Tento obsah pak máme uložen odděleně v druhém HTML dokumentu.
```html
{% extends "layout.html" %}

{% block content %}
    <h2>Vítejte!</h2>
    <p>Toto je úvodní stránka.</p>
{% endblock %}
```
V ukázce nejdříve říkáme, že tento HTML dokument rozšiřuje dokument s názvem `layout.html` a následně definujeme obsah, který se má vložit. Flask pak dokumenty poskládá do sebe a zobrazí jako jednu stránku.

### Příklad
**Flask ukázka 5** je ukázka velmi jednoduchého použití šablon. Webová aplikace obsahuje základní šablonu `layout.html` a další 3 šablony s obsahem.

### Příklad
**Flask ukázka 6** je ukázka použití šablon a Jinja2 výrazů. Jedná se o jednoduchou stránku, která zobrazuje seznam kurzů, do kterých je uživatel registrován.

## 6.4 HTML formuláře ve Flasku
Flask nabízí jednoduchý způsob, jak pracovat s HTML formuláři a zpracovávat data zadaná uživateli. V této kapitole se podíváme na to, jak odesílat data z formulářů, jak tato data validovat a jak pracovat s POST požadavky ve Flasku.

### Odesílání dat z formulářů
Formuláře v HTML jsou základní způsob, jak získat data od uživatelů. Flask používá metody HTTP, aby umožnil přenos těchto dat na server.

**Příklad jednoduchého formuláře**

HTML formulář, který získává od uživatele jméno a příjmení:
```html
<form action="/add_user" method="POST">
    <div class="form-group">
        <label for="name">Jméno:</label>
        <input type="text" name="name" id="name" class="form-control" required>
    </div>
	    <div class="form-group">
        <label for="surname">Příjmení:</label>
        <input type="text" name="surname" id="surname" class="form-control" required>
    </div>
    <button type="submit" class="btn btn-primary">Přidat uživatele</button>
</form>
```
Atribut `action="/add_user"` určuje, kam se data z formuláře odešlou (URL). Atribut `method="POST"` říká, že data budou odeslána pomocí metody POST, což znamená, že se nebudou zobrazovat v URL a budou odeslána bezpečněji.

### Zpracování POST požadavku
Ve Flasku můžeme zpracovat data z formuláře pomocí routy, pro kterou nastavíme POST metodu.
```python
from flask import Flask, request, redirect, url_for, render_template

app = Flask(__name__)

# Simulovaná databáze uživatelů
users = []

@app.route("/")
def index():
    return render_template("index.html", users=users)

# Route pro zpracování formuláře
@app.route("/add_user", methods=["POST"])
def add_user():
    # Získání dat z formuláře
    name = request.form.get("name")
    surname = request.form.get("surname")
    
    # Uložení nového uživatele do seznamu
    users.append({"name": name, "surname": surname})
    
    # Přesměrování na hlavní stránku po přidání uživatele
    return redirect(url_for("index"))

if __name__ == "__main__":
    app.run(debug=True)
```
Pomocí `name = request.form.get("name")` získáme hodnotu zadanou v políčku pro "Jméno" (id = name). `request.form` obsahuje všechna odeslaná data z formuláře. Pomocí `methods=["POST"]` říkáme Flasku, že tato routa bude zpracovávat pouze požadavky typu POST. Nakonec pomocí `redirect(url_for("index"))` přesměrujeme uživatele naší stránky zpět na hlavní stránku.

### Jednoduchá validace formulářů
Validace dat z formulářů je důležitá pro zajištění toho, že uživatel zadává správné údaje. Můžeme validovat data přímo v Pythonu nebo používat knihovny, jako je **Flask-WTF**, které zjednodušují práci s validací formulářů. Můžeme např. zkontrolovat, zda uživatel vyplnil všechny požadované informace a pokud ne, tak vrátíme chybu. V tomto případě vracíme chybu s kódem 400 Bad Request (špatný požadavek).
```python
@app.route("/add_user", methods=["POST"])
def add_user():
    # Získání dat z formuláře
    name = request.form.get("name")
    surname = request.form.get("surname")

    # Jednoduchá validace (jméno a příjmení nesmí obshovat čísla)
    if any(char.isdigit() for char in name):
        return "Chyba: Jméno nesmí obsahovat číslice", 400
    if any(char.isdigit() for char in surname):
        return "Chyba: Příjmení nesmí obsahovat číslice", 400
    
    # Uložení uživatele, pokud je validace úspěšná
    users.append({"name": name, "surname": surname})
    return redirect(url_for("index"))
```

### Příklad
**Flask ukázka 7** je ukázka použití formuláře s jednoduchou validací.

### Flask-WTF a pokročilá validace formulářů
**Flask-WTF** je rozšíření pro Flask, které využívá knihovnu **WTForms** a zjednodušuje práci s formuláři a jejich validací. [Flask-WTF](https://flask-wtf.readthedocs.io/en/1.2.x/) je knihovna jako každá jiná, proto ji musíme nejdříve nainstalovat.
```bash
pip install flask-wtf
```

Samotný formulář se pak vytvoří v Python souboru.
```python
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class UserForm(FlaskForm):
    name = StringField("Jméno", validators=[DataRequired()])
    surname = StringField("Příjmení", validators=[DataRequired()])
```
Kde `FlaskForm` představuje třídu pro formuláře. Můžeme definovat jednotlivá pole formuláře jako je textové pole `StringField`. Dále definujeme seznam validárů, které budou na pole použity, např. `DataRequired()` kontroluje, zda bylo pole vyplněno. Více informací o jednotlivých polích a validátorech najdete v dokumentaci pro [VTForms](https://wtforms.readthedocs.io).

```python
@app.route("/", methods=["GET", "POST"])
def index():
    form = UserForm()
    if form.validate_on_submit():
        # Uložení uživatele, pokud je validace úspěšná
        users.append({"name": form.name.data, "surname": form.surname.data})
        return redirect(url_for("index"))
    return render_template("index.html", users=users, form=form)
```
Zpracování formuláře probíhá tak, že metoda `validate_on_submit()` zkontroluje, zda byl formulář odeslán a zda validace proběhla v pořádku. Pokud ano, pak uložíme uživatele do seznamu `users`. 

HTML šablona pro formulář pak obsahuje kód `form.hidden_tag()`, který chrání proti CSRF útokům (Cross-Site Request Forgery). Aby nedošlo k chybě ve Flasku, musíme nastavit tzv. secret key v `app.py`.
```python
app = Flask(__name__)
app.secret_key = 'your_secret_key'
```
Hodnota tohoto tajného klíče může být jakákoliv hodnota, pro naše potřeby není nutné klíč složitě nastavovat a může se použít jednoduché heslo.
```html
<form method="POST">
	{{ form.hidden_tag() }}
	<div class="form-group">
		{{ form.name.label }}
		{{ form.name(class="form-control") }}
	</div>
	<div class="form-group">
		{{ form.surname.label }}
		{{ form.surname(class="form-control") }}
	</div>
	<button type="submit" class="btn btn-primary">Přidat uživatele</button>
</form>
```

### Příklad
**Flask ukázka 8** je ukázka použití formuláře s Flask-WTF validací.
