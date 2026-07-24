# AudioMart 🎧 - Premium Audio & Sound E-Commerce Platform
> CSI204: Digital Platform for Software Development Workshop #1

ยินดีต้อนรับสู่ **AudioMart** แพลตฟอร์มร้านค้าออนไลน์สำหรับเครื่องเสียง ลำโพง และหูฟังพรีเมียม โครงการนี้จัดทำขึ้นเพื่อสาธิตการออกแบบสถาปัตยกรรมระบบ (Platform Architecture) และการพัฒนาหน้าบ้าน (Frontend Development) ตามมาตรฐานการพัฒนาซอฟต์แวร์ที่ดี (Software Design Principles)

## 🌐 Live Demo & Documentation
- **Frontend Store (GitHub Pages):** [เข้าชมร้านค้า AudioMart](index.html)
- **Interactive System Architecture & Design Docs:** [ดูเอกสารวิเคราะห์และออกแบบระบบ](markdown.html)

---

## 📂 โครงสร้างโฟลเดอร์โครงการ (Project Structure)
```text
audiomart-platform/
├── backend/             # Express & TypeScript Backend API + Database Seed
├── frontend/            # Vite + React Frontend Application
├── UAT_Test_Cases.md    # เอกสารการออกแบบและการทดสอบ UAT
├── UAT_Test_Cases.pdf   # รายงานผลการทดสอบ UAT ฉบับ A4 PDF
├── README.md            # เอกสารประกอบการติดตั้งและข้อมูลโครงงาน
└── analysis_design.md   # เอกสารการวิเคราะห์และออกแบบระบบ (Analysis & Design)
```

---

## 📄 เอกสารการวิเคราะห์และออกแบบระบบ (System Analysis & Design Docs)
โครงการนี้มีเอกสารการวิเคราะห์และออกแบบระบบโดยละเอียดอยู่ในไฟล์ [analysis_design.md](analysis_design.md) ซึ่งประกอบด้วยหัวข้อหลักดังนี้:
1. **การวิเคราะห์ความต้องการ (System Requirements)**: Functional และ Non-functional Requirements
2. **การออกแบบสถาปัตยกรรมระบบ (System Architecture)**: แผนผังการเชื่อมโยงระหว่าง Client, Gateway, Microservices, ฐานข้อมูล และบริการภายนอก (LINE Notify API)
3. **การออกแบบฐานข้อมูล (Database Schema)**: SQL โครงสร้างตาราง `users`, `products`, `orders` และเหตุผลการยกเลิก `cancel_reason`
4. **แผนผังความสัมพันธ์และลำดับการทำงาน (UML Diagrams)**:
   - **Use Case Diagram**: บทบาทของ Customer, Staff และ Admin ภายในระบบ
   - **Class Diagram**: โครงสร้างและความสัมพันธ์ของคลาสจำลองใน AudioMart
   - **Sequence Diagram**: โฟลว์ลำดับขั้นตอนการกดสั่งซื้อและการประมวลผลการจ่ายเงิน PromptPay QR
   - **Activity Diagram**: แผนผังกิจกรรมตั้งแต่ลูกค้าเข้าเว็บจนจัดส่งสินค้าสำเร็จ
5. **การออกแบบ UI/UX & Wireframe**: คอนเซปต์การดีไซน์แบบ Premium Dark & Gold Theme และแบบร่างหน้าจอหลัก

---

## 🛠️ เทคโนโลยีที่ใช้ในการออกแบบระบบ (System Technology Stack)
จากหัวข้อการเรียนรู้ในวิชา CSI204 ระบบถูกออกแบบโดยคำนึงถึงส่วนประกอบสำคัญดังนี้:

- **Frontend Architecture**: Single Page Application ด้วย React, Vite และ Vanilla CSS สำหรับสร้าง UI แบบ Component-based
- **API Orchestration Layer**: ออกแบบเป็น RESTful API สำหรับการเชื่อมต่อระหว่าง Frontend และ Backend Services
- **Backend Architecture**: Express Server พัฒนาด้วย Node.js & TypeScript 
- **Database Architecture**: ฐานข้อมูล PostgreSQL สำหรับเก็บข้อมูลหลัก พร้อมระบบ JSON Fallback DB

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
| **1. กฤษฎา ต้องไกรเลิศ** | `67115444` | `sShinjikubs` | **Full-Stack Architect & Lead Developer**<br>• ออกแบบ System Architecture, RESTful API & ฐานข้อมูล SQL/Fallback DB<br>• พัฒนา Backend Microservices, JWT Auth, Easy Donate QR Payment & LINE Notify<br>• จัดทำเอกสาร UAT Test Cases (`UAT_Test_Cases.md/pdf`), เอกสารวิเคราะห์ระบบ และ DevOps Deploy บน Render |
| **2. ภูกิจ ปัญญาธิ** | `67120169` | `DESKTOP-H7BV0KF\PC` | **Backend Data & Inventory Specialist**<br>• ออกแบบโครงสร้างแคตตาล็อกสินค้า (Product Seeds & Database Schema)<br>• พัฒนาระบบคลังสินค้า (Inventory Management) และระบบรายการโปรด (Wishlist System)<br>• ออกแบบโฟลว์การซื้อสินค้าแบบทันที (Isolated Buy Now Checkout) และจัดการไฟล์รูปภาพ |
| **3. นนทิวัชร หมื่นสาย** | `67117362` | `nxntiwxt` | **Frontend UI/UX & Localization Specialist**<br>• ออกแบบและพัฒนาองค์ประกอบหน้าบ้าน (Frontend UI Components & Layout)<br>• พัฒนาระบบการสลับสองภาษา (Comprehensive i18n System: TH / EN)<br>• ปรับแต่งภาพแบรนด์สินค้า โลโก้ และแก้ไขระบบค้นหาสินค้า (Search Bar UI & Star Rating UI) |

- **สาขาวิชา:** วิทยาการคอมพิวเตอร์และนวัตกรรมซอฟต์แวร์ (Computer Science and Software Development Innovation)
- **คณะ:** เทคโนโลยีสารสนเทศ มหาวิทยาลัยศรีปทุม (SPU SIT)
