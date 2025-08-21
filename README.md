# @ashgw/decorators

While TypeScript supports experimental decorators, it still lacks fundamental modifiers like final, sealed, or frozen that exist in other languages. This package patches those gaps with pragmatic decorators that enforce runtime and semantic constraints you'd often expect but cannot express in TS out of the box.


### Installation

**npm**
```
npm i @ashgw/decorators
```
**pnpm**
```
pnpm i @ashgw/decorators
```

#### Setup

Set this in your TypeScript config file.

```json
{
  "compilerOptions": {
    // ...
    "experimentalDecorators": true
  }
}
```

#### Decorators

- [`@Final`]() - Marks an object final, as in one cannot inherit from it.
- [`@Sealed`]() - [Seals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal) an object.
- [`@Frozen`]() - [Freezes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) an object.
- [`@Singleton`]() - Ensures that only a single instance of the class can be created.

#### Basic Usage

Finalize and freeze objects

```ts
import type { Optional, NewType, MaybeUndefined } from "ts-roids";
import { Final, Frozen, Singleton } from "@ashgw/decorators";

type Bar = NewType<"Bar", string>;
type Baz = NewType<"Baz", string>;
type Secret = NewType<"Secret", string>;

abstract class BaseFoo<T> {
  public abstract requestFoo(secret: Secret, baz: Baz): Promise<Optional<T>>;
}

@Final
@Frozen
@Singleton
class Foo<T> extends BaseFoo<T> {
  private static readonly rnd = Math.random();
  private readonly foo: T;
  public bar: Optional<Bar>; // `Bar` then becomes readonly with the decorator

  public constructor(foo: T, bar?: MaybeUndefined<Bar>) {
    super();
    this.foo = foo;
    this.bar = bar ?? null;
  }

  public override async requestFoo(
    secret: Secret,
    baz: Baz
  ): Promise<Optional<T>> {
    if (
      Foo.rnd > 0.5 &&
      secret.concat().toLowerCase() === "123" &&
      baz.concat().toLowerCase() === "baz" &&
      this.bar !== null
    ) {
      return await Promise.resolve(this.foo);
    }

    return null;
  }
}

class SubFoo extends Foo<string> {
  constructor(foo: string) {
    super(foo);
  }
}

// No problem with instantiation
const foo = new Foo("foo");

// The Singleton ensures the same instance is returned
const foo2 = new Foo("bar");
console.log(foo2 === foo); // True

// Since the object is final:
// The line below will cause a TypeError: Cannot inherit from the final class Foo
new SubFoo("subFoo");

// Since the object is frozen:
// The line below will cause a TypeError: Cannot add property 'requestFoo', object is not extensible
foo.requestFoo = async () => {
  return await Promise.resolve("not foo");
};

// The line below will cause a TypeError: Cannot assign to read only property 'bar'
foo.bar = "not bar" as Bar;
```

The TypeScript team has not yet introduced a built-in final modifier yet, check
[this](https://github.com/microsoft/TypeScript/issues/8306), [this](https://github.com/microsoft/TypeScript/issues/50532) and many other requests.
Although they introduced `override` in [`v4.3`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-3.html#override-and-the---noimplicitoverride-flag) .

Decorators like `@Final` provide a limited way to emulate final behavior, these are merely band-aids for now, until TS officially supports a true final modifier.

Another use case is sealing an object:

```ts
@Sealed
class Person {
  constructor(name: string, age?: number) {}
}

const john = new Person("John", 30);

// Existing properties can still be modified
john.age = 31; // No Errors

// Existing properties cannot be re-configured nor deleted

(john as any).email = "john@doe.com"; // TypeError: Cannot add property email,
// object is not extensible

delete john.age; // TypeError: Cannot delete property 'age'
```
## License
[MIT](/LICENSE)

