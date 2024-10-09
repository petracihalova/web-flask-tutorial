# REST API ve Flasku
Jednoduchá ukázka REST API ve Flasku se základními CRUD operacemi nad kolekcí knih. Data jsou ukládáná in-memory.
- `GET /api/books` vrátí seznam všech knih.
- `GET /api/books/<id>` vrátí konkrétní knihu podle jejího ID.
- `POST /api/books` přidá novou knihu na seznam.
- `PUT /api/books/<id>` aktualizuje data konkrétní knihy.
- `DELETE /api/books/<id>` smaže knihu podle ID.

Kromě frameworku `Flask` příklad používá knihovnu `flask-cors`, kterou je nutné nainstalovat do virtuálního prostředí.
```bash
pip install Flask flask-cors
```

Struktura projektu:
```bash
/flask_library_api
│
└──app.py
```

Soubor `app.py`:
```python
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

# Povolit CORS pro všechny routy
CORS(app)

# Seznam knih uložených in-memory
books = [
    {
        "id": 1,
        "title": "Harry Potter a Kámen mudrců",
        "author": "J. K. Rowlingová",
        "read": True,
    },
    {
        "id": 2, 
        "title": "Hobit", 
        "author": "J. R. R. Tolkien", 
        "read": False
    },
    {
        "id": 3, 
        "title": "Železný plamen", 
        "author": "R. Yarros", 
        "read": False
    },
    {
        "id": 4, 
        "title": "Pád domu Usherů a jiné povídky", 
        "author": "E. A. Poe", 
        "read": False
    },
        {
        "id": 5, 
        "title": "Vánoční koleda", 
        "author": "Ch. Dickens", 
        "read": False
    },
]


# GET metoda pro získání všech knih
@app.route("/api/books", methods=["GET"])
def get_books():
    return jsonify(books)


# GET metoda pro získání knihy podle ID
@app.route("/api/books/<int:book_id>", methods=["GET"])
def get_book(book_id):
    book = next((book for book in books if book["id"] == book_id), None)
    if book:
        return jsonify(book)
    else:
        return jsonify({"error": "Book not found"}), 404


# POST metoda pro přidání nové knihy
@app.route("/api/books", methods=["POST"])
def add_book():
    new_book = request.get_json()
    books.append(new_book)
    return jsonify(new_book), 201


# PUT metoda pro aktualizaci existující knihy
@app.route("/api/books/<int:book_id>", methods=["PUT"])
def update_book(book_id):
    book = next((book for book in books if book["id"] == book_id), None)
    if book:
        updated_data = request.get_json()
        book.update(updated_data)
        return jsonify(book)
    else:
        return jsonify({"error": "Book not found"}), 404


# DELETE metoda pro smazání knihy
@app.route("/api/books/<int:book_id>", methods=["DELETE"])
def delete_book(book_id):
    global books
    books = [book for book in books if book["id"] != book_id]
    return jsonify({"message": "Book deleted"}), 200


if __name__ == "__main__":
    app.run(debug=True)
```

Flask automaticky serializuje Python objekty do formátu JSON, pokud používáme metodu `jsonify()`, což je důležité pro komunikaci API. JSON je standardní formát pro výměnu dat mezi klientem a serverem. V našem příkladu všechny odpovědi z API vrací JSON.

Pro testování REST API můžete použít nástroje jako Postman, cURL nebo [Swagger Editor](https://editor-next.swagger.io), které umožňují simulovat HTTP požadavky na server a zobrazovat odpovědi. To usnadňuje kontrolu správnosti API bez nutnosti vytvářet front-end aplikaci.

OpenAPI specifikace ve formátu YAML:
```yaml
openapi: 3.0.0
info:
  title: Flask Library API
  description: API for managing a collection of books.
  version: 1.0.0
servers:
  - url: http://127.0.0.1:5000
    description: Local Flask server

paths:
  /api/books:
    get:
      summary: Get a list of all books
      operationId: getBooks
      responses:
        '200':
          description: A JSON array of books
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Book'
    post:
      summary: Add a new book
      operationId: addBook
      requestBody:
        description: Book object to add
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Book'
      responses:
        '201':
          description: Book added successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Book'

  /api/books/{bookId}:
    get:
      summary: Get a book by ID
      operationId: getBook
      parameters:
        - name: bookId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: Book found
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Book'
        '404':
          description: Book not found

    put:
      summary: Update an existing book
      operationId: updateBook
      parameters:
        - name: bookId
          in: path
          required: true
          schema:
            type: integer
      requestBody:
        description: Updated book object
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Book'
      responses:
        '200':
          description: Book updated
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Book'
        '404':
          description: Book not found

    delete:
      summary: Delete a book by ID
      operationId: deleteBook
      parameters:
        - name: bookId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: Book deleted
        '404':
          description: Book not found

components:
  schemas:
    Book:
      type: object
      properties:
        id:
          type: integer
          example: 1
        title:
          type: string
          example: "Základy Flasku"
        author:
          type: string
          example: "John Doe"
        read:
          type: boolean
          example: true
```

Stejná OpenApi specifikace ve formátu JSON:
```json
{
  "openapi": "3.0.0",
  "info": {
    "title": "Book Management API",
    "description": "API for managing a collection of books.",
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "http://127.0.0.1:5000",
      "description": "Local Flask server"
    }
  ],
  "paths": {
    "/api/books": {
      "get": {
        "summary": "Get a list of all books",
        "operationId": "getBooks",
        "responses": {
          "200": {
            "description": "A JSON array of books",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Book"
                  }
                }
              }
            }
          }
        }
      },
      "post": {
        "summary": "Add a new book",
        "operationId": "addBook",
        "requestBody": {
          "description": "Book object to add",
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Book"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Book added successfully",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Book"
                }
              }
            }
          }
        }
      }
    },
    "/api/books/{bookId}": {
      "get": {
        "summary": "Get a book by ID",
        "operationId": "getBook",
        "parameters": [
          {
            "name": "bookId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Book found",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Book"
                }
              }
            }
          },
          "404": {
            "description": "Book not found"
          }
        }
      },
      "put": {
        "summary": "Update an existing book",
        "operationId": "updateBook",
        "parameters": [
          {
            "name": "bookId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "requestBody": {
          "description": "Updated book object",
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Book"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Book updated",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Book"
                }
              }
            }
          },
          "404": {
            "description": "Book not found"
          }
        }
      },
      "delete": {
        "summary": "Delete a book by ID",
        "operationId": "deleteBook",
        "parameters": [
          {
            "name": "bookId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Book deleted"
          },
          "404": {
            "description": "Book not found"
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "Book": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "example": 1
          },
          "title": {
            "type": "string",
            "example": "Základy Flasku"
          },
          "author": {
            "type": "string",
            "example": "John Doe"
          },
          "read": {
            "type": "boolean",
            "example": true
          }
        }
      }
    }
  }
}
```