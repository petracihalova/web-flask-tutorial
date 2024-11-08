# Flask aplikace s metodou `url_for()`
Ukázka Flask aplikace s použitím metody `url_for()`. Funkce `hello_user()` zkontroluje, zda se jedná
o administrátora či jiného uživatele, a podle toho vygeneruje ULR, která se zavolá a vrátí správnou zprávu.

```python
from flask import Flask, redirect, url_for

app = Flask(__name__)

@app.route("/admin")
def hello_admin():
    return "Uživatel je přihlášen jako administrátor."

@app.route("/guest/<guest>")
def hello_guest(guest):
    return f"Uživatel '{guest}' je přihlášen jako host."

@app.route("/user/<name>")
def hello_user(name):
    if name == "admin":
        return redirect(url_for("hello_admin"))
    else:
        return redirect(url_for("hello_guest", guest=name))

if __name__ == "__main__":
    app.run(debug=True)
```
