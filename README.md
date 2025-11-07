# 🛍️ Vibe‑Commerce

Vibe‑Commerce is a full‑stack mock‑ecommerce application built to demonstrate a modern frontend‑backend architecture with clear separation of concerns.  
It is designed for rapid development, clear code structure, and ease of maintenance.

---

## 📁 Repository Structure

```
/
├── frontend/       ← React (Vite) frontend UI
├── backend/        ← Node.js + Express API server
└── README.md       ← This file
```

---

## ✨ Features

- Browse a list of products  
- Add/remove items from your shopping cart  
- View real‑time cart totals  
- Mock checkout flow (no actual payments)  
- Responsive UI built with modern tools  
- Single repository with separate frontend + backend for scalability  

---

## 🧰 Tech Stack

| Layer    | Technology                               |
|----------|-----------------------------------------|
| Frontend | React 18 + Vite, Tailwind CSS, Axios    |
| Backend  | Node.js, Express, MongoDB (via Mongoose)|
| Database | MongoDB Atlas or Local MongoDB instance |
| Tooling  | ESLint, Prettier, dotenv, Nodemon        |
| Deployment| Static host (frontend) + Node host (backend) |

---

## 🚀 Getting Started

### 1️⃣ Clone the repository  
```bash
git clone https://github.com/Priyankar01/vibe‑commerce.git
cd vibe‑commerce
```

### 2️⃣ Setup the backend  
```bash
cd backend
npm install
cp .env.example .env     # fill in MONGO_URI, PORT etc
npm run dev              # for development with auto‑reload
```
Server will start at **http://localhost:5000** (unless configured otherwise).

### 3️⃣ Setup the frontend  
```bash
cd ../frontend
npm install
cp .env.example .env     # fill in VITE_API_BASE_URL=http://localhost:5000/api (for example)
npm run dev              # start dev server
```
Frontend will open at **http://localhost:5173** (or displayed local URL).

### 4️⃣ View the App  
Open your browser at the frontend URL, and you should be able to browse products, add/remove from cart, and run through the checkout flow.

---

## 🖼️ Screenshots

![Product Listing](./assets/screenshots/products.png)  
*Browse a list of products.*

![Cart Page](./assets/screenshots/cart.png)  
*Add items, remove them, and see live total updates.*

![Checkout Confirmation](./assets/screenshots/checkout.png)  
*Mock checkout confirmation page.*

*(Make sure to add actual screenshot files under `frontend/assets/screenshots/` or adjust paths accordingly.)*

---

## 🎥 Demo Video  
[Watch demo (1‑2 min)](https://www.loom.com/share/your‑video‑link)  
*(Replace with actual video link after uploading a Loom or unlisted YouTube video.)*

---

## 🧠 How It Works

- The frontend uses React with Vite for fast builds and hot‑reload development.  
- Tailwind CSS (using the Keppel colour palette) ensures a consistent design system.  
- The frontend makes REST API calls (via Axios) to the backend endpoints (e.g., `/api/products`, `/api/cart`, `/api/checkout`).  
- The backend is an Express server connecting to MongoDB via Mongoose, exposing endpoints for products, cart operations, and checkout.  
- Separate directories for frontend and backend ensure that the UI logic and API logic are decoupled—allowing independent development, testing, and deployment.

---

## 🎯 Why this Architecture?

- **Separation of concerns**: UI and server live in separate folders so each can evolve independently.  
- **Scalability**: You can swap backend technology, add microservices, or replace the frontend with a mobile app without re‑architecting entirely.  
- **Developer experience**: With Vite and Nodemon, development is fast with live reloading.  
- **Maintainability**: Clear folder structure, environment variable usage, linting/formatting all make the codebase sustainable.

---

## 🧑‍💻 How to Contribute

1. Fork this repository.  
2. Create a branch: `git checkout -b feature/<name>`.  
3. Make your changes, add tests/documentation if applicable.  
4. Commit with a clear message: `git commit -m "feat: <brief description>"`.  
5. Push: `git push origin feature/<name>` and open a Pull Request.  
6. Ensure linting and builds pass, update documentation if you added any features.

---

## Screenshots of the public pages and folder structure
<img width="398" height="919" alt="Screenshot 2025-11-07 075333" src="https://github.com/user-attachments/assets/120c31e0-8299-4df3-ad4e-54db8623a739" />
<img width="2159" height="526" alt="Screenshot 2025-11-07 075303" src="https://github.com/user-attachments/assets/c4d8537b-7f1c-4344-9a46-b8acd81ac26c" />
<img width="2159" height="386" alt="Screenshot 2025-11-07 075254" src="https://github.com/user-attachments/assets/84bbf99f-f77e-4f1a-866b-0297c162a311" />
<img width="2159" height="398" alt="Screenshot 2025-11-07 075241" src="https://github.com/user-attachments/assets/a8c40c3a-39d5-45aa-b58e-7c8cb70751b0" />
<img width="2159" height="1321" alt="Screenshot 2025-11-07 075215" src="https://github.com/user-attachments/assets/bf6fff25-ce30-4667-9219-e2c94a1a5444" />



## 📄 License

This project is licensed under the **MIT License**. You are free to use, modify, and distribute it with attribution.

---

## 👤 Author

**Priyankar Dutta**  
GitHub: [@Priyankar01](https://github.com/Priyankar01)  
