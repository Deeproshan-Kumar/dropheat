document.addEventListener("DOMContentLoaded", () => {
  const triggers = document.querySelectorAll(".trigger"),
    optionsList = document.querySelectorAll(".options"),
    chatWindowTrigger = document.querySelector("#chat-window-trigger"),
    body = document.body,
    tabs = document.querySelectorAll("#tabs .tab"),
    tabPanels = document.querySelectorAll("#tab-panels .panel");

  triggers.forEach((trigger, index) => {
    const options = optionsList[index];

    if (!options) return;

    // Toggle visibility of options when trigger is clicked
    trigger.addEventListener("click", (event) => {
      options.classList.toggle("show");

      // Close other open dropdowns
      optionsList.forEach((otherOptions, otherIndex) => {
        if (otherIndex !== index) {
          otherOptions.classList.remove("show");
        }
      });

      // Prevent click event from propagating to the document click listener
      event.stopPropagation();
    });
  });

  // Close dropdown if clicking outside of any trigger or options
  document.addEventListener("click", (event) => {
    triggers.forEach((trigger, index) => {
      const options = optionsList[index];

      if (!trigger.contains(event.target) && !options.contains(event.target)) {
        options.classList.remove("show");
      }
    });
  });

  // Toggle chat window
  chatWindowTrigger.addEventListener("click", function () {
    body.classList.toggle("chat-window-active");
  });

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", function () {
      tabs.forEach((tab) => tab.classList.remove("active"));
      tabPanels.forEach((panel) => panel.classList.remove("active"));
      tab.classList.add("active");
      tabPanels[index].classList.add("active");
    });
  });

  // Cursor animation
  let cursor = document.querySelector("#smoke");
  function createSmoke(e) {
    let elem = document.createElement("div");
    elem.classList.add("elem");
    elem.style.left = `${e.clientX}px`;
    elem.style.top = `${e.clientY}px`;

    cursor.appendChild(elem);

    elem.addEventListener("animationend", () => {
      elem.remove();
    });
  }
  document.addEventListener("mousemove", createSmoke);
});
