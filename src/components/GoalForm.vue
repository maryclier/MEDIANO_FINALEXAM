
<template>
  <section class="form-card">
    <h3>{{ editingGoal ? 'Edit Goal' : 'Create a Goal' }}</h3>
    <p class="muted">Set a goal and track your progress.</p>

    <form @submit.prevent="submitGoal">
      <label>
        Goal title
        <input v-model.trim="form.title" required placeholder="e.g. Complete my semester project" />
      </label>

      <label>
        Description
        <textarea v-model.trim="form.description" placeholder="Describe your goal"></textarea>
      </label>

      <label>
        Target date
        <input v-model="form.targetDate" type="date" />
      </label>

      <label>
        Progress (0–100%)
        <input v-model.number="form.progress" type="number" min="0" max="100" />
      </label>

      <div class="btn-row">
        <button class="btn btn-primary" type="submit">
          {{ editingGoal ? 'Save Changes' : '+ Add Goal' }}
        </button>
        <button
          v-if="editingGoal"
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
  editingGoal: { type: Object, default: null }
})

const emit = defineEmits(['save', 'cancel'])

const emptyForm = () => ({
  title: '',
  description: '',
  targetDate: '',
  progress: 0
})

const form = reactive(emptyForm())

watch(() => props.editingGoal, (goal) => {
  Object.assign(form, emptyForm(), goal || {})
}, { immediate: true })

function submitGoal() {
  emit('save', {
    ...form,
    progress: Math.min(100, Math.max(0, Number(form.progress) || 0)),
    ...(props.editingGoal ? { id: props.editingGoal.id } : {})
  })

  if (!props.editingGoal) Object.assign(form, emptyForm())
}
</script>

<style scoped>
.muted {
  color: #8290a4;
  font-size: 12px;
}
</style>