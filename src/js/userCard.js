class UserCard extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({
			mode: "open",
		});
		// this.shadowRoot.appendChild({template.content.clone})s
		this.innerHTML = `<style> h3 {
            color: black;
        }</style> <h3>${this.getAttribute("name")}</h3>`;
	}
}

window.customElements.define("user-card", UserCard);
