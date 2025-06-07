document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.cadastro-form');
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');
    const confirmarSenhaInput = document.getElementById('confirmar-senha');
    const telefoneInput = document.getElementById('telefone');
    const enderecoInput = document.getElementById('endereco');
    const cidadeInput = document.getElementById('cidade');
    const estadoSelect = document.getElementById('estado');
    const cepInput = document.getElementById('cep');
    const termsCheckbox = document.getElementById('termos');

    const nomeError = document.getElementById('nome-error');
    const emailError = document.getElementById('email-error');
    const senhaError = document.getElementById('senha-error');
    const confirmarSenhaError = document.getElementById('confirmar-senha-error');
    const telefoneError = document.getElementById('telefone-error');
    const enderecoError = document.getElementById('endereco-error');
    const cidadeError = document.getElementById('cidade-error');
    const estadoError = document.getElementById('estado-error');
    const cepError = document.getElementById('cep-error');
    const termsError = document.getElementById('terms-error-message');

    function showError(element, message) {
        if (element) {
            element.textContent = message;
            element.style.display = 'block';
        }
    }

    function hideError(element) {
        if (element) {
            element.textContent = '';
            element.style.display = 'none';
        }
    }

    function markFieldAsInvalid(inputElement) {
        if (inputElement) {
            inputElement.classList.add('invalid');
        }
    }

    function markFieldAsValid(inputElement) {
        if (inputElement) {
            inputElement.classList.remove('invalid');
        }
    }

    function validateTextInput(inputElement, errorElement, fieldName) {
        if (!inputElement) return true;
        if (inputElement.value.trim() === '') {
            showError(errorElement, `${fieldName} é obrigatório.`);
            markFieldAsInvalid(inputElement);
            return false;
        } else {
            hideError(errorElement);
            markFieldAsValid(inputElement);
            return true;
        }
    }

    function validateSelectInput(selectElement, errorElement, fieldName) {
        if (!selectElement) return true;
        if (selectElement.value === '') {
            showError(errorElement, `Selecione um ${fieldName}.`);
            markFieldAsInvalid(selectElement);
            return false;
        } else {
            hideError(errorElement);
            markFieldAsValid(selectElement);
            return true;
        }
    }

    function validateEmail(inputElement, errorElement) {
        if (!inputElement) return true;
        const email = inputElement.value.trim();
        if (email === '') {
            showError(errorElement, 'E-mail é obrigatório.');
            markFieldAsInvalid(inputElement);
            return false;
        } else if (!/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
            showError(errorElement, 'Formato de e-mail inválido.');
            markFieldAsInvalid(inputElement);
            return false;
        } else {
            hideError(errorElement);
            markFieldAsValid(inputElement);
            return true;
        }
    }

    function validateTelefone(inputElement, errorElement) {
        if (!inputElement) return true;
        const telefone = inputElement.value.trim();
        
        const telefoneNumerico = telefone.replace(/\D/g, '');
        
        if (telefone === '') {
            showError(errorElement, 'Telefone é obrigatório.');
            markFieldAsInvalid(inputElement);
            return false;
        } else if (telefoneNumerico.length < 10 || telefoneNumerico.length > 11) {
            showError(errorElement, 'Telefone deve conter 10 ou 11 dígitos.');
            markFieldAsInvalid(inputElement);
            return false;
        } else {
            hideError(errorElement);
            markFieldAsValid(inputElement);
            return true;
        }
    }

    function validatePassword(senhaInput, senhaError, confirmarSenhaInput, confirmarSenhaError) {
        if (!senhaInput || !confirmarSenhaInput) return true;
        const senha = senhaInput.value;
        const confirmarSenha = confirmarSenhaInput.value;
        let isSenhaValid = true;
        let isConfirmarSenhaValid = true;

        if (senha.trim() === '') {
            showError(senhaError, 'Senha é obrigatória.');
            markFieldAsInvalid(senhaInput);
            isSenhaValid = false;
        } else if (senha.length < 8) {
            showError(senhaError, 'A senha deve ter no mínimo 8 caracteres.');
            markFieldAsInvalid(senhaInput);
            isSenhaValid = false;
        } else {
            hideError(senhaError);
            markFieldAsValid(senhaInput);
        }

        if (confirmarSenha.trim() === '') {
            showError(confirmarSenhaError, 'Confirmação de senha é obrigatória.');
            markFieldAsInvalid(confirmarSenhaInput);
            isConfirmarSenhaValid = false;
        } else {
            hideError(confirmarSenhaError);
            markFieldAsValid(confirmarSenhaInput);
        }

        if (senha !== confirmarSenha && isSenhaValid && isConfirmarSenhaValid) {
            showError(confirmarSenhaError, 'As senhas não coincidem.');
            markFieldAsInvalid(confirmarSenhaInput);
            isConfirmarSenhaValid = false;
        }

        if (senha === confirmarSenha && senha.trim() !== '' && isSenhaValid && isConfirmarSenhaValid) {
            hideError(confirmarSenhaError);
            markFieldAsValid(confirmarSenhaInput);
        }

        return isSenhaValid && isConfirmarSenhaValid && (senha === confirmarSenha || senha.trim() ==='');
    }

    function validateCEP(inputElement, errorElement) {
        if (!inputElement) return true;
        const cep = inputElement.value.trim();
        
        const cepNumerico = cep.replace(/\D/g, '');
        
        if (cep === '') {
            showError(errorElement, 'CEP é obrigatório.');
            markFieldAsInvalid(inputElement);
            return false;
        } else if (!/^\d{5}-?\d{3}$/.test(cep)) {
            showError(errorElement, 'Formato de CEP inválido. Use XXXXX-XXX.');
            markFieldAsInvalid(inputElement);
            return false;
        } else if (cepNumerico.length !== 8) {
            showError(errorElement, 'CEP deve conter 8 dígitos.');
            markFieldAsInvalid(inputElement);
            return false;
        } else {
            hideError(errorElement);
            markFieldAsValid(inputElement);
            return true;
        }
    }

    function validateTermsCheckbox(checkboxElement, errorElement) {
        if (!checkboxElement) return true;
        if (!checkboxElement.checked) {
            showError(errorElement, 'Marque esta caixa se deseja continuar.');
            markFieldAsInvalid(checkboxElement);
            return false;
        } else {
            hideError(errorElement);
            markFieldAsValid(checkboxElement);
            return true;
        }
    }

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const isNomeValid = validateTextInput(nomeInput, nomeError, 'Nome Completo');
            const isEmailValid = validateEmail(emailInput, emailError);
            const isPasswordValid = validatePassword(senhaInput, senhaError, confirmarSenhaInput, confirmarSenhaError);
            const isTelefoneValid = validateTelefone(telefoneInput, telefoneError);
            const isEnderecoValid = validateTextInput(enderecoInput, enderecoError, 'Endereço');
            const isCidadeValid = validateTextInput(cidadeInput, cidadeError, 'Cidade');
            const isEstadoValid = validateSelectInput(estadoSelect, estadoError, 'Estado');
            const isCepValid = validateCEP(cepInput, cepError);
            const isTermsValid = validateTermsCheckbox(termsCheckbox, termsError);

            if (isNomeValid && isEmailValid && isPasswordValid && isTelefoneValid && isEnderecoValid && isCidadeValid && isEstadoValid && isCepValid && isTermsValid) {
                console.log('Formulário validado com sucesso! Pronto para enviar.');
                form.submit();
            } else {
                console.log('Validação do formulário falhou. Verifique os campos.');
            }
        });

        if(nomeInput) nomeInput.addEventListener('input', () => validateTextInput(nomeInput, nomeError, 'Nome Completo'));
        if(emailInput) emailInput.addEventListener('input', () => validateEmail(emailInput, emailError));
        if(senhaInput || confirmarSenhaInput) {
            senhaInput.addEventListener('input', () => validatePassword(senhaInput, senhaError, confirmarSenhaInput, confirmarSenhaError));
            confirmarSenhaInput.addEventListener('input', () => validatePassword(senhaInput, senhaError, confirmarSenhaInput, confirmarSenhaError));
        }
        if(telefoneInput) telefoneInput.addEventListener('input', () => validateTelefone(telefoneInput, telefoneError));
        if(enderecoInput) enderecoInput.addEventListener('input', () => validateTextInput(enderecoInput, enderecoError, 'Endereço'));
        if(cidadeInput) cidadeInput.addEventListener('input', () => validateTextInput(cidadeInput, cidadeError, 'Cidade'));
        if(estadoSelect) estadoSelect.addEventListener('change', () => validateSelectInput(estadoSelect, estadoError, 'Estado'));
        if(cepInput) cepInput.addEventListener('input', () => validateCEP(cepInput, cepError));
        if(termsCheckbox) termsCheckbox.addEventListener('change', () => validateTermsCheckbox(termsCheckbox, termsError));
    }

    const checkboxGroup = document.querySelector('.form-group.checkbox');
    const termsLink = document.querySelector('.checkbox label a');
    const modal = document.getElementById('terms-modal');
    const closeButton = modal ? modal.querySelector('.close-button') : null;
    const acceptButton = document.getElementById('accept-terms');
    const declineButton = document.getElementById('decline-terms');

    if (checkboxGroup && termsCheckbox && termsLink) {
         const checkboxLabel = checkboxGroup.querySelector('label');
        if(checkboxLabel) {
             checkboxLabel.addEventListener('click', function(event) {
                if (event.target === termsLink || termsLink.contains(event.target)) {
                    return;
                }

                event.preventDefault();

                termsCheckbox.checked = !termsCheckbox.checked;

                const changeEvent = new Event('change');
                termsCheckbox.dispatchEvent(changeEvent);

                if (termsCheckbox.checked && termsError) {
                    hideError(termsError);
                }
            });
        }
    }

    if (termsLink && modal) {
    termsLink.addEventListener('click', function(event) {
            event.preventDefault();
        modal.style.display = 'block';
    });
    }

    if (closeButton && modal) {
    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    }

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    if (acceptButton && termsCheckbox && modal && termsError) {
    acceptButton.addEventListener('click', function() {
            termsCheckbox.checked = true;
            const changeEvent = new Event('change');
            termsCheckbox.dispatchEvent(changeEvent);
        modal.style.display = 'none';
            hideError(termsError);
    });
    }

    if (declineButton && termsCheckbox && modal) {
    declineButton.addEventListener('click', function() {
            termsCheckbox.checked = false;
            const changeEvent = new Event('change');
            termsCheckbox.dispatchEvent(changeEvent);
        modal.style.display = 'none';
    });
    }
}); 