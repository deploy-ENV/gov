import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, UploadCloud, CheckCircle, Trash2, Calendar, FileText } from 'lucide-react';

function TaskInputRow({ task, onChange, onDelete, error, canDelete }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-3 items-center mb-2">
      <input
        className={`bg-slate-800/40 backdrop-blur-sm text-white p-3 rounded-lg border ${error?.desc ? 'border-red-400' : 'border-slate-700'} col-span-3 focus:ring-2 focus:ring-cyan-400/30`}
        placeholder="Task Description"
        value={task.desc}
        onChange={e => onChange('desc', e.target.value)}
        required
      />
      <div className="flex items-center col-span-2">
        <span className="text-cyan-400 mr-1">₹</span>
        <input
          type="number"
          className={`bg-slate-800/40 backdrop-blur-sm text-white p-3 rounded-lg border w-full ${error?.amount ? 'border-red-400' : 'border-slate-700'} focus:ring-2 focus:ring-cyan-400/30`}
          placeholder="Amount"
          value={task.amount}
          onChange={e => onChange('amount', e.target.value)}
          required
        />
      </div>
      {canDelete && (
        <button type="button" onClick={onDelete} className="text-red-400 hover:bg-red-500/10 rounded-lg p-2 ml-1" aria-label="Delete Task">
          <Trash2 size={20} />
        </button>
      )}
    </div>
  );
}

export default function FundRequestForm() {
  const [tasks, setTasks] = useState([{ desc: '', amount: '' }]);
  const [labor, setLabor] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [file, setFile] = useState(null);
  const [comments, setComments] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleTaskChange = (idx, field, value) => {
    setTasks(tsk => tsk.map((t, i) => i === idx ? { ...t, [field]: value } : t));
  };
  const addTask = () => setTasks(tsk => [...tsk, { desc: '', amount: '' }]);
  const deleteTask = idx => setTasks(tsk => tsk.length === 1 ? tsk : tsk.filter((_, i) => i !== idx));
  const handleFile = e => setFile(e.target.files[0]);

  const validate = () => {
    const errs = {};
    errs.tasks = tasks.map(t => ({ desc: !t.desc ? 'Required' : '', amount: !t.amount ? 'Required' : '' }));
    if (errs.tasks.some(e => e.desc || e.amount)) errs.tasksError = true;
    if (!labor) errs.labor = 'Required';
    if (!start) errs.start = 'Required';
    if (!end) errs.end = 'Required';
    return errs;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0 && (errs.tasksError || errs.labor || errs.start || errs.end)) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTasks([{ desc: '', amount: '' }]);
      setLabor('');
      setStart('');
      setEnd('');
      setFile(null);
      setComments('');
      setErrors({});
      setTimeout(() => setSuccess(false), 2000);
    }, 1200);
  };

  return (
    <div className="h-full w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-slate-800/40 backdrop-blur-sm text-white w-full h-full p-12 rounded-xl border border-slate-700 shadow-xl">
        <div className="text-2xl font-bold text-cyan-400 mb-6">Request Fund Disbursement</div>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <div className="font-semibold text-cyan-400 mb-2">Task Breakdown <span className="text-red-400">*</span></div>
            {tasks.map((task, i) => (
              <TaskInputRow
                key={i}
                task={task}
                onChange={(field, value) => handleTaskChange(i, field, value)}
                onDelete={() => deleteTask(i)}
                error={errors.tasks ? errors.tasks[i] : {}}
                canDelete={tasks.length > 1}
              />
            ))}
            <button type="button" onClick={addTask} className="flex items-center gap-1 px-3 py-2 rounded bg-cyan-600 hover:bg-cyan-500 text-white mt-2">
              <Plus size={16} /> Add Task
            </button>
            {errors.tasksError && <div className="text-red-400 text-xs mt-1">All tasks must have description and amount.</div>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold text-cyan-400 mb-1">Estimated Labor Cost (₹) <span className="text-red-400">*</span></label>
              <input
                type="number"
                className={`bg-slate-800/40 backdrop-blur-sm text-white w-full p-3 rounded-lg border ${errors.labor ? 'border-red-400' : 'border-slate-700'} focus:ring-2 focus:ring-cyan-400/30`}
                placeholder="Enter labor cost"
                value={labor}
                onChange={e => setLabor(e.target.value)}
                required
              />
              {errors.labor && <span className="text-red-400 text-xs">{errors.labor}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold text-cyan-400 mb-1">Expected Work Duration <span className="text-red-400">*</span></label>
              <div className="flex gap-2 items-center">
                <Calendar className="text-cyan-400" size={18} />
                <input
                  type="date"
                  className={`bg-slate-800/40 backdrop-blur-sm text-white p-3 rounded-lg border ${errors.start ? 'border-red-400' : 'border-slate-700'} focus:ring-2 focus:ring-cyan-400/30`}
                  value={start}
                  onChange={e => setStart(e.target.value)}
                  required
                />
                <span className="mx-2 text-slate-400">to</span>
                <input
                  type="date"
                  className={`bg-slate-800/40 backdrop-blur-sm text-white p-3 rounded-lg border ${errors.end ? 'border-red-400' : 'border-slate-700'} focus:ring-2 focus:ring-cyan-400/30`}
                  value={end}
                  onChange={e => setEnd(e.target.value)}
                  required
                />
              </div>
              {(errors.start || errors.end) && <span className="text-red-400 text-xs">Start and end dates required.</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold text-cyan-400 mb-1">Supporting Documents (PDF/Image)</label>
              <label className="flex flex-col items-center px-6 py-8 bg-slate-800/40 backdrop-blur-sm border-2 border-dashed border-cyan-400/30 rounded-xl cursor-pointer hover:shadow-lg">
                <FileText className="text-cyan-400 mb-2" size={28} />
                <span className="text-cyan-400 font-medium mb-2">Click or drag to upload</span>
                <input type="file" accept=".pdf,image/*" className="hidden" onChange={handleFile} />
                {file && <span className="text-slate-300 mt-2">{file.name}</span>}
              </label>
            </div>
            <div>
              <label className="block font-semibold text-cyan-400 mb-1">Comments or Notes</label>
              <textarea
                className="bg-slate-800/40 backdrop-blur-sm text-white w-full p-3 rounded-lg border border-slate-700 focus:ring-2 focus:ring-cyan-400/30"
                placeholder="Any additional notes (optional)"
                value={comments}
                onChange={e => setComments(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full h-14 text-lg rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold shadow-lg flex items-center gap-2 justify-center"
              disabled={loading}
            >
              {loading ? <span className="loader border-t-2 border-b-2 border-white w-5 h-5 rounded-full animate-spin" /> : 'Submit Fund Request'}
            </button>
          </div>
        </form>

        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.4 }}
              className="fixed left-1/2 -translate-x-1/2 bottom-8 bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-xl flex items-center gap-2 z-50"
            >
              <CheckCircle className="text-white" size={24} />
              <span>Fund request submitted for verification.</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
