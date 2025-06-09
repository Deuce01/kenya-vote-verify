
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Shield, Users, MapPin, TrendingUp, CheckCircle } from "lucide-react";

const StatsOverview = () => {
  const stats = [
    {
      title: "Total Forms Uploaded",
      value: "2,847",
      change: "+156 today",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Blockchain Verified",
      value: "2,691",
      change: "94.5% verified",
      icon: Shield,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Active Counties",
      value: "41/47",
      change: "87% coverage",
      icon: MapPin,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Citizen Contributors",
      value: "1,523",
      change: "+67 new",
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  const trendingStats = [
    { label: "Forms per Hour", value: "23", trend: "up" },
    { label: "Verification Rate", value: "96.2%", trend: "up" },
    { label: "Response Time", value: "2.4s", trend: "down" },
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`${stat.bgColor} p-2 rounded-lg`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trending Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
            Real-Time Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingStats.map((metric) => (
              <div key={metric.label} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                </div>
                <div className={`p-2 rounded-full ${
                  metric.trend === "up" ? "bg-green-100" : "bg-blue-100"
                }`}>
                  {metric.trend === "up" ? (
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  ) : (
                    <TrendingUp className="w-5 h-5 text-blue-600 transform rotate-180" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-800">Blockchain Network</span>
              <Badge className="bg-green-100 text-green-800 text-xs">Online</Badge>
            </div>
            <p className="text-sm text-green-600 mt-1">All systems operational</p>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-800">OCR Processing</span>
              <Badge className="bg-blue-100 text-blue-800 text-xs">Active</Badge>
            </div>
            <p className="text-sm text-blue-600 mt-1">Processing queue: 3 forms</p>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-purple-600" />
              <span className="font-medium text-purple-800">Data Storage</span>
              <Badge className="bg-purple-100 text-purple-800 text-xs">IPFS</Badge>
            </div>
            <p className="text-sm text-purple-600 mt-1">Distributed & secure</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatsOverview;
