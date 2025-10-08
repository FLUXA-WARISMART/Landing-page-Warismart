// Crear partículas flotantes
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Tamaño aleatorio entre 5px y 15px
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Posición aleatoria
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        // Animación con duración aleatoria
        const duration = Math.random() * 20 + 10;
        particle.style.animationDuration = `${duration}s`;

        // Retraso aleatorio
        const delay = Math.random() * 10;
        particle.style.animationDelay = `${delay}s`;

        particlesContainer.appendChild(particle);
    }
}

// Efecto parallax para el fondo
function setupParallax() {
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const waves = document.querySelectorAll('.wave');
        const shine = document.querySelector('.shine');

        if (waves) {
            waves.forEach((wave, index) => {
                const speed = 0.05 + (index * 0.02);
                wave.style.transform = `translateY(${scrollPosition * speed}px)`;
            });
        }

        if (shine) {
            shine.style.transform = `translateX(${scrollPosition * 0.3}px) translateY(${scrollPosition * 0.2}px)`;
        }
    });
}

// Función para mostrar tarjetas de éxito
function showSuccessCard(cardId, isLogin = false) {
    const successCard = document.getElementById(cardId);
    if (successCard) {
        successCard.classList.add('active');

        // Redirigir después de 3 segundos
        setTimeout(function() {
            if (isLogin) {
                window.location.href = '../index.html';
            } else {
                window.location.href = 'login.html';
            }
        }, 3000);
    }
}

// Función para seleccionar rol en registro
function selectRole(element) {
    const options = document.querySelectorAll('.role-option');
    options.forEach(option => option.classList.remove('selected'));
    element.classList.add('selected');
}

// Funciones de redirección
function redirectToDashboard() {
    window.location.href = '../index.html';
}

function redirectToLogin() {
    window.location.href = 'login.html';
}

// Inicialización cuando el DOM está cargado
document.addEventListener('DOMContentLoaded', function() {
    // Crear partículas
    createParticles();

    // Configurar efecto parallax
    setupParallax();

    // Manejo del formulario de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showSuccessCard('successCard', true);
        });
    }

    // Manejo del formulario de registro
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validación de campos
            let isValid = true;
            const nombre = document.getElementById('reg-nombre');
            const apellido = document.getElementById('reg-apellido');
            const correo = document.getElementById('reg-correo');
            const contrasena = document.getElementById('reg-contrasena');
            const confirmarContrasena = document.getElementById('reg-confirmar-contrasena');
            const formMessage = document.getElementById('formMessage');

            // Validar nombre
            if (nombre.value.trim() === '') {
                document.getElementById('reg-nombreError').style.display = 'block';
                document.getElementById('reg-nombreError').textContent = 'El nombre es obligatorio.';
                isValid = false;
            } else {
                document.getElementById('reg-nombreError').style.display = 'none';
            }

            // Validar apellido
            if (apellido.value.trim() === '') {
                document.getElementById('reg-apellidoError').style.display = 'block';
                document.getElementById('reg-apellidoError').textContent = 'El apellido es obligatorio.';
                isValid = false;
            } else {
                document.getElementById('reg-apellidoError').style.display = 'none';
            }

            // Validar correo
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(correo.value.trim())) {
                document.getElementById('reg-correoError').style.display = 'block';
                document.getElementById('reg-correoError').textContent = 'Ingresa un formato de correo electrónico válido.';
                isValid = false;
            } else {
                document.getElementById('reg-correoError').style.display = 'none';
            }

            // Validar contraseña
            if (contrasena.value.length < 8) {
                document.getElementById('reg-contrasenaError').style.display = 'block';
                document.getElementById('reg-contrasenaError').textContent = 'La contraseña debe tener al menos 8 caracteres.';
                isValid = false;
            } else {
                document.getElementById('reg-contrasenaError').style.display = 'none';
            }

            // Validar confirmación de contraseña
            if (contrasena.value !== confirmarContrasena.value) {
                document.getElementById('reg-confirmar-contrasenaError').style.display = 'block';
                document.getElementById('reg-confirmar-contrasenaError').textContent = 'Las contraseñas no coinciden.';
                isValid = false;
            } else {
                document.getElementById('reg-confirmar-contrasenaError').style.display = 'none';
            }

            if (isValid) {
                showSuccessCard('successCard');
            } else {
                formMessage.textContent = 'ERROR. Por favor, corrige los errores en el formulario.';
                formMessage.classList.remove('success');
                formMessage.classList.add('error');
                formMessage.style.display = 'block';
            }
        });
    }
});


// Asistente Virtual
document.addEventListener('DOMContentLoaded', function() {
    const assistantToggle = document.getElementById('assistantToggle');
    const assistantContainer = document.getElementById('assistantContainer');
    const assistantClose = document.getElementById('assistantClose');
    const assistantOptions = document.querySelectorAll('.assistant-option');
    const assistantAnswer = document.getElementById('assistantAnswer');

    // Alternar visibilidad del asistente
    assistantToggle.addEventListener('click', function() {
        assistantContainer.style.display = assistantContainer.style.display === 'block' ? 'none' : 'block';
    });

    // Cerrar asistente
    assistantClose.addEventListener('click', function() {
        assistantContainer.style.display = 'none';
    });

    // Respuestas del asistente
    const answers = {
        register: {
            title: '¿Cómo me registro?',
            content: 'Para registrarte en WARISMART, sigue estos pasos: 1. Haz clic en el botón "Registrarse" en la parte superior derecha. 2. Completa el formulario con tus datos personales. 4. Haz clic en "Registrarse" y listo, ¡ya eres parte de WARISMART!'
        },
        what_is_warismart: {
            title: '¿Qué es WARISMART?',
            content: 'WARISMART es un sistema de gestión simple y completo para tu bodega o tienda en Perú. Te ayuda a controlar el **inventario, las ventas y el dinero** para que ganes más y trabajes menos.'
        },
        who_is_it_for: {
        title: '¿Para quién es WARISMART?',
            content: 'Es ideal para **emprendedores independientes, dueños de bodegas, minimarkets y pequeñas cadenas** (hasta 5 locales) que quieren digitalizar su negocio sin complicaciones.'
        },
        
        // --- Preguntas sobre INVENTARIO ---
        how_to_register_product: {
            title: '¿Cómo registro un producto nuevo?',
            content: 'Es muy fácil: 1. Ve al módulo **"Inventario"**. 2. Haz clic en el botón **"+ Agregar Producto"**. 3. Ingresa el **nombre, precio y la cantidad** que tienes en stock. 4. ¡Guarda y listo!'
        },
        stock_low_alert: {
            title: '¿Cómo me avisa si se acaba algo (Stock Bajo)?',
            content: 'WARISMART te avisa de dos maneras: 1. En el **Dashboard principal** verás un resumen de los productos que se están acabando. 2. En el módulo **"Inventario"**, los productos con poco stock se marcan con un color de alerta (Amarillo o Rojo).'
        },
        
        // --- Preguntas sobre VENTAS (POS) ---
        how_to_sell: {
            title: '¿Cómo registro una venta en el Punto de Venta (POS)?',
            content: 'El POS está diseñado para ser rápido: 1. Ve al módulo **"Punto de Venta"**. 2. **Busca o escanea** el producto que el cliente quiere. 3. Haz clic en **"Pagar"**. 4. Elige si es **Efectivo o Tarjeta**. ¡Venta terminada!'
        },
        issue_receipt: {
            title: '¿WARISMART emite boletas o facturas?',
            content: 'Sí, WARISMART está preparado para la emisión de **Boletas y Facturas Electrónicas** (integración con SUNAT). Esto depende del plan que contrates. Pregunta a nuestro equipo sobre la configuración para tu RUC.'
        },
        
        // --- Preguntas sobre REPORTES ---
        see_earnings: {
            title: '¿Dónde veo cuánto he ganado hoy/este mes?',
            content: 'Toda la información importante está en el **Dashboard principal** y el módulo **"Reportes"**: 1. En el **Dashboard** verás un resumen de las ventas del día. 2. En **"Reportes"** puedes ver gráficos simples de tus ganancias, gastos y los productos más vendidos.'
        },
        
        // --- Preguntas sobre SEGURIDAD Y SOPORTE ---
        security_data: {
            title: '¿Mi información y datos están seguros?',
            content: 'Sí, tu información está **totalmente segura**. Usamos tecnología avanzada para proteger tus datos de inventario, ventas y clientes. Solo tú y las personas que autorices pueden ver esa información.'
        },
        need_help: {
            title: '¿Qué hago si tengo un problema o duda?',
            content: 'Puedes pedir ayuda de tres formas: 1. Usa el **botón de chat** que aparece en la esquina. 2. Llama a nuestra línea de **Soporte Técnico**. 3. Puede escribirnos un correo a contacto@warismart.pe. ¡Estamos para ayudarte!'
        }
    };

    // Manejar clics en las opciones del asistente
    assistantOptions.forEach(option => {
        option.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            const answer = answers[question];

            assistantAnswer.innerHTML = `
                <h4>${answer.title}</h4>
                <p>${answer.content}</p>
            `;
            assistantAnswer.classList.add('active');
        });
    });
});

// Crear partículas flotantes
document.addEventListener('DOMContentLoaded', function() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 15; // Número de partículas

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Tamaño aleatorio entre 5px y 15px
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Posición aleatoria
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        // Animación con duración aleatoria
        const duration = Math.random() * 20 + 10;
        particle.style.animationDuration = `${duration}s`;

        // Retraso aleatorio
        const delay = Math.random() * 10;
        particle.style.animationDelay = `${delay}s`;

        particlesContainer.appendChild(particle);
    }

    // Efecto parallax mejorado para el fondo
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const waves = document.querySelectorAll('.wave');

        waves.forEach((wave, index) => {
            const speed = 0.05 + (index * 0.02);
            wave.style.transform = `translateY(${scrollPosition * speed}px)`;
        });

        const shine = document.querySelector('.shine');
        shine.style.transform = `translateX(${scrollPosition * 0.3}px) translateY(${scrollPosition * 0.2}px)`;
    });

    // Animación para las secciones al hacer scroll
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
});

// Función para mostrar modales
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        // Deshabilitar scroll cuando el modal está abierto
        document.body.style.overflow = 'hidden';
    }
}

// Función para cerrar modales
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        // Habilitar scroll cuando el modal se cierra
        document.body.style.overflow = '';
    }
}

// Validación de email (función compartida)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Manejo del formulario de contacto
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validar campos obligatorios
            const nombre = this.querySelector('input[name="nombre"]');
            const email = this.querySelector('input[name="email"]');
            const mensaje = this.querySelector('textarea[name="mensaje"]');

            let isValid = true;

            // Validar nombre
            if (nombre.value.trim() === '') {
                isValid = false;
                nombre.style.borderColor = '#ff6b6b';
            } else {
                nombre.style.borderColor = '#ddd';
            }

            // Validar email
            if (email.value.trim() === '' || !validateEmail(email.value.trim())) {
                isValid = false;
                email.style.borderColor = '#ff6b6b';
            } else {
                email.style.borderColor = '#ddd';
            }

            // Validar mensaje
            if (mensaje.value.trim() === '') {
                isValid = false;
                mensaje.style.borderColor = '#ff6b6b';
            } else {
                mensaje.style.borderColor = '#ddd';
            }

            if (isValid) {
                // Mostrar modal de éxito
                showModal('contactSuccessModal');
                // Limpiar formulario
                this.reset();
            } else {
                // Mostrar modal de error
                showModal('contactErrorModal');
            }
        });

        // Limpiar estilos de error al enfocar campos
        const requiredFields = contactForm.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            field.addEventListener('focus', function() {
                this.style.borderColor = '#ddd';
            });
        });
    }
}

// Manejo del formulario de registro gratuito
function setupFreeRegistrationForm() {
    const freeRegForm = document.querySelector('.registro-form');
    if (freeRegForm) {
        freeRegForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validar campos
            const negocio = this.querySelector('input[type="text"]');
            const email = this.querySelector('input[type="email"]');

            let isValid = true;

            // Validar nombre del negocio
            if (negocio.value.trim() === '') {
                isValid = false;
                negocio.style.borderColor = '#ff6b6b';
            } else {
                negocio.style.borderColor = '#ddd';
            }

            // Validar email
            if (email.value.trim() === '' || !validateEmail(email.value.trim())) {
                isValid = false;
                email.style.borderColor = '#ff6b6b';
            } else {
                email.style.borderColor = '#ddd';
            }

            if (isValid) {
                // Mostrar modal de éxito
                showModal('freeRegisterSuccessModal');
                // Limpiar formulario
                this.reset();
            } else {
                // Mostrar modal de error
                showModal('freeRegisterErrorModal');
            }
        });

        // Limpiar estilos de error al enfocar campos
        const requiredFields = freeRegForm.querySelectorAll('input');
        requiredFields.forEach(field => {
            field.addEventListener('focus', function() {
                this.style.borderColor = '#ddd';
            });
        });
    }
}

// Inicializar TODO cuando el DOM esté cargado (solo una vez)
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar formulario de contacto
    setupContactForm();

    // Inicializar formulario de registro gratuito
    setupFreeRegistrationForm();

    // Cerrar modales al hacer clic fuera de ellos
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this.id);
            }
        });
    });
});
