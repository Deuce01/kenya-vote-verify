
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, MapPin, Shield, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const UploadForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    pollingStation: "",
    county: "",
    constituency: "",
    ward: "",
    image: null as File | null,
    notes: "",
  });
  const [uploading, setUploading] = useState(false);
  const [gpsLocation, setGpsLocation] = useState<string | null>(null);
  const { toast } = useToast();

  const counties = [
    "Nairobi", "Kiambu", "Mombasa", "Kisumu", "Nakuru", "Uasin Gishu", "Meru", "Machakos", 
    "Kakamega", "Bungoma", "Kilifi", "Taita Taveta", "Laikipia", "Isiolo", "Marsabit"
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      // Get GPS location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setGpsLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
            toast({
              title: "Location captured",
              description: "GPS coordinates have been recorded for verification.",
            });
          },
          () => {
            toast({
              title: "Location access denied",
              description: "GPS coordinates are recommended for verification.",
              variant: "destructive",
            });
          }
        );
      }
    }
  };

  const handleCameraCapture = () => {
    // In a real implementation, this would open the device camera
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setFormData({ ...formData, image: file });
      }
    };
    input.click();
  };

  const handleSubmit = async () => {
    setUploading(true);
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    toast({
      title: "Form 34A uploaded successfully!",
      description: "Your submission has been verified and anchored on the blockchain.",
    });
    
    setUploading(false);
    setStep(3);
  };

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-4">
        {[1, 2, 3].map((stepNumber) => (
          <div key={stepNumber} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= stepNumber
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {step > stepNumber ? <CheckCircle className="w-4 h-4" /> : stepNumber}
            </div>
            {stepNumber < 3 && (
              <div
                className={`w-12 h-0.5 mx-2 ${
                  step > stepNumber ? "bg-green-600" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Camera className="w-5 h-5 mr-2 text-green-600" />
              Upload Form 34A Image
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-green-400 transition-colors">
                {formData.image ? (
                  <div className="space-y-4">
                    <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
                    <p className="text-green-600 font-medium">{formData.image.name}</p>
                    <p className="text-sm text-gray-500">Image uploaded successfully</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                    <div>
                      <p className="text-lg font-medium text-gray-900">Upload Form 34A</p>
                      <p className="text-sm text-gray-500">Take a photo or upload a scan</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Button
                  onClick={handleCameraCapture}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <Camera className="w-4 h-4" />
                  <span>Take Photo</span>
                </Button>
                <label>
                  <Button variant="outline" className="flex items-center space-x-2 w-full">
                    <Upload className="w-4 h-4" />
                    <span>Upload File</span>
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {gpsLocation && (
              <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
                <MapPin className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-700">GPS: {gpsLocation}</span>
                <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                  Verified
                </Badge>
              </div>
            )}

            <Button
              onClick={() => setStep(2)}
              disabled={!formData.image}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Continue to Details
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Polling Station Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pollingStation">Polling Station Code</Label>
                <Input
                  id="pollingStation"
                  placeholder="e.g., 001A"
                  value={formData.pollingStation}
                  onChange={(e) => setFormData({ ...formData, pollingStation: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="county">County</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, county: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select county" />
                  </SelectTrigger>
                  <SelectContent>
                    {counties.map((county) => (
                      <SelectItem key={county} value={county}>
                        {county}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="constituency">Constituency</Label>
                <Input
                  id="constituency"
                  placeholder="Enter constituency"
                  value={formData.constituency}
                  onChange={(e) => setFormData({ ...formData, constituency: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="ward">Ward</Label>
                <Input
                  id="ward"
                  placeholder="Enter ward"
                  value={formData.ward}
                  onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Any additional information about this form..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>

            <div className="flex items-center space-x-2 p-4 bg-blue-50 rounded-lg">
              <Shield className="w-5 h-5 text-blue-600" />
              <div className="text-sm text-blue-700">
                <p className="font-medium">Blockchain Verification</p>
                <p>Your submission will be anonymized and anchored on the blockchain for transparency.</p>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button
                onClick={() => setStep(1)}
                variant="outline"
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!formData.pollingStation || !formData.county || uploading}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                {uploading ? "Uploading..." : "Submit Form"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardContent className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-green-800 mb-2">Successfully Submitted!</h3>
            <p className="text-gray-600 mb-6">
              Your Form 34A has been uploaded, verified, and anchored on the blockchain.
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="font-medium">Blockchain Hash:</span>
                <code className="text-sm text-gray-600">0x7f9a8b2c3d...</code>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="font-medium">Verification Status:</span>
                <Badge className="bg-green-100 text-green-800">Verified</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="font-medium">Polling Station:</span>
                <span>{formData.pollingStation}</span>
              </div>
            </div>

            <Button
              onClick={() => {
                setStep(1);
                setFormData({
                  pollingStation: "",
                  county: "",
                  constituency: "",
                  ward: "",
                  image: null,
                  notes: "",
                });
                setGpsLocation(null);
              }}
              className="bg-green-600 hover:bg-green-700"
            >
              Upload Another Form
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UploadForm;
