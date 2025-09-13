"use client";

import type React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkles, Upload, Camera, X } from "lucide-react";
import Image from "next/image";
import type { ResumeData } from "@/lib/resume-schema";
import type { UseFormReturn } from "react-hook-form";
// no local state needed here

interface Props {
  form: UseFormReturn<ResumeData>;
  onLoadDemo: () => void;
  onToggleAI: () => void;
}

export default function PersonalInfoForm({
  form,
  onLoadDemo,
  onToggleAI
}: Props) {
  const { register, watch, setValue } = form;
  const watchedData = watch();
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("personalInfo.profileImage", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfileImage = () => setValue("personalInfo.profileImage", "");

  return (
    <div>
      {/* Buttons */}
      <div className="mb-4 flex gap-2">
        <Button
          onClick={onLoadDemo}
          size="sm"
          variant="secondary"
          className="flex-1 gap-2"
        >
          <Sparkles className="h-4 w-4" />
          Try Demo Data
        </Button>
        <Button
          onClick={onToggleAI}
          size="sm"
          variant="outline"
          className="flex-1 gap-2"
        >
          <Upload className="h-4 w-4" />
          Parse Resume
        </Button>
      </div>

      <div className="space-y-4">
        <Label>Profile Picture</Label>
        <div className="flex items-center gap-4">
          {watchedData.personalInfo?.profileImage ? (
            <div className="relative">
              <Image
                src={watchedData.personalInfo.profileImage}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                width={250}
                height={250}
              />
              <Button
                onClick={removeProfileImage}
                size="sm"
                variant="destructive"
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ) : (
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300">
              <Camera className="h-8 w-8 text-gray-400" />
            </div>
          )}
          <div className="flex-1">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="profile-image-upload"
            />
            <Label
              htmlFor="profile-image-upload"
              className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-2"
            >
              <Upload className="h-4 w-4" />
              {watchedData.personalInfo?.profileImage
                ? "Change Photo"
                : "Upload Photo"}
            </Label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            {...register("personalInfo.fullName")}
            placeholder="John Doe"
          />
        </div>
        <div>
          <Label htmlFor="title">Professional Title</Label>
          <Input
            {...register("personalInfo.title")}
            placeholder="Data Scientist"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            {...register("personalInfo.phone")}
            placeholder="+1 234 567 8900"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            {...register("personalInfo.email")}
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            {...register("personalInfo.linkedin")}
            placeholder="linkedin.com/in/johndoe"
          />
        </div>
        <div>
          <Label htmlFor="github">GitHub</Label>
          <Input
            {...register("personalInfo.github")}
            placeholder="github.com/johndoe"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <Label htmlFor="website">Website</Label>
          <Input
            {...register("personalInfo.website")}
            placeholder="johndoe.com"
          />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            {...register("personalInfo.location")}
            placeholder="New York, NY"
          />
        </div>
      </div>
    </div>
  );
}
