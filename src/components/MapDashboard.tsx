
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const MapDashboard = () => {
  const [selectedCounty, setSelectedCounty] = useState<string | null>(null);

  // Sample data for demonstration
  const counties = [
    { name: "Nairobi", submissions: 156, x: 60, y: 65, verified: 142 },
    { name: "Kiambu", submissions: 89, x: 58, y: 60, verified: 81 },
    { name: "Mombasa", submissions: 134, x: 75, y: 85, verified: 128 },
    { name: "Kisumu", submissions: 78, x: 25, y: 70, verified: 72 },
    { name: "Nakuru", submissions: 112, x: 35, y: 55, verified: 105 },
    { name: "Eldoret", submissions: 67, x: 30, y: 45, verified: 61 },
    { name: "Meru", submissions: 93, x: 65, y: 50, verified: 87 },
    { name: "Machakos", submissions: 71, x: 65, y: 70, verified: 68 },
  ];

  const getHeatmapColor = (submissions: number) => {
    if (submissions > 120) return "bg-red-500";
    if (submissions > 80) return "bg-orange-500";
    if (submissions > 40) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getHeatmapSize = (submissions: number) => {
    if (submissions > 120) return "w-6 h-6";
    if (submissions > 80) return "w-5 h-5";
    if (submissions > 40) return "w-4 h-4";
    return "w-3 h-3";
  };

  return (
    <div className="relative">
      {/* Kenya Map Silhouette */}
      <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ height: "400px" }}>
        {/* Simplified Kenya outline */}
        <svg
          viewBox="0 0 400 300"
          className="absolute inset-0 w-full h-full"
          style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}
        >
          <path
            d="M80,50 L320,50 L340,80 L350,120 L340,180 L320,220 L280,250 L120,250 L80,220 L60,180 L50,120 L60,80 Z"
            fill="#f9fafb"
            stroke="#e5e7eb"
            strokeWidth="2"
          />
        </svg>

        {/* County Markers */}
        {counties.map((county) => (
          <div
            key={county.name}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{
              left: `${county.x}%`,
              top: `${county.y}%`,
            }}
            onClick={() => setSelectedCounty(county.name)}
          >
            <div
              className={`${getHeatmapColor(county.submissions)} ${getHeatmapSize(
                county.submissions
              )} rounded-full opacity-80 hover:opacity-100 transition-all duration-200 hover:scale-110`}
            ></div>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              {county.name}: {county.submissions} forms
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Submissions:</span>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-600">1-40</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
            <span className="text-xs text-gray-600">41-80</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-orange-500 rounded-full"></div>
            <span className="text-xs text-gray-600">81-120</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-red-500 rounded-full"></div>
            <span className="text-xs text-gray-600">120+</span>
          </div>
        </div>
        <Badge variant="outline" className="text-green-700 border-green-300">
          {counties.reduce((sum, county) => sum + county.submissions, 0)} Total Forms
        </Badge>
      </div>

      {/* Selected County Details */}
      {selectedCounty && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
          {(() => {
            const county = counties.find(c => c.name === selectedCounty);
            return county ? (
              <div>
                <h4 className="font-semibold text-green-800">{county.name} County</h4>
                <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                  <div>
                    <span className="text-gray-600">Total Submissions:</span>
                    <span className="ml-2 font-medium">{county.submissions}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Verified:</span>
                    <span className="ml-2 font-medium text-green-600">{county.verified}</span>
                  </div>
                </div>
              </div>
            ) : null;
          })()}
        </div>
      )}
    </div>
  );
};

export default MapDashboard;
