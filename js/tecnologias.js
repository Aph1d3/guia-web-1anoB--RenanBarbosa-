// Dados das tecnologias para o modal
const techDetails = {
    'react': {
        title: 'React',
        whenToChoose: [
            'Desenvolvimento de aplicações de grande escala com múltiplos estados',
            'Projetos que necessitam de uma base de código manutenível e testável',
            'Quando há necessidade de uma comunidade forte e grande ecossistema'
        ],
        resources: [
            { name: 'Documentação Oficial', url: 'https://reactjs.org/docs' },
            { name: 'React DevTools', url: 'https://chrome.google.com/webstore/detail/react-developer-tools' },
            { name: 'Create React App', url: 'https://create-react-app.dev' }
        ]
    },
    'vue': {
        title: 'Vue.js',
        whenToChoose: [
            'Projetos que precisam de uma curva de aprendizado suave',
            'Aplicações que requerem excelente performance e tamanho reduzido',
            'Quando se deseja uma estrutura mais opinativa mas flexível'
        ],
        resources: [
            { name: 'Documentação Oficial', url: 'https://vuejs.org/guide' },
            { name: 'Vue CLI', url: 'https://cli.vuejs.org' },
            { name: 'Vue DevTools', url: 'https://devtools.vuejs.org' }
        ]
    },
    'angular': {
        title: 'Angular',
        whenToChoose: [
            'Desenvolvimento de aplicações empresariais de grande porte',
            'Projetos que necessitam de uma estrutura robusta e opinativa',
            'Quando a equipe já tem experiência com TypeScript'
        ],
        resources: [
            { name: 'Documentação Oficial', url: 'https://angular.io/docs' },
            { name: 'Angular CLI', url: 'https://cli.angular.io' },
            { name: 'Angular Material', url: 'https://material.angular.io' }
        ]
    },
    'nodejs': {
        title: 'Node.js',
        whenToChoose: [
            'Desenvolvimento de aplicações backend escaláveis e em tempo real',
            'APIs RESTful com alta performance e baixa latência',
            'Quando se deseja usar JavaScript no backend'
        ],
        resources: [
            { name: 'Documentação Oficial', url: 'https://nodejs.org/docs' },
            { name: 'Express.js', url: 'https://expressjs.com' },
            { name: 'Node Package Manager', url: 'https://www.npmjs.com' }
        ]
    },
    'django': {
        title: 'Python/Django',
        whenToChoose: [
            'Desenvolvimento rápido de aplicações web com admin integrado',
            'Projetos que necessitam de ORM robusto e migrations',
            'Quando segurança e autenticação são prioridades'
        ],
        resources: [
            { name: 'Documentação Django', url: 'https://docs.djangoproject.com' },
            { name: 'Django REST framework', url: 'https://www.django-rest-framework.org' },
            { name: 'Django Packages', url: 'https://djangopackages.org' }
        ]
    },
    'spring': {
        title: 'Java/Spring',
        whenToChoose: [
            'Desenvolvimento de aplicações empresariais robustas',
            'Projetos que requerem integrações complexas e microsserviços',
            'Quando se precisa de um ecossistema maduro e testado'
        ],
        resources: [
            { name: 'Spring.io', url: 'https://spring.io' },
            { name: 'Spring Initializr', url: 'https://start.spring.io' },
            { name: 'Baeldung', url: 'https://www.baeldung.com' }
        ]
    },
    'mysql': {
        title: 'MySQL',
        whenToChoose: [
            'Aplicações com estrutura de dados relacional bem definida',
            'Projetos que necessitam de um banco de dados confiável e maduro',
            'Quando se precisa de uma solução open-source robusta'
        ],
        resources: [
            { name: 'Documentação MySQL', url: 'https://dev.mysql.com/doc' },
            { name: 'MySQL Workbench', url: 'https://www.mysql.com/products/workbench' },
            { name: 'W3Schools MySQL', url: 'https://www.w3schools.com/mysql' }
        ]
    },
    'postgresql': {
        title: 'PostgreSQL',
        whenToChoose: [
            'Aplicações que necessitam de recursos avançados como JSON e arrays',
            'Projetos que precisam de extensibilidade e tipos personalizados',
            'Quando performance e confiabilidade são cruciais'
        ],
        resources: [
            { name: 'Documentação PostgreSQL', url: 'https://www.postgresql.org/docs' },
            { name: 'pgAdmin', url: 'https://www.pgadmin.org' },
            { name: 'PostgreSQL Tutorial', url: 'https://www.postgresqltutorial.com' }
        ]
    },
    'mongodb': {
        title: 'MongoDB',
        whenToChoose: [
            'Aplicações com estrutura de dados flexível e dinâmica',
            'Projetos que precisam de escalabilidade horizontal',
            'Quando se trabalha principalmente com dados em formato JSON'
        ],
        resources: [
            { name: 'Documentação MongoDB', url: 'https://docs.mongodb.com' },
            { name: 'MongoDB Atlas', url: 'https://www.mongodb.com/cloud/atlas' },
            { name: 'MongoDB University', url: 'https://university.mongodb.com' }
        ]
    },
    'docker': {
        title: 'Docker',
        whenToChoose: [
            'Projetos que necessitam de ambientes consistentes e isolados',
            'Desenvolvimento de aplicações com múltiplos serviços',
            'Quando se precisa de deploy simplificado e escalável'
        ],
        resources: [
            { name: 'Documentação Docker', url: 'https://docs.docker.com' },
            { name: 'Docker Hub', url: 'https://hub.docker.com' },
            { name: 'Docker Compose', url: 'https://docs.docker.com/compose' }
        ]
    }
}
};

// Seleção de elementos DOM
const filterButtons = document.querySelectorAll('.filters__button');
const searchInput = document.querySelector('.filters__search-input');
const searchClearButton = document.querySelector('.filters__search-clear');
const techCards = document.querySelectorAll('.tech-card');
const modal = document.querySelector('.modal');
const modalTitle = modal.querySelector('.modal__title');
const modalList = modal.querySelector('.modal__list');
const modalResources = modal.querySelector('.modal__resources');
const modalCloseButton = modal.querySelector('.modal__close');
const detailButtons = document.querySelectorAll('.tech-card__details-btn');

// Estado da aplicação
let activeFilters = new Set();
let searchTerm = '';

// Funções auxiliares
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Gerenciamento de filtros
function toggleFilter(button) {
    const category = button.dataset.category;
    const isPressed = button.getAttribute('aria-pressed') === 'true';
    
    button.setAttribute('aria-pressed', !isPressed);
    
    if (isPressed) {
        activeFilters.delete(category);
    } else {
        activeFilters.add(category);
    }
    
    updateCardVisibility();
}

// Gerenciamento de busca
function handleSearch() {
    searchTerm = searchInput.value.toLowerCase();
    searchClearButton.hidden = !searchTerm;
    updateCardVisibility();
}

function clearSearch() {
    searchInput.value = '';
    searchTerm = '';
    searchClearButton.hidden = true;
    updateCardVisibility();
}

// Atualização da visibilidade dos cards
function updateCardVisibility() {
    techCards.forEach(card => {
        const category = card.dataset.category;
        const title = card.querySelector('.tech-card__title').textContent.toLowerCase();
        const description = card.querySelector('.tech-card__description').textContent.toLowerCase();
        
        const matchesFilter = activeFilters.size === 0 || activeFilters.has(category);
        const matchesSearch = !searchTerm || 
            title.includes(searchTerm) || 
            description.includes(searchTerm);
        
        card.hidden = !(matchesFilter && matchesSearch);
    });
}

// Gerenciamento do Modal
function openModal(techId) {
    const tech = techDetails[techId];
    if (!tech) return;

    modalTitle.textContent = tech.title;
    
    // Preenche a lista "Quando escolher"
    modalList.innerHTML = tech.whenToChoose
        .map(item => `<li>${item}</li>`)
        .join('');
    
    // Preenche os recursos
    modalResources.innerHTML = tech.resources
        .map(resource => `
            <li>
                <a href="${resource.url}" 
                   target="_blank" 
                   rel="noopener noreferrer">
                    ${resource.name}
                </a>
            </li>
        `)
        .join('');
    
    modal.hidden = false;
    modalCloseButton.focus();
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
}

// Gerenciamento de foco do modal
function trapFocus(event) {
    if (!modal.hidden) {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        if (event.key === 'Tab') {
            if (event.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    event.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    event.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    }
}

// Event Listeners
filterButtons.forEach(button => {
    button.addEventListener('click', () => toggleFilter(button));
});

searchInput.addEventListener('input', debounce(handleSearch, 300));
searchClearButton.addEventListener('click', clearSearch);

detailButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const techId = e.target.closest('.tech-card').dataset.techId;
        openModal(techId);
    });
});

modalCloseButton.addEventListener('click', closeModal);
modal.addEventListener('keydown', trapFocus);

// Fecha o modal ao clicar no overlay
modal.querySelector('.modal__overlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        closeModal();
    }
});

// Fecha o modal com a tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) {
        closeModal();
    }
});

// Preserva o estado dos filtros e busca ao navegar
window.addEventListener('beforeunload', () => {
    const state = {
        activeFilters: Array.from(activeFilters),
        searchTerm
    };
    sessionStorage.setItem('techFiltersState', JSON.stringify(state));
});

// Restaura o estado ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const savedState = sessionStorage.getItem('techFiltersState');
    if (savedState) {
        const { activeFilters: savedFilters, searchTerm: savedSearch } = JSON.parse(savedState);
        
        savedFilters.forEach(category => {
            const button = document.querySelector(`[data-category="${category}"]`);
            if (button) toggleFilter(button);
        });
        
        if (savedSearch) {
            searchInput.value = savedSearch;
            handleSearch();
        }
    }
});
