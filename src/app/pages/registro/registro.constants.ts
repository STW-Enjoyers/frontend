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

export const VALIDATION_MESSAGES = {
  'Username': {
    'required': 'Introduce tu nombre de usuario',
  },
  'Email': {
    'required': 'Introduce tu correo electrónico',
    'pattern': 'El formato del correo no es correcto'
  },
  'Password': {
    'required': 'Introduce tu contraseña',
    'minlength': 'La contraseña es muy corta'
  },
  'ConfirmPassword': {
    'required': 'Introduce tu contraseña de nuevo',
    'minlength': 'La contraseña es muy corta',
    'mismatch': 'Las contraseñas no coinciden'
  }
};
