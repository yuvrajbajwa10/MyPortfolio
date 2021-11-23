function copyToClipboard(value, elementRef) {
  /* Copy the text inside the text field */
  navigator.clipboard.writeText(value);
  alertModal("copied!", elementRef);
}

function alertModal(AlertText, elementRef) {
  const newPopup = document.createElement("span");
  newPopup.className = "popup";
  const newContent = document.createTextNode(AlertText);
  newPopup.appendChild(newContent);
  const elementToAddTo = document.getElementById(elementRef);
  elementToAddTo.parentNode.insertBefore(newPopup, elementToAddTo.nextSibling);
  $("#" + elementRef + "Button").attr("disabled", "true");
  setTimeout(() => {
    elementToAddTo.parentNode.removeChild(newPopup);
    $("#" + elementRef + "Button").removeAttr("disabled");
  }, 2000);
}
