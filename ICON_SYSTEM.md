/* ============================================
   NOVA - Icon System Documentation
   Complete Icon List for Dashboard
   ============================================ */

/**
 * ICONOS NECESARIOS PARA NOVA DASHBOARD
 * Total: 50+ iconos
 * 
 * Este documento lista TODOS los iconos requeridos
 * para implementar el sistema visual completo
 */

/* ============================================================
   CATEGORÍA 1: NAVEGACIÓN LATERAL (SIDEBAR)
   ============================================================ */

/*
FEED (Inicio/News Feed)
- Ubicación: Sidebar izquierdo, primer item
- Tamaño: 20x20px
- Uso: Icono para el feed principal de publicaciones
- Descripción: Símbolo de periódico, papers o stream de noticias
- Alternativas: 📰, Newspaper, Feed, Rss

MENSAJES (Chats/Direct Messages)
- Ubicación: Sidebar izquierdo, segundo item
- Tamaño: 20x20px
- Uso: Acceso a conversaciones y mensajes
- Descripción: Burbuja de chat, bocadillo de diálogo
- Alternativas: 💬, MessageCircle, MessageSquare, Send

HISTORIAS (Stories)
- Ubicación: Sidebar izquierdo, tercer item
- Tamaño: 20x20px
- Uso: Acceso a historias temporales
- Descripción: Símbolo de historia, circuito, nodos
- Alternativas: 📖, Layers, Grid, Film

LLAMADAS (Calls/Video Calls)
- Ubicación: Sidebar izquierdo, cuarto item
- Tamaño: 20x20px
- Uso: Acceso a llamadas de audio/video
- Descripción: Teléfono, micrófono, video camera
- Alternativas: ☎️, Phone, PhoneCall, Video, Mic

GUARDADOS (Saved/Bookmarks)
- Ubicación: Sidebar izquierdo, quinto item
- Tamaño: 20x20px
- Uso: Acceso a publicaciones guardadas
- Descripción: Bandera, bookmark, corazón guardado
- Alternativas: 🔖, Bookmark, Flag, Heart

CONFIGURACIÓN (Settings)
- Ubicación: Sidebar izquierdo, sexto item
- Tamaño: 20x20px
- Uso: Acceso a preferencias y configuración
- Descripción: Rueda de engranaje, sliders
- Alternativas: ⚙️, Settings, Sliders, Gear

CERRAR SESIÓN (Logout)
- Ubicación: Sidebar izquierdo, pie (footer)
- Tamaño: 16x16px
- Uso: Botón para cerrar sesión
- Descripción: Puerta, salida, logout
- Alternativas: 🚪, LogOut, Exit, Door
*/

/* ============================================================
   CATEGORÍA 2: CREAR PUBLICACIÓN (CREATE POST BOX)
   ============================================================ */

/*
ADJUNTAR FOTO/VIDEO (Media Upload)
- Ubicación: Caja de crear post, botón izquierdo
- Tamaño: 20x20px
- Uso: Botón para subir imágenes o videos
- Descripción: Imagen, foto, galería, película
- Alternativas: 🖼️, Image, ImagePlus, Upload, Paperclip, Smile

EMOJI/EMOTICÓN (Emoji Picker)
- Ubicación: Caja de crear post, botón centro-izquierda
- Tamaño: 20x20px
- Uso: Botón para abrir selector de emojis
- Descripción: Cara sonriente, emoji, expresión feliz
- Alternativas: 😊, Smile, Heart, Star, ThumbsUp

PUBLICAR (Publish/Submit)
- Ubicación: Caja de crear post, botón derecha (PRIMARY)
- Tamaño: 20x20px (dentro del botón)
- Uso: Botón para enviar/publicar el post
- Descripción: Papel con flecha, check, send, paper plane
- Alternativas: Enviar, Send, CheckCircle, ArrowRight
*/

/* ============================================================
   CATEGORÍA 3: ACCIONES DE PUBLICACIONES (POST ACTIONS)
   ============================================================ */

/*
LIKE/CORAZÓN (Like/Heart)
- Ubicación: Barra inferior de cada post
- Tamaño: 20x20px
- Uso: Botón para dar like a una publicación
- Descripción: Corazón relleno o vacío (toggle)
- Estados: 
  * Unfilled: ❤️ vacío (outline)
  * Filled: ❤️ lleno (rojo/púrpura)
  * Hover: Escala animada
  * Clicked: Animación de bounce
- Alternativas: Heart, ThumbsUp, Star

COMENTAR (Comment/Reply)
- Ubicación: Barra inferior de cada post
- Tamaño: 20x20px
- Uso: Botón para comentar en una publicación
- Descripción: Burbuja de comentario, speech bubble
- Estados:
  * Hover: Cambio de color
  * Click: Abre modal de comentarios
- Alternativas: MessageCircle, MessageSquare, Comment, ChatBubble

GUARDAR (Save/Bookmark)
- Ubicación: Barra inferior de cada post
- Tamaño: 20x20px
- Uso: Botón para guardar/bookmarkear post
- Descripción: Bandera, bookmark
- Estados:
  * Unfilled: Outline (vacío)
  * Filled: Relleno (ámbar/dorado)
  * Hover: Cambio de color
- Alternativas: Bookmark, Flag, Heart
*/

/* ============================================================
   CATEGORÍA 4: PANEL DE DETALLES (RIGHT SIDEBAR)
   ============================================================ */

/*
ESTADÍSTICAS (Stats Icons) - 3 iconos
Los contadores de: Posts, Followers, Following

POSTS COUNT
- Icono: Cuadrícula, papers, documento
- Color: Azul/Púrpura (gradiente Nova)
- Alternativas: Grid, Layers, FileText, Paperclip

FOLLOWERS COUNT
- Icono: Usuario + símbolo, personas, grupo
- Color: Azul/Púrpura (gradiente Nova)
- Alternativas: Users, UserGroup, Heart, Eye

FOLLOWING COUNT
- Icono: Usuarios conectados, flecha, seguir
- Color: Azul/Púrpura (gradiente Nova)
- Alternativas: Users, UserCheck, UserPlus, Link
*/

/* ============================================================
   CATEGORÍA 5: CONVERSACIONES (RECENT MESSAGES)
   ============================================================ */

/*
INDICADOR DE ESTADO ONLINE
- Ubicación: Esquina inferior derecha del avatar en conversaciones
- Tamaño: 12x12px
- Descripción: Punto/círculo verde
- Alternativas: Verde sólido (#10b981)
- No necesita icono (es un punto CSS)

ESTADO TYPING (Escribiendo)
- Ubicación: Próximamente en preview de mensaje
- Tamaño: 14x14px
- Descripción: Tres puntos animados
- Alternativas: Puntos saltando, "..."
*/

/* ============================================================
   CATEGORÍA 6: MODAL Y OVERLAY
   ============================================================ */

/*
CERRAR MODAL (Close Button)
- Ubicación: Esquina superior derecha del modal
- Tamaño: 24x24px
- Uso: Cerrar modal de crear post
- Descripción: Equis (X), cruz
- Alternativas: X, Close, XCircle, ChevronUp

CONTADOR DE CARACTERES
- Ubicación: Dentro del modal de crear post
- Tamaño: Texto pequeño
- Uso: Mostrar caracteres/límite (0/500)
- No necesita icono
*/

/* ============================================================
   CATEGORÍA 7: ESTADO Y FEEDBACK
   ============================================================ */

/*
ICONO DE ERROR/ADVERTENCIA
- Ubicación: Mensaje flotante si API falla
- Tamaño: 20x20px
- Descripción: Triángulo de advertencia, exclamación
- Alternativas: ⚠️, AlertCircle, AlertTriangle, Info

LOADING/CARGANDO
- Ubicación: Skeleton loaders mientras cargan datos
- Tamaño: Variable
- Descripción: Animación de carga (spinner)
- Alternativas: Spinner, Loader, RefreshCw (animado)

PLACEHOLDER/SIN DATOS
- Ubicación: Cuando no hay historias, posts, etc.
- Tamaño: 40x40px
- Descripción: Caja vacía, carpeta vacía
- Alternativas: FolderOpen, Inbox, FileX
*/

/* ============================================================
   CATEGORÍA 8: ICONOS ADICIONALES (EXPANDIBLE)
   ============================================================ */

/*
EDITAR (Edit)
- Uso: Botón para editar perfil, post
- Descripción: Lápiz, pencil
- Alternativas: Edit, Pencil, Edit2

ELIMINAR (Delete)
- Uso: Botón para borrar post, mensaje
- Descripción: Papelera, trash
- Alternativas: Trash, Trash2, XCircle

COMPARTIR (Share)
- Uso: Botón para compartir post
- Descripción: Flecha saliente, share
- Alternativas: Share2, ExternalLink, Send

BUSCAR (Search)
- Uso: Barra de búsqueda (futuro)
- Descripción: Lupa, magnifying glass
- Alternativas: Search, Magnifier

NOTIFICACIONES (Notifications)
- Uso: Icono de notificaciones (futuro)
- Descripción: Campana, bell
- Alternativas: Bell, AlertCircle

PERFIL/USUARIO (Profile)
- Uso: Icono de usuario en general
- Descripción: Círculo con persona
- Alternativas: User, UserCircle, Profile

MENU/HAMBURGUESA (Menu)
- Uso: Menú desplegable (mobile)
- Descripción: Tres líneas horizontales
- Alternativas: Menu, AlignJustify

MÁS/OPCIONES (More)
- Uso: Menú de más opciones
- Descripción: Tres puntos verticales
- Alternativas: MoreVertical, MoreHorizontal
*/

/* ============================================================
   CATEGORÍA 9: ANIMACIONES DE ICONOS
   ============================================================ */

/*
ANIMACIÓN: LIKE (Corazón)
- Efecto: Bounce/rebote + scale
- Duración: 0.6s
- Easing: ease-out
- Desde: scale(1)
- Hacia: scale(1.3) → scale(1)

ANIMACIÓN: LOADING (Spinner)
- Efecto: Rotación infinita
- Duración: 1s
- Easing: linear
- Transformación: rotate(360deg)

ANIMACIÓN: PULSE (Brillo suave)
- Efecto: Parpadeo suave
- Duración: 2s
- Easing: ease-in-out
- Desde: opacity(0.6)
- Hacia: opacity(1) → opacity(0.6)

ANIMACIÓN: FADE-IN
- Efecto: Aparición gradual
- Duración: 0.3s
- Easing: ease-in
- Desde: opacity(0)
- Hacia: opacity(1)
*/

/* ============================================================
   RESUMEN TOTAL DE ICONOS
   ============================================================ */

/*
NAVEGACIÓN: 6 iconos
CREAR POST: 2 iconos
POST ACTIONS: 3 iconos
SIDEBAR DERECHO: 3 iconos (stats)
FEEDBACK: 3 iconos
ADICIONALES: 8 iconos
ANIMADOS: 4 animaciones

TOTAL: 29 ICONOS PRINCIPALES + 8 FUTUROS = 37 ICONOS

OPCIONES DE IMPLEMENTACIÓN:

1. EMOJIS (Actual - Rápido)
   ✅ Pros: Sin dependencias, carga rápida
   ❌ Cons: Menos personalizable

2. FONT AWESOME 6 (Recomendado)
   ✅ Pros: 7000+ iconos, customizable, profesional
   ❌ Cons: 29KB CDN (minimal impacto)
   CDN: https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css

3. FEATHER ICONS (Minimalista)
   ✅ Pros: 286 iconos minimalisitas, SVG
   ❌ Cons: Menos variedad
   CDN: https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js

4. MATERIAL ICONS (Google)
   ✅ Pros: 5000+ iconos, oficial Google
   ❌ Cons: Tamaño medio
   CDN: https://fonts.googleapis.com/icon?family=Material+Icons

5. HEROICONS (Tailwind)
   ✅ Pros: 290 iconos, bien diseñados
   ❌ Cons: Requiere integración SVG
   Link: https://heroicons.com/

6. SVG PERSONALIZADO (Premium)
   ✅ Pros: Control total, optimizado
   ❌ Cons: Trabajo manual
*/

