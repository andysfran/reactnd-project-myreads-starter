import React from 'react'

export default () => {
	let fakeItems = [];
	for (let i =0; i < 5; i++) {
		fakeItems.push(
			<li>
				<div className="book">
					<div className="book-top">
					<div className="book-cover" style={{ width: 128, height: 193 }}></div>
					<div className="book-shelf-changer book-shelf-changer-disabled">
					</div>
					</div>
					<div className="book-title book-title-disabled"></div>
					<div className="book-authors book-authors-disabled"></div>
				</div>
			</li>
		)
	}
	return fakeItems;
}
