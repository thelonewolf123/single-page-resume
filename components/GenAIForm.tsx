"use client";

import type React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, Key, Loader2, Sparkles, FileText } from "lucide-react";
import type { ResumeData } from "@/lib/resume-schema";

interface GenAIFormProps {
  onParseSuccess: (data: ResumeData) => void;
  onClose: () => void;
}

export function GenAIForm({ onParseSuccess, onClose }: GenAIFormProps) {
  const [apiKey, setApiKey] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isParsingResume, setIsParsingResume] = useState(false);

  const handleParseResume = async () => {
    if (!selectedFile || !apiKey.trim()) {
      alert("Please provide both API key and select a resume file");
      return;
    }

    setIsParsingResume(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("apiKey", apiKey);

      const response = await fetch("/api/resume", {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (result.success && result.data) {
        onParseSuccess(result.data);
        setSelectedFile(null);
        onClose();
        alert("Resume parsed successfully!");
      } else {
        alert(`Failed to parse resume: ${result.error}`);
      }
    } catch {
      alert("Error parsing resume. Please try again.");
    } finally {
      setIsParsingResume(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = [
        "text/plain",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ];
      if (!allowedTypes.includes(file.type) && !file.name.endsWith(".txt")) {
        alert("Please select a valid resume file (PDF, Word, or Text)");
        return;
      }
      setSelectedFile(file);
    }
  };

  return (
    <Card className="mb-6 print:hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          AI Resume Parser
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="apiKey" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            Google Gemini API Key
          </Label>
          <Input
            id="apiKey"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your Google Gemini API key"
            className="mt-1"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Get your API key from{" "}
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Google AI Studio
            </a>
          </p>
        </div>
        <div>
          <Label htmlFor="resumeFile" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Resume File
          </Label>
          <Input
            id="resumeFile"
            type="file"
            onChange={handleFileSelect}
            accept=".txt,.pdf,.doc,.docx"
            className="mt-1"
          />
          {selectedFile && (
            <p className="text-sm text-muted-foreground mt-2">
              Selected: {selectedFile.name} (
              {(selectedFile.size / 1024).toFixed(1)} KB)
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            Supported formats: PDF, Word documents (.doc, .docx), and text files
            (.txt)
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleParseResume}
            disabled={isParsingResume || !selectedFile || !apiKey.trim()}
            className="gap-2"
          >
            {isParsingResume ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Parsing Resume...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Parse Resume with AI
              </>
            )}
          </Button>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
