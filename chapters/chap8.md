# 8. Finalizace projektu a nasazení
### OBSAH:

**Teorie**

- Autentizace uživatelů: Implementace základní autentizace pomocí Flask-Login nebo jiného nástroje.
- Nasazení aplikace: Jak nasadit Flask aplikaci na platformu PythonAnywhere.

**Projekt**

- Přidání autentizace uživatelů: Login page, Register page.
- Finalizace projektu "My TODO list": Dokončení aplikace, kontrola všech funkcionalit a opravení chyb.
- Nasazení aplikace na PythonAnywhere.com.

***

## 8.1 Autentizace uživatelů
Autentizace je proces ověření identity uživatele. Ve webových aplikacích je důležitá k ochraně citlivých dat a umožnění přístupu pouze autorizovaným uživatelům. Ve Flasku je možné implementovat autentizaci pomocí několika nástrojů, z nichž jeden z nejpoužívanějších je knihovna `Flask-Login`. Tato knihovna usnadňuje správu přihlášení uživatelů, ověření přihlášení na chráněných stránkách a správu relací (sessions).

### Hlavní principy autentizace:
- **Registrace uživatele**: Uživatel vytvoří účet zadáním uživatelského jména a hesla.
- **Přihlášení uživatele**: Po registraci uživatel zadá své přihlašovací údaje, které jsou ověřeny proti databázi.
- **Uchovávání přihlašovacího stavu**: Po úspěšném přihlášení je uživateli přiřazena **session**, která uchovává jeho stav přihlášení.
- **Odhlášení uživatele**: Uživatel se může kdykoliv odhlásit a session se ukončí.
- **Chráněné stránky**: Některé části aplikace mohou být přístupné pouze přihlášeným uživatelům.

### Autentizace s Flask-Login
[Flask-Login](https://flask-login.readthedocs.io/en/latest/) je rozšíření pro Flask, které slouží ke správě relací a autentizaci uživatelů v aplikacích. Usnadňuje implementaci přihlašování, odhlašování a ochranu přístupu k chráněným stránkám, aniž by vývojář musel řešit detaily správy uživatelských relací.

Balíček lze nainstalovat pomocí:
```bash
pip install flask-login
```

**Funkce a vlastnosti Flask-Login:**
- **Správa relací**: Flask-Login automaticky sleduje, zda je uživatel přihlášen, a spravuje jeho session. Po úspěšném přihlášení uživatel dostane session cookie, která je kontrolována při každém následujícím požadavku.
- **Dekorátory**: Poskytuje užitečný dekorátor `@login_required`, který umožňuje chránit určité části aplikace tak, že jsou dostupné pouze pro přihlášené uživatele. Pokud se nepřihlášený uživatel pokusí přistoupit na chráněnou stránku, bude přesměrován na přihlašovací stránku.
- **Správa uživatelských relací**: Flask-Login dokáže načíst uživatele podle ID z databáze prostřednictvím funkce `user_loader`, což umožňuje načítat informace o uživateli automaticky při každém požadavku.
- **Ochrana proti session fixation attacks**: Podporuje ochranu proti tzv. session fixation attacks tím, že umožňuje snadnou rotaci session ID, například po přihlášení nebo změně citlivých informací.
- **Podpora "remember me"**: Nabízí funkci trvalého přihlášení, která umožňuje uživateli zůstat přihlášený i po zavření prohlížeče (pomocí dlouhodobých cookies).
- **Odhlášení**: Flask-Login poskytuje jednoduchou funkci `logout_user()`, která ukončí relaci a odhlásí uživatele.

**Hlavní výhody Flask-Login:**
- **Jednoduchost**: Snadno se integruje a poskytuje jednoduché API pro správu autentizace.
- **Bezpečnost**: Podporuje standardní bezpečnostní postupy, jako je hashování hesel a správa session.
- **Flexibilita**: Umožňuje snadno rozšířit autentizaci o vlastní pravidla, jako je trvalé přihlášení nebo ochrana specifických stránek.

Flask-Login je užitečný nástroj pro každého, kdo potřebuje ve své aplikaci autentizaci uživatelů bez nutnosti implementace složité správy relací od základu.

### Příklad
**Flask ukázka 14** je ukázka použití Flask-Login.

### Příklad
**Flask ukázka 15** je další ukázka Flask-Login, tentokráte s použitím funkce pro uložení hesla v nečitelné podobě.

### Hashování hesla
Hashování hesel je zásadní technika v oblasti zabezpečení, která se používá k ochraně uživatelských hesel. Vzhledem k nárůstu kybernetických útoků a úniků dat je důležité, aby vývojáři implementovali správné metody pro uchovávání hesel.

**Proč používat hashování hesel**

- **Ochrana před úniky dat**: Pokud útočníci získají přístup k databázi, kde jsou hesla uložena jako prostý text, mohou okamžitě využít tato hesla pro neautorizovaný přístup. Hashováním hesel se zabezpečí, že i v případě úniku dat zůstane pro útočníky obtížné získat původní hesla.
- **Jednosměrnost**: Hashování je jednosměrný proces, což znamená, že původní heslo nelze z hashované hodnoty zpětně získat. To zvyšuje úroveň ochrany, protože i když je hash hesla kompromitován, nelze jej použít k odhalení původního hesla.
- **Zabezpečení proti útokům**: Správně implementované hashování zahrnuje další prvky, jako je použití soli (randomizovaného řetězce přidávaného k heslu před hashováním). To znemožňuje útočníkům použít předem vypočítané hashovací tabulky (rainbow tables) pro dešifrování hesel.

Hashování hesel zahrnuje dva hlavní kroky:

**1. Generování hashovaného hesla:**

Uživatel zadá své heslo při registraci. Funkce `set_password` využívá knihovnu jako je `Werkzeug`, která používá bezpečné hashovací algoritmy (např. PBKDF2) k vytvoření hashované hodnoty. Tento hash se uloží do databáze místo původního hesla.
```python
    def set_password(self, password):
        """Hash hesla pomocí Werkzeug"""
        self.password_hash = generate_password_hash(password)
```

**2. Ověření hesla:**
Když se uživatel pokusí přihlásit, zadané heslo se hashne stejným způsobem jako při registraci. Funkce `check_password` porovná hash hesla uloženého v databázi s novým hashem vytvořeným z uživatelského vstupu. Pokud se shodují, uživatel je autentizován.
```python
    def check_password(self, password):
        """Ověření hesla"""
        return check_password_hash(self.password_hash, password)
```

Tímto způsobem hashování hesel zajišťuje, že i v případě úniku databáze zůstávají hesla chráněná a nečitelné pro útočníky. Vzhledem k těmto zásadám a praktikám by každý vývojář měl brát hashování hesel jako standardní praxi pro zabezpečení uživatelských dat.

## 8.2 Autorizace uživatelů
Autentizace a autorizace jsou dva klíčové koncepty v oblasti zabezpečení informací, které slouží k ochraně systémů a dat. Přestože jsou často zaměňovány, mají různé funkce:

- **Autentizace** se zaměřuje na ověření identity uživatele. Jde o proces, při kterém systém potvrzuje, že uživatel je tím, kým tvrdí, že je. To se obvykle provádí prostřednictvím uživatelského jména a hesla.
- **Autorizace** na druhé straně určuje, jaká práva a oprávnění má autentizovaný uživatel. Jinými slovy, pokud je uživatel úspěšně autentizován, autorizace stanovuje, co může a co nemůže dělat v rámci systému.

Když se uživatel přihlásí do webové aplikace, systém nejprve ověří jeho identitu (autentizace) a poté zjistí, zda má právo přístup k určitém zdrojům nebo funkcím (autorizace).

Pro implementaci autorizace ve Flask aplikaci můžeme využít knihovnu `Flask-Login`, která zajišťuje autentizaci, a můžeme přidat vlastní logiku pro autorizaci. Zde je jednoduchý příklad:

**Definice rolí uživatelů**: Můžeme mít uživatele s různými rolemi (např. admin a běžný uživatel). Pro tento příklad přidáme do modelu `User` atribut `role`.
```python
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

db = SQLAlchemy()

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    role = db.Column(db.String(50), nullable=False, default='user')  # Role uživatele
```

**Ochrana endpointů na základě rolí**: Můžeme vytvořit dekorátor pro ochranu určitých stránek na základě rolí uživatelů.
```python
from functools import wraps
from flask import request, redirect, url_for, flash

def role_required(role):
    def wrapper(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if current_user.role != role:
                flash("You do not have permission to access this page.", "danger")
                return redirect(url_for("dashboard"))
            return f(*args, **kwargs)
        return decorated_function
    return wrapper
```

**Použití dekorátoru**: Nyní můžeme použít tento dekorátor k ochraně konkrétním stránek. Například, pokud máme stránku pro administrátorský dashboard, můžeme ji chránit takto:
```python
@app.route("/admin")
@login_required
@role_required('admin')
def admin_panel():
    return "Welcome to the admin panel!"
```

**Registrace a přihlašování**: Při registraci uživatelů můžeme přiřadit roli (např. při registraci admina nebo běžného uživatele) a uložit ji do databáze.
```python
@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        role = request.form.get("role", "user")  # Výchozí role je "user"
        new_user = User(username=username, role=role)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()
        flash("Registration successful!", "success")
        return redirect(url_for("login"))
    return render_template("register.html")
```

Autorizace uživatelů je klíčová pro zabezpečení aplikací, protože zajišťuje, že pouze oprávnění uživatelé mají přístup k citlivým informacím a funkcím. Implementace autorizace ve Flasku je relativně jednoduchá díky kombinaci autentizace a vlastních rolí. S využitím `Flask-Login` a dekorátorů lze efektivně spravovat přístup k různým částem aplikace.

### Příklad
**Flask ukázka 16** je ukázka použití Flask-Login pro autentizaci i autorizaci.


## 8.3 BONUS Flash messages
[Flash Messages](https://flask.palletsprojects.com/en/2.3.x/patterns/flashing/) jsou způsob, jakým aplikace mohou dočasně zobrazovat zprávy uživatelům. Typickými příklady použití jsou:

- Zprávy o úspěšné registraci nebo přihlášení.
- Upozornění na chyby, jako je neplatná přihlašovací informace.
- Jakékoli další notifikace, které jsou uživateli zobrazeny na krátkou dobu.

Flash Messages jsou užitečné zejména proto, že umožňují komunikaci mezi serverem a uživatelem bez nutnosti dlouhodobě ukládat tyto zprávy (například v databázi). Zpráva se zobrazí jen jednou a po obnovení stránky zmizí.

Flask poskytuje jednoduchý způsob, jak s flash zprávami pracovat. K tomu slouží funkce `flash()` a `get_flashed_messages()`. Flash Messages jsou součástí Flasku, takže není nutné nic nového instalovat.

### Použití Flash Messages ve Flasku
Nejdříve je potřeba ve Flask aplikaci nakonfigurovat tajný klíč (secret key), který jsme už potřebovali i dříve pro formuláře z knihovny `Flask-WTF`.
```python
from flask import Flask, flash, redirect, render_template, session, url_for

app = Flask(__name__)
app.secret_key = 't0p_s3cr3t_k3y'
```

Dále použijeme funkci `flash()` k vytvoření nové zprávy. Může se jednat o jednoduchý text a lze přidat i druh zprávy (success, error, warning).
```python
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        # Předstíraná validace uživatele
        if username == 'admin' and password == 'password':
            flash('Úspěšně přihlášeno!', 'success')
            return redirect(url_for('index'))
        else:
            flash('Neplatné uživatelské jméno nebo heslo.', 'error')
            return redirect(url_for('login'))
    return render_template('login.html')
```
Pokud se uživatel úspěšně přihlásí, zobrazí se flash zpráva o úspěchu. Pokud přihlášení selže, zobrazí se chyba.

Flash messages se zobrazují v šabloně pomocí funkce `get_flashed_messages()`.
```html
{% with messages = get_flashed_messages(with_categories=True) %}
    {% if messages %}
        <div>
            {% for category, message in messages %}
                <div class="alert alert-{{ category }} alert-dismissible fade show" role="alert">
                    {{ message }}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            {% endfor %}
        </div>
    {% endif %}
{% endwith %}
```
Tento kód vytvoří Bootstrap alert boxy na základě kategorie zprávy. Zprávy lze zavřít pomocí tlačítka.

V ukázce používáme Bootstrap komponenty pro alerty (výstražné boxy) k zobrazení flash messages. Druh zpráv jako `success`, `error`, `warning` se přirozeně mapují na styly Bootstrapu jako `alert-success`, `alert-danger`, a `alert-warning`.

### Příklad
**Flask ukázka 17** je ukázka použití Flash Messages.

Další ukázky použití Flash Messages najdete také v předchozích ukázkách 13, 14, 15, a 16.

## 8.4 Nasazení aplikace na PythonAnywhere
[PythonAnywhere.com](https://www.pythonanywhere.com) je populární cloudová služba, která umožňuje hostovat python weobvé aplikace vytvořené např. ve Flasku nebo Djangu.

### Klíčové vlastnosti PythonAnywhere:
- **Vývoj v prohlížeči**: Poskytuje online editor, takže můžete psát, spouštět a testovat Python kód přímo v prohlížeči.
- **Podpora webových aplikací**: Je zde možné nasadit své Flask, Django nebo jiné Python webové aplikace bez složité konfigurace.
- **Bezplatná a placená verze**: PythonAnywhere nabízí i bezplatný účet, což je ideální pro menší aplikace nebo projekty v rámci studia. Placené plány poskytují více zdrojů a lepší podporu.
- **Přístup k terminálu**: Nabízí přístup k online terminálu, kde lze pracovat s Pythonem a dalšími nástroji, instalovat knihovny pomocí pip a spravovat svůj projekt.
- **Naplánované úlohy (Scheduled tasks)**: Lze nastavit pravidelné spouštění Python skriptů.
- **Podpora MySQL, PostgreSQL, SQLite**: Poskytuje podporu pro databáze nebo i možnost připojit se na externí databázi.

### Nasazení Flask aplikace s SQLite databází
Na stránce https://www.pythonanywhere.com vyberte možnost "Start running Python online in less than a minute".

<img src="images/python-anywhere-1.png" alt="Nasazení Flask aplikace na PythonAnywhere - krok 1" width="1000">

Vytvořte si "Beginner account" a přihlaste se.

<img src="images/python-anywhere-2.png" alt="Nasazení Flask aplikace na PythonAnywhere - krok 2" width="1000">

Otevřete si stránku s dashboardem.

<img src="images/python-anywhere-3.png" alt="Nasazení Flask aplikace na PythonAnywhere - krok 3" width="1000">

Na stránce "Web" (viz horní menu) klikněte na "Add a new app". V prvním okně jen přejděte na další krok kliknutím na "Next". V druhém okně vyberte možnost "Flask".

<img src="images/python-anywhere-4.png" alt="Nasazení Flask aplikace na PythonAnywhere - krok 4" width="1000">

Dále vyberte nejvyšší možnou verzi Pythonu a v dalším okně nastavte cestu k hlavnímu Flask souboru.
```bash
/home/<username>/mysite/app.py
```
Kde místo `<username>` bude přihlašovací jméno, které jste uvedli při registraci.

<img src="images/python-anywhere-5.png" alt="Nasazení Flask aplikace na PythonAnywhere - krok 5" width="1000">

Všechno potvrďte a na konci se dostanete na stránku s přehledm o vaší nové (již zveřejněné) Flask aplikaci, kterou si můžete i prohlédnout na adrese `<username>.pythonanywhere.com`, kde místo `<username>` bude opět vaše přihlašovací jméno.

<img src="images/python-anywhere-6.png" alt="Nasazení Flask aplikace na PythonAnywhere - krok 6" width="1000">

Gratuluji, právě jste zveřejnili vaši první Flask aplikaci na platformě Python Anywhere. Zatím je to ale prázdná aplikace, která má jednu stránku s `Hello from Flask!`. Nyní si nahradíme tuto aplikaci našim kódem. V hlavním menu se přepněte na stránku `Files`. V levé části se přepněte do složky `/mysite` a nahrejte sem všechny soubory Flask aplikace. 

<img src="images/python-anywhere-7.png" alt="Nasazení Flask aplikace na PythonAnywhere - krok 7" width="1000">

Vraťte se na záložku "Web" a reloadujte aplikaci.

<img src="images/python-anywhere-8.png" alt="Nasazení Flask aplikace na PythonAnywhere - krok 8" width="1000">

Otevřete si vaši aplikaci na adrese `<username>.pythonanywhere.com`, kde místo `<username>` bude opět vaše přihlašovací jméno a zkontrolujte, že vše funguje, tak jak má. 

Gratuluji, právě jste deploynuli Flask aplikaci na platform Python Anywhere.
