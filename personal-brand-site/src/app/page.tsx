import DigitalTwinChat from "@/components/DigitalTwinChat";

export default function Home() {
  const strengths = [
    "Data Architecture",
    "Data Analytics",
    "Data Engineering",
    "Program Management",
    "Product Management",
    "People Management",
    "Public Cloud",
    "Agile",
    "Service Operations",
  ];

  const featuredWins = [
    "Led technology design authority for J.P. Morgan Chase's Technology Reference Data product line.",
    "Scaled the data platform from 0 to 2,000+ users serving approximately 2 million API queries per day.",
    "Redesigned the data lake into a data lakehouse to enable advanced capacity analytics use cases.",
    "Drove migration of multiple application workloads to AWS public cloud.",
    "Launched internal services including Data Contracts as a Service, Data Quality as a Service, DataOps Bot, and Data Marketplace.",
    "Awarded multiple patents for innovative product design in data interchange and data contracts.",
  ];

  const experience = [
    {
      role: "Principal Architect (Executive Director)",
      company: "J.P. Morgan Chase",
      period: "2022 - Present (Promoted in 2024)",
      summary:
        "Lead design authority for the Technology Reference Data product line, helping define and execute enterprise data strategy for the IT Infrastructure organization.",
    },
    {
      role: "Product Manager (Vice President)",
      company: "J.P. Morgan Chase",
      period: "2017 - 2022",
      summary:
        "Built and managed IT Infrastructure's data lake product across the complete product development lifecycle.",
    },
    {
      role: "Strategy & Transformation Management (Vice President)",
      company: "J.P. Morgan Chase",
      period: "2013 - 2017",
      summary:
        "Ran firm-wide cross-functional programs focused on data center strategy, infrastructure cost optimization, supply chain optimization, and service operations optimization.",
    },
    {
      role: "Service Operations (Associate)",
      company: "J.P. Morgan Chase",
      period: "2007 - 2011",
      summary: "Managed Level 1 and Level 2 service desk teams.",
    },
    {
      role: "Customer Service (Team Leader)",
      company: "Hewlett Packard",
      period: "2005 - 2007",
      summary:
        "Managed technical teams supporting HP all-in-one and portable devices.",
    },
    {
      role: "Customer Service (Technical Leader)",
      company: "Exl Service",
      period: "2003 - 2005",
      summary: "Technical leader for Dell desktop consumer support.",
    },
  ];

  const certifications = [
    "AWS Solution Architect Associate",
    "Certified Kubernetes Application Developer",
    "Microsoft Certified Azure Fundamentals",
    "Post Graduate Program in Business Analytics (Great Lakes, Chennai)",
    "ITIL v3 Foundation Level",
    "A+",
  ];

  return (
    <main className="site">
      <section className="hero">
        <p className="eyebrow">Principal Architect | Product Leader | APAC Lead</p>
        <h1>Anand Sharma</h1>
        <p className="lead">
          Solution Architect specializing in cloud and data, with 20+ years of
          experience across architecture, product management, transformation,
          and service operations.
        </p>
        <div className="heroActions">
          <a className="button primary" href="mailto:anandmonk213@gmail.com">
            Book a conversation
          </a>
          <a
            className="button secondary"
            href="https://medium.com/@kalpananand.sharma"
            target="_blank"
            rel="noreferrer"
          >
            Read insights on Medium
          </a>
        </div>
        <div className="contactRow">
          <span>Bengaluru, Karnataka, India</span>
          <span>+91 97420 48349</span>
          <span>anandmonk213@gmail.com</span>
        </div>
      </section>

      <section>
        <h2>What I bring</h2>
        <div className="tagGrid">
          {strengths.map((strength) => (
            <span key={strength} className="tag">
              {strength}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h2>Selected impact</h2>
        <ul className="highlightList">
          {featuredWins.map((win) => (
            <li key={win}>{win}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Professional journey</h2>
        <div className="timeline">
          {experience.map((item) => (
            <article key={`${item.role}-${item.period}`} className="card">
              <p className="period">{item.period}</p>
              <h3>{item.role}</h3>
              <p className="company">{item.company}</p>
              <p>{item.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>Certifications</h2>
        <ul className="certList">
          {certifications.map((cert) => (
            <li key={cert}>{cert}</li>
          ))}
        </ul>
      </section>

      <section className="split">
        <article className="card">
          <h2>Education</h2>
          <p>
            <strong>Post Graduate Program in Business Analytics</strong>
            <br />
            Great Lakes, Chennai
          </p>
          <p>
            <strong>B.Tech Computers</strong> (~70% up to 6th semester, dropped
            out)
            <br />
            J.M.I.T Radaur, affiliated to Kurukshetra University
          </p>
          <p>
            AISSCE: 87.2% | AISSE: 86.8% (K.V. Sector 31 Chandigarh, CBSE)
          </p>
        </article>
        <article className="card">
          <h2>Leadership scope</h2>
          <p>
            In addition to architecture leadership, currently serving as APAC
            Lead for the product line, supporting a team of around 70 members.
          </p>
          <p>
            References and deeper case studies are available upon request.
          </p>
        </article>
      </section>

      <DigitalTwinChat />
    </main>
  );
}
