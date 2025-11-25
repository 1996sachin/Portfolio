export type TimelineItem = {
  period: string
  title: string
  place: string
  description: string
  highlights: string[]
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

export const heroContent = {
  name: 'Sachin Singh Chaudhary',
  title: 'Network & Systems Engineer · Junior DevOps Engineer',
  summary:
    'I secure SD-WAN fabrics, script operational runbooks, and keep hybrid networks ready for the next incident.',
  availability: 'Open to DevOps, NetOps, and SOC-focused opportunities.',
  primaryCta: { label: 'View Experience', href: '/experience' },
  secondaryCta: { label: 'Get in touch', href: '/contact' },
}

export const aboutHighlights = [
  {
    label: 'Focus',
    value:
      'Build automation-driven network operations with proactive security.',
  },
  {
    label: 'Experience',
    value:
      'Hands-on with SD-WAN, EMS, CI/CD, SOC analysis, and infrastructure hardening.',
  },
  {
    label: 'Certifications',
    value: 'Ruijie Engineer (Senior & Junior), Oracle Cloud Foundations Associate.',
  },
  {
    label: 'Interests',
    value: 'DevOps workflows, cybersecurity trends, and resilient infrastructure.',
  },
]

export const narrative = {
  intro:
    'I thrive in fast-moving IT environments where network reliability, automation, and cybersecurity intersect. From enterprise SD-WAN rollouts to SOC mentorships, I pair hands-on engineering with disciplined incident response.',
  pillars: [
    {
      title: 'Operational Reliability',
      detail:
        'Design and monitor LAN/WAN infrastructures, enforce HA, and ensure networks stay resilient during migrations.',
    },
    {
      title: 'Automation & DevOps',
      detail:
        'Build CI/CD pipelines, containerize workloads, and script routine operations to reduce toil and standardize environments.',
    },
    {
      title: 'Security-First Mindset',
      detail:
        'Respond to threats, harden systems, and drive SOC processes that surface actionable intelligence quickly.',
    },
  ],
}

export const educationTimeline: TimelineItem[] = [
  {
    period: '2021 – 2025',
    title: 'Bachelor in Computer Application (3.01 GPA)',
    place: 'Old Baneshwor, Kathmandu',
    description: '',
    highlights: [],
  },
  {
    period: '2019 – 2021',
    title: 'Intermediate (+2)',
    place: 'Nepal Institute of Management and Science (NIMS College)',
    description: '',
    highlights: [],
  },
]

export const experienceTimeline: TimelineItem[] = [
  {
    period: 'Apr 2025 – Present',
    title: 'Junior DevOps Engineer',
    place: 'Ambition Guru',
    description:
      'Automate deployments, monitor multi-cloud workloads, and streamline team workflows.',
    highlights: [
      'Monitored cloud infrastructure (AWS/Azure) and application performance, ensuring HA.',
      'Managed Jenkins/GitHub Actions CI/CD pipelines for application releases',
      'Automated admin tasks with Bash/Python and hardened infra policies',
      'Partner with QA/Dev to enforce best practices and observability',
    ],
  },
  {
    period: 'Apr 2025 – Present',
    title: 'Network Administrator',
    place: 'Ambition Guru',
    description:
      'Safeguard enterprise connectivity and enforce cybersecurity controls.',
    highlights: [
      'Configured firewalls, routers, and switches for secure and efficient connectivity.',
      'Optimized network performance and firewall/router configurations',
      'Automated backups, monitoring, and deployments',
      'Ran vulnerability assessments, patching, and executive reporting',
    ],
  },
  {
    period: 'Apr 2025 – Present',
    title: 'Network Administrator',
    place: 'Ambition Guru College',
    description:
      'Manage campus LAN/WAN, Wi-Fi, and student/staff support operations.',
    highlights: [
      'Maintained documentation, inventories, and academic IT services',
      'Assisted faculty and students with IT support, troubleshooting, and account management.',
      'Handled lab setups, security controls, and classroom readiness',
    ],
  },
  {
    period: 'Mar 2025 – Apr 2025',
    title: 'SOC Mentorship Program',
    place: 'Vairav Tech',
    description:
      'Hands-on incident response and security operations training.',
    highlights: [
      'Investigated SIEM alerts and malware events',
      'Monitors and analyzes security events using SIEM tools.',
      'Supported digital forensics and vulnerability assessments',
      'Conducts vulnerability assessments and implements defensive measures.',
    ],
  },
  {
    period: 'Nov 2024 – Mar 2025',
    title: 'Network Engineer',
    place: 'Neology Next Pvt. Ltd.',
    description:
      'Delivered backbone architecture and device migrations for banks and MFIs.',
    highlights: [
      'Designed, planned, and deployed network architecture / backbone networks for various sectors.',
      'Execute device migrations for commercial banks and micro-finance institutions.',
      'Specialized in Fortinet, Juniper, Ruijie, and Cisco solutions',
      'Provided remote support and security integrations',
    ],
  },
  {
    period: 'Jun 2023 – Nov 2024',
    title: 'Senior Assistant',
    place: 'WorldLink Communications',
    description:
      'Monitored large-scale customer circuits and core networking equipment.',
    highlights: [
      'Monitored customer and distribution circuits for connectivity and issue detection.',
      'Monitoring IPLC and uplink bandwidth for optimal network performance.',
      'Configured routers, firewalls, and IPLC links',
      'Troubleshot mail/web servers and tracked capacity',
    ],
  },
]

export const projectShowcase: Project[] = [
  {
    title: 'Automated Log Monitoring & Alerting',
    description:
      'Centralized Syslog collection with parsing, filtering, and Gmail SMTP email alerts for critical events.',
    stack: ['Python', 'Bash', 'Cron', 'Syslog', 'Gmail SMTP'],
    highlight:
      'Boosted visibility into network/firewall activity with zero manual effort.',
  },
  {
    title: 'ELK Stack Logging Lab',
    description:
      'Deployed Elasticsearch, Logstash, and Kibana on Kali Linux to aggregate and visualize system telemetry.',
    stack: ['ELK Stack', 'Logstash', 'Kibana', 'Syslog'],
    highlight:
      'Enabled real-time monitoring dashboards that accelerated troubleshooting.',
  },
  {
    title: 'Job Vacancy Web Scraper',
    description:
      'Automated daily scraping of vacancy portals and mailed Excel reports of new listings.',
    stack: ['Python', 'BeautifulSoup', 'Requests', 'Crontab'],
    highlight:
      'Reduced manual search time by automating notifications for target roles.',
  },
  {
    title: 'CI/CD Deployment & Monitoring Stack',
    description:
      'Automated deployment of Node.js and Laravel applications on AWS EC2 using Docker, Docker Compose, and Jenkins, with integrated Prometheus and Grafana for real-time monitoring and alerting.',
    stack: ['Node.js', 'Laravel', 'Docker', 'Docker Compose', 'Jenkins', 'AWS EC2', 'Prometheus', 'Grafana', 'AWS', 'Bash'],
    highlight:
      'Achieved end-to-end automation and full observability with proactive alerts and zero manual monitoring.',
  },
  {
    title: 'Enterprise Network Configuration & Automation',
    description:
      'Configured, deployed, and automated multi-vendor networks for banks, cooperatives, government offices, and private institutions. Implemented routing, switching, firewall policies, and wireless infrastructures tailored to client requirements.',
    stack: [
      'Cisco', 
      'Juniper', 
      'Huawei', 
      'MikroTik', 
      'Palo Alto', 
      'Sophos', 
      'Fortinet',
      'Ruijie APs',
      'Cambium cnPilot',
      'Ubiquiti UniFi'
    ],
    highlight:
      'Delivered fully optimized and automated enterprise networks across diverse environments with high availability, security, and scalable wireless coverage.',
  },
]

export const skillMatrix: SkillCategory[] = [
  {
    title: 'Network Architecture',
    skills: [
      'Routers / Switches / Firewalls (Cisco, Juniper, Fortinet, Ruijie)',
      'SD-WAN, VPN, NAS, Secure Network Design',
      'Protocols: TCP/IP, DHCP, DNS, BGP, MPLS, VPLS',
    ],
  },
  {
    title: 'Monitoring & Security',
    skills: [
      'Nagios, SolarWinds, PRTG, Cacti, MRTG',
      'ELK Stack, Wazuh, Wireshark',
      'SOC Analysis & Incident Response',
    ],
  },
  {
    title: 'DevOps & Automation',
    skills: [
      'CI/CD (Jenkins, GitHub Actions, GitLab)',
      'Docker & Containerization',
      'Bash/Python scripting, Infrastructure automation',
      'AWS (EC2, IAM), Oracle Cloud Foundations',
    ],
  },
  {
    title: 'Collaboration & Delivery',
    skills: [
      'Troubleshooting & Issue Resolution',
      'Documentation & Reporting',
      'Network Planning & Implementation',
    ],
  },
]

export const contactDetails = {
  email: 'sachinsinghey987@gmail.com',
  phone: '+977 98613 24504',
  location: 'Kathmandu, Nepal · Remote friendly',
  availabilityNote:
    'Let’s connect if you’re building secure, scalable, and automation-driven network solutions.',
  socials: [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/sachin-singh-88933123a',
    },
    { label: 'GitHub', href: 'https://github.com/1996sachin' },
  ],
}

