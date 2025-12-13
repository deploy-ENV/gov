import React from 'react';

// Utility function (from your previous request) to calculate days remaining
const calculateDaysRemaining = (endDateStr) => {
    if (!endDateStr) return 0;
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const [endDay, endMonth, endYear] = endDateStr.split('/');
        
        // Use a more reliable YYYY-MM-DD format for Date constructor
        const endDate = new Date(
            parseInt(endYear, 10), 
            parseInt(endMonth, 10) - 1, 
            parseInt(endDay, 10)
        );
        endDate.setHours(0, 0, 0, 0);

        const diffTime = endDate.getTime() - currentDate.getTime();
        const millisecondsPerDay = 1000 * 60 * 60 * 24;
        
        const diffDays = Math.ceil(diffTime / millisecondsPerDay);

        return diffDays > 0 ? diffDays : 0;
    } catch (e) {
        return 0;
    }
};

// --- Color Variables for Consistency ---
const COLOR_PRIMARY_BLUE = '#0D47A1'; // Deep Blue for Title
const COLOR_SECONDARY_BLUE = '#1565C0'; // Medium Blue for Subheadings
const COLOR_LIGHT_GRAY = '#f5f5f5'; // Background
const COLOR_BORDER = '#E0E0E0';
const COLOR_ACCENT_RED = '#D32F2F'; // For emphasis (Days Remaining / Near Deadline)

const ProjectDetailsViewer = ({ projectData, onBack ,onViewBids}) => {
    if (!projectData) {
        return <div style={{ padding: '20px', color: '#555' }}>No project data available.</div>;
    }

    const {
        title, status, id, createdByName, createdAt, deadline, expectedStartDate,
        bidSubmissionDeadline, totalBudget, location, projectManagerId,
        assignedSupervisorId, assignedContractorId, assignedSupplierIds,
        description, comments, requiredMaterials, contractorRequirements,
        estimatedQuantities, aiSupplierMatchEnabled, progressSteps
    } = projectData;

    // Helper to format date strings from YYYY-MM-DD to DD MMM YYYY
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'short',
                day: '2-digit'
            });
        } catch (e) {
            return dateString;
        }
    };

    // Calculate days remaining (using DD/MM/YYYY format for the internal function)
    const [year, month, day] = deadline.split('-');
    const daysRemaining = calculateDaysRemaining(`${day}/${month}/${year}`);

    // Determine status color for the tag
    const getStatusColor = (status) => {
        switch (status) {
            case 'COMPLETED': return { backgroundColor: '#4CAF50', color: 'white' }; // Green
            case 'IN_PROGRESS': return { backgroundColor: '#2196F3', color: 'white' }; // Bright Blue
            case 'PENDING': return { backgroundColor: '#FFC107', color: 'black' }; // Amber/Yellow
            default: return { backgroundColor: '#9E9E9E', color: 'white' }; // Gray
        }
    };

    return (
        <div style={styles.container}>
            {/* Top Navigation / Back Button */}
            <button 
                onClick={onBack} 
                style={styles.backButton}
            >
                &larr; Back to Projects
            </button>
            
            {/* Header: Title and Status */}
            <div style={styles.header}>
                <h1 style={styles.title}>{title || 'Untitled Project'}</h1>
                <div>
                    <span style={{ ...styles.statusTag, ...getStatusColor(status) }}>
                    {status || 'Unknown'}
                    </span>
                    <button 
                        onClick={onViewBids} 
                        style={styles.backButton}
                    >
                        View Bid Details
                    </button>
                </div>
            </div>
            
            <div style={{ ...styles.section, borderTop: 'none' }}>
                <p style={styles.metadata}>
                    **Project ID:** {id}
                    <span style={{ margin: '0 15px' }}>|</span>
                    **Created By:** {createdByName || 'N/A'}
                    <span style={{ margin: '0 15px' }}>|</span>
                    **Created On:** {formatDate(createdAt)}
                </p>
            </div>

            <hr style={styles.hr} />

            {/* Main Content Area (Two Columns) */}
            <div style={styles.mainContent}>
                {/* Column 1: Timeline & Budget */}
                <div style={styles.column}>
                    <h2 style={styles.subHeading}>🗓️ Timeline & Deadlines</h2>
                    <DetailItem label="Expected Start Date" value={formatDate(expectedStartDate)} />
                    <DetailItem label="Project Deadline" value={formatDate(deadline)} highlight={daysRemaining <= 7} />
                    <DetailItem label="Bid Submission Deadline" value={formatDate(bidSubmissionDeadline)} />
                    <DetailItem label="Days Remaining" value={`${daysRemaining} day(s)`} emphasis={true} />
                    
                    <h2 style={styles.subHeading}>💰 Financial</h2>
                    <DetailItem 
                        label="Total Budget" 
                        value={
                            totalBudget ? 
                            `£${totalBudget.toLocaleString('en-GB')}` : 
                            'N/A'
                        } 
                    />
                    <DetailItem label="Budget Approved" value={projectData.budgetApproved || 'N/A'} />
                    <DetailItem label="Budget Used" value={projectData.budgetUsed || 'N/A'} />
                </div>

                {/* Column 2: Personnel & Location */}
                <div style={styles.column}>
                    <h2 style={styles.subHeading}>📍 Location & Personnel</h2>
                    <DetailItem label="Location" value={`${location?.street}, ${location?.city}, ${location?.state}, ${location?.country}`.replace(/,\s*N\/A/g, '')} />
                    <DetailItem label="Project Manager ID" value={projectManagerId || 'N/A'} />
                    <DetailItem label="Assigned Supervisor ID" value={assignedSupervisorId || 'N/A'} />
                    <DetailItem label="Assigned Contractor ID" value={assignedContractorId || 'N/A'} />
                    <DetailItem label="Assigned Supplier IDs" value={assignedSupplierIds?.join(', ') || 'N/A'} />
                    <DetailItem label="Department ID" value={projectData.departmentId || 'N/A'} />
                    
                    <h2 style={styles.subHeading}>⚙️ System Details</h2>
                    <DetailItem label="AI Supplier Match" value={aiSupplierMatchEnabled ? 'Enabled' : 'Disabled'} />
                    <DetailItem label="Progress Steps" value={`${progressSteps?.length || 0} step(s)`} />
                </div>
            </div>

            <hr style={styles.hr} />

            {/* Description and Requirements */}
            <div style={styles.section}>
                <h2 style={styles.subHeading}>📝 Description & Requirements</h2>
                <BlockDetail label="Description" content={description} />
                <BlockDetail label="Internal Comments" content={comments} />
                
                <div style={styles.twoColumnList}>
                    <BlockDetail label="Required Materials" content={requiredMaterials?.join(', ') || 'None'} />
                    <BlockDetail label="Contractor Requirements" content={contractorRequirements || 'None'} />
                </div>
                <DetailItem label="Estimated Quantities" value={estimatedQuantities?.join(', ') || 'N/A'} />
            </div>
        </div>
    );
};

// --- Sub-Components for Reusability ---

const DetailItem = ({ label, value, highlight = false, emphasis = false }) => (
    <div style={styles.detailItem}>
        <span style={{ 
            ...styles.label, 
            color: emphasis ? COLOR_ACCENT_RED : styles.label.color 
        }}>{label}:</span>
        <span style={{ 
            ...styles.value, 
            fontWeight: highlight || emphasis ? 'bold' : 'normal', 
            color: highlight || emphasis ? COLOR_ACCENT_RED : styles.value.color 
        }}>{value}</span>
    </div>
);

const BlockDetail = ({ label, content }) => (
    <div style={{ margin: '15px 0' }}>
        <h4 style={styles.blockLabel}>{label}:</h4>
        <div style={styles.blockContent}>{content || 'N/A'}</div>
    </div>
);


// --- Basic Inline Styles (for demonstration) ---

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        backgroundColor: COLOR_LIGHT_GRAY,
        borderRadius: '8px',
        maxWidth: '1600px',
        margin: '20px auto',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        color: '#333', 
    },
    backButton: {
        background: 'none',
        border: 'none',
        color: COLOR_SECONDARY_BLUE,
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
        marginBottom: '15px',
        padding: '10px',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '10px',
    },
    title: {
        fontSize: '28px',
        fontWeight: '700',
        color: COLOR_PRIMARY_BLUE,
        margin: '0',
    },
    statusTag: {
        padding: '6px 12px',
        borderRadius: '16px',
        fontSize: '14px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    metadata: {
        fontSize: '12px',
        color: '#777',
        margin: '0',
    },
    hr: {
        border: '0',
        height: '1px',
        backgroundColor: COLOR_BORDER,
        margin: '20px 0',
    },
    mainContent: {
        display: 'flex',
        gap: '40px',
    },
    column: {
        flex: '1',
    },
    subHeading: {
        fontSize: '18px',
        fontWeight: '600',
        color: COLOR_SECONDARY_BLUE,
        marginBottom: '15px',
        marginTop: '0',
        borderBottom: `2px solid #BBDEFB`,
        paddingBottom: '5px',
    },
    detailItem: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '5px 0',
        borderBottom: '1px dotted #EEE',
    },
    label: {
        fontWeight: '500',
        color: '#555',
        marginRight: '15px',
    },
    value: {
        textAlign: 'right',
        fontWeight: 'normal',
        color: '#333'
    },
    section: {
        padding: '10px 0',
    },
    blockLabel: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#333',
        marginBottom: '5px',
        marginTop: '0',
    },
    blockContent: {
        backgroundColor: '#fff',
        padding: '10px',
        border: `1px solid ${COLOR_BORDER}`,
        borderRadius: '4px',
        whiteSpace: 'pre-wrap',
        fontSize: '14px',
        color: '#444',
    },
    twoColumnList: {
        display: 'flex',
        gap: '20px',
    }
};

export default ProjectDetailsViewer;