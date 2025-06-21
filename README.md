# README.ai <img src="https://github.com/mandarwagh9/readme.ai/blob/main/src/components/favicon.ico" alt="README.ai Logo" width="32" height="32" style="vertical-align: middle; margin-left: 10px;">
A beautiful, modern web application that transforms any GitHub profile into a stunning README with AI-powered insights and beautiful formatting.

![README.ai Demo](https://github.com/mandarwagh9/readme.ai/blob/main/localhost_8080_(screenshot)%20(2).png)
![README.ai Demo Output](https://github.com/mandarwagh9/readme.ai/blob/main/localhost_8080_(screenshot).png)

## 🌟 Features

- **AI-Powered Generation**: Creates personalized, professional READMEs for GitHub profiles
- **Dynamic Content**: Pulls live data from GitHub including:
  - User profile information
  - Pinned repositories
  - Top starred repositories
  - Language statistics
  - Contribution metrics
- **Beautiful Design**: Modern, dark-themed UI with:
  - Sleek animations
  - Responsive layout
  - Interactive elements
  - Real-time previews
- **Easy to Use**: Simple 3-step process to generate and download your README

## 🛠️ Tech Stack

- **Frontend Framework**: React + TypeScript + Vite
- **UI Components**: Shadcn/ui
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **Toast Notifications**: Sonner
- **Markdown Rendering**: React-Markdown

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mandarwagh9/readme.ai.git
   cd readme.ai
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🎯 Usage

1. **Create Your Profile Repository**
   - Go to GitHub and create a new repository
   - Name it exactly the same as your GitHub username
   - Make it public and initialize with a README

2. **Generate Your README**
   - Enter your GitHub username in the input field
   - Click "Generate README"
   - Wait for the AI to work its magic

3. **Update Your Profile**
   - Click "Download README" when it's ready
   - Open your profile repository on GitHub
   - Replace the content of your README.md with the generated one
   - Commit the changes and your profile is ready!

## 💡 Pro Tips

- Make sure your GitHub profile is public
- Pin your best repositories for better results
- Keep your profile bio and information up to date
- Regularly update your README to showcase new projects

## 🛡️ Privacy & Security

- Only accesses public GitHub data
- No data is stored or cached
- Works with GitHub's public API (no authentication required)
- Optional: Use your own GitHub token for higher rate limits

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgements

- [Shadcn/ui](https://ui.shadcn.com/) for beautiful, accessible UI components
- [TailwindCSS](https://tailwindcss.com/) for utility-first CSS framework
- [Lucide React](https://lucide.dev/) for beautiful icons
- [GitHub REST API](https://docs.github.com/en/rest) for profile data
- [GitHub GraphQL API](https://docs.github.com/en/graphql) for pinned repositories

## 📬 Contact

Project Link: [https://github.com/mandarwagh9/readme.ai](https://github.com/mandarwagh9/readme.ai)

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone https://github.com/mandarwagh9/readme.ai.git

# Step 2: Navigate to the project directory.
cd readme.ai
# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS


=======
Below is a **step-by-step plan** to build a “GitHub‑to‑README” AI tool using Next.js. You’ll set up a frontend where a user enters a GitHub username, a backend API route that:

1. Fetches public GitHub profile/repos data
2. Feeds that data into an AI (OpenAI) prompt
3. Returns a generated `README.md` in Markdown

Then the frontend displays a live Markdown preview and lets the user download the `.md` file. We’ll use:

* **Next.js** (React framework)
* **Tailwind CSS** (for quick, responsive styling)
* **Axios** (HTTP client)
* **react-markdown** (to render Markdown in the browser)
* **OpenAI Node.js SDK** (for AI generation)
* Optionally: a **GitHub Personal Access Token** (for higher‐rate‐limit requests)

---

## 1. Tech Stack & Prerequisites

1. **Node.js & npm/yarn** (v14+ recommended)
2. **Next.js** (v13+; we'll use the App Router or Pages Router)—here, we’ll use the **Pages Router** for simplicity.
3. **Tailwind CSS** (for quick styling)
4. **Axios** (to fetch GitHub data and call AI)
5. **react-markdown** (to render the generated Markdown)
6. **OpenAI Node.js SDK** (for calling the GPT‑4/GPT‑3.5 API)
7. (Optional) **GitHub Personal Access Token** if you want to exceed GitHub’s unauthenticated rate limits (60 requests/hour). If you skip this, your app will still work for most public profiles but may hit limits quickly in development.

### a. Accounts & API Keys

* **OpenAI API Key**: Create an account on [https://platform.openai.com/](https://platform.openai.com/) and grab your API key.
* **(Optional) GitHub PAT**: Go to [https://github.com/settings/tokens](https://github.com/settings/tokens) → “Generate new token” → select at least `read:user` and `repo` scopes (or only `read:user` and `public_repo`). Copy it.

You’ll store both in a `.env.local` file (covered below).

---

## 2. Project Setup

1. **Create a new Next.js app:**

   ```bash
   npx create-next-app@latest github-readme-ai
   cd github-readme-ai
   # Choose “Yes” for TypeScript if you prefer TS—this example uses plain JS.
   # Then say “No” to ESLint/Prettier prompts if you want minimal setup.
   ```

2. **Install dependencies:**

   ```bash
   npm install axios react-markdown tailwindcss postcss autoprefixer openai
   # tailwindcss, postcss, autoprefixer are needed to set up Tailwind.
   ```

3. **Initialize Tailwind CSS:**

   ```bash
   npx tailwindcss init -p
   ```

   * This creates `tailwind.config.js` and `postcss.config.js`.
   * In `tailwind.config.js`, ensure the `content` array includes:

     ```js
     /** @type {import('tailwindcss').Config} */
     module.exports = {
       content: [
         "./pages/**/*.{js,ts,jsx,tsx}",
         "./components/**/*.{js,ts,jsx,tsx}"
       ],
       theme: {
         extend: {},
       },
       plugins: [],
     }
     ```
   * In `styles/globals.css`, replace any existing content with:

     ```css
     @tailwind base;
     @tailwind components;
     @tailwind utilities;
     ```

4. **Create a `.env.local` file** (in the project root) to store your secrets:

   ```
   OPENAI_API_KEY=your_openai_api_key_here
   GITHUB_PAT=your_github_pat_here    # optional but recommended
   ```

   * **Important**: Do *not* commit `.env.local` to Git. It is in `.gitignore` by default from `create-next-app`.

---

## 3. Directory Structure Overview

After the setup, your folder structure will look roughly like:

```
readme.ai/
├── node_modules/
├── pages/
│   ├── api/
│   │   └── generate-readme.js
│   ├── _app.js
│   └── index.js
├── public/
│   └── (static assets, if needed)
├── styles/
│   └── globals.css
├── .env.local
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## 13. Summary

You now have a **full-stack** Next.js project that:

1. **Accepts** a GitHub username from the user.
2. **Fetches** that user’s public data from GitHub (profile + top repos).
3. **Constructs** a clear, structured prompt and calls the OpenAI API to generate a styled `README.md`.
4. **Returns** the generated Markdown to the frontend.
5. **Renders** the Markdown live (via `react-markdown` + Tailwind’s Typography).
6. **Enables** downloading the result as a `.md` file.

