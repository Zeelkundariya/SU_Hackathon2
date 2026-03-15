# 🎓 SmartFactory AI: Judges' Technical Exhibit

This guide provides an in-depth look at the internal mechanics, design decisions, and algorithmic logic powering the **SmartFactory AI Command Center**.

---

## 🏗️ 1. Theoretical Architecture & Tech Stack
We've built this system on the **MERN (MongoDB, Express, React, Node)** architecture, augmented with real-time simulation engines to demonstrate industrial scalability.

### Core Stack
- **Frontend (The Neural Interface)**:
  - React 18+ for high-performance state management.
  - **Lucide React** for industrial-grade iconography.
  - **Recharts** for visualizing sub-second production telemetry.
  - Custom **Glassmorphic CSS** system designed for high-contrast "Dark Ops" environments.
- **Backend (The Orchestrator)**:
  - **Node.js + Express**: Handling high-concurrency API requests.
  - **JWT (JSON Web Tokens)**: Securing role-based access for Owners, Managers, and Operators.
  - **Mongoose / MongoDB**: Persistent storage for User identities and Factory metadata.
- **Security**:
  - **Bcrypt.js**: High-entropy password hashing.
  - **Role-Based Middlewares**: Server-side enforcement of data visibility.

---

## 🔁 2. How "Dynamic Data" Works
Judges often ask: *"Is this just a static dashboard?"*
**Answer: No.** We implement a **Persistent World State Drift Engine**.

### The IoT Simulator Architecture
Located in `backend/routes/iotSimulator.js`, the system manages a complex in-memory state representing a living factory.
1.  **Continuous Drift**: Every time the frontend polls the backend, a "Drift Algorithm" calculates slight fluctuations in machine temperature, vibration, yarn tension, and OEE. (e.g., `value + (random * drift_factor)`).
2.  **Telemetry Syncing**: The dashboard performs a **Long-Polling cycle every 2.5 seconds**, syncing over 200 data points across 15 machines simultaneously.
3.  **Cross-Domain Consistency**: The financial, production, and sustainability data points are mathematically linked. If energy consumption increases, the "Profit Margin" dynamically shrinks in the financial charts.

---

## 🧠 3. Advanced Feature Logic (GA & AI)

### The Genetic Algorithm (GA) Scheduler
Our Scheduler doesn't just "sort" jobs. It evolves them:
- **Fitness Function**: `Fitness = (Unit Utilization / Output) * Energy Efficiency`.
- **Logic**: It runs 50+ generations of crossover and mutation to minimize the **Makespan** (total time to finish all jobs).
- **Result**: Viewable in the "EM4 Scheduler" tab, where Gantt charts update as the "AI" find a more optimal path.

### PdM (Predictive Maintenance)
- **Algorithm**: Implements a weighted probability model based on Vibration vs. Temperature thresholds.
- **Critical Alerting**: If vibration exceeds 8.0 m/s², the system automatically flags the machine for "Maintenance" status and triggers a backlog alert.

---

## 🛡️ 4. Role-Based Access Control (RBAC)
We've implemented a tri-tier security model:
1.  **Strategic Owner**: Access to high-level financial arbitrage, Mandi-Pulse AI, and global profitability.
2.  **Plant Manager**: Access to production scheduling, inventory JIT alerts, and worker efficiency.
3.  **Node Operator**: Access to machine-level telemetry, safety compliance, and direct machine overrides.

---

## ❓ 5. FAQ for Evaluators

**Q: Why use Node.js for an industrial backend?**
*A: Node's non-blocking I/O is perfect for handling thousands of simultaneous sensor pings (IoT data) without lagging the main application thread.*

**Q: How do you handle database latency for real-time charts?**
*A: We utilize an **In-Memory Buffer** for telemetry data to ensure sub-10ms response times, while periodically flushing critical audit logs to MongoDB.*

**Q: How is this "Bhilwara-Specific"?**
*A: We've tuned our energy predictors ("Bijli Predictor") for the local power grid surges and inventory logic specifically for textile yarn types (Cotton/Polyester/Dyes) standard in major SME clusters.*

**Q: What happens if a machine actually breaks down?**
*A: The system triggers a "Dynamic Re-route." The GA Scheduler instantly recalculates the entire shift's production path based on the *remaining* functional machines.*

---
**Built by Team Nirvana | SmartFactory Orchestrator v4.0**
