export enum JsonErrors {
  player_not_exists = 'player_not_exists',
  player_not_activated = 'player_not_activated',
  password_must_be_long = 'รหัสผ่านต้องมีความยาว 5 - 20 ตัวอักษร (Error 107)',
  phone_number_invalid = 'หมายเลขโทรศัพท์ไม่ถูกต้อง กรุณากรอกตัวเลขให้ครบ 10 หลัก',
  email_invalid = 'คุณไม่สามารถสร้างบัญชีจากอีเมลนี้ได้ กรุณาลองใช้อีเมลอื่น (Error 100)',
  username_already_in_use = 'ขออภัย ชื่อนี้ถูกใช้แล้ว กรุณาเลือกชื่ออื่น (Error 104)',
}
