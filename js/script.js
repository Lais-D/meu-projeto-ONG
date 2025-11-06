// script.js - hamburger, toast, modal, validação do form
document.addEventListener('DOMContentLoaded', function() {
    
    const btn = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav-list');
    if (btn && nav) {
        btn.addEventListener('click', () => {
            nav.classList.toggle('nav-open');
            btn.setAttribute('aria-expanded', nav.classList.contains('nav-open') ? 'true' : 'false');
         
        });
    }

    // fecha menu ao clicar fora (mobile)
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.header') && !!e.target.closest('.hamburger')) {

            if (nav && nav.classList.contains('nav-open')) {
             nav.classList.remove('nav-open');
        }
        if (btn) {
            btn.setAttribute('aria-expanded', 'false');
        }
      }
    });

    /* --- Toast helper --- */
    window.showToast = function(message, type = 'info', timeout = 3500) {
        const t = document.createElement('div');
        t.className = 'toast ' + type;
        t.textContent = message;
        document.body.appendChild(t);

        requestAnimationFrame(() => t.classList.add('show'));
        setTimeout(() => {
            t.classList.remove('show');
            setTimeout(() => t.remove(), 300);
        }, timeout);
        return t;
    };

    /* --- Modal helper --- */
    window.openModal = function(htmlContent) {
        let backdrop = document.querySelector('.modal-backdrop');
        if (!backdrop) {
            backdrop = document.createElement('div'); backdrop.className = 'modal-backdrop';
            const modal = document.createElement('div'); 
            modal.className = 'modal';
            modal.setAttribute('role', 'dialog');
            modal.setAttribute('aria-modal', 'true');
            backdrop.appendChild(modal);
            document.body.appendChild(backdrop);
            backdrop.addEventListener('click', (ev) => {
                if (ev.target === backdrop) backdrop.classList.remove('show');
            });
        }
        backdrop.querySelector('.modal').innerHTML = htmlContent;
        backdrop.classList.add('show');
    };

    /* --- Validação nativa --- */
    const form = document.getElementById('form-cadastro');
    if (form) {
        form.addEventListener('submit', function(e){
            // permite mensagens nativas
            if (!form.checkValidity()) {
                // deixa o navegador mostrar mensagens nativas
                form.reportValidity();
                e.preventDefault();
                showToast('Por favor corrija os campos em destaque', 'error', 3000);
                return;
            }
            e.preventDefault(); // prevenir envio real
            showToast('Cadastro enviado com sucesso!', 'success', 2800);
            form.reset();
        });
    }

});
