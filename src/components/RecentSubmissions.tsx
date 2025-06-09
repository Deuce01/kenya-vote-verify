
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, MapPin, Clock, CheckCircle, AlertCircle } from "lucide-react";

const RecentSubmissions = () => {
  const recentForms = [
    {
      id: "F34A-2024-001",
      pollingStation: "001A",
      county: "Nairobi",
      constituency: "Westlands",
      timestamp: "2 minutes ago",
      status: "verified",
      votes: { candidate1: 234, candidate2: 189, candidate3: 156 },
    },
    {
      id: "F34A-2024-002",
      pollingStation: "045B",
      county: "Kiambu",
      constituency: "Kikuyu",
      timestamp: "5 minutes ago",
      status: "processing",
      votes: { candidate1: 312, candidate2: 278, candidate3: 201 },
    },
    {
      id: "F34A-2024-003",
      pollingStation: "023C",
      county: "Mombasa",
      constituency: "Mvita",
      timestamp: "8 minutes ago",
      status: "verified",
      votes: { candidate1: 198, candidate2: 245, candidate3: 167 },
    },
    {
      id: "F34A-2024-004",
      pollingStation: "067A",
      county: "Kisumu",
      constituency: "Kisumu Central",
      timestamp: "12 minutes ago",
      status: "flagged",
      votes: { candidate1: 156, candidate2: 134, candidate3: 189 },
    },
    {
      id: "F34A-2024-005",
      pollingStation: "089D",
      county: "Nakuru",
      constituency: "Nakuru Town West",
      timestamp: "15 minutes ago",
      status: "verified",
      votes: { candidate1: 267, candidate2: 223, candidate3: 198 },
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "processing":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "flagged":
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-100 text-green-800 text-xs">Verified</Badge>;
      case "processing":
        return <Badge className="bg-yellow-100 text-yellow-800 text-xs">Processing</Badge>;
      case "flagged":
        return <Badge className="bg-red-100 text-red-800 text-xs">Flagged</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">Unknown</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <FileText className="w-5 h-5 mr-2 text-green-600" />
            Recent Submissions
          </span>
          <Badge variant="outline" className="text-xs">
            Live Updates
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentForms.map((form) => (
            <div
              key={form.id}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-150"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(form.status)}
                  <span className="font-medium text-sm">{form.pollingStation}</span>
                  {getStatusBadge(form.status)}
                </div>
                <span className="text-xs text-gray-500">{form.timestamp}</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-3 h-3 mr-1" />
                  {form.constituency}, {form.county}
                </div>
                
                {form.status === "verified" && (
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-blue-50 p-2 rounded text-center">
                      <p className="font-medium text-blue-800">{form.votes.candidate1}</p>
                      <p className="text-blue-600">Candidate A</p>
                    </div>
                    <div className="bg-green-50 p-2 rounded text-center">
                      <p className="font-medium text-green-800">{form.votes.candidate2}</p>
                      <p className="text-green-600">Candidate B</p>
                    </div>
                    <div className="bg-purple-50 p-2 rounded text-center">
                      <p className="font-medium text-purple-800">{form.votes.candidate3}</p>
                      <p className="text-purple-600">Candidate C</p>
                    </div>
                  </div>
                )}
                
                {form.status === "flagged" && (
                  <div className="bg-red-50 p-2 rounded-lg">
                    <p className="text-xs text-red-700">
                      <AlertCircle className="w-3 h-3 inline mr-1" />
                      Requires manual review
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <Button variant="outline" className="w-full mt-4 text-sm">
          View All Submissions
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecentSubmissions;
