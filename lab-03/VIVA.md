# Viva preparation: Lab 3

## 1. Query parameter vs path parameter?

- **Path parameter** identifies **one specific resource**. It is part of the URL path and is required. Example: `/books/5` (the book with id 5). Read in Express with `req.params.id`.
- **Query parameter** **modifies or filters** how a collection is returned. It comes after `?`, is optional, and has defaults. Example: `/books?search_q=java&limit=5`. Read with `req.query`.
- **In this lab:** `:id` is a path parameter. `search_q`, `order_by`, `order`, `limit`, `offset`, `min_price` and `max_price` are query parameters.

## 2. What does stateless mean?

Each request must contain everything the server needs to understand it. The server does **not** remember anything about the client between requests (no session kept in server memory).

- Each `GET /books?limit=5&offset=5` carries its own page information, the server does not remember "the previous page".
- Benefits: easy to scale (any server instance can answer), easy to cache, simpler to debug.
- The database stores the **data** (resource state). "Stateless" refers to the **client session**, not the database.

## 3. Which status code for bad input vs a missing record?

- **Bad input: 400 Bad Request.** The request itself is wrong (missing title, price "abc", `limit=abc`, invalid JSON).
- **Missing record: 404 Not Found.** The request is well-formed but the id does not exist.

Other codes used: **200** OK (read, update, delete), **201** Created (POST).

## More questions you may be asked

**Why use nouns in endpoints?** The URL names the resource (`/books`), and the HTTP method is the action: GET read, POST create, PUT update, DELETE delete. Avoid `/getBooks` or `/deleteBook`.

**Why parameterised queries?** Values are sent separately from the SQL text with `?` placeholders, so user input can never change the query structure. This prevents SQL injection. (Test F21 in Postman proves it.)

**Why can `ORDER BY` not use `?`?** Placeholders work for values, not for column names. So `order_by` and `order` are checked against a fixed whitelist before being added to the SQL.

**What does `LIKE '%java%'` do?** Matches titles that contain "java" anywhere. `%` means "any characters". SQLite's `LIKE` is case-insensitive for ASCII letters.

**What do `LIMIT` and `OFFSET` do?** `LIMIT` is the page size, `OFFSET` is how many rows to skip. Page 3 with size 10 is `limit=10&offset=20`.

**What is `BETWEEN`?** `price BETWEEN 300 AND 500` means `price >= 300 AND price <= 500` (both ends included).

**PUT vs POST?** POST creates a new resource (server assigns the id, returns 201). PUT replaces/updates an existing resource at a known id (returns 200).

**What is middleware?** A function that runs between the request and the route handler. `express.json()` parses the body, `validateBookBody` checks it, `errorHandler` formats errors.

**What does `await` do and what happens without it?** It waits for the Promise to resolve. Without it you get the Promise object itself, not the data (the `{}` bug).

**What is EADDRINUSE?** The port is already used by another process. Stop that process or use another port.

**Why keep `.env` out of Git?** It can hold secrets. `.env.example` shows the variable names with no real values.
