document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contato-form');
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const mensagemInput = document.getElementById('mensagem');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        resetErrors();

        if (!nomeInput.value.trim()) {
            showError(nomeInput, 'Por favor, preencha seu nome');
            isValid = false;
        }

        if (!emailInput.value.trim()) {
            showError(emailInput, 'Por favor, preencha seu e-mail');
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'Por favor, insira um e-mail válido');
            isValid = false;
        }

        if (!mensagemInput.value.trim()) {
            showError(mensagemInput, 'Por favor, preencha sua mensagem');
            isValid = false;
        }

        if (isValid) {
            alert('Mensagem enviada com sucesso!');
            form.reset();
        }
    });

    function showError(input, message) {
        input.classList.add('error');
        const errorElement = document.getElementById(`${input.id}-error`);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    function resetErrors() {
        const inputs = [nomeInput, emailInput, mensagemInput];
        inputs.forEach(input => {
            input.classList.remove('error');
            const errorElement = document.getElementById(`${input.id}-error`);
            errorElement.style.display = 'none';
        });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}); 