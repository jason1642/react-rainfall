import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import Rain from "../Rain";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Rain> = {
  title: "ReactComponentLibrary/Rain",
  component: Rain,
  decorators: [
    (Story) => (
      <>
      {/* <div 
          style={
            {
              backgroundColor: 'black',
               position: 'relative',
               border: '1px solid red',
               borderRadius: '15px',
                height: '1000px',
                 width: '800px',
                 marginBottom: '200px',
                 }
                 } ></div> */}
        <div 
          style={
            {
              // backgroundColor: 'linear-gradient(to bottom, #131313, #000000)',
              background: 'linear-gradient(to bottom, #202020, #111119)',
               position: 'relative',
              //  border: '1px solid blue',
               borderRadius: '15px',
                height: '650px',
                marginTop: '150px',
                marginLeft: '150px',
                 width: '800px'
                 }
                 } >
            <Story />

        
        </div>    
        
        <div 
          style={
            {
              backgroundColor: 'black',
               position: 'relative',
               border: '1px solid yellow',
               borderRadius: '15px',
                height: '1000px',

                marginTop: '200px',
                 width: '800px'
                 }
                 } ></div></>
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