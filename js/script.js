const App = {
	data: {
		offer1: {
			card: "offer1-card",
			offID: "offer1-card-off",
			badgeID: "offer1-card-off-badge",
			prevPriceID: "offer1-card-prev-price",
			expandedOffer: "offer1-card-expanded",
			price: "Total : $18.00 USD",
		},
		offer2: {
			card: "offer2-card",
			offID: "offer2-card-off",
			badgeID: "offer2-card-off-badge",
			prevPriceID: "offer2-card-prev-price",
			expandedOffer: "offer2-card-expanded",
			price: "Total : $24.00 USD",
		},
		offer3: {
			card: "offer3-card",
			offID: "offer3-card-off",
			badgeID: "offer3-card-off-badge",
			prevPriceID: "offer3-card-prev-price",
			expandedOffer: "offer3-card-expanded",
			price: "Total : $36.00 USD",
		},
	},

	getElement: function (id) {
		return document.getElementById(id);
	},

	addElement: function (id, style = "block") {
		const element = this.getElement(id);
		if (element) {
			element.style.display = style;
		}
	},

	addClass: function (id, className) {
		const element = this.getElement(id);
		if (element) {
			element.classList.add(className);
		}
	},

	removeClass: function (id, className) {
		const element = this.getElement(id);
		if (element) {
			element.classList.remove(className);
		}
	},

	removeElement: function (id) {
		const element = this.getElement(id);
		if (element) {
			element.style.display = "none";
		}
	},

	handleSelected: function () {
		const checkedId = window.selected;
		const offer = this.data[checkedId];
		this.removeElement(offer.offID);
		this.addElement(offer.badgeID);
		this.addElement(offer.prevPriceID);
		this.addClass(offer.card, "offer-card-secondary");
		this.addClass(offer.expandedOffer, "offer-card-expanded-visible");
	},

	resetOtherElements: function (currentId) {
		const keys = Object.keys(this.data);
		keys.forEach((key) => {
			if (key !== currentId) {
				const offer = this.data[key];
				this.addElement(offer.offID, "flex");
				this.removeElement(offer.badgeID);
				this.removeElement(offer.prevPriceID);
				this.removeClass(offer.card, "offer-card-secondary");
				this.removeClass(offer.expandedOffer, "offer-card-expanded-visible");
			}
		});
	},

	enableCTA: function () {
		const cta = this.getElement("cta");
		cta.disabled = false;
	},

	updateTotal: function (id) {
		const offer = this.data[id];
		this.getElement("total-price").innerText = offer.price;
		if (id) {
			this.enableCTA();
		}
	},

	addEventListener: function (id) {
		const _this = this;
		document.getElementById(id).addEventListener("change", function (e) {
			const isChecked = e.target.checked;
			window.selected = isChecked ? id : null;
			_this.resetOtherElements(id);
			_this.handleSelected(id);
			_this.updateTotal(id);
		});
	},

	run: function () {
		Object.keys(this.data).forEach((key) => {
			this.addEventListener(key);
		});
	},
};

App.run();
