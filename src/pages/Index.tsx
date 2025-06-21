
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import { Loader2, Download, Github, Star, GitFork, Users, ExternalLink } from "lucide-react";

const Index = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [generatedReadme, setGeneratedReadme] = useState("");
  const [step, setStep] = useState("input"); // input, preview, generated

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

      // Fetch user repositories
      const reposResponse = await fetch(`https://api.github.com/users/${username.trim()}/repos?per_page=100&sort=stars&direction=desc`);
      const repos = await reposResponse.json();
      const topRepos = repos.slice(0, 6).map((repo: any) => ({
        name: repo.name,
        description: repo.description || "No description available",
        html_url: repo.html_url,
        stargazers_count: repo.stargazers_count,
        language: repo.language,
        forks_count: repo.forks_count
      }));
      setRepositories(topRepos);

      // Generate AI-powered README
      await generateReadme(user, topRepos);
      
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
      // For demonstration, we'll create a template-based README
      // In a real implementation, this would call an AI API
      const languages = Array.from(new Set(repos.map(r => r.language).filter(Boolean)));
      const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
      
      const readme = `# Hi there! 👋 I'm ${user.name || user.login}

${user.bio ? `## About Me\n${user.bio}\n` : ''}

🔭 I'm currently working on exciting projects  
🌱 I'm always learning something new  
💬 Ask me about anything tech-related  
📫 How to reach me: [GitHub](${user.html_url})  
⚡ Fun fact: I have ${user.public_repos} public repositories!

## 📊 GitHub Stats

![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${user.login}&show_icons=true&theme=radical)

## 🛠️ Tech Stack

${languages.length > 0 ? languages.map(lang => `![${lang}](https://img.shields.io/badge/-${lang}-blue?style=flat-square&logo=${lang.toLowerCase()})`).join(' ') : 'Various technologies'}

## 🚀 Featured Projects

${repos.map(repo => `### [${repo.name}](${repo.html_url})
${repo.description}  
⭐ ${repo.stargazers_count} stars • 🍴 ${repo.forks_count} forks${repo.language ? ` • 📝 ${repo.language}` : ''}
`).join('\n')}

## 📈 Profile Stats

- 👥 **${user.followers}** followers
- 👤 **${user.following}** following  
- 📚 **${user.public_repos}** public repositories
- ⭐ **${totalStars}** total stars earned

## 🤝 Let's Connect!

[![GitHub](https://img.shields.io/badge/-GitHub-black?style=flat-square&logo=github)](${user.html_url})
${user.blog ? `[![Website](https://img.shields.io/badge/-Website-blue?style=flat-square&logo=globe)](${user.blog})` : ''}
${user.twitter_username ? `[![Twitter](https://img.shields.io/badge/-Twitter-1da1f2?style=flat-square&logo=twitter&logoColor=white)](https://twitter.com/${user.twitter_username})` : ''}

---
💙 Thanks for visiting my profile! Have a great day!`;

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Github className="w-10 h-10 text-purple-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              GitHub README Generator
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform any GitHub profile into a stunning README with AI-powered insights and beautiful formatting
          </p>
        </div>

        {step === "input" && (
          <Card className="max-w-2xl mx-auto shadow-xl border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Get Started</CardTitle>
              <CardDescription>
                Enter a GitHub username to generate a personalized README
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="Enter GitHub username (e.g., octocat)"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="text-lg py-6 text-center"
                    disabled={loading}
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={loading || !username.trim()}
                  className="w-full py-6 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Generating README...
                    </>
                  ) : (
                    <>
                      <Github className="w-5 h-5 mr-2" />
                      Generate README
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {step === "preview" && userData && (
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <img 
                    src={userData.avatar_url} 
                    alt={userData.login}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h2 className="text-2xl">{userData.name || userData.login}</h2>
                    <p className="text-gray-600">@{userData.login}</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {userData.bio && (
                  <p className="text-gray-700 mb-4">{userData.bio}</p>
                )}
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {userData.followers} followers
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {userData.following} following
                  </div>
                  <div className="flex items-center gap-1">
                    <Github className="w-4 h-4" />
                    {userData.public_repos} repositories
                  </div>
                  {userData.location && (
                    <div>📍 {userData.location}</div>
                  )}
                  {userData.blog && (
                    <a 
                      href={userData.blog} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-600 hover:underline"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Website
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>

            {repositories.length > 0 && (
              <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm mb-8">
                <CardHeader>
                  <CardTitle>Top Repositories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {repositories.map((repo, index) => (
                      <div key={index} className="border rounded-lg p-4 bg-white/50">
                        <div className="flex items-start justify-between mb-2">
                          <a 
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg font-semibold text-blue-600 hover:underline"
                          >
                            {repo.name}
                          </a>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Star className="w-4 h-4" />
                            {repo.stargazers_count}
                            <GitFork className="w-4 h-4" />
                            {repo.forks_count}
                          </div>
                        </div>
                        <p className="text-gray-700 mb-2">{repo.description}</p>
                        {repo.language && (
                          <Badge variant="secondary">{repo.language}</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Loader2 className="w-6 h-6 animate-spin mr-2" />
                <span>Generating your awesome README...</span>
              </div>
            </div>
          </div>
        )}

        {step === "generated" && generatedReadme && (
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Generated README Preview */}
              <Card className="flex-1 shadow-xl border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Generated README</CardTitle>
                  <div className="flex gap-2">
                    <Button onClick={downloadReadme} className="bg-green-600 hover:bg-green-700">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button onClick={resetForm} variant="outline">
                      Generate Another
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    <ReactMarkdown>{generatedReadme}</ReactMarkdown>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
