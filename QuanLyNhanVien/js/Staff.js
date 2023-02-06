function Staff(
  id,
  name,
  email,
  password,
  datePicker,
  basicSalary,
  position,
  timeToWork
) {
  this.id = id;
  this.name = name;
  this.email = email;
  this.password = password;
  this.datePicker = datePicker;
  this.basicSalary = basicSalary;
  this.position = position;
  this.timeToWork = timeToWork;
}
Staff.prototype.calcTotalSalary = function () {
  switch (this.position) {
    case "Sếp":
      return this.basicSalary * 3;
    case "Trưởng phòng":
      return this.basicSalary * 2;
    case "Nhân viên":
      return this.basicSalary;
  }
};
Staff.prototype.rankingStaff = function () {
  if (this.timeToWork >= 192) {
    return "Xuất sắc";
  } else if (this.timeToWork >= 176) {
    return "Giỏi";
  } else if (this.timeToWork >= 160) {
    return "Khá";
  } else {
    return "Trung bình";
  }
};
