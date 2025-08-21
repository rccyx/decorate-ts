import { describe, it, expect } from "vitest";
import {
  Final,
  Frozen,
  Sealed,
  Singleton,
  FinalTypeError,
} from "../src/index.js";

describe("Decorators", () => {
  describe("@Final", () => {
    it("should prevent inheritance", () => {
      @Final
      class TestClass {
        value = "test";
      }

      class SubClass extends TestClass {
        subValue = "sub";
      }

      expect(() => new TestClass()).not.toThrow();
      expect(() => new SubClass()).toThrow(FinalTypeError);
    });
  });

  describe("@Frozen", () => {
    it("should freeze instance properties", () => {
      @Frozen
      class TestClass {
        value = "initial";

        constructor(val?: string) {
          if (val) this.value = val;
        }
      }

      const instance = new TestClass("test");
      expect(instance.value).toBe("test");

      expect(() => {
        instance.value = "modified";
      }).toThrow();
    });
  });

  describe("@Sealed", () => {
    it("should seal instance properties", () => {
      @Sealed
      class TestClass {
        value = "initial";

        constructor(val?: string) {
          if (val) this.value = val;
        }
      }

      const instance = new TestClass("test");
      expect(instance.value).toBe("test");

      // Should allow modification of existing properties
      instance.value = "modified";
      expect(instance.value).toBe("modified");

      // Should prevent adding new properties
      expect(() => {
        (instance as any).newProp = "new";
      }).toThrow();
    });
  });

  describe("@Singleton", () => {
    it("should ensure only one instance exists", () => {
      @Singleton
      class TestClass {
        value: string;

        constructor(val: string) {
          this.value = val;
        }
      }

      const instance1 = new TestClass("first");
      const instance2 = new TestClass("second");

      expect(instance1).toBe(instance2);
      expect(instance1.value).toBe("first");
      expect(instance2.value).toBe("first");
    });
  });
});
