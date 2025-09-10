"use client";

import type React from "react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Trash2,
  MapPin,
  Calendar,
  Phone,
  Mail,
  Linkedin,
  Github,
  Globe,
  Sparkles,
  Printer,
  Upload,
  Key,
  Loader2,
  FileText
} from "lucide-react";
import { parseResumeFromFile } from "@/server/resume";
import type { ResumeData } from "@/lib/resume-schema";
import { demoData } from "@/lib/demo-data";

export default function ResumeBuilder() {
  const { register, watch, setValue, getValues, reset } = useForm<ResumeData>({
    defaultValues: {
      personalInfo: {
        fullName: "",
        title: "",
        phone: "",
        email: "",
        linkedin: "",
        github: "",
        website: "",
        location: "",
        profileImage: ""
      },
      summary: "",
      experience: [
        {
          title: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          description: ""
        }
      ],
      education: [
        {
          degree: "",
          institution: "",
          location: "",
          startDate: "",
          endDate: ""
        }
      ],
      skills: [],
      certifications: [{ name: "", issuer: "" }],
      achievements: [{ title: "", description: "" }]
    }
  });

  const [newSkill, setNewSkill] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isParsingResume, setIsParsingResume] = useState(false);
  const [showAISection, setShowAISection] = useState(false);
  const watchedData = watch();

  const handlePrint = () => {
    window.print();
  };

  const handleParseResume = async () => {
    if (!selectedFile || !apiKey.trim()) {
      alert("Please provide both API key and select a resume file");
      return;
    }

    setIsParsingResume(true);
    try {
      const fileContent = await readFileContent(selectedFile);

      const result = await parseResumeFromFile(fileContent, apiKey);

      if (result.success && result.data) {
        reset(result.data);
        setSelectedFile(null);
        setShowAISection(false);
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

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === "string") {
          resolve(result);
        } else {
          reject(new Error("Failed to read file"));
        }
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsText(file);
    });
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

  const loadDemoData = () => {
    reset(demoData);
  };

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
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center print:hidden">
          <h1 className="text-3xl font-bold text-foreground">Resume Builder</h1>
          <p className="text-muted-foreground">
            Create your professional resume with live preview
          </p>
          <div className="mt-4 flex gap-4 justify-center flex-wrap">
            <Button
              onClick={() => setShowAISection(!showAISection)}
              variant="outline"
              className="gap-2 bg-transparent"
            >
              <Upload className="h-4 w-4" />
              Parse Existing Resume
            </Button>
          </div>
        </div>

        {showAISection && (
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
                  Supported formats: PDF, Word documents (.doc, .docx), and text
                  files (.txt)
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
                <Button
                  onClick={() => setShowAISection(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-6 print:hidden">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="mb-4 flex gap-2">
                  <Button
                    onClick={loadDemoData}
                    size="sm"
                    variant="secondary"
                    className="flex-1 gap-2"
                  >
                    <Sparkles className="h-4 w-4" />
                    Try Demo Data
                  </Button>
                  <Button
                    onClick={() => setShowAISection(!showAISection)}
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
                  <Button
                    onClick={addCertification}
                    size="sm"
                    variant="outline"
                  >
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

          {/* Preview Section */}
          <div className="lg:col-span-3 print:col-span-full print:w-full">
            <Card className="sticky top-4 print:shadow-none print:border-none">
              <CardHeader className="print:hidden">
                <CardTitle className="flex items-center justify-between">
                  Resume Preview
                  <Button
                    onClick={handlePrint}
                    size="sm"
                    variant="outline"
                    className="gap-2 bg-transparent"
                  >
                    <Printer className="h-4 w-4" />
                    Print
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="print:p-0">
                <div className="bg-white text-black p-8 min-h-[800px] shadow-lg print:shadow-none print:p-0 print:min-h-0">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <h1 className="text-4xl font-bold text-black mb-2">
                        {watchedData.personalInfo?.fullName || "Your Name"}
                      </h1>
                      <p className="text-xl text-blue-600 mb-4">
                        {watchedData.personalInfo?.title ||
                          "Professional Title"}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        {watchedData.personalInfo?.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            {watchedData.personalInfo.phone}
                          </div>
                        )}
                        {watchedData.personalInfo?.email && (
                          <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {watchedData.personalInfo.email}
                          </div>
                        )}
                        {watchedData.personalInfo?.linkedin && (
                          <div className="flex items-center gap-1">
                            <Linkedin className="h-4 w-4" />
                            LinkedIn
                          </div>
                        )}
                        {watchedData.personalInfo?.github && (
                          <div className="flex items-center gap-1">
                            <Github className="h-4 w-4" />
                            GitHub
                          </div>
                        )}
                        {watchedData.personalInfo?.website && (
                          <div className="flex items-center gap-1">
                            <Globe className="h-4 w-4" />
                            Website
                          </div>
                        )}
                        {watchedData.personalInfo?.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {watchedData.personalInfo.location}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center ml-6">
                      <span className="text-gray-500 text-xs">Photo</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="col-span-2 space-y-6">
                      {/* Summary */}
                      {watchedData.summary && (
                        <div>
                          <h2 className="text-xl font-bold text-black mb-3 border-b-2 border-black pb-1">
                            SUMMARY
                          </h2>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {watchedData.summary}
                          </p>
                        </div>
                      )}

                      {/* Experience */}
                      {watchedData.experience?.some(
                        (exp) => exp.title || exp.company
                      ) && (
                        <div>
                          <h2 className="text-xl font-bold text-black mb-3 border-b-2 border-black pb-1">
                            EXPERIENCE
                          </h2>
                          <div className="space-y-4">
                            {watchedData.experience.map(
                              (exp, index) =>
                                (exp.title || exp.company) && (
                                  <div key={index}>
                                    <h3 className="font-bold text-black">
                                      {exp.title}
                                    </h3>
                                    <p className="text-blue-600 font-medium">
                                      {exp.company}
                                    </p>
                                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                      {(exp.startDate || exp.endDate) && (
                                        <div className="flex items-center gap-1">
                                          <Calendar className="h-3 w-3" />
                                          {exp.startDate}{" "}
                                          {exp.startDate && exp.endDate && "- "}{" "}
                                          {exp.endDate}
                                        </div>
                                      )}
                                      {exp.location && (
                                        <div className="flex items-center gap-1">
                                          <MapPin className="h-3 w-3" />
                                          {exp.location}
                                        </div>
                                      )}
                                    </div>
                                    {exp.description && (
                                      <div className="text-sm text-gray-700">
                                        {exp.description
                                          .split("\n")
                                          .map((line, i) => (
                                            <p key={i} className="mb-1">
                                              {line.startsWith("•")
                                                ? line
                                                : `• ${line}`}
                                            </p>
                                          ))}
                                      </div>
                                    )}
                                  </div>
                                )
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      {/* Key Achievements */}
                      {watchedData.achievements?.some(
                        (achievement) => achievement.title
                      ) && (
                        <div>
                          <h2 className="text-xl font-bold text-black mb-3 border-b-2 border-black pb-1">
                            KEY ACHIEVEMENTS
                          </h2>
                          <div className="space-y-3">
                            {watchedData.achievements.map(
                              (achievement, index) =>
                                achievement.title && (
                                  <div key={index}>
                                    <h3 className="font-bold text-black text-sm">
                                      {achievement.title}
                                    </h3>
                                    {achievement.description && (
                                      <p className="text-xs text-gray-700 mt-1">
                                        {achievement.description}
                                      </p>
                                    )}
                                  </div>
                                )
                            )}
                          </div>
                        </div>
                      )}

                      {/* Skills */}
                      {watchedData.skills?.length > 0 && (
                        <div>
                          <h2 className="text-xl font-bold text-black mb-3 border-b-2 border-black pb-1">
                            SKILLS
                          </h2>
                          <div className="flex flex-wrap gap-2">
                            {watchedData.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Education */}
                      {watchedData.education?.some(
                        (edu) => edu.degree || edu.institution
                      ) && (
                        <div>
                          <h2 className="text-xl font-bold text-black mb-3 border-b-2 border-black pb-1">
                            EDUCATION
                          </h2>
                          <div className="space-y-3">
                            {watchedData.education.map(
                              (edu, index) =>
                                (edu.degree || edu.institution) && (
                                  <div key={index}>
                                    <h3 className="font-bold text-black text-sm">
                                      {edu.degree}
                                    </h3>
                                    <p className="text-blue-600 text-sm">
                                      {edu.institution}
                                    </p>
                                    <div className="flex items-center gap-4 text-xs text-gray-600">
                                      {(edu.startDate || edu.endDate) && (
                                        <div className="flex items-center gap-1">
                                          <Calendar className="h-3 w-3" />
                                          {edu.startDate}{" "}
                                          {edu.startDate && edu.endDate && "- "}{" "}
                                          {edu.endDate}
                                        </div>
                                      )}
                                      {edu.location && (
                                        <div className="flex items-center gap-1">
                                          <MapPin className="h-3 w-3" />
                                          {edu.location}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )
                            )}
                          </div>
                        </div>
                      )}

                      {/* Certifications */}
                      {watchedData.certifications?.some(
                        (cert) => cert.name
                      ) && (
                        <div>
                          <h2 className="text-xl font-bold text-black mb-3 border-b-2 border-black pb-1">
                            CERTIFICATION
                          </h2>
                          <div className="space-y-2">
                            {watchedData.certifications.map(
                              (cert, index) =>
                                cert.name && (
                                  <div key={index}>
                                    <p className="text-blue-600 text-sm">
                                      • {cert.name}
                                    </p>
                                    {cert.issuer && (
                                      <p className="text-xs text-gray-600 ml-2">
                                        ({cert.issuer})
                                      </p>
                                    )}
                                  </div>
                                )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
