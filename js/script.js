const ano = new Date().getFullYear();
document.getElementById("anoAtual").textContent = ano;

document.querySelectorAll("img").forEach(img => {
  if (!img.closest("section:first-of-type")) {
    img.setAttribute("loading", "lazy");
  }
});

document.addEventListener('click', function(evento) {
    const dropdown = document.querySelector('.custom-dropdown');
    if (dropdown) {
        if (!dropdown.contains(evento.target)) {
            dropdown.removeAttribute('open');
        }
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const linksAnimados = document.querySelectorAll('.menu a, .link, .botao-download');

    linksAnimados.forEach(link => {
        link.addEventListener('click', function(event) {
            if (!this.href || this.href.includes('#')) return;

            event.preventDefault(); 
            const destino = this.href;
            const alvo = this.target;

            this.classList.add('clicado');

            setTimeout(() => {
                if (alvo === '_blank') {
                    window.open(destino, '_blank');
                    this.classList.remove('clicado');
                    this.blur();
                } else {
                    window.location.href = destino;
                    // Garante que o efeito suma mesmo se o app/link externo abrir sem recarregar a página
                    setTimeout(() => {
                        this.classList.remove('clicado');
                        this.blur();
                    }, 300);
                }
            }, 400); 
        });
    });
});

function limparEstadoLinks() {
    document.querySelectorAll('.clicado').forEach(el => {
        el.classList.remove('clicado');
        el.blur();
    });
    
    if (document.activeElement) {
        document.activeElement.blur();
    }
}

window.addEventListener('pageshow', () => {
    limparEstadoLinks();
    document.body.style.pointerEvents = 'none';
    setTimeout(() => {
        document.body.style.pointerEvents = '';
    }, 100);
});

window.addEventListener('focus', limparEstadoLinks);
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        limparEstadoLinks();
    }
});