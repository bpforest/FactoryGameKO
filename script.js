document.addEventListener("DOMContentLoaded", function () {
	const patchList = document.getElementById("patchList");
	const patchNote = document.getElementById("patchfield");
	const patchFiles = {
		"업데이트 8 (실험적)": ["0.8.2.4", "0.8.2.3", "0.8.2.2", "0.8.2.1", "0.8.2.0"]
	}

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
		mdBlockElement.setAttribute("src", `patches/${filename}.md`);
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
