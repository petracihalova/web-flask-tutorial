# Projekt: My TODO list část 2
- Implementace formuláře pro přidávání úkolů: Formulář na hlavní stránce, který bude odesílat data pomocí POST metody.
- Dynamické generování úkolů: Na základě přidaných úkolů se zobrazí seznam na stránce.
- Validace dat: Ověření, že formulář obsahuje všechny potřebné údaje, a zobrazení chybové hlášky, pokud nejsou.

## Spuštění aplikace
Otevřete si složku s projektem a ve virtuálním prostředí si pusťte aplikaci My TODO list. V prohlížeči zkontrolujte, že aplikace funguje. V tuto chvíli máme připravenou základní strukturu aplikace a nastaveny Bootstrap styly. V této části si přidáme formulář pro přidávání nových úkolů, nastavíme si validace pro jednotlivá pole formuláře a přidáme si dynamické generování vložených úkolů. 

## Formulář pro přidání úkolu
Do HTML dokumentu si přidáme formulář pro přidání nového úkolu. Formulář bude obsahovat textové pole pro přidání názvu úkolu, další textové polo pro detaily úkolu, rozbalovací seznam (tzv. dropdown menu) s prioriami (vysoká, střední, nízká) a tlačítko pro přidání úkolu. Přidáme styly dle Bootstrap [dokumentace](https://getbootstrap.com/docs/5.3/forms/overview/).
```html
<form action="" method="POST">
    <div class="form-group mb-3">
        <input type="text" name="title" placeholder="Název úkolu" class="form-control" required>
    </div>
    <div class="form-group mb-3">
        <input type="text" name="details" placeholder="Podrobnosti" class="form-control">
    </div>
    <div class="form-group mb-3">
        <select name="priority" class="form-control">
            <option value="high">Vysoká</option>
            <option value="medium">Střední</option>
            <option value="low">Nízká</option>
        </select>
    </div>
    <button type="submit" class="btn btn-primary mb-4">Přidat úkol</button>
</form>
```

## Routa pro přidání úkolu
Abychom mohli data z formuláře zpracovat, vytvoříme si novou routu `/add` a novou funkci `add_task()`. Nové úkoly budeme prozatím ukládat do paměti do seznamu `tasks`. Později si ukážeme, jak data ukládat do databáze.
```python
tasks = []

@app.route("/add", methods=["POST"])
def add_task():
    title = request.form["title"]
    details = request.form["details"]
    priority = request.form["priority"]
    tasks.append((title, details, priority))

    return redirect(url_for("index"))
```
Jako metodu pro tuto routu nastavíme POST, protože budeme odesílat data z formuláře. `request` nám pomůže získat data z formuláře a uložit je do námi definovaných proměnných. Získaná data z formuláře uložíme jako n-tici do seznamu `tasks`. Funkce `redirect` přesměruje uživatele na jinou stránku po odeslání formuláře. `url_for("index")` vrátí URL pro funkci `index`, která vykresluje hlavní stránku s úkoly. Po přidání nového úkolu jsou hodnoty zadané do formuláře zpracovány a uživatel je přesměrován zpět na hlavní stránku. Po všech úpravách bude soubor `app.py` vypadat takto:
```python
from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Simulovaná databáze pro úkoly (seznam)
tasks = []

# Route pro zobrazení úvodní stránky
@app.route("/")
def index():
    return render_template("index.html")

# Routa pro přidání nového úkolu
@app.route("/add", methods=["POST"])
def add_task():
    title = request.form["title"]
    details = request.form["details"]
    priority = request.form["priority"]
    tasks.append((title, details, priority))

    return redirect(url_for("index"))

if __name__ == '__main__':
    app.run(debug=True, port=5678)
```

Aby vše správně fungovalo, musíme ještě ve formuláře v HTML dokumentu přidat do atributu `action` správnou URL, kam budou data odeslána při odeslání formuláře. 
```html
<form action="/add" method="POST">
```
Je dobrou praxí, že místo konkrétní URL se použije funkce Jinja2, která dynamicky vygeneruje URL pro Flask routu `add_task`.
```html
<form action="{{ url_for('add_task') }}" method="POST">
```

## Zobrazení seznamu vložených úkolů pomocí `ul`
I když to zatím není vidět, tak úkoly, které v naší aplikaci vytváříme, se ukládají do paměti počítače do seznamu `tasks`. Pojďme si je v naší aplikaci zobrazit. Jako první přidáme do routy pro hlavní stránku seznam `tasks` jako atribut funkce `render_template()`.
```python
@app.route("/")
def index():
    return render_template("index.html", seznam_ukolu=tasks)
```

Tímto jsme si "poslali" náš seznam do proměnné `seznam_ukolu`, která je nyní dostupná v HTML dokumentu `index.html`. Hodnoty z této proměnné si můžeme zobrazit pomocí Jinja2 syntaxe `{{ seznam_ukolu }}`, kterou si přidáme místo původních pevně zadaných úkolů.
```html
<!-- Seznam úkolů -->
<h2>Seznam úkolů</h2>
{{ seznam_ukolu }}
```

Zobrazení zadaných úkolů zatím není příliš pěkné, ale to si za malou chvilku upravíme. Nezapomínejte, že úkoly si ukládáme do paměti počítače do proměnné `tasks`, takže když restartujeme náš Flask server, o všechna data přijdeme.

Jedna z možností, jak úkoly zobrazit se pomocí HTML seznamu. Základem bude element `ul` a každá položka seznamu `li` bude dynamicky generována pomocí Jinja2.
```html
<!-- Seznam úkolů -->
<h2>Seznam úkolů</h2>
<ul class="list-group">
    {% for ukol in seznam_ukolu %}
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <div>
                <strong>{{ ukol[0] }}</strong> - {{ ukol[1] }} ({{ ukol[2] }})
            </div>
        </li>
    {% endfor %}
</ul>
```
Místo textového vyjádření priority můžeme přidat znak nebo ikonku a prioritu definovat barvou. Existuje milion způsobů, jak to udělat a my si ukážeme jen jeden, záleží jen na vaší fantazii a preferencích.
```html
<!-- Seznam úkolů -->
<h2>Seznam úkolů</h2>
<ul class="list-group">
    {% for ukol in seznam_ukolu %}
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <div>
                {% if ukol[2] == "high" %}
                    {% set priority_class = 'text-danger' %}
                {% elif ukol[2] == "medium" %}
                    {% set priority_class = 'text-warning' %}
                {% elif ukol[2] == "low" %}
                    {% set priority_class = 'text-success' %}
                {% endif %}
                <span class="{{priority_class}}">&#9673;</span>
                
                <strong>{{ ukol[0] }}</strong> - {{ ukol[1] }}
            </div>
        </li>
    {% endfor %}
</ul>
```
V této ukázce si podle hodnoty v `ukol[2]`, kde je uložena informace o prioritě úkolu, nastavíme hodnotu pro proměnnou `priority_class` na barvu textu pomocí Bootstrap stylů ([dokumentace](https://getbootstrap.com/docs/5.3/customize/color/#theme-colors)). Vybraný styl pak nastavíme v elementu `span` a obarvíme jim znak &#9673;, který je [zapsán Unicode kódem](https://www.htmlsymbols.xyz/unicode/U+25C9) `\&#9673;`.

Zápis můžeme zkrátit 
```html
<ul class="list-group">
    {% for ukol in seznam_ukolu %}
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <div>
                {% set priority_class = 'text-danger' if ukol[2] == 'high' else 'text-warning' if ukol[2] == 'medium' else 'text-success' %}
                <span class="{{priority_class}}">&#9673;</span>
                
                <strong>{{ ukol[0] }}</strong> - {{ ukol[1] }}
            </div>
        </li>
    {% endfor %}
</ul>
```
V tomto případě je použita rozhodovací struktura, kterou můžete najít pod pojmy [podmíněný operátor nebo ternární operátor](https://realpython.com/python-conditional-statements/#conditional-expressions-pythons-ternary-operator) (conditional operator / ternary operator).
```python
vysledek = hodnota_A if podmínka else hodnota_B
```

## Zobrazení seznamu vložených úkolů pomocí `table`
Druhý způsob, který si ukážeme, je vložení seznamu úkolů jako tabulky.
```html
<h2>Tabulka s úkoly</h2>
<table class="table">
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
            <td>{{ ukol[0] }}</td>
            <td>{{ ukol[1] }}</td>
            <td>{{ ukol[2] }}</td>
        </tr>
        {% endfor %}
    </tbody>
</table>
```

Pro tabulky existuje Javascript knihovna [DataTables](https://datatables.net), díky které získáte rychle krásné tabulky s mnoha funkcemi. Tato knihovna je velmi oblíbená a má kolem sebe širokou komunitu, takže k ní kromě oficiální dokumentace existuje řada návodů.

My si do našeho projektu vložíme tabulku se [základní konfigurací](https://datatables.net/examples/basic_init/zero_configuration.html). Nejdříve si do hlavičky `head` vložíme odkaz na styly, které DataTables používají.
```html
<head>
    ...
    <!-- DataTables CSS -->
     <link rel="stylesheet" href="//cdn.datatables.net/2.1.7/css/dataTables.dataTables.min.css">
</head>
```
Dále si na konec HTML dokumentu (pod odkazy na Bootstrap skrtipy) vložíme odkazy na skripty DataTables.
```html
    ...
    <!-- DataTables scripty -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="//cdn.datatables.net/2.1.7/js/dataTables.min.js"></script>
    <script>let table = new DataTable('#tasks');</script>
</body>
```
První řádek načítá jQuery, což je knihovna JavaScriptu a DataTables ji potřebuje pro své fungování. jQuery poskytuje jednoduché API pro manipulaci s HTML dokumenty. Druhý řádek načítá samotnou knihovnu DataTables, která poskytuje všechny funkce spojené s vylepšením tabulek (stránkování, filtrování, vyhledávání, atd.). Poslední řádek obsahuje skript, který inicializuje novou DataTable, v tomto případě s `id = tasks`. Stejné id pak musíme vložit i do naší již existující HTML tabulky `<table id="tasks" class="table">`. Název pro tabulku si můžeme určit podle své fantazie, ale vždy musí být stejný na obou místech.

<img src="images/datatable.png" alt="Ukázka DataTable" width="500">


## Vytvoření třídy pro úkol
Aby se nám s jednotlivými úkoly lépe pracovalo, bylo by lepší odkazovat se na jejich vlastnosti (titul, detaily, prioritu) pomocí pojmenovaných atributů a ne pomocí indexů (`ukol[0]`). Na začátku souboru `app.py` si pro tyto účely vytvoříme třídu `Task`.
```python
# Třída pro úkol
class Task:
    def __init__(self, title, details, priority):
        self.title = title
        self.details = details
        self.priority = priority
```
A upravíme si kód, kde úkol ukládáme do naší provizorní databáze = do seznamu `tasks`.
```python
tasks.append(Task(title, details, priority))
```

V souboru `index.html` upravíme odkazy na atributy úkolů (např. z `ukol[0]` na `ukol.title`) a to jak v seznamu úkolů, tak i v tabulce s úkoly. Zde ukázka kódu pro seznam úkolů po změně.
```html
<ul class="list-group">
    {% for ukol in seznam_ukolu %}
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <div>
                {% set priority_class = 'text-danger' if ukol.priority == 'high' else 'text-warning' if ukol.priority == 'medium' else 'text-success' %}
                <span class="{{priority_class}}">&#9673;</span>
                
                <strong>{{ ukol.title }}</strong> - {{ ukol.details }}
            </div>
        </li>
    {% endfor %}
</ul>
```

## Flask-WTF a validace formuláře
Jako další krok přidáme do našeho projektu formulář pomocí knihovny Flask-WTF. V souboru `app.py` si vytvoříme formulář jako novou třídu a definujeme všechna naše pole.
```python
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField
from wtforms.validators import DataRequired, Length

class TaskForm(FlaskForm):
    title = StringField(
        "Název úkolu",
        validators=[DataRequired(), Length(min=3, max=100)],
    )
    details = TextAreaField(
        "Podrobnosti", 
        validators=[Length(max=1000)],
    )
    priority = SelectField(
        "Priorita",
        choices=[("high", "Vysoká priorita"), ("medium", "Střední priorita"), ("low", "Nízká priorita")],
        default="medium",
        validators=[DataRequired()],
    )
```
Pro název úkolu si zvolíme standarní textové pole `StringField`. Pro toto pole definujeme dva validátory. `DataRequeired()` nám zajistí, že toto pole bude povinné a nebude možné vytvořit nový úkol bez zadané hodnoty. Validátor `Length(min=3, max=100)` se pak postará o to, že minimální požadované délka textu budou 3 znaky a maximální 100 znaků.

Pole pro podrobnosti úkolu bude typu `TextAreaField` a nebude povinné (validátor `DataRequired` zde nebude), ale nastavíme zde maximální délku vloženého textu na 1000 znaků.

Poslední pole pro výběr priority úkolu bude typu `SelectField` a pomocí atributu `choices` definujeme seznam položek, které budou v tomto dropdownu k dispozici. První hodnota ve dvojici je identifikátor (klíč), se kterým budeme pracovat v kódu. Druhá hodnota ve dvojici je popisek, který se bude zobrazovat na naší webové stránce. Pomocí atributu `default` si můžeme určit výchozí hodnotu. Pokud tento atribut není definován, je automaticky výchozí hodnotou první hodnota ze seznamu možných hodnot. Také toto pole nastavíme jako povinné.

Po vložení formuláře pomocí Flask-WTF již nebudeme potřebovat funkci `add_task()` a routu `/add` a zpracování formuláře proběhne v rámci funkce `index()`.
```python
@app.route("/", methods=["GET", "POST"])
def index():
    form = TaskForm()
    if form.validate_on_submit():
        # Uložení úkolu, pokud je validace úspěšná
        tasks.append(Task(form.title.data, form.details.data, form.priority.data))
        return redirect(url_for("index"))
    return render_template("index.html", seznam_ukolu=tasks, formular=form)
```

Další úpravy budou potřeba v souboru `index.html`, kde vložíme formulář ve struktuře potřebné pro zpracování knihovnou Flask-WTF.
```html
<form method="POST">
    {{ formular.hidden_tag() }}
    <div class="form-group mb-3">
        {{ formular.title.label }}
        {{ formular.title(class="form-control") }}
    </div>
    <div class="form-group mb-3">
        {{ formular.details.label }}
        {{ formular.details(class="form-control") }}
    </div>
    <div class="form-group mb-3">
        {{ formular.priority.label }}
        {{ formular.priority(class="form-control") }}
    </div>
    <button type="submit" class="btn btn-primary">Přidat úkol</button>
</form>
```

Pokud budeme chtít náš formulář zjednodušit, můžeme odstranit popisky jednotlivých polí, např. `{{ formular.title.label }}` a místo toho přidat tzv. placeholder = text, který se zobrazí v poli formuláře, ale nezůstane uložen, když uživatel formulář pošle ke zpracování. Ve Flask-WTF lze nastavit takový placeholder pomocí atributu `render_kw`, který umožňuje přidat HTML atributy k formulářovému poli. Např. pro pole s názvem úkolu:
```python
title = StringField(
    "Název úkolu",
    validators=[DataRequired(), Length(min=3, max=100)],
    render_kw={"placeholder": "Název úkolu"},
)
```

## Chybové zprávy
Pokud do formulářových polí vložíme nesprávné údaje (nebo se pokusíme taková data vložit) a máme nastaveny správně validátory, formulář nám nedovolí data vložit. Např. validátor `Length(min=3, max=100)` zajistí, že do pole pro název úkolu nelze vložit text delší než 100 znaků. Pokud na klávesnici napíšeme 101. znak, tak se do názvu už nepřidá. Pokud se pokusíme do pole vložit text delší než 100 znaků např. pomocí CTRL+C a CTRL+V, tak se vloží pouze prvních 100 znaků a zbytek se zahodí.

Naopak pokud se pokusíme uložit úkol s názvem, který má méně než 3 znaky, objeví se chybová hláška, která nás informuje, co je špatně.

My si teď ukážeme, jak si nastavit vlastní chybovou hlášku pro náš formulář. Každý validátor má přednastavené výchozí zprávy, které ve správný okamžik zobrazí uživateli. V případě validátoru `DataRequired` je to `This field is required.`. Pokud se pokusíme odeslat formulář (uložit nový úkol) bez vyplněného pole pro název úkolu, zobrazí se ale zpráva `Please fill in this field.`. Pojďme si to vysvětlit.

Když Flask vytvoří formulář, který jsme si definovali pomocí třídy `TaskForm`, nastaví v HTML stránce tomuto formuláři vlastnosti podle našeho nastavení Flask-WTF formuláře. Např. validátor `Length(min=3, max=100)` způsobí, že se do formulářového pole pro název úkolu automaticky nastaví vlastnosti `maxlength="100" minlength="3"`. A validátor `DataRequired` zase přidá do pole vlastnost `required`. Když pak webový prohlížeč při odeslání prázdného formuláře kontroluje, zda byla tato nastavení splněna, zjistí, že pole je povinné (protože je v HTML nastaveno `required`) a zobrazí hlášku, která je pro tuto situaci nastavena = `Please fill in this field.`. Validace proběhla na úrovni prohlížeče.

Pokud bychom chtěli, aby validace proběhla na úrovni serveru a použila se tak chybová hláška nastavená Flaskem, tak musíme ve formuláři nastavit vlastnost `novalidate`, která zabrání jeho validaci na úrovni prohlížeče. 
```html
<form method="POST" novalidate>
```
Dále je potřeba do HTML formuláře vložit kód, který chybovou hlášku zobrazí.
```html
<div class="form-group mb-3">
    {{ formular.title(class="form-control") }}
    {% for error in formular.title.errors %}
        <div class="text-danger">{{ error }}</div>
    {% endfor %}
</div>
```
For cyklus zajistí, že se zobrazí všechny chybové hlášky, pokud by jich bylo více. Nyní již po odeslání prázdného formuláře uvidíme výchozí chybu `This field is required.`. Vlastní chybovou hlášku si můžeme nastavit přímo ve třídě pro formulář přidáním atributu `message=<zpráva>` do validátoru `DataRequired`.
```python
class TaskForm(FlaskForm):
    title = StringField(
        "Název úkolu",
        validators=[DataRequired(message="Toto pole je povinné."), Length(min=3, max=100)],
        render_kw={"placeholder": "Název úkolu"},
    )
    ...
```

## Přesun tabulky na vlastní stránku
Pro zobrazení seznamu úkolů nám bohatě stačí jen jedna možnost - zobrazení úkolů pomocí elementu `ul` nebo v tabulce `table`. Abychom si nemuseli vybírat hned, přesuneme si tabulku s úkoly na vlastní stránku a tím si procvičíme práci se šablonami a vytvoření nové routy.

Ve složce `tamplates` si vytvoříme soubor `base.html`, který bude sloužit jako základní layout se záhlavím, navigací a zápatím (bude se opakovat na každé stránce) a obsah budeme definovat v samostatných šablonách. Nejdříve zkopírujeme obsah souboru `index.html` do souboru `base.html` a v souboru `base.html` odstraníme kontejner s hlavním obsahem a místo něj dáme Jinja2 blok `{% block content %} {% endblock %}`, kterým dáváme najevo, že zde se bude vkládat obsah jednotlivých stránek.

V souboru `index.html` necháme jen samotný obsah stránky a ten obalíme Jinja2 kódem tak, aby Flask věděl, že tento HTML dokument rozšiřuje dokument `base.html`. Bude to vypadat nějak takto:
```html
{% extends "base.html" %}

{% block content %}
<!-- Hlavní obsah -->
<div>
    <!-- Formulář pro přidání úkolu -->
    <form method="POST" novalidate>
        ...
    </form>
    <!-- Seznam úkolů -->
    <h2 class="my-4">Seznam úkolů</h2>
    <ul class="list-group">
        ...
    </ul>
    <h2 class="my-4">Tabulka s úkoly</h2>
    <table id="tasks" class="table">
        ...
    </table>
</div>
{% endblock %}
```
Po úpravách aktualizujte stránku v prohlížeči. Pokud se nic nestalo, tak je vše v pořádku. Stránka musí fungovat stále stejně jako předtím, ale nyní jí máme rozdělenu do dvou šablon. 

Nyní si ve složce `templates` vytvořte nový soubor `table.html` a přesuňte do něj tabulku se seznamem úkolů.
```html
{% extends "base.html" %}

{% block content %}
<!-- Hlavní obsah -->
<div>
    <!-- Seznam úkolů v tabulce -->
    <h2 class="my-4">Tabulka s úkoly</h2>
    <table id="tasks" class="table">
        ...
    </table>
</div>
{% endblock %}
```

V souboru `app.py` přidáme novou routu pro zobrazení tabulky.
```python
@app.route("/table")
def show_table():
    return render_template("table.html", seznam_ukolu=tasks)
```

A upravíme navigaci tak, aby první položka se odkazovala na úvodní stránku `/` a druhá na novou routu `/table`.
```html
<a class="nav-link active" aria-current="page" href="/">Home</a>
<a class="nav-link" href="/table">Tabulka</a>
<a class="nav-link" href="#">Menu 3</a>
<a class="nav-link disabled" aria-disabled="true">Menu 4</a>
```

# Shrnutí
Po druhé části náš projekt vypadá takto:

### Úvodní stránka:
<img src="images/flask_todo_app_version2_home.png" alt="Flask TODO aplikace ukázka 2 stránka Home" width="500">

### Stránka se seznamem úkolů v tabulce:
<img src="images/flask_todo_app_version2_table.png" alt="Flask TODO aplikace ukázka 2 stránka Home" width="500">

Struktura projektu:
```bash
/flask-todo-list
│
├── /static
│   └── styles.css
├── /templates
│   ├── base.html
│   ├── index.html
│   └── table.html
└── app.py
```

Soubor `app.py`:
```python
from flask import Flask, render_template, request, redirect, url_for
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField
from wtforms.validators import DataRequired, Length

app = Flask(__name__)
app.secret_key = "your_secret_key"

# Třída pro úkol
class Task:
    def __init__(self, title, details, priority):
        self.title = title
        self.details = details
        self.priority = priority

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

# Simulovaná databáze pro úkoly (seznam)
tasks = []

@app.route("/", methods=["GET", "POST"])
def index():
    form = TaskForm()
    if form.validate_on_submit():
        # Uložení úkolu, pokud je validace úspěšná
        tasks.append(Task(form.title.data, form.details.data, form.priority.data))
        return redirect(url_for("index"))
    return render_template("index.html", seznam_ukolu=tasks, formular=form)

@app.route("/table")
def show_table():
    return render_template("table.html", seznam_ukolu=tasks)

if __name__ == "__main__":
    app.run(debug=True)
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
                            <a class="nav-link active" aria-current="page" href="/">Home</a>
                            <a class="nav-link" href="/table">Tabulka</a>
                            <a class="nav-link" href="#">Menu 3</a>
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
