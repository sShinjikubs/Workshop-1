# AudioMart 🎧 - Premium Audio & Sound E-Commerce Platform
> CSI204: Digital Platform for Software Development Workshop #1

ยินดีต้อนรับสู่ **AudioMart** แพลตฟอร์มร้านค้าออนไลน์สำหรับเครื่องเสียง ลำโพง และหูฟังพรีเมียม โครงการนี้จัดทำขึ้นเพื่อสาธิตการออกแบบสถาปัตยกรรมระบบ (Platform Architecture) และการพัฒนาหน้าบ้านและหลังบ้าน (Full-Stack Web Development) ตามมาตรฐานการพัฒนาซอฟต์แวร์ที่ดี (Software Design Principles)

## 🌐 Live Demo & Documentation
- **Frontend Store (GitHub Pages):** [เข้าชมร้านค้า AudioMart](index.html)
- **Interactive System Architecture & Design Docs:** [ดูเอกสารวิเคราะห์และออกแบบระบบ](analysis_design.md)

---

## 📂 โครงสร้างโฟลเดอร์โครงการ (Project Structure)
```text
audiomart-platform/
├── backend/             # Express & TypeScript Backend API + Database Seed
├── frontend/            # Vite + React Frontend Application
├── UAT_Test_Cases.md    # เอกสารการออกแบบและการทดสอบ UAT (23 Test Cases)
├── UAT_Test_Cases.pdf   # รายงานผลการทดสอบ UAT ฉบับ A4 PDF
├── README.md            # เอกสารประกอบการติดตั้งและข้อมูลโครงงาน
└── analysis_design.md   # เอกสารการวิเคราะห์และออกแบบระบบ (Analysis & Design)
```

---

## 📄 เอกสารการวิเคราะห์และออกแบบระบบ (System Analysis & Design Docs)
โครงการนี้มีเอกสารการวิเคราะห์และออกแบบระบบโดยละเอียดอยู่ในไฟล์ [analysis_design.md](analysis_design.md) ซึ่งประกอบด้วยหัวข้อหลักดังนี้:
1. **การวิเคราะห์ความต้องการ (System Requirements)**: Functional Requirements ครอบคลุม 4 Roles (Guest, User/Customer, Seller, Manager/Admin) และ Non-functional Requirements
2. **การออกแบบสถาปัตยกรรมระบบ (System Architecture)**: แผนผังโครงสร้าง Single Page Application (React+Vite) เชื่อมต่อกับ Express REST API Server และ PostgreSQL / JSON Fallback DB
3. **การออกแบบฐานข้อมูล (Database Schema)**: ER Diagram และ Data Dictionary ครอบคลุมตาราง `users`, `profiles`, `products`, `orders`, `reviews`, `wishlist`, `pending_watches`, `blacklist` และ `system_logs` พร้อม Order Status ทั้ง 6 สถานะ
4. **แผนผังความสัมพันธ์และลำดับการทำงาน (UML Diagrams)**:
   - **Use Case Diagram**: บทบาทของ Guest, Customer, Seller, Manager และ Admin ภายในระบบ
   - **Class Diagram**: โครงสร้างและความสัมพันธ์ของคลาสจำลองใน AudioMart
   - **Sequence Diagram**: โฟลว์ลำดับขั้นตอนการกดสั่งซื้อ การตรวจสอบสลิป 3 ขั้นตอน (`manager-approve` ➔ `admin-confirm` ➔ `ship`) และการยืนยันตัวตน Seller
   - **Activity Diagram**: แผนผังกิจกรรมการเลือกสินค้า (Cart / Buy Now) การชำระเงิน (PromptPay / โอนธนาคาร / COD) จนถึงการส่งมอบสินค้า
5. **การออกแบบ UI/UX**: คอนเซปต์การดีไซน์แบบ Premium Dark & Gold Theme (Outfit Font, Glassmorphism UI) และโครงสร้างหน้าทั้งหมด

---

## 🛠️ เทคโนโลยีที่ใช้ในการออกแบบระบบ (System Technology Stack)
จากหัวข้อการเรียนรู้ในวิชา CSI204 ระบบถูกออกแบบโดยคำนึงถึงส่วนประกอบสำคัญดังนี้:

- **Frontend Architecture**: Single Page Application ด้วย React, Vite และ Vanilla CSS สำหรับสร้าง UI แบบ Component-based พร้อมระบบ i18n (TH/EN) และ Dark/Light Theme
- **API Orchestration Layer**: RESTful API สำหรับการเชื่อมต่อระหว่าง Frontend และ Backend Services
- **Backend Architecture**: Express Server พัฒนาด้วย Node.js & TypeScript
- **Database Architecture**: ฐานข้อมูล PostgreSQL สำหรับเก็บข้อมูลหลัก พร้อมระบบ JSON Fallback DB (`db.json`)

---

## 🚀 ขั้นตอนการติดตั้งและใช้งานภายในเครื่อง (Local Setup)

```bash
# 1. ติดตั้ง Dependencies ใน backend และ frontend
cd backend && npm install
cd ../frontend && npm install

# 2. Re-build Backend & Frontend
cd ../backend && npm run build
cd ../frontend && npm run build

# 3. เริ่มรันระบบ Local Server
cd ../backend && npm start
```
เปิดเบราว์เซอร์เข้าใช้งาน: **http://localhost:3000**

---

## 👥 ผู้จัดทำและการแบ่งงานตามประวัติ SourceTree / Git Commit

| ชื่อ-นามสกุล | รหัสนักศึกษา | Git Account (SourceTree Branch) | บทบาทและความรับผิดชอบหลัก |
| :--- | :--- | :--- | :--- |
| **1. กฤษฎา ต้องไกรเลิศ** | `67115444` | `sShinjikubs` | **Full-Stack Architect & Lead Developer**<br>• ออกแบบ System Architecture, RESTful API & ฐานข้อมูล SQL/Fallback DB<br>• พัฒนา Backend API (Auth, Orders, Products, Seller, Reviews, Wishlist)<br>• จัดทำเอกสาร UAT Test Cases (`UAT_Test_Cases.md/pdf`), เอกสารวิเคราะห์ระบบ และ DevOps Deploy บน Render |
| **2. ภูกิจ ปัญญาธิ** | `67120169` | `DESKTOP-H7BV0KF\PC` | **Backend Data & Inventory Specialist**<br>• ออกแบบโครงสร้างแคตตาล็อกสินค้า (Product Seeds & Database Schema)<br>• พัฒนาระบบคลังสินค้า (Inventory Management) และระบบรายการโปรด (Wishlist System)<br>• ออกแบบโฟลว์การซื้อสินค้าแบบทันที (Buy Now Checkout) และจัดการไฟล์รูปภาพ |
| **3. นนทิวัชร หมื่นสาย** | `67117362` | `nxntiwxt` | **Frontend UI/UX & Localization Specialist**<br>• ออกแบบและพัฒนาองค์ประกอบหน้าบ้าน (Frontend UI Components & Layout)<br>• พัฒนาระบบการสลับสองภาษา (Comprehensive i18n System: TH / EN) และ Dark/Light Theme<br>• พัฒนาระบบรีวิวสินค้า (Star Rating & Review System) และแก้ไขระบบค้นหาสินค้า |

- **สาขาวิชา:** วิทยาการคอมพิวเตอร์และนวัตกรรมซอฟต์แวร์ (Computer Science and Software Development Innovation)
- **คณะ:** เทคโนโลยีสารสนเทศ มหาวิทยาลัยศรีปทุม (SPU SIT)
