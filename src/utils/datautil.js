const PATIENT_KEY = 'patients';
const INCIDENT_KEY = 'incidents';

export const getAllPatients = () => {
    const data = localStorage.getItem(PATIENT_KEY);
    return data ? JSON.parse(data) : [];
}

export const addPatient = (patient) => {
    const patients = getAllPatients();
    patients.push(patient);
    localStorage.setItem(PATIENT_KEY, JSON.stringify(patients));
}

export const updatePatient = (updated) => {
    const patients = getAllPatients().map((p) =>
        p.id === updated.id ? updated:p
    );
    localStorage.setItem(PATIENT_KEY, JSON.stringify(patients));
}

export const deletePatient = (id) => {
    const patients = getAllPatients().filter((p) => p.id !== id);
    localStorage.setItem(PATIENT_KEY, JSON.stringify(patients));
}

export const getAllIncidents = () => {
    const data = localStorage.getItem(INCIDENT_KEY);
    return data ? JSON.parse(data) : [];
}

export const addIncident = (incident) => {
    const incidents = getAllIncidents();
    incidents.push(incident);
    localStorage.setItem(INCIDENT_KEY, JSON.stringify(incidents));
}

export const updateIncident = (updated) => {
    const incidents = getAllIncidents().map((i) =>
        i.id === updated.id ? updated:i
    );
    localStorage.setItem(INCIDENT_KEY, JSON.stringify(incidents));
}

export const deleteIncident = (id) => {
    const incidents = getAllIncidents().filter((i) => i.id !== id);
    localStorage.setItem(INCIDENT_KEY, JSON.stringify(incidents));
}
