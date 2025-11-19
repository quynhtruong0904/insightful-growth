import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle, Download } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function DataImport() {
  const [fileName, setFileName] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setIsProcessing(true);
      
      // Simulate processing
      setTimeout(() => {
        setIsProcessing(false);
        toast({
          title: "File uploaded successfully!",
          description: "Your data has been processed and is now available for analysis.",
        });
      }, 2000);
    }
  };

  const downloadTemplate = () => {
    toast({
      title: "Template downloaded",
      description: "Check your downloads folder for the CSV template.",
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Data Import</h1>
        <p className="text-muted-foreground mt-1">
          Upload your transaction data to generate insights, forecasts, and recommendations
        </p>
      </div>

      {/* Upload Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-primary" />
              <CardTitle>Upload Your Data</CardTitle>
            </div>
            <CardDescription>
              Upload a CSV or Excel file with your transaction records
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="space-y-3">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <FileSpreadsheet className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      CSV or Excel files (max 10MB)
                    </p>
                  </div>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileUpload}
                />
              </label>
            </div>

            {fileName && (
              <div className="flex items-center gap-2 p-3 bg-success/10 rounded-lg border border-success/20">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-sm font-medium">{fileName}</span>
              </div>
            )}

            {isProcessing && (
              <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg border border-primary/20">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
                <span className="text-sm font-medium">Processing your data...</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Required Data Format</CardTitle>
            <CardDescription>Your file should include these columns</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {[
                { name: "Order ID", example: "ORD-001, ORD-002" },
                { name: "Customer ID", example: "CUST-123, CUST-456" },
                { name: "Order Date", example: "2024-01-15, 2024-01-16" },
                { name: "Product Name", example: "Lipstick, Moisturizer" },
                { name: "Quantity", example: "2, 1" },
                { name: "Total Value", example: "150000, 89000" },
              ].map((field) => (
                <div key={field.name} className="flex justify-between items-start p-2 rounded bg-muted/50">
                  <div>
                    <p className="text-sm font-medium">{field.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Example: {field.example}</p>
                  </div>
                  <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                </div>
              ))}
            </div>

            <Button onClick={downloadTemplate} variant="outline" className="w-full gap-2">
              <Download className="h-4 w-4" />
              Download Template
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How to Prepare Your Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                1
              </div>
              <div>
                <p className="font-medium text-foreground">Export from your system</p>
                <p className="text-sm text-muted-foreground">
                  Download transaction records from your e-commerce platform, POS system, or accounting software
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                2
              </div>
              <div>
                <p className="font-medium text-foreground">Format your data</p>
                <p className="text-sm text-muted-foreground">
                  Ensure your file has the required columns. Remove any extra headers or summary rows
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                3
              </div>
              <div>
                <p className="font-medium text-foreground">Upload and analyze</p>
                <p className="text-sm text-muted-foreground">
                  Upload your file and the system will automatically process it and generate insights
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="bg-accent/5 border-accent/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-accent" />
            <CardTitle>Data Tips</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Include at least 3 months of data for accurate analysis</p>
          <p>• More data = better forecasts and recommendations</p>
          <p>• Update your data monthly to keep insights current</p>
          <p>• All customer information is processed securely and privately</p>
          <p>• Remove any test orders or internal transactions before uploading</p>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export Your Analysis</CardTitle>
          <CardDescription>Download reports and insights</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          <Button variant="outline" className="justify-start gap-2">
            <Download className="h-4 w-4" />
            Customer Segments
          </Button>
          <Button variant="outline" className="justify-start gap-2">
            <Download className="h-4 w-4" />
            Forecast Report
          </Button>
          <Button variant="outline" className="justify-start gap-2">
            <Download className="h-4 w-4" />
            Promotion Summary
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
