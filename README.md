This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
Alright — here’s a breakdown of what’s happening in both sections, with some extra context so it’s clear how everything connects.

---

## **Communication**

### **Android**

### **Flutter**

Your Dart/Flutter snippet is using the [`flutter_inappwebview`](https://pub.dev/packages/flutter_inappwebview) plugin to load HTML/JS content inside a mobile app and call JavaScript functions from Dart.

```dart
InAppWebView(
  initialFile: widget.url, // Loads a local HTML file or remote page
  onWebViewCreated: (controller) async {
    _controller = controller; // Store the controller for later

    // Immediately call a JavaScript function in the web page
    await controller.evaluateJavascript(
      source: "window.getDpHolding('<customerId>');",
    );
  },
  onLoadStop: (controller, url) async {
    // After the page finishes loading, call the same JS function again
    await controller.evaluateJavascript(
      source: "window.getDpHolding('<customerId>');",
    );
  },
)
```

**Key points:**

* **`initialFile: widget.url`** — You’re loading either a local HTML file or remote URL passed into the widget.
* **`onWebViewCreated`** — Runs when the WebView is initialized.
  You use `evaluateJavascript` here to call a JavaScript function `getDpHolding` with a `customerId` parameter right away.
* **`onLoadStop`** — Runs when the page has fully loaded.
  You call `getDpHolding` again to ensure it executes after all assets are ready (useful if the function wasn’t available at `onWebViewCreated` time).
* **`window.getDpHolding()`** — This assumes your loaded page has a JS function defined in the global `window` object.

💡 *This is a standard way to bridge native Flutter code ↔ JavaScript code in a WebView.*

---

## **Docker Commands**

This is your containerization workflow for running the Next.js (or other Node-based) app.

**Build the Docker image**

```bash
docker build -t dp-holding .
```

* `docker build` → creates a Docker image from your `Dockerfile`.
* `-t dp-holding` → names (tags) the image as `dp-holding`.
* `.` → tells Docker to use the current directory as the build context.

**Run the image in a container**

```bash
docker run -p 3000:3000 dp-holding
```

* `docker run` → starts a container from an image.
* `-p 3000:3000` → maps **host port 3000** to **container port 3000**, so you can access it via `http://localhost:3000`.
* `dp-holding` → name of the image you built earlier.

💡 *If you built a production Next.js app in your container, this command should serve it to your host machine.*

---
