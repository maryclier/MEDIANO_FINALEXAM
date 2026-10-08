
<template>
  <section class="form-card">
    <h3>{{ editingLog ? 'Edit Daily Log' : 'Write a Daily Log' }}</h3>
    <p class="muted">Record your activities, thoughts, and daily progress.</p>

    <form @submit.prevent="submitLog">
      <label>
        Log title
        <input v-model.trim="form.title" required placeholder="e.g. Productive school day" />
      </label>

      <label>
        Date
        <input v-model="form.date" type="date" required />
      </label>

      <label>
        How was your day?
        <select v-model="form.mood">
          <option>Great</option>
          <option>Good</option>
          <option>Okay</option>
          <option>Challenging</option>
        </select>
      </label>

      <label>
        Reflection / Activities
        <textarea
          v-model.trim="form.content"
          required
          placeholder="Write what you did or learned today..."
        ></textarea>
      </label>

      <div class="btn-row">
        <button class="btn btn-primary" type="submit">
          {{ editingLog ? 'Save Changes' : '+ Save Daily Log' }}
        </button>
        <button
          v-if="editingLog"
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
  editingLog: { type: Object, default: null }
})

const emit = defineEmits(['save', 'cancel'])

function today() {
  const now = new Date()
  const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
  return localDate.toISOString().slice(0, 10)
}

const emptyForm = () => ({
  title: '',
  date: today(),
  mood: 'Good',
  content: ''
})

const form = reactive(emptyForm())

watch(() => props.editingLog, (log) => {
  Object.assign(form, emptyForm(), log || {})
}, { immediate: true })

function submitLog() {
  emit('save', {
    ...form,
    ...(props.editingLog ? { id: props.editingLog.id } : {})
  })

  if (!props.editingLog) Object.assign(form, emptyForm())
}
</script>

<style scoped>
.muted {
  color: #8290a4;
  font-size: 12px;
}
</style>