const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');

const STORAGE_KEY = 'simple_todo.tasks';

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch { return []; }
}

function save(tasks){ localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); }

function render(){
  const tasks = load();
  list.innerHTML = '';
  if(tasks.length===0){ list.innerHTML = '<li class="empty">Список порожній</li>'; return }
  tasks.forEach((t, i)=>{
    const li = document.createElement('li');
    if(t.done) li.classList.add('done');
    const span = document.createElement('span');
    span.textContent = t.text;
    span.style.flex = '1';

    const actions = document.createElement('div');
    actions.className = 'actions';

    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'icon-btn';
    toggleBtn.textContent = t.done? '↺' : '✓';
    toggleBtn.title = 'Позначити виконаним/невиконаним';
    toggleBtn.onclick = ()=>{ tasks[i].done = !tasks[i].done; save(tasks); render(); };

    const delBtn = document.createElement('button');
    delBtn.className = 'icon-btn';
    delBtn.textContent = '🗑';
    delBtn.title = 'Видалити';
    delBtn.onclick = ()=>{ tasks.splice(i,1); save(tasks); render(); };

    actions.appendChild(toggleBtn);
    actions.appendChild(delBtn);

    li.appendChild(span);
    li.appendChild(actions);
    list.appendChild(li);
  });
}

form.addEventListener('submit', e=>{
  e.preventDefault();
  const text = input.value.trim();
  if(!text) return;
  const tasks = load();
  tasks.push({text, done:false});
  save(tasks);
  input.value = '';
  render();
});

// initial render
render();
