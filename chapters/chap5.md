# 5. Úvod do Flasku a první kroky
### OBSAH:

**Teorie**

- Úvod do Flasku a webových frameworků: Co je Flask, proč jej používat, základní principy webových frameworků.
- Instalace a první Flask aplikace: Jak nainstalovat Flask, vytvořit základní aplikaci.
	- Python environment, instalace Flasku přes pip.
	- Vytvoření první route, návratová hodnota Hello, World!.
- Routing a URL mapování: Jak fungují URL adresy ve Flasku, jak pracovat s route dekorátory.
	- Použití proměnných v URL.
	- Metody HTTP.
- Spuštění a testování Flask aplikace: Jak spustit aplikaci, nástroje pro testování (např. Postman).

**Projekt** 

- Vytvoření základní struktury aplikace
- Přidání první HTML stránky se seznamem úkoů a první routy pro její zobrazení.
- Přidání stylů pomocí frameworku Bootstrap

***

## 5.1 Úvod do Flasku a webových frameworků
**Flask**  je lehký webový framework napsaný v jazyce Python, který je navržený tak, aby byl jednoduchý, flexibilní a rozšiřitelný. Poskytuje základní nástroje potřebné pro tvorbu webových aplikací a API, aniž by nutil uživatele používat nadbytečné funkce. Flask je známý svou minimalistickou filozofií a je často označován jako "mikroframework", protože nenabízí tolik vestavěných funkcí jako některé jiné frameworky (např. Django).

I přesto je Flask velmi výkonný a lze ho snadno rozšířit pomocí různých dostupných rozšíření, která přidávají potřebné funkce, jako je správa databází, ověřování uživatelů a další.

Zdrojový kód Flasku najdete na GitHubu [zde](https://github.com/pallets/flask/), informace můžete čerpat z jeho oficiální [dokumentace](https://flask.palletsprojects.com/en/3.0.x/) nebo z mnoha tutoriálů a video návodů na internetu.

### Proč si vybrat Flask?
- **Jednoduchost**: Flask je navržený s důrazem na jednoduchost a snadnou použitelnost. Umožňuje rychlé vytvoření aplikace s minimem kódu a je ideální pro ty, kdo chtějí rychle vytvářet prototypy nebo menší aplikace.
- **Flexibilita**: Flask dává vývojáři plnou kontrolu nad architekturou aplikace. Není vázán na pevnou strukturu projektu, což dává volnost při rozhodování o tom, jak organizovat kód.
- **Modularita**: Flask využívá princip "připoj, co potřebuješ". Můžete přidávat moduly a rozšíření podle potřeby, což umožňuje snadné rozšíření funkcionality vaší aplikace.
- **Rozšířitelná základna**: Existuje mnoho open-source rozšíření pro Flask, která umožňují přidání autentizace, práce s databázemi, validace formulářů a další funkce bez nutnosti psát velké množství kódu.
- **Velká komunita**: Flask má velkou a aktivní komunitu, což znamená, že je snadné najít podporu, návody a balíčky, které vám pomohou řešit různé problémy a přidávat funkcionalitu.

### Základní principy webových frameworků
Webový framework je nástroj, který poskytuje vývojářům předem připravenou strukturu pro tvorbu webových aplikací. Tím zjednodušuje proces vývoje a snižuje množství opakujícího se kódu, který je třeba napsat. Některé klíčové principy webových frameworků:

- **Routing**: Framework poskytuje nástroj pro mapování URL adres na specifické funkce v aplikaci. To znamená, že každá URL adresa (např. /home nebo /about) může být spojena s konkrétní funkcí, která zpracovává požadavek a vrací odpověď.
- **Šablony**: Frameworky obvykle podporují šablonové systémy, které umožňují oddělit logiku aplikace od prezentace (HTML). Flask používá šablonový jazyk Jinja2.
- **Práce s HTTP protokolem**: Webové frameworky zjednodušují práci s HTTP požadavky a odpověďmi (např. GET, POST). Flask umožňuje snadnou manipulaci s těmito metodami a poskytuje nástroje pro práci s daty z formulářů, cookies, session apod.
- **Middleware**: Umožňuje přidávání dalších vrstev do aplikačního procesu, například pro autentizaci, logování nebo zpracování chyb.

Flask, i když minimalistický, poskytuje vývojáři všechny základní nástroje potřebné pro tvorbu moderní webové aplikace s plnou kontrolou nad tím, co je do aplikace integrováno.

### Django a další webové frameworky
Kromě Flasku existuje celá řada webových frameworků pro Python i další programovací jazyky. Pokud zůstaneme v Python světě, kromě Flasku se můžete potkat
s těmito frameworky.


**Django**

[Django](https://www.djangoproject.com) je jeden z nejpopulárnějších webových frameworků pro Python, který se zaměřuje na rychlý vývoj a čistý design. Je postaven na princi batteries-included, což znamená, že poskytuje širokou škálu vestavěných funkcí, jako je správa databází, uživatelská autentizace, admin panel a další. Django využívá Model-View-Template (MVT) architekturu a je ideální pro vytváření komplexních webových aplikací, kde je důležitá bezpečnost a rychlost vývoje.

Stejně jako Flask má Django velkou aktivní komunitu a existuje k němu velké množství tutoriálů, návodů, článků apod. Jedním z mnoha je tento [návod](https://tutorial.djangogirls.org/cs/) od Django Girls, který je v několika jazycích, včetně češtiny.


**FastAPI**

[FastAPI](https://fastapi.tiangolo.com) je moderní, rychlý (na základě standardů ASGI) framework pro vytváření API. Je navržen tak, aby byl jednoduchý na použití a zároveň velmi rychlý. FastAPI podporuje asynchronní programování a generování dokumentace API pomocí OpenAPI a JSON Schema, což usnadňuje práci s API.


**Pyramid**

[Pyramid](https://trypyramid.com) je flexibilní a robustní webový framework, který umožňuje vývoj malých i velkých aplikací. Pyramid podporuje širokou škálu datových modelů a má dobré možnosti pro autentizaci a autorizaci uživatelů. Jeho hlavní výhodou je jeho modulárnost a schopnost přizpůsobit se specifickým potřebám projektů.


**Falcon**

[Falcon](https://falconframework.org) je framework zaměřený na výkon, který se používá pro vytváření RESTful API. Je navržen tak, aby byl co nejefektivnější, a poskytuje nízkou latenci. Falcon je skvělý pro aplikace, kde je výkon klíčovým faktorem, jako jsou microservices.


Každý z těchto frameworků má své specifické vlastnosti a je určen pro různé scénáře. Výběr správného frameworku závisí na požadavcích projektu, potřebné funkčnosti, a osobních preferencích vývojáře. Flask a Django zůstávají nejoblíbenějšími volbami pro většinu běžných webových aplikací, ale další frameworky mohou být velmi užitečné pro specifické situace.


## 5.2 Instalace a první Flask aplikace
### Složka pro Flask projekt
Jako první je potřeba si vytvořit složku, ve které budeme projekt tvořit. Název složky může být např. `flask-aplikace`.
Otevřete si terminál, vytvořte si tuto složku a přejděte do ní.


**Vytvoření složky s Mac a Linux**
- otevřete si aplikaci Terminál
- přejděte do své pracovní složky, ve které máte všechny projekty pomocí `cd ..` (přechod o úroveň výše) nebo `cd <nazev_složky>` (přechod o úroveň níže)
- pomocí příkazu `ls` zobraz seznam souborů a složek v aktuální složce
- vytvořte novou složku pomocí příkazu `mkdir flask-aplikace`
- přejděte do nové složky pomocí příkazu `cd flask-aplikace`


**Vytvoření složky s Windows**
- otevřete si příkazový řádek (command prompt) - stiskněte klávesy `Win` + `R`, zadejte `cmd` a potvrďte pomocí `enter`
- přejděte do své pracovní složky, ve které máte všechny projekty pomocí `cd ..` (přechod o úroveň výše) nebo `cd <nazev_složky>` (přechod o úroveň níže)
- pomocí příkazu `dir` zobraz seznam souborů a složek v aktuální složce
- vytvořte novou složku pomocí příkazu `mkdir flask-aplikace`
- přejděte do nové složky pomocí příkazu `cd flask-aplikace`

### Virtuální prostředí
Další krok je vytvoření virtuální prostředí. Jedná se o oddělený prostor, ve kterém je možné instalovat a spravovat závislosti (knihovny, balíčky) pro projekt, aniž by by byly ovlivněny globální instalace Pythonu a knihoven. To znamená, že každý projekt může mít vlastní sadu nainstalovaných knihoven a balíčků, které se nepřekrývají s jinými projekty nebo s Pythonem na počítači.

Hlavní důvody, proč používat virtuální prostředí:

- **Izolace závislostí**: Projekty často vyžadují různé verze knihoven. Virtuální prostředí zajišťuje, že závislosti jednoho projektu neovlivní druhý projekt.
- **Snadná správa verzí**: Udržování konkrétních verzí knihoven pro daný projekt umožňuje jejich jednoduchou správu a opětovné nasazení ve stejné konfiguraci.
- **Minimalizace konfliktů**: Když se různé projekty spoléhají na různé verze stejné knihovny, virtuální prostředí zabraňuje kolizím verzí.
- **Bezpečnost**: Virtuální prostředí umožňuje spouštět a testovat projekty bez zásahu do globální instalace Pythonu, což může zlepšit bezpečnost a stabilitu systému.

Virtuální prostředí tedy zajišťuje čisté, izolované prostředí pro každý projekt, což usnadňuje práci na více projektech současně.


**Vytvoření virtuálního prostředí s Mac a Linux**
- vytvořte si virtuálního prostředí `python3 -m venv projekt-venv`
- aktivujte si virtuálního prostředí `source projekt-venv/bin/activate`


**Vytvoření virtuálního prostředí s Windows**
- vytvořte si virtuálního prostředí `python -m venv projekt-venv`
- aktivujte si virtuálního prostředí `.\project-venv\Scrtipts\activate`


Po aktivaci je název virtuálního prostředí `project-venv` vidět před promptem v terminálu. Virtuální prostředí lze deaktivovat pomocí příkazu `deactivate`.

### Instalace Flask
Do aktivovaného virtuálního prostředí si nainstalujeme framework Flask. Před samotnou instalací zkontrolujeme, jaké knihovny máme ve virtuálním prostředí
nainstalované pomocí příkazu `pip list`.
```bash
$ pip list
Package    Version
---------- -------
pip        24.2
setuptools 65.5.0
```
Nástroj `pip` slouží pro správu Python balíčků. Umožňuje je instalovat, aktualizovat a odstraňovat. My jsme teď použili příkaz pro zobrazení seznamu všech
balíčků nainstalovaných v našem virtuálním prostředí.

Nyní je čas nainstalovat Flask.
```bash
$ pip install Flask
   ...
Successfully installed Flask-3.0.3 Jinja2-3.1.4 MarkupSafe-2.1.5 Werkzeug-3.0.4 blinker-1.8.2 click-8.1.7 itsdangerous-2.2.0
```
Spolu s Flaskem byly nainstalovány další knihovny jako je např. Jinja2, které Flask potřebuje pro své fungování.

Znovu si vyzkoušejte zobrazit seznam všech balíčků nainstalovaných v prostředí.
```bash
$ pip list
Package      Version
------------ -------
blinker      1.8.2
click        8.1.7
Flask        3.0.3
itsdangerous 2.2.0
Jinja2       3.1.4
MarkupSafe   2.1.5
pip          24.2
setuptools   65.5.0
Werkzeug     3.0.4
```

### Vytvoření první Flask aplikace
V projektu (ve složce `flask-aplikace`) si vytvořte soubor `app.py` a do něj zkopírujte následujcí kód:
```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello, World!"

if __name__ == '__main__':
    app.run(debug=True)
```
V tomto případě pouštíme Flask aplikace v tzv. debug módu (`debug=True`). Díky tomu server automaticky aplikuje všechny změny, které ve svém
projektu uděláme, aniž by bylo nutné ho restartovat. To je velmi žádoucí, když se aplikace tvoří. Tento mód nám také umožní využívat debugovací
nástroje.

Po každé změně nezapomeňte soubor uložit. VS Code stejně jako i ostatní programátorské editory umožňují nastavit tzv. automatické ukládání souborů, díky kterému
již nikdy nezapomenete soubory uložit. Tuto možnost si můžete zapnout přes Menu -> File -> Auto Save.

### Spuštění Flask aplikace
Spusťte aplikaci v terminálu pomocí:
```bash
python app.py
```
Aplikace bude dostupná na adrese http://127.0.0.1:5000/, kde 5000 je defaultní port, který Flask používá při svém spuštění.

Pokud se vám nedaří aplikaci pustit a v terminálu dostáváte chybu s informací, že port 5000 je již použit jiným programem, pak si zkuste nastavit
jiný port a to tak, že konkrétní číslo portu nastavíme v `app.py` na posledním řádku.
```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello, World!"

if __name__ == '__main__':
    app.run(debug=True, port=5555)
```
Aplikace bude dostupná na adrese http://127.0.0.1:5555/.


**Gratuluji, právě jste vytvořili svou první Flask aplikaci !!!**

## 5.3 Routing a URL mapování
**Routing** je základní koncept ve Flasku, který slouží k mapování URL adres na konkrétní funkce nebo metody v aplikaci. Každá URL adresa, kterou uživatel zadá do prohlížeče, vede k určité funkci (nebo view), která zpracuje požadavek a vrátí odpověď. V této kapitole se podíváme na to, jak funguje routing ve Flasku, jak pracovat s dekorátory `@app.route()`, používat proměnné v URL a jak pracovat s HTTP metodami GET a POST.

Ve Flasku se každé URL mapuje na určitou funkci. Tato funkce zpracovává požadavek a vrací odpověď (např. HTML stránku, JSON data nebo zprávu).
```python
@app.route('/')
def index():
    return "Vítejte na hlavní stránce!"
```
Zde `@app.route('/')` říká Flasku, že když někdo přistoupí na hlavní URL `/`, zavolá se funkce `index()` a uživateli se zobrazí zpráva „Vítejte na hlavní stránce!“.

### Route dekorátory
Flask používá dekorátor `@app.route()` k mapování URL adres na určité funkce. Tento dekorátor definuje, která URL adresa bude zpracována kterou funkcí.
```python
@app.route('/about')
def about():
    return "Toto je stránka O nás."
```
V tomto případě, když uživatel zadá do prohlížeče `http://localhost:5000/about`, spustí se funkce `about()`, která vrátí odpověď „Toto je stránka O nás.“

Dekorátor `@app.route()` standardně používá HTTP metodu `GET`, ale lze přidat i další metody, jako `POST`, `PUT`, nebo `DELETE`.
```python
@app.route('/submit', methods=['GET', 'POST'])
def submit():
    if request.method == 'POST':
        return "Zpracování POST požadavku."
    return "Zpracování GET požadavku."
```

Ve Flasku lze k mapování URL adres použít nejen dekorátor, ale také metodu `add_url_rule()`.
```python
from flask import Flask

app = Flask(__name__)

# Definování funkce, která bude přiřazena k URL
def index():
    return "Hello from add_url_rule!"

# Přidání pravidla pro URL pomocí add_url_rule
app.add_url_rule('/', 'index', index)

if __name__ == '__main__':
    app.run(debug=True)
```
Obě metody jsou správné, volba závisí na typu projektu. Pro většinu jednodušších projektů bude `@app.route()` dostačující, zatímco `app.add_url_rule()` může být užitečné pro složitější a modulární projekty.

### Příklad
**Flask ukázka 1** je aplikace se třemi routami, kdy jedna vrací jako odpověď jednoduchou HTML stránku, druhá JSON data a třetí jednoduchou zprávu.

### Použití proměnných v URL
Flask umožňuje přidávat proměnné přímo do URL adresy. To je užitečné, když potřebujeme dynamicky pracovat s daty, například zobrazovat různé články nebo profily uživatelů.
```python
@app.route('/user/<username>')
def show_user_profile(username):
    return f"Profil uživatele: {username}"
```
Zde `/<username>` říká, že část URL je proměnná a hodnota se předává jako argument funkci `show_user_profile()`. Pokud by uživatel zadal URL `http://localhost:5000/user/jan`, vrátila by se zpráva „Profil uživatele: jan“.

Ve Flasku lze použít proměnné nejen na konci URL, ale i uprostřed, což je užitečné v případech, kdy je potřeba dynamické části URL umístit mezi statické části.
```python
from flask import Flask

app = Flask(__name__)

# Dynamická proměnná uprostřed URL
@app.route('/user/<username>/posts')
def user_posts(username):
    return f"Displaying posts for user: {username}"

if __name__ == '__main__':
    app.run(debug=True)
```
Flask zpracuje URL a vyextrahuje část odpovídající proměěnné `username`. Statické části URL jako je `/user/` nebo `/posts` musí přesně odpovídat zadané cestě. Proměnnou lze takto přidat kamkoliv v rámci URL a Flask ji dynamicky přiřadí.

Další možnost je mít dvě a více proměnných v URL.
```python
@app.route('/user/<username>/post/<int:post_id>')
def show_post(username, post_id):
    return f"Displaying post {post_id} for user: {username}"
```
Tento příklad ukazuje, jak dynamicky zpracovat i více částí URL a použít i různé typy proměnných, jako je celé číslo (integer) pro `post_id` a řetězec (string)
pro `username`.


**Datové typy proměnných v URL**

Flask umožňuje specifikovat datový typ proměnné. Pokud například očekáváme, že proměnná bude integer (číslo), můžeme to specifikovat:
```python
@app.route('/post/<int:post_id>')
def show_post(post_id):
    return f"Příspěvek číslo: {post_id}"
```
Podporované datové typy v URL jsou:
- `string` (výchozí) – jakýkoli text bez lomítek
- `int` – integer (číslo)
- `float` – desetinné číslo
- `path` – rozšířený string, který může obsahovat lomítka

Možnost použití proměnné typu path (tzv. subpath) ve Flasku je užitečná, když potřebuješ zpracovávat víceúrovňové cesty (tj. cesty, které obsahují lomítka /) v rámci jedné route. Zatímco běžná proměnná typu string ve Flasku přijme pouze text do prvního lomítka, proměnná typu path přijme celý řetězec, včetně lomítek.

- **Dynamické cesty k souborům nebo adresářům**: Pokud pracuješ s cestami k souborům, můžeš tak snadno zpracovávat cesty s podadresáři. Např. pokud máš soubory uložené ve složkách a potřebuješ URL, které zpracuje různé úrovně cest, jako `/files/documents/report.pdf`, proměnná typu path ti umožní zpracovat celý řetězec.
- **REST API pro složitější struktury**: Ve složitějších API můžeš dynamicky pracovat s URL, které mají vícero oddělení pomocí lomítek. Např. v rámci nějaké API pro získání detailů o zdroji můžeš použít cestu jako `/api/resource/category/item/id`, kde je nutné zpracovat jak kategorii, tak i jednotlivé položky.
- **Navigace v rámci webu s podstránkami**: Pokud máš víceúrovňovou navigaci, kde se stránka skládá z několika podsekcí, může být proměnná typu path užitečná pro dynamické vytváření obsahu. Například na stránkách dokumentace: `/docs/chapter1/section2`.


### Příklad
**Flask ukázka 2** je aplikace s několika routami, které používají proměnné v URL a ukazují použití různých datových typů.

### HTTP metody
V rámci webových aplikací používáme různé HTTP metody ke komunikaci mezi klientem (např. prohlížečem) a serverem.

Metoda **GET** slouží k získání dat ze serveru. Když například prohlížeč zadá URL, pošle na server požadavek metodou GET, a server vrátí odpověď (např. HTML stránku). GET metoda je ve Flasku výchozí a není nutné ji specifikovat.
```python
@app.route('/greet')
def greet():
    return "Ahoj, uživateli!"
```
Tento kód zobrazí text „Ahoj, uživateli!“ při požadavku typu GET na URL `/greet`.

Metoda **POST** se používá k odesílání dat, například při odesílání formuláře. Tato metoda umožňuje zpracovávat data na serveru.
```python
from flask import request

@app.route('/submit', methods=['POST'])
def submit():
    username = request.form['username']
    return f"Vítejte, {username}!"
```
V tomto příkladu funkce `submit()` zpracovává data odeslaná formulářem a zobrazuje uvítací zprávu.

Pokud je to potřeba, lze definovat jednu funkci, která bude zpracovávat obě metody najednou.
```python
@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form['name']
        return f"Děkujeme za odeslání, {name}!"
    return render_template('contact.html')
```
Zde formulář na stránce `/contact` zpracovává údaje odeslané metodou POST. Pokud uživatel stránku navštíví pomocí GET, zobrazí se šablona `contact.html`.

Existují i další HTML metody jako HEAD, PUT, DELETE, PATCH a další, v našem kurzu si ale zatím vystačíme jen s GET a POST.

### Příklad
**Flask ukázka 3** je aplikace, která ukazuje použití metody GET a POST v jedné funkci.

### Generování URL
Ve Flasku existuje metoda `url_for()`, která je klíčovým nástrojem pro generování URL adres založených na názvech funkcí (tzv. view funkcí) spíše než na pevných URL cestách. To zajišťuje flexibilitu a snadnou údržbu aplikací.

Tato metoda umožňuje dynamicky generovat URL adresy pro funkce definované v aplikaci. Namísto pevného zadání cesty (což může být problematické při změnách struktury URL), se použije název funkce. Flask poté vytvoří správnou URL adresu na základě zadané view funkce a argumentů.

### Příklad
**Flask ukázka 4** je aplikace, která ukazuje použití metody `url_for()`.

## 5.4 Spuštění a testování Flask aplikace
### Spuštění Flask aplikace
Jeden způsob spuštění Flask aplikace jsme si již ukázali.
```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello, World!"

if __name__ == '__main__':
    app.run()
```
Ve virtuálním prostředí s nainstalovaným Flaskem pustíme aplikací pomocí:
```bash
python app.py
```

Druhý způsob je puštění pomocí `flask run`, ale musíme přidat informaci o tom, který soubor má být spuštěn pomocí `FLASK_APP=app.py`. V systémech Linux a Mac pomocí:
```bash
FLASK_APP=app.py flask run
```
Ve Windows:
```bash
set FLASK_APP=app.py && flask run
```

Pokud je potřeba, přidáme další proměnné pro definici portu, na kterém má být Flask server puštěn nebo proměnnou pro spuštění v debug modu. V systémech Linux a Mac:
```bash
FLASK_APP=app.py FLASK_RUN_PORT=5555 FLASK_DEBUG=1 flask run
```
Ve Windows:
```bash
set FLASK_APP=app.py && set FLASK_RUN_PORT=5555 && set FLASK_DEBUG=1 && flask run
```

Další způsob je uložení proměnných do našeho prostředí pomocí `export` pro Linux a Mac nebo `set` pro Windows. V systémech Linux a Mac můžeme postupně nastavit všechny potřebné proměnné a pak pustit Flask server:
```bash
export FLASK_APP=app.py
export FLASK_RUN_PORT=5555
export FLASK_DEBUG=1
flask run
```
Ve Windows:
```bash
set FLASK_APP=app.py
set FLASK_RUN_PORT=5555
set FLASK_DEBUG=1
flask run
```

Pokud byl Flask server puštěn v debug módu, Flask automaticky znovu načte aplikaci pokaždé, když změníte kód. Výstup po spuštění serveru bude obsahovat informaci
o tom, na jaké adrese server běží, např.:
```bash
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```
V tomto případě lze Flask aplikaci otevřít v prohlížeči zadáním adresy http://127.0.0.1:5000/. 

### Testování Flask aplikace
Jakmile je aplikace spuštěna, je důležité ji otestovat. Jedním z nejjednodušších způsobů je prohlížeč, který umožňuje zobrazit základní odpovědi na GET požadavky. Avšak pro pokročilejší testování, zejména POST a další HTTP metody, je vhodné využít nástroje, jako je Postman.

[Postman](https://www.postman.com) je oblíbený nástroj pro odesílání HTTP požadavků na server a pro testování API.

Další nástroj, který lze použít je **cURL**. Jedná se o nástroj pro příkazovou řádku, který umožňuje posílat HTML požadavky.
```bash
curl http://127.0.0.1:5000/
```

[UnitTest](https://docs.python.org/3/library/unittest.html) - Flask také nabízí framework pro psaní testů v Pythonu. Pomocí knihovny unittest můžete psát a spouštět testy přímo v kódu aplikace.

## 5.5 Další zdroje
- [Flask dokumentace](https://flask.palletsprojects.com/en/3.0.x/)
- [Geeks For Geeks Flask tutorial](https://www.geeksforgeeks.org/flask-tutorial/)
- [Real Python Flask Tutorial](https://realpython.com/tutorials/flask/)
  