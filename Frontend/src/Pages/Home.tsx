import { useAuth } from "@/components/AuthContext";
import CreateFeedbackModal from "@/components/FeedbackCreateModel";
import FeedbackPage from "@/components/FeedbackPage";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Home = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { logout } = useAuth();

  const handleFeedbackCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };
  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Header */}
      <header className="w-full fixed top-0 left-0 z-50 border-b border-slate-700/50 bg-slate-900/70 backdrop-blur-md text-white transition-shadow duration-300">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-2">
          {/* Left Side: App Name + Tagline */}
          <div>
            <h1 className="text-xl font-bold">FeedbackHub</h1>
            <p className="sm:text-sm text-xs text-zinc-400">
              Share your thoughts. Improve together 🚀
            </p>
          </div>

          {/* Right Side: Buttons */}
          <div className="flex gap-3 items-center">
            <CreateFeedbackModal onSuccess={handleFeedbackCreated} />
            <Button variant="destructive" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full mt-14 px-6 py-6">
        <FeedbackPage refreshTrigger={refreshTrigger} />
      </main>
    </div>
  );
};

export default Home;
