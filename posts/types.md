---
title: 'Typescript 风格指南'
date: '2023-06-20'
---

---
## TS 编程风格指南

1. any 与 unknown

   - **共同点： 可以赋值任何类型**

   ```ts
   let anyValue: any;
   let unknownValue: unknown;

   anyValue = 123;
   anyValue = "string";
   anyValue = { name: "lucy" };

   unknownValue = 123;
   unknownValue = "string";
   unknownValue = { age: 20 };
   ```

   - **区别：`unknown` 更安全， 读取属性时需要明确类型**

   ```ts
   unknownValue.trim(); // error: 类型“unknown”上不存在属性“trim”
   anyValue.trim(); // no error

   let unknownSetBool: boolean = unknownValue; // error: 不能将类型“unknown”分配给类型“boolean”
   unknownSetBool = anyValue; // no error
   // 明确类型
   if (typeof unknownValue === "string") {
     unknownValue.trim();
   }
   if (typeof unknownValue === "boolean") {
     unknownSetBool = unknownValue;
   }
   ```

2. void、undefined、null、never

   - **`void`:** 与 `any` 相反, 表示无返回类型,只能赋值 `undefined` 和 `null`

     ```ts
     let voidValue: void;
     voidValue = null; // strictNullChecks 模式下 error, 否则 ok
     voidValue = undefined;
     voidValue = void 0; // void 运算符 对给定的表达式进行求值， 然后返回 undefined
     voidValue = "string"; //error: 不能将类型“string”分配给类型“void”
     ```

   - **`undefined` 与 `null`:** 对应 `null` 跟 `undefined` 两种类型，默认情况下， `null` 和 `undefined` 是所有类型的子类型, 即可以把 `null` 和 `undefined` 赋值给任何类型。如果指定了 `--strictNullChecks`， `null` 只能赋值给本身， `undefined` 只能赋予 `undefined` 以及 `void`

     ```ts
     // undefined 返回类型  必须显示的返回值
     function undFunc(): undefined {
       // return void 0; // ok
       // return null; //strictNullChecks 模式下：error 不能将类型“null”分配给类型“undefined”
       return undefined;
     }

     function nullFunc(): null {
       // return undefined //strictNullChecks 模式下: error 不能将类型“undefined”分配给类型“null”
       return null;
     }
     ```

   - `never` : 表示永远不存在的值的类型, 使用场景：

     - 抛出异常 函数的返回值

     ```ts
     function errorFunc(): never {
       throw new Error();
     }
     ```

     - 不会有返回值的行数表达式或箭头函数表达式

     ```ts
     function noReachFunc(): never {
       while (true) {}
     }
     ```

     - `switch...case` 中的 `default`,这样出现其他的未定义值会进行提示

     ```ts
     function switchNeverDefault(key: "larger" | "small") {
     switch (key) {
       case "larger":
         // larger
         break;
       case "small":
         // small
         break;
       default:
       //never
     }

     switchNeverDefault('middle') // 类型“"middle"”的参数不能赋给类型“"larger" | "small"”的参数。
     ```

3. interface、type 的区别

   1. type

      1. 定义联合类型、tuple、原始类型声明 使用 type
      2. 不可重复定义

      ```ts
      type TTupleArr = [number, string];
      type TStr = string;
      type TNumArr = number[];
      type Fruit = "apple" | "orange" | "pear";
      type TFunc = (v:string):string
      type TPair<T> = {
        favors: T;
        hobby:T
      }
      // type Fruit = "football"; //error 标识符“Fruit”重复
      ```

   2. interface

      1. 可合并定义

      ```ts
      interface IProps {
        name: string;
      }
      interface IProps {
        age: number;
      }

      const person: IProps = {
        name: "luck",
        age: 20,
      };
      ```

4. 类型断言

   1. 类型强制转换，在某些场景下 TS 无法推断出类型， 但是 我们明确类型， 这时候就可以使用类型断言

   ```ts
   document.querySelector("#myButton").addEventListener("click", e => {
     const btn = e.currentTarget as HTMLButtonElement;
   });
   const strValue = <string>
   ```

   2. 慎用非空断言!，避免异常情况下抛出异常

   ```ts
   const a = myObject!.number;
   ```

5. 类型推导

   1. 基本类型 可以不显示 指定类型， TS 会自动进行推导

   ```ts
   let str = "string"; // let str: string
   let arr = ["name", 24]; //  let arr: (string | number)[]
   ```

6. class 与 interface 的区别及使用场景
7. 联合类型
8. 泛型的使用
9. 常用的 Utility Types
   1. Partial<T>： 将 T 的所有属性变成可选
   2. Required<T>： 将 T 的所有属性变成必填
   3. Record<K,T>： 给定 K 的属性的值类型为 T
   4. Pick<T,K>: 从 T 中 选择部的 K
   5. Parameters<T>: 返回函数参数类型 Tuple
   6. ReturnType<T>: 返回函数的返回值 类型
10. keyof、typeof 的使用
11. 类型多态，函数重载

### 风格指南

必须使用
推荐使用的
不建议使用

参照 vue 风格指南
