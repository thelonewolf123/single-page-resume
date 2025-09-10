import { z } from "zod"

export const ExperienceSchema = z.object({
  title: z.string().describe("Job title or position held"),
  company: z.string().describe("Company or organization name"),
  location: z.string().describe("City, state/country where the job was located"),
  startDate: z.string().describe("Start date in MM/YYYY format"),
  endDate: z.string().describe("End date in MM/YYYY format or 'Present' if current"),
  description: z.string().describe("Detailed description of responsibilities and achievements"),
})

export const EducationSchema = z.object({
  degree: z.string().describe("Degree type and field of study (e.g., Bachelor of Science in Computer Science)"),
  institution: z.string().describe("Name of the educational institution"),
  location: z.string().describe("City, state/country of the institution"),
  startDate: z.string().describe("Start date in MM/YYYY format"),
  endDate: z.string().describe("End date in MM/YYYY format"),
})

export const CertificationSchema = z.object({
  name: z.string().describe("Full name of the certification"),
  issuer: z.string().describe("Organization that issued the certification"),
})

export const AchievementSchema = z.object({
  title: z.string().describe("Title or name of the achievement"),
  description: z.string().describe("Detailed description of the achievement and its significance"),
})

export const ResumeDataSchema = z.object({
  personalInfo: z.object({
    fullName: z.string().describe("Full name of the person"),
    title: z.string().describe("Professional title or job role"),
    phone: z.string().describe("Phone number with country code"),
    email: z.string().describe("Professional email address"),
    linkedin: z.string().describe("LinkedIn profile URL or username"),
    github: z.string().describe("GitHub profile URL or username"),
    website: z.string().describe("Personal website or portfolio URL"),
    location: z.string().describe("Current city and state/country"),
    profileImage: z.string().describe("URL to profile image or photo"),
  }),
  summary: z.string().describe("Professional summary highlighting key skills and experience"),
  experience: z.array(ExperienceSchema).describe("Array of work experience entries"),
  education: z.array(EducationSchema).describe("Array of educational qualifications"),
  skills: z.array(z.string()).describe("Array of technical and professional skills"),
  certifications: z.array(CertificationSchema).describe("Array of professional certifications"),
  achievements: z.array(AchievementSchema).describe("Array of key achievements and accomplishments"),
})

export type ResumeData = z.infer<typeof ResumeDataSchema>
