import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type ConsoleTab = 'hybrid' | 'isms' | 'cicd' | 'telemetry'

interface NodeDetail {
  id: string
  name: string
  role: string
  specs: string[]
  status: string
}

const hybridNodes: NodeDetail[] = [
  {
    id: 'onprem',
    name: 'Bare-Metal Infrastructure',
    role: 'Dell iDRAC Managed On-Premise Cluster',
    specs: ['45+ Production Servers', 'Ubuntu, CentOS & RHEL 8/9', 'iDRAC Enterprise Out-of-Band', 'Zabbix Hardware Sensors'],
    status: 'ONLINE · 45 Nodes',
  },
  {
    id: 'network',
    name: 'Fortinet NGFW & Core Fabric',
    role: 'Enterprise Perimeter & Switching',
    specs: ['FortiGate Next-Gen Firewall', 'FortiSwitch Core Distribution', 'L2 IPSec VPN Site-to-Site', 'Strict VLAN Segmentation'],
    status: 'ACTIVE · 0 Drops',
  },
  {
    id: 'cloud',
    name: 'AWS Cloud Production',
    role: 'Scalable Cloud VPC Architecture',
    specs: ['AWS WAF + ALB Layer 7', 'EC2 Auto-scaling & Docker', 'Amazon RDS Multi-AZ PostgreSQL', 'Route 53 & S3 Encrypted'],
    status: 'HEALTHY · Multi-AZ',
  },
]

const ismsControls = [
  {
    code: 'A.5',
    title: 'Organizational Controls',
    desc: 'Authored information security policies, asset management protocols, and access control governance.',
    badge: '100% Policy Coverage',
    status: 'Enforced',
  },
  {
    code: 'A.8',
    title: 'Technological & Cloud Controls',
    desc: 'Hardened AWS WAF, IAM least privilege, encrypted data at rest/transit, and endpoint protection.',
    badge: 'Hardened Baseline',
    status: 'Enforced',
  },
  {
    code: 'SoA',
    title: 'Statement of Applicability',
    desc: 'Conducted comprehensive risk assessment, treatment plan, and formal Statement of Applicability documentation.',
    badge: '93 Controls Mapped',
    status: 'Approved',
  },
  {
    code: 'Audit',
    title: 'ISO 27001:2022 Certification',
    desc: 'Led cross-departmental readiness, internal audits, and external certification audit for Sociair SaaS platform.',
    badge: 'Official Certificate Awarded',
    status: 'Certified',
  },
]

const cicdStages = [
  { step: '01', name: 'Code Push', tool: 'GitHub Webhook', duration: 'Instant', detail: 'Protected main branch with required CI checks' },
  { step: '02', name: 'Pipeline Orchestration', tool: 'Jenkins CI', duration: '45s', detail: 'Automated test suite, linting, and artifact build' },
  { step: '03', name: 'Containerization', tool: 'Docker Buildx', duration: '1m 10s', detail: 'Multi-stage lean production image creation' },
  { step: '04', name: 'Security Scanning', tool: 'Trivy & CIS Benchmarks', duration: '30s', detail: 'Vulnerability scan & secret leak prevention gate' },
  { step: '05', name: 'Rolling Deployment', tool: 'Zero-Downtime Rollout', duration: '35s', detail: 'Health checked deployment with instant rollback capability' },
]

const ArchitectureConsole = () => {
  const [activeTab, setActiveTab] = useState<ConsoleTab>('hybrid')
  const [selectedNodeId, setSelectedNodeId] = useState<string>('network')

  const selectedNode = hybridNodes.find((n) => n.id === selectedNodeId) || hybridNodes[0]

  return (
    <div className="arch-console">
      {/* Console Top Toolbar */}
      <div className="arch-console-toolbar">
        <div className="arch-toolbar-left">
          <div className="arch-terminal-dots">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>
          <span className="arch-console-title">sachin@infrastructure-control:~#</span>
        </div>

        <div className="arch-toolbar-status">
          <span className="status-live-dot" />
          <span className="status-live-text">45 NODES MONITORED · ISO 27001 ACTIVE</span>
        </div>
      </div>

      {/* Interactive Tabs Header */}
      <div className="arch-tabs-header">
        <button
          type="button"
          className={`arch-tab-btn ${activeTab === 'hybrid' ? 'active' : ''}`}
          onClick={() => setActiveTab('hybrid')}
        >
          <span className="tab-icon">🌐</span>
          <span className="tab-label">Hybrid Cloud Fabric</span>
        </button>

        <button
          type="button"
          className={`arch-tab-btn ${activeTab === 'isms' ? 'active' : ''}`}
          onClick={() => setActiveTab('isms')}
        >
          <span className="tab-icon">🛡️</span>
          <span className="tab-label">ISO 27001:2022 ISMS</span>
        </button>

        <button
          type="button"
          className={`arch-tab-btn ${activeTab === 'cicd' ? 'active' : ''}`}
          onClick={() => setActiveTab('cicd')}
        >
          <span className="tab-icon">🚀</span>
          <span className="tab-label">CI/CD Pipeline</span>
        </button>

        <button
          type="button"
          className={`arch-tab-btn ${activeTab === 'telemetry' ? 'active' : ''}`}
          onClick={() => setActiveTab('telemetry')}
        >
          <span className="tab-icon">📊</span>
          <span className="tab-label">Live Telemetry</span>
        </button>
      </div>

      {/* Console Interactive Content Viewport */}
      <div className="arch-viewport">
        <AnimatePresence mode="wait">
          {/* TAB 1: HYBRID CLOUD FABRIC */}
          {activeTab === 'hybrid' && (
            <motion.div
              key="hybrid"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="arch-tab-pane"
            >
              <div className="arch-topology-flow">
                {hybridNodes.map((node, idx) => {
                  const isSelected = selectedNodeId === node.id
                  return (
                    <div key={node.id} className="arch-topology-step">
                      <div
                        className={`arch-node-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => setSelectedNodeId(node.id)}
                      >
                        <div className="node-card-top">
                          <span className="node-index">LAYER 0{idx + 1}</span>
                          <span className="node-status-pill">{node.status}</span>
                        </div>
                        <h4 className="node-title">{node.name}</h4>
                        <p className="node-role">{node.role}</p>
                      </div>

                      {idx < hybridNodes.length - 1 && (
                        <div className="arch-topology-connector">
                          <div className="connector-line" />
                          <span className="connector-badge">
                            {idx === 0 ? 'IPSec VPN' : 'Direct Link'}
                          </span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Inspector Details Panel */}
              <div className="arch-node-inspector">
                <div className="inspector-header">
                  <span className="inspector-eyebrow">NODE TELEMETRY INSPECTOR</span>
                  <span className="inspector-target">{selectedNode.name}</span>
                </div>
                <div className="inspector-specs-grid">
                  {selectedNode.specs.map((spec) => (
                    <div key={spec} className="spec-badge">
                      <span className="spec-check">✓</span>
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: ISO 27001 ISMS COMPLIANCE */}
          {activeTab === 'isms' && (
            <motion.div
              key="isms"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="arch-tab-pane"
            >
              <div className="arch-isms-banner">
                <div className="isms-shield-icon">🛡️</div>
                <div>
                  <h4 className="isms-banner-title">
                    Official ISO 27001:2022 ISMS Certification Implementation
                  </h4>
                  <p className="isms-banner-desc">
                    Led end-to-end ISMS program implementation for Sociair SaaS platform, achieving formal accreditation with zero critical non-conformities.
                  </p>
                </div>
                <span className="isms-verified-tag">CERTIFIED</span>
              </div>

              <div className="arch-isms-grid">
                {ismsControls.map((ctrl) => (
                  <div key={ctrl.code} className="isms-ctrl-card">
                    <div className="ctrl-card-head">
                      <span className="ctrl-code">{ctrl.code}</span>
                      <span className="ctrl-badge">{ctrl.badge}</span>
                    </div>
                    <h5 className="ctrl-title">{ctrl.title}</h5>
                    <p className="ctrl-desc">{ctrl.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 3: CI/CD PIPELINE */}
          {activeTab === 'cicd' && (
            <motion.div
              key="cicd"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="arch-tab-pane"
            >
              <div className="arch-pipeline-track">
                {cicdStages.map((stage, idx) => (
                  <div key={stage.step} className="pipeline-step-card">
                    <div className="step-card-header">
                      <span className="step-num">{stage.step}</span>
                      <span className="step-duration">{stage.duration}</span>
                    </div>
                    <h5 className="step-name">{stage.name}</h5>
                    <div className="step-tool-badge">{stage.tool}</div>
                    <p className="step-detail">{stage.detail}</p>
                    {idx < cicdStages.length - 1 && (
                      <span className="step-next-indicator">→</span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 4: LIVE TELEMETRY */}
          {activeTab === 'telemetry' && (
            <motion.div
              key="telemetry"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="arch-tab-pane"
            >
              <div className="telemetry-metrics-row">
                <div className="telemetry-card">
                  <span className="telemetry-label">MANAGED PRODUCTION NODES</span>
                  <div className="telemetry-value-row">
                    <span className="telemetry-val">45</span>
                    <span className="telemetry-badge-green">100% HEALTHY</span>
                  </div>
                  <span className="telemetry-sub">Dell iDRAC Bare-Metal + AWS EC2</span>
                </div>

                <div className="telemetry-card">
                  <span className="telemetry-label">SECURITY COMPLIANCE POSTURE</span>
                  <div className="telemetry-value-row">
                    <span className="telemetry-val">ISO 27001</span>
                    <span className="telemetry-badge-blue">CERTIFIED</span>
                  </div>
                  <span className="telemetry-sub">ISMS Baseline &amp; Risk Treatment Active</span>
                </div>

                <div className="telemetry-card">
                  <span className="telemetry-label">SYSTEM UPTIME TARGET</span>
                  <div className="telemetry-value-row">
                    <span className="telemetry-val">99.9%</span>
                    <span className="telemetry-badge-green">STABLE</span>
                  </div>
                  <span className="telemetry-sub">Zabbix HA &amp; Automated Alerting</span>
                </div>

                <div className="telemetry-card">
                  <span className="telemetry-label">PERIMETER THREAT MITIGATION</span>
                  <div className="telemetry-value-row">
                    <span className="telemetry-val">0</span>
                    <span className="telemetry-badge-green">BREACHES</span>
                  </div>
                  <span className="telemetry-sub">Fortinet NGFW + AWS WAF Active Block</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ArchitectureConsole
