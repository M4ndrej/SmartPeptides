export const removeAllWindowSelection = () => {
  var sel = window.getSelection
    ? window.getSelection()
    : document.getSelection();
  if (sel) {
    if (sel.removeAllRanges) {
      sel.removeAllRanges();
    } else if (sel.empty) {
      sel.empty();
    }
  }
};
