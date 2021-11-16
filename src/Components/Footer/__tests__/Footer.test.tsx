import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import { findByDataTestAtrr } from '../../../Utils/findByDataTestAtrr';
import Footer from '../footer';

const setUp = () => {
  const component = shallow(<Footer />);
  return component;
};

describe('FooterComponent component', () => {
  let component: ShallowWrapper;
  beforeEach(() => {
    component = setUp();
  });

  it('should render without errors', () => {
    const wrapper = findByDataTestAtrr(component.dive(), 'footerComponent');

    expect(wrapper.length).toBe(1);
  });

  it('Should render a link', () => {
    const wrapper = findByDataTestAtrr(component.dive(), 'linkInFooter');

    expect(wrapper.length).toBe(1);
  });
});
