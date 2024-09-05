# 02-Generics

## Understanding Generics in TypeScript: A Code Demo

This branch and corresponding video provides a clear and concise demonstration of how to effectively use generics in TypeScript. 

By watching this code walkthrough, you'll gain a solid understanding of the concepts and best practices for creating reusable and type-safe code. 

We'll explore how generics allow you to define functions, classes, and interfaces that can work with a variety of data types, making your TypeScript code more flexible and maintainable.

## Code Demo (We made this code step by step from scratch)

```ts
const askQuestion = async <T = string>(
  prompt: string,
  parser?: (input: string) => T
): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    if (parser === undefined && typeof {} as T !== 'string') {
      reject(new Error('Parser must be provided for non-string types'));
      return;
    }

    const finalParser = parser ?? ((input: string) => input as unknown as T);

    rl.question(prompt, (answer: string) => {
      resolve(finalParser(answer));
    });
  });
};
```
