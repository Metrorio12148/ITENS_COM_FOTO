
// Pasta onde estao as fotos, relativa a este arquivo.
const PASTA_FOTOS = 'fotos/';

function criarItemEl(item) {
    const div = document.createElement('div');
    div.className = 'item';

    const pNome = document.createElement('p');
    pNome.textContent = `Nome do Item: ${item.name}`;

    const img = document.createElement('img');
    img.src = PASTA_FOTOS + item.img;
    img.alt = item.name;
    img.loading = 'lazy';

    const pNum = document.createElement('p');
    pNum.textContent = `Número de Estoque: ${item.num}`;

    div.append(pNome, img, pNum);
    return div;
}

function renderizarItens(lista) {
    const container = document.getElementById('itemsContainer');
    container.innerHTML = '';
    const frag = document.createDocumentFragment();
    lista.forEach(item => frag.appendChild(criarItemEl(item)));
    container.appendChild(frag);

    const contador = document.getElementById('resultCount');
    contador.textContent = `${lista.length} ite${lista.length === 1 ? 'm' : 'ns'} encontrado${lista.length === 1 ? '' : 's'}`;
}

function toggleSearch() {
    const searchInput = document.querySelector('.search-input');
    searchInput.classList.toggle('active');
    if (searchInput.classList.contains('active')) {
        searchInput.focus();
    } else {
        searchInput.value = '';
        renderizarItens(ITEMS);
    }
}

document.querySelector('.search-input').addEventListener('input', function (e) {
    const termo = e.target.value.trim().toLowerCase();
    const filtrados = termo === ''
        ? ITEMS
        : ITEMS.filter(item =>
            item.name.toLowerCase().includes(termo) ||
            item.num.toLowerCase().includes(termo)
        );
    renderizarItens(filtrados);
});

renderizarItens(ITEMS);