document.addEventListener("DOMContentLoaded", function () {
  const patchList = document.getElementById("patchList");
  const patchNote = document.getElementById("patchNote");

  // 서버에서 패치 노트 파일 목록을 가져올 수도 있지만, 여기서는 간단하게 하드 코딩합니다.
  const patchFiles = ["0.8.2.4", "0.8.2.3", "0.8.2.2", "0.8.2.1", "0.8.2.0"];

  patchFiles.forEach((file) => {
    const listItem = document.createElement("li");
    listItem.textContent = file;
    listItem.addEventListener("click", () => {
      fetchPatchNote(file);
    });
    patchList.appendChild(listItem);
  });

  if (patchFiles.length > 0) {
    fetchPatchNote(patchFiles[0]);
  }

  function fetchPatchNote(filename) {
    const mdBlockElement = document.createElement("md-block");
    mdBlockElement.setAttribute("src", `patches/${filename}.md`);
    mdBlockElement.textContent = "Loading";
    while (patchNote.firstChild) {
      patchNote.removeChild(patchNote.firstChild);
    }
    patchNote.appendChild(mdBlockElement)
  }
});
