
<template>
  <section class="list-card">
    <h3>My Task List</h3>
    <p class="muted">{{ tasks.length }} task(s) in total</p>

    <div v-if="tasks.length" class="item-list">
      <article v-for="task in tasks" :key="task.id" class="list-item">
        <div class="task-heading">
          <label class="check-label">
            <input
              type="checkbox"
              :checked="task.completed"
              @change="$emit('toggle', task.id)"
            />
            <span :class="{ completed: task.completed }">{{ task.title }}</span>
          </label>
          <span class="badge">{{ task.priority }}</span>
        </div>

        <p v-if="task.description">{{ task.description }}</p>

        <div class="item-meta">
          <span v-if="task.dueDate">Due: {{ task.dueDate }}</span>
          <span>{{ task.completed ? 'Completed' : 'In progress' }}</span>
        </div>

        <div class="btn-row">
          <button class="btn btn-secondary" @click="$emit('edit', task)">Edit</button>
          <button class="btn btn-danger" @click="$emit('delete', task.id)">Delete</button>
        </div>
      </article>
    </div>

    <div v-else class="empty-state">
      <p>No tasks yet.</p>
      <p>Create your first task using the form.</p>
    </div>
  </section>
</template>

<script setup>
defineProps({
  tasks: { type: Array, default: () => [] }
})

defineEmits(['edit', 'delete', 'toggle'])
</script>

<style scoped>
.muted {
  color: #8290a4;
  font-size: 12px;
}

.task-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.check-label {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 13px;
  font-weight: 700;
}

.check-label input {
  width: auto;
  margin: 0;
}

.completed {
  color: #8290a4;
  text-decoration: line-through;
}
</style>