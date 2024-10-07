# 4. Projekt: Jednoduchá webová stránka
Nyní si vytvoříme jednoduchou jednostránkovou webovou stránku (one page), která bude sloužit jako pozvánka na podzimní grilování. Naučíme se vytvářet základní rozložení stránky, navigaci, vkládání textů, odkazů, tabulky, fotogalerii, widgety a kontaktní informace.

Výsledek si můžete prohlédnout [zde](https://petracihalova.github.io/grill_party_web/).

Našim cílem je vytvořit jednoduchou pozvánku na podzimní grilování a pak ji zveřejnit na internetu.

## 4.1 Základní struktura
Na svém počítači si vytvořte složku s názvem `grill_party_web`. Stáhněte si soubory [zde](files/source_files_v1.zip) a rozbalte je do složky. Složku `grill_party_web` si otevřete ve svém Visual Studio Code (VS Code). Dále si vytvořte zatím prázdné soubory `index.html` a `styles.css`. Ve svém projektu byste měli mít tuto strukturu souborů a složek.
```bash
├── grill_party_web
│   ├── colors.txt
│   ├── images
│   │   ├── background-header.jpg
│   │   ├── grill_party1.jpg
│   │   ├── grill_party10.jpg
│   │   ├── grill_party11.jpg
│   │   ├── grill_party12.jpg
│   │   ├── grill_party13.jpg
│   │   ├── grill_party14.jpg
│   │   ├── grill_party2.jpg
│   │   ├── grill_party3.jpg
│   │   ├── grill_party4.jpg
│   │   ├── grill_party5.jpg
│   │   ├── grill_party6.jpg
│   │   ├── grill_party7.jpg
│   │   ├── grill_party8.jpg
│   │   └── grill_party9.jpg
│   ├── index.html
│   ├── styles.css
│   └── texts.txt
```
Soubor `texts.txt` obsahuje všechny texty použité v projektu a soubor `colors.txt` všechny barvy, které použijeme pro naše styly.


Otevřete si soubor `index.html` a vložte si do něj základní HTML strukturu
```html
<!DOCTYPE html>
<html lang="cs">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>

</body>

</html>
```
Kde:
- `<!DOCTYPE html>` říká prohlížeci, že používáme dokument typu HTML
- `<html lang="cs">` je otevírací tag pro hlavní prvek HTML dokumentu `<html>` a zároveň obsahuje atribut `lang="cs"`, který specifikuje jazyk obsahu stránky, v tomto případě češtinu. To pomůže prohlížečům a vyhledávačům lépe interpretovat text
- `<head>` blok obsahuje metadata o stránce, která nejsou viditelná pro uživatele stránky, ale jsou důležitá pro prohlížeče, vyhledávače a další nástroje
- `<meta charset="UTF-8">` definuje kódováí znaků stránky jako UTF-8, což je standardní kódování podporující širokou škálu znaků z různých jazyků
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">` zajišťuje, že stránka bude responzivní = přizpůsobí se velikosti obrazovky zařízení, kde `width=device-width` znamená, že šířka viewportu odpovídá šířce zařízení a `initial-scale=1.0` nastavuje počáteční zoom stránky na 100 %
- `<title>Document</title>` určuje název stránky, který se zobrazuje v záložce v prohlížeči
- `<body>` blok obsahuje veškerý viditelný obsah webové stránky

Dále si do části body vložte blok pro záhlaví `header`, navigaci `nav` a zápatí `footer`. Jednotlivé bloky budeme tvořit v dalších kapitolách. Nyní si do nich vložte libovolný text. Blok `body` teď bude vypadat nějak takto.
```html
<body>
    <header>Záhlaví</header>

    <nav>Navigace</nav>

    Tady budou sekce

    <footer>Zápatí</footer>
</body>
```

Nakonec si v hlavičce stránky (`meta`) změňte titul stránky na "Grilování u Nováků".
```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Grilování u Nováků</title>
</head>
```

Otevřete si soubor `index.html` ve webovém prohlížeči a zkontrolujte výsledek.

## 4.2 Záhlaví
Do záhlaví (`header`) si vložte element `h1` s textem "Pozvánka na podzimní grilování u Nováků 2024" a element pro odstavec `p` s textem "Vážená rodino a přátelé, srdečně Vás zveme na naše tradiční podzimní grilování u příležitosti oslavy konce léta a začátku školního roku.".

Nad `h1` vložte obrázek ze složky `images` s názvem `background-header.jpg`.

### Jak vložit obrázek?
Pro vložení obrázku do HTML stránky se používá tag `<img>`. Tento tag není párový, což znamená, že nemá žádný koncový tag.

Nejdůležitější atributy tagu `<img>` jsou:

- `src`: Cesta k souboru s obrázkem (může být relativní nebo absolutní).
- `alt`: Alternativní text, který se zobrazí, pokud obrázek nelze načíst. Tento text je důležitý i pro přístupnost stránek, např. pro uživatele s poruchou zraku.
- `width` a `height`: Šířka a výška obrázku. Pokud není nastaveno, prohlížeč zobrazí obrázek v jeho původní velikosti.

```html
<img src="obrazek.jpg" alt="Popis obrázku" width="500" height="300">
```

### Zpátky k projektu
Výsledná hlavička našeho projektu bude vypadat nějak takto:
```html
<header>
    <img src="images/background-header.jpg" alt="Grilování špekáčků">
    <h1>Pozvánka na podzimní grilování u Nováků 2024</h1>
    <p>
        Vážená rodino a přátelé, srdečně Vás zveme na naše tradiční podzimní grilování u příležitosti oslavy konce léta a začátku školního roku.
    </p>
</header>
```

## 4.3 Zápatí
Do zápatí (`footer`) stránky si vložte element pro odstavec `p` spolu s textem "Podzimní grilování u Nováků \&copy; 2024", kde "\&copy;" je symbol copyrightu &copy;.

Zápatí v našem projektu bude vypadat takto:
```html
<footer>
    <p>Podzimní grilování u Nováků &copy; 2024</p>
</footer>
```

## 4.4 Sekce
Nyní si vytvoříme jednotlivé sekce a vložíme do nich text. Pro náš projekt vytvoříme tyto sekce:
- Informace
- Program
- Fotky 
- Kontakt

Sekce vložíme pomocí elementu `<section>` mezi navigaci a zápatí.
### Sekce "Informace"
Vložte si do projektu novou sekci (`section`), která bude obsahovat element `h2` s textem "Informace:" a dále element `p` s textem:
```text
Akce proběhne v sobotu 21. září 2024 na naší zahradě. Prosím o potvrzení Vaší účasti emailem nebo telefoniky - mrkněne na kontakty dole na stránce. Jako obvykle pozvánka platí pro Vaše drahé polovičky i děti. Vstupné je něco dobrého na společný stůl. Jako každý rok bude probíhat soutěž o nejlepší dobrotu s cenou pro vítěze. Doma nezapomeňte dobrou náladu a teplé oblečení na večer (hlavně pro děti).
```
Text může být v jednom elementu `p` nebo si jej můžete rozdělit do více odstavců.

Datum konání akce si zvýrazníme pomocí tagu `<strong>` a text "něco dobrého na společný stůl" bude odkaz na výsledek vyhledávání https://www.google.cz/search?tbm=isch&q=party+snacks tak, aby naši hosté našli inspiraci na dobroty, které přinesou.

### Jak vložit odkaz?
Vložení odkazu do HTML dokumentu se provádí pomocí značky `<a>` (anchor). Tato značka slouží k vytvoření odkazu, který může vést na jinou webovou stránku, soubor, nebo část aktuální stránky.

Základní syntaxe:
```html
<a href="https://example.com" target="_blank">Text odkazu</a>
```

- `href` (Hypertext REFerence): Tento atribut určuje cílovou adresu odkazu. Může to být URL jiné webové stránky, cesta k souboru nebo interní odkaz na část aktuální stránky.
- **Text odkazu**: Toto je text, který se zobrazí uživateli a na který bude možné kliknout.
- `target="_blank"`: Atribut zajistí, že odkaz se otevře v novém okně nebo záložce.

Stejně jako na jinou webovou stránku lze vytvořit i odkaz na soubor
```html
<a href="dokument.pdf">Stáhnout dokument</a>
```

Nebo odkaz na část aktuální stránky (pomocí ID elementu):
```html
<a href="#sekce1">Přejít na sekci 1</a>
```

### Zpátky k projektu
Sekce "Informace" bude vypadat takto:
```html
<section>
    <h2>Informace</h2>
    <p>
        Akce proběhne v sobotu <strong>21. září 2024</strong> 
        na naší zahradě. Prosím o potvrzení Vaší účasti
        emailem nebo telefoniky - mrkněne na kontakty dole 
        na stránce. Jako obvykle pozvánka platí pro Vaše drahé
        polovičky i děti. Vstupné je něco 
        <a href="https://www.google.cz/search?tbm=isch&q=party+snacks"
        target="_blank">dobrého na společný stůl</a>. 
        Jako každý rok bude probíhat soutěž o nejlepší dobrotu s
        cenou pro vítěze. Doma nezapomeňte dobrou náladu a teplé 
        oblečení na večer (hlavně pro děti).
    </p>
</section>
```

### Sekce "Program"
Podobně jako u předchozí sekce, vytvořte si novou sekci a do ní vložte nadpis druhé úrovně s textem "Program:" a text:
```text
Můžete se těšit na obvyklý program a držet palce, ať nám vyjde dobré počasí.
Čas	    Aktivita
15:00	Začátek grilování.
16:00	Soutěž o nejlepší dobrotu.
18:00	Karaoke a diskotéka.
```

Informace si zatím vložte jako prostý text, tabulku z nich uděláme později. Zatím si pouze vložte odkaz vedoucí ze slova "diskotéka"
na váš oblíbený videoklip z Youtube.

Sekce bude vypadat takto:
```html
<section>
    <h2>Program:</h2>
    <p>Můžete se těšit na obvyklý program a držet palce, ať nám vyjde dobré počasí.</p>
    <p>
        Čas	    Aktivita
        15:00	Začátek grilování.
        16:00	Soutěž o nejlepší dobrotu.
        18:00	Karaoke a <a href="https://youtu.be/hWjrMTWXH28?si=cAWBs4b2CPjxIlph" target="_blank">diskotéka</a>.
    </p>
</section>
```

### Sekce "Fotky"
Do této sekce si vložíme 6 obrázků a v další části z nich vytvoříme galerii fotek. 
Vytvořte si tedy další sekci a do této sekce si vložte odkaz na 6 různých obrázků. Nezapomeňte na nadpis "Fotky z poslední akce:".
Můžete přidat atribut `width` a `height` a určit tak velikost, ve které budou obrázky na stránce zobrazeny.

Sekce bude vypadat takto:
```html
<section>
    <h2>Fotky z poslední akce:</h2>
    <img src="images/grill_party1.jpg" alt="Grilování foto 1" height="200px">
    <img src="images/grill_party3.jpg" alt="Grilování foto 2" height="200px">
    <img src="images/grill_party7.jpg" alt="Grilování foto 3" height="200px">
    <img src="images/grill_party4.jpg" alt="Grilování foto 4" height="200px">
    <img src="images/grill_party8.jpg" alt="Grilování foto 5" height="200px">
    <img src="images/grill_party14.jpg" alt="Grilování foto 6" height="200px">
</section>
```

### Sekce "Kontakty"
Poslední sekcí v našem projektu jsou kontakty. Také zde si přidejte do HTML dokumentu novou sekci s nadpisem "Kontakt:" a do dvou odstavců
(`p`) si vložte následující kontakty:
```text
Email: grilovani@akce.cz
Telefon: +420 111 222 333
```
Aby email fungoval jako odkaz, použijte již pro vás známou značku `<a>` s atributem `href=mailto:`, kde za dvoutečko bude
emailová adresa. Když uživatel klikne na tento odkaz, otevře se jeho výchozí e-mailový klient s novou zprávou připravenou 
k odeslání na zadanou adresu.

Sekce bude vypadat takto:
```html
<section>
    <h2>Kontakt:</h2>
    <p>Email: <a href="mailto:grilovani@akce.cz">grilovani@akce.cz</a></p>
    <p>Telefon: +420 111 222 333</p>
</section>
```

### Zpátky k projektu
Po všech přidaných sekcích bude HTML dokument vypadat takto:
```html
<!DOCTYPE html>
<html lang="cs">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Grilování u Nováků</title>
</head>

<body>
    <header>
        <img src="images/background-header.jpg" alt="Grilování špekáčků">
        <h1>Pozvánka na podzimní grilování u Nováků 2024</h1>
        <p>
            Vážená rodino a přátelé, srdečně Vás zveme na naše tradiční podzimní grilování u příležitosti oslavy konce
            léta a začátku školního roku.
        </p>
    </header>

    <nav>Navigace</nav>

    <section>
        <h2>Informace:</h2>
        <p>
            Akce proběhne v sobotu <strong>21. září 2024</strong>
            na naší zahradě. Prosím o potvrzení Vaší účasti
            emailem nebo telefoniky - mrkněne na kontakty dole
            na stránce. Jako obvykle pozvánka platí pro Vaše drahé
            polovičky i děti. Vstupné je něco
            <a href="https://www.google.cz/search?tbm=isch&q=party+snacks" target="_blank">dobrého na společný stůl</a>.
            Jako každý rok bude probíhat soutěž o nejlepší dobrotu s
            cenou pro vítěze. Doma nezapomeňte dobrou náladu a teplé
            oblečení na večer (hlavně pro děti).
        </p>
    </section>

    <section>
        <h2>Program:</h2>
        <p>Můžete se těšit na obvyklý program a držet palce, ať nám vyjde dobré počasí.</p>
        <p>
            Čas Aktivita
            15:00 Začátek grilování.
            16:00 Soutěž o nejlepší dobrotu.
            18:00 Karaoke a <a href="https://youtu.be/hWjrMTWXH28?si=cAWBs4b2CPjxIlph" target="_blank">diskotéka</a>.
        </p>
    </section>

    <section>
        <h2>Fotky z poslední akce:</h2>
        <img src="images/grill_party1.jpg" alt="Grilování foto 1" height="200px">
        <img src="images/grill_party3.jpg" alt="Grilování foto 2" height="200px">
        <img src="images/grill_party7.jpg" alt="Grilování foto 3" height="200px">
        <img src="images/grill_party4.jpg" alt="Grilování foto 4" height="200px">
        <img src="images/grill_party8.jpg" alt="Grilování foto 5" height="200px">
        <img src="images/grill_party14.jpg" alt="Grilování foto 6" height="200px">
    </section>

    <section>
        <h2>Kontakt:</h2>
        <p>Email: <a href="mailto:grilovani@akce.cz">grilovani@akce.cz</a></p>
        <p>Telefon: +420 111 222 333</p>
    </section>

    <footer>
        <p>Podzimní grilování u Nováků &copy; 2024</p>
    </footer>
</body>

</html>
```


## 4.5 Styly
Nyní přišel čas, abychom do projektu přidali styly a udělali náš projekt vizuálně zajímavější.

V projektu budeme používat několik barev:
- `white` (bílá)
- `#555` (šedá)
- `#333` (tmavě šedá)
- `#86AB89` (středně zelená)
- `#E7FBE6` (světle zelená)

Styly budeme zapisovat do souboru `styles.css`, který již máme v projektu vytvořený, ale zatím byl prázdný.
Aby HTML dokument věděl, že má načíst styly právě z tohoto souboru, musíme tyto styly připojit v hlavičce HTML dokumentu pomocí elementu `<link>`
a to tak, že přidáme `<link rel="stylesheet" href="styles.css">` do `head`.

Hlavička našeho projektu bude vypadat takto:
```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Grilování u Nováků</title>
    <link rel="stylesheet" href="styles.css">
</head>
```

### Styly pro `body`
Jako první si nastavíme rodinu písma na **Quicksand**. Toto písmo jsme vybrali na stránce [Google Fonts](https://fonts.google.com).
Po přidání odkazů na toto písmo bude naše hlavička v HTML dokumentu vypadat takto:
```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Grilování u Nováků</title>
    <link rel="stylesheet" href="styles.css">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap" rel="stylesheet">
</head>
```

Rodinu písma si nastavíme pro tělo našeho HTML dokumentu (`body`) pomocí vlastnosti `font-family`. 

Dále si nastavíme barvu pozadí `background-color` na světle zelenou `#E7FBE6` a základní barvu textu `color` na tmavě šedou `#333`.

Nakonec si nastavíme výchozí výšku řádků textu `line-height` na 1,5 násobek velikosti textu, což pomáhá vytvořit větší prostor mezi řádky a usnadňuje čtení.
Také si nastavíme výchozí velikost textu `font-size` na 18 pixelů.

Naše první CSS pravidlo pro `body` si vložíme do souboru `styles.css`.
```css
body {
    font-family: "Quicksand", sans-serif;
    line-height: 1.5;
    font-size: 18px;
    color: #333;
    background-color: #E7FBE6;
  }
```

### Styly pro `header`
V této části nastavíme CSS styly pro záhlaví (`header`). Barvu pozadí elementu `background-color` nastavíme na středně zelenou `#86AB89`,
zarovnáme text v celém elementu na střed pomocí `text-align: center;`. Nakonec přidáme 20 pixelů vnitřního odszení (`padding`) kolem obsahu hlavičky.

```css
header {
  background-color: #86AB89;
  text-align: center;
  padding: 20px;
}
```

Také si nastavíme styly pro obrázek v záhlaví. Aby se styly aplikovaly jen a pouze na obrázek právě v záhaví, je nutné definovat pravidlo takto:
```css
header img {
  vlastnost: hodnota;
}
```
Pro obrázek si nastavíme kulaté rohy pomocí `border-radius: 5%;`, dále šírku obrázku `width` na 100%, což zajistí, že obrázek se roztáhne
na celou šírku rodičovského prvku a `height` na hodnotu `auto`, což zajistí, že výška bude automaticky nastavena tak, aby odpovídala poměru stran
obrázku. Díky tomu nedojde k deformaci obrázku při změně jeho šířky. I když je šířka obrázku nastavena na 100% šířky rodičovského prvku, pomocí  
`max-width: 1000px;` zajistíme, že obrázek nikdy nepřesáhne 1000 pixelů na šírku. To je užitečné pro omezení velikosti obrázku na velkých obrazovkách.
Naopak na malých obrazovkách díky šířce 100% dojde ke zmenšení obrázku.
```css
header img {
  border-radius: 5%;
  width: 100%;
  max-width: 1000px;
  height: auto;
}
```

Pro hlavní nadpis, který v hlavičce máme si nastavíme vnější okraj na 10px a pro odstavec velikost písma zvětšíme na 24px. Zároveň si pro odstavec nastavíme 
maximální šířku elementu na 800px a přidáme nastavení vnějších odkrajů `margin: 10px auto;`, což nám zajistí, že horní a dolní mezera bude 10 pixelů,
ale levý a pravý okarj bude automaticky rozložen, což umožní centrální zarovnání celého bloku `<p>` v rámci rodičovského elementu (v tomto případě v rámci 
`<header>`).
```css
header h1 {
  margin: 10px 0;
}

header p {
  font-size: 24px;
  max-width: 800px;
  margin: 10px auto;
}
```

### Styly pro `section`
Nyní jsou na řadě styly pro naše sekce. Nejdříve nastavíme maximální šířku na 1000 pixelů, barvu pozadí na bílou barvu a nastavíme kulaté
rohy sekcí pomocí `border-radius: 20px;`. Nastavíme vnitřní a vnější okraje. Můžeme nastavovat různé hodnoty a zkoušet, jak se okraje mění.
```css
section {
  max-width: 1000px;
  background-color: white;
  padding: 20px;
  margin: 20px auto;
  border-radius: 20px;
}
```

### Styly pro zápatí
Pro zápatí (`footer`) si nastavíme barvu pozadí na tmavě šedou `#333` a barvu písma a bílou `white`. Text zarovnáme na střed a nastavíme
si vnitřní okraj na 20 pixelů.
```css
footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 20px;
}
```
Tím přidávání stylů nekončí. Další styly si budeme postupně přidávat v dalších kapitolách.

## 4.6 Navigace
Naše stránka obsahuje již všechny sekce. Nyní je čas přidat jednoduchou navigaci. Náš HTML dokument již obsahuje element pro navigaci, ale zatím je prázdný.
```html
<nav>Navigace</nav>
```

Navigaci vložíme jako seznam odrážek, které budou obsahovat odkazy na naše sekce. Abychom se na sekce mohli odkazovat, tak musíme do každé sekce přidat
`id` element. Postupně přidáme tato id: `info`, `program`, `fotky`, `kontakt`. Zde je ukázka pro sekci s kontakty:
```html
<section id="kontakt">
    <h2>Kontakt:</h2>
    <p>Email: <a href="mailto:grilovani@akce.cz">grilovani@akce.cz</a></p>
    <p>Telefon: +420 111 222 333</p>
</section>
```

Po všech úpravách bude navigace vypadat takto:
```html
<nav>
    <ul>
        <li><a href="#info">Info</a></li>
        <li><a href="#program">Program</a></li>
        <li><a href="#fotky">Fotky</a></li>
        <li><a href="#kontakt">Kontakt</a></li>
    </ul>
</nav>
```

Navigace je funkční = po kliknutí na odkaz se ukáže příslušná sekce. Nyní je na řadě udělat navigaci hezčí a nastavit CSS styly.

Nejdříve nastavíme barvu pozadí na tmavě šedou `#333` (stejně jako zápatí), zarovnáme text na střed, nastavíme velikost písma na
150% velikosti výchozího písma a přidáme vnitřní okraj 20 pixelů.
```css
nav {
  background-color: #333;
  text-align: center;
  font-size: 150%;
  padding: 20px;
}
```

Dále nastavíme styly pro `ul` element. Nejdříve nastavíme `display: flex;` pro uspořádání položek seznamu a jejich zarovnání na střed
`justify-content: center;`. Vlastnost `flex-wrap: wrap;` pak umožní položkám seznamu přetéct na další řádek, pokud je to potřeba.

Také nastavíme vnější okraj pro `li` element a to tak, že nahoře a dole bude 0 pixelů a vpravo a vlevo 1rem, což je relativní jednotka, která se
odvíjí od velikosti písma rodičovského prvku. To zajistí, že text v navigačním panelu nebude těsně u okrajů a bude mít kolem sebe nějaký
prostor.

```css
nav ul {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0;
}
nav li {
  margin: 0 1rem;
}
```

Nakonec nastavíme pro text odkazů bílou barvu písma a nastavíme podtržení odkazu jen tehdy, pokud se na něj najede myší (`hover`).
Tento efekt pomáhá uživatelům vizuálně identifikovat, že je odkaz aktivní a kliknutelný.
```css
nav li a {
  color: white;
  text-decoration: none;
}

nav li a:hover {
  text-decoration: underline;
}
```

## 4.7 Tabulka
Nyní se přesuneme do sekce "Program" a vložíme zde tabulku s programem
```html
<section id="program">
    <h2>Program:</h2>
    <p>Můžete se těšit na obvyklý program a držet palce, ať nám vyjde dobré počasí.</p>
    <table>
        <thead>
            <tr>
                <th>Čas</th>
                <th>Aktivita</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>15:00</td>
                <td>Začátek grilování.</td>
            </tr>
            <tr>
                <td>16:00</td>
                <td>Soutěž o nejlepší dobrotu.</td>
            </tr>
            <tr>
                <td>18:00</td>
                <td>Karaoke a <a href="https://youtu.be/hWjrMTWXH28?si=cAWBs4b2CPjxIlph"
                        target="_blank">diskotéka</a>.
                </td>
            </tr>
        </tbody>
    </table>
</section>
```

Pro naší tabulku nastavíme styly. Šířka 100% zajistí, že tabulka bude roztažena na celou šířku rodičovského elementu. To je užitečné
pro zajištění responzivity. V dalších kapitolách zde budeme přidávat widget s předpovědí počasí, takže tabulka nebude nakonec tak široká.
Vlastnost `border-collapse: collapse;` nastaví, že hrany buněk tabulky budou sloučeny, čímž se odstraní mezery mezi jednotlivými buňkami.
To znamená, že hrany buněk budou sdílet stejný okraj. Vlastnost `margin-bottom: 1rem;:` přidá spodní odsazení tabulky tak, aby se oddělila od
dalších prvků na stránce.
```css
table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1rem;
}
```

Dále přidáme stylování buněk záhlaví `th` a buněk `td`. Přidáme okraj v barvě středně zelené `#86AB89` typu `solid` (nepřerušovaná, pevná čára). 
Jiné typy okrajů jsou např. `dashed` (čárkovaná čára), `dotted` (tečkovaná čára) nebo `double` (dvojitá čára). Další možnosti pak najdete v dokumentaci.
Dále přidáme vnitřní okraj kolem textu v každé buňce (takže text nebude příliš blízko okraji buněk) a zarovnáme text doleva.
```css
th,
td {
    border: 1px solid #86AB89;
    padding: 0.75rem;
    text-align: left;
}
```

## 4.8 Galerie
Nyní je čas vylepšit naši galerii fotek. Také si nastavíme vlastní CSS třídu `gallery` a ukážeme si, jak pro ni nastavit styly.
Nejdříve si v sekci pro fotky vytvoříme nový `<div>` element, který bude obsahovat všechny naše fotky a přidáme mu třídu
pomocí atributu `class`. U všech fotek také vymažeme atribut `height="200px"`, protože velikost fotek si nastavíme pomocí 
CSS stylů. Sekce v HTML dokumentu bude vypadat takto:
```html
<section id="fotky">
    <h2>Fotky z poslední akce:</h2>
    <div class="gallery">
        <img src="images/grill_party1.jpg" alt="Grilování foto 1">
        <img src="images/grill_party3.jpg" alt="Grilování foto 2">
        <img src="images/grill_party7.jpg" alt="Grilování foto 3">
        <img src="images/grill_party4.jpg" alt="Grilování foto 4">
        <img src="images/grill_party8.jpg" alt="Grilování foto 5">
        <img src="images/grill_party14.jpg" alt="Grilování foto 6">
    </div>
</section>
```

V souboru se styly pak třídu identifikujeme pomocí tečky před názvem třídy. Pro galerii fotek použijeme rozvržení (layout) `grid`, který
nám umožní uspořádat prvky (fotky) do mřížky. Vlastnost `grid-template-columns: repeat(3, 1fr);` definuje, že naše galerie bude mít
3 sloupce s rovnoměrnou šířkou (každý sloupec zabere 1/3 místa) a `1fr` znamená "1 frakce dostupného prostoru". Díky `gap: 1rem;` bude
mezi obrázky mezera o velikosti `1rem`.
```css
.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
```

Dále nastavíme pro každý obrázek pevně danou výšku 200 pixelů a šířka obrázku bude 100% místa, který má k dispozici (tedy sloupce, který vznikne díky
grid layoutu). Vlastnost `object-fit: cover;` zajistí, že obrázek vyplní celý prostor, ale zachová poměr stran obrázku, takže se nebude deformovat.
Pokud bude obrázek přesahovat, tak se ořízne. Tím docílíme toho, že fotky budou vypadat stejně velké, i když jejich originály stejně velké nebudou.
Okraje obrázků zaoblíme pomocí `border-radius: 8px;`. Pomocí `transform: scale(1.2);` zajistíme, že když uživatel najede myší na obrázek, velikost se zvětší
o 20 %. Tato změna bude plynulá díky `transition: transform 0.3s ease;`.
```css
.gallery img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.gallery img:hover {
  transform: scale(1.2);
}
```

## 4.9 Widgety
V této kapitole si ukážeme, jak jednoduše lze přidat interaktivní prvky, které poskytují určité funkce nebo zobrazují obsah z jiných zdrojů. Často se
používají k integraci služeb třetích stran, jako jsou mapy, sociální média nebo formuláře. My si do našeho projektu přidáme dva widgety:
- Google Maps pro zobrazení mapy
- Weather Widget pro zobrazení předpovědi počasí

### Google Maps Widget
Než si přidáme samotný widget do našich stránek, musíme si nejdříve připravit místo, kam widget vložíme. V sekci pro kontakty si nejdříve připravíme
kontejner `<div>`, do kterého vložíme další dva kontejnery. Pro hlavní kontejner nastavíme třídu `section-container` a pro vnitřní kontejnery třídu
`container`.

```html
<section id="kontakt">
    <div class="section-container">
        <div class="container">
            <h2>Kontakt:</h2>
            <p>Email: <a href="mailto:grilovani@akce.cz">grilovani@akce.cz</a></p>
            <p>Telefon: +420 111 222 333</p>
        </div>
        <div class="container">
            Tady vložíme Weather Widget
        </div>
    </div>
</section>
```

A nastavíme styly tak, aby se sekce rozdělila na 2 sloupce s tím, že v levém sloupci budou původní kontaktní informace a do pravého sloupce pak vložíme
samotný widget. Pravidlo `display: flex;` nastaví, že vnitřní elementy budou uspořádány pomocí Flexboxu, `justify-content: space-between;` zajistí, že kontejnery
budou mezi sebou rovnoměrně rozmístěné s prázdným prostorem mezi nimi a `flex-wrap: wrap;` zajistí, aby se kontejnery zalamovaly na další řádek, pokud není
dostatek místa v jednom řádku. To využijeme hlavně v další kapitole, kde si budeme ukazovat responsivní design. 
```css
.section-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
```

Nastavení `flex: 1;` určuje, že každý kontejner dotane stejnou šířku. Kontejnery se roztáhnout tak, aby vyplnily dostupný prostor. Vlasnost `margin-right: 1rem;`
pak přidá mezeru napravo od každého kontejneru. Díky tomu se mezi kontejnery objeví vizuální mezera. `min-width: 300px;` určuje minimální šířku kontejneru.
Tím se zajistí, že kontejnery zůstanou dostatečně velké, když se stránka zmenší.
```css
.container {
  flex: 1;
  margin-right: 1rem;
  min-width: 300px;
}
```

Poslední pravidlo se bude aplikovat na poslední kontejner v rámci této sekce a nastaví nulový okraj na pravé straně. Tím se zruší mezera na pravé straně stránky.
```css
.container:last-child {
  margin-right: 0;
}
```

Samotné vložení widgetu je pak velmi jednoduché. Otevřete si stránku s [Google mapami](https://www.google.com/maps) a vyhledejte svůj cíl. Poté klikněte
na tlačítko sdílet a zvolte možnost "Vložení mapy" (Embed a map). Vyberte si z nabízených možností a pak si zkopírujte HTML kód. Tento kód vložte na
místo, kde chcete widget ve svém HTML dokumentu mít.

<img src="images/google_maps_widget.png" alt="Google Maps Widget" width="600">

Výsledná sekce pak bude vypadat třeba takto:
```html
<section id="kontakt">
    <div class="section-container">
        <div class="container">
            <h2>Kontakt:</h2>
            <p>Email: <a href="mailto:grilovani@akce.cz">grilovani@akce.cz</a></p>
            <p>Telefon: +420 111 222 333</p>
        </div>
        <div class="map-container">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2573.352114205706!2d18.290441912592453!3d49.83584107136246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4713e331b7b388ab%3A0x468379202c9e63e2!2sMasarykovo%20n%C3%A1m.%2C%20702%2000%20Moravsk%C3%A1%20Ostrava%20a%20P%C5%99%C3%ADvoz!5e0!3m2!1sen!2scz!4v1726935760871!5m2!1sen!2scz"
                width="300" height="300" style="border:0;" allowfullscreen="" loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </div>
</section>
```

V kontejteru s widgetem je potřeba změnit třídu na `map-container` a přidat další styly do `styles.css` tak aby widget zaplnil volné místo v sekci pro kontakty.
Vlastnost `position: relative;` nastaví relativní pozicování kontejneru, díky `width: 100%;` bude mapa vyplněna na šířku celého kontejneru, ale jen maximálně
600 pixelů díky `max-width: 600px;`.
```css
.map-container {
    position: relative;
    width: 100%;
    max-width: 600px;
    height: auto;
    margin: 0 auto;
}

.map-container iframe {
    width: 100%;
    height: 200px;
}
```

### Weather Widget
Druhý widget bude součástí sekce s programem. Stejně jako v předchozím případě si nejdříve připravíme kontejner `<div>`, do kterého vložíme další dva
kontejnery. Pro hlavní kontejner nastavíme třídu `section-container` a pro vnitřní kontejnery třídu `container`.
```html
    <section id="program">
        <h2>Program:</h2>
        <p>Můžete se těšit na obvyklý program a držet palce, ať nám vyjde dobré počasí.</p>
        <div class="section-container">
            <div class="container">
                Tabulka
            </div>
            <div class="container">
                Tady vložíme weather widget
            </div>
        </div>
    </section>
```

Kód pro widget získáme ze stránky https://weatherwidget.io a vložíme jej na připravené místo.

## 4.10 Responsivní design
**Responsivní design** je přístup k webovému designu, který umožňuje, aby se webové stránky přizpůsobily různým velikostem obrazovek a zařízením. 
Cílem je zajistit, aby uživatelský zážitek zůstal kvalitní a konzistentní, bez ohledu na to, zda je stránka prohlížena na desktopovém počítači, 
tabletu nebo mobilním telefonu.

Hlavními principy responsivního designu jsou:

- **Flexibilní rozvržení**: Používání procentuálních šířek a flexibilních mřížkových systémů.
- **Flexibilní obrázky**: Obrázky, které se automaticky přizpůsobí velikosti svého kontejneru.
- **Media queries**: CSS technika, která umožňuje aplikaci různých stylů na základě vlastností zařízení, jako je šířka obrazovky.

**Media queries** (mediální dotazy) umožňují aplikaci specifických stylů na základě podmínek, jako jsou rozměry zařízení nebo orientace obrazovky. 
Pomocí media queries můžete definovat různé styly pro různé velikosti obrazovek, což je klíčové pro responsivní design.

Media queries se používají v CSS pomocí klauzule `@media`, následované podmínkami a stylem, který se má aplikovat. Zde je základní syntaxe:
```css
@media (max-width: 768px) {
    /* Styly pro zařízení s šířkou obrazovky menší než 768 pixelů */
    body {
        background-color: lightblue;
    }
}
```
V tomto příkladu se styl `background-color` změní na `lightblue`, pokud je šířka obrazovky menší než 768 pixelů.

### Zpátky k projektu
Jako první přidáme media queries pro navigaci. Pro zařízení s maximální šířkou obrazovky 600 pixelů nastavíme, aby se změnilo uspořádání
položek seznamu na sloupcový, což znamená, že se položky budou zobrazovat pod sebou namísto vedle sebe.

```css
@media (max-width: 600px) {
  nav ul {
    flex-direction: column;
    align-items: center;
  }

  nav li {
    margin: 0.5rem 0;
  }
}
```

Také přidáme další styly pro galerii fotek. Pro zařízení s šířkou do 800 pixelů bude galerie mít 2 sloupce a zařízení s šířkou do 500 pixelů
jen 1 sloupec. Zároveň bude pro malé obrazovky zrušena transformace, která je nastavena pro výchozí nastavení.
```css
@media (max-width: 800px) {
  .gallery {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 500px) {
  .gallery {
    grid-template-columns: 1fr;
  }

  .gallery img:hover {
    transform: none;
  }
}
```

## 4.11 Zveřejnění stránek
Gratuluji! Právě jste dokončili webovou stránku s pozvánkou na grilovací párty. Teď už zbývá poslední, ale velmi důležitý krok. Je nutné stránku zveřejnit
a podělit se o ní se světem. 

Existuje celá řada možností, jak své stránky zadarmo zveřejnit. My si řekneme o jedné z nich a to jsou GitHub Pages. Stačí nahrát svůj projekt na GitHub a
jedním kliknutím stránky zveřejnit. Stejně jako náš [vzorový projekt](https://petracihalova.github.io/grill_party_web/) má svůj GitHub repozitář 
[zde](https://github.com/petracihalova/grill_party_web).

### GitHub
GitHub je platforma pro vývojáře, která umožňuje verzování kódu pomocí nástroje Git. Na GitHubu mohou vývojáři ukládat, spravovat a sdílet své projekty. 
Je to také místo, kde mohou ostatní vývojáři přispívat ke kódu, navrhovat změny a zlepšení, nebo nahlásit chyby.

### GitHub Pages
GitHub Pages je služba poskytovaná GitHubem, která umožňuje publikovat statické webové stránky přímo z GitHub repozitáře. Tímto způsobem můžete jednoduše 
zveřejnit svůj projekt a sdílet ho s veřejností.

GitHub Pages podporuje pouze statické webové stránky, což znamená, že můžete nahrát soubory jako HTML, CSS, JavaScript, obrázky, dokumenty a další soubory, 
které tvoří statickou stránku. Neumožňuje běh serverového kódu (např. PHP, Python).

### Jak zveřejnit své webové stránky pomocí GitHub Pages?
- vyytvořte si účet na GitHub platformě
- nahrejte zde své webové stránky
- zveřejněte své webové stránky

Podrobný návod najdete v [GitHub dokumentaci](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).

### WebZdarma.cz
Další možnost je využít službu https://www.webzdarma.cz/, která nabízí i variantu pro webhosting wašich stránek zcela zdarma.
