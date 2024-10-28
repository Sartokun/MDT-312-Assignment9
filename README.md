รายละเอียดของโค้ด
javascript
คัดลอกโค้ด
const fs = require('fs');
const http = require('http');
fs และ http เป็นโมดูลที่ถูกนำเข้ามาจาก Node.js โดย:
fs ใช้สำหรับการอ่านและเขียนไฟล์
http ใช้ในการสร้าง HTTP server เพื่อรองรับคำขอ (requests) และการตอบกลับ (responses)
javascript
คัดลอกโค้ด
const hostname = 'localhost';
const port = 3000;
กำหนดค่า hostname และ port:
hostname คือชื่อโฮสต์ที่เซิร์ฟเวอร์จะรัน ซึ่งในที่นี้เป็น localhost
port คือหมายเลขพอร์ตที่เซิร์ฟเวอร์จะฟังการร้องขอ โดยตั้งเป็น 3000
javascript
คัดลอกโค้ด
const server = http.createServer(async (req, res) => {
สร้างเซิร์ฟเวอร์ HTTP โดยใช้ http.createServer:
ฟังก์ชันนี้มีการใช้ async เพื่อรองรับการทำงานแบบ asynchronous
javascript
คัดลอกโค้ด
    const data = await readFileFun();
    const updatedData = editJsonFile(data);
    await writeFileFun(updatedData);
รันคำสั่งต่าง ๆ เมื่อได้รับคำขอ (request):
data เป็นข้อมูลที่ได้จากการอ่านไฟล์ JSON ผ่านฟังก์ชัน readFileFun()
updatedData เป็นข้อมูลที่ถูกแก้ไขผ่านฟังก์ชัน editJsonFile(data)
writeFileFun(updatedData) เขียนข้อมูลที่อัปเดตแล้วลงในไฟล์ JSON ใหม่
javascript
คัดลอกโค้ด
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(updatedData, null, 2));
ตั้งค่า HTTP response headers โดย:
res.writeHead(200, { 'Content-Type': 'application/json' }); ส่งสถานะการตอบกลับ HTTP 200 พร้อมประเภทเนื้อหาที่เป็น JSON
res.end(JSON.stringify(updatedData, null, 2)); ส่งข้อมูล JSON ที่อัปเดตไปยังผู้ใช้
ฟังก์ชันอ่านไฟล์ JSON: readFileFun
javascript
คัดลอกโค้ด
const readFileFun = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('cloth1.json', 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
};
ฟังก์ชัน readFileFun อ่านข้อมูลจากไฟล์ cloth1.json:
ใช้ fs.readFile ในการอ่านไฟล์ และถ้าอ่านสำเร็จจะเรียก resolve(JSON.parse(data)) เพื่อส่งข้อมูลที่ถูกแปลงจากสตริงเป็น JSON
ถ้าเกิดข้อผิดพลาด จะเรียก reject(err) เพื่อแจ้งข้อผิดพลาด
ฟังก์ชันแก้ไขข้อมูล JSON: editJsonFile
javascript
คัดลอกโค้ด
const editJsonFile = (data) => {
    const n_stock = {
        item1: 12,
        item2: 13,
        item3: 50,
        item4: 22,
        item5: 55,
        item6: 87,
        item7: 12,
        item8: 29,
        item9: 10
    };
กำหนดค่า n_stock เป็นออบเจ็กต์ที่ประกอบไปด้วยข้อมูลสต็อกใหม่ ซึ่งมี item1 ถึง item9 พร้อมปริมาณสต็อกของแต่ละรายการ
javascript
คัดลอกโค้ด
    for (const item in n_stock) {
        if (data[item]) {
            data[item].stock = n_stock[item]; 
        }
    }
    return data;
};
ฟังก์ชันนี้วนลูปใน n_stock และอัปเดตค่าของ data:
ถ้า data มี item ที่ตรงกับใน n_stock ก็จะอัปเดตจำนวนสต็อกของ data[item].stock เป็นค่าที่อยู่ใน n_stock[item]
คืนค่าข้อมูลที่แก้ไขแล้ว
ฟังก์ชันเขียนข้อมูลลงไฟล์ JSON: writeFileFun
javascript
คัดลอกโค้ด
const writeFileFun = (data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile('new_cloth.json', JSON.stringify(data, null, 2), 'utf8', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve("Data saved to new_cloth.json!");
            }
        });
    });
};
ฟังก์ชัน writeFileFun เขียนข้อมูลที่ได้รับไปยังไฟล์ new_cloth.json:
ใช้ fs.writeFile เพื่อเขียนข้อมูล JSON ลงในไฟล์ใหม่ new_cloth.json
ถ้าเขียนสำเร็จจะเรียก resolve พร้อมข้อความแจ้งเตือน ถ้าเกิดข้อผิดพลาดจะเรียก reject
การเริ่มต้นเซิร์ฟเวอร์
javascript
คัดลอกโค้ด
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
เริ่มต้นเซิร์ฟเวอร์ให้ฟังการร้องขอที่ localhost บนพอร์ต 3000:
เมื่อเซิร์ฟเวอร์เริ่มต้นสำเร็จ จะพิมพ์ข้อความ Server running at http://localhost:3000/ ออกมาในคอนโซลเพื่อแสดงว่าเซิร์ฟเวอร์กำลังทำงานอยู่
ข้อสรุป
โค้ดนี้สร้างเซิร์ฟเวอร์ HTTP ที่อ่านข้อมูลจากไฟล์ JSON (cloth1.json), แก้ไขสต็อกของรายการสินค้าบางรายการ, จากนั้นเขียนข้อมูลที่อัปเดตลงในไฟล์ใหม่ (new_cloth.json) และตอบกลับด้วยข้อมูล JSON ที่อัปเดต
