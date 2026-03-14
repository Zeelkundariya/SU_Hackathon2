/**
 * Genetic Algorithm for Job Shop Scheduling
 */
module.exports.optimizeScheduling = ({ jobs, machines }) => {
    const POP_SIZE = 100;
    const GENERATIONS = 150;
    const MUTATION_RATE = 0.15;
    const ELITISM = 0.2;

    if (!jobs || jobs.length === 0 || !machines || machines.length === 0) {
        return { error: "Missing jobs or machines" };
    }

    const evaluate = (chromosome) => {
        const machineNextFreeTime = {};
        const jobNextFreeTime = {};
        const jobOpProgress = {};
        const localSchedule = [];

        chromosome.forEach(jobId => {
            const job = jobs.find(j => j.jobId === jobId);
            const opIdx = jobOpProgress[jobId] || 0;
            const op = job.operations[opIdx];
            if (!op) return;

            const mId = op.machineId;
            const startTime = Math.max(machineNextFreeTime[mId] || 0, jobNextFreeTime[jobId] || 0);
            const endTime = startTime + op.duration;

            machineNextFreeTime[mId] = endTime;
            jobNextFreeTime[jobId] = endTime;
            jobOpProgress[jobId] = opIdx + 1;

            localSchedule.push({
                jobId,
                jobName: job.jobName,
                machineId: mId,
                task: op.task,
                start: startTime,
                duration: op.duration,
                end: endTime,
                color: job.color || "#6366f1"
            });
        });

        const makespan = Math.max(...Object.values(machineNextFreeTime), 0);
        return { makespan, schedule: localSchedule };
    };

    const chromosomeTemplate = [];
    jobs.forEach(job => {
        for (let i = 0; i < job.operations.length; i++) {
            chromosomeTemplate.push(job.jobId);
        }
    });

    const createIndividual = () => {
        return [...chromosomeTemplate].sort((a, b) => {
            const pA = jobs.find(j => j.jobId === a).priority;
            const pB = jobs.find(j => j.jobId === b).priority;
            if (pA !== pB) return (pB - pA) * Math.random();
            return Math.random() - 0.5;
        });
    };

    let population = Array.from({ length: POP_SIZE }, () => createIndividual());
    let bestResult = null;

    for (let gen = 0; gen < GENERATIONS; gen++) {
        const evaluated = population.map(chrom => {
            const result = evaluate(chrom);
            return { chrom, fitness: 10000 / (result.makespan || 1), ...result };
        });

        evaluated.sort((a, b) => b.fitness - a.fitness);

        if (!bestResult || evaluated[0].makespan < bestResult.makespan) {
            bestResult = evaluated[0];
        }

        const survivalCount = Math.floor(POP_SIZE * ELITISM);
        const nextGen = evaluated.slice(0, survivalCount).map(ind => ind.chrom);

        while (nextGen.length < POP_SIZE) {
            const p1 = nextGen[Math.floor(Math.random() * nextGen.length)];
            const p2 = nextGen[Math.floor(Math.random() * nextGen.length)];

            const crossoverPoint = Math.floor(Math.random() * p1.length);
            const child = [...p1.slice(0, crossoverPoint)];
            
            const counts = {};
            child.forEach(id => counts[id] = (counts[id] || 0) + 1);
            
            p2.forEach(id => {
                const maxCount = jobs.find(j => j.jobId === id).operations.length;
                if ((counts[id] || 0) < maxCount) {
                    child.push(id);
                    counts[id] = (counts[id] || 0) + 1;
                }
            });

            if (Math.random() < MUTATION_RATE) {
                const i = Math.floor(Math.random() * child.length);
                const j = Math.floor(Math.random() * child.length);
                [child[i], child[j]] = [child[j], child[i]];
            }
            nextGen.push(child);
        }
        population = nextGen;
    }

    const machineUtilization = {};
    machines.forEach(m => {
        const busyTime = bestResult.schedule
            .filter(op => op.machineId === m.machineId)
            .reduce((acc, op) => acc + op.duration, 0);
        machineUtilization[m.machineId] = parseFloat((busyTime / (bestResult.makespan || 1) * 100).toFixed(1));
    });

    return {
        makespan: bestResult.makespan,
        schedule: bestResult.schedule,
        machineUtilization,
        jobCompletionTimes: jobs.map(j => ({
            jobId: j.jobId,
            jobName: j.jobName,
            completionTime: Math.max(...bestResult.schedule.filter(s => s.jobId === j.jobId).map(s => s.end), 0)
        }))
    };
};
