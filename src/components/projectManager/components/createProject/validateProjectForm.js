export default function validateProjectForm(step, data) {
  const errors = {};
  if (step === 0) {
    if (!data.title) errors.title = 'Required';
    if (!data.description) errors.description = 'Required';
    if (!data.zone) errors.zone = 'Required';
  }
  if (step === 1) {
    if (!data.startDate) errors.startDate = 'Required';
    if (!data.deadline) errors.deadline = 'Required';
    if (!data.bidDeadline) errors.bidDeadline = 'Required';
    if (!data.budget) errors.budget = 'Required';
  }
  if (step === 2) {
    if (!data.skills || data.skills.length === 0) errors.skills = 'Select at least one skill';
    if (!data.licenses || data.licenses.length === 0) errors.licenses = 'Select at least one license';
    if (!data.materials || data.materials.length === 0) errors.materials = 'Add at least one material';
  }
  if (step === 3) {
    if (!data.legal) errors.legal = 'Upload legal document';
    if (!data.blueprints) errors.blueprints = 'Upload blueprints';
    if (!data.boq) errors.boq = 'Upload BoQ';
    if (!data.safety) errors.safety = 'Upload safety document';
  }
  return errors;
} 