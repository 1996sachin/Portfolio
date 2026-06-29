export type TimelineItem = {
  period: string
  title: string
  place: string
  description: string
  highlights: string[]
  College?: string
}
 
export type Project = {
  title: string
  description: string
  stack: string[]
  link?: string
  highlight: string
}
 
export type SkillCategory = {
  title: string
  skills: string[]
}
 
export type HeroContent = {
  name: string
  title: string
  summary: string
  availability: string
  primaryCta: {
    label: string
    href: string
  }
  secondaryCta: {
    label: string
    href: string
  }
  cvDownload: {
    label: string
    href: string
  }
}
 
export type AboutHighlight = {
  label: string
  value: string
}
 
export type Narrative = {
  intro: string
  pillars: {
    title: string
    detail: string
  }[]
}
 
export type ContactDetails = {
  email: string
  phone: string
  location: string
  availabilityNote: string
  socials: {
    label: string
    href: string
  }[]
}
 
export type PortfolioContent = {
  heroContent: HeroContent
  aboutHighlights: AboutHighlight[]
  narrative: Narrative
  educationTimeline: TimelineItem[]
  experienceTimeline: TimelineItem[]
  projectShowcase: Project[]
  skillMatrix: SkillCategory[]
  contactDetails: ContactDetails
}
 
export const heroContent = {
  name: 'Sachin Singh',
  title: 'DevOps & Systems Engineer',
  summary:
    'I manage hybrid infrastructure, harden production systems, and led ISO 27001:2022 implementation from gap assessment through Stage 1 and Stage 2 audits.',
  availability: 'Open to DevOps, Cloud Infrastructure, and Security-focused opportunities.',
  primaryCta: { label: 'View Experience', href: '/experience' },
  secondaryCta: { label: 'Get in touch', href: '/contact' },
  cvDownload: { label: 'Download Resume', href: '/Sachin-2026.pdf' },
}
 
export const aboutHighlights = [
  {
    label: 'Focus',
    value:
      'Production-grade hybrid infrastructure, cloud automation, and proactive security hardening.',
  },
  {
    label: 'Experience',
    value:
      'Hands-on with Fortinet firewalls, AWS cloud, CI/CD pipelines, Kubernetes, ISO 27001 ISMS implementation, and on-premises server administration.',
  },
  {
    label: 'Certifications',
    value: 'Fortinet Certified Associate, FortiGate 7.4 Operator, Cisco Network Support & Security, NDG Linux Unhatched, Windows Server 2022.',
  },
  {
    label: 'Interests',
    value: 'DevOps automation, infrastructure security, cloud architecture, and open-source tooling.',
  },
]
 
export const narrative = {
  intro:
    'I thrive in environments where infrastructure reliability, automation, and security are non-negotiable. From leading ISO 27001:2022 ISMS implementation to managing Fortigate firewalls in active-passive HA and provisioning AWS with Terraform, I own the full stack — controls to cloud edge.',
  pillars: [
    {
      title: 'Operational Reliability',
      detail:
        'Design and maintain hybrid LAN/WAN infrastructures, enforce high availability across Fortigate HA and MySQL replication clusters, and ensure production systems stay resilient under load.',
    },
    {
      title: 'Automation & DevOps',
      detail:
        'Build CI/CD pipelines with Jenkins and GitHub Actions, containerise workloads with Docker and Kubernetes, and provision cloud infrastructure with Terraform to eliminate manual toil.',
    },
    {
      title: 'Security-First Mindset',
      detail:
        'Harden systems at every layer — ISMS design, risk assessment, AWS WAF, Fortigate policies, IAM controls, Wazuh EDR, and Zabbix alerting — to detect and respond before incidents escalate.',
    },
  ],
}
 
export const educationTimeline: TimelineItem[] = [
  {
    period: '2021 – 2025',
    title: 'Bachelor in Computer Application (GPA: 3.05)',
    place: 'Old Baneshwor, Kathmandu',
    College: 'Thames International College, affiliated with Tribhuvan University',
    description: '',
    highlights: [],
  },
  {
    period: '',
    title: 'Intermediate (+2)',
    place: 'Nepal Institute of Management and Science (NIMS College)',
    description: '',
    highlights: [],
  },
]
 
export const experienceTimeline: TimelineItem[] = [
  {
    period: 'May 2026 – Present',
    title: 'DevOps & Systems Engineer',
    place: 'Cell Pay (Cellcom Pvt. Ltd.)',
    description:
      'Full ownership of production hybrid infrastructure spanning on-premise VMware and AWS cloud for payment-grade reliability.',
    highlights: [
      'Manage hybrid infrastructure — VMware ESXi on-premise and AWS cloud — running production Linux servers with Nginx and Apache Tomcat',
      'Administer multi-master MySQL replication cluster ensuring high availability and failover readiness under production load',
      'Manage Fortigate firewalls in active-passive HA and Cisco switches — maintaining policies, VPN tunnels, VLAN segmentation, and WAN connectivity',
      'Provision and operate AWS infrastructure: EC2, VPC, RDS, S3, Route 53, and ELB using Terraform for infrastructure-as-code',
      'Automate operational workflows with AWS Lambda and enforce application security through AWS WAF',
      'Build and maintain CI/CD pipelines with Docker and Kubernetes for containerised deployments',
      'Operate unified observability stack — Zabbix, Prometheus, and Grafana — with proactive alerting for critical production events',
      'Administer Windows Server environments including IIS and MSSQL databases',
      'Manage Microsoft 365 tenancy and provide IT support for office systems',
    ],
  },
  {
    period: 'Apr 2025 – May 2026',
    title: 'Information Security Lead / ISO 27001 Implementation Lead',
    place: 'One Window Private Limited · Sociair CRM+ HRIS',
    description:
      'Led end-to-end ISO 27001:2022 implementation for One Window Private Limited (Sociair CRM+ HRIS with omnichannel AI integration), overseeing the full ISMS lifecycle from gap assessment through Stage 1 and Stage 2 audits. Served as primary point of accountability across all ISMS controls, documentation, and audit coordination while the organisation’s certification application is in progress.',
    highlights: [
      'Spearheaded full-cycle ISO 27001:2022 implementation, from initial scoping and gap analysis through certification audit readiness',
      'Owned the ISMS design and documentation across all 93 Annex A controls under the 2022 standard',
      'Led Stage 1 (documentation review) and Stage 2 (on-site audit) with the external certification body — completed both audits with no major non-conformities identified',
      'Coordinated cross-functional teams across product, engineering, HR, and operations to embed security controls into daily workflows',
      'Established risk assessment and treatment processes, Statement of Applicability (SoA), and internal audit programme',
      'Served as primary liaison between the organisation and the certifying body throughout the entire audit cycle',
    ],
  },
  {
    period: 'Apr 2025 – May 2026',
    title: 'Junior DevOps Engineer',
    place: 'Ambition Guru Private Limited (One Window Pvt. Ltd.)',
    description:
      'Automated deployments, monitored infrastructure performance, and streamlined team workflows.',
    highlights: [
      'Built and maintained CI/CD pipelines using Jenkins and GitHub Actions to automate application deployments',
      'Monitored infrastructure performance with Zabbix, Grafana, and Prometheus with custom alerting rules',
      'Streamed and processed logs in real time using Apache Kafka for observability and analysis',
      'Deployed Wazuh EDR for endpoint security monitoring and threat detection',
      'Automated server tasks, backups, and scheduled jobs using Bash, Python, and Django Celery',
    ],
  },
  {
    period: 'Apr 2025 – May 2026',
    title: 'Network Administrator',
    place: 'Ambition Guru College',
    description:
      'Managed campus-wide network infrastructure and IT operations for academic and corporate environments.',
    highlights: [
      'Managed campus-wide LAN, WAN, and Wi-Fi networks ensuring uninterrupted academic operations',
      'Configured Sophos firewalls, VLAN segmentation, routing, and switch stacking for secure connectivity',
      'Performed capacity planning, vulnerability assessments, and security hardening',
      'Maintained network documentation, lab usage reports, and system inventories',
      'Provided IT support to faculty and students for hardware, software, and network issues',
    ],
  },
  {
    period: 'Mar 2025 – Apr 2025',
    title: 'SOC Analyst Intern',
    place: 'Vairav Tech',
    description:
      'Hands-on security operations training covering incident response, threat detection, and digital forensics.',
    highlights: [
      'Monitored and analysed security events using SIEM tools and investigated malware threats',
      'Supported digital forensics, incident response, and vulnerability assessment activities',
      'Conducted vulnerability assessments and implemented defensive security measures',
    ],
  },
  {
    period: 'Nov 2024 – Mar 2025',
    title: 'Network Engineer',
    place: 'Neology Next Pvt. Ltd.',
    description:
      'Delivered backbone network architecture and device migrations for banking and micro-finance institutions.',
    highlights: [
      'Designed and deployed network backbones for banking and micro-finance institutions',
      'Implemented Fortinet, Juniper, Cisco, and Ruijie solutions for routing, switching, and security',
      'Executed device migrations with minimal downtime and provided L2/L3 remote troubleshooting',
    ],
  },
  {
    period: 'Jun 2023 – Nov 2024',
    title: 'Senior Assistant — NOC',
    place: 'WorldLink Communications',
    description:
      'Monitored large-scale enterprise circuits and core networking equipment in a 24/7 NOC environment.',
    highlights: [
      'Monitored IPLC links, uplink bandwidth, and distribution circuits for enterprise clients',
      'Configured routers, switches, and firewalls and ensured SLA compliance through proactive monitoring',
      'Troubleshot mail and web server issues and tracked network device utilisation metrics',
    ],
  },
]
 
export const projectShowcase: Project[] = [
  {
    title: 'ISO 27001:2022 — One Window Pvt Ltd',
    description:
      'End-to-end ISO 27001:2022 implementation for One Window Private Limited (parent of Ambition Guru Pvt. Ltd.), scoped to Sociair — a CRM+ HRIS platform with omnichannel AI integration. Owned the full ISMS lifecycle from gap assessment and risk treatment through Stage 1 and Stage 2 audits.',
    stack: [
      'ISO 27001:2022',
      'ISMS',
      'Risk Assessment',
      'SoA',
      'Internal Audit',
      'Annex A Controls',
    ],
    highlight:
      'Completed Stage 1 and Stage 2 audits with no major non-conformities identified; organisation certification application in progress.',
  },
  {
    title: 'VPN Monitor Dashboard',
    description:
      'Full-stack production monitoring dashboard for VPN infrastructure built with Django and React. Automated scheduling runs Sunday–Thursday with real-time alerting and status tracking.',
    stack: ['Django', 'React', 'Zabbix', 'Vite', 'Tailwind CSS'],
    highlight:
      'Automated start/stop scheduling via cron with live monitoring and proactive alerting.',
  },
  {
    title: 'Automated Log Monitoring & Alerting',
    description:
      'Centralised Syslog collection with parsing, filtering, and Gmail SMTP email alerts for critical firewall and network events.',
    stack: ['Python', 'Bash', 'Cron', 'Syslog', 'Gmail SMTP'],
    highlight:
      'Boosted visibility into network and firewall activity with zero manual effort.',
  },
  {
    title: 'ELK Stack Centralised Logging',
    description:
      'Deployed Elasticsearch, Logstash, and Kibana to aggregate and visualise system telemetry and security events in real time.',
    stack: ['Elasticsearch', 'Logstash', 'Kibana', 'Syslog'],
    highlight:
      'Enabled real-time monitoring dashboards that accelerated troubleshooting time significantly.',
  },
  {
    title: 'CI/CD Deployment & Monitoring Stack',
    description:
      'Automated deployment of Node.js and Laravel applications on AWS EC2 using Docker, Jenkins, with integrated Prometheus and Grafana for real-time monitoring and alerting.',
    stack: ['Docker', 'Jenkins', 'AWS EC2', 'Prometheus', 'Grafana', 'Bash'],
    highlight:
      'Achieved end-to-end automation and full observability with proactive alerts and zero manual monitoring.',
  },
  {
    title: 'Automated API Regression Testing Tool',
    description:
      'Designed and developed an API testing platform with integrated CI/CD validation. Stores baseline API responses and automatically compares them during deployment to detect unexpected changes.',
    stack: ['React', 'Django', 'PostgreSQL', 'CI/CD'],
    highlight:
      'Built response comparison logic to detect unexpected API behavior changes and block faulty deployments.',
  },
  {
    title: 'Multi-Tenant LMS — DevOps & Infrastructure',
    description:
      'Handled DevOps operations for a multi-tenant Learning Management System. Built CI/CD pipelines, containerised services, and managed asynchronous task processing with Kafka and Celery.',
    stack: ['Django', 'Docker', 'GitLab CI/CD', 'Apache Kafka', 'Django Celery', 'PostgreSQL'],
    highlight:
      'Automated deployment and background task processing to support scalable multi-tenant LMS operations.',
  },
]
 
export const skillMatrix: SkillCategory[] = [
  {
    title: 'Information Security & ISMS',
    skills: [
      'ISO 27001:2022 ISMS Implementation',
      'ISMS Design, Risk Assessment & Treatment',
      'Statement of Applicability (SoA) & Internal Audit',
      'Annex A Controls (93 controls, 2022 standard)',
    ],
  },
  {
    title: 'Network & Security',
    skills: [
      'Fortinet Firewall (HA) & FortiSwitch',
      'Cisco Switching, VLAN, L2 IPSec VPN',
      'AWS WAF, IAM, iDRAC, WAN Management',
    ],
  },
  {
    title: 'Monitoring & Observability',
    skills: [
      'Zabbix, Prometheus & Grafana Alerting',
      'Wazuh EDR, ELK Stack, Wireshark',
      'SOC Incident Response & System Hardening',
    ],
  },
  {
    title: 'Cloud & DevOps',
    skills: [
      'AWS (VPC, EC2, RDS, S3, Route 53, ELB, Lambda, WAF)',
      'Terraform, Jenkins, GitHub Actions, GitLab CI/CD',
      'Docker, Kubernetes, Bash & Python Scripting',
    ],
  },
  {
    title: 'Server Administration',
    skills: [
      'Linux (Ubuntu, CentOS, RHEL), Windows Server',
      'VMware ESXi, MySQL HA, MSSQL, IIS',
      'On-Premises Bare Metal & Microsoft 365',
    ],
  },
]
 
export const contactDetails = {
  email: 'sachinsinghey987@gmail.com',
  phone: '+977 98613 24504',
  location: 'Kathmandu, Nepal · Remote friendly',
  availabilityNote:
    "Let's connect if you are building secure, scalable, and automation-driven infrastructure solutions.",
  socials: [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/sachin-singh-88933123a',
    },
    { label: 'GitHub', href: 'https://github.com/1996sachin' },
  ],
}
 
export const defaultPortfolioContent: PortfolioContent = {
  heroContent,
  aboutHighlights,
  narrative,
  educationTimeline,
  experienceTimeline,
  projectShowcase,
  skillMatrix,
  contactDetails,
}
 
