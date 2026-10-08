
import { ref, watch } from 'vue'

function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem('personaltrack-tasks') || '[]')
  } catch {
    return []
  }
}

const tasks = ref(loadTasks())

watch(tasks, (value) => {
  localStorage.setItem('personaltrack-tasks', JSON.stringify(value))
}, { deep: true })

export function useTasks() {
  function addTask(task) {
    tasks.value.unshift({
      ...task,
      id: `${Date.now()}-${Math.random()}`,
      completed: false
    })
  }

  function updateTask(updatedTask) {
    const index = tasks.value.findIndex(task => task.id === updatedTask.id)

    if (index !== -1) {
      tasks.value[index] = { ...tasks.value[index], ...updatedTask }
    }
  }

  function deleteTask(id) {
    tasks.value = tasks.value.filter(task => task.id !== id)
  }

  function toggleTask(id) {
    const task = tasks.value.find(item => item.id === id)

    if (task) task.completed = !task.completed
  }

  return { tasks, addTask, updateTask, deleteTask, toggleTask }
}