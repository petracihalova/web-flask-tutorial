# 3. Základy CSS
CSS (Cascading Style Sheets) je jazyk používaný k formátování vzhledu webových stránek. Umožňuje oddělit obsah webových stránek (HTML) od jejich vizuálního stylu, což umožňuje lepší správu a údržbu. V této lekci si představíme, jak CSS funguje a jakým způsobem mohou ovlivňovat vzhled HTML prvků.

## 3.1 CSS
**CSS** je stylový jazyk, který popisuje, jak má být zobrazen obsah napsaný v HTML. CSS přidává designové prvky jako barvy, fonty, rozvržení stránky, rozestupy a další. Při použití CSS se odděluje design stránky od jejího obsahu, což umožňuje snadnější správu designu.

CSS funguje hierarchicky, kde se stylové předpisy aplikují podle specifických pravidel a priorit. Tento kaskádový efekt je klíčem k flexibilnímu a přehlednému formátování webových stránek.

### Hlavní vlastnosti CSS:

- **Styling a formátování:** CSS se používá k definování různých stylistických aspektů webových stránek, jako jsou barvy, písma, rozložení, okraje a další vizuální prvky.
- **Selektory:** CSS umožňuje cílit na specifické HTML elementy pomocí selektorů, což umožňuje aplikaci stylů na konkrétní části stránky. Například, `p` selektor cíluje všechny odstavce na stránce.
- **Kaskádovost:** Jak už název napovídá, kaskádovost umožňuje různým stylům soutěžit o aplikaci na stejný element. Pokud jsou na element aplikovány různé styly, CSS určí, který styl se použije na základě specifikace a pořadí.
- **Responsivita:** CSS také umožňuje návrh responzivních webových stránek, které se přizpůsobují různým zařízením a velikostem obrazovek pomocí technik jako jsou media queries.
- **Flexibilita:** Díky CSS lze snadno měnit vzhled webové stránky bez nutnosti upravovat HTML kód, což zjednodušuje údržbu a aktualizaci.

### Základní syntaxe CSS

CSS pravidla se skládají ze selektoru a deklarace, která zahrnuje vlastnost a hodnotu:
```css
selektor {
    vlastnost: hodnota;
}
```

Každý řádek deklarace končí středníkem. Počet deklarací / řádků není omezen a na pořadí jednotlivých řádků nezáleží.
```css
h1 {
    color: blue;
    font-size: 24px;
}
```

Tento příklad změní barvu všech nadpisů `<h1>` na modrou a nastaví jejich velikost na 24 pixelů.

Pokud potřebujeme nastavit jednu vlastnost více elementům, můžeme použít vícenásobný selektor.
```css
h1,
h2,
h3 {
   color: blue;
}
```

## 3.2 Způsoby připojení CSS k HTML
Existují tři základní způsoby, jak připojit CSS k HTML:

### Externí styly
CSS soubory jsou uloženy samostatně a připojeny k HTML souboru pomocí značky `<link>`. To je nejvíce doporučovaný způsob, který umožňuje snadné sdílení a údržbu stylů mezi více stránkami. Samotné styly jsou pak obsahem souboru s příponou `css`, (např. `styles.css`).

Soubor `index.html`:
```html
<head>
  <link rel="stylesheet" href="styles.css">
</head>
```

Soubor `styles.css`:
```css
h1 {
    color: blue;
    font-size: 24px;
}
```

### Interní styly
CSS kód je vložen přímo do HTML souboru mezi značky `<style>` v části `<head>`. Tento přístup je vhodný, když je styl použit pouze na jedné stránce.

```html
<head>
  <style>
    body {
      background-color: #f0f0f0;
    }
  </style>
</head>
```

### Inline styly 
CSS pravidla mohou být přímo vložena do HTML tagu pomocí atributu `style`. Tento způsob je však považován za nevhodný, protože narušuje oddělení obsahu a designu.

```html
<h1 style="color: blue;">Nadpis</h1>
```



## 3.3 Dědičnost v CSS
Dědičnost (inheritance) je klíčový koncept v kaskádových stylech (CSS), který umožňuje efektivně ovládat stylování webových stránek. Znamená, že některé vlastnosti nastavené na rodičovském elementu se automaticky aplikují i na jeho potomky, pokud pro ně nejsou definovány specifické hodnoty. Tento princip zjednodušuje tvorbu CSS a pomáhá udržovat stylování čisté a konzistentní.

Pokud není určitému elementu přímo přiřazena hodnota pro dědičnou vlastnost, převezme hodnotu svého nadřazeného (rodičovského) elementu. Například, pokud nastavíte barvu textu na nadřazeném elementu (např. `div`), všechny potomkové elementy (např. `p`, `span`, `h1`) tuto barvu zdědí, pokud jim není přiřazena jiná.

```css
/* Nadřazený element (div) má nastavenu barvu textu */
div {
  color: blue;
}

/* Potomkové elementy (h1 a p) zdědí barvu textu */
h1 {
  font-size: 24px;
}

p {
  font-size: 16px;
}
```
V tomto případě se text v obou elementech (`h1` a `p`) zobrazí modře, protože `color: blue;` je nastavena na rodičovském elementu `div`.

### Dědičné vs. nedědičné vlastnosti

Ne všechny CSS vlastnosti jsou dědičné. Zde je základní rozdělení:

**Dědičné vlastnosti:**
- Barva textu (`color`)
- Rodina písma (`font-family`)
- Velikost písma (`font-size`)
- Výška řádku (`line-height`)
- Zarovnání textu (`text-align`)

Tyto vlastnosti jsou běžně dědičné, protože jejich aplikování na nadřazený element často má smysl pro celý jeho obsah.

**Nedědičné vlastnosti:**
- Okraje (`margin`)
- Výplně (`padding`)
- Ohraničení (`border`)
- Velikost prvku (`width`, `height`)
- Plovoucí prvky (`float`)

Tyto vlastnosti obvykle nedávají smysl pro dědičnost, protože jsou určeny spíše pro konkrétní prvky a jejich rozložení na stránce. 

## 3.4 Komentáře CSS
Komentáře v CSS jsou užitečné pro poznámky v kódu, které vývojářům usnadňují orientaci, aniž by tyto poznámky ovlivňovaly výsledný vzhled stránky. Komentáře nejsou zpracovávány prohlížečem a neovlivňují výsledný styl. Slouží pouze pro přehlednost a dokumentaci kódu, což je zvláště užitečné při práci na rozsáhlejších projektech nebo při spolupráci v týmu.

Komentáře v CSS se uzavírají mezi znaky `/*` a `*/`. Jakýkoli text mezi těmito znaky bude ignorován prohlížečem.
```css
/* Toto je komentář, který nebude vidět na stránce */
body {
  background-color: #f0f0f0; /* Tento styl nastavuje barvu pozadí */
}
```


## 3.5 Barvy
Barvy jsou jednou z nejdůležitějších vlastností CSS, které umožňují upravit vzhled webových stránek. V CSS můžete použít různé způsoby, jak nastavit barvy pro text, pozadí nebo okraje HTML prvků. Existuje několik formátů pro zápis barev a několik vlastností, které s barvami souvisejí.

### Formáty zápisu barev
**Pojmenované barvy:**
V CSS je možné použít některé předdefinované názvy barev, jako je například `red`, `blue`, `green`, atd.
```css
color: red;
```

**Hexadecimální barvy:**
Barvy lze definovat také pomocí šestimístných nebo třímístných hexadecimálních kódů, které začínají znakem `#`.
```css
color: #ff0000;  /* Červená */
color: #0f0;     /* Zelená (zkrácený formát) */
```

**RGB, HSL:**
Definice barvy pomocí RGB (Red, Green, Blue) složek, kde každá hodnota může být od 0 do 255. Formát RGBA navíc umožňuje nastavit i průhlednost (alfa kanál).
Formát HSL (Hue, Saturation, Lightness) popisuje barvu pomocí odstínu, sytosti a světelnosti. Stejně jako RGBA, i HSLA umožňuje nastavit průhlednost.
```css
color: rgb(255, 0, 0);            /* Červená */
color: rgba(0, 0, 255, 0.5);      /* Poloprůhledná modrá */
color: hsl(120, 100%, 50%);       /* Zelená */
color: hsla(240, 100%, 50%, 0.3); /* Poloprůhledná modrá */
```

### Vlastnosti týkající se barev
- `color`: Tato vlastnost mění barvu textu daného HTML prvku.
- `background-color`: Slouží k nastavení barvy pozadí prvku.
- `border-color`: Můžete definovat barvu okrajů (rámu) prvku.
- `opacity`: Pomocí této vlastnosti lze nastavit průhlednost celého prvku (hodnoty od 0 do 1).

```css
p {
  color: blue;
}
div {
  background-color: #e7fbe6;
}
table {
  border-color: black;
}
img {
  opacity: 0.5; /* Poloprůhledný obrázek */
}
```

Použití správných barev je důležité pro vytvoření příjemného a intuitivního uživatelského rozhraní. Barvy mohou mít různé emocionální a kulturní významy, takže je třeba je vybírat pečlivě v závislosti na cílovém publiku webu. Existují speciální weby, kde je možné získat sady barev, které k sobě ladí, např. https://coolors.co.

## 3.6 Fonty
Písmo a jeho vlastnosti jsou klíčovou součástí designu webových stránek, které ovlivňují čitelnost a celkový vizuální dojem. Pomocí CSS můžete ovládat vzhled textu na stránce, od typu písma až po jeho velikost, styl nebo řádkování. V této kapitole se zaměříme na základní vlastnosti CSS pro práci s písmy.

### Výběr písma (fontu)
Vlastnost `font-family` určuje, jaký typ písma bude pro text použit. Vždy by měla být uvedena série písem oddělených čárkami - pokud prohlížeč nenačte první písmo, použije se další v pořadí. Pokud je v názvu písma mezera, je nutné jej uvést v uvozovkách. Poslední hodnota v sérii by měl být tzv. generický font. Jedná se o název skupiny písem, které mají společné charakteristiky. Není zaručeno použití konkrétního písma, ale na každém počítači se použije výchozí písmo dané kategorie.
```css
h1 {
   font-family: "Times New Roman", serif;
}

h2 {
   font-family: Arial, Helvetica, sans-serif;
}
```

Mezi generické fonty patří:
- `serif`: Písma s ozdobnými zakončeními (např. Times New Roman).
- `sans-serif`: Písma bez ozdobných zakončení (např. Arial, Helvetica).
- `monospace`: Písma, kde každé písmeno má stejnou šířku (např. Courier New).


Nastavení typů písma, jejich velikosti a stylů.
```css
h1 {
  font-family: Arial, sans-serif;
  font-size: 24px;
  font-weight: bold;
}
```

### Importování externích fontů
Kromě systémových písem můžete importovat vlastní písma například z [Google Fonts](https://fonts.google.com).
Nejprve je nutné písmo přidat v hlavičce HTML.
```html
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
```

A poté je můžete použít v CSS.
```css
body {
  font-family: 'Roboto', sans-serif;
}
```

### Velikost písma
Vlastnost `font-size` definuje velikost textu. Ta může být nastavena v různých jednotkách:
- `px`: pixely (např. `font-size: 16px;`)
- `em`: relativní jednotka závislá na velikosti písma rodičovského prvku (např. `font-size: 1.2em;`)
- `rem`: relativní jednotka založená na kořenovém prvku (`font-size: 1rem`)
- `%`: procenta (např. `font-size: 100%;`)


### Tloušťka písma
Vlastnost `font-weight` nastavuje tučnost písma. Lze použít klíčová slova jako `bold` nebo `normal`, případně čísla od 100 do 900 (400 je normální písmo, 700 je tučné písmo).

```css
h1 {
  font-weight: bold;
}
```

### Sklon písma
Vlastnost `font-style` definuje styl písma.
- `normal`: normální písmo
- `italic`: kurzíva
- `oblique`: nakloněné písmo

```css
em {
  font-style: italic;
}
```

### Výška řádku
Vlastnost `line-height` nastavuje výšku řádku, což může ovlivnit čitelnost textu. Obvykle se používají relativní hodnoty, například čísla bez jednotek nebo jednotky `em` a `%`.
```css
p {
  line-height: 1.5;
}
```

### Zarovnání textu
Vlastnost `text-align` umožňuje zarovnat text vlevo (`left`), vpravo (`right`), na střed (`center`) nebo do bloku (`justify`).
```css
h2 {
  text-align: center;
}
```

Písma a fonty hrají klíčovou roli v estetice webových stránek a jejich použitelnosti. Pomocí různých vlastností CSS lze měnit typ písma, velikost, styl, tučnost i řádkování, což vám dává plnou kontrolu nad vzhledem textu. Výběr vhodných písem a jejich kombinace může zásadně ovlivnit dojem z vaší webové aplikace.

## 3.7 Box model
CSS Box Model je základní koncept, který určuje, jak jsou HTML prvky zobrazeny na webové stránce. Každý prvek na stránce je považován za obdélníkový box, který má své rozměry a strukturu, a to bez ohledu na to, zda jde o text, obrázek nebo div. Box model umožňuje kontrolovat velikost prvků, jejich pozici a vzdálenosti mezi nimi.

Box model se skládá ze čtyř hlavních komponent:

### Obsah (content)
Oblast, kde se nachází skutečný obsah prvku, například text nebo obrázek. Velikost obsahu lze ovlivnit nastavením vlastností jako `width` a `height`.
```css
div {
  width: 200px;
  height: 150px;
}
```

### Vnitřní okraj (padding)
Definuje prostor mezi obsahem a okrajem boxu. Tento prostor je uvnitř boxu a může být nastaven různě pro každou stranu (nahoru, dolů, vlevo, vpravo) pomocí vlastností `padding-top`, `padding-right`, `padding-bottom`, `padding-left`, nebo jednoduše `padding` pro všechny strany najednou.
```css
div {
  padding: 20px; /* Nastaví stejný vnitřní okraj pro všechny strany */
}
```

### Okraj (border)
Okraj je čára kolem paddingu a obsahu. Může být nastavena tloušťka, styl a barva okraje. Podobně jako padding, okraj lze nastavit pro každou stranu zvlášť.
```css
div {
  border: 2px solid #333; /* Nastaví okraj o tloušťce 2px, stylu solid a barvě #333 */
}
```

### Vnější okraj (margin)
Margin je prostor mezi prvkem a okolními prvky na stránce. Margin je mimo box, který obsahuje obsah, padding a border. Lze ho rovněž nastavit pro každou stranu zvlášť, nebo pomocí jediné hodnoty.
```css
div {
  margin: 10px; /* Nastaví stejný vnější okraj pro všechny strany */
}
```

Ukázka box modelu v praxi:
```css
div {
  width: 300px;
  height: 150px;
  padding: 20px;
  border: 5px solid #000;
  margin: 10px;
}
```
V tomto případě:

- Obsah má rozměry `300px` × `150px`.
- Padding přidává `20px` prostoru uvnitř boxu kolem obsahu.
- Border přidává `5px` tloušťky okraje.
- Margin přidává `10px` prostoru kolem celého boxu.

<img src="/images/box-model.png" alt="Box model" width="300">


## 3.8 Rozložení stránky
CSS umožňuje vytvářet a upravovat rozložení webových stránek, což zajišťuje, aby byly dobře přizpůsobeny různým zařízením a obrazovkám. Umožňuje kontrolu nad tím, jak jsou prvky na stránce rozmístěny, jejich velikostí, vzdálenostmi a vztahy mezi nimi.

Nejdříve malé shrnutí:

HTML prvky se dělí na blokové a řádkové. Toto dělení ovlivňuje jejich chování v rámci stránky:
- Blokové prvky (např. `<div>`, `<h1`>, `<p>`) zabírají celou šířku kontejneru a vytvářejí nové řádky.
- Řádkové prvky (např. `<span>`, `<a>`, `<img>`) se zobrazují vedle sebe a nezpůsobují nové řádky.

Každý HTML prvek je vykreslen v tzv. box modelu, který se skládá z obsahu (content), vnitřního okraje (padding), okraje (border) a vnějšího okraje (margin).

CSS nabízí mnoho nástrojů pro rozložení prvků na stránce. 

### Rozložení pomocí `display` vlastnosti
Tato vlastnost určuje, jak bude prvek vykreslen na stránce. Některé z nejpoužívanějších hodnot jsou:

- `block`: Prvky jsou zobrazeny jako bloky, což znamená, že zabírají celou šířku dostupného prostoru.
```css
div {
  display: block;
  width: 100%;
}
```

- `inline`: Řádkové prvky zabírají jen tolik místa, kolik potřebují, a nevytvářejí nové řádky.
```css
span {
  display: inline;
  color: blue;
}
```

- `inline-block`: Kombinace řádkového a blokového chování. Prvek se chová jako řádkový, ale lze mu nastavit rozměry.
```css
button {
  display: inline-block;
  padding: 10px;
  background-color: lightgreen;
}
```

- `flex`: Flexbox usnadňuje práci s rozložením, protože umožňuje automatické přizpůsobení prvků. Aktivuje se nastavením `display: flex;`.
```css
.container {
  display: flex;
  justify-content: space-between;
}
```

### Flexbox
Flexbox je jedním z nástrojů pro zarovnání a rozložení prvků. Umožňuje snadné vytváření responzivních a dynamických rozvržení.
- `display: flex;` aktivuje flexbox na kontejneru
- `justify-content` ovládá horizontální zarovnání prvků v kontejneru

```css
.container {
  display: flex;
  justify-content: center; /* zarovná prvky do středu */
}
```

- `align-items` ovládá vertikální zarovnání prvků

```css
.container {
  display: flex;
  align-items: flex-start; /* prvky budou zarovnány nahoře */
}
```

- `flex-direction` určuje, zda budou prvky uspořádány v řádku nebo sloupci
```css
.container {
  display: flex;
  flex-direction: column; /* prvky budou v sloupci */
}
```

### Grid
Grid (mřížka) je další technika rozložení prvků. Umožňuje rozdělit stránku na mřížku a umístit prvky do jednotlivých buněk.
- `display grid;` aktivuje grid pro kontejner
- `grid-template-columns` a `grid-template-rows` určují počet sloupců a řádků

```css
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* tři sloupce stejné šířky */
  grid-template-rows: auto; /* automaticky výška řádků */
}
```

- `grid-gap` nastavuje mezery mezi buňkami
```css
.grid-container {
  display: grid;
  grid-gap: 10px;
}
```

Ukázka rozložení pomocí gridu:
```html
<div class="grid-container">
  <div class="grid-item">Prvek 1</div>
  <div class="grid-item">Prvek 2</div>
  <div class="grid-item">Prvek 3</div>
</div>
```

Tento kód vytvoří třísloupcové rozložení s mezerou 10px mezi jednotlivými prvky.

### Responsivita pomocí media queries
Pro responzivní design, tedy aby web vypadal dobře na různých zařízeních, se používají media queries. Ty umožňují aplikovat CSS pravidla na základě velikosti obrazovky nebo jiných podmínek.

```css
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}
```
Toto pravidlo říká, že pokud je šířka obrazovky menší než 768px, prvky v kontejneru budou zobrazeny ve sloupci namísto řádku.

### Pozice prvků
Vlastnost `position` určuje, jak bude prvek umístěn v rámci stránky:
- `static`: Výchozí hodnota, prvek se řadí podle normálního toku stránky.
- `relative`: Prvek je umístěn relativně k jeho normální pozici.

```css
.box {
  position: relative;
  top: 10px; /* posune prvek o 10px dolů */
}
```

- `absolute`: Prvek je umístěn absolutně vůči nejbližšímu nadřazenému prvku s `position: relative;`.
```css
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

- `fixed`: Prvek je pevně umístěn vůči oknu prohlížeče.
```css
.fixed-menu {
  position: fixed;
  bottom: 0;
  width: 100%;
}
```

- `sticky`: Prvek se chová jako relativní, dokud se nedostane do určité pozice, kde zůstane fixován.
```css
.header {
  position: sticky;
  top: 0;
}
```

### Floating
Vlastnost `float` se používá k tomu, aby se prvek "plavil" vlevo nebo vpravo a ostatní obsah jej obklopoval.
```css
.image {
  float: left;
  margin-right: 10px;
}
```

### Ukázka využití flexboxu a gridu
Tento kód poskytuje základní šablonu pro jednoduché responzivní rozložení stránky.
- Hlavička (header) a patička (footer) jsou zarovnány na střed s pozadím v tmavé barvě.
- Hlavní část (main) využívá CSS Grid k rozložení do dvou sloupců: levý sidebar (navigace) a pravý content (hlavní obsah).
- Flexbox zajistí, že celá stránka zabere výšku celé obrazovky (height: 100vh), a Grid rozdělí prostor mezi navigací a obsahem s mezerou pomocí gap: 10px.

```html
<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Layout pomocí Flexboxu a Gridu</title>
    <style>
        /* CSS pro rozložení */
        .container {
            display: flex;
            flex-direction: column;
            height: 100vh;
        }

        header, footer {
            background-color: #333;
            color: white;
            text-align: center;
            padding: 10px;
        }

        main {
            display: grid;
            grid-template-columns: 1fr 3fr;
            gap: 10px;
            flex-grow: 1;
            padding: 10px;
        }

        .sidebar {
            background-color: #f0f0f0;
            padding: 20px;
        }

        .content {
            background-color: #e7e7e7;
            padding: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Moje Webová Stránka</h1>
        </header>

        <main>
            <aside class="sidebar">
                <h2>Navigace</h2>
                <ul>
                    <li><a href="#">O nás</a></li>
                    <li><a href="#">Služby</a></li>
                    <li><a href="#">Kontakt</a></li>
                </ul>
            </aside>

            <section class="content">
                <h2>Hlavní obsah</h2>
                <p>Toto je hlavní obsah stránky. Zde může být text, obrázky nebo jiné prvky.</p>
            </section>
        </main>

        <footer>
            <p>&copy; 2024 Moje Webová Stránka</p>
        </footer>
    </div>
</body>
</html>
```

## 3.9 CSS třídy
CSS třídy (class) umožňují flexibilně stylovat HTML prvky. Pomocí tříd můžeme aplikovat stejný styl na více elementů, aniž bychom museli pro každý z nich vytvářet vlastní styly. Jsou jedním z nejčastěji používaných způsobů selektování prvků v CSS.

V HTML přidáváme třídu k prvku pomocí atributu `class`, a v CSS třídy definujeme pomocí tečky (`.`) před názvem třídy.

Třída v HTML se přidává následujícím způsobem:
```html
<p class="important">Toto je důležitý odstavec.</p>
```

V CSS pak můžeme tuto třídu stylovat takto:
```css
.important {
    color: red;
    font-weight: bold;
}
```
Výsledkem bude, že text odstavce s třídou important bude červený a tučný.

**Příklad použití tříd**

Představme si, že chceme mít na stránce tři odstavce, přičemž dva z nich budou speciálně zvýrazněné. Můžeme vytvořit třídu pro zvýraznění a aplikovat ji jen na vybrané odstavce:
```html
<p class="highlight">Toto je zvýrazněný odstavec.</p>
<p>Toto je běžný odstavec.</p>
<p class="highlight">Tento odstavec je také zvýrazněný.</p>
```

A CSS kód pro tuto třídu:
```css
.highlight {
    background-color: yellow;
    font-style: italic;
}
```
V tomto příkladu budou dva odstavce mít žluté pozadí a budou napsány kurzívou.

**Více tříd na jednom prvku**
Jedna HTML značka může mít přiděleno více tříd. V takovém případě se styly všech tříd kombinují:
```html
<p class="highlight important">Toto je důležitý a zvýrazněný odstavec.</p>
```

V CSS bychom měli definice obou tříd:
```css
.highlight {
    background-color: yellow;
}

.important {
    color: red;
    font-weight: bold;
}
```
Výsledkem bude, že odstavec bude mít žluté pozadí a text bude červený a tučný.

## 3.10 CSS identifikátor
ID (identifikátor) v HTML a CSS je unikátní atribut, který slouží k identifikaci jednoho konkrétního prvku na stránce. Zatímco třídy mohou být aplikovány na více prvků současně, ID by mělo být v rámci jednoho HTML dokumentu použito pouze jednou pro jediný prvek. ID slouží k přesnějšímu cílení stylů nebo JavaScriptových operací.

ID se přidává k HTML elementu jako atribut `id`. Následně se v CSS pro ID používá symbol mřížky `#` k selektování daného prvku.

Příklad HTML kódu s ID:
```html
<p id="main-paragraph">Toto je hlavní odstavec.</p>
```

A CSS pravidlo pro stylování tohoto ID:
```css
#main-paragraph {
    font-size: 20px;
    color: blue;
    text-align: center;
}
```
Tento kód zajistí, že text odstavce s ID main-paragraph bude modrý, velký a zarovnaný na střed.

### Hlavní vlastnosti ID
- **Unikátnost:** ID by mělo být jedinečné pro každý prvek na stránce. Pokud použijete stejné ID vícekrát, může to vést k nepředvídatelnému chování.
- **Větší specifita:** Stylování pomocí ID má vyšší prioritu než stylování pomocí tříd. To znamená, že pokud prvek má jak třídu, tak ID, styl definovaný pro ID bude mít přednost.

### Použití ID v praxi
- **Unikátní stylování pro konkrétní prvek:** Pokud potřebujeme aplikovat jedinečné styly na jeden konkrétní prvek (např. hlavní nadpis stránky nebo speciální tlačítko).
- **Cílení v JavaScriptu:** ID se často používá při manipulaci s prvky pomocí JavaScriptu, protože umožňuje snadné a jednoznačné výběry prvků pomocí funkce jako `getElementById()`.

```javascript
let element = document.getElementById("main-paragraph");
element.style.color = "green";
```
Tento kód změní barvu textu odstavce s ID main-paragraph na zelenou.

- **Navigace na stránce (kotvy):** ID se používá pro vytvoření tzv. kotvy, což umožňuje přímé přeskočení na konkrétní část stránky. Tento mechanismus je často využíván v odkazech v rámci jedné stránky.

```html
<a href="#section1">Přejít na sekci 1</a>

<section id="section1">
    <h2>Sekce 1</h2>
    <p>Obsah první sekce.</p>
</section>
```
Když kliknete na odkaz, prohlížeč automaticky posune stránku k sekci s ID section1.

## 3.11 Další zdroje
- [W3schools CSS Tutorial](https://www.w3schools.com/css/default.asp)
- [Základy CSS za 10 minut (Youtube)](https://www.youtube.com/watch?v=rHbihvwSvI8)
- [Khan Academy Úvod do HTML a CSS](https://cs.khanacademy.org/computing/computer-programming/html-css)