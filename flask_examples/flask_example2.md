# Flask aplikace s proměnnými v routách
Ukázka Flask aplikace s několika routami, které obsahují proměnné různého datového typu.

```python
from flask import Flask, jsonify

app = Flask(__name__)

# Route s proměnnou typu string (není nutné typ specifikovat, string je výchozí)
@app.route('/user/<username>')
def show_user_profile(username):
    # Vrací textovou zprávu s uživatelským jménem, které převede na velká písmena
    return f"Uživatel: {username.upper()}"

# Route s proměnnou typu int
@app.route('/power/<int:num>')
def calculate_power(num):
    # Vrací JSON se vstupním číslem a vypočítanou druhou mocninou
    return jsonify({"vstup": num, "vysledek": num ** 2})

# Route s proměnnou typu float
@app.route('/price/<float:price>')
def show_price(price):
    # Vrací zprávu s cenou
    return f"Price: {price:.2f}"

# Route s proměnnou typu path, která povoluje lomítka v URL
@app.route('/path/<path:subpath>')
def show_subpath(subpath):
    # Vrací zprávu s celou podcestou
    return f"Subpath: {subpath}"

if __name__ == '__main__':
    app.run(debug=True)
```
