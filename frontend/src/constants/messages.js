// Toast messages
export const TOAST_MESSAGES = {

  // For Registration
  REGISTRATION_SUCCESS: 'Registered successfully! Redirecting...',
  REGISTRATION_FAILED: 'Registration failed. Try again later.',
  FORM_ERROR: 'Please fix the form errors',
  
  //for Login
  LOGIN_SUCCESS: 'Login successful! Redirecting...',
  LOGIN_FAILED: 'Login failed. Please check your credentials.',

  //for Dashboard
  PROJECT_DELETED: 'Are you sure you want to delete this project?',
  NO_PROJECTS_FOUND: 'No projects found. Start by creating one!',
  LOADING_PROJECTS: 'Loading projects...',

  //for Project Details
  TASK_DELETE: 'Are you sure you want to delete this task?',
  FAIL_DELETE_TASK: 'Failed to delete task. Check console for details.',

  //for Edit Project
  FAIL_TO_LOAD_PROJECT: 'Failed to load project. Check console for details.',
  FAIL_TO_UPDATE_PROJECT: 'Failed to update project. Check console for details.',

  //for add project
  FAIL_TO_CREATE_PROJECT: 'Failed to create project. Check console for details.',

};

// Validation error messages
export const VALIDATION_ERRORS = {
  EMAIL_REQUIRED: 'Email is required.',
  INVALID_EMAIL: 'Invalid email format.',
  PASSWORD_REQUIRED: 'Password is required.',
  PASSWORD_WEAK: 'Password must be at least 8 characters and include letters and a symbol.',
  CONFIRM_PASSWORD_REQUIRED: 'Confirm your password.',
  PASSWORDS_DO_NOT_MATCH: 'Passwords do not match.',
};
