import { shallow } from 'enzyme';
import  expect, { createSpy } from 'expect';

import React from 'react';
import ListComponent from '../../src/ui/component/FlashcardSets';

const fetchUsers = createSpy();
const items = ['one', 'two', 'three'];
let props = {fetchUsers, items};

describe('components', () => {

  describe('FlashcardSets', () => {

    it('should render three items', () => {
      const component = shallow(<ListComponent {...props} />);
      expect(component.find('li').length).toEqual(3);
    });

    it('should fetch items on click', () => {
      const component = shallow(<ListComponent {...props} />);
      component.find('button').simulate('click');
      expect(fetchUsers).toHaveBeenCalled();
    })
  });
});
