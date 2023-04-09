import React from "react";
import { render, RenderResult, waitFor, } from "@testing-library/react";
// import {shallow} from 'enzyme'

import Rain from "../Rain";




describe("Rain",  () => {

  it("Should render the Rain component with 50 droplets",  async () => {
    // const wrapper = shallow(<Rain />)
    // const {rerender} =  render(<Rain numDrops={50} />);
    const { container } = render(<Rain />)
    await waitFor(() => {
      expect(container.getElementsByClassName('droplet').length).toBe(50)
      console.log(container.getElementsByClassName('droplet').length)
    });
    // expect(wrapper.children()).toHaveLength(50)
    
   
  }, 2000)

});