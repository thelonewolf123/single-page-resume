import { ResumeData } from "./resume-schema";

export const demoData: ResumeData = {
  personalInfo: {
    fullName: "Harish Kumar K",
    title: "Frontend Developer",
    phone: "",
    email: "harishkumar.vellore@gmail.com",
    linkedin: "linkedin.com/in/harishkumark025",
    github: "github.com/thelonewolf123",
    website: "harishkumar.info",
    location: "Vellore India",
    profileImage: ""
  },
  summary:
    "Accomplished Frontend Developer at Fluid.travel, I drove a 150% increase in bookings by revamping the hotel search and booking flow. Proficient in TypeScript and AWS, I excel in performance optimization and cross-team collaboration, delivering impactful features that enhance user experience and operational efficiency.",
  experience: [
    {
      title: "Frontend developer - SDE II",
      company: "Fluid.travel",
      location: "Chennai, India",
      startDate: "11/2024",
      endDate: "Current",
      description:
        "• Directed development and delivery of major features, including Static Reports and Ledger module.\n• Revamped hotel search and booking flow on web and mobile, resulting in 150% increase in bookings.\n• Shipped cross-platform capabilities for Preferred Hotels and Cirium integration across web and mobile platforms."
    },
    {
      title: "Fullstack developer",
      company: "Klenty soft. inc.",
      location: "Chennai, India",
      startDate: "02/2023",
      endDate: "11/2023",
      description:
        "• Implemented Zepkin distributed tracing to enhance performance measurement capabilities.\n• Created instant mail tracking feature, reducing latency from 15 minutes to five seconds.\n• Designed slow query tracking pipeline for identifying bottlenecks in infrastructure optimization.\n• Collaborated across teams to ensure SOC2 compliance was upheld."
    },
    {
      title: "Senior Ide Engineer",
      company: "Codedamn",
      location: "Banglore, India",
      startDate: "08/2022",
      endDate: "02/2023",
      description:
        "• Optimized container allocation pipeline, achieving 55% reduction in operational costs.\n• Boosted productivity by implementing autocomplete and intellisense features for online IDE platform.\n• Enhanced user experience through streamlined coding tools on online IDE.\n• Collaborated with instructors to develop data structure and algorithm code execution stack.\n• Created logging infrastructure using CloudWatch for prompt identification of user issues.\n• Built internal tool to analyze logs, latency, and bottlenecks."
    },
    {
      title: "Member of technical staff",
      company: "Facilio: Data-driven Building Operations",
      location: "Chennai, India",
      startDate: "03/2021",
      endDate: "07/2022",
      description:
        "• Developed Al parser using template parsing to process over 6,000 payment receipts, enhancing product marketability.\n• Created pivot table feature to aggregate data across modules, improving analysis capabilities.\n• Added conditional formatting and calculated fields to increase pivot table functionality.\n• Integrated parcel owner parsing from photo with Android and notification system for employee alerts."
    }
  ],
  education: [
    {
      degree: "B.E",
      institution: "Thanthai Periyar Government Institute of Technology",
      location: "Vellore",
      startDate: "",
      endDate: "03/2021"
    }
  ],
  skills: [
    "Python",
    "JavaScript",
    "TypeScript",
    "Java",
    "Go",
    "C++",
    "SQL",
    "AWS (EC2, S3)",
    "Docker",
    "Kubernetes basics",
    "React.js",
    "Next.js",
    "Vue.js",
    "TailwindCSS",
    "HTML5",
    "CSS3",
    "Flutter",
    "React Native",
    "Progressive Web Apps",
    "Node.js",
    "Express.js",
    "Flask",
    "Django",
    "REST APIs",
    "GraphQL",
    "Grafana",
    "Prometheus",
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "SQLite",
    "DynamoDB",
    "Redis",
    "Git",
    "GitHub",
    "Visual Studio Code"
  ],
  certifications: [
    {
      name: "Fiber Optics Splicing Certification",
      issuer: "BSNL"
    }
  ],
  achievements: [
    {
      title: "First Prize in Paper Presentation",
      description:
        "Won first prize for paper presentation at Government College of Engineering, Bargur"
    }
  ]
};
