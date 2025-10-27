<template>
    <!-- ===== Header =====  -->
      <Header />

      <!-- ===== Hero Section ===== -->
      <section class="hero">
        <div class="container hero-content">
          <h1>Manage Tickets Easily Across Teams</h1>
          <p>Track, resolve, and organize your tickets with a seamless experience.</p>

          <div class="hero-buttons">
            <RouterLink to="/auth/signup" class="btn primary">Get Started</RouterLink>
            <RouterLink to="/auth/login" class="btn secondary">Login</RouterLink>
          </div>
        </div>

        <!-- Decorative Circles -->
        <div class="circle circle-1"></div>
        <div class="circle circle-2"></div>

        <!-- Wavy SVG Background -->
        <svg
          class="wave"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C360,120 1080,0 1440,80 L1440,120 L0,120 Z"
            fill="#f3f4f6"
          ></path>
        </svg>
      </section>

      <!-- ===== Feature Section ===== -->
      <section class="features">
        <div class="grid">
          <div class="card">
            <h3>💡 Create Tickets</h3>
            <p>Open new issues or requests instantly with a simple form.</p>
          </div>
          <div class="card">
            <h3>📊 Track Progress</h3>
            <p>View real-time ticket statuses and updates on your dashboard.</p>
          </div>
          <div class="card">
            <h3>✅ Resolve Faster</h3>
            <p>Collaborate and close tickets efficiently with your team.</p>
          </div>
        </div>
    </section>
</template>

<script setup>
    import Header from "../components/Header.vue"
</script>

<style setup>
    /* Hero Section */
    .hero {
        position: relative;
        overflow: hidden;
        background: linear-gradient(135deg, #6366f1, #4f46e5);
        color: white;
        text-align: center;
        padding: 6rem 1rem 8rem;
    }

    .hero-content h1 {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 1rem;
    }

    .hero-content p {
        max-width: 600px;
        margin: 0 auto 2rem;
        font-size: 1.1rem;
    }

    .hero-buttons .btn {
        display: inline-block;
        padding: 0.8rem 1.5rem;
        margin: 0.5rem;
        border-radius: 10px;
        font-weight: 600;
        text-decoration: none;
        transition: 0.2s ease;
    }

    .btn.primary {
        background: white;
        color: #4f46e5;
    }

    .btn.secondary {
        border: 2px solid white;
        color: white;
    }

    .btn:hover {
        transform: translateY(-2px);
    }

    /* Circles */
    .circle {
        position: absolute;
        border-radius: 50%;
        opacity: 0.2;
    }

    .circle-1 {
        width: 120px;
        height: 120px;
        background: #fff;
        top: 20%;
        left: 10%;
    }

    .circle-2 {
        width: 200px;
        height: 200px;
        background: #000;
        bottom: 10%;
        right: 5%;
    }

    /* Wave */
    .wave {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
    }

    /* Features */
    .features {
        background: #f3f4f6;
        padding: 4rem 1rem;
    }

    .features .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.5rem;
    }

    .card {
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        padding: 2rem;
        text-align: center;
        transition: 0.2s ease;
    }

    .card:hover {
        transform: translateY(-4px);
    }


    /* Responsive */
    @media (max-width: 768px) {
        .hero-content h1 {
            font-size: 2rem;
        }
        
        .circle-1, .circle-2 {
            display: none;
        }
    }
</style>