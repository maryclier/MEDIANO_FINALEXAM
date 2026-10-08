
<template>
  <div>
    <div class="page-heading">
      <p class="small-title">STAY ORGANIZED</p>
      <h2>My Tasks</h2>
      <p>Manage your schoolwork, personal activities, and responsibilities.</p>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <span>Total Tasks</span>
        <strong>{{ tasks.length }}</strong>
        <small>All your activities</small>
      </div>
      <div class="stat-card">
        <span>Completed</span>
        <strong>{{ completedCount }}</strong>
        <small>Tasks finished</small>
      </div>
      <div class="stat-card">
        <span>Remaining</span>
        <strong>{{ tasks.length - completedCount }}</strong>
        <small>Tasks to work on</small>
      </div>
    </div>

    <div class="two-column">
      <TaskForm
        :editing-task="editingTask"
        @save="saveTask"
        @cancel="editingTask = null"
      />

      <TaskList
        :tasks="tasks"
        @edit="editingTask = { ...$event }"
        @delete="removeTask"
        @toggle="toggleTask"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import TaskForm from '../components/TaskForm.vue'
import TaskList from '../components/TaskList.vue'
import { useTasks } from '../composables/useTasks'

const { tasks, addTask, updateTask, deleteTask, toggleTask } = useTasks()
const editingTask = ref(null)

const completedCount = computed(
  () => tasks.value.filter(task => task.completed).length
)

function saveTask(task) {
  if (task.id) updateTask(task)
  else addTask(task)

  editingTask.value = null
}

function removeTask(id) {
  if (confirm('Delete this task?')) deleteTask(id)
}
</script>