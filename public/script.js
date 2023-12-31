import { patchVer, releaseName, categorySort } from "./assets/patchlists.js"
const callingRelease = new URLSearchParams(window.location.search).get('rel')
const callingVersion = window.location.pathname.substring(1)

document.addEventListener("DOMContentLoaded", () => {
	const patchListField = document.getElementById("patchList")
	const patchNoteField = document.getElementById("patchfield")
	// 버전을 html 리스트로 변환
	function patchToList() {
		for (const release of categorySort) {
			const listVersion = document.createElement("ul")
			listVersion.setAttribute("class", "release")
			listVersion.innerHTML = `<div class="category">${releaseName[release]}</div>`

			const versionList = document.createElement("ul")
			for (const version of patchVer[release]) {
				const valuePatch = document.createElement("li")
				valuePatch.setAttribute("id", version)
				valuePatch.innerHTML = `
				<svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
					<path d="M8.75 11.5C8.33579 11.5 8 11.8358 8 12.25C8 12.6642 8.33579 13 8.75 13H15.25C15.6642 13 16 12.6642 16 12.25C16 11.8358 15.6642 11.5 15.25 11.5H8.75ZM8.75 14.25C8.33579 14.25 8 14.5858 8 15C8 15.4142 8.33579 15.75 8.75 15.75H15.25C15.6642 15.75 16 15.4142 16 15C16 14.5858 15.6642 14.25 15.25 14.25H8.75ZM8.75 17C8.33579 17 8 17.3358 8 17.75C8 18.1642 8.33579 18.5 8.75 18.5H15.25C15.6642 18.5 16 18.1642 16 17.75C16 17.3358 15.6642 17 15.25 17H8.75ZM13.585 2.586L19.414 8.414C19.789 8.789 20 9.298 20 9.828V20C20 21.104 19.104 22 18 22H6C4.896 22 4 21.104 4 20V4C4 2.896 4.896 2 6 2H12.172C12.1999 2 12.2271 2.00371 12.2542 2.00741C12.2738 2.01008 12.2933 2.01274 12.313 2.014C12.528 2.029 12.74 2.07 12.937 2.152C12.9944 2.17648 13.0488 2.20797 13.103 2.23933C13.1197 2.24897 13.1363 2.25859 13.153 2.268C13.1685 2.27647 13.1845 2.28426 13.2005 2.29207C13.2281 2.30548 13.2557 2.31894 13.281 2.336C13.359 2.389 13.429 2.452 13.5 2.516C13.5115 2.5262 13.5238 2.53567 13.5363 2.5452C13.5531 2.55808 13.57 2.57105 13.585 2.586ZM18 20.5C18.276 20.5 18.5 20.275 18.5 20V10H14C12.896 10 12 9.104 12 8V3.5H6C5.724 3.5 5.5 3.725 5.5 4V20C5.5 20.275 5.724 20.5 6 20.5H18ZM17.378 8.5L13.5 4.621V8C13.5 8.275 13.724 8.5 14 8.5H17.378Z"/>
				</svg>
				<div class="version">${version}</div>`
				valuePatch.addEventListener("click", (event) => {
					event.preventDefault()
					window.location.href = `${version}?rel=${release}`
				})
				versionList.appendChild(valuePatch)
			}
			listVersion.appendChild(versionList)
			patchListField.appendChild(listVersion)
		}
	}

	// 패치 노트 파일 불러오기
	function loadPatch() {
		const mdBlockElement = document.createElement("md-block");
		mdBlockElement.setAttribute("src", `./assets/patches/${callingRelease}/${callingVersion}.md`);
		mdBlockElement.textContent = "불러오는 중...";

		const disqusElement = document.createElement("div");
		disqusElement.setAttribute("id", "disqus_thread");

		patchNoteField.appendChild(mdBlockElement);
		patchNoteField.appendChild(disqusElement);
		(function() {
			var d = document, s = d.createElement('script');
			s.src = 'https://factorygameko.disqus.com/embed.js';
			s.setAttribute('data-timestamp', + new Date());
			(d.head || d.body).appendChild(s);
		})();
		document.head.querySelector("title").innerHTML = `${releaseName[callingRelease]} v${callingVersion} 패치 노트 - 새티스팩토리`
	}

	async function discord() {
		const userList = document.getElementById("userList")
		const role = document.createElement("div")
		role.setAttribute("class", "role")
		const response = await fetch("https://discord.com/api/guilds/677453461519859733/widget.json")
		const serverInfo = await response.json()
		role.innerHTML = `개척자 — ${serverInfo["presence_count"]}`
		userList.appendChild(role)
		for (const member of serverInfo["members"]) {
			const user = document.createElement("li")
			user.innerHTML = `
			<img src=${member["avatar_url"]}>
			<div class="name">${member["username"]}</div>
			`
			userList.appendChild(user)
		}
	}

	// 첫 실행
	patchToList()
	discord()
	if (window.location.pathname != "/") {
		loadPatch()
		document.getElementById(window.location.pathname.substring(1)).setAttribute("class", "selected")
	} else {
		patchNoteField.innerHTML += `
		<md-block src="assets/welcome.md"></md-block>
		`
	}
	
	document.getElementById('burger').addEventListener('click', function() {
		this.classList.toggle('active');

		var sidebar = document.getElementById('leftSideBar');
		sidebar.classList.toggle('open');
	  });
});