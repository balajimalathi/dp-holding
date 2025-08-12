# Troubleshooting

## **Fix Tailwind/PostCSS Issues**

### **1. Remove old versions**

```bash
pnpm uninstall tailwindcss postcss autoprefixer
```

### **2. Reinstall latest versions**

```bash
pnpm install tailwindcss@latest postcss@latest autoprefixer@latest
```

### **3. Recreate config files**

```bash
pnpx tailwindcss init -p
```

### **4. Check config**

* In `tailwind.config.js` → set `content` to match your project:

```js
content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"]
```

### **5. Add Tailwind directives**

In your main CSS (e.g., `globals.css`):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Common fixes:**

* Classes not working → check `content` paths
* Build errors → reinstall as above
* Styles stale → restart dev server & clear cache

---