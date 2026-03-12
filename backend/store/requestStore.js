/**
 * In-Memory Request Store
 * Replaces MongoDB for AIRequest so owner requests always work,
 * even when MongoDB is not running.
 * Uses Node.js built-in crypto — no extra dependencies needed.
 */

const { randomUUID } = require("crypto");

let requests = [];

const RequestStore = {
  create({ agentName, requestType, details }) {
    const doc = {
      _id: randomUUID(),
      agentName,
      requestType,
      details,
      status: "Pending",
      timestamp: new Date(),
    };
    requests.unshift(doc);
    console.log(`[RequestStore] Created: ${requestType} by ${agentName}`);
    return doc;
  },

  findAll() {
    return [...requests].sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );
  },

  findById(id) {
    return requests.find((r) => r._id === id) || null;
  },

  updateStatus(id, status) {
    const req = requests.find((r) => r._id === id);
    if (req) {
      req.status = status;
      console.log(`[RequestStore] Updated ${id} → ${status}`);
    }
    return req || null;
  },
};

module.exports = RequestStore;
