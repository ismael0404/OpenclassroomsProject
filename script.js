document.addEventListener('DOMContentLoaded', function(){
  // année dans le footer
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // menu mobile
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if(toggle && nav){
    toggle.addEventListener('click', ()=>{
      if(getComputedStyle(nav).display === 'none'){
        nav.style.display = 'block';
      } else {
        nav.style.display = '';
      }
    });
  }

  // smooth scroll for anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        const target = document.querySelector(href);
        if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
        // close mobile nav after click
        if(getComputedStyle(nav).display === 'block' && window.innerWidth<=900){
          nav.style.display = '';
        }
      }
    })
  });

  // formulaire (validation basique)
  const form = document.getElementById('contactForm');
  const resp = document.getElementById('formResponse');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      if(!name || !email || !message){
        if(resp) resp.textContent = 'Veuillez remplir tous les champs.';
        return;
      }
      if(!emailRe.test(email)){
        if(resp) resp.textContent = 'Adresse email invalide.';
        return;
      }
      // simulation d'envoi
      if(resp) resp.textContent = 'Merci — votre message a été envoyé !';
      form.reset();
      setTimeout(()=>{ if(resp) resp.textContent = ''; }, 5000);
    })
  }
});
