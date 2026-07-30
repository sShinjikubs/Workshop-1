# 📄 เอกสารการวิเคราะห์และออกแบบระบบ (System Analysis & Design)
## โครงการ: AudioMart - แพลตฟอร์มร้านขายเครื่องเสียงและอุปกรณ์เสียงพรีเมียมออนไลน์
**วิชา: CSI204 ดิจิทัลแพลตฟอร์มสำหรับพัฒนาซอฟต์แวร์ (SPU SIT)**  
**ผู้จัดทำและการแบ่งงานตามประวัติ Git / SourceTree:**

| ชื่อ-นามสกุล | รหัสนักศึกษา | Git Account / Commit สายงาน | บทบาทและความรับผิดชอบหลัก (Contributions) |
| :--- | :--- | :--- | :--- |
| **1. กฤษฎา ต้องไกรเลิศ** | `67115444` | `sShinjikubs` | **Full-Stack Architect & Lead Developer**<br>• ออกแบบ System Architecture, RESTful API & ฐานข้อมูล SQL/Fallback DB<br>• พัฒนา Backend API (Auth, Orders, Products, Seller, Reviews, Wishlist)<br>• จัดทำเอกสาร UAT Test Cases, เอกสารวิเคราะห์ระบบ และ DevOps Deploy บน Render |
| **2. ภูกิจ ปัญญาธิ** | `67120169` | `DESKTOP-H7BV0KF\PC` | **Backend Data & Inventory Specialist**<br>• ออกแบบโครงสร้างแคตตาล็อกสินค้า (Product Seeds & Database Schema)<br>• พัฒนาระบบคลังสินค้า (Inventory Management) และระบบรายการโปรด (Wishlist System)<br>• ออกแบบโฟลว์การซื้อสินค้าแบบทันที (Buy Now Checkout) และจัดการไฟล์รูปภาพ |
| **3. นนทิวัชร หมื่นสาย** | `67117362` | `nxntiwxt` | **Frontend UI/UX & Localization Specialist**<br>• ออกแบบและพัฒนาองค์ประกอบหน้าบ้าน (Frontend UI Components & Layout)<br>• พัฒนาระบบการสลับสองภาษา (i18n System: TH / EN) และ Dark/Light Theme<br>• พัฒนาระบบรีวิวสินค้า (Star Rating & Review System) และแก้ไขระบบค้นหาสินค้า |

---

## 1. การวิเคราะห์ความต้องการของระบบ (System Requirements)

### 1.1 ความต้องการเชิงฟังก์ชัน (Functional Requirements)

#### 👤 ระบบสำหรับผู้เยี่ยมชม (Guest — ยังไม่ได้ล็อกอิน)
- เรียกดูและค้นหาสินค้าเครื่องเสียงตามชื่อ แบรนด์ หรือหมวดหมู่
- กรองสินค้าตามประเภท (Speaker / Headphones / Earbuds) และช่วงราคา
- ดูรายละเอียดสินค้า สเปค รูปภาพ และรีวิวจากลูกค้า

#### 🛒 ระบบสำหรับลูกค้า (User — ผ่านการสมัครสมาชิก)
- ลงทะเบียนสมัครสมาชิกและเข้าสู่ระบบ (Register / Login)
- จัดการตะกร้าสินค้า: เพิ่ม / ลด / ลบสินค้า พร้อมเลือกรายการที่ต้องการชำระ
- จัดการรายการสินค้าที่ต้องการ (Wishlist) เพิ่ม/ลบได้
- ซื้อสินค้าทันที (Buy Now) โดยไม่ผ่านตะกร้า
- สั่งซื้อและชำระเงินผ่าน 3 ช่องทาง: PromptPay QR / โอนเงินธนาคาร / เก็บเงินปลายทาง (COD)
- แนบสลิปชำระเงิน (Upload Slip) สำหรับช่องทาง PromptPay และโอนธนาคาร
- ติดตามสถานะคำสั่งซื้อและดูประวัติทั้งหมดใน My Orders
- ยกเลิกคำสั่งซื้อที่ยังไม่ถูกยืนยัน พร้อมดูเหตุผลการปฏิเสธ (cancel_reason)
- เขียนรีวิวและให้คะแนนสินค้า (1-5 ดาว)
- แก้ไขข้อมูลโปรไฟล์ส่วนตัว (ชื่อ, ที่อยู่, อีเมล, เบอร์โทร, รูปอวตาร)
- สลับภาษาไทย / อังกฤษ และสลับ Dark / Light Theme

#### 🛍️ ระบบสำหรับผู้ขาย (Seller — User ที่ผ่านการยืนยันตัวตน)
- ยืนยันตัวตนด้วยชื่อ, อีเมล, และเลขบัตรประชาชน (13 หลัก) พร้อมตรวจสอบประวัติแบล็คลิสต์
- เมื่อผ่านการยืนยัน สามารถเข้าถึง Seller Portal เพื่อเสนอนำเข้าสินค้าใหม่สู่คลังสินค้า
- ติดตามสถานะการพิจารณาสินค้าที่เสนอ (pending / approved / rejected)

#### 👔 ระบบสำหรับผู้จัดการ (Manager)
- ดูภาพรวมยอดขายผ่าน Dashboard (ยอดรวม, จำนวนออเดอร์, กราฟแนวโน้ม 7 วัน)
- ตรวจสอบสลิปชำระเงิน: อนุมัติหรือปฏิเสธพร้อมระบุเหตุผล
- จัดการคลังสินค้า: เพิ่ม, แก้ไขราคา/สต็อก/รูปภาพสินค้า (CRUD)
- ตรวจสอบและอนุมัติ/ปฏิเสธสินค้าที่ Seller เสนอเข้า (Inspection Queue)
- ยืนยันการจัดส่งสินค้าหลังจาก Admin อนุมัติ

#### 👑 ระบบสำหรับผู้ดูแลระบบ (Admin)
- ทุกอย่างที่ Manager ทำได้
- ยืนยันขั้นสุดท้ายของออเดอร์ที่ Manager อนุมัติสลิปแล้ว (Admin Final Confirm)
- ลบสินค้าออกจากระบบ
- จัดการผู้ใช้: เปลี่ยน role และ reset รหัสผ่าน
- ดู System Logs การทำงานทั้งหมด
- เข้าถึงหน้าเอกสารระบบ (System Docs)

### 1.2 ความต้องการที่มิใช่เชิงฟังก์ชัน (Non-Functional Requirements)
- **Security**: ตรวจสอบสิทธิ์ด้วย Session-based Auth (localStorage + server validation)
- **Performance**: Backend ใช้ PostgreSQL พร้อม JSON Fallback เพื่อความเสถียรเมื่อ DB ไม่พร้อมใช้งาน
- **Scalability**: แยก Frontend (Vite/React SPA) และ Backend (Express/TypeScript REST API)
- **Responsiveness**: UI รองรับหน้าจอทุกขนาด (Mobile-First Responsive Design)
- **Bilingual**: รองรับภาษาไทยและอังกฤษ (i18n) และ Dark/Light Theme

---

## 2. การออกแบบสถาปัตยกรรมระบบ (System Architecture)

ระบบพัฒนาตามแนวคิด **Separation of Concerns** โดยแบ่งเป็น 2 ส่วนหลัก:
- **Frontend**: Single Page Application (SPA) พัฒนาด้วย React + Vite + Vanilla CSS
- **Backend**: RESTful API Server พัฒนาด้วย Node.js + Express + TypeScript

```mermaid
graph TB
    subgraph Client_Layer ["📱 Client Layer (Frontend — React + Vite SPA)"]
        A1["💻 User / Seller Portal<br/>(Customer UI + Seller Portal)"]
        A2["👔 Manager Dashboard<br/>(/manager)"]
        A3["👑 Admin Dashboard<br/>(/admin)"]
    end

    subgraph Backend_Layer ["⚙️ Backend API Server (Express + TypeScript — Unified Server)"]
        AuthSvc["👤 Auth & Profile<br/>POST /api/auth/login<br/>POST /api/auth/register<br/>GET|POST /api/auth/profile"]
        ProductSvc["📦 Product Catalog<br/>GET /api/products<br/>POST /api/products<br/>PUT|DELETE /api/products/:id"]
        OrderSvc["🧾 Order & Payment Flow<br/>POST /api/orders<br/>POST /api/orders/:id/submit-slip<br/>POST /api/orders/:id/manager-approve<br/>POST /api/orders/:id/manager-reject<br/>POST /api/orders/:id/admin-confirm<br/>POST /api/orders/:id/ship<br/>POST /api/orders/:id/cancel"]
        SellerSvc["🛍️ Seller & Inspection<br/>POST /api/pending-watches/register-seller<br/>GET|POST /api/pending-watches<br/>POST /api/pending-watches/:id/approve<br/>POST /api/pending-watches/:id/reject"]
        ReviewSvc["⭐ Reviews & Wishlist<br/>GET|POST /api/reviews/:productId<br/>GET|POST|DELETE /api/wishlist/:username"]
        PaymentSvc["💳 PromptPay QR Generator<br/>GET /api/payment/qr"]
        LogSvc["📋 System Logs<br/>GET|POST /api/logs<br/>GET /api/users<br/>PUT /api/users/:username"]
    end

    subgraph Data_Layer ["💾 Database Layer"]
        SQL_DB[("🗄️ PostgreSQL<br/>(Primary DB)")]
        JSON_DB[("📁 db.json<br/>(Fallback DB)")]
    end

    A1 --> AuthSvc
    A1 --> ProductSvc
    A1 --> OrderSvc
    A1 --> ReviewSvc
    A1 --> PaymentSvc
    A1 --> SellerSvc

    A2 --> OrderSvc
    A2 --> ProductSvc
    A2 --> SellerSvc
    A2 --> LogSvc

    A3 --> OrderSvc
    A3 --> ProductSvc
    A3 --> SellerSvc
    A3 --> LogSvc
    A3 --> AuthSvc

    AuthSvc --> SQL_DB
    ProductSvc --> SQL_DB
    OrderSvc --> SQL_DB
    SellerSvc --> SQL_DB
    ReviewSvc --> SQL_DB
    LogSvc --> SQL_DB

    SQL_DB -.-> JSON_DB
```

---

## 3. โครงสร้างฐานข้อมูล (Database Schema Design)

### 3.1 แผนภาพความสัมพันธ์ฐานข้อมูล (ER Diagram)

```mermaid
erDiagram
    users ||--o| profiles : "has profile"
    users ||--o{ orders : "places"
    users ||--o{ reviews : "writes"
    users ||--o{ wishlist : "saves"
    users ||--o{ pending_watches : "proposes"
    products ||--o{ reviews : "receives"
    products ||--o{ wishlist : "saved in"

    users {
        varchar username PK
        varchar password
        varchar role
        timestamp created_at
    }

    profiles {
        varchar username PK
        varchar firstname
        varchar lastname
        varchar email
        varchar phone
        text address
        text avatar
    }

    products {
        varchar id PK
        varchar name
        varchar name_en
        varchar brand
        varchar category
        numeric price
        int stock
        varchar image
        varchar image_back
    }

    orders {
        varchar id PK
        varchar user_id FK
        jsonb items
        numeric total
        varchar email
        text address
        varchar payment
        varchar status
        timestamp date
        text slip
        text cancel_reason
    }

    reviews {
        serial id PK
        varchar product_id FK
        varchar username FK
        int rating
        text comment
        varchar date
    }

    wishlist {
        serial id PK
        varchar username FK
        varchar product_id FK
    }

    pending_watches {
        varchar id PK
        varchar brand
        varchar model
        numeric price
        varchar proposed_banding
        varchar dial_color
        text description
        varchar seller_name
        varchar seller_email
        varchar inspection_status
    }

    blacklist {
        varchar email PK
        varchar national_id UK
        text reason
    }

    system_logs {
        serial id PK
        text message
        timestamp created_at
    }
```

### 3.2 รายละเอียดโครงสร้างตาราง (Data Dictionary)

#### ตาราง `users`
| Column | Type | Description |
| :--- | :--- | :--- |
| `username` | VARCHAR(50) PK | ชื่อผู้ใช้สำหรับเข้าสู่ระบบ |
| `password` | VARCHAR(255) | รหัสผ่าน |
| `role` | VARCHAR(20) | สิทธิ์ผู้ใช้: `user` / `manager` / `admin` |

#### ตาราง `products`
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | VARCHAR PK | รหัสสินค้า เช่น `PROD-123456` |
| `name` | VARCHAR | ชื่อสินค้าภาษาไทย |
| `name_en` | VARCHAR | ชื่อสินค้าภาษาอังกฤษ |
| `brand` | VARCHAR | แบรนด์ (Marshall, Sony, Bose, Apple, JBL, B&O) |
| `category` | VARCHAR | หมวดหมู่: `speaker` / `headphones` / `earbuds` |
| `price` | NUMERIC | ราคาขาย (บาท) |
| `stock` | INT | จำนวนคงเหลือในคลัง |
| `image` | VARCHAR | URL รูปภาพหน้าสินค้า |
| `image_back` | VARCHAR | URL รูปภาพด้านหลังสินค้า |

#### ตาราง `orders` — Order Status ทั้งหมดในระบบ
| Status | ความหมาย | เปลี่ยนเมื่อ |
| :--- | :--- | :--- |
| `pending_payment` | รอลูกค้าแนบสลิป | สั่งซื้อแล้วแต่ยังไม่แนบสลิป |
| `pending_review` | รอ Manager ตรวจสลิป | ลูกค้าแนบสลิปแล้ว |
| `manager_approved` | Manager อนุมัติ รอ Admin | `POST /api/orders/:id/manager-approve` |
| `confirmed` | Admin ยืนยัน รอจัดส่ง | `POST /api/orders/:id/admin-confirm` หรือ COD |
| `shipped` | จัดส่งแล้ว | `POST /api/orders/:id/ship` |
| `cancelled` | ยกเลิก | ลูกค้ายกเลิก หรือ Manager ปฏิเสธสลิป |

---

## 4. การวิเคราะห์และออกแบบระบบด้วย UML Diagram

### 4.1 Use Case Diagram (ครอบคลุมทุก Role และทุก Feature)

```mermaid
graph TB
    GuestActor["👁️ Guest<br/>(ไม่ได้ล็อกอิน)"]
    UserActor["🛒 User<br/>(ลูกค้าทั่วไป)"]
    SellerActor["🛍️ Seller<br/>(User ที่ผ่านยืนยันตัวตน)"]
    ManagerActor["👔 Manager"]
    AdminActor["👑 Admin"]

    subgraph Public_Zone ["🌐 Public (ไม่ต้อง Login)"]
        UC_Browse["เรียกดูสินค้า (Browse)"]
        UC_Filter["ค้นหา & กรองสินค้า (Search & Filter)"]
        UC_ViewDetail["ดูรายละเอียดสินค้า & รีวิว"]
        UC_LoginReg["Login / Register"]
    end

    subgraph User_Zone ["🛒 User Features"]
        UC_Cart["จัดการตะกร้าสินค้า (Cart)"]
        UC_Wishlist["รายการโปรด (Wishlist)"]
        UC_BuyNow["ซื้อทันที (Buy Now)"]
        UC_Checkout["สั่งซื้อ: PromptPay / โอนธนาคาร / COD"]
        UC_UploadSlip["แนบสลิปชำระเงิน (Upload Slip)"]
        UC_TrackOrder["ติดตามสถานะออเดอร์ (My Orders)"]
        UC_CancelOrder["ยกเลิกคำสั่งซื้อ (Cancel Order)"]
        UC_Review["เขียนรีวิวสินค้า (Review & Rating)"]
        UC_Profile["แก้ไขโปรไฟล์ (Profile Edit)"]
        UC_UIPrefs["สลับภาษา TH/EN & Dark/Light Theme"]
    end

    subgraph Seller_Zone ["🛍️ Seller Portal (ผ่านยืนยันตัวตน)"]
        UC_VerifySeller["ยืนยันตัวตน & ตรวจ Blacklist"]
        UC_ProposeProduct["เสนอสินค้าเข้าคลัง (Propose Product)"]
        UC_TrackProposal["ติดตามสถานะสินค้าที่เสนอ"]
    end

    subgraph Manager_Zone ["👔 Manager Dashboard"]
        UC_Dashboard["ดูยอดขาย Dashboard & กราฟ 7 วัน"]
        UC_ReviewSlip["ตรวจสอบสลิป: อนุมัติ / ปฏิเสธ + เหตุผล"]
        UC_ShipOrder["ยืนยันจัดส่งสินค้า (Ship)"]
        UC_ManageProduct["จัดการสินค้า: เพิ่ม / แก้ไขสต็อก-ราคา"]
        UC_InspectProduct["ตรวจสอบ & อนุมัติสินค้าจาก Seller"]
        UC_ViewLogs["ดู System Activity Logs"]
    end

    subgraph Admin_Zone ["👑 Admin Only"]
        UC_AdminConfirm["ยืนยันออเดอร์ขั้นสุดท้าย (Final Confirm)"]
        UC_DeleteProduct["ลบสินค้าออกจากระบบ"]
        UC_ManageUsers["จัดการ Users: เปลี่ยน Role / Reset Password"]
        UC_ViewDocs["เข้าถึงเอกสารระบบ (System Docs)"]
    end

    GuestActor --> UC_Browse
    GuestActor --> UC_Filter
    GuestActor --> UC_ViewDetail
    GuestActor --> UC_LoginReg

    UserActor --> UC_Browse
    UserActor --> UC_Filter
    UserActor --> UC_ViewDetail
    UserActor --> UC_Cart
    UserActor --> UC_Wishlist
    UserActor --> UC_BuyNow
    UserActor --> UC_Checkout
    UserActor --> UC_UploadSlip
    UserActor --> UC_TrackOrder
    UserActor --> UC_CancelOrder
    UserActor --> UC_Review
    UserActor --> UC_Profile
    UserActor --> UC_UIPrefs
    UserActor --> UC_VerifySeller

    SellerActor --> UC_Browse
    SellerActor --> UC_Cart
    SellerActor --> UC_Wishlist
    SellerActor --> UC_Checkout
    SellerActor --> UC_Review
    SellerActor --> UC_Profile
    SellerActor --> UC_VerifySeller
    SellerActor --> UC_ProposeProduct
    SellerActor --> UC_TrackProposal

    ManagerActor --> UC_Dashboard
    ManagerActor --> UC_ReviewSlip
    ManagerActor --> UC_ShipOrder
    ManagerActor --> UC_ManageProduct
    ManagerActor --> UC_InspectProduct
    ManagerActor --> UC_ViewLogs

    AdminActor --> UC_Dashboard
    AdminActor --> UC_ReviewSlip
    AdminActor --> UC_ShipOrder
    AdminActor --> UC_ManageProduct
    AdminActor --> UC_InspectProduct
    AdminActor --> UC_ViewLogs
    AdminActor --> UC_AdminConfirm
    AdminActor --> UC_DeleteProduct
    AdminActor --> UC_ManageUsers
    AdminActor --> UC_ViewDocs

    UC_Checkout -.-> UC_LoginReg
    UC_ProposeProduct -.-> UC_VerifySeller
    UC_ReviewSlip -.-> UC_AdminConfirm
    UC_AdminConfirm -.-> UC_ShipOrder
```

---

### 4.2 Sequence Diagram — โฟลว์การสั่งซื้อและอนุมัติออเดอร์ (ตาม API จริง)

```mermaid
sequenceDiagram
    autonumber
    actor Customer as 👤 Customer
    participant UI as 💻 Frontend UI
    participant Backend as ⚙️ Backend API
    participant DB as 🗄️ Database
    actor Manager as 👔 Manager
    actor Admin as 👑 Admin

    Customer->>UI: เลือกสินค้า กด Checkout
    UI->>Backend: POST /api/orders { items, payment, slip? }
    Backend->>DB: ตรวจสอบ stock และตัด stock
    Note over Backend: COD → status: confirmed<br/>มีสลิป → status: pending_review<br/>ไม่มีสลิป → status: pending_payment
    Backend-->>UI: 201 { id: "ORD-XXXXXX", status }
    UI-->>Customer: แสดงหน้า QR Code หรือยืนยัน COD

    alt กรณี pending_payment (ยังไม่แนบสลิป)
        Customer->>UI: อัปโหลดสลิปการชำระเงิน
        UI->>Backend: POST /api/orders/:id/submit-slip { slip }
        Backend->>DB: อัปเดต slip + status = pending_review
        Backend-->>UI: 200 { success: true }
    end

    Manager->>UI: เข้าหน้า Manager Dashboard
    UI->>Backend: GET /api/orders
    Backend-->>UI: รายการออเดอร์ที่ status = pending_review

    alt สลิปถูกต้อง
        Manager->>UI: กดอนุมัติสลิป (Approve)
        UI->>Backend: POST /api/orders/:id/manager-approve
        Backend->>DB: status = manager_approved
        Backend-->>UI: 200 { success: true }

        Admin->>UI: เข้าหน้า Admin Dashboard
        Admin->>UI: กดยืนยันขั้นสุดท้าย (Final Confirm)
        UI->>Backend: POST /api/orders/:id/admin-confirm
        Backend->>DB: status = confirmed
        Backend-->>UI: 200 { success: true }

        Manager->>UI: กดยืนยันจัดส่ง (Ship)
        UI->>Backend: POST /api/orders/:id/ship
        Backend->>DB: status = shipped
        Backend-->>UI: 200 { success: true }

    else สลิปไม่ถูกต้อง
        Manager->>UI: กดปฏิเสธ + กรอกเหตุผล (Reject)
        UI->>Backend: POST /api/orders/:id/manager-reject { note }
        Backend->>DB: status = cancelled + cancel_reason + คืน stock
        Backend-->>UI: 200 { success: true }
    end

    Customer->>UI: เข้าหน้า My Orders
    UI->>Backend: GET /api/orders
    Backend-->>UI: รายการออเดอร์พร้อม status และ cancel_reason
    UI-->>Customer: แสดงสถานะ + เหตุผล (ถ้ามี)
```

---

### 4.3 Sequence Diagram — โฟลว์การยืนยันตัวตน Seller

```mermaid
sequenceDiagram
    autonumber
    actor User as 👤 User (role: user)
    participant UI as 💻 Frontend UI
    participant Backend as ⚙️ Backend API
    participant DB as 🗄️ Database (Blacklist)

    User->>UI: เข้าหน้า Seller Portal (/seller)
    Note over UI: ตรวจสอบว่ายืนยันตัวตนแล้วหรือยัง<br/>ถ้ายังไม่ผ่าน → แสดงฟอร์มยืนยัน

    User->>UI: กรอก ชื่อ / อีเมล / เลขบัตร 13 หลัก
    UI->>Backend: POST /api/pending-watches/register-seller { name, email, nationalId }
    Backend->>DB: ตรวจสอบกับตาราง blacklist

    alt ข้อมูลติด Blacklist
        Backend-->>UI: 403 { error: "ข้อมูลของท่านอยู่ในบัญชีดำ" }
        UI-->>User: แสดงข้อความเตือน ไม่อนุญาต
    else ผ่านการตรวจสอบ
        Backend->>DB: บันทึก System Log
        Backend-->>UI: 200 { success: true }
        UI-->>User: แสดงหน้า Seller Portal พร้อมเสนอสินค้าได้ทันที
    end

    User->>UI: กรอกข้อมูลสินค้า: แบรนด์, รุ่น, ราคา, สี, คำอธิบาย
    UI->>Backend: POST /api/pending-watches { brand, model, price, ... }
    Backend->>DB: บันทึก pending_watch (inspectionStatus: pending)
    Backend-->>UI: 201 { success: true, id: "WSH-XXXXXX" }
    UI-->>User: แสดงสถานะ "รอการตรวจสอบจากผู้จัดการ"
```

---

### 4.4 Activity Diagram — โฟลว์การสั่งซื้อสินค้าฉบับสมบูรณ์

```mermaid
stateDiagram-v2
    [*] --> เข้าสู่เว็บไซต์
    เข้าสู่เว็บไซต์ --> ค้นหาและกรองสินค้า
    ค้นหาและกรองสินค้า --> ดูรายละเอียดสินค้า

    state เพิ่มสินค้า_choice <<choice>>
    ดูรายละเอียดสินค้า --> เพิ่มสินค้า_choice

    เพิ่มสินค้า_choice --> เพิ่มลงตะกร้า : กด Add to Cart
    เพิ่มสินค้า_choice --> ซื้อทันที : กด Buy Now

    เพิ่มลงตะกร้า --> เลือกสินค้าในตะกร้า
    เลือกสินค้าในตะกร้า --> หน้า_Checkout
    ซื้อทันที --> หน้า_Checkout

    หน้า_Checkout --> กรอกที่อยู่จัดส่ง
    กรอกที่อยู่จัดส่ง --> เลือกช่องทางชำระเงิน

    state ช่องทางชำระเงิน <<choice>>
    เลือกช่องทางชำระเงิน --> ช่องทางชำระเงิน

    ช่องทางชำระเงิน --> PromptPay_QR : เลือก PromptPay
    ช่องทางชำระเงิน --> โอนธนาคาร : เลือกโอนเงิน
    ช่องทางชำระเงิน --> COD_ปลายทาง : เลือกเก็บเงินปลายทาง

    PromptPay_QR --> แนบสลิป
    โอนธนาคาร --> แนบสลิป

    แนบสลิป --> รอ_Manager_ตรวจสลิป

    state ผล_ตรวจสลิป <<choice>>
    รอ_Manager_ตรวจสลิป --> ผล_ตรวจสลิป

    ผล_ตรวจสลิป --> Manager_อนุมัติ : สลิปถูกต้อง
    ผล_ตรวจสลิป --> ยกเลิก_คืนสต็อก : สลิปไม่ถูกต้อง

    Manager_อนุมัติ --> รอ_Admin_Confirm
    รอ_Admin_Confirm --> Admin_ยืนยัน
    Admin_ยืนยัน --> Manager_จัดส่ง

    COD_ปลายทาง --> Manager_จัดส่ง : ยืนยันทันที (status: confirmed)

    Manager_จัดส่ง --> [*] : ลูกค้าได้รับสินค้า (status: shipped)
    ยกเลิก_คืนสต็อก --> [*] : status: cancelled + cancel_reason
```

---

### 4.5 Class Diagram (โครงสร้างข้อมูลหลัก)

```mermaid
classDiagram
    class User {
        +string username
        +string password
        +string role
        +register() bool
        +login() bool
    }

    class Profile {
        +string username
        +string firstname
        +string lastname
        +string email
        +string phone
        +string address
        +string avatar
        +update() void
    }

    class Product {
        +string id
        +string name
        +string nameEn
        +string brand
        +string category
        +decimal price
        +int stock
        +string image
        +string imageBack
        +updateStock(qty) void
    }

    class Order {
        +string id
        +string userId
        +OrderItem[] items
        +decimal total
        +string payment
        +string status
        +string slip
        +string cancelReason
        +submitSlip(slip) void
        +cancel(reason) void
    }

    class Review {
        +int id
        +string productId
        +string username
        +int rating
        +string comment
        +string date
    }

    class Wishlist {
        +string username
        +string productId
        +add() void
        +remove() void
    }

    class PendingWatch {
        +string id
        +string brand
        +string model
        +decimal price
        +string sellerEmail
        +string inspectionStatus
        +approve() void
        +reject() void
    }

    class Blacklist {
        +string email
        +string nationalId
        +string reason
        +check(email, nationalId) bool
    }

    User "1" --> "0..1" Profile : has
    User "1" --> "0..*" Order : places
    User "1" --> "0..*" Review : writes
    User "1" --> "0..*" Wishlist : saves
    User "1" --> "0..*" PendingWatch : proposes
    Product "1" --> "0..*" Review : receives
    Product "1" --> "0..*" Wishlist : savedIn
    Blacklist --> User : verifies
```

---

## 5. การออกแบบส่วนติดต่อผู้ใช้งาน (UI/UX Design)

### 5.1 แนวคิดการออกแบบ
- **Color Palette**: Dark Slate `#0f172a` / Deep Midnight `#0b0c10` ตัดกับ Gold `#c5a880`
- **Typography**: Outfit (Google Fonts) — ทันสมัย อ่านง่าย
- **Visual Style**: Glassmorphism Cards + Backdrop Blur Effects
- **Animation**: Micro-animations และ Smooth Transitions

### 5.2 โครงสร้างหน้าเว็บในระบบ (Page Structure & Role Access)

| หน้า | Route | Role ที่เข้าได้ |
| :--- | :--- | :--- |
| หน้าแรก (Storefront) | `/` | ทุกคน |
| รายละเอียดสินค้า | `/product/:id` | ทุกคน |
| เข้าสู่ระบบ | `/login` | Guest เท่านั้น |
| สมัครสมาชิก | `/register` | Guest เท่านั้น |
| โปรไฟล์ | `/profile` | user, manager, admin |
| ชำระเงิน | `/checkout` | user, manager, admin |
| ประวัติออเดอร์ | `/my-orders` | user, manager, admin |
| Seller Portal | `/seller` | user (ผ่านยืนยัน), manager, admin |
| Manager Dashboard | `/manager` | manager, admin |
| Admin Dashboard | `/admin` | admin |
| เอกสารระบบ | `/docs` | admin |

---

*เอกสารนี้จัดทำโดยอิงจากโค้ดต้นฉบับของโครงการ AudioMart สำหรับวิชา CSI204*
