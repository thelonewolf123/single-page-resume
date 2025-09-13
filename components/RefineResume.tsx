import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { Wand2 } from "lucide-react";
import { useApiKey } from "@/hooks/useApiKey";

interface RefineResumeProps {
  text: string;
  onComplete: (refinedText: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RefineResume({
  text,
  onComplete,
  open,
  onOpenChange
}: RefineResumeProps) {
  const [isRefining, setIsRefining] = useState(false);
  const [refinedText, setRefinedText] = useState(text);
  const [userPrompt, setUserPrompt] = useState("");
  const { apiKey } = useApiKey();

  const handleRefine = async () => {
    if (!apiKey.trim() && !process.env.NEXT_PUBLIC_SKIP_API_KEY) {
      alert("Please set your API key in Settings first.");
      return;
    }

    try {
      setIsRefining(true);
      const response = await fetch("/api/resume/refine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: refinedText,
          prompt: userPrompt,
          apiKey
        })
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setRefinedText(data.refinedText);
    } catch (error) {
      console.error("Error refining text:", error);
    } finally {
      setIsRefining(false);
    }
  };

  // Quick actions
  const quickActions = [
    { label: "Fix Grammar", prompt: "Fix grammar and spelling mistakes." },
    { label: "Make Concise", prompt: "Make the text more concise." },
    { label: "Professional Tone", prompt: "Rewrite in a professional tone." },
    { label: "Add Action Verbs", prompt: "Add strong action verbs." }
  ];

  const handleQuickAction = (actionPrompt: string) => {
    setUserPrompt(actionPrompt);
    handleRefine();
  };

  const handleSave = () => {
    onComplete(refinedText);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Refine Text</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            value={refinedText}
            onChange={(e) => setRefinedText(e.target.value)}
            className="min-h-[200px]"
            placeholder="Enter text to refine..."
          />
          <div>
            <label className="block mb-1 text-sm font-medium">
              Prompt (optional)
            </label>
            <Textarea
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              className="min-h-[40px]"
              placeholder="E.g. Make this more concise, fix grammar, etc."
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {quickActions.map((action) => (
                <Button
                  key={action.label}
                  size="sm"
                  variant="outline"
                  disabled={isRefining}
                  onClick={() => handleQuickAction(action.prompt)}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isRefining}
          >
            Cancel
          </Button>
          <Button
            onClick={handleRefine}
            disabled={isRefining}
            variant="secondary"
          >
            <Wand2 className="mr-2 h-4 w-4" />
            Refine
          </Button>
          <Button onClick={handleSave} disabled={isRefining}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
