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

## 👥 ผู้จัดทำ (Developers)
1. **ชื่อ-นามสกุล**: กฤษฎา ต้องไกรเลิศ (รหัสนักศึกษา: 67115444)
2. **ชื่อ-นามสกุล**: ภูกิจ ปัญญาธิ (รหัสนักศึกษา: 67120169)
3. **ชื่อ-นามสกุล**: นนทิวัชร หมื่นสาย (รหัสนักศึกษา: 67117362)

- สาขาวิชาวิทยาการคอมพิวเตอร์และนวัตกรรมซอฟต์แวร์ (Computer Science and Software Development Innovation)
- มหาวิทยาลัยศรีปทุม (SPU SIT)
