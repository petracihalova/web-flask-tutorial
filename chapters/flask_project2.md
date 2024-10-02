# Projekt: My TODO list část 2
- Implementace formuláře pro přidávání úkolů: Formulář na hlavní stránce, který bude odesílat data pomocí POST metody.
- Dynamické generování úkolů: Na základě přidaných úkolů se zobrazí seznam na stránce.
- Ukládání a validace dat: Ověření, že formulář obsahuje všechny potřebné údaje, a zobrazení chybové hlášky, pokud nejsou.

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
    task = request.form["title"]
    details = request.form["details"]
    priority = request.form["priority"]
    tasks.append((task, details, priority))

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
    task = request.form["title"]
    details = request.form["details"]
    priority = request.form["priority"]
    tasks.append((task, details, priority))

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

## Zobrazení seznamu vložených úkolů
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

Zobrazení zadaných úkolů zatím není příliš pěkné, ale to si upravíme později. Nezapomínejte, že úkoly si ukládáme do paměti počítače do proměnné `tasks`, takže když restartujeme náš Flask server, o všechna data přijdeme.

... work in progress ...