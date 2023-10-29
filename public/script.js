import patchFiles from './assets/patchlists.js';

document.addEventListener("DOMContentLoaded", () => {
	const patchList = document.getElementById("patchList")
	const patchNote = document.getElementById("patchfield")

	// 버전을 html 리스트로 변환
	function patchToList() {
		for (const version in patchFiles) {
			const listVersion = document.createElement("details")

			// 상단 버전일 경우 열어놓기
			if (version === Object.keys(patchFiles)[0]) {
				listVersion.setAttribute("open", "")
			}
			const listSum = document.createElement("summary")
			listSum.textContent = version
			listVersion.appendChild(listSum)

			const listPatch = document.createElement("ul")
			listVersion.appendChild(listPatch)
			for (const patch in patchFiles[version]) {
				const valuePatch = document.createElement("li")
				const patchVer = patchFiles[version][patch]
				valuePatch.textContent= patchVer
				valuePatch.addEventListener("click", (event) => {
					event.preventDefault()
					window.location.href = patchVer
				})
				listPatch.appendChild(valuePatch)
			}
			patchList.appendChild(listVersion)
		}
	}

	// 패치 노트 파일 불러오기
	function loadPatch() {
		const mdBlockElement = document.createElement("md-block");
		mdBlockElement.setAttribute("src", `./assets/patches${window.location.pathname}.md`);
		mdBlockElement.textContent = "불러오는 중...";

		const disqusElement = document.createElement("div");
		disqusElement.setAttribute("id", "disqus_thread");

		while (patchNote.firstChild) {
			patchNote.removeChild(patchNote.firstChild);
		}
		patchNote.appendChild(mdBlockElement);
		patchNote.appendChild(disqusElement);
		(function() {
			var d = document, s = d.createElement('script');
			s.src = 'https://factorygameko.disqus.com/embed.js';
			s.setAttribute('data-timestamp', + new Date());
			(d.head || d.body).appendChild(s);
		})();
	}

	// 첫 실행
	patchToList()
	if (window.location.pathname != "/") {
		loadPatch()
	}
});