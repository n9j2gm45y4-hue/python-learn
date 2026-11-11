const Progress = {
  KEY: "py_learn_progress",
  data: {},
  load() {
    try { this.data = JSON.parse(localStorage.getItem(this.KEY)) || {}; }
    catch { this.data = {}; }
  },
  save() { localStorage.setItem(this.KEY, JSON.stringify(this.data)); },
  markDone(chId) { this.data[chId] = true; this.save(); },
  isDone(chId) { return !!this.data[chId]; },
  percent(total) {
    const done = Object.keys(this.data).filter(k => this.data[k]).length;
    return total ? Math.round(done / total * 100) : 0;
  }
};
window.Progress = Progress;
