# Government College of Technology (GCT), Bhakkar
## Computer Information Technology (CIT) Student Portal — Full-Stack MERN Application

This project is built for **DAE Computer Information Technology (CIT)** at Government College of Technology (GCT), Bhakkar. It contains the official PBTE timetable, course outlines, 75% attendance criteria rules, academic grade bell curves, assignments portal, campus notification center with live audio/visual alerts, and local MongoDB connection integration.

---

### Quick Start Guide (Run in VS Code)

#### 1. Prerequisites
Before running, ensure you have the following installed on your computer:
- **Node.js** (v18 or v20+ recommended): [https://nodejs.org/](https://nodejs.org/)
- **VS Code** (Visual Studio Code): [https://code.visualstudio.com/](https://code.visualstudio.com/)
- *(Optional for full database persistence)* **MongoDB Community Server**: [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)

---

#### 2. Extract & Open in VS Code
1. Download the `gct_bhakkar_cit_portal.zip` file.
2. Right-click the `.zip` file and choose **Extract All...** (or unzip in your preferred folder).
3. Open **VS Code**.
4. Go to **File > Open Folder...** and select the extracted folder (`gct_bhakkar_cit_portal`).

---

#### 3. Install Dependencies
1. Inside VS Code, open an integrated terminal:
   - Shortcut: `Ctrl + ~` (Windows/Linux) or `Cmd + ~` (Mac)
   - Or via menu: **Terminal > New Terminal**
2. Run:
   ```bash
   npm install
   ```

---

#### 4. Run Development Server
In the VS Code terminal, execute:
```bash
npm run dev
```

The Express backend & Vite frontend will start:
```
Server running on http://localhost:3000
```
Open your web browser (Chrome, Edge, Firefox) and navigate to:
**`http://localhost:3000`**

---

#### 5. Connecting to Local MongoDB (Optional)
By default, the application runs with full in-memory API support mirroring MongoDB collections. If you want to connect to a live local MongoDB instance:
1. Start your local MongoDB service:
   - Windows: Start the service from Windows Services or run `net start MongoDB`
   - Linux / macOS: `mongod --dbpath /data/db`
2. Local database URL configured in project:
   `mongodb://localhost:27017/gct_portal`
3. The server handles Mongoose schemas for:
   - `users`
   - `timetables`
   - `courses`
   - `assignments`
   - `attendance`
   - `notifications`

---

### Features & Requirements Covered
1. **5-Second Splash Screen**: GCT Bhakkar logo, PBTE accreditation badge, and progress bar with skip option.
2. **Login Screen**: Student & Faculty login with 1-click preview demo credentials (Roll: `24CIT105` - Aliyan Ansari).
3. **Dashboard View**: Notices, PBTE circulars, class timetable ticker, and live stats.
4. **TimeTable View**: Official 2026-27 GCT Bhakkar CIT Timetable for 1st, 2nd, and 3rd Year with lab venues (Computer Lab-1, Software Lab, Electronics Lab).
5. **Grade Curve**: Gaussian distribution, percentile analysis, and interactive GPA simulator.
6. **Course Details**: Theory & practical hours, PBTE syllabus, textbooks.
7. **Assignment Hub**: File submissions, upload modals, teacher assignment creation.
8. **Attendance Tracker**: Strict 75% attendance rule compliance and What-If simulator.
9. **Notifications Center**: Instant triggers for Class Shift, Class End, Next Class, Break Time, and Reminders with audible chime feedback.
10. **Student Profile**: Academic credentials, editable personal info, and CIT faculty directory.
