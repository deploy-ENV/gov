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
    if (!data.address?.street || data.address.street.trim().length === 0) {
      errors.street = "Street address is required";
    }
    if (!data.address?.city || data.address.city.trim().length === 0) {
      errors.city = "City is required";
    }
    if (!data.address?.state || data.address.state.trim().length === 0) {
      errors.state = "State is required";
    }
    if (!data.address?.zip || data.address.zip.trim().length === 0) {
      errors.zip = "Zip code is required";
    }
    if (!data.address?.country || data.address.country.trim().length === 0) {
      errors.country = "Country is required";
    }
  }

  if (step === 1) {
    // Timeline and budget validation
    if (!data.startDate) {
      errors.startDate = "Start date is required";
    }
    if (!data.deadline) {
      errors.deadline = "Deadline is required";
    }
    if (!data.bidDeadline) {
      errors.bidDeadline = "Bid deadline is required";
    }
    if (!data.totalBudget || data.totalBudget <= 0) {
      errors.totalBudget = "Total budget is required and must be greater than 0";
    }

    // Phases validation (object array)
    if (!data.progressSteps || data.progressSteps.length === 0) {
      errors.phases = "At least one phase is required";
    } else {
      const invalidPhases = [];

      data.progressSteps.forEach((phase, index) => {
        if (!phase.name || phase.name.trim().length < 2) {
          invalidPhases.push(`Phase ${index + 1} name is too short`);
        }
        if (phase.name && phase.name.trim().length > 50) {
          invalidPhases.push(`Phase ${index + 1} name cannot exceed 50 characters`);
        }
        if (!phase.description || phase.description.trim().length < 5) {
          invalidPhases.push(`Phase ${index + 1} description is too short`);
        }
        if (!phase.deadline) {
          invalidPhases.push(`Phase ${index + 1} deadline is required`);
        }
      });

      // Duplicate check
      const names = data.progressSteps
        .map(p => p.name?.trim().toLowerCase())
        .filter(Boolean);
      const uniqueNames = [...new Set(names)];
      if (names.length !== uniqueNames.length) {
        invalidPhases.push("Phase names must be unique");
      }

      if (invalidPhases.length > 0) {
        errors.phases = invalidPhases.join(", ");
      }
    }

    // Date validation - ensure dates are logical
    if (data.startDate && data.deadline) {
      const start = new Date(data.startDate);
      const end = new Date(data.deadline);
      if (start >= end) {
        errors.deadline = "Deadline must be after start date";
      }
    }

    if (data.bidDeadline && data.startDate) {
      const bid = new Date(data.bidDeadline);
      const start = new Date(data.startDate);
      if (bid >= start) {
        errors.bidDeadline = "Bid deadline must be before start date";
      }
    }

    if (data.bidDeadline && data.deadline) {
      const bid = new Date(data.bidDeadline);
      const deadline = new Date(data.deadline);
      if (bid >= deadline) {
        errors.bidDeadline = "Bid deadline must be before project deadline";
      }
    }

    // Validate dates are not in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (data.startDate) {
      const start = new Date(data.startDate);
      if (start < today) {
        errors.startDate = "Start date cannot be in the past";
      }
    }

    if (data.bidDeadline) {
      const bid = new Date(data.bidDeadline);
      if (bid < today) {
        errors.bidDeadline = "Bid deadline cannot be in the past";
      }
    }
  }

  if (step === 2) {
    if (
      !data.contractorRequirements ||
      data.contractorRequirements.trim().length === 0
    ) {
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
        if (
          !data.estimatedQuantities[index] ||
          data.estimatedQuantities[index] <= 0
        ) {
          errors.materials = "All material quantities must be greater than 0";
          materialError = true;
        }
      });

      if (!materialError) {
        const materialNames = data.requiredMaterials.map(m =>
          m.trim().toLowerCase()
        );
        const uniqueMaterials = [...new Set(materialNames)];
        if (materialNames.length !== uniqueMaterials.length) {
          errors.materials = "Material names must be unique";
        }
      }
    }
  }

  if (step === 3) {
    if (!data.legal) {
      errors.legal = "Legal document is required";
    }
    if (!data.blueprints) {
      errors.blueprints = "Blueprints document is required";
    }
    if (!data.boq) {
      errors.boq = "Bill of Quantities (BoQ) document is required";
    }
    if (!data.safety) {
      errors.safety = "Safety document is required";
    }
  }

  if (step === 4) {
    if (data.comments && data.comments.length > 1000) {
      errors.comments = "Comments cannot exceed 1000 characters";
    }
  }

  return errors;
}
