"use client";

import { useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Key } from "lucide-react";
import { useApiKey } from "@/hooks/useApiKey";

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
  const { apiKey, setApiKey, saveApiKey } = useApiKey();

  useEffect(() => {
    if (open) {
      setApiKey(localStorage.getItem("genai_api_key") || "");
    }
  }, [open, setApiKey]);

  const handleSave = useCallback(() => {
    saveApiKey(apiKey);
    // TODO: Replace alert with toast/snackbar if available
    alert("API key saved to local storage.");
    onOpenChange(false);
  }, [apiKey, saveApiKey, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Settings
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
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
            className="mt-2"
            autoComplete="off"
          />
          <p className="text-xs text-muted-foreground mt-2">
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
        <DialogFooter className="pt-4">
          <Button onClick={() => onOpenChange(false)} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!apiKey.trim()}>
            Save API Key
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
