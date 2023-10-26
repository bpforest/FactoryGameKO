import patchFiles from './assets/patchlists.js';

document.addEventListener("DOMContentLoaded", function () {
	const patchList = document.getElementById("patchList");
	const patchNote = document.getElementById("patchfield");

	function patchToList() {
		for (const version in patchFiles) {
			const listVersion = document.createElement("details");
			if (version === Object.keys(patchFiles)[0]) {
				listVersion.setAttribute("open", "");
			}
			const listSum = document.createElement("summary");
			listSum.textContent = version;
			listVersion.appendChild(listSum);
			const listPatch = document.createElement("ul");
			listVersion.appendChild(listPatch);
			for (const patch in patchFiles[version]) {
				const patchVer = patchFiles[version][patch];
				const valuePatch = document.createElement("li");
				valuePatch.textContent= patchVer;
				valuePatch.addEventListener("click", () => loadPatch(patchVer));
				listPatch.appendChild(valuePatch);
			}
			patchList.appendChild(listVersion);
		}
	}

	function loadPatch(filename) {
		const mdBlockElement = document.createElement("md-block");
		mdBlockElement.setAttribute("src", `./assets/patches/${filename}.md`);
		mdBlockElement.textContent = "불러오는 중...";
		while (patchNote.firstChild) {
			patchNote.removeChild(patchNote.firstChild);
		}
		patchNote.appendChild(mdBlockElement);
	}

	if (0 < Object.keys(patchFiles).length) {
		patchToList()
		loadPatch(patchFiles[Object.keys(patchFiles)[0]][0])
	}
});
