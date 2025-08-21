import { Final, Frozen, Sealed, FinalTypeError } from '../src';
import { test, expect } from 'vitest';

test('Should not allow inheritance of a final frozen class. "FinalTypeError" should be thrown', () => {
  @Final
  @Frozen
  class Foo<T> {
    private _foo: T;
    bar: string;

    constructor(foo: T) {
      this._foo = foo;
      this.bar = 'bar';
    }
    someFoo(): T {
      return this._foo;
    }
  }

  class SubFoo extends Foo<string> {
    constructor(foo: string) {
      super(foo);
    }
  }
  expect(() => {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const _ = new SubFoo('subbedFoo');
  }).toThrowError(FinalTypeError);
});

test('Should allow instantiation of a final frozen class with no problems', () => {
  @Final
  @Frozen
  class Foo<T> {
    private _foo: T;
    bar: string;

    constructor(foo: T) {
      this._foo = foo;
      this.bar = 'bar';
    }
    someFoo(): T {
      return this._foo;
    }
  }
  expect(() => {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const _ = new Foo('foo');
  }).not.toThrow();
});

test('Should bot allow to alter  attributes of the final frozen class, throws TypeError since it is frozen', () => {
  @Final
  @Frozen
  class Foo<T> {
    private _foo: T;
    bar: string;

    constructor(foo: T) {
      this._foo = foo;
      this.bar = 'bar';
    }
    someFoo(): T {
      return this._foo;
    }
  }
  expect(() => {
    const foo = new Foo('foo');
    foo.bar = 'altered';
  }).toThrow(TypeError);
});

test('Should work when the final sealed class is a subclass itself, TypeError should be thrown', () => {
  abstract class BaseFoo<T> {
    abstract someFoo(): T;
  }
  @Final
  @Frozen
  class Foo<T> extends BaseFoo<T> {
    private _foo: T;
    bar: string;

    constructor(foo: T) {
      super();
      this._foo = foo;
      this.bar = 'bar';
    }
    someFoo(): T {
      return this._foo;
    }
  }
  expect(() => {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const _ = new Foo('foo').bar;
  }).not.toThrow(TypeError);
});

test(`Should not allow inheritance, of the final class, when the final class
  is a subclass itself, a TypeError should be thrown`, () => {
  abstract class BaseFoo<T> {
    abstract someFoo(): T;
  }
  @Final
  @Frozen
  class Foo<T> extends BaseFoo<T> {
    private _foo: T;
    bar: string;

    constructor(foo: T) {
      super();
      this._foo = foo;
      this.bar = 'bar';
    }
    someFoo(): T {
      return this._foo;
    }
  }

  class SubFoo extends Foo<string> {
    constructor(foo: string) {
      super(foo);
    }
  }
  expect(() => {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const _ = new SubFoo('foo').bar;
  }).toThrow(FinalTypeError);
});

test(`One limitation, the @Final decorator should be on top of @Frozen not the opposite, otherwise FinalTypeError would be thrown upon instantitation of the final class`, () => {
  abstract class BaseFoo<T> {
    abstract someFoo(): T;
  }
  @Frozen
  @Final
  class Foo<T> extends BaseFoo<T> {
    private _foo: T;
    bar: string;

    constructor(foo: T) {
      super();
      this._foo = foo;
      this.bar = 'bar';
    }
    someFoo(): T {
      return this._foo;
    }
  }

  class SubFoo extends Foo<string> {
    constructor(foo: string) {
      super(foo);
    }
  }
  expect(() => {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const _ = new Foo('foo');
  }).toThrow(FinalTypeError);
});

test('Should not allow inheritance; a FinalTypeError should be thrown', () => {
  @Final
  class Foo<T> {
    private _foo: T;
    bar: string;

    constructor(foo: T) {
      this._foo = foo;
      this.bar = 'bar';
    }
    someFoo(): T {
      return this._foo;
    }
  }

  class SubFoo extends Foo<string> {
    constructor(foo: string) {
      super(foo);
    }
  }
  expect(() => {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const _ = new SubFoo('subbedFoo');
  }).toThrowError(FinalTypeError);
});

test('Should allow instantiation of a final class with no problems', () => {
  @Final
  class Foo<T> {
    private _foo: T;
    bar: string;

    constructor(foo: T) {
      this._foo = foo;
      this.bar = 'bar';
    }
    someFoo(): T {
      return this._foo;
    }
  }
  expect(() => {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const _ = new Foo('foo');
  }).not.toThrow();
});

test('Should allow to access attributes of the final class', () => {
  @Final
  class Foo<T> {
    private _foo: T;
    bar: string;

    constructor(foo: T) {
      this._foo = foo;
      this.bar = 'bar';
    }
    someFoo(): T {
      return this._foo;
    }
  }
  expect(() => {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const _ = new Foo('foo').bar;
  }).not.toThrow();
});

test('Should work when the final class is a subclass itself', () => {
  abstract class BaseFoo<T> {
    abstract someFoo(): T;
  }
  @Final
  class Foo<T> extends BaseFoo<T> {
    private _foo: T;
    bar: string;

    constructor(foo: T) {
      super();
      this._foo = foo;
      this.bar = 'bar';
    }
    someFoo(): T {
      return this._foo;
    }
  }
  expect(() => {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const _ = new Foo('foo').bar;
  }).not.toThrow();
});

test(`Should not allow inheritance, of the final class, when the final class
  is a subclass itself, a FinalTypeError should be thrown`, () => {
  abstract class BaseFoo<T> {
    abstract someFoo(): T;
  }
  @Final
  class Foo<T> extends BaseFoo<T> {
    private _foo: T;
    bar: string;

    constructor(foo: T) {
      super();
      this._foo = foo;
      this.bar = 'bar';
    }
    someFoo(): T {
      return this._foo;
    }
  }

  class SubFoo extends Foo<string> {
    constructor(foo: string) {
      super(foo);
    }
  }
  expect(() => {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const _ = new SubFoo('foo').bar;
  }).toThrow(FinalTypeError);
})

test('is the object actually sealed', () => {
  @Sealed
  class Foo<T> {
    private _foo: T;
    bar: string;

    constructor(foo: T) {
      this._foo = foo;
      this.bar = 'bar';
    }
    someFoo(): T {
      return this._foo;
    }
  }
  expect(Object.isSealed(new Foo('foo'))).toBeTruthy();
});

test('Should have no problem with instantiation', () => {
  @Sealed
  class Foo<T> {
    private _foo: T;
    bar: string;

    constructor(foo: T) {
      this._foo = foo;
      this.bar = 'bar';
    }
    someFoo(): T {
      return this._foo;
    }
  }

  expect(() => {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const _ = new Foo('subbedFoo');
  }).not.toThrow();
});

test('No problem with instantiation of the sealed class, or the subbed class', () => {
  @Sealed
  class Foo<T> {
    private _foo: T;
    bar: string;

    constructor(foo: T) {
      this._foo = foo;
      this.bar = 'bar';
    }
    someFoo(): T {
      return this._foo;
    }
  }
  class SubFoo extends Foo<string> {
    constructor(foo: string) {
      super(foo);
    }
  }
  expect(() => {
    new Foo('foo');
    new SubFoo('foo');
  }).not.toThrow();
});

test('No problem with instantiation of the sealed already subbed class, or the subbed class from the frozen class', () => {
  abstract class BaseFoo<T> {
    abstract someFoo(): T;
  }
  @Sealed
  class Foo<T> extends BaseFoo<T> {
    private _foo: T;
    bar: string;

    constructor(foo: T) {
      super();
      this._foo = foo;
      this.bar = 'bar';
    }
    someFoo(): T {
      return this._foo;
    }
  }
  class SubFoo extends Foo<string> {
    constructor(foo: string) {
      super(foo);
    }
  }
  expect(() => {
    new Foo('foo');
    new SubFoo('foo');
  }).not.toThrow();
});

test('Should be allowed to mutate the properties of a sealed object', () => {
  @Sealed
  class Foo<T> {
    private _foo: T;
    bar: string;

    constructor(foo: T) {
      this._foo = foo;
      this.bar = 'bar';
    }
    someFoo(): T {
      return this._foo;
    }
  }
  expect(() => {
    const foo = new Foo('foo');
    foo.bar = 'altered';
  }).not.toThrow(TypeError);
});

test('Should not allow to delete the properties of a sealed object', () => {
  @Sealed
  class Foo<T> {
    private _foo: T;
    bar?: string;

    constructor(foo: T) {
      this._foo = foo;
      this.bar = 'bar';
    }
    someFoo(): T {
      return this._foo;
    }
  }
  expect(() => {
    delete new Foo('foo').bar;
  }).toThrow(TypeError);
});

test('Should work when the final class is a subclass itself', () => {
  abstract class BaseFoo<T> {
    abstract someFoo(): T;
  }
  @Sealed
  class Foo<T> extends BaseFoo<T> {
    private _foo: T;
    bar: string;

    constructor(foo: T) {
      super();
      this._foo = foo;
      this.bar = 'bar';
    }
    someFoo(): T {
      return this._foo;
    }
  }
  expect(() => {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const _ = new Foo('foo').bar;
  }).not.toThrow();
});

