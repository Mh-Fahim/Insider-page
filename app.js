const $subItem = document.querySelectorAll(".sub-item"),
  $nav = document.querySelector("nav");

const $tabItem = document.querySelectorAll(".tab a"),
  $tabFirstItem = document.querySelector(".tab a"),
  $row = document.querySelectorAll(".content .row"),
  $moreBtn = document.querySelectorAll(".content .row .boxes button");

const $form = document.querySelector("#form"),
  $countValueInject = document.querySelector("#form .row .col-1 p"),
  $submitBtn = document.querySelector("#form button[type=submit]"),
  $input = document.querySelector("#form input[type=email]");

const $allCheckBox = document.querySelectorAll("input[type=checkbox"),
  $firstCheckBox = $allCheckBox[0];

$tabFirstItem.onclick = () => {
  $tabItem.forEach((e) => {
    e.classList.remove("active");
  });

  $row.forEach((e) => {
    e.style.display = "block";
    e.classList.remove("active");
  });

  $tabFirstItem.classList.add("active");
};

for (let i = 1; i < $tabItem.length; i++) {
  let element = $tabItem[i];
  let index = i - 1;
  element.onclick = () => {
    $tabItem.forEach((e) => {
      e.classList.remove("active");
    });
    $row.forEach((e) => {
      e.style.display = "none";
      e.classList.remove("active");
    });
    $row[index].classList.add("active");
    if ($row[index].classList.contains("active")) {
      $row[index].style.display = "block";
      element.classList.add("active");
    }
  };
}

document.querySelectorAll(".fa-plus").forEach((element, index) => {
  element.onclick = () => {
    if (element.classList.contains("fa-plus")) {
      element.classList.remove("fa-plus");
      element.classList.add("fa-minus");
    } else {
      element.classList.add("fa-plus");
      element.classList.remove("fa-minus");
    }
    $subItem[index].classList.toggle("active");
  };
});

document.querySelector(".fa-bars").onclick = () => {
  $nav.classList.add("show");
  let div = document.createElement("div");
  div.classList.add("nav-close");
  div.setAttribute("onclick", "navClose(this)");
  let headerLeft = $nav.parentNode;
  headerLeft.appendChild(div);
};

function navClose(e) {
  $nav.classList.remove("show");
  let headerLeft = $nav.parentNode;
  headerLeft.removeChild(e);
}

document.querySelector(".fa-times").onclick = () => {
  $nav.classList.remove("show");
  let headerLeft = $nav.parentNode;
  headerLeft.removeChild(headerLeft.lastChild);
};

let count = null;

$firstCheckBox.onclick = () => {
  for (let i = 1; i < $allCheckBox.length; i++) {
    const element = $allCheckBox[i];
    const index = i;

    if ($firstCheckBox.checked) {
      element.checked = true;
      count = index;
      $form.classList.add("active");
      $countValueInject.textContent = count;
      unSelect(element, $countValueInject);
    } else {
      element.checked = false;
      count = 0;
      $countValueInject.textContent = count;
      $form.classList.remove("active");
      selectPerticulerItem(element, $countValueInject);
    }
  }
};

function unSelect(el, p) {
  for (let i = 0; i < $allCheckBox.length; i++) {
    const ind = i;
    el.onchange = () => {
      if (!el.checked) {
        $firstCheckBox.checked = false;
        count--;
        p.textContent = count;
      } else {
        count++;
        p.textContent = count;

        if (count === ind) {
          $firstCheckBox.checked = true;
        }
      }
    };
  }
}

for (let i = 1; i < $allCheckBox.length; i++) {
  const element = $allCheckBox[i];

  element.onchange = () => {
    if (element.checked) {
      count++;
      $countValueInject.textContent = count;
      $form.classList.add("active");
      if (count === $allCheckBox.length - 1) {
        $firstCheckBox.checked = true;
      }
    } else {
      $firstCheckBox.checked = false;
      count--;
      $countValueInject.textContent = count;
      if (count === 0) {
        $form.classList.remove("active");
      }
    }
  };

  function selectPerticulerItem(el, p) {
    el.onchange = () => {
      if (el.checked) {
        count++;
        p.textContent = count;
        $form.classList.add("active");
        if (count === $allCheckBox.length - 1) {
          $firstCheckBox.checked = true;
        } else {
          $firstCheckBox.checked = false;
        }
      } else {
        count--;
        p.textContent = count;
        if (count === 0) {
          $form.classList.remove("active");
        }
      }
    };
  }
}

$submitBtn.addEventListener("click", function (e) {
  let input = $input.value;
  let valid = input.match(/@gmail.com/);

  if ($input.value && valid) {
    e.preventDefault();
    alert("Subscribed Succesfuly");
  } else if (input === "") {
    alert(`enter your email`);
  } else {
    alert(`${input} is't valid email, please enter a valid email`);
  }
});

$moreBtn.forEach((e) => {
  e.onclick = () => {
    alert(
      `More page can be add letter, This page just focus other functionality like sidebar, subscribed count, subscribed complete, layout`
    );
  };
});
