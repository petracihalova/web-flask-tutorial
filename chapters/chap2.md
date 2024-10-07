# 2. Základy HTML
HTML (HyperText Markup Language) je základní značkovací jazyk, který se používá k tvorbě struktury webových stránek. V této kapitole se naučíme, jak HTML funguje a jak pomocí něj vytvářet základní struktury webu.

## 2.1 HTML
HTML je značkovací jazyk, který využívá tzv. "tagy" (HTML značky) k označení jednotlivých částí obsahu (nadpisy, odstavce, obrázky). Webové prohlížeče interpretují HTML kód a zobrazují obsah stránky na obrazovce.

HTML není programovací jazyk, protože neumožňuje provádět žádné logické operace.

## 2.2 HTML značky
HTML značky jsou uzavřeny v úhlových závorkách a většinou mají párovou strukturu. 
```
<tag>Obsah</tag>
```

Příkladem může být značka pro nadpis prvního stupně `<h1>`:
```html
<h1>Toto je nadpis prvního stupně</h1>
```

### Párové a nepárové značky
**Párové značky** se skládají ze dvou částí: otevírací značky a uzavírací značky. Otevírací značka definuje začátek prvku a uzavírací značka jeho konec. Mezi těmito značkami je umístěn obsah.

- `<p>` - odstavec
- `<h1>` až `<h6>` - nadpisy různých úrovní
- `<div>` - blokový prvek

Příklad použití párové značky pro odstavec textu.
```html
<p>Toto je odstavec textu</p>
```

**Nepárové značky** nemají uzavírací část. 

- `<img>` - pro vkládání obrázků
- `<br>` - pro přidání zalomení řádku
- `<hr>` - pro vložení vodorovné čáry

Příklad použití nepárové značky pro vložení obrázku.
```html
<img src="obrazek.jpg" alt="Popis obrázku">
```

### Vnořování značek
HTML značky mohou být vkládány (vnořovány) do sebe. To znamená, že uvnitř jedné značky můžete mít další značky. Například:
```html
<div>
    <h2>Nadpis druhého stupně</h2>
    <p>Toto je odstavec uvnitř bloku div.</p>
</div>
```
V tomto příkladu je značka `<h2>` a `<p>` vnořena uvnitř bloku `<div>`. Vnořování značek umožňuje vytvářet složitější a strukturovanější webové stránky.

### Atributy značek
Atributy HTML značek poskytují dodatečné informace o prvcích na webové stránce. Každý atribut se skládá z názvu a hodnoty, které určují, jak bude daný prvek vypadat nebo se chovat.

Atributy se umisťují uvnitř otevírací značky HTML prvku a jejich syntaxe vypadá takto:

```html
<tagname attribute="value">Obsah</tagname>
```

Například:
```html
<a href="https://www.google.com">Navštivte Google</a>
```
V tomto případě `href` je atribut a `https://www.google.com` je jeho hodnota.

Atributy hrají klíčovou roli v interaktivitě a použitelnosti webových stránek. Pomocí atributů můžeme definovat, jak bude prvek reagovat na uživatelské akce, a jakým způsobem bude prezentován. Správné používání atributů také přispívá k lepší optimalizaci pro vyhledávače a usnadňuje přístupnost pro uživatele s různými potřebami.

## 2.3 HTML elementy
**Element** je kompletní struktura, která zahrnuje otevírací značku, obsah a zavírací značku. Element reprezentuje konkrétní část dokumentu.
Například element `<p>Toto je odstavec textu.</p>` zahrnuje otevírací značku `<p>`, textový obsah a zavírací značku `</p>`.

Element může obsahovat další vnořené elementy, oproti tomu značka je pouze jedním komponentem této struktury.

## 2.4 HTML stránka a její základní struktura
HTML stránka je dokument vytvořený pomocí značkovacího jazyka HTML. Pomocí HTML definujeme strukturu a obsah webové stránky. Stránka se skládá z různých elementů, které obsahují text, obrázky, odkazy, tabulky a další multimediální obsah. Každá HTML stránka je typicky uložena s příponou `.html`.

Každý HTML dokument začíná a končí určitou strukturou. Základní struktura vypadá takto:

```html
<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Název stránky</title>
</head>
<body>
    <h1>Toto je nadpis</h1>
    <p>Toto je odstavec textu.</p>
</body>
</html>
```

Vysvětlení jednotlivých částí:

- `<!DOCTYPE html>` určuje typ dokumentu a verzi HTML
- `<html lang="cs">` otevírá HTML dokument a nastavuje jazyk na češtinu
- `<body>` obsahuje hlavní obsah stránky, který se zobrazuje uživatelům
- `<head>` obsahuje metadata o dokumentu, jako je název stránky, odkazy na styly atd.

## 2.5 HTML editor
HTML editory jsou nástroje, které usnadňují psaní a editaci HTML kódu. Tyto editory mohou být jednoduché textové editory nebo sofistikované vývojové prostředí (IDE = Integrated Development Environment), které poskytují pokročilé funkce, jako je zvýraznění syntaxe, automatické dokončování kódu a nástroje pro ladění.

### Visual Studio Code (VS Code)
Jedním z nejpopulárnějších editorů pro psaní HTML je [Visual Studio Code](https://code.visualstudio.com) (VS Code). VS Code je open-source editor vyvinutý společností Microsoft, který nabízí širokou škálu funkcí:

- **Zvýraznění syntaxe:** Pomáhá snadno identifikovat různé prvky HTML kódu.
- **Automatické dokončování:** Urychluje psaní kódu tím, že navrhuje možné dokončení při psaní.
- **Rozšíření:** Umožňuje instalovat různé pluginy pro přidání funkcí, jako je podpora pro různé programovací jazyky nebo nástroje pro práci s databázemi.
- **Integrovaný terminál:** Umožňuje spouštět příkazy přímo z editoru.

Díky těmto vlastnostem je VS Code ideálním nástrojem pro začátečníky i pokročilé vývojáře, kteří chtějí efektivně pracovat s HTML a dalšími webovými technologiemi.


## 2.6 Hlavní HTML značky
HTML značky jsou základem každé webové stránky. Pro lepší orientaci je můžeme rozdělit do několika skupin podle jejich funkcí. Následující kapitola popisuje hlavní skupiny HTML značek, jejich použití a příklady.

### Strukturální značky
Strukturální značky definují základní stavební bloky HTML dokumentu, které tvoří jeho kostru.

- `<html>`: Značka, která obaluje celý HTML dokument. Každá webová stránka začíná a končí touto značkou.
- `<head>`: Značka, která obsahuje metadata stránky, například informace o kódování, styly a skripty.
- `<body>`: Značka, ve které se nachází veškerý viditelný obsah stránky.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Moje stránka</title>
  </head>
  <body>
    <h1>Vítejte na mé stránce!</h1>
    <p>Toto je úvodní odstavec.</p>
  </body>
</html>
```

### Nadpisy a text
Tyto značky se používají k formátování nadpisů, odstavců a jiného textu na stránce.

- `<h1>` - `<h6>`: Nadpisové značky. `<h1>` je nejvýznamnější nadpis, zatímco `<h6>` nejméně.
- `<p>`: Značka pro odstavec.
- `<br>`: Nepárová značka, která přidává zalomení řádku (= bez nutnosti uzavírací značky).
- `<strong>` a `<em>`: Zvýraznění textu. `<strong>` vytvoří tučný text, `<em>` kurzívu.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Moje stránka</title>
  </head>
  <body>
    <h1>Nadpis 1. úrovně</h1>
    <h2>Nadpis 2. úrovně</h2>
    <h3>Nadpis 3. úrovně</h3>
    <p>Odstavec plný zajímavého textu, kdy významná slova jsou zvýrazněna <strong>tučně</strong> a citace <em>kurzívou</em>.</p>
    <p>Druhý odstavec plný zajímavého textu, <br>který je rozdělen na 2 řádky značkou pro zalomení řádku.</p>
  </body>
</html>
```

### Odkazy a navigace
Značky pro vytváření odkazů a navigačních prvků.

- `<a>`: Definuje odkaz. Pomocí atributu `href` určíme, kam bude odkaz směřovat.
- `<nav>`: Značka pro definování navigačního menu. Používá se k organizování odkazů.

```html
<nav>
  <a href="index.html">Domů</a> |
  <a href="about.html">O nás</a> |
  <a href="contact.html">Kontakt</a>
</nav>
```

### Seznamy
Seznamy jsou důležitou součástí HTML, protože umožňují organizovat obsah do přehledných bodů, čísel nebo definic. Používají se pro strukturování informací v bodech, číslech nebo definicích.

- `<ul>`: Neuspořádaný (odrážkový) seznam. Jednotlivé položky jsou zobrazeny jako odrážky (bullet points).
- `<ol>`: Uspořádaný (číslovaný) seznam. Položky jsou zobrazeny s čísly nebo písmeny.
- `<li>`: Položka seznamu. Tuto značku používáme uvnitř seznamů `<ul>` nebo `<ol>`, aby definovala jednotlivé položky.
- `<dl>`: Seznam definic. Tento seznam umožňuje definovat páry termín-popis.
- `<dt>`: Termín v seznamu definic.
- `<dd>`: Popis termínu v seznamu definic.

Neuspořádaný seznam (odrážky):
```html
<ul>
  <li>První položka</li>
  <li>Druhá položka</li>
  <li>Třetí položka</li>
</ul>
```

Uspořádaný seznam (číslovaný):
```html
<ol>
  <li>První krok</li>
  <li>Druhý krok</li>
  <li>Třetí krok</li>
</ol>
```

Seznam definic:
```html
<dl>
  <dt>HTML</dt>
  <dd>Značkovací jazyk pro vytváření webových stránek.</dd>
  <dt>CSS</dt>
  <dd>Jazyk pro definování stylů webových stránek.</dd>
</dl>
```

### Obrázky a média
Slouží pro vložení obrázků, videí a jiných multimédií.

- `<img>`: Vkládá obrázek. Atribut `src` určuje cestu k souboru, `alt` poskytuje alternativní text, pokud se obrázek nenačte.
- `<video>` a `<audio>`: Vkládají video a audio obsah.

```html
<img src="obrazek.jpg" alt="Popis obrázku" width="300">
```

### Formuláře
Používají se pro vytváření interaktivních formulářů.

- `<form>`: Obaluje celý formulář. Určuje, kam budou data odeslána pomocí atributu `action`.
- `<input>`: Vkládá různé druhy polí (textové pole, tlačítko, checkbox, apod.).
- `<label>`: Přidává popisek pro pole ve formuláři.

```html
<form action="/submit">
  <label for="name">Jméno:</label>
  <input type="text" id="name" name="name">
  <input type="submit" value="Odeslat">
</form>
```

### Tabulky
Značky sloužící pro vytváření tabulek.

- `<table>`: Definuje celou tabulku.
- `<tr>`: Řádek v tabulce.
- `<td>`: Buňka v řádku.
- `<th>`: Záhlaví sloupce.

```html
<table>
  <tr>
    <th>Jméno</th>
    <th>Věk</th>
  </tr>
  <tr>
    <td>John</td>
    <td>25</td>
  </tr>
</table>
```

### Značky pro rozložení stránky
Tyto značky pomáhají strukturovat rozložení stránky.

- `<div>`: Blokový prvek pro seskupení obsahu. Využívá se především v kombinaci s CSS pro rozložení stránky.
- `<span>`: Řádkový prvek pro seskupení malého množství textu nebo jiného obsahu.

```html
<div class="container">
  <div class="left-column">Levý sloupec</div>
  <div class="right-column">Pravý sloupec</div>
</div>
```

### Komentáře
Komentáře v HTML slouží k přidávání poznámek nebo vysvětlení do kódu, které nejsou zobrazeny uživatelům na webové stránce. Jsou užitečné pro dokumentaci kódu nebo dočasné odstranění některých částí kódu, aniž byste je museli úplně smazat.

```html
<!-- Tady začíná hlavička stránky -->
<header>
    <h1>Moje webová stránka</h1>
</header>
<!-- Konec hlavičky -->
```

Vše, co je umístěno mezi značky `<!--` a `-->`, bude považováno za komentář a nebude zobrazeno v prohlížeči.
Komentáře mohou obsahovat jakýkoliv text nebo HTML kód, který chcete dočasně skrýt. 
Komentáře jsou v HTML velmi užitečné pro větší přehlednost a čitelnost kódu, obzvláště při práci na větších projektech nebo při spolupráci s ostatními vývojáři.


## 2.7 Cvičení
- Vytvořte si složku `prvni_html_stranka` a v této složce soubor `index.html`.
- Zkopírujte si následující HTML stránku do souboru `index.html` a soubor otevřete ve webovém prohlížeči. 
- Zkuste si postupně přidat elementy z předchozí kapitoly, upravujte elementy nebo je mažte a sledute, jak se mění výsledná stránka.
- Stáhněte si libovolný obrázek do složky `prvni_html_stranka` a přejmenujte ho na `obrazek.jpg`. Můžete použít obrázek [zde](images/books.jpg).

```html
<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Moje první webová stránka</title>
</head>
<body>
    <h1>Vítejte na mé první webové stránce!</h1>
    <p>Toto je odstavec textu na mé stránce.</p>
    <a href="https://www.example.com" target="_blank">Navštivte můj oblíbený web</a>
    <img src="obrazek.jpg" alt="Popis obrázku">
    
    <h2>Seznam mých oblíbených knih</h2>
    <ul>
        <li>Kniha 1</li>
        <li>Kniha 2</li>
        <li>Kniha 3</li>
    </ul>

    <h2>Moje oblíbené aktivity</h2>
    <ol>
        <li>Čtení knih</li>
        <li>Procházky v přírodě</li>
        <li>Programování</li>
    </ol>

    <h2>Tabulka s informacemi</h2>
    <table border="1">
        <tr>
            <th>Jméno</th>
            <th>Věk</th>
        </tr>
        <tr>
            <td>Jan</td>
            <td>30</td>
        </tr>
        <tr>
            <td>Petra</td>
            <td>25</td>
        </tr>
    </table>
</body>
</html>
```

## 2.8 Další zdroje
- [W3schools HTML Tutorial](https://www.w3schools.com/html/default.asp)
- [Základy HTML za 10 minut (Youtube)](https://www.youtube.com/watch?v=evVDTB2mOYE)
- [Khan Academy Úvod do HTML a CSS](https://cs.khanacademy.org/computing/computer-programming/html-css)