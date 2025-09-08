// Seleção de elementos
const accordionButtons = document.querySelectorAll('.practices__toggle');
const checkboxes = document.querySelectorAll('.practices__checkbox');
const progressPercentage = document.getElementById('progress-percentage');
const progressFill = document.querySelector('.practices__progress-fill');

// Estado da aplicação
let practicesState = {};

// Carregar estado salvo
function loadSavedState() {
    const saved = localStorage.getItem('practicesProgress');
    if (saved) {
        practicesState = JSON.parse(saved);
        updateCheckboxes();
        updateProgress();
    }
}

// Atualizar checkboxes com estado salvo
function updateCheckboxes() {
    checkboxes.forEach(checkbox => {
        const practice = checkbox.dataset.practice;
        if (practicesState[practice]) {
            checkbox.checked = true;
        }
    });
}

// Calcular e atualizar progresso
function updateProgress() {
    const total = checkboxes.length;
    const checked = Object.values(practicesState).filter(value => value).length;
    const percentage = Math.round((checked / total) * 100);
    
    progressPercentage.textContent = `${percentage}%`;
    progressFill.style.width = `${percentage}%`;
}

// Manipular cliques nos acordeões
function handleAccordionClick(event) {
    const button = event.currentTarget;
    const targetId = button.dataset.target;
    const content = document.getElementById(targetId);
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    
    // Fechar outros painéis
    accordionButtons.forEach(btn => {
        if (btn !== button) {
            btn.setAttribute('aria-expanded', 'false');
            const otherContent = document.getElementById(btn.dataset.target);
            otherContent.hidden = true;
        }
    });
    
    // Alternar painel atual
    button.setAttribute('aria-expanded', !isExpanded);
    content.hidden = isExpanded;
}

// Manipular mudanças nos checkboxes
function handleCheckboxChange(event) {
    const checkbox = event.target;
    const practice = checkbox.dataset.practice;
    
    practicesState[practice] = checkbox.checked;
    localStorage.setItem('practicesProgress', JSON.stringify(practicesState));
    
    updateProgress();
}

// Event Listeners
accordionButtons.forEach(button => {
    button.addEventListener('click', handleAccordionClick);
});

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', handleCheckboxChange);
});

// Gerenciamento de foco
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Fechar acordeão ativo
        const activeButton = document.querySelector('.practices__toggle[aria-expanded="true"]');
        if (activeButton) {
            activeButton.click();
            activeButton.focus();
        }
    }
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    loadSavedState();
});
