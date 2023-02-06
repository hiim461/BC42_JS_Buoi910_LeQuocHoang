// Tạo mảng danh sách nhân viên
let staffList = getStaffList();

// Hiển thị danh sách nhân viên ra table khi mở trang web
renderTable(staffList);

//Hàm thêm nhân viên
document.getElementById("btnThemNV").onclick = function createStaff() {
  //B1: DOM
  let id = getElement("#tknv").value;
  let name = getElement("#name").value;
  let email = getElement("#email").value;
  let password = getElement("#password").value;
  let datePicker = getElement("#datepicker").value;
  let basicSalary = +getElement("#luongCB").value;
  let position = getElement("#chucvu").value;
  let timeToWork = +getElement("#gioLam").value;

  getElement('#tbTKNV').style.display = 'inline-block';
  getElement('#tbTen').style.display = 'inline-block';
  getElement('#tbEmail').style.display = 'inline-block';
  getElement('#tbMatKhau').style.display = 'inline-block';
  getElement('#tbNgay').style.display = 'inline-block';
  getElement('#tbLuongCB').style.display = 'inline-block';
  getElement('#tbChucVu').style.display = 'inline-block';
  getElement('#tbGiolam').style.display = 'inline-block';
  //Kiểm tra input có hợp lệ hay không
  let isValid = validate();
  if(!isValid){
    return;
  }

  //B2: Khởi tạo object staff
  const staff = new Staff(
    id,
    name,
    email,
    password,
    datePicker,
    basicSalary,
    position,
    timeToWork
  );

  //B3: Thêm object staff vào mảng staffList
  staffList.push(staff);

  //B4: Gọi hàm rederTable để hiển thị danh sách staffList ra table
  renderTable(staffList);

  //B5: Gọi hàm resetForm để xóa hết tất cả value của các input
  resetForm();

  //B6: Lưu staffList xuống localStorage
  storeStaffList();

 
}

//extend
function removeAscent (str) {
  if (str === null || str === undefined) return str;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/\s/g, "");
  return str;
}

//Hàm tìm kiếm nhân viên theo xếp loại
function searchStaff() {
  //B1: DOM
  let search = getElement("#searchName").value;
  search = removeAscent(search);

  //B2: Lọc những nhân viên có xếp loại khớp với giá trị search
  let newStaffList = staffList.filter((staff) => {
    let ranking = staff.rankingStaff().toLowerCase();
    ranking = removeAscent(ranking);
    search = search.toLowerCase();
    return ranking.indexOf(search) !== -1;
  });

  //Gọi hàm renderTable để hiển thị ra giao diện
  renderTable(newStaffList);
}

//Hàm xóa nhân viên theo id
function deleteStaff(staffId) {
  staffList = staffList.filter((staff) => {
    return staff.id !== staffId;
  });

  //Gọi hàm renderTable để cập nhật giao diện
  renderTable(staffList);

  //Lưu staffList xuống localStorage
  storeStaffList();
}

//Hàm tìm nhân viên theo id để fill thông tin lên form
function selectStaffToUpdate(staffId) {
  //B1: tìm nhân viên muốn chỉnh sửa thông tin dựa vào id
  let selectedStaff = staffList.find((staff) => {
    return staff.id === staffId;
  });

  //B2: Lấy thông tin của sinh viên tìm được fill lên form
  getElement("#tknv").value = selectedStaff.id;
  getElement("#name").value = selectedStaff.name;
  getElement("#email").value = selectedStaff.email;
  getElement("#password").value = selectedStaff.password;
  getElement("#datepicker").value = selectedStaff.datePicker;
  getElement("#luongCB").value = selectedStaff.basicSalary;
  getElement("#chucvu").value = selectedStaff.position;
  getElement("#gioLam").value = selectedStaff.timeToWork;

  //B3:Disabled input tài khoản và button thêm nhân viên
  getElement("#tknv").disabled = true;
  getElement("#btnThemNV").disabled = true;
}

//Hàm cập nhật thông tin nhân viên
function updateStaff() {
  //B1: DOM
  let id = getElement("#tknv").value;
  let name = getElement("#name").value;
  let email = getElement("#email").value;
  let password = getElement("#password").value;
  let datePicker = getElement("#datepicker").value;
  let basicSalary = +getElement("#luongCB").value;
  let position = getElement("#chucvu").value;
  let timeToWork = +getElement("#gioLam").value;

  //Kiểm tra input có hợp lệ hay không
  let isValid = validate();
  if(!isValid){
    return;
  }

  //B2: Khởi tạo object staff
  const staff = new Staff(
    id,
    name,
    email,
    password,
    datePicker,
    basicSalary,
    position,
    timeToWork
  );

  //B3: Cập nhật thông tin mới của staff
  let index = staffList.findIndex((staff) => {
    return staff.id === id;
  });
  staffList[index] = staff;

  //B4: Gọi hàm renderTable để cập nhật giao diên
  renderTable(staffList);

  //B5: Gọi hàm resetForm
  resetForm();

  //B6: Lưu staffList xuống localStorage
  storeStaffList();
}

//Hàm hiển thị danh sách nhân viên ra table
function renderTable(staffList) {
  let html = staffList.reduce((output, staff) => {
    return (
      output +
      `
            <tr>
            <td>${staff.id}</td>
            <td>${staff.name}</td>
            <td>${staff.email.toLowerCase()}</td>
            <td>${staff.datePicker}</td>
            <td>${staff.position}</td>
            <td>${staff.calcTotalSalary()}</td>
            <td>${staff.rankingStaff()}</td>
            <td>
            <button data-toggle="modal"
            data-target="#myModal" class = "btn btn-primary mb-1" onclick = "selectStaffToUpdate('${
              staff.id
            }')">Cập nhật</button>
            <button class = "mb-1 btn btn-danger" onclick = "deleteStaff('${
              staff.id
            }')">Xóa</button>
            </td>      
            </tr>
          `
    );
  }, "");
  getElement("#tableDanhSach").innerHTML = html;
}

//Hàm reset giá trị của các input
function resetForm() {
  getElement("#tknv").value = "";
  getElement("#name").value = "";
  getElement("#email").value = "";
  getElement("#password").value = "";
  getElement("#datepicker").value = "";
  getElement("#luongCB").value = "";
  getElement("#chucvu").value = "0";
  getElement("#gioLam").value = "";

  getElement("#btnThemNV").disabled = false;
  getElement("#tknv").disabled = false;
}

//Validate
function validate() {
  //Mặc định ban đầu là form hợp lệ
  let isValid = true;

  //Validate tài khoản
  let id = getElement("#tknv").value;
  if (!id.trim()) {
    isValid = false;
    getElement("#tbTKNV").innerHTML = "Tài khoản nhân viên không được để trống";
  } else if (!/^(\d{2,6})$/.test(id)) {
    isValid = false;
    getElement("#tbTKNV").innerHTML = "Tài khoản nhân viên không hợp lệ";
  } else {
    getElement("#tbTKNV").innerHTML = "";
  }

  //Validate tên nhân viên
  let name = getElement("#name").value;
  if (!name.trim()) {
    isValid = false;
    getElement("#tbTen").innerHTML = "Tên nhân viên không được để trống";
  } else if (
    !/^[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+(?: [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*)*/.test(name)
  ) {
    isValid = false;
    getElement("#tbTen").innerHTML = "Tên nhân viên không hợp lệ";
  } else {
    getElement("#tbTen").innerHTML = "";
  }

  //Validate email
  let email = getElement("#email").value;
  if (!email.trim()) {
    isValid = false;
    getElement("#tbEmail").innerHTML = "Email nhân viên không được để trống";
  } else if (!/^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)) {
    isValid = false;
    getElement("#tbEmail").innerHTML = "Email nhân viên không hợp lệ";
  } else {
    getElement("#tbEmail").innerHTML = "";
  }

  // Validate password
  let password = getElement("#password").value;
  if (!password.trim()) {
    isValid = false;
    getElement("#tbMatKhau").innerHTML =
      "Mật khẩu nhân viên không được để trống";
  } else if (
    !/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,10})/.test(password)
  ) {
    isValid = false;
    getElement("#tbMatKhau").innerHTML = "Mật khẩu nhân viên không hợp lệ";
  } else {
    getElement("#tbMatKhau").innerHTML = "";
  }

  //Validate datePicker
  let datePicker = getElement("#datepicker").value;
  if (!datePicker.trim()) {
    isValid = false;
    getElement("#tbNgay").innerHTML = "Ngày làm nhân viên không được để trống";
  } else if (!/^(((0)[0-9])|((1)[0-2]))(\/)([0-2][0-9]|(3)[0-1])(\/)\d{4}$/.test(datePicker)) {
    isValid = false;
    getElement("#tbNgay").innerHTML = "Ngày làm nhân viên không hợp lệ";
  } else {
    getElement("#tbNgay").innerHTML = "";
  }

  //Validate basicSalary
  let basicSalary = +getElement("#luongCB").value;
  if (!basicSalary) {
    isValid = false;
    getElement("#tbLuongCB").innerHTML =
      "Lương cơ bản nhân viên không được để trống";
  } else if (basicSalary < 10000000 || basicSalary > 20000000) {
    isValid = false;
    getElement("#tbLuongCB").innerHTML = "Lương cơ bản nhân viên không hợp lệ";
  } else {
    getElement("#tbLuongCB").innerHTML = "";
  }

  //Validate position
  let position = getElement("#chucvu").value;
  if (position==="0") {
    isValid = false;
    getElement("#tbChucVu").innerHTML = "Chức vụ nhân viên không được để trống";
  } else {
    getElement("#tbChucVu").innerHTML = "";
  }

  //   Validate timeToWork
  let timeToWork = +getElement("#gioLam").value;
  if (!timeToWork) {
    isValid = false;
    getElement("#tbGiolam").innerHTML = "Giờ làm nhân viên không được để trống";
  } else if (timeToWork < 80 || timeToWork > 200) {
    isValid = false;
    getElement("#tbGiolam").innerHTML = "Giờ làm nhân viên không hợp lệ";
  } else {
    getElement("#tbGiolam").innerHTML = "";
  }

  return isValid;
}

//localStorage
function storeStaffList() {
  //Chuyển array thành JSON
  const json = JSON.stringify(staffList);
  //Lưu xuống localStorage với key staffList
  localStorage.setItem("staffList", json);
}

//Hàm cập nhật khi refresh trang
function getStaffList() {
  const json = localStorage.getItem("staffList");
  if (!json) {
    return [];
  }
  //Chuyển JSON thành array
  const staffList = JSON.parse(json);
  //Khởi tạo lại object
  for (let i = 0; i < staffList.length; i++) {
    const staff = staffList[i];
    staffList[i] = new Staff(
      staff.id,
      staff.name,
      staff.email,
      staff.password,
      staff.datePicker,
      staff.basicSalary,
      staff.position,
      staff.timeToWork
    );
  }
  return staffList;
}

//Hàm getElement
function getElement(selector) {
  return document.querySelector(selector);
}