
import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "uz";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isLoading: boolean;
};

const translations = {
  en: {
    // General
    "app.name": "Hackathon.uz",
    "app.tagline": "Innovate, Collaborate, Create",
    "app.description": "Join the most exciting hackathons in Uzbekistan. Build projects, form teams, and compete for amazing prizes.",
    
    // Navigation
    "nav.home": "Home",
    "nav.dashboard": "Dashboard",
    "nav.leaderboard": "Leaderboard",
    "nav.team": "Team",
    "nav.login": "Login",
    "nav.signup": "Sign Up",
    "nav.profile": "Profile",
    "nav.logout": "Logout",
    "nav.cabinet": "Cabinet",
    
    // Homepage
    "home.hero.title": "Innovate, Collaborate, Create",
    "home.hero.subtitle": "The Premier Hackathon Platform in Uzbekistan",
    "home.hero.description": "Join the most exciting hackathons in Uzbekistan. Build projects, form teams, and compete for amazing prizes.",
    "home.hero.browse": "Browse Hackathons",
    "home.hero.create": "Create Account",
    
    "home.featured.title": "Featured Hackathon",
    "home.featured.register": "Register Now",
    "home.featured.details": "View Details",
    "home.featured.closes": "Registration closes on",
    
    "home.upcoming.title": "Upcoming Hackathons",
    "home.upcoming.subtitle": "Discover and join the next exciting hackathons",
    "home.upcoming.search": "Search hackathons...",
    "home.upcoming.filters": "Filters",
    "home.upcoming.viewAll": "View All Hackathons",
    
    "home.why.title": "Why Join Hackathon.uz?",
    "home.why.subtitle": "The premier platform for connecting hackathon enthusiasts, organizers, and judges in Uzbekistan",
    "home.why.teams.title": "Build Your Team",
    "home.why.teams.desc": "Connect with talented developers, designers, and innovators to form the perfect team for hackathons.",
    "home.why.compete.title": "Compete & Win",
    "home.why.compete.desc": "Participate in exciting hackathons with valuable prizes, funding opportunities, and career advancement.",
    "home.why.update.title": "Stay Updated",
    "home.why.update.desc": "Never miss an opportunity with our comprehensive calendar of upcoming hackathons across Uzbekistan.",
    
    "home.cta.title": "Ready to showcase your skills?",
    "home.cta.subtitle": "Join Hackathon.uz today and become part of the largest hackathon community in Uzbekistan.",
    "home.cta.signup": "Sign Up Now",
    "home.cta.learn": "Learn More",
    
    // Dashboard
    "dashboard.title": "Dashboard",
    "dashboard.profile": "Profile",
    "dashboard.teams": "My Teams",
    "dashboard.hackathons": "Hackathons",
    "dashboard.notifications": "Notifications",
    "dashboard.stats": "Stats",
    "dashboard.editProfile": "Edit Profile",
    
    // Cabinet
    "cabinet.title": "User Cabinet",
    "cabinet.welcome": "Welcome back",
    "cabinet.stats.title": "Statistics",
    "cabinet.stats.hackathons": "Hackathons",
    "cabinet.stats.teams": "Teams",
    "cabinet.stats.projects": "Projects",
    "cabinet.stats.achievements": "Achievements",
    "cabinet.upcoming.title": "Upcoming Events",
    "cabinet.upcoming.noEvents": "No upcoming events.",
    "cabinet.recent.title": "Recent Activity",
    "cabinet.recent.noActivity": "No recent activity.",
    "cabinet.actions.title": "Quick Actions",
    "cabinet.actions.createTeam": "Create Team",
    "cabinet.actions.joinHackathon": "Join Hackathon",
    "cabinet.actions.viewProjects": "View My Projects",
    
    // Filters
    "filter.allTopics": "All Topics",
    "filter.allLocations": "All Locations",
    "filter.allDates": "All Dates",
    "filter.clearAll": "Clear All",
    "filter.apply": "Apply Filters",
    
    // Hackathon details
    "hackathon.overview": "Overview",
    "hackathon.teams": "Teams",
    "hackathon.rules": "Rules",
    "hackathon.deadline": "Registration Deadline",
    "hackathon.teamSize": "Team Size",
    "hackathon.register": "Register Now",
    "hackathon.timeline": "Timeline",
    "hackathon.prizes": "Prizes",
    "hackathon.organizers": "Organizers",
    "hackathon.sponsors": "Sponsors",
    "hackathon.about": "About This Hackathon",
    "hackathon.dates": "Dates",
    "hackathon.location": "Location",
    "hackathon.registration": "Registration",
    "hackathon.registrationProgress": "Registration Progress",
    "hackathon.registeredTeams": "of teams registered",
    "hackathon.share": "Share",
    "hackathon.website": "Website",
    
    // Team Management
    "team.management": "Team Management",
    "team.create": "Create Team",
    "team.join": "Join Team",
    "team.leave": "Leave Team",
    "team.edit": "Edit Team",
    "team.delete": "Delete Team",
    "team.invite": "Invite Member",
    "team.members": "Team Members",
    "team.projects": "Team Projects",
    "team.name": "Team Name",
    "team.description": "Team Description",
    "team.details": "Team Details",
    "team.actions": "Actions",
    "team.ban": "Ban Team",
    "team.banReason": "Reason for banning",
    "team.banConfirm": "Confirm Ban",
    "team.message": "Message Team",
    "team.messageTitle": "Send Message to Team",
    "team.messageContent": "Message content",
    "team.messageSend": "Send Message",
    "team.messageAll": "Message All Teams",
    "team.noTeams": "No teams found",
    "team.searchTeams": "Search teams..."
  },
  uz: {
    // General
    "app.name": "Hackathon.uz",
    "app.tagline": "Innovatsiya, Hamkorlik, Yaratish",
    "app.description": "O'zbekistondagi eng qiziqarli hakaton tadbirlariga qo'shiling. Loyihalar yarating, jamoa tuzing va ajoyib sovrinlar uchun musobaqalashing.",
    
    // Navigation
    "nav.home": "Asosiy",
    "nav.dashboard": "Dashboard",
    "nav.leaderboard": "Reyting",
    "nav.team": "Jamoa",
    "nav.login": "Kirish",
    "nav.signup": "Ro'yxatdan o'tish",
    "nav.profile": "Profil",
    "nav.logout": "Chiqish",
    "nav.cabinet": "Kabinet",
    
    // Homepage
    "home.hero.title": "Innovatsiya, Hamkorlik, Yaratish",
    "home.hero.subtitle": "O'zbekistondagi yetakchi hakaton platformasi",
    "home.hero.description": "O'zbekistondagi eng qiziqarli hakaton tadbirlariga qo'shiling. Loyihalar yarating, jamoa tuzing va ajoyib sovrinlar uchun musobaqalashing.",
    "home.hero.browse": "Hakatonlarni ko'rish",
    "home.hero.create": "Hisob yaratish",
    
    "home.featured.title": "Tavsiya etilgan Hakaton",
    "home.featured.register": "Ro'yxatdan o'tish",
    "home.featured.details": "Batafsil ma'lumot",
    "home.featured.closes": "Ro'yxatdan o'tish muddati:",
    
    "home.upcoming.title": "Kutilayotgan Hakatonlar",
    "home.upcoming.subtitle": "Keyingi qiziqarli hakatonlarni kashf eting va ularga qo'shiling",
    "home.upcoming.search": "Hakatonlarni qidirish...",
    "home.upcoming.filters": "Filtrlar",
    "home.upcoming.viewAll": "Barcha Hakatonlarni ko'rish",
    
    "home.why.title": "Nima uchun Hackathon.uz?",
    "home.why.subtitle": "O'zbekistonda hakaton ishtirokchilari, tashkilotchilar va hakamlarni bog'laydigan yetakchi platforma",
    "home.why.teams.title": "Jamoangizni tuzing",
    "home.why.teams.desc": "Hakatonlar uchun mukammal jamoa tuzish uchun iqtidorli dasturchilar, dizaynerlar va innovatorlar bilan bog'laning.",
    "home.why.compete.title": "Musobaqa & G'alaba",
    "home.why.compete.desc": "Qimmatli sovrinlar, moliyalashtirish imkoniyatlari va karyera yuksalishi bilan qiziqarli hakatonlarda ishtirok eting.",
    "home.why.update.title": "Yangiliklardan xabardor bo'ling",
    "home.why.update.desc": "O'zbekiston bo'ylab kutilayotgan hakatonlar bo'yicha keng qamrovli taqvim bilan hech qanday imkoniyatni o'tkazib yubormang.",
    
    "home.cta.title": "Mahoratingizni namoyish etishga tayyormisiz?",
    "home.cta.subtitle": "Bugun Hackathon.uz ga qo'shiling va O'zbekistondagi eng katta hakaton hamjamiyatining bir qismiga aylaning.",
    "home.cta.signup": "Hozir ro'yxatdan o'ting",
    "home.cta.learn": "Ko'proq ma'lumot",
    
    // Dashboard
    "dashboard.title": "Dashboard",
    "dashboard.profile": "Profil",
    "dashboard.teams": "Mening jamoalarim",
    "dashboard.hackathons": "Hakatonlar",
    "dashboard.notifications": "Bildirishnomalar",
    "dashboard.stats": "Statistika",
    "dashboard.editProfile": "Profilni tahrirlash",
    
    // Cabinet
    "cabinet.title": "Foydalanuvchi Kabineti",
    "cabinet.welcome": "Qaytib kelganingiz bilan",
    "cabinet.stats.title": "Statistika",
    "cabinet.stats.hackathons": "Hakatonlar",
    "cabinet.stats.teams": "Jamoalar",
    "cabinet.stats.projects": "Loyihalar",
    "cabinet.stats.achievements": "Yutuqlar",
    "cabinet.upcoming.title": "Kutilayotgan tadbirlar",
    "cabinet.upcoming.noEvents": "Kutilayotgan tadbirlar yo'q.",
    "cabinet.recent.title": "So'nggi faoliyat",
    "cabinet.recent.noActivity": "So'nggi faoliyat yo'q.",
    "cabinet.actions.title": "Tezkor harakatlar",
    "cabinet.actions.createTeam": "Jamoa yaratish",
    "cabinet.actions.joinHackathon": "Hakatonga qo'shilish",
    "cabinet.actions.viewProjects": "Loyihalarimni ko'rish",
    
    // Filters
    "filter.allTopics": "Barcha mavzular",
    "filter.allLocations": "Barcha joylar",
    "filter.allDates": "Barcha sanalar",
    "filter.clearAll": "Barchasini tozalash",
    "filter.apply": "Filtrlarni qo'llash",
    
    // Hackathon details
    "hackathon.overview": "Umumiy ma'lumot",
    "hackathon.teams": "Jamoalar",
    "hackathon.rules": "Qoidalar",
    "hackathon.deadline": "Ro'yxatdan o'tish muddati",
    "hackathon.teamSize": "Jamoa hajmi",
    "hackathon.register": "Ro'yxatdan o'tish",
    "hackathon.timeline": "Jadval",
    "hackathon.prizes": "Sovrinlar",
    "hackathon.organizers": "Tashkilotchilar",
    "hackathon.sponsors": "Homiylar",
    "hackathon.about": "Hakaton haqida",
    "hackathon.dates": "Sanalar",
    "hackathon.location": "Joylashuv",
    "hackathon.registration": "Ro'yxatdan o'tish",
    "hackathon.registrationProgress": "Ro'yxatdan o'tish jarayoni",
    "hackathon.registeredTeams": "jamoalar ro'yxatdan o'tgan",
    "hackathon.share": "Ulashish",
    "hackathon.website": "Veb-sayt",
    
    // Team Management
    "team.management": "Jamoa boshqaruvi",
    "team.create": "Jamoa yaratish",
    "team.join": "Jamoaga qo'shilish",
    "team.leave": "Jamoadan chiqish",
    "team.edit": "Jamoani tahrirlash",
    "team.delete": "Jamoani o'chirish",
    "team.invite": "A'zoni taklif qilish",
    "team.members": "Jamoa a'zolari",
    "team.projects": "Jamoa loyihalari",
    "team.name": "Jamoa nomi",
    "team.description": "Jamoa tavsifi",
    "team.details": "Jamoa ma'lumotlari",
    "team.actions": "Amallar",
    "team.ban": "Jamoani bloklash",
    "team.banReason": "Bloklash sababi",
    "team.banConfirm": "Bloklashni tasdiqlash",
    "team.message": "Jamoaga xabar yuborish",
    "team.messageTitle": "Jamoaga xabar yuborish",
    "team.messageContent": "Xabar mazmuni",
    "team.messageSend": "Xabarni yuborish",
    "team.messageAll": "Barcha jamoalarga xabar yuborish",
    "team.noTeams": "Jamoalar topilmadi",
    "team.searchTeams": "Jamoalarni qidirish..."
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: "uz",
  setLanguage: () => {},
  t: () => "",
  isLoading: false
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLang = localStorage.getItem("language");
    return (savedLang as Language) || "uz";
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Add a very short loading state to ensure the UI updates properly
    setIsLoading(true);
    localStorage.setItem("language", language);
    
    // Small timeout to allow for UI transitions
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 150);
    
    // Apply RTL or LTR direction based on language if needed
    // document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    
    return () => clearTimeout(timer);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string) => {
    // Return the translation or the key itself if not found
    const translationObj = translations[language];
    return translationObj[key as keyof typeof translationObj] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
};
