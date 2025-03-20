
import { useState } from "react";
import { Trophy, Medal, Search, Filter, ArrowUp, ArrowDown, Star, Users, Calendar, ChevronsUpDown, Crown, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Container from "@/components/ui/Container";
import { useLanguage } from "@/contexts/LanguageContext";

// Mock global leaderboard data
const globalLeaderboardData = [
  {
    rank: 1,
    team: {
      id: "team1",
      name: "CodeCrafters",
      logo: "https://ui-avatars.com/api/?name=CC&background=0088cc&color=fff",
      members: 3,
    },
    totalScore: 92.5,
    hackathonsParticipated: 4,
    wins: 2,
    highlights: [
      {
        hackathon: "AI Innovation Challenge",
        placement: "1st Place",
      },
      {
        hackathon: "Web3 Builders Hackathon",
        placement: "2nd Place",
      },
    ],
  },
  {
    rank: 2,
    team: {
      id: "team2",
      name: "Innovators Inc.",
      logo: "https://ui-avatars.com/api/?name=II&background=4CAF50&color=fff",
      members: 4,
    },
    totalScore: 88.0,
    hackathonsParticipated: 5,
    wins: 1,
    highlights: [
      {
        hackathon: "Mobile App Challenge",
        placement: "1st Place",
      },
    ],
  },
  {
    rank: 3,
    team: {
      id: "team3",
      name: "Tech Titans",
      logo: "https://ui-avatars.com/api/?name=TT&background=F44336&color=fff",
      members: 2,
    },
    totalScore: 85.2,
    hackathonsParticipated: 3,
    wins: 1,
    highlights: [
      {
        hackathon: "Cybersecurity Hackathon",
        placement: "1st Place",
      },
    ],
  },
  {
    rank: 4,
    team: {
      id: "team4",
      name: "Digital Dynamos",
      logo: "https://ui-avatars.com/api/?name=DD&background=9C27B0&color=fff",
      members: 5,
    },
    totalScore: 82.7,
    hackathonsParticipated: 4,
    wins: 0,
    highlights: [],
  },
  {
    rank: 5,
    team: {
      id: "team5",
      name: "Code Wizards",
      logo: "https://ui-avatars.com/api/?name=CW&background=3F51B5&color=fff",
      members: 3,
    },
    totalScore: 79.1,
    hackathonsParticipated: 2,
    wins: 0,
    highlights: [],
  },
  {
    rank: 6,
    team: {
      id: "team6",
      name: "Byte Builders",
      logo: "https://ui-avatars.com/api/?name=BB&background=673AB7&color=fff",
      members: 4,
    },
    totalScore: 76.5,
    hackathonsParticipated: 3,
    wins: 0,
    highlights: [],
  },
  {
    rank: 7,
    team: {
      id: "team7",
      name: "Pixel Pioneers",
      logo: "https://ui-avatars.com/api/?name=PP&background=E91E63&color=fff",
      members: 2,
    },
    totalScore: 73.9,
    hackathonsParticipated: 4,
    wins: 0,
    highlights: [],
  },
  {
    rank: 8,
    team: {
      id: "team8",
      name: "Data Dragons",
      logo: "https://ui-avatars.com/api/?name=DA&background=00BCD4&color=fff",
      members: 5,
    },
    totalScore: 71.3,
    hackathonsParticipated: 2,
    wins: 0,
    highlights: [],
  },
  {
    rank: 9,
    team: {
      id: "team9",
      name: "Logic Legends",
      logo: "https://ui-avatars.com/api/?name=LL&background=8BC34A&color=fff",
      members: 3,
    },
    totalScore: 68.7,
    hackathonsParticipated: 3,
    wins: 0,
    highlights: [],
  },
  {
    rank: 10,
    team: {
      id: "team10",
      name: "Syntax Savants",
      logo: "https://ui-avatars.com/api/?name=SS&background=FF9800&color=fff",
      members: 4,
    },
    totalScore: 66.1,
    hackathonsParticipated: 4,
    wins: 0,
    highlights: [],
  },
];

// Mock hackathon leaderboards
const hackathonLeaderboards = [
  {
    id: "1",
    name: "AI Innovation Challenge",
    date: "June 15-18, 2024",
    teams: [
      {
        team: {
          id: "team1",
          name: "CodeCrafters",
          logo: "https://ui-avatars.com/api/?name=CC&background=0088cc&color=fff",
        },
        score: 92.5,
      },
      {
        team: {
          id: "team4",
          name: "Digital Dynamos",
          logo: "https://ui-avatars.com/api/?name=DD&background=9C27B0&color=fff",
        },
        score: 82.7,
      },
      {
        team: {
          id: "team5",
          name: "Code Wizards",
          logo: "https://ui-avatars.com/api/?name=CW&background=3F51B5&color=fff",
        },
        score: 79.1,
      },
      {
        team: {
          id: "team8",
          name: "Data Dragons",
          logo: "https://ui-avatars.com/api/?name=DA&background=00BCD4&color=fff",
        },
        score: 71.3,
      },
    ],
  },
  {
    id: "2",
    name: "Web3 Builders Hackathon",
    date: "July 22-25, 2024",
    teams: [
      {
        team: {
          id: "team2",
          name: "Innovators Inc.",
          logo: "https://ui-avatars.com/api/?name=II&background=4CAF50&color=fff",
        },
        score: 88.0,
      },
      {
        team: {
          id: "team3",
          name: "Tech Titans",
          logo: "https://ui-avatars.com/api/?name=TT&background=F44336&color=fff",
        },
        score: 85.2,
      },
      {
        team: {
          id: "team6",
          name: "Byte Builders",
          logo: "https://ui-avatars.com/api/?name=BB&background=673AB7&color=fff",
        },
        score: 76.5,
      },
      {
        team: {
          id: "team9",
          name: "Logic Legends",
          logo: "https://ui-avatars.com/api/?name=LL&background=8BC34A&color=fff",
        },
        score: 68.7,
      },
    ],
  },
  {
    id: "3",
    name: "Mobile App Challenge",
    date: "August 5-8, 2024",
    teams: [
      {
        team: {
          id: "team1",
          name: "CodeCrafters",
          logo: "https://ui-avatars.com/api/?name=CC&background=0088cc&color=fff",
        },
        score: 90.1,
      },
      {
        team: {
          id: "team2",
          name: "Innovators Inc.",
          logo: "https://ui-avatars.com/api/?name=II&background=4CAF50&color=fff",
        },
        score: 85.5,
      },
      {
        team: {
          id: "team7",
          name: "Pixel Pioneers",
          logo: "https://ui-avatars.com/api/?name=PP&background=E91E63&color=fff",
        },
        score: 73.9,
      },
      {
        team: {
          id: "team10",
          name: "Syntax Savants",
          logo: "https://ui-avatars.com/api/?name=SS&background=FF9800&color=fff",
        },
        score: 66.1,
      },
    ],
  },
];

const Leaderboard = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHackathon, setSelectedHackathon] = useState(hackathonLeaderboards[0]);
  const [sortBy, setSortBy] = useState("rank");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);
  
  // Sorting function
  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };
  
  // Filter global leaderboard data
  const filteredGlobalData = globalLeaderboardData.filter((item) =>
    item.team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Sort global leaderboard data
  const sortedGlobalData = [...filteredGlobalData].sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case "rank":
        comparison = a.rank - b.rank;
        break;
      case "team":
        comparison = a.team.name.localeCompare(b.team.name);
        break;
      case "score":
        comparison = a.totalScore - b.totalScore;
        break;
      case "hackathons":
        comparison = a.hackathonsParticipated - b.hackathonsParticipated;
        break;
      case "wins":
        comparison = a.wins - b.wins;
        break;
      default:
        comparison = 0;
    }
    return sortDirection === "asc" ? comparison : -comparison;
  });
  
  const toggleExpandTeam = (teamId: string) => {
    setExpandedTeam(expandedTeam === teamId ? null : teamId);
  };
  
  return (
    <Container>
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">{t("leaderboard.title") || "Leaderboard"}</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t("leaderboard.description") || "Discover the top-performing teams across all hackathons on our platform. Rise to the challenge and see your team name in lights."}
        </p>
      </div>
      
      <div className="premium-card rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent z-0"></div>
        
        <Tabs defaultValue="global" className="w-full relative z-10">
          <div className="p-6 md:p-8 border-b border-border/30">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <TabsList className="bg-background/50 dark:bg-card/50 backdrop-blur-md border border-border/30 p-1 rounded-full">
                <TabsTrigger value="global" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">
                  {t("leaderboard.global") || "Global Ranking"}
                </TabsTrigger>
                <TabsTrigger value="hackathon" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">
                  {t("leaderboard.hackathon") || "Hackathon Results"}
                </TabsTrigger>
              </TabsList>
              
              <div className="flex">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={t("leaderboard.search") || "Search teams..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 rounded-full bg-background/50 dark:bg-card/50 backdrop-blur-sm border-border/30"
                  />
                </div>
                
                <Button 
                  variant="outline" 
                  size="icon"
                  className="ml-2 rounded-full bg-background/50 dark:bg-card/50 backdrop-blur-sm border-border/30"
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Global Leaderboard Tab */}
          <TabsContent value="global" className="animate-fade-in">
            <div className="p-6 md:p-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm border-b border-border/30">
                      <th className="px-4 py-3 font-medium w-16">
                        <button
                          onClick={() => handleSort("rank")}
                          className="flex items-center text-primary"
                        >
                          {t("leaderboard.rank") || "Rank"}
                          {sortBy === "rank" ? (
                            sortDirection === "asc" ? (
                              <ArrowUp className="h-3 w-3 ml-1" />
                            ) : (
                              <ArrowDown className="h-3 w-3 ml-1" />
                            )
                          ) : (
                            <ChevronsUpDown className="h-3 w-3 ml-1 opacity-50" />
                          )}
                        </button>
                      </th>
                      <th className="px-4 py-3 font-medium">
                        <button
                          onClick={() => handleSort("team")}
                          className="flex items-center text-primary"
                        >
                          {t("leaderboard.team") || "Team"}
                          {sortBy === "team" ? (
                            sortDirection === "asc" ? (
                              <ArrowUp className="h-3 w-3 ml-1" />
                            ) : (
                              <ArrowDown className="h-3 w-3 ml-1" />
                            )
                          ) : (
                            <ChevronsUpDown className="h-3 w-3 ml-1 opacity-50" />
                          )}
                        </button>
                      </th>
                      <th className="px-4 py-3 font-medium text-right">
                        <button
                          onClick={() => handleSort("score")}
                          className="flex items-center justify-end text-primary ml-auto"
                        >
                          {t("leaderboard.score") || "Total Score"}
                          {sortBy === "score" ? (
                            sortDirection === "asc" ? (
                              <ArrowUp className="h-3 w-3 ml-1" />
                            ) : (
                              <ArrowDown className="h-3 w-3 ml-1" />
                            )
                          ) : (
                            <ChevronsUpDown className="h-3 w-3 ml-1 opacity-50" />
                          )}
                        </button>
                      </th>
                      <th className="px-4 py-3 font-medium text-right hidden md:table-cell">
                        <button
                          onClick={() => handleSort("hackathons")}
                          className="flex items-center justify-end text-primary ml-auto"
                        >
                          {t("leaderboard.hackathons") || "Hackathons"}
                          {sortBy === "hackathons" ? (
                            sortDirection === "asc" ? (
                              <ArrowUp className="h-3 w-3 ml-1" />
                            ) : (
                              <ArrowDown className="h-3 w-3 ml-1" />
                            )
                          ) : (
                            <ChevronsUpDown className="h-3 w-3 ml-1 opacity-50" />
                          )}
                        </button>
                      </th>
                      <th className="px-4 py-3 font-medium text-right hidden md:table-cell">
                        <button
                          onClick={() => handleSort("wins")}
                          className="flex items-center justify-end text-primary ml-auto"
                        >
                          {t("leaderboard.wins") || "Wins"}
                          {sortBy === "wins" ? (
                            sortDirection === "asc" ? (
                              <ArrowUp className="h-3 w-3 ml-1" />
                            ) : (
                              <ArrowDown className="h-3 w-3 ml-1" />
                            )
                          ) : (
                            <ChevronsUpDown className="h-3 w-3 ml-1 opacity-50" />
                          )}
                        </button>
                      </th>
                      <th className="px-4 py-3 font-medium text-right w-20"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedGlobalData.length > 0 ? (
                      sortedGlobalData.map((item) => (
                        <>
                          <tr
                            key={item.team.id}
                            className={`border-b border-border/30 transition-colors ${
                              expandedTeam === item.team.id ? "bg-muted/10" : ""
                            } hover:bg-muted/5`}
                          >
                            <td className="px-4 py-4">
                              <div className="flex items-center">
                                {item.rank === 1 && (
                                  <div className="w-10 h-10 flex items-center justify-center">
                                    <div className="relative">
                                      <Crown className="h-6 w-6 text-amber-500" />
                                      <div className="absolute inset-0 animate-pulse opacity-75">
                                        <Crown className="h-6 w-6 text-amber-500" />
                                      </div>
                                    </div>
                                  </div>
                                )}
                                {item.rank === 2 && (
                                  <div className="w-10 h-10 flex items-center justify-center">
                                    <Medal className="h-6 w-6 text-slate-400" />
                                  </div>
                                )}
                                {item.rank === 3 && (
                                  <div className="w-10 h-10 flex items-center justify-center">
                                    <Medal className="h-6 w-6 text-amber-700" />
                                  </div>
                                )}
                                {item.rank > 3 && (
                                  <div className="w-10 h-10 flex items-center justify-center">
                                    <span className="text-xl font-medium">{item.rank}</span>
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex items-center">
                                <div className="w-12 h-12 rounded-xl overflow-hidden bg-muted mr-3 shadow-sm">
                                  <img
                                    src={item.team.logo}
                                    alt={item.team.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="font-medium">{item.team.name}</p>
                                  <div className="flex items-center text-xs text-muted-foreground">
                                    <Users className="h-3 w-3 mr-1" />
                                    <span>{item.team.members} members</span>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-right">
                              <div className="flex items-center justify-end">
                                <Star className="h-4 w-4 text-amber-500 mr-2" />
                                <span className="font-medium text-lg">{item.totalScore.toFixed(1)}</span>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-right hidden md:table-cell">
                              <span>{item.hackathonsParticipated}</span>
                            </td>
                            <td className="px-4 py-4 text-right hidden md:table-cell">
                              <div className="flex items-center justify-end">
                                <Trophy className="h-4 w-4 text-primary mr-2" />
                                <span>{item.wins}</span>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleExpandTeam(item.team.id)}
                                className="rounded-full text-primary hover:text-primary hover:bg-primary/10"
                              >
                                {expandedTeam === item.team.id ? (
                                  t("leaderboard.hide") || "Hide"
                                ) : (
                                  t("leaderboard.details") || "Details"
                                )}
                              </Button>
                            </td>
                          </tr>
                          {expandedTeam === item.team.id && (
                            <tr className="bg-muted/5">
                              <td colSpan={6} className="px-4 py-4">
                                <div className="pl-12">
                                  <h4 className="font-medium mb-3 text-primary">
                                    {t("leaderboard.highlights") || "Highlights"}
                                  </h4>
                                  {item.highlights.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                      {item.highlights.map((highlight, idx) => (
                                        <div
                                          key={idx}
                                          className="flex items-center justify-between bg-muted/10 p-3 rounded-xl border border-border/30"
                                        >
                                          <div className="flex items-center">
                                            <Award className="h-4 w-4 text-primary mr-2" />
                                            <span>{highlight.hackathon}</span>
                                          </div>
                                          <span className="text-primary font-medium">
                                            {highlight.placement}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="text-sm text-muted-foreground bg-muted/10 p-3 rounded-xl border border-border/30">
                                      {t("leaderboard.noHighlights") || "No highlights available for this team."}
                                    </p>
                                  )}
                                </div>
                              </td>
                            </tr>
                          )}
                        </>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-4 py-12 text-center">
                          <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-30" />
                          <p className="text-muted-foreground">
                            {t("leaderboard.noTeams") || "No teams found matching your search."}
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          
          {/* Hackathon Results Tab */}
          <TabsContent value="hackathon" className="animate-fade-in">
            <div className="p-6 md:p-8">
              <div className="mb-8">
                <label className="block text-sm font-medium mb-3 text-primary">
                  {t("leaderboard.selectHackathon") || "Select Hackathon"}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {hackathonLeaderboards.map((hackathon) => (
                    <button
                      key={hackathon.id}
                      onClick={() => setSelectedHackathon(hackathon)}
                      className={`flex items-center p-4 rounded-xl transition-all duration-300 ${
                        selectedHackathon.id === hackathon.id
                          ? "bg-primary text-primary-foreground shadow-glow"
                          : "bg-muted/10 hover:bg-muted/20 border border-border/30"
                      }`}
                    >
                      <div className="mr-3">
                        <Trophy className="h-5 w-5" />
                      </div>
                      
                      <div className="text-left">
                        <p className="font-medium text-sm">{hackathon.name}</p>
                        <p className="text-xs opacity-80">{hackathon.date}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center mb-6">
                <h3 className="text-xl font-medium text-primary">{selectedHackathon.name}</h3>
                <div className="ml-3 px-3 py-1 rounded-full text-sm bg-muted/20 border border-border/30">
                  <Calendar className="h-4 w-4 inline-block mr-1 align-text-bottom" />
                  <span>{selectedHackathon.date}</span>
                </div>
              </div>
              
              {/* Podium for top 3 teams */}
              <div className="mb-12 hidden md:flex items-end justify-center">
                {selectedHackathon.teams.slice(0, 3).map((team, index) => {
                  const podiumHeights = ["h-28", "h-36", "h-20"];
                  const podiumOrder = [1, 0, 2]; // 2nd place, 1st place, 3rd place
                  const orderedIndex = podiumOrder[index];
                  const teamData = selectedHackathon.teams[orderedIndex];
                  
                  return (
                    <div key={teamData.team.id} className="flex flex-col items-center mx-6">
                      <div className="relative mb-3">
                        <div className="w-16 h-16 rounded-xl overflow-hidden">
                          <img
                            src={teamData.team.logo}
                            alt={teamData.team.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {orderedIndex === 0 && (
                          <div className="absolute -top-3 -right-3">
                            <Crown className="h-6 w-6 text-amber-500" />
                          </div>
                        )}
                      </div>
                      <div className="text-center mb-3">
                        <p className="font-medium">{teamData.team.name}</p>
                        <p className="text-lg font-bold text-primary">
                          {teamData.score.toFixed(1)}
                        </p>
                      </div>
                      <div className={`${podiumHeights[index]} w-32 rounded-t-lg bg-gradient-to-t ${
                        orderedIndex === 0 
                          ? "from-amber-500/90 to-amber-300/90 shadow-glow"
                          : orderedIndex === 1 
                            ? "from-slate-400/90 to-slate-300/90"
                            : "from-amber-700/90 to-amber-600/90"
                      }`}>
                        <div className="flex items-center justify-center h-12 text-2xl font-bold text-white">
                          {orderedIndex + 1}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm border-b border-border/30">
                      <th className="px-4 py-3 font-medium w-16">
                        {t("leaderboard.rank") || "Rank"}
                      </th>
                      <th className="px-4 py-3 font-medium">
                        {t("leaderboard.team") || "Team"}
                      </th>
                      <th className="px-4 py-3 font-medium text-right">
                        {t("leaderboard.score") || "Score"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedHackathon.teams.map((team, index) => (
                      <tr key={team.team.id} className="border-b border-border/30">
                        <td className="px-4 py-4">
                          <div className="flex items-center">
                            {index === 0 && (
                              <div className="w-10 h-10 flex items-center justify-center">
                                <Crown className="h-6 w-6 text-amber-500" />
                              </div>
                            )}
                            {index === 1 && (
                              <div className="w-10 h-10 flex items-center justify-center">
                                <Medal className="h-6 w-6 text-slate-400" />
                              </div>
                            )}
                            {index === 2 && (
                              <div className="w-10 h-10 flex items-center justify-center">
                                <Medal className="h-6 w-6 text-amber-700" />
                              </div>
                            )}
                            {index > 2 && (
                              <div className="w-10 h-10 flex items-center justify-center">
                                <span className="text-xl font-medium">{index + 1}</span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-xl overflow-hidden bg-muted mr-3 shadow-sm">
                              <img
                                src={team.team.logo}
                                alt={team.team.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <p className="font-medium">{team.team.name}</p>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <div className="flex items-center justify-end">
                            <Star className="h-4 w-4 text-amber-500 mr-2" />
                            <span className="font-medium text-lg">{team.score.toFixed(1)}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Featured Teams */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6 text-center gradient-text">
          {t("leaderboard.featuredTeams") || "Featured Teams"}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {globalLeaderboardData.slice(0, 4).map((item) => (
            <div key={item.team.id} className="premium-card rounded-xl p-6 text-center">
              <div className="mb-4 relative mx-auto w-20 h-20">
                <div className="rounded-xl overflow-hidden w-full h-full">
                  <img
                    src={item.team.logo}
                    alt={item.team.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {item.rank === 1 && (
                  <div className="absolute -top-2 -right-2">
                    <Crown className="h-6 w-6 text-amber-500" />
                  </div>
                )}
              </div>
              
              <h3 className="font-bold">{item.team.name}</h3>
              <p className="text-muted-foreground text-sm">{item.team.members} members</p>
              
              <div className="flex items-center justify-center mt-2 text-lg font-medium text-primary">
                <Star className="h-5 w-5 text-amber-500 mr-2" />
                {item.totalScore.toFixed(1)}
              </div>
              
              <div className="mt-4 pt-4 border-t border-border/30 flex justify-between text-sm">
                <div>
                  <span className="block text-muted-foreground">Hackathons</span>
                  <span className="font-medium">{item.hackathonsParticipated}</span>
                </div>
                <div>
                  <span className="block text-muted-foreground">Wins</span>
                  <span className="font-medium">{item.wins}</span>
                </div>
                <div>
                  <span className="block text-muted-foreground">Rank</span>
                  <span className="font-medium">{item.rank}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Leaderboard;
