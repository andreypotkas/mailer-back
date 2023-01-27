<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Works using <a href="https://nestjs.com/" target="_blank">NestJS</a> framework.</p>

# Installation

```bash
$ npm install
```

# Running the app

```bash
# Production
$ npm run start

# Development
$ npm run start:dev
```

> Before start:
>
> - Install [PostgreSQL](https://www.postgresql.org/download/) and [pgAdmin](https://www.pgadmin.org/download/)
> - Create **letto_market** database

# Development `.env` file 
```js
PORT=5000
POSTGRES_HOST=localhost
POSTGRES_USER=postgres                  // Your PostgreSQL user (default: postgres)
POSTGRES_DB=letto_market
POSTGRES_PASSWORD=root                  // Your PostgreSQL pass (default: root)
POSTGRES_PORT=5432
JWT_ACCESS_SECRET=secret_key
JWT_REFRESH_SECRET=another_secret_key
```


# Deploy

Server use *node version manager* (nvm). To use *node* you need to activate latest installed version (16.17.0) by using command

```bash
$ nvm use 16.17.0
```

Setup [git config](https://git-scm.com/book/ru/v2/%D0%92%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5-%D0%9F%D0%B5%D1%80%D0%B2%D0%BE%D0%BD%D0%B0%D1%87%D0%B0%D0%BB%D1%8C%D0%BD%D0%B0%D1%8F-%D0%BD%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B9%D0%BA%D0%B0-Git) with your *GitHub* account.

Pull last changes from *GitHub*


```bash
# go to project directory
$ cd /home/market/sites/letto_market_back_postgresql

# pull last changes
$ git pull origin

# install dependencies
$ npm i
```

> **Git** can ask access to your *Github* account with *ghp_KEY*.
>
> To create new access token: 
> 
> - Sign in to your [Github](https://github.com/) account.
> - Click your avatar at top right corner and select `Settings`.
> - `<> Developer settings -> 🔑 Personal access tokens -> Tokens (clasic)`.
> - Generate new token.
>
> Enter your username and this access key as password when you send requests to GitHub. 

Use [pm2](https://pm2.keymetrics.io/) to build project at background.

```bash
# check your apps' status
$ pm2 status

# delete api process
$ pm2 delete api

# start new api process
$ pm2 start npm --name "api" -- start
```

# Documentation

## Swagger

```
To open swagger documentation

http://localhost:5000/api/docs
```

## File Naming for Class

```ts
export class UsersController {} // users.controller.ts
class PremiumFeaturesService {} // premium-features.service.ts
class CreateProductDto {} // create-product.dto.ts
```

## Index Exporting

```diff
- import { FooController } from './controllers/foo.controller';
+ import { FooController, BarController } from './controllers';
```

Don't use a path that ends with a dot.

```diff
- import { BarService } from '..';
+ import { BarService } from '../providers';
```

## Variables naming

```diff
# Bad
- const MyVariable;

# Good
+ let myVariable;
# Use const when it's possible
+ const myVariable;
```

Don't use var when it possible

```diff
# Bad
- var myVariable;
```

## Class naming

```diff
# Bad
- class foo {}

# Good
+ class Foo {}
```
Class members and methods

```diff
class Foo {
  # Bad
- Bar: number;
- Baz() { }

# Good
+ bar: number;
+ baz() { }
}
```

## Interface Naming

```diff
# Bad
- interface user {}
- interface User {}

# Good
+ interface IUser {}
```

## Type Naming

```diff
# Bad
- type foo = Smth;

# Good
+ type Foo = Smth;
```

## Namespace Naming

```diff
# Bad
- namespace foo {}

# Good
+ namespace Foo {}
```

## Enum Naming

```diff
# Bad
- enum color {}

# Good
+ enum Color {}
```

Enum members

```diff
enum color {
# Bad
- red
- Red
# Good
+ RED
}
```

## Formatting

Use `;`

```diff
# Bad
- const foo = 'foo'

# Good
+ const foo = 'foo';
```

Use `{}`

```diff
# Bad
- if (foo) return true;
- if (foo)
-   return true;

# Good
+ if (foo) {
+   return true;
+ }

+ if (foo) {
+   doo++;
+ } else {
+   goo();
+   doo--;
+ }
```

Space before type

```diff
# Bad
- const foo:Foo = {};

# Good
+ const foo: Foo = {};
```

Use access modificators inside class

```diff
class Foo {
# Bad
- doo: Doo;

# Good
+ public doo: Doo;
+ private goo: Goo;
}
```

Annotate types

```diff
class Foo {
# Bad
- public doo = '';
- public goo() {}
  
# Good
+ public doo: string = '';
+ public goo(): void {}
}
```

Prefer single quotes `'`

```diff
# Bad
- "string"

# Good
+ 'string'
```
Prefer `${}`

```diff
# Bad
- 'point: ' + x;

# Good
+ `point: ${x}`;
```

Tabulation `2` spaces
```ts
export class Foo {
  public doo(): boolean {
    return true;
  }
}
```

Annotate arrays

```ts
class Doo {
  public foos: Foo[] ;
}
```

Truthy check

```diff
# Bad
- if (error === true)

# Good
+ if (error)
```

Use `type` when you might need a union or intersection

```ts
type Foo = number | { someProperty: number }
```

Use interface when you want extends or implements

```ts
interface IFoo {
  foo: string;
}
interface IFooBar extends IFoo {
  bar: string;
}
class X implements IFooBar {
  foo: string;
  bar: string;
}
```

Use conditional ternary operator

```diff
# Bad
- if (foo) {
-   doo = 1;
- } else {
-   doo = 2;
- }

# Good
+ doo = foo ? 1 : 2;
```

Use JS methods when it's possible

```diff
# Bad
- for (let i = 0; i < array.length; ++i) {
-   newArray.push(array[i]);
- }

- for (let item of array) {
-   newArray.push(item);
- }

# Good
+ newArray = array.map((item) => item);
```