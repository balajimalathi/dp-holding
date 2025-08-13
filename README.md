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

## **Docker Commands**

This is your containerization workflow for running the Next.js (or other Node-based) app.

**Build the Docker image**

```bash
docker build -t fedmob-dp-holding .
```

* `docker build` → creates a Docker image from your `Dockerfile`.
* `-t fedmob-dp-holding` → names (tags) the image as `fedmob-dp-holding`.
* `.` → tells Docker to use the current directory as the build context.

**Run the image in a container**

```bash
docker run -p 3000:3000 fedmob-dp-holding
```

* `docker run` → starts a container from an image.
* `-p 3000:3000` → maps **host port 3000** to **container port 3000**, so you can access it via `http://localhost:3000`.
* `dp-holding` → name of the image you built earlier.

💡 *If you built a production Next.js app in your container, this command should serve it to your host machine.*

---
