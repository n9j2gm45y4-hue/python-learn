let currentChapter = null;

function renderCourseList() {
  const ul = document.getElementById("course-list");
  ul.innerHTML = "";
  COURSES.forEach(ch => {
    const li = document.createElement("li");
    li.textContent = ch.title;
    li.dataset.id = ch.id;
    if (Progress.isDone(ch.id)) li.classList.add("done");
    if (currentChapter && currentChapter.id === ch.id) li.classList.add("active");
    li.onclick = () => loadChapter(ch.id);
    ul.appendChild(li);
  });
}

function updateProgressBar() {
  const p = Progress.percent(COURSES.length);
  document.getElementById("progress-bar").style.width = p + "%";
  document.getElementById("progress-text").textContent = p + "%";
}

function loadChapter(chId) {
  const ch = COURSES.find(c => c.id === chId);
  if (!ch) return;
  currentChapter = ch;
  document.getElementById("lesson-body").innerHTML = ch.content;

  const exBox = document.getElementById("exercise-list");
  exBox.innerHTML = "";
  ch.exercises.forEach(ex => {
    const div = document.createElement("div");
    div.className = "ex-item";
    div.innerHTML = `
      <div class="ex-title">${ex.title}</div>
      <div class="ex-desc">${ex.desc}</div>
      <div class="ex-actions">
        <button class="btn-small" data-load="${ex.id}">载入代码</button>
        <button class="btn-small" data-judge="${ex.id}">提交判题</button>
      </div>`;
    div.querySelector("[data-load]").onclick = () => {
      setCode(ex.initialCode);
      window.currentExercise = ex;
    };
    div.querySelector("[data-judge]").onclick = async () => {
      window.currentExercise = ex;
      setCode(ex.initialCode);
      await judgeExercise(ex);
    };
    exBox.appendChild(div);
  });

  if (ch.exercises[0]) {
    window.currentExercise = ch.exercises[0];
    setCode(ch.exercises[0].initialCode);
  }

  Progress.markDone(chId);
  updateProgressBar();
  renderCourseList();
}

window.addEventListener("DOMContentLoaded", async () => {
  Progress.load();
  initEditor("# 在这里写 Python 代码\nprint('Hello')\n");
  renderCourseList();
  updateProgressBar();

  document.getElementById("btn-run").onclick = runCode;
  document.getElementById("btn-judge").onclick = async () => {
    if (window.currentExercise) await judgeExercise(window.currentExercise);
    else alert("请先在中间选择一道练习题");
  };
  document.getElementById("btn-explain").onclick = explainCurrent;
  document.getElementById("btn-ai-send").onclick = sendAIMessage;
  document.getElementById("ai-input").addEventListener("keydown", e => {
    if (e.key === "Enter") sendAIMessage();
  });
  document.getElementById("popup-close").onclick = () => {
    document.getElementById("error-popup").classList.add("hidden");
  };
  document.getElementById("btn-error-explain").onclick = explainCurrent;
  document.getElementById("btn-ai-toggle").onclick = () => {
    document.getElementById("ai-panel").classList.toggle("collapsed");
  };

  await detectLocalBridge();
  setInterval(detectLocalBridge, 5000);

  loadChapter(COURSES[0].id);
});
