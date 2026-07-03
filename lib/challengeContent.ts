export interface ChallengeCase {
  input: unknown[];
  expected: unknown;
  explanation?: string;
}

export interface ChallengeContent {
  funcName: string;
  instruction: string;
  inputExplanation: string;
  outputExplanation: string;
  examples: ChallengeCase[];
  hiddenCases: ChallengeCase[];
  hint: string;
  starterCode: string;
  interviewQuestion: string;
  interviewAnswer: string;
  referenceSolution?: string;
  solutionSteps?: string[];
  commonMistakes?: string[];
  interviewExplanation?: string;
}

interface ChallengeSolutionGuide {
  referenceSolution: string;
  solutionSteps: string[];
  commonMistakes: string[];
  interviewExplanation: string;
}

export const CHALLENGE_CONTENT: Record<string, ChallengeContent> = {
  "c17ac10b-58cc-4372-a567-0e02b2c3d401": {
    funcName: "addition",
    instruction: "Write a function that takes two numbers and returns their sum.",
    inputExplanation: "Two numbers `a` and `b`.",
    outputExplanation: "A single number that is equal to `a + b`.",
    examples: [
      { input: [2, 3], expected: 5 },
      { input: [-3, -6], expected: -9 },
    ],
    hiddenCases: [{ input: [7, 3], expected: 10 }],
    hint: "Use the `+` operator and return the result.",
    starterCode: "function addition(a, b) {\n  // Write your code here\n}\n",
    interviewQuestion: "What does a function parameter do in JavaScript?",
    interviewAnswer: "A parameter lets a function receive values from outside so it can work with different inputs.",
  },
  "c17ac10b-58cc-4372-a567-0e02b2c3d402": {
    funcName: "convert",
    instruction: "Write a function that takes minutes and returns seconds.",
    inputExplanation: "A number representing minutes.",
    outputExplanation: "A number representing how many seconds are in that many minutes.",
    examples: [
      { input: [5], expected: 300, explanation: "5 minutes * 60 = 300 seconds." },
      { input: [2], expected: 120, explanation: "2 minutes * 60 = 120 seconds." },
    ],
    hiddenCases: [{ input: [3], expected: 180 }],
    hint: "1 minute = 60 seconds. Multiply minutes by 60.",
    starterCode: "function convert(minutes) {\n  // Write your code here\n}\n",
    interviewQuestion: "What is a function return value?",
    interviewAnswer: "A return value is the final result a function sends back after doing its work.",
  },
  "c17ac10b-58cc-4372-a567-0e02b2c3d403": {
    funcName: "addition",
    instruction: "Create a function that increases a number by 1 and returns the result.",
    inputExplanation: "A single number.",
    outputExplanation: "The next number after the input.",
    examples: [{ input: [0], expected: 1 }, { input: [9], expected: 10 }],
    hiddenCases: [{ input: [-3], expected: -2 }],
    hint: "Return `num + 1`.",
    starterCode: "function addition(num) {\n  // Write your code here\n}\n",
    interviewQuestion: "What is an argument in JavaScript?",
    interviewAnswer: "An argument is the real value passed into a function when the function is called.",
  },
  "c17ac10b-58cc-4372-a567-0e02b2c3d404": {
    funcName: "triArea",
    instruction: "Write a function that returns the area of a triangle.",
    inputExplanation: "Two numbers: base and height.",
    outputExplanation: "A number equal to `(base * height) / 2`.",
    examples: [{ input: [3, 2], expected: 3 }, { input: [7, 4], expected: 14 }],
    hiddenCases: [{ input: [10, 10], expected: 50 }],
    hint: "Triangle area is base times height divided by 2.",
    starterCode: "function triArea(base, height) {\n  // Write your code here\n}\n",
    interviewQuestion: "Why do we use `return` in a function?",
    interviewAnswer: "We use return to send the final value back to wherever the function was called.",
  },
  "c17ac10b-58cc-4372-a567-0e02b2c3d405": {
    funcName: "findSmallest",
    instruction: "Return the smallest number in the array.",
    inputExplanation: "An array of numbers.",
    outputExplanation: "The smallest number found in the array.",
    examples: [{ input: [[34, 15, 88, 2]], expected: 2 }],
    hiddenCases: [
      { input: [[34, -345, -1, 100]], expected: -345 },
      { input: [[7, 7, 7]], expected: 7 },
    ],
    hint: "You can use `Math.min(...arr)`.",
    starterCode: "function findSmallest(arr) {\n  // Write your code here\n}\n",
    interviewQuestion: "What is an array in JavaScript?",
    interviewAnswer: "An array is a list-like structure used to store multiple values in order.",
  },
  "c17ac10b-58cc-4372-a567-0e02b2c3d406": {
    funcName: "getFirstValue",
    instruction: "Return the first value in the array.",
    inputExplanation: "An array containing numbers.",
    outputExplanation: "The first item from the array.",
    examples: [{ input: [[1, 2, 3]], expected: 1 }],
    hiddenCases: [
      { input: [[80, 5, 100]], expected: 80 },
      { input: [[-500, 0, 50]], expected: -500 },
    ],
    hint: "Arrays start from index `0`.",
    starterCode: "function getFirstValue(arr) {\n  // Write your code here\n}\n",
    interviewQuestion: "How do you access the first item in an array?",
    interviewAnswer: "You access the first item with index 0, like `arr[0]`.",
  },
  "c17ac10b-58cc-4372-a567-0e02b2c3d407": {
    funcName: "circuitPower",
    instruction: "Return the power by multiplying voltage and current.",
    inputExplanation: "Two numbers: voltage and current.",
    outputExplanation: "A number representing power.",
    examples: [{ input: [230, 10], expected: 2300 }],
    hiddenCases: [
      { input: [110, 3], expected: 330 },
      { input: [480, 20], expected: 9600 },
    ],
    hint: "Power = voltage * current.",
    starterCode: "function circuitPower(voltage, current) {\n  // Write your code here\n}\n",
    interviewQuestion: "What does the `*` operator do?",
    interviewAnswer: "The `*` operator multiplies one number by another.",
  },
  "c17ac10b-58cc-4372-a567-0e02b2c3d408": {
    funcName: "giveMeSomething",
    instruction: "Return the word `something` followed by a space and the argument.",
    inputExplanation: "A string value.",
    outputExplanation: "A new string starting with `something `.",
    examples: [{ input: ["is better than nothing"], expected: "something is better than nothing" }],
    hiddenCases: [
      { input: ["Bob Dylan"], expected: "something Bob Dylan" },
      { input: ["something"], expected: "something something" },
    ],
    hint: "Join the words with a space in between.",
    starterCode: "function giveMeSomething(a) {\n  // Write your code here\n}\n",
    interviewQuestion: "What is string concatenation?",
    interviewAnswer: "String concatenation means joining strings together to make one new string.",
  },
  "c17ac10b-58cc-4372-a567-0e02b2c3d409": {
    funcName: "lessThanOrEqualToZero",
    instruction: "Return true if the number is less than or equal to zero.",
    inputExplanation: "A single number.",
    outputExplanation: "A boolean value: true or false.",
    examples: [{ input: [5], expected: false }, { input: [0], expected: true }],
    hiddenCases: [{ input: [-2], expected: true }],
    hint: "Use the `<=` comparison operator.",
    starterCode: "function lessThanOrEqualToZero(num) {\n  // Write your code here\n}\n",
    interviewQuestion: "What is a boolean value?",
    interviewAnswer: "A boolean value is either true or false.",
  },
  "c17ac10b-58cc-4372-a567-0e02b2c3d410": {
    funcName: "dividesEvenly",
    instruction: "Return true if `a` divides evenly by `b`.",
    inputExplanation: "Two integers: `a` and `b`.",
    outputExplanation: "A boolean showing whether `a % b === 0`.",
    examples: [{ input: [98, 7], expected: true }, { input: [85, 4], expected: false }],
    hiddenCases: [{ input: [10, 2], expected: true }],
    hint: "Use the remainder operator `%`.",
    starterCode: "function dividesEvenly(a, b) {\n  // Write your code here\n}\n",
    interviewQuestion: "What does the modulo operator do?",
    interviewAnswer: "The modulo operator returns the remainder after division.",
  },
};


const CHALLENGE_SOLUTIONS: Record<string, ChallengeSolutionGuide> = {
  "c17ac10b-58cc-4372-a567-0e02b2c3d401": {
    referenceSolution: `function addition(a, b) {
  return a + b;
}
`,
    solutionSteps: [
      "Read the two inputs as numbers.",
      "Add them using the `+` operator.",
      "Return the result instead of logging it.",
    ],
    commonMistakes: [
      "Forgetting to return the value from the function.",
      "Changing the function name so the tests cannot find it.",
    ],
    interviewExplanation: "I read the two inputs, added them directly, and returned the sum. The key point is returning the computed value so other code can reuse it.",
  },
  "c17ac10b-58cc-4372-a567-0e02b2c3d402": {
    referenceSolution: `function convert(minutes) {
  return minutes * 60;
}
`,
    solutionSteps: [
      "Take the minutes input.",
      "Use the fixed rule that one minute equals sixty seconds.",
      "Return the multiplied value.",
    ],
    commonMistakes: [
      "Using addition instead of multiplication.",
      "Logging the answer instead of returning it.",
    ],
    interviewExplanation: "I converted minutes to seconds by multiplying by sixty and returning the result. It is a direct transformation based on a fixed unit conversion.",
  },
  "c17ac10b-58cc-4372-a567-0e02b2c3d403": {
    referenceSolution: `function addition(num) {
  return num + 1;
}
`,
    solutionSteps: [
      "Take the given number.",
      "Increase it by one.",
      "Return the updated value.",
    ],
    commonMistakes: [
      "Mutating a separate variable without returning it.",
      "Returning the original number unchanged.",
    ],
    interviewExplanation: "I used a simple increment pattern and returned `num + 1`. The important part is that the function sends back the new value.",
  },
  "c17ac10b-58cc-4372-a567-0e02b2c3d404": {
    referenceSolution: `function triArea(base, height) {
  return (base * height) / 2;
}
`,
    solutionSteps: [
      "Multiply the base by the height.",
      "Divide that product by two.",
      "Return the computed triangle area.",
    ],
    commonMistakes: [
      "Forgetting to divide by two.",
      "Returning a string instead of a number.",
    ],
    interviewExplanation: "I applied the standard triangle area formula, which is base times height divided by two, and returned the final number.",
  },
  "c17ac10b-58cc-4372-a567-0e02b2c3d405": {
    referenceSolution: `function findSmallest(arr) {
  return Math.min(...arr);
}
`,
    solutionSteps: [
      "Accept the array of numbers.",
      "Spread the array into `Math.min`.",
      "Return the smallest value.",
    ],
    commonMistakes: [
      "Passing the array directly to `Math.min` without spreading it.",
      "Sorting the array in place when a simple minimum check is enough.",
    ],
    interviewExplanation: "I used `Math.min(...arr)` to compare all values and return the smallest one. It keeps the code short and easy to explain.",
  },
  "c17ac10b-58cc-4372-a567-0e02b2c3d406": {
    referenceSolution: `function getFirstValue(arr) {
  return arr[0];
}
`,
    solutionSteps: [
      "Read the array input.",
      "Access index zero because arrays start at zero.",
      "Return that first value.",
    ],
    commonMistakes: [
      "Using index one instead of zero.",
      "Returning the entire array instead of the first item.",
    ],
    interviewExplanation: "I returned `arr[0]` because JavaScript arrays are zero-indexed. That gives the first stored value immediately.",
  },
  "c17ac10b-58cc-4372-a567-0e02b2c3d407": {
    referenceSolution: `function circuitPower(voltage, current) {
  return voltage * current;
}
`,
    solutionSteps: [
      "Read voltage and current as inputs.",
      "Multiply them to calculate power.",
      "Return the product.",
    ],
    commonMistakes: [
      "Adding the values instead of multiplying them.",
      "Returning a formatted string instead of the numeric answer.",
    ],
    interviewExplanation: "I used the formula power equals voltage times current and returned the calculated product as a number.",
  },
  "c17ac10b-58cc-4372-a567-0e02b2c3d408": {
    referenceSolution: `function giveMeSomething(a) {
  return "something " + a;
}
`,
    solutionSteps: [
      "Start with the word `something`.",
      "Add a space after it.",
      "Append the incoming string and return the full result.",
    ],
    commonMistakes: [
      "Forgetting the space between words.",
      "Returning only the input string.",
    ],
    interviewExplanation: "I built a new string by prefixing the input with `something ` and returning that combined value.",
  },
  "c17ac10b-58cc-4372-a567-0e02b2c3d409": {
    referenceSolution: `function lessThanOrEqualToZero(num) {
  return num <= 0;
}
`,
    solutionSteps: [
      "Compare the number against zero.",
      "Use the `<=` operator to allow zero as well.",
      "Return the boolean result.",
    ],
    commonMistakes: [
      "Using `<` and accidentally excluding zero.",
      "Returning strings like `true` and `false` instead of boolean values.",
    ],
    interviewExplanation: "I used a comparison expression, `num <= 0`, which directly returns `true` or `false` depending on the input.",
  },
  "c17ac10b-58cc-4372-a567-0e02b2c3d410": {
    referenceSolution: `function dividesEvenly(a, b) {
  return a % b === 0;
}
`,
    solutionSteps: [
      "Use the modulo operator to get the remainder.",
      "Check whether the remainder is zero.",
      "Return that boolean comparison.",
    ],
    commonMistakes: [
      "Checking division output instead of the remainder.",
      "Returning the remainder itself instead of a boolean.",
    ],
    interviewExplanation: "I used `%` to test whether `a` leaves any remainder when divided by `b`. If the remainder is zero, the number divides evenly.",
  },
};

export function decodeStarterCode(value: string) {
  return value.includes("\\n") ? value.replace(/\\n/g, "\n") : value;
}

export function getChallengeContent(challengeId: string, fallbackStarterCode?: string): ChallengeContent | null {
  const content = CHALLENGE_CONTENT[challengeId];
  if (!content) return null;

  return {
    ...content,
    ...CHALLENGE_SOLUTIONS[challengeId],
    starterCode: decodeStarterCode(fallbackStarterCode || content.starterCode),
  };
}

