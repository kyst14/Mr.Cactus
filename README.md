# 🌵 Mr.Cactus

**Mr.Cactus** is an online family flower shop.  
Here, you can browse, search, and learn about all the plants you like.  

Visit our site: [mr-cactus.ddns.net](https://mr-cactus.ddns.net)

---

## 🏗️ Project Architecture

- **Framework:** Next.js  
- **Styling:** Tailwind CSS  
- **Language:** TypeScript  

The project is divided into reusable components, each responsible for a different part of the page, which makes it easy to maintain and scale.

---

## ⚡ Key Features

- Fast and responsive design
- Search and filter flowers
- Structured code with reusable components
- Full TypeScript support

---

## 🚀 Running the Project Locally

1. Clone the repository:  
```bash
git clone https://github.com/kyst14/Mr.Cactus.git
```

2. Install dependencies:

```bash
npm install
# or
yarn
# or
bun install
```

3. Run the project:

```bash 
npm run dev
# or
yarn dev
# or
bun dev
```

## 📦 Project Structure

```
.
├── README.md
├── eslint.config.mjs
├── my_tree_structure.txt       # Tree structure of the project
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── public/                     # Public Folder
├── src/
│   ├── app/                    # Application Folder
│   │   ├── (private)/          # Private part of the application
│   │   ├── (public)/           # Public part of the application (accessible for everyone)
│   │   │   ├── (home)/
│   │   │   │   └── page.tsx
│   │   │   ├── catalog/
│   │   │   └── layout.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/              # Components folder (e.g. footer, menu, search input)
│   └── config/                   # Configuration folder
└─── tsconfig.json
```

## 👥 Contributors

The Mr.Cactus Team

## 📖 License
This project is licensed under the MIT License.