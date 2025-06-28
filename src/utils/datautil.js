const PATIENT_KEY = 'patients';

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
