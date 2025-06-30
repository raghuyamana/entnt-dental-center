# 🦷 ENTNT Dental Center Management

This is a **React-based Admin + Patient dashboard** built for the ENTNT frontend assignment.

> 🔗 **Live App:** [https://entnt-dental-center.netlify.app](https://entnt-dental-center.netlify.app)  
> 🗃️ **GitHub Repo:** [https://github.com/raghuyamana/entnt-dental-center](https://github.com/raghuyamana/entnt-dental-center)

---

## 📦 Tech Stack

- **React** (with functional components & hooks)
- **TailwindCSS** for UI
- **React Router** for routing
- **Context API** for session management
- **localStorage** to simulate backend
- **Pure JavaScript validation** (no external libs)

---

## 👤 Users

- ✅ **Admin**
  - Email: `admin@entnt.in`
  - Password: `admin123`

- ✅ **Patient**
  - Email: `user@entnt.in`
  - Password: `user123`

---

## 🔐 Features by Role

### 👨‍⚕️ Admin Panel

- 🧑 Patient Management (Add / Edit / Delete)
- 📅 Appointment Management (Add incidents, upload files, treatments)
- 📆 Calendar View (next 30 days)
- 📊 Dashboard with KPIs:
  - Next 10 appointments
  - Top patients
  - Pending / Completed status
  - Total revenue

### 👤 Patient Dashboard

- View own profile
- See appointments & treatment details
- Open uploaded files in new tab

---

## 💾 Data Handling

- Simulated backend using `localStorage`
- File uploads stored as **Base64** (for preview & persistence)
- Session stored in `localStorage`

---

## ⚠️ Form Validation

- Mandatory fields enforced via `required` and JS validation
- Error alerts for missing inputs

---

## 🚀 Deployment Instructions

### Local Setup

```bash
git clone https://github.com/your-username/entnt-dental-center.git
cd entnt-dental-center
npm install
npm start
