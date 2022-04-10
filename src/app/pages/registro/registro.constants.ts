export const TITLE:string = "Registrar";
export const EMAIL_LABEL:string = "Correo electrónico";
export const EMAIL_PLACEHOLDER:string = "Escribe tu correo electrónico";
export const USERNAME_LABEL:string = "Usuario";
export const USERNAME_PLACEHOLDER:string = "Escribe tu nombre de usuario";
export const PASSWORD_LABEL:string = "Contraseña";
export const PASSWORD_PLACEHOLDER:string = "Escribe la contraseña";
export const CONFIRM_PASSWORD_LABEL:string = "Repetir contraseña";
export const CONFIRM_PASSWORD_PLACEHOLDER:string = "Escribe la contraseña de nuevo";
export const SUBMIT_BUTTON:string = "Registrar";
export const REDIRECT_MESSAGE:string = "¿Ya estás registrado/a?";
export const REDIRECT_BUTTON:string = "Iniciar sesión";
export const DUPLICATE_EMAIL_MESSAGE:string = "El correo introducido ya existe.";
export const VALIDATION_MESSAGES = {
  'username': {
    'required': 'Por favor, introduce un nombre de usuario',
  },
  'email': {
    'required': 'Por favor, introduce un correo electrónico',
    'pattern': 'Por favor, introduce un correo electrónico válido'
  },
  'password': {
    'required': 'Por favor, introduce una contraseña',
    'minlength': 'La contraseña es muy corta'
  },
  'confirmPassword': {
    'required': 'Por favor, confirma la contraseña',
    'minlength': 'La contraseña es muy corta',
    'mismatch': 'Las contraseñas introducidas no coinciden'
  }
};
