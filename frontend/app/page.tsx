import { SessionForm } from "@/components/forms/SessionForm";
import GradientText from "@/components/GradientText";

import SessionList from "@/components/SessionList";

export default async function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <GradientText
            colors={["#40ffaa", "#4079ff", "#40ffaa", "#ff4040", "#40ffaa"]}
            animationSpeed={10}
            showBorder={false}
            className="custom-class text-7xl"
          >
            Session Manager
          </GradientText>
          <p className="text-gray-600 my-5">Create and manage your sessions</p>
          {/*   <script src="https://gist.github.com/brudnak/aba00c9a1c92d226f68e8ad8ba1e0a40.js"></script> */}
        </header>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Create New Session
          </h2>
          <SessionForm />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Your Sessions
          </h2>
          <SessionList />
        </div>
      </div>
    </div>
  );
}
