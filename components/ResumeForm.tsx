"use client";

import type React from "react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Sparkles, Upload } from "lucide-react";
import type { ResumeData } from "@/lib/resume-schema";

interface ResumeFormProps {
  form: UseFormReturn<ResumeData>;
  onLoadDemo: () => void;
  onToggleAI: () => void;
}

export function ResumeForm({ form, onLoadDemo, onToggleAI }: ResumeFormProps) {
  const { register, watch, setValue, getValues } = form;
  const [newSkill, setNewSkill] = useState("");
  const watchedData = watch();

  const addExperience = () => {
    const currentExp = getValues("experience");
    setValue("experience", [
      ...currentExp,
      {
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        description: ""
      }
    ]);
  };

  const removeExperience = (index: number) => {
    const currentExp = getValues("experience");
    setValue(
      "experience",
      currentExp.filter((_, i) => i !== index)
    );
  };

  const addEducation = () => {
    const currentEdu = getValues("education");
    setValue("education", [
      ...currentEdu,
      { degree: "", institution: "", location: "", startDate: "", endDate: "" }
    ]);
  };

  const removeEducation = (index: number) => {
    const currentEdu = getValues("education");
    setValue(
      "education",
      currentEdu.filter((_, i) => i !== index)
    );
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      const currentSkills = getValues("skills");
      setValue("skills", [...currentSkills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (index: number) => {
    const currentSkills = getValues("skills");
    setValue(
      "skills",
      currentSkills.filter((_, i) => i !== index)
    );
  };

  const addCertification = () => {
    const currentCerts = getValues("certifications");
    setValue("certifications", [...currentCerts, { name: "", issuer: "" }]);
  };

  const removeCertification = (index: number) => {
    const currentCerts = getValues("certifications");
    setValue(
      "certifications",
      currentCerts.filter((_, i) => i !== index)
    );
  };

  const addAchievement = () => {
    const currentAchievements = getValues("achievements");
    setValue("achievements", [
      ...currentAchievements,
      { title: "", description: "" }
    ]);
  };

  const removeAchievement = (index: number) => {
    const currentAchievements = getValues("achievements");
    setValue(
      "achievements",
      currentAchievements.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="lg:col-span-2 space-y-6 print:hidden">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
          <div className="grid grid-cols-2 gap-4">
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
          <div className="grid grid-cols-2 gap-4">
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
          <div className="grid grid-cols-2 gap-4">
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
          <div className="grid grid-cols-2 gap-4">
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
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Professional Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            {...register("summary")}
            placeholder="Write a brief professional summary..."
            className="min-h-[100px]"
          />
        </CardContent>
      </Card>

      {/* Experience */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Experience
            <Button onClick={addExperience} size="sm" variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {watchedData.experience?.map((exp, index) => (
            <div key={index} className="space-y-4 p-4 border rounded-lg">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">Experience {index + 1}</h4>
                {watchedData.experience.length > 1 && (
                  <Button
                    onClick={() => removeExperience(index)}
                    size="sm"
                    variant="ghost"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Job Title</Label>
                  <Input
                    {...register(`experience.${index}.title`)}
                    placeholder="Data Scientist"
                  />
                </div>
                <div>
                  <Label>Company</Label>
                  <Input
                    {...register(`experience.${index}.company`)}
                    placeholder="Tech Corp"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Location</Label>
                  <Input
                    {...register(`experience.${index}.location`)}
                    placeholder="New York, NY"
                  />
                </div>
                <div>
                  <Label>Start Date</Label>
                  <Input
                    {...register(`experience.${index}.startDate`)}
                    placeholder="01/2023"
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    {...register(`experience.${index}.endDate`)}
                    placeholder="Present"
                  />
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  {...register(`experience.${index}.description`)}
                  placeholder="Describe your responsibilities and achievements..."
                  className="min-h-[80px]"
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Education
            <Button onClick={addEducation} size="sm" variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {watchedData.education?.map((edu, index) => (
            <div key={index} className="space-y-4 p-4 border rounded-lg">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">Education {index + 1}</h4>
                {watchedData.education.length > 1 && (
                  <Button
                    onClick={() => removeEducation(index)}
                    size="sm"
                    variant="ghost"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Degree</Label>
                  <Input
                    {...register(`education.${index}.degree`)}
                    placeholder="Bachelor of Science"
                  />
                </div>
                <div>
                  <Label>Institution</Label>
                  <Input
                    {...register(`education.${index}.institution`)}
                    placeholder="University Name"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Location</Label>
                  <Input
                    {...register(`education.${index}.location`)}
                    placeholder="City, State"
                  />
                </div>
                <div>
                  <Label>Start Date</Label>
                  <Input
                    {...register(`education.${index}.startDate`)}
                    placeholder="08/2019"
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    {...register(`education.${index}.endDate`)}
                    placeholder="05/2023"
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a skill..."
              onKeyPress={(e) => e.key === "Enter" && addSkill()}
            />
            <Button onClick={addSkill} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {watchedData.skills?.map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => removeSkill(index)}
              >
                {skill} ×
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Certifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Certifications
            <Button onClick={addCertification} size="sm" variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {watchedData.certifications?.map((cert, index) => (
            <div key={index} className="flex gap-4 items-end">
              <div className="flex-1">
                <Label>Certification Name</Label>
                <Input
                  {...register(`certifications.${index}.name`)}
                  placeholder="AWS Certified Developer"
                />
              </div>
              <div className="flex-1">
                <Label>Issuer</Label>
                <Input
                  {...register(`certifications.${index}.issuer`)}
                  placeholder="Amazon Web Services"
                />
              </div>
              {watchedData.certifications.length > 1 && (
                <Button
                  onClick={() => removeCertification(index)}
                  size="sm"
                  variant="ghost"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Key Achievements
            <Button onClick={addAchievement} size="sm" variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {watchedData.achievements?.map((achievement, index) => (
            <div key={index} className="space-y-4 p-4 border rounded-lg">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">Achievement {index + 1}</h4>
                {watchedData.achievements.length > 1 && (
                  <Button
                    onClick={() => removeAchievement(index)}
                    size="sm"
                    variant="ghost"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div>
                <Label>Title</Label>
                <Input
                  {...register(`achievements.${index}.title`)}
                  placeholder="Achievement title"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  {...register(`achievements.${index}.description`)}
                  placeholder="Describe your achievement..."
                  className="min-h-[60px]"
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
