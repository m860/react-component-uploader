/**
 * Created by jean.h.ma on 10/08/2017.
 */
import React from "react";
import {mount} from "enzyme";
import Panel from '../src/components/FileButton'

describe("render `<Panel/>` with data source have 2 records", ()=> {
	const title='I am panel title';
	const style={backgroundColor:"red"};
	const className='custom-panel'
	const wrapper = mount((
	<Uploader
		title={title}
		style={style}
		renderRight={()=>{
			return (
				<button>Press Me</button>
			);
		}}
		className={className}>
		<p>here is content</p>
	</Uploader>));
	test(`title is '${title}'`,()=>{
		const titleEl=wrapper.find('.panel-header-title');
		const text=titleEl.text();
		expect(text).toBe(title);
	});
	test(`contain className '${className}'`,()=>{
		expect(wrapper.prop('className')).toBe(className);
	});
	test(`style.backgroundColor='red'?`,()=>{
		expect(wrapper.prop('style').backgroundColor).toBe('red');
	})
	test(`contain element '<p/>'`,()=>{
		expect(wrapper.find('.panel-content').contains(<p/>));
	});
	test(`header right contain a '<button/>'`,()=>{
		expect(wrapper.find('.panel-header-right').contains(<button/>))
	})
})