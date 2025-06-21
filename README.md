
# 🤖 readme.ai

An AI-powered CLI tool that **automatically generates polished README.md files** for any codebase—just provide your GitHub repo URL and let AI handle the rest.

---

## 🚀 Features

- **🌐 Source from Any Repository**: Input a GitHub (or local) repo link/path.
- **📄 Generate**: AI powers the creation of structured README sections—**Intro**, **Installation**, **Usage**, **Features**, **Technology Stack**, and more.
- **✨ Customizable Output**: Select header styles, badge colors, emojis, navigation formats, and logos.
- **🧠 Model Flexible**: Works with OpenAI, Anthropic, Gemini, Ollama—or even fully offline!
- **🛠 Developer Friendly**: Supports YAML/CLI flags for advanced customization presets.
- **💼 Documentation Ready**: Use for open-source, APIs, libraries, and rapid prototyping.

---

## 🛠 Quick Start

### Prerequisites

- Node.js or Python environment
- AI credentials (OpenAI, Anthropic, Gemini, or local LLM)
- Optional: GitHub CLI/token for repo access

---

### 🔧 Installation

```bash
# Clone the repo
git clone https://github.com/mandarwagh9/readme.ai.git
cd readme.ai

# Optionally set up a virtual environment for Python
python -m venv venv
source venv/bin/activate

# Install dependencies
npm install      # if Node.js-based
# or
pip install -r requirements.txt
````

### ⚙️ Usage (CLI)

# Generate README from remote GitHub repo
readmeai --repo https://github.com/user/my-cool-project

# Example with styling options
readmeai \
  --repo . \
  --header-style modern \
  --badge-color 00ADD8 \
  --badge-style flat-square \
  --emojis on \
  --logo custom

# Use alternative AI backend
readmeai --repo . --model ollama


*You can also configure profile options with flags or a YAML/JSON file.*

---

## 🎨 Customization Options

| Option           | Description                                     | Example                 |
| ---------------- | ----------------------------------------------- | ----------------------- |
| `--header-style` | Choose header format (classic/modern/compact)   | `modern`                |
| `--badge-style`  | Badge design style (flat-square/for-the-badge)  | `flat-square`           |
| `--badge-color`  | Hex color for badges                            | `FF4B4B`                |
| `--emojis`       | Toggle emojis on/off                            | `on` / `off`            |
| `--logo`         | Use built-in or custom logos                    | `default`, `custom.svg` |
| `--model`        | LLM backend (openai, anthropic, ollama, gemini) | `openai`                |

---

## 🏛️ Architecture

```
┌────────────┐     ┌──────────────┐     ┌────────────┐
│ Repo URL —─▶ CLI Tool parses input ──▶ Repo Analyzer
│  or Path   └───────────────────────┴─▶ Metadata + Code Summary
└──────────────────────────────────────────────────────▶ AI Backend (OpenAI/Gemini/Others)
                                                     └─ Generates README.md
```

---

## ✅ Use Cases

* **Open Source Bootstrapping**: Quickly generate high-quality docs for public repos.
* **API Projects**: Automatically include usage instructions and endpoint details.
* **Prototyping**: Documentation stays up-to-date with minimal manual effort.
* **Team Templates**: Standardize docs across your organization with consistent badges and layout.

---

## ⚡ Contribute

1. Fork and clone this repo
2. Create your feature branch:

   ```bash
   git checkout -b feature/my-awesome-option
   ```
3. Develop and test your feature
4. Commit your changes:

   ```bash
   git commit -m "feat: add support for XYZ"
   ```
5. Push and create a PR — maintainers will review and merge!

---

## 📄 License

Licensed under the **MIT License**—see `LICENSE` for details.

---

## ❤️ Acknowledgements

* Inspired by **eli64s/readme‑ai**, delivering flexible README generation with CLI and LLM support ([github.com][1], [yeschat.ai][2], [github.com][3], [github.com][4], [github.com][5])
* Community discussion on Reddit highlights value of auto-generation tools&#x20;
* Docker blog features AI-driven README tools similar to this&#x20;

---

### 🔚 Final Note

Automate your documentation workflow effortlessly. Just run `readmeai` and get a polished, ready-to-use `README.md`—no manual writing required.

---

