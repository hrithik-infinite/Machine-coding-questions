# R.js + Babel Example App

This is a simple example demonstrating how to use RequireJS (r.js) and Babel to bundle and transpile ES6+ JavaScript modules using AMD format.

---

## 📁 Project Structure

```
rjs-babel-app/
├── build.js
├── package.json
├── .babelrc
├── public/
│   ├── index.html
│   └── js/
│       ├── main.js
│       ├── math.js
│       └── message.js
├── src/
│   ├── main.js
│   ├── math.js
│   └── message.js
```

---

## ⚙️ Installation

```bash
npm install
```

---

## 🛠️ Build Steps

### 1. Transpile ES6 to ES5

Use Babel to transpile code from `src/` to `public/js/`:

```bash
npx babel src --out-dir public/js
```

### 2. Bundle with r.js

Use RequireJS optimizer to bundle and minify the app:

```bash
npx r.js -o build.js
```

Output will be in: `dist/bundle.js`

---

## 🚀 Run

You can open `public/index.html` in a browser to see the result. Open dev tools console to see output:

```
25
Hello, Hrithik!
```

---

## 📦 Dependencies

- [requirejs](https://www.npmjs.com/package/requirejs)
- [@babel/core](https://www.npmjs.com/package/@babel/core)
- [@babel/cli](https://www.npmjs.com/package/@babel/cli)
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)

---

## 📄 License

ISC
