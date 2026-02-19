export function formFS() {
    const d = document;
    
    const $form = d.querySelector('.contact-form'), $inputs = d.querySelectorAll('.contact-form [required]');

    // Desactivamos la validación por defecto del navegador para usar la nuestra
    $form.setAttribute('novalidate', '');

    $inputs.forEach((input) => {
        const $span = d.createElement('span');
        $span.id = input.name + '-error';
        $span.textContent = input.title;
        $span.classList.add('contact-form-error', 'none');
        $span.style.marginTop = '-1rem';
        $span.style.borderRadius = '0 0 .5rem .5rem';
        input.insertAdjacentElement('afterend', $span);
    });

    // Escuchamos el evento input para quitar el error en tiempo real si el usuario corrige
    d.addEventListener('input', (e) => {
        if (e.target.matches('.contact-form [required]')) {
            let $input = e.target,
                pattern = $input.pattern || $input.dataset.pattern,
                $errorSpan = d.getElementById($input.name + '-error');

            // Solo hacemos algo si el error está visible actualmente
            if ($errorSpan.classList.contains('is-active')) {
                let isValid = false;

                if ($input.value !== "") {
                    if (pattern) {
                        let regex = new RegExp(pattern);
                        isValid = regex.exec($input.value);
                    } else {
                        isValid = true; // Si no tiene patrón y no está vacío, es válido
                    }
                }

                if (isValid) {
                    $errorSpan.classList.remove('is-active');
                }
            }
        }
    });

    d.addEventListener('submit', (e) => {
        if (e.target === $form) {
            e.preventDefault();

            // Validamos todos los campos antes de enviar
            let isValid = true;
            $inputs.forEach(input => {
                let pattern = input.pattern || input.dataset.pattern;
                let errorSpan = d.getElementById(input.name + '-error');
                
                if (input.value === "") {
                    // Error si está vacío (porque es required)
                    errorSpan.classList.add('is-active');
                    isValid = false;
                } else if (pattern) {
                    let regex = new RegExp(pattern);
                    if (!regex.exec(input.value)) {
                        errorSpan.classList.add('is-active');
                        isValid = false;
                    } else {
                        errorSpan.classList.remove('is-active');
                    }
                } else {
                    // Si no tiene patrón y no está vacío, es válido
                    errorSpan.classList.remove('is-active');
                }
            });

            if (!isValid) return;

            const $loader = d.querySelector('.contact-form-loader'), 
                  $response = d.querySelector('.contact-form-response');

            $loader.classList.remove('none');

            // Usamos la URL que pusiste en el action del HTML (Formspree)
            fetch($form.action, {
                method: "POST",
                body: new FormData(e.target),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .then(json => { 
                $loader.classList.add('none');
                $response.classList.remove('none');
                $response.innerHTML = `<p>¡El mensaje ha sido enviado con éxito!</p>`;
                $form.reset(); 
                // Limpiamos los errores visuales también por si acaso
                $inputs.forEach(input => d.getElementById(input.name + '-error').classList.remove('is-active'));
            })
            .catch(err => {
                $loader.classList.add('none');
                $response.classList.remove('none');
                let message = err.statusText || 'Ocurrió un error al enviar, intenta nuevamente.';
                $response.innerHTML = `<p>Error ${err.status}: ${message}</p>`;
            })
            .finally(() => setTimeout(() => {
                $response.classList.add('none');
                $response.innerHTML = "";
            }, 5000));
        }
    });
}
