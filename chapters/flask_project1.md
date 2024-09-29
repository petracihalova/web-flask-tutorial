# Projekt: My TODO list část 1
- Vytvoření základní struktury aplikace
- Přidání první HTML stránky se seznamem úkoů a první routy pro její zobrazení.
- Přidání stylů pomocí frameworku Bootstrap

## Základní struktura aplikace "TODO list"
Pro projekt si vytvořte novou složku s názvem `flask-todo-list` a uvnitř si vytvořte tuto základní strukturu:
```bash
/flask-todo-list
│
├── /static
│   └── styles.css
├── /templates
│   └── index.html
└── app.py
```
Soubory budou zatím prázdné.

## Virtuální prostředí a instalace Flasku
Otevřete si složku `flask-todo-list` v terminálu a vytvořte si nové virtuální prostředí. Prostředí si aktivujte a nainstalujte si do něj Flask.


## Spuštění Flask aplikace
Do soubouru `app.py` si vložte základní kód pro spuštění Flasku s routou `/`, která bude volat funkci `index()`. Funkce zatím vrací jednoduchou
textovou zprávu.
```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    return "Tady bude moje TODO aplikace!"

if __name__ == '__main__':
    app.run(debug=True)
```
Aplikaci si spusťe, otevřete si okno prohlížeče a zkontrolujte výsledek.

## Zobrazení seznamu úkolů
Jako první si vytvoříme HMTL stránku `index.html`, která bude obsahovat základní rozložení naší stránky - záhlaví, jednoduché horizontální menu se třemi položkami, tělo s obsahem a zápatí. Jako obsah budeme vypisovat seznam našich úkolů, které budou zatím tzv. hardcoded, tedy pevně zapsány (zatím nebudou dynamicky generovány nebo načítány z databáze).

Výsledný HTML dokument může vypadat třeba takto:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ToDo List</title>
</head>

<body>
    <div>
        <!-- Záhlaví -->
        <header>
            <h1>My TODO list</h1>
        </header>

        <!-- Horizontální menu -->
        <nav>
            <ul>
                <li>Menu 1</li>
                <li>Menu 2</li>
                <li>Menu 3</li>
            </ul>
        </nav>

        <!-- Hlavní obsah -->
        <div>
            <!-- Seznam úkolů -->
            <h2>Seznam úkolů</h2>
            <ul>
                <li>Koupit jablka</li>
                <li>Vyžehlit prádlo</li>
                <li>Vyvenčit psa</li>
            </ul>
        </div>
    </div>
    <div>
        <!-- Zápatí -->
        <footer>
            <p>&copy; 2024 My TODO List</p>
        </footer>
    </div>
</body>
</html>
```
Nyní otevřete okno prohlížeče a zkontrolujte, že vše funguje, jak má? Ne? Ano máte pravdu, změna zatím není vidět, protože musíme ještě říct Flasku, aby naši novou HTML stránku zobrazil. Musíme tedy udělat úpravu souboru `app.py`.

Pro tento úkol použijeme metodu `render_template()`, které jako argument předáme název HTML dokumentu, tedy `index.html` ve formě řetězce (stringu). Flask očekává, že tento soubor najde ve složce `templates`. Naše funkce `index()` teď bude vracet místo jednoduchého textu `render_template("index.html")`.
Tato metoda je součástí knihovny Flask a proto je také nutné jí importovat. O šablonách (templates) a práci s nimi se budeme detailně učit později.

Kód v souboru `app.py` bude vypadat takto:
```python
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")

if __name__ == '__main__':
    app.run(debug=True)
```
Nyní znovu načti stránku v prohlížeči a již by mělo být vše v pořádku.

## Přidání stylů
Náš projekt zatím vypadá velmi jednoduše. Pojďme si ho teď vizuálně vylepšit. Jedna možnost je postupně přidávat stylování tak, jak jsme si to ukazovali v části o tvorbě webu. Druhá možnost je použít populární framework [Bootstrap](https://getbootstrap.com), který poskytuje již hotové komponenty a stylovací třídy.

### Bootstrap
Nejdříve je potřeba přidat odkazy na Bootstrap CSS a JS scripty podle [návodu](https://getbootstrap.com/docs/5.3/getting-started/introduction/).
Do `head` přidáme odkaz na CSS:
```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ToDo List</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>
```

A na konec `body` ještě před uzavírací tag pak odkazy na JS scripty:
```html
...
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
Opět zkontrolujte výsledek v prohlížeči. Všimněte si, že už těch došlo ke změně písma - to se aplikovaly první Boostrap styly.

### Containers
Nyní si nastavíme výchozí styly pro naše dva hlavní kontejnery `div`, které máme v `body`. Použijeme výchozí třídu `class="container"` ([dokumentace](https://getbootstrap.com/docs/5.3/layout/containers/)).
```html
<body>
    <div class="container">
        <!-- Záhlaví -->
        <header>
            <h1>My TODO list</h1>
        </header>
        ...
```

### Header
V záhlaví si nastavíme vnější okraj nahoře a dole pomocí třídy `my-4` ([dokumentace](https://getbootstrap.com/docs/5.3/utilities/spacing/#margin-and-padding)) a nadpis zarovnáme na střed pomocí třídy `class="text-center"` ([dokumentace](https://getbootstrap.com/docs/5.3/utilities/text/#text-alignment)).
```html
<header class="my-4">
    <h1 class="text-center">My TODO list</h1>
</header>
```

### Navigace
Pro navigaci si zkopírujeme kód z [dokumentace](https://getbootstrap.com/docs/5.3/components/navbar/) Bootstrap. Díky tomu budeme mít funkční navigaci s funkčními styly, která bude připravena i pro malá zařízení (responzivní desing).

Pro náš projekt použijeme tuto Bootstrap navigaci, kterou si později upravíme pro naše potřeby.
```html
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-link active" aria-current="page" href="#">Home</a>
        <a class="nav-link" href="#">Features</a>
        <a class="nav-link" href="#">Pricing</a>
        <a class="nav-link disabled" aria-disabled="true">Disabled</a>
      </div>
    </div>
  </div>
</nav>
```
Můžeme si upravit barvu navigace tak, aby měla tmavé pozadí a světlé písmo. Defaultně Bootstrap používá tzv. light mode, je však možné i použít tzv. dark mode ([dokumentace](https://getbootstrap.com/docs/5.3/customize/color-modes/)). Stačí vyměnit jeden řádek:
```html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
```

### Zápatí
Také pro zápatí použijeme dark mode a upravíme padding a margin dle naší představy.
```html
<div class="container">
    <!-- Zápatí -->
    <footer class="bg-dark text-light py-3 text-center">
        <p class="mb-0">&copy; 2024 My TODO List</p>
    </footer>
</div>
```

### Layout s Flexbox
V projektu nastavíme layout pomocí Flexbox a Bootstrap ([dokumentace](https://getbootstrap.com/docs/5.3/utilities/flex/)) tak, aby všechny kontejnery, které budou patřit do Flexboxu se zarovnaly do jednoho sloupce a poslední se vždy zobrazil až na konci stránky. Díky tomu bude zápatí vždy na konci stránky, i když v `body` bude málo obsahu. Také zmenšíme maximální šířku kontejneru s obsahem na 800 pixelů, aby byl hlavní obsah v méně širokém sloupci. Po přidání všech tříd a stylů bude `body` vypadat takto:
```html
<body>
    <div class="mx-auto d-flex align-items-end flex-column min-vh-100" style="max-width: 800px;"> 
        <div class="container p-2">
            <!-- Záhlaví -->
            ...

            <!-- Horizontální menu -->
            ...

            <!-- Hlavní obsah -->
            ...
        </div>
        <div class="container mt-auto p-2">
            <!-- Zápatí -->
            ...
        </div>
    </div>

    <!-- Bootstrap skripty -->
    ...
</body>
```

# Shrnutí
Po první části náš projekt vypadá takto:

<img src="../images/flask_todo_app_version1.png" alt="Box model" width="500">

Soubor `app.py`:
```python
from flask import Flask, render_template

app = Flask(__name__)

# Route pro zobrazení úvodní stránky
@app.route("/")
def index():
    return render_template("index.html")

if __name__ == '__main__':
    app.run(debug=True)
```

Soubor `templates/index.html`:
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
                            <a class="nav-link active" aria-current="page" href="#">Menu 1</a>
                            <a class="nav-link" href="#">Menu 2</a>
                            <a class="nav-link" href="#">Menu 3</a>
                            <a class="nav-link disabled" aria-disabled="true">Menu 4</a>
                        </div>
                    </div>
                </div>
            </nav>

            <!-- Hlavní obsah -->
            <div>
                <!-- Seznam úkolů -->
                <h2>Seznam úkolů</h2>
                <ul>
                    <li>Koupit jablka</li>
                    <li>Vyžehlit prádlo</li>
                    <li>Vyvenčit psa</li>
                </ul>
            </div>
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
</body>

</html>
```