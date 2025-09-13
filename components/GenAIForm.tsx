"use client";

import type React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Upload, Loader2, Sparkles, FileText } from "lucide-react";
import type { ResumeData } from "@/lib/resume-schema";
import { useApiKey } from "@/hooks/useApiKey";

interface GenAIFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onParseSuccess: (data: ResumeData) => void;
}

export function GenAIForm({
  open,
  onOpenChange,
  onParseSuccess
}: GenAIFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isParsingResume, setIsParsingResume] = useState(false);

  const { apiKey } = useApiKey();

  const handleParseResume = async () => {
    if (!selectedFile) {
      alert("Please select a resume file");
      return;
    }

    if (!apiKey.trim()) {
      alert("Please set your API key in Settings first.");
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
        onOpenChange(false);
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            AI Resume Parser
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
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
              className="mt-2"
            />
            {selectedFile && (
              <p className="text-sm text-muted-foreground mt-2">
                Selected: {selectedFile.name} (
                {(selectedFile.size / 1024).toFixed(1)} KB)
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-2">
              Supported formats: PDF, Word documents (.doc, .docx), and text
              files (.txt)
            </p>
          </div>
        </div>
        <DialogFooter className="pt-6">
          <Button onClick={() => onOpenChange(false)} variant="outline">
            Cancel
          </Button>
          <Button
            onClick={handleParseResume}
            disabled={isParsingResume || !selectedFile}
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
