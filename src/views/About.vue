
<template>
  <div>
    <div class="page-heading">
      <p class="small-title">ABOUT THIS APPLICATION</p>
      <h2>PersonalTrack Me</h2>
      <p>A personal productivity and self-management application.</p>
    </div>

    <section class="about-hero">
      <div class="about-logo">✓</div>
      <h2>One place for your everyday progress.</h2>
      <p>
        PersonalTrack Me helps you organize tasks, set personal goals,
        and record daily experiences in one convenient workspace.
      </p>
    </section>

    <div class="feature-grid">
      <article class="card">
        <div class="feature-icon">✓</div>
        <h3>Task Management</h3>
        <p>Create tasks, set priorities and due dates, and mark activities as completed.</p>
      </article>

      <article class="card">
        <div class="feature-icon">◎</div>
        <h3>Goal Tracking</h3>
        <p>Set meaningful goals and update your progress as you work toward them.</p>
      </article>

      <article class="card">
        <div class="feature-icon">▤</div>
        <h3>Daily Journaling</h3>
        <p>Record daily activities, moods, reflections, and personal achievements.</p>
      </article>
    </div>

    <section class="card tech-card">
      <h3>Technologies Used</h3>
      <div class="tech-tags">
        <span>Vue 3</span>
        <span>Vue Router</span>
        <span>JavaScript</span>
        <span>CSS</span>
        <span>Local Storage</span>
        <span>Vite</span>
      </div>

      <p class="about-note">
        This version stores information in your browser using Local Storage.
        Clearing the browser's site data may remove your saved entries.
      </p>
    </section>
  </div>
</template>

<style scoped>
.about-hero {
  padding: 38px 25px;
  text-align: center;
  border-radius: 17px;
  color: white;
  background: linear-gradient(120deg, #17243b, #245d53);
}

.about-logo {
  width: 62px;
  height: 62px;
  display: grid;
  place-items: center;
  margin: 0 auto 18px;
  border-radius: 18px;
  color: #17243b;
  background: #68dfb2;
  font-size: 36px;
  font-weight: 800;
}

.about-hero h2 {
  margin: 0 0 12px;
  font-size: 24px;
}

.about-hero p {
  max-width: 590px;
  margin: 0 auto;
  color: #d9e9e4;
  font-size: 13px;
  line-height: 1.8;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 17px;
  margin: 22px 0;
}

.feature-icon {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  color: #168866;
  background: #e1f8ee;
  font-size: 22px;
}

.feature-grid h3 {
  margin: 15px 0 8px;
  font-size: 14px;
}

.feature-grid p,
.about-note {
  color: #8290a4;
  font-size: 12px;
  line-height: 1.8;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin: 18px 0;
}

.tech-tags span {
  padding: 8px 12px;
  border-radius: 8px;
  color: #17694f;
  background: #e5f8ef;
  font-size: 11px;
  font-weight: 700;
}

@media (max-width: 700px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }
}
</style>