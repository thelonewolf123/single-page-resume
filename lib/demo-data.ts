import { ResumeData } from "./resume-schema";

export const demoData: ResumeData = {
  personalInfo: {
    fullName: "BHAVESH",
    title: "Data Scientist",
    phone: "+91 93502 21394",
    email: "bhavesharora127@gmail.com",
    linkedin: "LinkedIn",
    github: "GitHub",
    website: "Leetcode",
    location: "Bangalore",
    profileImage: ""
  },
  summary:
    "I am a dedicated Data Scientist with extensive experience in machine learning and data analytics. My proficiency in designing AI solutions and executing targeted marketing strategies has led to significant improvements in business performance. I hold a Masters in Data Engineering from IIT Jodhpur, where I ranked second in my department. I am passionate about leveraging data-driven insights to enhance decision-making processes across various domains",
  experience: [
    {
      title: "Data Scientist",
      company: "Delight Learning",
      location: "Bangalore, India",
      startDate: "03/2024",
      endDate: "Present",
      description:
        "An educational technology company focused on enhancing learning experiences through AI and data-driven solutions\n• Designing and developing an autonomous AI agent using LangGraph to streamline internal workflows and enhance decision-making capabilities\n• Leveraging LLMs and prompt engineering techniques to create modular, memory-enabled agents tailored to dynamic business logic\n• Integrating LangGraph with in-house APIs and data sources to build stateful, context-aware pipelines for real-time inference and action chaining"
    },
    {
      title: "Marketing Analyst",
      company: "American Express",
      location: "Gurgaon, India",
      startDate: "11/2023",
      endDate: "04/2024",
      description:
        "A global financial services company providing credit cards and payment solutions\n• Creation of Comprehensive Excel Dashboards to analyze customer churn trends, enabling data-driven decision making and proactive retention strategies\n• Developed and executed targeted marketing campaigns aimed at reducing customer inactivity and preventive cancellations, resulting in improved retention rates\n• Managed Email and SMS campaigns to notify card members about the importance of updating Pan Card and KYC information, ensuring compliance with regulatory requirements and enhancing customer data accuracy"
    },
    {
      title: "Machine Learning Associate",
      company: "Amazon",
      location: "Gurgaon, India",
      startDate: "11/2022",
      endDate: "11/2023",
      description:
        "A multinational technology company focusing on e-commerce, cloud computing, and artificial intelligence\n• Collaborated with cross-functional teams to build, validate, and deploy machine learning models that improved customer experience and operational efficiency\n• Developed and fine-tuned predictive algorithms using large-scale datasets, ensuring scalable and high-performance ML solutions\n• Utilized AWS tools and ML frameworks (e.g., SageMaker, PyTorch, Scikit-learn) to automate model training, evaluation, and deployment pipelines"
    }
  ],
  education: [
    {
      degree: "Masters of Technology",
      institution: "Indian Institute of Technology, Jodhpur",
      location: "Jodhpur",
      startDate: "08/2024",
      endDate: "05/2026"
    },
    {
      degree: "Bachelor of Technology",
      institution: "Dronacharya College of Engineering, Gurgaon",
      location: "Gurgaon",
      startDate: "08/2019",
      endDate: "05/2023"
    }
  ],
  skills: [
    "AWS",
    "C/C++",
    "Python",
    "PyTorch",
    "HTML",
    "CSS",
    "GitHub",
    "SQL",
    "LangChain",
    "LangGraph",
    "JIRA",
    "Git",
    "MongoDB",
    "Microsoft Power BI",
    "Zoho Creator",
    "Deluge",
    "Postman",
    "Tableau",
    "MySQL",
    "MongoDB",
    "Scrum",
    "SQL",
    "Tableau",
    "TensorFlow",
    "Zoho"
  ],
  certifications: [
    {
      name: "Scrum Alliance Certified: ScrumMaster (CSM)",
      issuer: "Scrum Alliance"
    },
    {
      name: "Scrum Alliance Certified: Product Owner (PO)",
      issuer: "Scrum Alliance"
    }
  ],
  achievements: [
    {
      title: "Departmental Rank: 2 IIT Jodhpur",
      description:
        "Achieved Departmental Rank 2 at IIT Jodhpur, demonstrating academic excellence in the field of Data Engineering"
    }
  ]
};
