# README.ai 🚀

A beautiful, modern web application that transforms any GitHub profile into a stunning README with AI-powered insights and beautiful formatting.

![README.ai Demo](https://raw.githubusercontent.com/mandarwagh9/readme.ai/779f16fe22595a49cee6dd1a6f004051152fbf4f/localhost_8080_(screenshot)%20(2).png?token=BIOUNHF564ECATVHIT3MZATIK3NP2)

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
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

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

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/ae9c0579-c56c-41e9-a5f9-ea0ee406855a) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
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
github-readme-ai/
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

* **`pages/api/generate-readme.js`** → our backend endpoint that:

  1. Fetches GitHub data
  2. Builds an AI prompt
  3. Calls OpenAI
  4. Returns the Markdown

* **`pages/index.js`** → the frontend: a form to input a GitHub username, calls `/api/generate-readme`, displays the returned Markdown preview (via `react-markdown`), and provides a download button.

* **`components/`** (you can create this folder if you want to split UI pieces; e.g., a `<Navbar />` or `<Footer />`, but it’s optional for MVP).

---

## 4. Backend: `pages/api/generate-readme.js`

We’ll create an API route in Next.js that:

1. **Validates** the incoming request (expects `{ username: "..." }` in the POST body).
2. **Fetches** public GitHub data (user profile + top repos).
3. **Constructs** a prompt string from that data.
4. **Calls** OpenAI with the prompt.
5. Returns `{ readme: "###… Markdown …" }`.

```js
// pages/api/generate-readme.js

import axios from "axios";
import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const { username } = req.body;
  if (!username || typeof username !== "string") {
    return res.status(400).json({ error: "Missing or invalid 'username' in body" });
  }

  // 1. Fetch GitHub user profile
  try {
    // If you have a PAT in env, include it for higher rate limit:
    const headers = {};
    if (process.env.GITHUB_PAT) {
      headers.Authorization = `token ${process.env.GITHUB_PAT}`;
    }

    const userRes = await axios.get(`https://api.github.com/users/${username}`, { headers });
    const userData = userRes.data;
    // userData: { login, name, bio, avatar_url, html_url, followers, following, public_repos, ... }

    // 2. Fetch user's top 5 repos by stars
    const reposRes = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=100`,
      { headers }
    );
    let repos = reposRes.data;
    // Sort repos by stargazers_count
    repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    const top5 = repos.slice(0, 5).map((r) => ({
      name: r.name,
      html_url: r.html_url,
      description: r.description || "",
      stars: r.stargazers_count,
      language: r.language || "N/A",
    }));

    // 3. Construct AI prompt
    // We'll feed the AI this info and ask it to produce a polished README.md
    const prompt = `
You are an expert software developer. Generate a GitHub README.md in markdown for the user. The README should have the following sections:

1. A top-level heading with the user's name (use ${userData.name || username}).
2. An “About Me” section including: 
   - Bio: "${userData.bio || "No bio available."}"
   - Location: "${userData.location || "Not specified"}"
   - Blog/Website: "${userData.blog || "N/A"}"
   - Followers: ${userData.followers}, Following: ${userData.following}
   - Public Repos: ${userData.public_repos}
3. A “Tech Stack” section. Infer the tech stack from the languages of the top 5 repos below:
${top5.map((r, i) => `${i + 1}. ${r.name}: ${r.language}`).join("\n")}
4. A “Top Repositories” section listing each of the top 5 repos as:
   - [Repo Name](Repo URL) - description (⭐ stars, 📝 Language)
5. A “Socials” section with at least:
   - GitHub: https://github.com/${username}
   - (If userData.twitter_username exists, include a Twitter badge)
   - (If userData.linkedin_url exists, include LinkedIn badge)
6. A “GitHub Stats” section showing:
   - A dynamic GitHub stats card using `![](https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=radical)`
7. A “Fun Fact” at the bottom: “${userData.bio?.split(".")[0] || "No fun fact available."}…”

Use appropriate markdown formatting (headings, bullet lists, badges). Make it visually appealing but concise. Do not include any code blocks. Wrap all URLs in markdown link syntax.  
    `;

    // 4. Call OpenAI
    const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
    const openai = new OpenAIApi(configuration);

    const aiResponse = await openai.createChatCompletion({
      model: "gpt-4", // or "gpt-3.5-turbo" if you don’t have GPT-4 access
      messages: [
        { role: "system", content: "You generate stylish GitHub READMEs in markdown." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 800,
    });

    const generatedReadme = aiResponse.data.choices[0].message.content.trim();
    return res.status(200).json({ readme: generatedReadme });
  } catch (error) {
    console.error("Error generating README:", error.response?.data || error.message);
    return res.status(500).json({ error: "Failed to generate README." });
  }
}
```

### Explanation of `generate-readme.js`

* **Line 3–5** → Check that only `POST` is allowed and that `username` was provided.
* **Line 13–21** → Use Axios to fetch `https://api.github.com/users/${username}`. If you have a `GITHUB_PAT` in `.env.local`, we include it to raise the GitHub API rate limit.
* **Line 24–32** → Fetch all repos, sort by star count, then take the top 5. We extract `name`, `html_url`, `description`, `stars`, and `language`.
* **Line 35–63** → Build a single prompt string. We instruct the model exactly how to structure the README, referencing the user data and the top‐5 repos.
* **Line 66–73** → Initialize `OpenAIApi` with your `OPENAI_API_KEY` and call `createChatCompletion`. We ask GPT‑4 to generate up to 800 tokens of Markdown. Adjust `model` and `max_tokens` as needed.
* **Line 76** → Return JSON `{ readme: "<markdown string>" }` to the client.

---

## 5. Frontend: `pages/index.js`

We’ll create a simple page with:

1. A heading/title.
2. A form with a single `<input>` for GitHub username and a “Generate README” button.
3. While waiting, show a spinner or “Loading…”.
4. Once the response arrives, render the Markdown using `<ReactMarkdown>`.
5. A “Download README.md” button that, when clicked, triggers the download.

```jsx
// pages/index.js

import { useState } from "react";
import Head from "next/head";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [username, setUsername] = useState("");
  const [readme, setReadme] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    setLoading(true);
    setError("");
    setReadme("");

    try {
      const res = await fetch("/api/generate-readme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setReadme(data.readme);
      } else {
        setError(data.error || "Unknown error");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  // Function to download the README as a file
  const downloadReadme = () => {
    const element = document.createElement("a");
    const file = new Blob([readme], { type: "text/markdown" });
    element.href = URL.createObjectURL(file);
    element.download = `${username}-README.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>GitHub AI README Generator</title>
        <meta name="description" content="Generate a README.md for any GitHub user using AI" />
      </Head>

      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          AI‑Powered GitHub README Generator
        </h1>

        <form onSubmit={handleSubmit} className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Enter GitHub username (e.g., siya)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 rounded-l px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-2 rounded-r hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Generating…" : "Generate README"}
          </button>
        </form>

        {error && (
          <p className="text-red-600 text-center mb-4">{error}</p>
        )}

        {readme && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="prose max-w-full mb-4">
              <ReactMarkdown>{readme}</ReactMarkdown>
            </div>
            <button
              onClick={downloadReadme}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Download README.md
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
```

### Explanation of `index.js`

* **State Hooks**

  * `username`: tracks the input GitHub username.
  * `readme`: holds the generated Markdown string.
  * `loading`: boolean to show a spinner or disabled button while fetching.
  * `error`: for any error messages.

* **`handleSubmit`**

  * Prevent default form submission.
  * Fire a `POST` to `/api/generate-readme` with `{ username }`.
  * On success, store `data.readme` in state. On error, display it.

* **Markdown Preview**

  * We use `<ReactMarkdown>` to convert the raw Markdown string into HTML.
  * It lives inside a `<div className="prose">` for basic Tailwind typography (you can customize the `prose` style by adding `@tailwind typography` plugin in `tailwind.config.js` if desired).

* **Download Button**

  * Creates a Blob from `readme` text, makes a temporary `<a>` tag, clicks it, and triggers the file download as `<username>-README.md`.

---

## 6. Styling with Tailwind

We already included `globals.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Feel free to customize colors, spacing, or add the `@tailwind typography` plugin:

1. Install typography plugin:

   ```bash
   npm install @tailwindcss/typography
   ```
2. In `tailwind.config.js`:

   ```js
   module.exports = {
     content: [
       "./pages/**/*.{js,ts,jsx,tsx}",
       "./components/**/*.{js,ts,jsx,tsx}"
     ],
     theme: {
       extend: {},
     },
     plugins: [require("@tailwindcss/typography")],
   };
   ```

Then `<div className="prose">` will automatically style headings, lists, links, etc., in a clean way.

---

## 7. Environment Variables `.env.local`

At project root, create a file named `.env.local`:

```
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxx
GITHUB_PAT=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx   # optional
```

* **`OPENAI_API_KEY`** is mandatory for the AI request.
* **`GITHUB_PAT`** is optional but avoids “rate limit exceeded” if you’re hitting GitHub heavily.
* After editing `.env.local`, restart the Next.js server (`npm run dev`) so that `process.env` picks up the changes.

---

## 8. Putting It All Together

1. **Install & configure everything** (see Steps 1–3 above).

2. **Create `pages/api/generate-readme.js`** (Step 4).

3. **Create `pages/index.js`** (Step 5).

4. **Add Tailwind Plugins** (if you want typography) and ensure `globals.css` is imported in `_app.js`:

   ```jsx
   // pages/_app.js
   import "../styles/globals.css";

   function MyApp({ Component, pageProps }) {
     return <Component {...pageProps} />;
   }

   export default MyApp;
   ```

5. **Run `npm run dev`** and open `http://localhost:3000`.

6. Enter a GitHub username (e.g., `siyabendoezdemir`) and click “Generate README”. The app will:

   * Call your API route
   * Fetch GitHub data
   * Send it to OpenAI as a prompt
   * Return formatted Markdown
   * Show that Markdown in the browser (with live styling via Tailwind’s Typography)
   * Let you download `USERNAME-README.md`

---

## 9. Testing & Debugging

1. **No GitHub PAT configured**:

   * If you don’t supply `GITHUB_PAT` in `.env.local`, GitHub’s API will allow 60 requests/hour. For testing, you can wait or supply a PAT.
   * If you hit the rate limit, GitHub returns a `403` with a message about “API rate limit exceeded for XX.XX.XX.XXX.” Check your terminal logs from the API route.

2. **AI Errors**:

   * If your `OPENAI_API_KEY` is missing or invalid, you’ll get a 401/403 from the OpenAI call.
   * If your prompt is too big, you can reduce how many repos you pass or shorten the instructions.

3. **Styling Issues**:

   * If Markdown doesn’t style as expected, confirm you installed `@tailwindcss/typography` and included it in `tailwind.config.js`.
   * Otherwise, plain HTML will still render everything.

---

## 10. Future Enhancements

Once the MVP is working, you can add:

1. **GitHub OAuth Flow**

   * Let users sign in with GitHub.
   * If they grant `repo` scope, you can push the generated `README.md` directly into a repository (e.g., their `username/username` repo).

2. **Customizable Themes**

   * Offer “light” vs. “dark” Markdown preview (by toggling Tailwind’s color scheme).
   * Provide different prompt styles: “Professional,” “Casual,” or “Free‑form” tone (pass an extra `tone` parameter to your prompt).

3. **Caching**

   * Cache GitHub data (e.g., in-memory or Redis) to avoid repeated API calls if the same username is requested within a short window.
   * Cache AI responses (e.g., store in a simple JSON file or database) so repeated requests for the same username don’t re‑call OpenAI (saving tokens).

4. **Drag‑and‑Drop Section Ordering**

   * After generating the Markdown, let users reorder sections (e.g., About Me, Tech Stack, Top Repos) via drag‑and‑drop and regenerate. You’d need a more sophisticated parser or a React component that splits the Markdown into chunks.

5. **Badges & Shields Integration**

   * Automatically fetch custom “Top Language” badge, “Followers” badge, etc., from [shields.io](https://shields.io).
   * Let the AI decide which badges to include or allow manual selection in UI.

---

## 11. Full File Listing (for reference)

### a) `package.json` (relevant parts)

```jsonc
{
  "name": "github-readme-ai",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "axios": "^1.4.0",
    "next": "13.x.x",
    "react": "18.x.x",
    "react-dom": "18.x.x",
    "react-markdown": "^8.0.0",
    "openai": "^4.0.0"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.21",
    "tailwindcss": "^3.3.2",
    "@tailwindcss/typography": "^0.5.9"
  }
}
```

### b) `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
```

### c) `styles/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* You can add custom global styles here. */
```

### d) `pages/_app.js`

```jsx
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

### e) `pages/api/generate-readme.js`

*(As shown in section 4 above.)*

### f) `pages/index.js`

*(As shown in section 5 above.)*

---

## 12. How to Run Locally

1. **Clone (or create) the project** as shown above.
2. **Install dependencies**

   ```bash
   npm install
   ```
3. **Create `.env.local`** with:

   ```
   OPENAI_API_KEY=sk-…
   GITHUB_PAT=ghp_…   # optional
   ```
4. **Run Development Server**

   ```bash
   npm run dev
   ```

   → Open `http://localhost:3000` in your browser.
5. **Enter a GitHub username** (e.g., `siyabendoezdemir`), click “Generate README,” and watch the AI produce a polished README preview. Then download it.

---

## 13. Summary

You now have a **full-stack** Next.js project that:

1. **Accepts** a GitHub username from the user.
2. **Fetches** that user’s public data from GitHub (profile + top repos).
3. **Constructs** a clear, structured prompt and calls the OpenAI API to generate a styled `README.md`.
4. **Returns** the generated Markdown to the frontend.
5. **Renders** the Markdown live (via `react-markdown` + Tailwind’s Typography).
6. **Enables** downloading the result as a `.md` file.

Feel free to extend it—connect GitHub OAuth to push directly to their repo, add theming, caching, or drag‑and‑drop reordering. But as an MVP, the above steps give you a working, end‑to‑end AI‑powered README generator.

Good luck, and happy coding!
>>>>>>> 752a7a905cde81b77e3d70331afe7214e465f017
