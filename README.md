# 🌈 Color Tokens

https://color-tokens.vercel.app/

A prototype exploring a workflow and architecture for adding user-defined color tokens that supports easy theming.

- Tokens are stored in React state
- Each color token maps directly to a CSS variable that we create and insert into the stylesheet
- Tokens can have an optional dark mode color, making it easier to support both dark and light mode
- If the token has a dark mode color defined, we'll update the CSS variable definition when switching between color schemes.

## 🚀 Run it locally

```
npm run dev
```
