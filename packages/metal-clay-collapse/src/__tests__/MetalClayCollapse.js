/* eslint-disable max-len, require-jsdoc */

'use strict';

import core from 'metal';
import dom from 'metal-dom';

import MetalClayCollapse from '../MetalClayCollapse';

let component;

describe('MetalClayCollapse', () => {
	afterEach(() => {
		if (component) {
			component.dispose();
		}
	});

	beforeEach(() => {
		dom.enterDocument(
			'<button aria-controls="collapseExample1" class="btn btn-primary">Read more &raquo;</button><button aria-controls="collapseExample3" aria-expanded="false" class="btn btn-warning" id="toggle2">Toggle2</button>',
		);
		dom.enterDocument(
			'<div class="collapse in" id="collapseExample1"><div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea qui sint distinctio recusandae quo ut eaque provident eius eos commodi natus labore culpa modi soluta quia repudiandae nulla ex. Reiciendis cupiditate quis voluptatum atque veniam assumenda itaque perferendis eos voluptatem dolores aut eum. Ut voluptatum amet earum delectus totam unde!</div></div>',
		);
	});

	function checkClosedClasses(component) {
		expect(!dom.hasClass(component.content, 'in')).toBeTruthy();
		expect(!dom.hasClass(component.content, 'collapsing')).toBeTruthy();
		expect(dom.hasClass(component.content, 'collapse')).toBeTruthy();
		expect(
			component.content.getAttribute('aria-expanded') === 'false',
		).toBeTruthy();
	}

	function checkOpenClasses(component) {
		expect(!dom.hasClass(component.content, 'collapsing')).toBeTruthy();
		expect(dom.hasClass(component.content, 'collapse')).toBeTruthy();
		expect(dom.hasClass(component.content, 'in')).toBeTruthy();
		expect(
			component.content.getAttribute('aria-expanded') === 'true',
		).toBeTruthy();
	}

	describe('Content State', () => {
		it('should accept an element as a value', () => {
			component = new MetalClayCollapse({
				content: document.querySelector('#collapseExample1'),
				headers: '[aria-controls="collapseExample1"]',
			});

			expect(core.isElement(component.content)).toBeTruthy();
		});

		it('should accept a selector as value and convert it to an element', () => {
			component = new MetalClayCollapse({
				content: '#collapseExample1',
				headers: '[aria-controls="collapseExample1"]',
			});

			expect(core.isElement(component.content)).toBeTruthy();
		});

		it('should close when calling close()', () => {
			component = new MetalClayCollapse({
				collapsed: false,
				content: '#collapseExample1',
				headers: '[aria-controls="collapseExample1"]',
			});

			component.close_();

			checkClosedClasses(component);
		});

		it('should open when calling open()', () => {
			component = new MetalClayCollapse({
				content: '#collapseExample1',
				headers: '[aria-controls="collapseExample1"]',
			});

			component.open_();

			checkOpenClasses(component);
		});
	});

	describe('Collapsed State', () => {
		it('should be collapsed by default', () => {
			component = new MetalClayCollapse({
				content: document.querySelector('#collapseExample1'),
				headers: '[aria-controls="collapseExample1"]',
			});

			checkClosedClasses(component);
		});

		it('should not be collapsed on page load if state collapsed: false', () => {
			component = new MetalClayCollapse({
				collapsed: false,
				content: document.querySelector('#collapseExample1'),
				headers: '[aria-controls="collapseExample1"]',
			});

			checkOpenClasses(component);
		});
	});

	describe('Headers State', () => {
		it('should accept an element as a value', () => {
			component = new MetalClayCollapse({
				content: '#collapseExample1',
				headers: document.querySelector(
					'[aria-controls="collapseExample1"]',
				),
			});

			expect(core.isElement(component.headers)).toBeTruthy();
		});

		it('should accept a selector as value', () => {
			component = new MetalClayCollapse({
				content: '#collapseExample1',
				headers: '[aria-controls="collapseExample1"]',
			});

			expect(core.isString(component.headers)).toBeTruthy();
		});

		it('should accept an array of selectors and elements as a value', () => {
			component = new MetalClayCollapse({
				content: '#collapseExample1',
				headers: [
					'[aria-controls="collapseExample1"]',
					document.querySelector('#toggle2'),
				],
			});

			expect(Array.isArray(component.headers)).toBeTruthy();
		});
	});
});
