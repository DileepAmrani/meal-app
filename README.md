# React + TypeScript + Vite with Tailwind CSS, Axios, and react-awesome-stars-rating

This template provides a minimal setup to get React working in Vite with HMR, Tailwind CSS, Axios for fetching meal data, and `react-awesome-stars-rating` for star ratings.

## Features:
- **React**: A fast and flexible JavaScript library for building user interfaces.
- **TypeScript**: Static typing for better development experience.
- **Vite**: A fast, opinionated build tool that provides a lightning-fast development experience with Hot Module Replacement (HMR).
- **Tailwind CSS**: Utility-first CSS framework for building modern UIs quickly.
- **Axios**: Promise-based HTTP client for making requests to fetch meal data.
- **react-awesome-stars-rating**: A simple and customizable star rating component.

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
