.. _jsom-basic-usage-create-context-object:

Tạo ServiceContext object
=========================

|ServiceContext| là object dùng để:

   - Quản lý vòng đời (lifetime) cho các object khác như |List|, |ListItem|...
   - Queue các thay đổi của ClientObject (|ListItem|), ví dụ như xóa 1 item +
     tạo mới 1 item + thay đổi property của 1 item khác, sau đó gọi 1 request
     duy nhất để cập nhật các thay đổi này lên server