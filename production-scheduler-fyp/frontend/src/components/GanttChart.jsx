import React from 'react';

const GanttChart = ({ schedule, machines }) => {
  const maxTime = Math.max(...schedule.map(s => s.end), 24);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col">
      <div className="flex justify-between items-center mb-8 shrink-0">
        <h2 className="text-xl font-black text-white flex items-center gap-2">
          Production Timeline
        </h2>
        <div className="flex gap-4 text-[10px] font-black tracking-widest text-slate-500 uppercase">
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> Work Scheduled</div>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto custom-scrollbar relative">
        <div className="min-w-[800px] h-full flex flex-col">
          {/* Time Header */}
          <div className="flex border-b border-slate-800 pb-4 mb-4">
            <div className="w-40 shrink-0"></div>
            <div className="flex-1 flex justify-between px-2">
              {Array.from({ length: 13 }).map((_, i) => (
                <div key={i} className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
                  {i * 2}H
                </div>
              ))}
            </div>
          </div>

          {/* Rows */}
          <div className="flex-1 space-y-3 relative">
            {machines.map(m => (
              <div key={m.machineId} className="flex items-center group relative z-10 h-12">
                <div className="w-40 shrink-0 pr-4">
                  <div className="text-sm font-black text-white truncate uppercase tracking-widest">{m.machineName}</div>
                  <div className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">{m.machineId}</div>
                </div>
                <div className="flex-1 h-10 bg-slate-800/20 rounded-xl relative border border-slate-800/40">
                  {schedule.filter(s => s.machineId === m.machineId).map((task, idx) => (
                    <div
                      key={idx}
                      style={{ 
                        left: `${(task.start / maxTime) * 100}%`,
                        width: `${(task.duration / maxTime) * 100}%`,
                        backgroundColor: task.color + '33',
                        borderLeft: `3px solid ${task.color}`
                      }}
                      className="absolute top-1 bottom-1 rounded-lg flex items-center px-3"
                      title={`${task.jobName} - ${task.task}`}
                    >
                      <span className="text-[9px] font-black text-white uppercase tracking-tighter truncate">{task.jobName}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GanttChart;
