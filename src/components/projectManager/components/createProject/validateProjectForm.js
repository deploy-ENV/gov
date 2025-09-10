export default function validateProjectForm(step, data) {
  const errors = {};

  if (step === 0) {
    // Basic info validation
    if (!data.title || data.title.trim().length === 0) {
      errors.title = "Project title is required";
    }
    if (!data.description || data.description.trim().length === 0) {
      errors.description = "Project description is required";
    }

    // Address validation
    if (!data.location?.street || data.location.street.trim().length === 0) {
      errors.street = "Street address is required";
    }
    if (!data.location?.city || data.location.city.trim().length === 0) {
      errors.city = "City is required";
    }
    if (!data.location?.state || data.location.state.trim().length === 0) {
      errors.state = "State is required";location
    }
    if (!data.location?.zip || data.location.zip.trim().length === 0) {
      errors.zip = "Zip code is required";
    }
    if (!data.location?.country || data.location.country.trim().length === 0) {
      errors.country = "Country is required";
    }
  }

  if (step === 1) {
    // Timeline and budget validation
    if (!data.expectedStartDate) {
      errors.expectedStartDate = "Expected start date is required";
    }
    if (!data.deadline) {
      errors.deadline = "Deadline is required";
    }
    if (!data.bidSubmissionDeadline) {
      errors.bidSubmissionDeadline = "Bid submission deadline is required";
    }
    if (!data.totalBudget || data.totalBudget <= 0) {
      errors.totalBudget = "Total budget is required and must be greater than 0";
    }

    // Progress steps validation
    if (!data.progressSteps || data.progressSteps.length === 0) {
      errors.progressSteps = "At least one project step is required";
    } else {
      const invalidSteps = [];

      data.progressSteps.forEach((step, index) => {
        if (!step.title || step.title.trim().length < 2) {
          invalidSteps.push(`Step ${index + 1} title is too short`);
        }
        if (step.title && step.title.trim().length > 50) {
          invalidSteps.push(`Step ${index + 1} title cannot exceed 50 characters`);
        }
        if (!step.description || step.description.trim().length < 5) {
          invalidSteps.push(`Step ${index + 1} description is too short`);
        }
        if (!step.dueDate) {
          invalidSteps.push(`Step ${index + 1} due date is required`);
        }
      });

      // Duplicate title check
      const titles = data.progressSteps
        .map(p => p.title?.trim().toLowerCase())
        .filter(Boolean);
      const uniqueTitles = [...new Set(titles)];
      if (titles.length !== uniqueTitles.length) {
        invalidSteps.push("Step titles must be unique");
      }

      if (invalidSteps.length > 0) {
        errors.progressSteps = invalidSteps.join(", ");
      }
    }

    // Date logic
    if (data.expectedStartDate && data.deadline) {
      const start = new Date(data.expectedStartDate);
      const end = new Date(data.deadline);
      if (start >= end) {
        errors.deadline = "Deadline must be after expected start date";
      }
    }

    if (data.bidSubmissionDeadline && data.expectedStartDate) {
      const bid = new Date(data.bidSubmissionDeadline);
      const start = new Date(data.expectedStartDate);
      if (bid >= start) {
        errors.bidSubmissionDeadline = "Bid deadline must be before expected start date";
      }
    }

    if (data.bidSubmissionDeadline && data.deadline) {
      const bid = new Date(data.bidSubmissionDeadline);
      const deadline = new Date(data.deadline);
      if (bid >= deadline) {
        errors.bidSubmissionDeadline = "Bid deadline must be before project deadline";
      }
    }

    // Prevent past dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (data.expectedStartDate) {
      const start = new Date(data.expectedStartDate);
      if (start < today) {
        errors.expectedStartDate = "Expected start date cannot be in the past";
      }
    }

    if (data.bidSubmissionDeadline) {
      const bid = new Date(data.bidSubmissionDeadline);
      if (bid < today) {
        errors.bidSubmissionDeadline = "Bid deadline cannot be in the past";
      }
    }
  }

  if (step === 2) {
    if (!data.contractorRequirements || data.contractorRequirements.trim().length === 0) {
      errors.contractorRequirements = "Contractor requirements are required";
    }

    if (!data.licenses || data.licenses.length === 0) {
      errors.licenses = "Select at least one license";
    }

    if (!data.requiredMaterials || data.requiredMaterials.length === 0) {
      errors.materials = "Add at least one material";
    } else {
      let materialError = false;
      data.requiredMaterials.forEach((material, index) => {
        if (!material || material.trim().length === 0) {
          errors.materials = "Material name cannot be empty";
          materialError = true;
        }
        if (!data.estimatedQuantities[index] || data.estimatedQuantities[index] <= 0) {
          errors.materials = "All material quantities must be greater than 0";
          materialError = true;
        }
      });

      if (!materialError) {
        const materialNames = data.requiredMaterials.map(m => m.trim().toLowerCase());
        const uniqueMaterials = [...new Set(materialNames)];
        if (materialNames.length !== uniqueMaterials.length) {
          errors.materials = "Material names must be unique";
        }
      }
    }
  }

  if (step === 3) {
    if (!data.documentIds || data.documentIds.length === 0) {
      errors.documents = "At least one document must be uploaded";
    }
  }

  if (step === 4) {
    if (data.comments && data.comments.length > 1000) {
      errors.comments = "Comments cannot exceed 1000 characters";
    }
  }

  return errors;
}
