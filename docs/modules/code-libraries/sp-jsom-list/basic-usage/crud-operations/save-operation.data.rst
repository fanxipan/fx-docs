.. _jsom-basic-usage-save-operations:

Cập nhật hoặc tạo mới item
--------------------------

Thư viện cung cấp hàm |List.saveItemAsync| hỗ trợ việc tạo mới hoặc cập nhật item.

1. Nếu tham số truyền vào là |ListItem| object --> lưu thay đổi của list item này lên server
   
   .. code-block:: javascript
      :linenos:
      :emphasize-lines: 9

      var customer;

      customerList.getItemById(1)
         .then(function (item) {
            customer = item;
         })
         .then(function() {
            customer.customerName = "New name";
            return customerList.saveItemAsync(customer);
         })
         .then(function (savedCustomer) {
            console.log(savedCustomer.customerName); // -> "New name"
            console.log(customer === savedCustomer); // -> true
         });

2. Nếu tham số truyền vào là object có thuộc tính ``id`` --> cập nhật item có ``id`` tương
   ứng trên server

   .. code-block:: javascript
      :linenos:
      :emphasize-lines: 3

      customerList
         .saveItemAsync({
            id: 1,
            customerName: "New name"
         })
         .then(function (savedCustomer) {
            console.log(savedCustomer.customerName); // -> "New name"
         });

3. Nếu tham số truyền vào là object :bg-highlight:`không` có thuộc tính ``id`` --> tạo mới
   1 list item trên server

   .. code-block:: javascript
      :linenos:
      :emphasize-lines: 3

      customerList
         .saveItemAsync({
            /* Note: no id attribute */
            customerName: "Jubei"
         })
         .then(function (newCustomer) {
            console.log(newCustomer.id); // -> 3 (new id)
            console.log(newCustomer.customerName); // -> "Jubei"
         });