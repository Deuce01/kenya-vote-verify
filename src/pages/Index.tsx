
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, MapPin, Shield, Users, FileText, BarChart3 } from "lucide-react";
import MapDashboard from "@/components/MapDashboard";
import UploadForm from "@/components/UploadForm";
import StatsOverview from "@/components/StatsOverview";
import RecentSubmissions from "@/components/RecentSubmissions";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"dashboard" | "upload">("dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-green-800">OpenVote Kenya</h1>
                <p className="text-sm text-green-600">Blockchain-Powered Form 34A Verification</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Live System
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "dashboard"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <BarChart3 className="w-4 h-4 inline mr-2" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("upload")}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "upload"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <Upload className="w-4 h-4 inline mr-2" />
              Upload Form 34A
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Hero Stats */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-gray-900">
                Real-Time Election Transparency
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Citizens across Kenya are uploading and verifying Form 34A documents using blockchain technology
                to ensure election integrity and transparency.
              </p>
            </div>

            <StatsOverview />

            {/* Map and Recent Submissions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-green-600" />
                      Form 34A Submissions Across Kenya
                    </CardTitle>
                    <CardDescription>
                      Interactive map showing verified form submissions by location
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MapDashboard />
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <RecentSubmissions />
              </div>
            </div>
          </div>
        )}

        {activeTab === "upload" && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Upload Form 34A</h2>
              <p className="text-lg text-gray-600">
                Help ensure election transparency by uploading your polling station's Form 34A.
                All submissions are verified and anchored on the blockchain.
              </p>
            </div>
            <UploadForm />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">OpenVote Kenya</h3>
              <p className="text-gray-300">
                Empowering citizens with blockchain technology to ensure transparent and verifiable elections.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Blockchain verification</li>
                <li>• Real-time tallying</li>
                <li>• GPS-based validation</li>
                <li>• Open source transparency</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• API Documentation</li>
                <li>• Verification Guide</li>
                <li>• Smart Contract</li>
                <li>• Community Forum</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 OpenVote Kenya. Built for transparency and democracy.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
