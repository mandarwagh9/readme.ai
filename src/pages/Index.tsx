
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import { Loader2, Download, Github, Star, GitFork, Users, ExternalLink, Sparkles, Code2, Zap } from "lucide-react";

const Index = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [generatedReadme, setGeneratedReadme] = useState("");
  const [step, setStep] = useState("input"); // input, preview, generated

  const fetchPinnedRepositories = async (username: string) => {
    const query = `
      query {
        user(login: "${username}") {
          pinnedItems(first: 6, types: [REPOSITORY]) {
            totalCount
            edges {
              node {
                ... on Repository {
                  name
                  description
                  url
                  stargazerCount
                  primaryLanguage {
                    name
                  }
                  forkCount
                }
              }
            }
          }
        }
      }
    `;

    try {
      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Note: This will work with GitHub's public GraphQL API for public repos
          // For better results, users should add their own GitHub token
        },
        body: JSON.stringify({ query })
      });

      if (!response.ok) {
        throw new Error('GraphQL request failed');
      }

      const data = await response.json();
      
      if (data.data && data.data.user && data.data.user.pinnedItems) {
        return data.data.user.pinnedItems.edges.map((edge: any) => ({
          name: edge.node.name,
          description: edge.node.description || "No description available",
          html_url: edge.node.url,
          stargazers_count: edge.node.stargazerCount,
          language: edge.node.primaryLanguage?.name,
          forks_count: edge.node.forkCount
        }));
      }
      
      return [];
    } catch (error) {
      console.error("Error fetching pinned repositories:", error);
      // Fallback to regular repos if pinned repos fetch fails
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      toast.error("Please enter a GitHub username");
      return;
    }

    setLoading(true);
    setStep("preview");
    
    try {
      // Fetch GitHub user data
      const userResponse = await fetch(`https://api.github.com/users/${username.trim()}`);
      if (!userResponse.ok) {
        throw new Error("User not found");
      }
      const user = await userResponse.json();
      setUserData(user);

      // First try to fetch pinned repositories
      let repos = await fetchPinnedRepositories(username.trim());
      
      // If no pinned repos or fetch failed, fallback to top starred repos
      if (!repos || repos.length === 0) {
        console.log("No pinned repositories found, falling back to top starred repos");
        const reposResponse = await fetch(`https://api.github.com/users/${username.trim()}/repos?per_page=100&sort=stars&direction=desc`);
        const fallbackRepos = await reposResponse.json();
        repos = fallbackRepos.slice(0, 6).map((repo: any) => ({
          name: repo.name,
          description: repo.description || "No description available",
          html_url: repo.html_url,
          stargazers_count: repo.stargazers_count,
          language: repo.language,
          forks_count: repo.forks_count
        }));
      }
      
      setRepositories(repos);

      // Generate AI-powered README
      await generateReadme(user, repos);
      
    } catch (error) {
      console.error("Error fetching GitHub data:", error);
      toast.error("Failed to fetch GitHub data. Please check the username and try again.");
      setStep("input");
    } finally {
      setLoading(false);
    }
  };

  const generateReadme = async (user: any, repos: any[]) => {
    try {
      const languages = Array.from(new Set(repos.map(r => r.language).filter(Boolean)));
      const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
      
      const readme = `# Hi there, I'm ${user.name || user.login}! 👋

<div align="center">
  <img src="${user.avatar_url}" alt="${user.login}" width="200" height="200" style="border-radius: 50%; border: 4px solid #000000;" />
</div>

## 🚀 About Me

${user.bio ? `> ${user.bio}` : '> Passionate developer building amazing things with code!'}

- 🔭 I'm currently working on **exciting projects**
- 🌱 I'm always **learning and growing** in technology
- 👯 I'm looking to **collaborate** on innovative ideas
- 💬 Ask me about **${languages.slice(0, 3).join(', ')}**
- 📫 How to reach me: **[@${user.login}](https://github.com/${user.login})**
- ⚡ Fun fact: **I have ${user.public_repos} public repositories with ${totalStars} total stars!**

## 🛠️ Tech Stack & Tools

<div align="center">

${languages.map(lang => {
  const badges = {
    'JavaScript': '![JavaScript](https://img.shields.io/badge/JavaScript-000000?style=for-the-badge&logo=javascript&logoColor=white)',
    'TypeScript': '![TypeScript](https://img.shields.io/badge/TypeScript-000000?style=for-the-badge&logo=typescript&logoColor=white)',
    'Python': '![Python](https://img.shields.io/badge/Python-000000?style=for-the-badge&logo=python&logoColor=white)',
    'Java': '![Java](https://img.shields.io/badge/Java-000000?style=for-the-badge&logo=java&logoColor=white)',
    'React': '![React](https://img.shields.io/badge/React-000000?style=for-the-badge&logo=react&logoColor=white)',
    'Node.js': '![Node.js](https://img.shields.io/badge/Node.js-000000?style=for-the-badge&logo=node.js&logoColor=white)',
    'HTML': '![HTML5](https://img.shields.io/badge/HTML5-000000?style=for-the-badge&logo=html5&logoColor=white)',
    'CSS': '![CSS3](https://img.shields.io/badge/CSS3-000000?style=for-the-badge&logo=css3&logoColor=white)',
    'Go': '![Go](https://img.shields.io/badge/Go-000000?style=for-the-badge&logo=go&logoColor=white)',
    'Rust': '![Rust](https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=white)',
    'C++': '![C++](https://img.shields.io/badge/C%2B%2B-000000?style=for-the-badge&logo=c%2B%2B&logoColor=white)',
    'C': '![C](https://img.shields.io/badge/C-000000?style=for-the-badge&logo=c&logoColor=white)',
    'PHP': '![PHP](https://img.shields.io/badge/PHP-000000?style=for-the-badge&logo=php&logoColor=white)',
    'Ruby': '![Ruby](https://img.shields.io/badge/Ruby-000000?style=for-the-badge&logo=ruby&logoColor=white)',
    'Swift': '![Swift](https://img.shields.io/badge/Swift-000000?style=for-the-badge&logo=swift&logoColor=white)',
    'Kotlin': '![Kotlin](https://img.shields.io/badge/Kotlin-000000?style=for-the-badge&logo=kotlin&logoColor=white)',
    'Dart': '![Dart](https://img.shields.io/badge/Dart-000000?style=for-the-badge&logo=dart&logoColor=white)',
    'Shell': '![Shell Script](https://img.shields.io/badge/Shell_Script-000000?style=for-the-badge&logo=gnu-bash&logoColor=white)',
    'Dockerfile': '![Docker](https://img.shields.io/badge/Docker-000000?style=for-the-badge&logo=docker&logoColor=white)',
  };
  return badges[lang] || `![${lang}](https://img.shields.io/badge/${lang}-000000?style=for-the-badge&logo=${lang.toLowerCase()}&logoColor=white)`;
}).join('\n')}

</div>

## 📊 GitHub Statistics

<div align="center">
  <img height="180em" src="https://github-readme-stats.vercel.app/api?username=${user.login}&show_icons=true&theme=dark&include_all_commits=true&count_private=true&hide_border=true&bg_color=000000&text_color=ffffff&icon_color=ffffff&title_color=ffffff"/>
  <img height="180em" src="https://github-readme-stats.vercel.app/api/top-langs/?username=${user.login}&layout=compact&langs_count=8&theme=dark&hide_border=true&bg_color=000000&text_color=ffffff&title_color=ffffff"/>
</div>

<div align="center">
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=${user.login}&theme=dark&hide_border=true&background=000000&stroke=ffffff&ring=ffffff&fire=ffffff&currStreakNum=ffffff&sideNums=ffffff&currStreakLabel=ffffff&sideLabels=ffffff&dates=ffffff" alt="GitHub Streak" />
</div>

<div align="center">
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=${user.login}&theme=high-contrast&hide_border=true&bg_color=000000&color=ffffff&line=ffffff&point=ffffff" alt="GitHub Activity Graph" />
</div>

## 🏆 Featured Projects

${repos.map(repo => `### 🎯 [${repo.name}](${repo.html_url})

> ${repo.description}

<div align="left">
  
![Stars](https://img.shields.io/github/stars/${user.login}/${repo.name}?style=social) 
![Forks](https://img.shields.io/github/forks/${user.login}/${repo.name}?style=social) 
${repo.language ? `![Language](https://img.shields.io/badge/Language-${repo.language}-000000?style=flat-square&logoColor=white)` : ''}

</div>`).join('\n\n---\n\n')}

## 📈 Profile Statistics

<div align="center">

![Profile Views](https://komarev.com/ghpvc/?username=${user.login}&label=Profile%20views&color=000000&style=flat)
![GitHub followers](https://img.shields.io/github/followers/${user.login}?label=Followers&style=social)
![GitHub User's stars](https://img.shields.io/github/stars/${user.login}?label=Stars&style=social)

</div>

## 🤝 Let's Connect!

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-000000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/${user.login})
${user.blog ? `[![Website](https://img.shields.io/badge/Website-000000?style=for-the-badge&logo=Firefox-Browser&logoColor=white)](${user.blog})` : ''}
${user.twitter_username ? `[![Twitter](https://img.shields.io/badge/Twitter-000000?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/${user.twitter_username})` : ''}

</div>

---

<div align="center">

### 💭 Random Dev Quote
![](https://quotes-github-readme.vercel.app/api?type=horizontal&theme=dark&bg_color=000000&text_color=ffffff)

**⭐ Star some repositories if you find them interesting!**

*Made with ❤️ and lots of ☕*

</div>`;

      setGeneratedReadme(readme);
      setStep("generated");
      toast.success("README generated successfully!");
      
    } catch (error) {
      console.error("Error generating README:", error);
      toast.error("Failed to generate README");
    }
  };

  const downloadReadme = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedReadme], { type: "text/markdown" });
    element.href = URL.createObjectURL(file);
    element.download = `${username}-README.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("README downloaded successfully!");
  };

  const resetForm = () => {
    setStep("input");
    setUsername("");
    setUserData(null);
    setRepositories([]);
    setGeneratedReadme("");
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Minimalist background pattern */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-50"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-3 bg-white rounded-2xl">
              <Github className="w-8 h-8 text-black" />
            </div>
            <h1 className="text-5xl font-bold text-white">
              README Generator
            </h1>
            <div className="p-3 bg-white rounded-2xl">
              <Sparkles className="w-8 h-8 text-black" />
            </div>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Transform any GitHub profile into a <span className="text-white font-semibold">stunning README</span> with 
            AI-powered insights and <span className="text-white font-semibold">beautiful formatting</span>
          </p>
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2 text-gray-400">
              <Zap className="w-5 h-5 text-white" />
              <span>Lightning Fast</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Code2 className="w-5 h-5 text-white" />
              <span>AI Powered</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Star className="w-5 h-5 text-white" />
              <span>Modern Design</span>
            </div>
          </div>
        </div>

        {step === "input" && (
          <Card className="max-w-2xl mx-auto shadow-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl text-white">Get Started</CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                Enter a GitHub username to generate a personalized README
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-3">
                  <Input
                    type="text"
                    placeholder="Enter GitHub username (e.g., octocat)"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="text-lg py-6 text-center bg-black/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-white focus:ring-white"
                    disabled={loading}
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={loading || !username.trim()}
                  className="w-full py-6 text-lg bg-white text-black hover:bg-gray-200 shadow-lg transition-all duration-300"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Generating README...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate README
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {step === "preview" && userData && (
          <div className="max-w-6xl mx-auto">
            <Card className="shadow-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-xl mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-4 text-white">
                  <img 
                    src={userData.avatar_url} 
                    alt={userData.login}
                    className="w-16 h-16 rounded-full ring-4 ring-white/50"
                  />
                  <div>
                    <h2 className="text-3xl">{userData.name || userData.login}</h2>
                    <p className="text-gray-300 text-lg">@{userData.login}</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {userData.bio && (
                  <p className="text-gray-300 mb-6 text-lg">{userData.bio}</p>
                )}
                <div className="flex flex-wrap gap-6 text-gray-300">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-white" />
                    <span className="font-semibold">{userData.followers}</span> followers
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-white" />
                    <span className="font-semibold">{userData.following}</span> following
                  </div>
                  <div className="flex items-center gap-2">
                    <Github className="w-5 h-5 text-white" />
                    <span className="font-semibold">{userData.public_repos}</span> repositories
                  </div>
                  {userData.location && (
                    <div className="flex items-center gap-2">
                      <span>📍</span> {userData.location}
                    </div>
                  )}
                  {userData.blog && (
                    <a 
                      href={userData.blog} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Website
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>

            {repositories.length > 0 && (
              <Card className="shadow-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-xl mb-8">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">Pinned Repositories</CardTitle>
                  <CardDescription className="text-gray-400">
                    {repositories.length > 0 ? "Showcasing pinned projects from the user's profile" : "Top repositories by stars"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {repositories.map((repo, index) => (
                      <div key={index} className="border border-gray-700 rounded-xl p-6 bg-black/30 hover:bg-black/50 transition-all duration-300">
                        <div className="flex items-start justify-between mb-3">
                          <a 
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xl font-semibold text-white hover:text-gray-300 transition-colors"
                          >
                            {repo.name}
                          </a>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-white" />
                              {repo.stargazers_count}
                            </div>
                            <div className="flex items-center gap-1">
                              <GitFork className="w-4 h-4 text-white" />
                              {repo.forks_count}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-300 mb-3 leading-relaxed">{repo.description}</p>
                        {repo.language && (
                          <Badge variant="secondary" className="bg-white/20 text-white border-gray-700">
                            {repo.language}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <Loader2 className="w-8 h-8 animate-spin mr-3 text-white" />
                <span className="text-xl text-white">Crafting your awesome README...</span>
              </div>
            </div>
          </div>
        )}

        {step === "generated" && generatedReadme && (
          <div className="max-w-7xl mx-auto">
            <Card className="shadow-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-3xl text-white">Your Generated README</CardTitle>
                <div className="flex gap-3">
                  <Button onClick={downloadReadme} className="bg-white text-black hover:bg-gray-200 shadow-lg">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button onClick={resetForm} variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                    Generate Another
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose prose-invert prose-lg max-w-none bg-black/80 rounded-xl p-8 border border-gray-800 overflow-auto">
                  <ReactMarkdown 
                    components={{
                      img: ({ node, ...props }) => (
                        <img 
                          {...props} 
                          style={{ maxWidth: '100%', height: 'auto' }}
                          className="rounded-lg shadow-lg"
                        />
                      ),
                      h1: ({ node, ...props }) => (
                        <h1 {...props} className="text-4xl font-bold text-center mb-8 text-white" />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2 {...props} className="text-2xl font-semibold mt-8 mb-4 text-white" />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3 {...props} className="text-xl font-semibold mt-6 mb-3 text-gray-300" />
                      ),
                      a: ({ node, ...props }) => (
                        <a {...props} className="text-white hover:text-gray-300 transition-colors" target="_blank" rel="noopener noreferrer" />
                      ),
                      blockquote: ({ node, ...props }) => (
                        <blockquote {...props} className="border-l-4 border-white pl-4 italic text-gray-300 bg-gray-800/50 rounded-r-lg p-4" />
                      ),
                      code: ({ node, ...props }) => (
                        <code {...props} className="bg-gray-800 text-white px-2 py-1 rounded text-sm" />
                      )
                    }}
                  >
                    {generatedReadme}
                  </ReactMarkdown>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
