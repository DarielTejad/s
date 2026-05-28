/* ============================================
   NOVA - Dashboard Application Scripts
   API Integration & Interactivity
   ============================================ */

// ============ CONFIG ============
const CONFIG = {
    API_URL: 'http://104.243.47.215:25565',
    REDIRECT_LOGIN: '/privacy/index.html',
    LS_TOKEN: 'nova_access_token',
    LS_USER: 'nova_user',
    ENDPOINTS: {
        posts: '/api/posts',
        stories: '/api/stories',
        conversations: '/api/conversations',
        userStats: '/api/user/stats',
    },
};

// ============ STATE MANAGEMENT ============
const AppState = {
    user: null,
    token: null,
    posts: [],
    stories: [],
    conversations: [],
    stats: {
        postsCount: 0,
        followersCount: 0,
        followingCount: 0,
    },
    isLoading: true,
    apiError: false,
};

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

async function initApp() {
    try {
        // 1. Verificar autenticación
        if (!checkAuthentication()) {
            return;
        }

        // 2. Cargar datos de usuario del localStorage
        loadUserData();

        // 3. Inyectar datos de usuario en UI
        injectUserData();

        // 4. Cargar datos de la API
        await loadAppData();

        // 5. Renderizar contenido
        renderStories();
        renderFeed();
        renderStats();
        renderConversations();

        // 6. Configurar event listeners
        setupEventListeners();

        AppState.isLoading = false;
    } catch (error) {
        console.error('Error during app initialization:', error);
        AppState.isLoading = false;
    }
}

// ============ AUTHENTICATION CHECK ============
function checkAuthentication() {
    const token = localStorage.getItem(CONFIG.LS_TOKEN);
    const user = localStorage.getItem(CONFIG.LS_USER);

    if (!token || !user) {
        console.warn('No authentication token found. Redirecting to login.');
        window.location.href = CONFIG.REDIRECT_LOGIN;
        return false;
    }

    AppState.token = token;
    AppState.user = JSON.parse(user);
    return true;
}

// ============ USER DATA LOADING ============
function loadUserData() {
    try {
        const userStr = localStorage.getItem(CONFIG.LS_USER);
        if (userStr) {
            AppState.user = JSON.parse(userStr);
        }
    } catch (error) {
        console.error('Error parsing user data:', error);
    }
}

// ============ INJECT USER DATA INTO UI ============
function injectUserData() {
    if (!AppState.user) return;

    const { display_name, username, avatar_url } = AppState.user;

    // Update sidebar footer
    const userDisplayName = document.getElementById('userDisplayName');
    const userUsername = document.getElementById('userUsername');
    const userAvatarFooter = document.getElementById('userAvatarFooter');
    const userAvatarCreate = document.getElementById('userAvatarCreate');

    if (userDisplayName) userDisplayName.textContent = display_name || 'Usuario';
    if (userUsername) userUsername.textContent = `@${username || 'usuario'}`;

    if (avatar_url) {
        if (userAvatarFooter) userAvatarFooter.src = avatar_url;
        if (userAvatarCreate) userAvatarCreate.src = avatar_url;
    }
}

// ============ API DATA LOADING ============
async function loadAppData() {
    try {
        // Cargar posts
        await fetchPosts();

        // Cargar historias
        await fetchStories();

        // Cargar conversaciones
        await fetchConversations();

        // Cargar estadísticas
        await fetchUserStats();
    } catch (error) {
        console.error('Error loading app data:', error);
        AppState.apiError = true;
        loadMockData();
    }
}

// ============ FETCH FUNCTIONS ============
async function fetchWithAuth(endpoint) {
    try {
        const response = await fetch(`${CONFIG.API_URL}${endpoint}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${AppState.token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching from ${endpoint}:`, error);
        throw error;
    }
}

async function fetchPosts() {
    try {
        const data = await fetchWithAuth(CONFIG.ENDPOINTS.posts);
        AppState.posts = Array.isArray(data) ? data : data.posts || [];
    } catch (error) {
        console.warn('Failed to fetch posts, will use mock data');
        AppState.apiError = true;
    }
}

async function fetchStories() {
    try {
        const data = await fetchWithAuth(CONFIG.ENDPOINTS.stories);
        AppState.stories = Array.isArray(data) ? data : data.stories || [];
    } catch (error) {
        console.warn('Failed to fetch stories, will use mock data');
        AppState.apiError = true;
    }
}

async function fetchConversations() {
    try {
        const data = await fetchWithAuth(CONFIG.ENDPOINTS.conversations);
        AppState.conversations = Array.isArray(data) ? data : data.conversations || [];
    } catch (error) {
        console.warn('Failed to fetch conversations, will use mock data');
        AppState.apiError = true;
    }
}

async function fetchUserStats() {
    try {
        const data = await fetchWithAuth(CONFIG.ENDPOINTS.userStats);
        AppState.stats = {
            postsCount: data.posts_count || 0,
            followersCount: data.followers_count || 0,
            followingCount: data.following_count || 0,
        };
    } catch (error) {
        console.warn('Failed to fetch user stats, will use default values');
        AppState.apiError = true;
    }
}

// ============ MOCK DATA ============
function loadMockData() {
    AppState.posts = [
        {
            id: 1,
            author: {
                id: 101,
                username: 'alexa_dev',
                display_name: 'Alexa Rodriguez',
                avatar_url: 'https://i.pravatar.cc/150?img=1',
            },
            caption: '🚀 Just launched my new project! Feeling excited about this one. The feedback from the beta testers has been amazing so far.',
            created_at: new Date(Date.now() - 2 * 60 * 60 * 1000),
            likes_count: 234,
            comments_count: 45,
            is_liked: false,
            is_saved: false,
            media: [
                {
                    id: 1,
                    url: 'https://images.unsplash.com/photo-1633356122544-f134324331cd?w=600&h=400&fit=crop',
                    type: 'image',
                },
            ],
        },
        {
            id: 2,
            author: {
                id: 102,
                username: 'john_design',
                display_name: 'John Designer',
                avatar_url: 'https://i.pravatar.cc/150?img=2',
            },
            caption: 'Working on a new UI design system. Simplicity and elegance are key. What do you think?',
            created_at: new Date(Date.now() - 4 * 60 * 60 * 1000),
            likes_count: 567,
            comments_count: 89,
            is_liked: false,
            is_saved: false,
            media: [
                {
                    id: 2,
                    url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
                    type: 'image',
                },
            ],
        },
        {
            id: 3,
            author: {
                id: 103,
                username: 'sarah_tech',
                display_name: 'Sarah Chen',
                avatar_url: 'https://i.pravatar.cc/150?img=3',
            },
            caption: 'Just attended the most inspiring tech conference! Met so many amazing people and learned a ton.',
            created_at: new Date(Date.now() - 6 * 60 * 60 * 1000),
            likes_count: 445,
            comments_count: 62,
            is_liked: false,
            is_saved: false,
            media: [
                {
                    id: 3,
                    url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
                    type: 'image',
                },
            ],
        },
    ];

    AppState.stories = [
        {
            id: 1,
            author: {
                username: 'alexa_dev',
                display_name: 'Alexa',
                avatar_url: 'https://i.pravatar.cc/150?img=1',
            },
            is_active: true,
        },
        {
            id: 2,
            author: {
                username: 'john_design',
                display_name: 'John',
                avatar_url: 'https://i.pravatar.cc/150?img=2',
            },
            is_active: true,
        },
        {
            id: 3,
            author: {
                username: 'sarah_tech',
                display_name: 'Sarah',
                avatar_url: 'https://i.pravatar.cc/150?img=3',
            },
            is_active: false,
        },
        {
            id: 4,
            author: {
                username: 'michael_dev',
                display_name: 'Michael',
                avatar_url: 'https://i.pravatar.cc/150?img=4',
            },
            is_active: true,
        },
        {
            id: 5,
            author: {
                username: 'emma_design',
                display_name: 'Emma',
                avatar_url: 'https://i.pravatar.cc/150?img=5',
            },
            is_active: false,
        },
    ];

    AppState.conversations = [
        {
            id: 1,
            user: {
                username: 'alexa_dev',
                display_name: 'Alexa Rodriguez',
                avatar_url: 'https://i.pravatar.cc/150?img=1',
            },
            last_message: 'Hey! How are you?',
            is_online: true,
        },
        {
            id: 2,
            user: {
                username: 'john_design',
                display_name: 'John Designer',
                avatar_url: 'https://i.pravatar.cc/150?img=2',
            },
            last_message: 'Check out the new designs...',
            is_online: false,
        },
        {
            id: 3,
            user: {
                username: 'sarah_tech',
                display_name: 'Sarah Chen',
                avatar_url: 'https://i.pravatar.cc/150?img=3',
            },
            last_message: 'Thanks for the feedback!',
            is_online: true,
        },
    ];

    AppState.stats = {
        postsCount: 42,
        followersCount: 1250,
        followingCount: 384,
    };

    showApiErrorMessage();
}

// ============ RENDER FUNCTIONS ============
function renderStories() {
    const container = document.getElementById('storiesContainer');
    if (!container) return;

    const stories = AppState.stories.length > 0 ? AppState.stories : [];

    if (stories.length === 0) {
        container.innerHTML = '<p style="color: var(--color-text-secondary);">No hay historias disponibles</p>';
        return;
    }

    container.innerHTML = stories
        .map((story) => {
            const author = story.author || {};
            return `
            <div class="story-avatar" style="position: relative;">
                ${story.is_active ? '<div class="story-avatar-ring"></div>' : ''}
                <img src="${author.avatar_url || 'https://via.placeholder.com/64'}" alt="${author.display_name}">
            </div>
            <div class="story-name">${author.display_name || 'Usuario'}</div>
        `;
        })
        .join('');
}

function renderFeed() {
    const container = document.getElementById('feedContainer');
    if (!container) return;

    // Limpiar skeleton loaders
    container.innerHTML = '';

    const posts = AppState.posts.length > 0 ? AppState.posts : [];

    if (posts.length === 0) {
        container.innerHTML = '<p style="color: var(--color-text-secondary);">No hay publicaciones disponibles</p>';
        return;
    }

    container.innerHTML = posts
        .map((post) => createPostElement(post))
        .join('');

    // Agregar event listeners a los botones de acciones
    attachPostEventListeners();
}

function createPostElement(post) {
    const author = post.author || {};
    const timeAgo = getTimeAgo(post.created_at);
    const mediaHtml = post.media && post.media.length > 0
        ? `<div class="post-media">
             <img src="${post.media[0].url}" alt="Post media">
           </div>`
        : '';

    return `
        <div class="post-card" data-post-id="${post.id}">
            <div class="post-header">
                <div class="user-avatar small">
                    <img src="${author.avatar_url || 'https://via.placeholder.com/48'}" alt="${author.display_name}">
                </div>
                <div class="post-author-info">
                    <div class="post-author-name">${author.display_name || 'Usuario'}</div>
                    <div class="post-author-meta">@${author.username || 'usuario'} • ${timeAgo}</div>
                </div>
            </div>
            <div class="post-body">
                <p class="post-caption">${escapeHtml(post.caption)}</p>
                ${mediaHtml}
            </div>
            <div class="post-actions">
                <button class="action-item like-btn" data-post-id="${post.id}" ${post.is_liked ? 'data-liked="true"' : ''}>
                    <span class="action-icon-small like-icon"></span>
                    <span class="like-count">${post.likes_count}</span>
                </button>
                <button class="action-item comment-btn" data-post-id="${post.id}">
                    <span class="action-icon-small comment-icon"></span>
                    <span class="comment-count">${post.comments_count}</span>
                </button>
                <button class="action-item save-btn" data-post-id="${post.id}" ${post.is_saved ? 'data-saved="true"' : ''}>
                    <span class="action-icon-small save-icon"></span>
                    <span class="save-text">Guardar</span>
                </button>
            </div>
        </div>
    `;
}

function renderStats() {
    const postsCount = document.getElementById('postsCount');
    const followersCount = document.getElementById('followersCount');
    const followingCount = document.getElementById('followingCount');

    if (postsCount) postsCount.textContent = AppState.stats.postsCount.toLocaleString();
    if (followersCount) followersCount.textContent = AppState.stats.followersCount.toLocaleString();
    if (followingCount) followingCount.textContent = AppState.stats.followingCount.toLocaleString();
}

function renderConversations() {
    const container = document.getElementById('recentMessages');
    if (!container) return;

    const conversations = AppState.conversations.length > 0 ? AppState.conversations : [];

    if (conversations.length === 0) {
        container.innerHTML = '<p style="color: var(--color-text-secondary);">No hay conversaciones</p>';
        return;
    }

    container.innerHTML = conversations
        .map((conv) => {
            const user = conv.user || {};
            return `
            <div class="message-item">
                <div class="message-avatar-container">
                    <div class="message-avatar">
                        <img src="${user.avatar_url || 'https://via.placeholder.com/40'}" alt="${user.display_name}">
                    </div>
                    ${conv.is_online ? '<div class="message-status"></div>' : ''}
                </div>
                <div class="message-info">
                    <div class="message-name">${user.display_name || 'Usuario'}</div>
                    <div class="message-preview">${escapeHtml(conv.last_message || 'Sin mensaje')}</div>
                </div>
            </div>
        `;
        })
        .join('');
}

// ============ EVENT LISTENERS SETUP ============
function setupEventListeners() {
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    // Create post input
    const createPostInput = document.getElementById('createPostInput');
    if (createPostInput) {
        createPostInput.addEventListener('click', openCreatePostModal);
    }

    // Publish button
    const publishBtn = document.getElementById('publishBtn');
    if (publishBtn) {
        publishBtn.addEventListener('click', openCreatePostModal);
    }

    // Modal controls
    const closeModalBtn = document.getElementById('closeModalBtn');
    const cancelPostBtn = document.getElementById('cancelPostBtn');
    const confirmPostBtn = document.getElementById('confirmPostBtn');
    const modalOverlay = document.getElementById('modalOverlay');

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeCreatePostModal);
    if (cancelPostBtn) cancelPostBtn.addEventListener('click', closeCreatePostModal);
    if (confirmPostBtn) confirmPostBtn.addEventListener('click', handlePublishPost);
    if (modalOverlay) modalOverlay.addEventListener('click', closeCreatePostModal);

    // Character count in textarea
    const postTextarea = document.getElementById('postTextarea');
    if (postTextarea) {
        postTextarea.addEventListener('input', updateCharCount);
    }

    // Navigation items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach((item) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach((nav) => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Attach post-specific listeners
    attachPostEventListeners();
}

function attachPostEventListeners() {
    // Like buttons
    const likeBtns = document.querySelectorAll('.like-btn');
    likeBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            handleLikePost(btn);
        });
    });

    // Comment buttons
    const commentBtns = document.querySelectorAll('.comment-btn');
    commentBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            // Placeholder para comentarios
            alert('Función de comentarios próximamente');
        });
    });

    // Save buttons
    const saveBtns = document.querySelectorAll('.save-btn');
    saveBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            handleSavePost(btn);
        });
    });
}

// ============ MODAL HANDLERS ============
function openCreatePostModal() {
    const modal = document.getElementById('createPostModal');
    const overlay = document.getElementById('modalOverlay');
    const textarea = document.getElementById('postTextarea');

    if (modal && overlay) {
        modal.style.display = 'flex';
        overlay.style.display = 'block';
        if (textarea) textarea.focus();
    }
}

function closeCreatePostModal() {
    const modal = document.getElementById('createPostModal');
    const overlay = document.getElementById('modalOverlay');
    const textarea = document.getElementById('postTextarea');

    if (modal && overlay) {
        modal.style.display = 'none';
        overlay.style.display = 'none';
        if (textarea) textarea.value = '';
        updateCharCount();
    }
}

function updateCharCount() {
    const textarea = document.getElementById('postTextarea');
    const charCount = document.getElementById('charCount');

    if (textarea && charCount) {
        charCount.textContent = textarea.value.length;
    }
}

async function handlePublishPost() {
    const textarea = document.getElementById('postTextarea');
    const confirmBtn = document.getElementById('confirmPostBtn');

    if (!textarea || !textarea.value.trim()) {
        alert('Por favor, escribe algo antes de publicar');
        return;
    }

    try {
        // Deshabilitar botón mientras se envía
        if (confirmBtn) {
            confirmBtn.disabled = true;
            confirmBtn.textContent = 'Publicando...';
        }

        // Aquí iría la llamada a la API para crear el post
        const postData = {
            caption: textarea.value.trim(),
        };

        // Simulación de éxito
        await new Promise((resolve) => setTimeout(resolve, 1000));

        closeCreatePostModal();
        alert('¡Publicación creada exitosamente!');

        // Recargar feed
        await loadAppData();
        renderFeed();
    } catch (error) {
        console.error('Error publishing post:', error);
        alert('Error al publicar. Intenta de nuevo.');
    } finally {
        if (confirmBtn) {
            confirmBtn.disabled = false;
            confirmBtn.textContent = 'Publicar';
        }
    }
}

// ============ POST ACTIONS HANDLERS ============
function handleLikePost(btn) {
    const postId = btn.dataset.postId;
    const isLiked = btn.hasAttribute('data-liked');

    // Toggle liked state
    if (isLiked) {
        btn.removeAttribute('data-liked');
        btn.classList.remove('liked');
    } else {
        btn.setAttribute('data-liked', 'true');
        btn.classList.add('liked');
    }

    // Update count (placeholder)
    const likeCount = btn.querySelector('.like-count');
    if (likeCount) {
        const currentCount = parseInt(likeCount.textContent);
        likeCount.textContent = isLiked ? currentCount - 1 : currentCount + 1;
    }

    // Aquí iría la llamada a la API para actualizar el like
    console.log(`Like toggled for post ${postId}`);
}

function handleSavePost(btn) {
    const postId = btn.dataset.postId;
    const isSaved = btn.hasAttribute('data-saved');

    // Toggle saved state
    if (isSaved) {
        btn.removeAttribute('data-saved');
        btn.classList.remove('saved');
        btn.querySelector('.save-text').textContent = 'Guardar';
    } else {
        btn.setAttribute('data-saved', 'true');
        btn.classList.add('saved');
        btn.querySelector('.save-text').textContent = 'Guardado';
    }

    // Aquí iría la llamada a la API para guardar/desguardar el post
    console.log(`Save toggled for post ${postId}`);
}

// ============ LOGOUT HANDLER ============
function handleLogout() {
    const confirmed = confirm('¿Estás seguro de que quieres cerrar sesión?');

    if (!confirmed) return;

    try {
        // Limpiar localStorage
        localStorage.removeItem(CONFIG.LS_TOKEN);
        localStorage.removeItem(CONFIG.LS_USER);

        // Redirigir al login
        window.location.href = CONFIG.REDIRECT_LOGIN;
    } catch (error) {
        console.error('Error during logout:', error);
        alert('Error al cerrar sesión');
    }
}

// ============ UTILITY FUNCTIONS ============
function getTimeAgo(date) {
    if (typeof date === 'string') {
        date = new Date(date);
    }

    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return 'Hace un momento';
    if (seconds < 3600) return `Hace ${Math.floor(seconds / 60)}m`;
    if (seconds < 86400) return `Hace ${Math.floor(seconds / 3600)}h`;
    if (seconds < 604800) return `Hace ${Math.floor(seconds / 86400)}d`;

    return date.toLocaleDateString('es-ES');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showApiErrorMessage() {
    const errorMsg = document.getElementById('apiErrorMessage');
    if (errorMsg) {
        errorMsg.style.display = 'flex';
    }
}

// ============ RESPONSIVE HANDLING ============
window.addEventListener('resize', () => {
    // Ajustes responsivos si es necesario
});

// ============ PREVENT COMMON ISSUES ============
document.addEventListener('dragover', (e) => e.preventDefault());
document.addEventListener('drop', (e) => e.preventDefault());

console.log('Nova Dashboard Initialized Successfully');
