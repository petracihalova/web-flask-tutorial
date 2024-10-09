# 7. Ukládání dat (JSON, SQL, Flask-SQLAlchemy)
### OBSAH:

**Teorie**

- Možnosti ukládání dat ve Flask projektu: in-memory, JSON, databáze.
- Úvod do API, REST API a související témata.
    - OpenApi speccifikace.
    - Swagger Editor.
    - YAML.
- Úvod do SQL a SQLite: Co je databáze, základní operace s SQL databázemi.
	- Ukázka SQL příkazů (SELECT, INSERT, UPDATE, DELETE).
	- Použití SQLite jako integrované databáze pro Flask aplikaci.
- Flask a databáze (Flask-SQLAlchemy): Jak pracovat s databázemi ve Flasku pomocí SQLAlchemy.
	- Vytvoření modelů.
	- Operace s databází (přidání, úprava, mazání dat).

**Projekt**

- Připojení aplikace k databázi: Ukládání úkolů do SQLite databáze.
- CRUD operace pro úkoly: Vytvoření funkce pro přidávání, mazání a úpravu úkolů v databázi.

***

## 7.1 Ukládání dat do paměti, souborů, databáze
V podstatě každý projekt pracuje s daty. Těchto dat může být více nebo méně a je tedy nutné řešit otázku, jak data ukládat. Nejjednodušším způsobem je ukládání dat do paměti počítače. Další možností je jejich uložení do souborů. Jak se projekt rozrůstá, může vyvstat potřeba ukládat data do databáze. Každý způsob ukládání má své výhody a je vhodný pro různé situace.

### Ukládání dat do paměti (in-memory storage)
Tento způsob je nejjednodušší a používá se při vývoji nebo u malých aplikací, kde nejsou požadavky na trvalé ukládání dat. Data se ukládají do proměnné (např. seznamu nebo slovníku) přímo v kódu aplikace. Po restartu aplikace se tato data ztratí, protože jsou pouze v paměti.
```python
data = []

@app.route('/add', methods=['POST'])
def add_data():
    new_item = request.form['item']
    data.append(new_item)
    return jsonify(data)
```
Mezi výhody tohoto přístup patří jednoduchá implementace a rychlý přístup k datům. Data však nejsou trvale uložena a při restartu aplikace o tato data přicházíme. Tento způsob také není vhodný pro větší množství dat.

### Ukládání dat do souborů (JSON)
Jednou z možností, jak trvale uchovávat data a zabránit jejich smazání při restartování aplikace, je jejich uložení do souborů. Toto řešení je vhodné pro malé aplikace, kde není mnoho dat. Data jsou uložena do textového souboru (např. ve formátu JSON, který umožňuje snadnou práci s daty ve formě slovníků a seznamů) a v případě potřeby jsou tato data ze souboru načtena.
```python
import json

def load_data():
    try:
        with open('data.json', 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return []

def save_data(data):
    with open('data.json', 'w') as f:
        json.dump(data, f)

@app.route('/add', methods=['POST'])
def add_data():
    data = load_data()
    new_item = request.form['item']
    data.append(new_item)
    save_data(data)
    return jsonify(data)
```
Data jsou trvale uchována i při restartu počítače a uložené soubory jsou snadno čitelné a editovatelné. Nevýhodnou může být to, že při větším objemu dat může být zápis i čtení do souboru pomalý a zpomalovat tak běh samotné aplikace. Také tento přístup není vhodný pro paralelní přístup k datům, neboť soubory mohou být při čtení zamčené.

### Ukládání dat do databáze
Jakmile aplikace začne zpracovávat větší množství dat nebo je potřeba zpráacovávat složitější dotazy (např. filtrování, třídění), je vhodné začít používat databázi. [SQLite](https://www.sqlite.org/) je skvělá volba pro menší projekty, protože je lehká, nevyžaduje samostatný server a ukládá data do souboru. Flask má také k práci s databázemi velmi užitečnou knihovnu [Flask-SQLAlchemy](https://flask-sqlalchemy.palletsprojects.com/en/3.1.x/).

## 7.2 JSON a Flask
**JSON** (JavaScript Object Notation) je lehký formát pro výměnu dat, který je snadno čitelný pro lidi i stroje. Jeho struktura vychází z JavaScriptu, ale je široce podporována v mnoha programovacích jazycích. Ve Flask aplikacích se JSON často používá pro komunikaci mezi klientem a serverem, zejména při práci s REST API.

JSON strukturuje data pomocí:
- Objektů (ve tvaru párů klíč-hodnota): `{"name": "John", "age": 30}`
- Polí (seznamů hodnot): `["apple", "banana", "cherry"]`
- Jednoduchých datových typů: řetězce, čísla, logické hodnoty a `null`.

Příkladem JSON formátu může být tento objekt představující uživatele:
```json
{
  "name": "Honza Jelen",
  "age": 30,
  "email": "honza.jelen@example.com",
  "is_active": true
}
```

Ve Flasku lze jednoduše pracovat s JSON daty pomocí vestavěných funkcí. Ty se používají zejména v případech, kdy Flask aplikace funguje jako API, které přijímá a vrací data ve formátu JSON.

### Přijetí JSON dat
Pokud klient odešle na server požadavek typu POST s JSON daty, Flask je dokáže snadno zpracovat. Zde je příklad, jak získat JSON data z požadavku:
```python
from flask import Flask, request

app = Flask(__name__)

@app.route('/user', methods=['POST'])
def create_user():
    # Získání JSON dat z požadavku
    user_data = request.get_json()
    name = user_data['name']
    age = user_data['age']
    
    # Zpracování dat...
    
    return f"User {name} created, age {age}."
```
V tomto příkladu metoda `request.get_json()` převezme JSON data z těla požadavku a převede je na Python slovník.

### Odeslání JSON odpovědi
Flask má vestavěnou funkci `jsonify()`, která umožňuje snadno odesílat JSON odpovědi. Tento nástroj automaticky přidá do odpovědi správný typ obsahu (`application/json`).
```python
from flask import jsonify

@app.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = {"id": user_id, "name": "Honza Jelen", "age": 30}
    
    return jsonify(user)
```
Tento endpoint vrátí klientovi následující JSON odpověď:
```json
{
  "id": 1,
  "name": "Honza Jelen",
  "age": 30
}
```

### Práce s JSON soubory
Formát JSON lze také využít k ukládání dat na serveru do souboru. To je užitečné v menších aplikacích, které nepotřebují plnohodnotnou databázi.
```python
import json

def save_user_to_file(user_data):
    with open('users.json', 'w') as file:
        json.dump(user_data, file)

def load_users_from_file():
    with open('users.json', 'r') as file:
        return json.load(file)
```

### Příklad
**Flask ukázka 9** je ukázka ukládání dat do JSON souborů.

Pokud Flask aplikace poskytuje REST API, JSON je téměř vždy preferovaným formátem pro výměnu dat. Když klient odešle POST, PUT nebo DELETE požadavky, často posílá data ve formátu JSON, a když požaduje data (GET), server obvykle vrací odpovědi ve formátu JSON.

## 7.3 REST API, OpenApi specifikace, Swagger Editor, YAML

### API
API (Application Programming Interface) je rozhraní, které umožňuje vzájemnou komunikaci mezi různými softwarovými aplikacemi. V kontextu webu se jedná o způsob, jakým jedna aplikace komunikuje s jinou přes síť (např. internet). API je často navrženo tak, aby umožňovalo vývojářům využívat funkce jiné aplikace či služby bez toho, aby museli znát její vnitřní implementaci. Více o tom, co je API si přečtěte na stránce [cojeapi.cz](https://cojeapi.cz/).

### REST API
REST (Representational State Transfer) je architektonický styl, který definuje sadu pravidel pro vytváření webových služeb. REST API je specifická forma API, která dodržuje principy REST architektury. Základní myšlenkou REST API je, že operace na serveru (např. čtení, vytváření, mazání nebo aktualizace dat) jsou realizovány prostřednictvím dobře známých HTTP metod.

**Základní principy REST API:**

- **Stateless (bezstavové)**: Každý požadavek od klienta k serveru musí obsahovat všechny potřebné informace, aby server mohl požadavek zpracovat. Server si neukládá stav klienta mezi požadavky.
- **Resource-based (zdrojově orientované)**: REST API pracuje s konceptem „zdrojů“, což jsou data nebo objekty (např. uživatelé, produkty, knihy) přístupné přes konkrétní URL.
- **HTTP metody**: REST API využívá standardní HTTP metody k provádění operací na zdrojích:
	- GET: Získání dat.
	- POST: Vytvoření nového záznamu.
	- PUT: Aktualizace existujícího záznamu.
	- DELETE: Smazání záznamu.

### OpenApi specifikace
V případě REST API je zvykem vytvořit **OpenAPI specifikaci**. Jedná se o standardizovaný formát pro popis REST API. Umožňuje vývojářům definovat všechny aspekty svého API, jako jsou jeho cesty (endpoints), metody, parametry, odpovědi, bezpečnostní mechanismy a další. Tento popis je strojově čitelný a slouží jako "dokumentace" API, kterou lze snadno sdílet a generovat nástroje, jako je Swagger, které umožňují testování, validaci a vizualizaci API.

Hlavní vlastnosti OpenAPI Specifikace:
- **Definice cest**: Popisuje všechny dostupné cesty API (např. `/books`, `/users`).
- **HTTP metody**: Každá cesta má definovány metody jako GET, POST, PUT, DELETE, atd.
- **Parametry a body requests**: Specifikace zahrnuje parametry URL, query parametry, body requests a další údaje, které API vyžaduje.
- **Odpovědi**: OpenAPI definuje, jaké odpovědi lze od API očekávat, včetně statusových kódů (200, 404, 500) a formátu odpovědi (např. JSON).
- **Bezpečnostní mechanismy**: Lze popsat, jakým způsobem je API zabezpečeno (OAuth2, API klíče, JWT).
- **Dokumentace a generování kódů**: OAS je velmi vhodný pro automatické generování dokumentace a dokáže se integrovat s nástroji jako Swagger UI, který API vizualizuje, nebo Swagger Editor pro tvorbu specifikací.

OpenApi specifikace může být napsána ve formátu JSON nebo YAML. Oba formáty jsou podporovány a mohou být použity k popisu RESTful API. Nicméně YAML je často preferován díky své čitelnosti a přehlednosti, což usnadňuje práci při vytváření a úpravách specifikací.

### Swagger Editor

[Swagger Editor](https://editor-next.swagger.io) je webový nástroj, který umožňuje vývojářům interaktivně vytvářet, prohlížet a validovat OpenAPI specifikace v reálném čase. Jedná se o vizuální editor, který zobrazuje OpenAPI specifikace napsané v YAML nebo JSON formátu na jedné straně a jejich vizualizovanou dokumentaci na straně druhé. Je to skvělý nástroj pro návrh a dokumentaci REST API. Editor ihned upozorňuje na chyby v syntaxi nebo špatně strukturované části API specifikace a také umožňuje okamžité zasílání požadavků (requests) a sledování odpovědí (responses). Swagger Editor je velmi užitečný nástroj pro všechny, kteří chtěji navrhovat strukturu API, generovat dokumentaci, testovat API nebo sdílet tuto specifikaci s dalšími týmy.

### Povolení CORS ve Flasku
Při používání Swagger Editoru a posílání požadavků z něj se může objevit chyba `Failed to fetch.`, která může být způsobena omezením CORS (Cross-Origin-Resource Sharing). Když je požadavek odeslán ze Swagger Editoru a server (Flask aplikace) neumožňuje CORS, prohlížeč, ve kterém Swagger Editor běží, tyto požadavky blokuje. Stejné požadavky lze odeslat pomocí cURL, protože tento nástroj není tímto omezením ovlivněn.

Řešením je povolit CORS ve Flasku pomocí knihovny `flask-cors`. Tato knihovna zajistí, že tvé API bude povolovat požadavky z jiných domén (například ze Swagger Editoru).

Nejdříve je nutné knihovnu nainstalovat do virtuálního prostředí projektu:
```bash
pip install flask-cors
```

A pak je možné knihovnu použít ve Flask aplikaci:
```python
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Povolit CORS pro všechny routy
CORS(app)

# Ostatní kód
```

### YAML a jeho srovnání s JSON
YAML (YAML Ain’t Markup Language) a JSON (JavaScript Object Notation) jsou oba populární formáty pro serializaci dat, často používané pro konfiguraci souborů, výměnu dat mezi systémy a API specifikace. I když mají podobné cíle, liší se v syntaxi a vhodnosti pro různé případy použití.

**YAML** je formát zaměřený na čitelnost člověkem a jednoduchost. Byl navržen tak, aby umožňoval pohodlnější práci s daty, což znamená, že je často snadno čitelný i pro méně technicky orientované uživatele. YAML se vyhýbá použití složitých syntaktických prvků, jako jsou složené závorky nebo uvozovky, které jsou typické pro JSON.

Naopak **JSON** je populární formát pro výměnu dat, zejména v kontextu webových aplikací a API. Je založen na JavaScriptovém objektovém modelu a má jednoduchou a přísně strukturovanou syntaxi, která je ideální pro strojové zpracování.

V kontextu Flask aplikace může být YAML použit pro konfiguraci aplikace (např. nastavení). JSON pak bude použit pro zpracování dat v REST API, kdy je nutné předat nebo přijmout strukturovaná data mezi klientem a serverem.

### Příklad
**Flask ukázka 10** je ukázka jednoduchého REST API ve Flasku. Ukázka obsahuje i OpenAPI specifikaci ve formátu YAML a JSON.

## 7.4 Relační databáze a SQL
### Co je databáze?
Databáze je strukturovaný soubor dat, který slouží k ukládání a správě informací. Je to organizovaný způsob, jakým můžeme ukládat velké množství informací a snadno k nim přistupovat. Databáze může být použita k ukládání různých typů dat, jako jsou údaje o zákaznících, objednávkách, produktech a další.

Existuje mnoho typů databází, ale mezi nejběžnější patří relační databáze. Relační databáze uchovávají data v tabulkách, kde každý řádek představuje jeden záznam a každý sloupec představuje určitý atribut (např. jméno, adresa). SQL databáze jsou typem relačních databází, které používají jazyk SQL pro práci s daty.

### Ukázka SQL příkazů

**SQL** (Structured Query Language) je jazyk pro správu a manipulaci s daty v relačních databázích. Zde jsou vysvětleny základní SQL příkazy, které se často používají pro práci s daty:

**SELECT** – Tento příkaz se používá k výběru dat z databáze.
```sql
SELECT column1, column2 FROM table_name;
```
Tento příkaz vybere hodnoty z určených sloupců v dané tabulce.

**INSERT** – Slouží k přidání nových záznamů do tabulky.
```sql
INSERT INTO table_name (column1, column2) VALUES (value1, value2);
```
Tímto příkazem lze přidat nový řádek s hodnotami `value1` a `value2` do odpovídajících sloupců tabulky.

**UPDATE** – Používá se k aktualizaci existujících záznamů v databázi.
```sql
UPDATE table_name SET column1 = value1 WHERE condition;
```
Tento příkaz upraví hodnoty v záznamu, který splňuje danou podmínku.

**DELETE** – Smaže záznamy z databáze na základě podmínky.
```sql
DELETE FROM table_name WHERE condition;
```
Tento příkaz smaže záznamy, které odpovídají podmínce.

### Další zdroje
- [w3schools SQL tutorial](https://www.w3schools.com/sql)
- [Geeks for Geeks SQL tutorial](https://www.geeksforgeeks.org/sql-tutorial/)
- [SQLTutorial.org](https://www.sqltutorial.org)
- [SQL Academy](https://sql-academy.org) (vč. SQL simulátoru)


## 7.5 Flask a SQLAlchemy
[SQLAlchemy](https://www.sqlalchemy.org) je knihovna pro práci s databázemi v Pythonu. Je to plnohodnotný ORM (Object Relational Mapper) nástroj, který umožňuje vývojářům pracovat s databázemi jako s Pythonovými objekty místo používání čistých SQL dotazů. Zajišťuje abstrakci databáze – překládá Python objekty do databázových tabulek a záznamů a zpět, což usnadňuje práci s různými relačními databázemi (např. SQLite, PostgreSQL, MySQL) bez nutnosti psát SQL dotazy ručně.

[Flask-SQLAlchemy](https://flask-sqlalchemy.readthedocs.io/en/3.1.x/) je rozšíření pro framework Flask, který zjednodušuje integraci SQLAlchemy do Flask aplikací. Poskytuje vyšší úroveň abstrakce pro práci s databází, specifickou pro Flask, a zajišťuje těsnou integraci s Flaskem (např. snadno se kombinuje s dalšími Flask rozšířeními, jako je Flask-Migrate pro správu migrací databází).

Flask-SQLAlchemy je pouze "nadstavba", která zjednodušuje použití SQLAlchemy v kontextu Flasku, ale ve skutečnosti veškerá práce s databází probíhá stále prostřednictvím SQLAlchemy.

## 7.6 SQLite
[SQLite](https://sqlite.org) je lehká, vestavěná relační databáze, která nevyžaduje server a ukládá data přímo do souboru. Pro malé a středně velké aplikace je ideální, a díky své jednoduchosti je velmi oblíbená v prostředí Flask aplikací. SQLite se snadno používá, protože vyžaduje minimální konfiguraci a je skvělá pro vývoj, prototypování a aplikace s nižšími nároky na škálování.

**Proč používat SQLite s Flaskem?**

- **Snadné nastavení**: Není potřeba žádná instalace serveru. SQLite je součástí standardní Python knihovny, což znamená, že ho můžete začít používat okamžitě.
- **Data uložena v souboru**: Data jsou ukládána do jednoho souboru (obvykle s příponou .db), který se automaticky vytváří.
- **Ideální pro menší projekty**: Hodí se pro vývojové účely nebo menší aplikace, které nepotřebují složitou správu dat nebo distribuovaný systém.
- **Přenositelnost**: Jednoduchý přenos databázového souboru mezi různými prostředími bez nutnosti složitého nastavení databázových služeb.

### Integrace SQLite do Flask aplikace
SQLite lze snadno integrovat s Flaskem pomocí knihovny Flask-SQLAlchemy, která zjednodušuje práci s relačními databázemi, včetně SQLite.

Prvním krokem je instalace knihovny Flask-SQLAlchemy.
```bash
pip install Flask-SQLAlchemy
```

Dále je potřeba v nastavení Flasku definovat cestu k databázovému souboru SQLite.
```python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mydatabase.db'  # Cesta k databázi SQLite
db = SQLAlchemy(app)
```

SQLite se tak stává skvělou volbou pro malé aplikace nebo pro vývoj, protože je jednoduchý na používání a vyžaduje minimální konfiguraci. Větší aplikace mohou později přejít na robustnější řešení, jako je [PostgreSQL](https://www.postgresql.org) nebo [MySQL](https://www.mysql.com).

### DB Browser for SQLite
[DB Browser for SQLite](https://sqlitebrowser.org) je open-source nástroj, který poskytuje uživatelsky přívětivé rozhraní pro práci s SQLite databázemi. Tento software umožňuje uživatelům snadno vytvářet, prohlížet a upravovat databáze bez nutnosti psaní SQL příkazů. Zde je několik klíčových vlastností a výhod, které DB Browser pro SQLite nabízí:
- **Uživatelsky přívětivé rozhraní**: DB Browser má intuitivní GUI, které usnadňuje práci s databázemi i pro uživatele bez zkušeností s SQL. Pomocí několika kliknutí lze provádět operace, které by jinak vyžadovaly složité příkazy.
- **Prohlížení a editace dat**: Uživatelé mohou snadno prohlížet obsah tabulek, přidávat nové záznamy, upravovat existující a mazat nepotřebné položky.
- **Tvorba a úprava databázových schémat**: DB Browser umožňuje snadné vytváření nových tabulek, definování datových typů a nastavování primárních a cizích klíčů.
- **Export a import dat**: Uživatelé mohou exportovat data z databáze do různých formátů, jako je CSV nebo SQL, a naopak importovat data z externích souborů.
- **Podpora SQL příkazů**: Ačkoliv se zaměřuje na vizuální správu databází, DB Browser také umožňuje spouštět SQL příkazy a skripty pro pokročilé uživatele, kteří chtějí mít větší kontrolu nad databázemi.
- **Podpora pro více platforem**: DB Browser pro SQLite je k dispozici pro Windows, macOS a Linux, což zajišťuje širokou dostupnost.

DB Browser for SQLite je skvělým nástrojem pro vývojáře, databázové administrátory a každého, kdo potřebuje efektivně spravovat SQLite databáze. Díky svému přehlednému rozhraní a široké škále funkcí je to ideální volba pro ty, kteří chtějí začít s databázemi nebo potřebují snadný způsob, jak spravovat existující databázové systémy.

### Další zdroje
- [SQLite oficiální dokumentace](https://sqlite.org/index.html)
- [Exercism SQLite tutorial](https://exercism.org/tracks/sqlite)
- [DB Browser for SQLite](https://sqlitebrowser.org) 

## 7.7 Databázové modely
Vytváření modelů pro tabulky v rámci Flask aplikací, obzvlášť při použití Flask-SQLAlchemy, je klíčovým krokem při práci s databázemi. Modely představují strukturu tabulek a umožňují snadnou interakci s databází.

Databázový model v kontextu Flasku a SQLAlchemy je třída, která definuje strukturu tabulky v databázi. Každá instance třídy odpovídá jednomu záznamu v tabulce. Modely umožňují interakci s databází pomocí objektově orientovaného programování.

Modely jsou obvykle definovány jako podtřídy `db.Model`, což je základní třída poskytnutá Flask-SQLAlchemy. Zde je základní příklad modelu pro tabulku `Book`:
```python
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Book(db.Model):
    __tablename__ = 'books'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    read = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f'<Book {self.title}>'
```
- `__tablename__`: Definuje název tabulky v databázi. Pokud není uvedeno, SQLAlchemy použije název třídy (s malými písmeny) jako výchozí název tabulky.
- `db.Column`: Tento objekt definuje sloupec tabulky. Parametry zahrnují typ dat (`db.String`, `db.Integer`, `db.Boolean` atd.) a další vlastnosti jako `primary_key`, `nullable`, `default` atd.
- `__repr__`: Tento metoda definuje, jak bude objekt modelu zobrazen při výpisu. Umožňuje snadnou identifikaci objektu při ladění.

Jakmile jsou modely vytvořeny, můžeme začít pracovat s daty. Například přidat nový záznam:
```python
new_book = Book(title='Název Knihy', author='Autor', read=False)
db.session.add(new_book)
db.session.commit()
```

Nebo získat všechny záznamy v databázi:
```python
books = Book.query.all()  # Získá všechny knihy
read_books = Book.query.filter_by(read=True).all()  # Získá přečtené knihy
```

Další ukázka databázového modelu ukazuje, jak vytvořit dvě třídy (modely) a vzájemně je propojit pomocí relací. V tomto případě budeme mít model `Author` a model `Book`. Každý autor může mít více knih, což nám umožňuje použít relaci typu "one-to-many".
```python
class Author(db.Model):
    __tablename__ = 'authors'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    birth_date = db.Column(db.Date, nullable=True)
    books = db.relationship('Book', backref='author', lazy=True)

    def __repr__(self):
        return f'<Author {self.name}>'

class Book(db.Model):
    __tablename__ = 'books'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    published_date = db.Column(db.Date, nullable=True)
    genre = db.Column(db.String(50), nullable=True)
    author_id = db.Column(db.Integer, db.ForeignKey('authors.id'), nullable=False)

    def __repr__(self):
        return f'<Book {self.title}, Author: {self.author.name}>'
```
**Model Author:**
- `id`: Primární klíč, typu `Integer`.
- `name`: Jméno autora, typu `String`, s nastavením `nullable=False`, což znamená, že toto pole musí být vyplněno.
- `birth_date`: Datum narození autora, typu `Date`, s možností být `nullable`.
- `books`: Vytváří relaci s modelem `Book`. `backref='author'` znamená, že každá kniha má zpětný odkaz na autora. `lazy=True` znamená, že související objekty (v tomto případě `books`) budou načteny z databáze v samostatném SQL dotazu, když se na ně poprvé odkázáte.

**Model Book:**
- `id`: Primární klíč, typu `Integer`.
- `title`: Název knihy, typu `String`, s nastavením `nullable=False`.
- `published_date`: Datum vydání knihy, typu `Date`, s možností být `nullable`.
- `genre`: Žánr knihy, typu `String`, s možností být `nullable`.
- `author_id`: Cizí klíč, který odkazuje na id v tabulce authors. To nám umožňuje spojit každou knihu s jejím autorem.

Přidání autora a knihy:
```python
# Přidání autora
new_author = Author(name='Karel Čapek', birth_date='1890-09-09')
db.session.add(new_author)
db.session.commit()

# Přidání knihy k autorovi
new_book = Book(title='R.U.R.', published_date='1920-01-01', genre='Science Fiction', author_id=new_author.id)
db.session.add(new_book)
db.session.commit()
```

Dotazování na data:
```python
# Získání všech knih a jejich autorů
books = Book.query.all()
for book in books:
    print(book.title, book.author.name)

# Získání autora a jeho knih
author = Author.query.filter_by(name='Karel Čapek').first()
print(f'Books by {author.name}:')
for book in author.books:
    print(book.title)
```

### Příklad
**Flask ukázka 11** je ukázka Flask aplikace, která ukládá data z formuláře do SQLite databáze.

### Příklad
**Flask ukázka 12** je ukázka Flask aplikace, která využívá databázové modely pro autora a knihu a ukládá data do SQLite databáze.


## 7.8 Základní operace s databází
Poté, co definujeme jednotlivé modely, můžeme s daty začít pracovat: vytvářet je, číst je, aktualizovat je nebo je mazat. Tyto čtyři základní operace jsou označovány jako **CRUD operace**.
- create (vytvořit) - vytvoření nového záznamu v databázi
- read (číst) - čtení nebo získání existujícího záznamu z databáze
- update (aktualizovat) - úprava existujících záznamů v databízi
- delete (smazat) - odstranění záznamu z databáze

CRUD operace se často mapují na HTTP metody:
- create -> POST
- read -> GET
- update -> PUT nebo PATCH
- delete -> DELETE


Než začneme s daty ve Flasku pracovat (a používat CRUD operace), je nutné databázi vytvořit.
```python
with app.app_context():
    db.create_all()  # Vytvoří tabulky na základě modelů
```

### Vložení nového záznamu (create)
Při vytváření nové položky, například uživatele, se data odešlou na server pomocí HTTP metody POST. Server tato data přijme a uloží je do databáze.
```python
@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    new_user = User(name=data['name'], email=data['email'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User created successfully!"}), 201
```
Tento kód přijme JSON data z požadavku a vytvoří nového uživatele v databázi.

### Dotazování se na data (read)
Čtení dat znamená načtení položek z databáze. To lze udělat pomocí HTTP metody GET.
```python
@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify({"id": user.id, "name": user.name, "email": user.email})
```
V tomto příkladu se na základě ID uživatele načtou data o konkrétním uživateli z databáze a vrátí se jako JSON.

Následující kód ukzauje, jak lze načíst všechny uživatele z databáze:
```python
users = User.query.all()
```

### Aktualizace dat (update)
Aktualizace existující položky probíhá pomocí metody PUT nebo PATCH. Uživatel poskytne nové hodnoty, které se zapíší do databáze.
```python
@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get_or_404(user_id)
    data = request.get_json()
    user.name = data['name']
    user.email = data['email']
    db.session.commit()
    return jsonify({"message": "User updated successfully!"})
```
Tento kód aktualizuje údaje o uživateli na základě ID a nových dat z požadavku.

### Mazání dat (delete)
Smazání položky probíhá pomocí metody DELETE. Tento požadavek odstraní konkrétní položku z databáze.
```python
@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully!"})
```
V tomto příkladu je uživatel odstraněn z databáze na základě jeho ID.

