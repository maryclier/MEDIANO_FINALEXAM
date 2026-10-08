
<template>
  <section class="form-card">
    <h3>{{ editingTask ? 'Edit Task' : 'Create a Task' }}</h3>
    <p class="muted">Organize your next activity.</p>

    <form @submit.prevent="submitTask">
      <label>
        Task title
        <input v-model.trim="form.title" required placeholder="e.g. Finish my assignment" />
      </label>

      <label>
        Description
        <textarea v-model.trim="form.description" placeholder="What needs to be done?"></textarea>
      </label>

      <label>
        Due date
        <input v-model="form.dueDate" type="date" />
      </label>

      <label>
        Priority
        <select v-model="form.priority">
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </label>

      <div class="btn-row">
        <button class="btn btn-primary" type="submit">
          {{ editingTask ? 'Save Changes' : '+ Add Task' }}
        </button>
        <button
          v-if="editingTask"
          class="btn btn-secondary"
          type="button"
          @click="$emit('cancel')"
        >
          Cancel
        </button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  editingTask: { type: Object, default: null }
})

const emit = defineEmits(['save', 'cancel'])

const emptyForm = () => ({
  title: '',
  description: '',
  dueDate: '',
  priority: 'Medium'
})

const form = reactive(emptyForm())

watch(() => props.editingTask, (task) => {
  Object.assign(form, emptyForm(), task || {})
}, { immediate: true })

function submitTask() {
  emit('save', {
    ...form,
    ...(props.editingTask ? { id: props.editingTask.id } : {})
  })

  if (!props.editingTask) Object.assign(form, emptyForm())
}
</script>