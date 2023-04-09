import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import Rain from "./Rain";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Rain> = {
  title: "ReactComponentLibrary/Rain",
  component: Rain,
  decorators: [
    (Story) => (
        <div 
          style={
            {
              // backgroundColor: 'linear-gradient(to bottom, #131313, #000000)',
              backgroundColor: 'black',
               position: 'relative',
               border: '1px solid grey',
               borderRadius: '15px',
                height: '650px',
                 width: '1000px'
                 }
                 } >
            <Story />
        </div>
    )
  ]
} 

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
type Template = StoryObj<typeof Rain>;

// export const HelloWorld = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Template = {
  args: {
    numDrops: 50
  },
};

// export const ClickMe = Template.bind({});
// ClickMe.args = {
//   label: "Click me!",
// };


export default meta