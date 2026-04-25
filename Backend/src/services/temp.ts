const resume = `
ALEX RIVERA
Backend Engineer | San Francisco, CA | alex.rivera@email.com

SUMMARY
Highly analytical Backend Developer with 2+ years of experience building scalable microservices. Specialized in Node.js and distributed systems.

TECHNICAL SKILLS
- Languages: JavaScript (ES6+), TypeScript, Go, Python
- Backend: Node.js, Express, NestJS, gRPC
- Databases: PostgreSQL, MongoDB, Redis
- Infrastructure: Docker, Kubernetes, AWS (S3, EC2, Lambda)
- Tools: Git, Jenkins, Terraform

PROFESSIONAL EXPERIENCE
CloudScale Systems | Junior Backend Developer | June 2024 – Present
- Migrated a monolithic API to a microservices architecture using NestJS and gRPC, reducing latency by 35%.
- Optimized PostgreSQL queries for a reporting dashboard, improving load times for 1M+ records from 12s to 1.5s.
- Implemented a Redis-based caching layer that decreased primary database load by 40%.

DataFlow Corp | Software Engineering Intern | May 2023 – August 2023
- Developed RESTful APIs for a customer onboarding portal using Node.js and Express.
- Integrated third-party payment gateways (Stripe) and managed webhooks.

PROJECTS
- Distributed Task Queue: Built a custom task scheduler in Go using Redis for message persistence.
- Real-time Chat Engine: Developed a WebSocket-based messaging system supporting up to 5,000 concurrent connections.
`;

const selfDescription = `
I am a backend-focused developer who loves solving "invisible" problems—optimizing database queries and making sure systems don't crash under high load. I have a strong foundation in Node.js and TypeScript, and I've recently been working a lot with Go and Kubernetes. I'm looking for a role where I can contribute to system design and help scale infrastructure for millions of users.
`;

const jobDescription = `
TITLE: Senior Backend Engineer (Node.js/Go)
LOCATION: Remote / Hybrid

THE ROLE:
We are looking for a Senior Backend Engineer to join our Core Infrastructure team. You will be responsible for designing and implementing high-performance APIs and maintaining our distributed systems.

REQUIRED SKILLS:
- 5+ years of experience in Backend Development (Node.js or Go).
- Strong expertise in SQL and NoSQL databases (PostgreSQL, Cassandra).
- Experience with message brokers like Kafka or RabbitMQ.
- Hands-on experience with AWS and Infrastructure as Code (Terraform/CloudFormation).
- Knowledge of system design patterns and microservices architecture.

BONUS POINTS:
- Experience with Rust or C++.
- Contributions to Open Source projects.
- Previous experience in a Fintech or high-growth startup environment.
`;





export default {
    resume,
    selfDescription,
    jobDescription
}