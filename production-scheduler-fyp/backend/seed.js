const mongoose = require('mongoose');
const Job = require('./models/Job');
const Machine = require('./models/Machine');

const MONGO_URI = 'mongodb://127.0.0.1:27017/production_scheduler';

const seed = async () => {
  await mongoose.connect(MONGO_URI);
  
  await Job.deleteMany({});
  await Machine.deleteMany({});

  const machines = await Machine.insertMany([
    { machineId: 'M1', machineName: 'Loom #1', status: 'idle', color: '#3b82f6' },
    { machineId: 'M2', machineName: 'Loom #2', status: 'idle', color: '#10b981' },
    { machineId: 'M3', machineName: 'Stenter #1', status: 'idle', color: '#f59e0b' },
  ]);

  await Job.insertMany([
    {
      jobId: 'J1',
      jobName: 'Export Denim #101',
      priority: 5,
      color: '#6366f1',
      operations: [
        { machineId: 'M1', duration: 4, task: 'Warping' },
        { machineId: 'M2', duration: 6, task: 'Weaving' }
      ]
    },
    {
      jobId: 'J2',
      jobName: 'Cotton Batch #202',
      priority: 3,
      color: '#10b981',
      operations: [
        { machineId: 'M2', duration: 8, task: 'Weaving' },
        { machineId: 'M3', duration: 4, task: 'QC' }
      ]
    }
  ]);

  console.log('Seeded successfully!');
  process.exit();
};

seed();
