# 1. Úvod do internetu a webových technologií

Tato kapitola vás seznámí se základními pojmy, které se týkají internetu a webových technologií. Naučíte se, jak funguje internet, co jsou webové stránky a jakou roli hrají prohlížeče, servery, domény a URL. Vysvětlíme si základní technologické stavební kameny webu – HTML, CSS a JavaScript.

## 1.1 Co je internet a jak funguje
Internet je globální síť propojených počítačů, která umožňuje sdílení informací mezi lidmi po celém světě. 

Internet vznikl v 60. letech 20. století jako vojenský projekt pro sdílení informací. Postupem času se rozšířil do akademických institucí a nakonec se stal základem moderního komunikačního světa.

### Jak funguje internet?
- **IP adresy**: Každé zařízení na internetu má svou IP adresu, která funguje jako „adresa domů“.
- **DNS (Domain Name System)**: DNS převádí názvy domén (např. www.example.com) na IP adresy, které počítače používají k nalezení webových stránek.
- **Servery**: Servery jsou výkonné počítače, které uchovávají webové stránky a poskytují je uživatelům po celém světě.
- **Routery**: Routery přenášejí data mezi zařízeními na internetu a zajišťují, že se informace dostanou tam, kam mají.


## 1.2 Základy webových technologií
Webové stránky jsou postaveny pomocí několika klíčových technologií.

### HTML (HyperText Markup Language)
HTML je jazyk, který slouží k vytváření struktury webové stránky. Určuje, kde budou nadpisy, odstavce, odkazy, obrázky atd. HTML je základní „kostrou“ každé webové stránky.

**Příklad kódu HTML:**
```
<h1>Toto je nadpis</h1>
<p>Toto je odstavec textu.</p>
```

### CSS (Cascading Style Sheets)
CSS je jazyk, který slouží k úpravě vzhledu webových stránek. Pomocí CSS můžeme určit barvy, písma, rozložení a další vizuální aspekty.

**Příklad kódu CSS:**
```
h1 {
  color: blue;
}
p {
  font-size: 16px;
}
```

### JavaScript
JavaScript je programovací jazyk, který dodává webovým stránkám interaktivitu. V tomto workshopu se zaměříme na HTML a CSS, ale JavaScript je důležitý pro dynamické prvky (např. klikací tlačítka, animace).

## 1.3 Struktura URL a jak najít zdroj na internetu
Každá webová stránka má svou vlastní adresu, která se nazývá URL (Uniform Resource Locator).

### Struktura URL:
- **Protokol:** (např. `http://` nebo `https://`) určuje, jakým způsobem se data přenášejí.
- **Doména:** (např. `www.example.com`) je název webové stránky.
- **Cesta:** (např. `/kontakt`) určuje konkrétní stránku nebo soubor na webu.

### Příklad:
`https://www.example.com/kontakt`

- Protokol: `https://`
- Doména: `www.example.com`
- Cesta: `/kontakt`

## 1.4 Webové prohlížeče a jejich role
Webové prohlížeče (např. Chrome, Firefox, Safari, Edge) jsou aplikace, které nám umožňují procházet internet a zobrazovat webové stránky.

### Jak funguje webový prohlížeč?
- **Prohlížeč načítá HTML soubor:** Když zadáte URL adresu, prohlížeč se připojí k serveru a stáhne HTML soubor.
- **Prohlížeč vykreslí webovou stránku:** HTML kód je následně zpracován a zobrazí se na obrazovce v prohlížeči.
- **CSS určuje vzhled stránky:** Prohlížeč aplikuje styly z CSS souborů na HTML elementy.


### Webová bezpečnost:
- **HTTPS:** Protokol HTTPS (HyperText Transfer Protocol Secure) zajišťuje bezpečné přenosy dat mezi uživatelem a serverem.
- **Certifikáty:** Důvěryhodné weby používají SSL/TLS certifikáty, aby chránily osobní údaje.

## 1.5 HTTP, Request, Response
HTTP (Hypertext Transfer Protocol) je internetový protokol, který slouží k přenosu dat mezi webovými prohlížeči a servery. 

Aby webový prohlížeč mohl načíst webovou stránku, musí poslat "požadavek" (request) a poslat ho na příslušný server. 

Server požadavek zpracuje a vrátí "odpověď" (response). Obsahem je často webová stránka v jazyce HTML, ale v odpovědi mohou být i jiná data (obrázek).

Při komunikaci se používají HTTP metody. Nejčastější je metoda **GET**, která slouží k získání / načtení dat ze serveru. Někdy je ale potřeba poslat i požadavky, které změní data na serveru (přihlášení uživatele, nákup v e-shopu, poslání zprávy do chatu ...). Pro tyto účely se používají další HTML metody jako je **POST**, která posílá informace na server s cílem něco změnit nebo nastavit nebo **DELETE**, která něco smaže. Více o HTML a jeho metodách v [dokumentaci](https://www.rfc-editor.org/rfc/rfc9110.html#name-methods).

## 1.6 Cvičení
- Prozkoumejte vybranou webovou stránku a identifikuj její URL, prozkoumej zdrojový kód.
- Z vybrané webové stránky pošli požadavek na server a prozkoumej, jak vypadá request a response.

## 1.7 Další zdroje
- [Internet na Wikipedii](https://cs.wikipedia.org/wiki/Internet)
- [World Wide Web na Wikipedii](https://cs.wikipedia.org/wiki/World_Wide_Web)
- [Webová stránka na Wikipedii](https://cs.wikipedia.org/wiki/Webov%C3%A1_str%C3%A1nka)
