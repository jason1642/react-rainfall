import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import Rain from "../Rain";

// View component with this story, changes saved in the code editor automatically show on storybook

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
                 width: '1200px'
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


// More on args: https://storybook.js.org/docs/react/writing-stories/args
// Change initial values here, leave them undefined to test default cases. Undefined turns the control value 
// input into set object and won't work until its not undefined
export const Primary: Template = {
  args: {
    numDrops: 10,
    showImpact: true,
    size: 'default',
    dropletColor: 'rgb(255, 255,255)',
    rainEffect: 'rainbow',
    dropletOpacity: .5,

  },
};

export default meta