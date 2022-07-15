var courseName = document.getElementById('courseName');
var courseCategory = document.getElementById('courseCategory');
var coursePrice = document.getElementById('coursePrice');
var courseDescription = document.getElementById('courseDescription');
var addbtn1 = document.getElementById('addbtn'); 
var tabledata = document.getElementById('data');
var inputs = document.getElementsByClassName('inputs');
var currentindex = 0;
var nameAlert = document.getElementById('nameAlert');


if (localStorage.getItem("courseslist") != null) {
    var courses = JSON.parse(localStorage.getItem("courseslist"));
    displaydata();
} else { var courses = []; }

addbtn1.onclick = function () {
    if (addbtn1.innerHTML == "Add Cource") {
        addcourses();
    } else {
        updatecourse();
    }
   
    displaydata();
    clear();
    addbtn1.innerHTML = "Add Cource";
}


function addcourses() {

    var course = {
        name: courseName.value,
        categ: courseCategory.value,
        price: coursePrice.value,
        desc: courseDescription.value

    }
    courses.push(course);

    localStorage.setItem("courseslist", JSON.stringify(courses));


    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
    })
 

}

function displaydata() {

    var result = "";

    for (var i = 0; i < courses.length; i++) {
        result += `<tr> <td>${i}</td> 
            <td>${courses[i].name}</td>
            <td>${courses[i].categ}</td> 
            <td>${courses[i].price}</td>
            <td>${courses[i].desc}</td>
            <td> <button onclick="showitem(${i})"> Update </button></td>
            <td> <button onclick="deletecourse(${i})"> Delete </button></td>
        </tr> `;
    }
    tabledata.innerHTML = result;
}

function clear() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }


}

function deletecourse(index) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't to remove this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {

            courses.splice(index, 1);
    localStorage.setItem("courseslist", JSON.stringify(courses));
    displaydata();
            Swal.fire(
                'Deleted!',
                'course has been deleted.',
                'success'
            )
        }
    })
    
}


deleteall.onclick = function () {

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            courses = [];
            localStorage.removeItem("courses");
            tabledata.innerHTML = "";
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    })


}

function search(searchText) {

    var result = "";
    for (var i = 0; i < courses.length; i++) {
        if (courses[i].name.toLowerCase().includes(searchText.toLowerCase())) {
            result += `
        <tr>
            <td>${i}</td>
            <td>${courses[i].name}</td>
            <td>${courses[i].category}</td>
            <td>${courses[i].price}</td>
            <td>${courses[i].desc}</td>
            <td><button class="update"> update </button></td>
            <td><button class="delete" onclick="deleteCourse(${i})"> delete </button></td>
        </tr>
        `;
        }
    }
    data.innerHTML = result;
}
function showitem(index) {
    course = courses[index];

    courseName.value = course.name;
    courseCategory.value = course.categ;
    coursePrice.value = course.price;
    courseDescription.value = course.desc;
    currentindex = index;
    addbtn1.innerHTML = "update";
}
function updatecourse() {

   
    var course = {
        name: courseName.value,
        categ: courseCategory.value,
        price: coursePrice.value,
        desc: courseDescription.value

    }
    courses[currentindex].name = course.name;
    courses[currentindex].categ = course.categ;
    courses[currentindex].price = course.price;
    courses[currentindex].desc = course.desc;
    localStorage.setItem("courseslist", JSON.stringify(courses));

    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
    })

}

courseName.onkeyup = function () { 
    var namepattern = /^[A-Z][a-z]{2,8}$/;
    if (namepattern.test(courseName.value)) {
        addbtn1.removeAttribute("disabled");
        courseName.classList.add('is-valid');
        courseName.classList.remove('is-invalid');
        nameAlert.classList.add('d-none');
    } else {
        addbtn1.setAttribute("disabled","true");
        courseName.classList.add('is-invalid');
        courseName.classList.remove('is-valid');
        nameAlert.classList.remove('d-none');
    }

}
