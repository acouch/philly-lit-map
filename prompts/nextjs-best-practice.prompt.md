---
agent: 'agent'
description: 'Ensure Next.js code meets best practices for the solution/project.'
---

# Next.js best practices

Your task is to ensure Next.js code meets the best practices specific to this solution/project. This includes:

## General

* Follow the user’s requirements carefully & to the letter.
* Always write correct, best practice, DRY principle (Dont Repeat Yourself), bug free, fully functional and working code also it should be aligned to listed rules down below at Code Implementation Guidelines .
* Focus on easy and readability code, over being performant.
* Fully implement all requested functionality.
* Include all required imports, and ensure proper naming of key components.
* Use next.js app router.
* Any new code should that includes more than two HTML tags should be a component placed in the `components` folder

## Accessibility
* All user interfaces should be fully accessible

## Code Implementation Guidelines

Follow these rules when you write code:

* Use early returns whenever possible to make the code more readable.
* Use descriptive variable and function names.
* Event functions should be named with a “handle” prefix, like “handleClick” for onClick and “handleKeyDown” for onKeyDown.
* Implement accessibility features on elements. For example, a tag should have a tabindex, aria-label, on:click, on:keydown, and similar attributes.
Use functional and declarative programming patterns. Avoid classes.

## Naming conventions
* Use PascalCase for variable, function or react component names.
* Use lowercase with dashes for directors (e.g. components/my-form.tsx)

## UI and Styling
* Always use Tailwind classes for styling HTML elements.
* Implement responsive design with Tailwind CSS.
* Use a mobile-first approach.
* Focus on a clean and minimal UI design.
* Use dark mode as the primary theme.
* Optimize for fast loading times.
* Ensure intuitive navigation.

## React components
* Favor react server components and minimize the use of client components
* Data fetching is implemented in pages.
* Write declarative JSX with clear and readable structure.
* Avoid unnecessary curly braces in conditionals; use concise syntax for simple statements.
* Use interfaces to define component properties.

## Server Actions
* Read and write operations must be organized in separate files.
* Read operations are added to a file that is named like the data model (e.g. prompt.ts for reading operations of prompts, project-rules.ts for reading operations of project rules, etc.)

## Forms
* Utilize Zod for both client-side and server-side form validation.
* Use useActionState and useForm for form handling.
* Form submissions are handled by separate files (e.g. prompt-form.ts for the prompt form server actions, project-rules-form.ts for project rules server actions, etc.)

## Testing
* Write unit tests using Jest and React Testing Library
* Use snapshot tests to validate the rendering output of a component
* Use fine-grained assertions to test component behaviour and state management.
* When testing components, test the actual component behavior rather than mocking child components.
* Use the existing ./__mocks__ folder to mock AWS Amplify and next.js libraries.
* Always import jest globals import { describe, expect, test } from "@jest/globals";
* Use test() instead of it()
* Add tests into __tests__ folder in the same folder where the unit to test is located.