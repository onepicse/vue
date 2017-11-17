import { destroyVM, createTest, triggerEvent } from '../util'
import Pagination from '@/components/Pagination/Pagination'

describe('pagination.vue', () => {
	let vm

	afterEach(() => {
	    destroyVM(vm)
	  })

	it('测试左侧按钮点击事件', () => {
		vm = createTest(Pagination, {
			pageSize: 7,
			currentPage: 5,
			totalPage: 20
		}, true)
		let buttonL = vm.$el.querySelector('a.icon-left')
		buttonL.click()
		setTimeout(done => {
			expect(vm.$el.querySelector('.active').textContent).to.equal('4')
			done()
		}, 100)
	})


	it('测试右侧侧按钮点击事件', () => {
		vm = createTest(Pagination, {
			pageSize: 7,
			currentPage: 5,
			totalPage: 20
		}, true)
		let buttonL = vm.$el.querySelector('a.icon-right')
		buttonL.click()
		setTimeout(done => {
			expect(vm.$el.querySelector('.active').textContent).to.equal('6')
			done()
		}, 100)
	})

	it('测试输入框不能输入汉字', () => {
		vm = createTest(Pagination, {
			pageSize: 7,
			currentPage: 5,
			totalPage: 20
		}, true)

		let input = vm.$el.querySelector('input')
		input.setAttribute("嘻嘻")

		triggerEvent(input, 'keyup');
		vm.$nextTick(_ => {
		     input.keyup();
		     vm.$nextTick(_ => {
		        expect(vm.$el.querySelector('input').value).to.equal('5')
		        done();
		     });
		});
	})
})
