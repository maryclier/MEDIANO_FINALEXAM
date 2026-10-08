
<template>
  <div class="app-layout">
    <aside class="sidebar">
      <RouterLink to="/" class="brand">
        <span class="brand-logo">✓</span>
        <span>
          <strong>PersonalTrack</strong>
          <small>ME MANAGEMENT</small>
        </span>
      </RouterLink>

      <p class="menu-label">WORKSPACE</p>

      <nav class="navigation">
        <RouterLink to="/" class="nav-link" exact-active-class="active">
          <span>⌂</span> Dashboard
        </RouterLink>

        <RouterLink to="/tasks" class="nav-link" active-class="active">
          <span>✓</span> My Tasks
        </RouterLink>

        <RouterLink to="/goals" class="nav-link" active-class="active">
          <span>◎</span> My Goals
        </RouterLink>

        <RouterLink to="/daily-logs" class="nav-link" active-class="active">
          <span>▤</span> Daily Logs
        </RouterLink>

        <RouterLink to="/about" class="nav-link" active-class="active">
          <span>ⓘ</span> About
        </RouterLink>
      </nav>

      <div class="sidebar-tip">
        <span class="tip-symbol">✦</span>
        <h3>Keep moving forward!</h3>
        <p>Small steps today create better tomorrows.</p>
      </div>

      <div class="sidebar-footer">PERSONALTRACK ME · V1.0</div>
    </aside>

    <div class="main-area">
      <header class="topbar">
        <div>
          <p class="eyebrow">YOUR PERSONAL WORKSPACE</p>
          <h1>{{ pageTitle }}</h1>
        </div>

        <div class="user-profile">
          <div class="avatar">P</div>
          <div>
            <strong>My Workspace</strong>
            <small>Personal Account</small>
          </div>
        </div>
      </header>

      <main class="page-content">
        <RouterView />
      </main>

      <footer class="app-footer">
        <span>© {{ year }} PersonalTrack Me</span>
        <span>Plan your day. Track your growth.</span>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const year = new Date().getFullYear()

const pageTitle = computed(() => {
  const titles = {
    '/': 'Dashboard',
    '/tasks': 'My Tasks',
    '/goals': 'My Goals',
    '/daily-logs': 'Daily Logs',
    '/about': 'About Project'
  }

  return titles[route.path] || 'PersonalTrack Me'
})
</script>